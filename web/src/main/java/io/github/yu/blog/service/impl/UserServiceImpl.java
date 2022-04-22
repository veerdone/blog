package io.github.yu.blog.service.impl;

import cn.hutool.core.util.StrUtil;
import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.UserMapper;
import io.github.yu.blog.model.LoginHistory;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserQuery;
import io.github.yu.blog.service.LoginHistoryService;
import io.github.yu.blog.service.UserService;
import io.github.yu.common.constant.ExceptionEnum;
import io.github.yu.common.exception.*;
import io.github.yu.common.util.IdUtil;
import io.github.yu.common.util.PassEncode;
import io.github.yu.common.util.RequestUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * 用户服务
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User, UserQuery, UserMapper>
        implements UserService {
    @Autowired
    private PassEncode passEncode;

    @Autowired
    private LoginHistoryService loginHistoryService;

    @Override
    public void insert(User user) {
        if (super.mapper.getByName(user.getUsername()) != null) {
            throw new UsernameExistException();
        }
        if (super.mapper.getByAccount(user.getAccount()) != null) {
            throw new AccountExistException(ExceptionEnum.ACCOUNT_EXIST);
        }
        if (super.mapper.getByTelephone(user.getTelephone()) != null) {
            throw new TelephoneExistException(ExceptionEnum.TELEPHONE_EXIST);
        }
        if (null == user.getUserId()) {
            user.setUserId(IdUtil.getId());
        }
        if (null == user.getCreateTime()) {
            user.setCreateTime(LocalDateTime.now());
        }
        user.setPassword(passEncode.Encode(user.getPassword()));
        super.mapper.insert(user);
    }

    @Override
    public void updateByQuery(UserQuery query) {
        Long userId = query.getUserId();
        User user = super.mapper.getById(userId);
        if (StrUtil.isNotEmpty(query.getUsername())) {
            if (!user.getUsername().equals(query.getUsername())
                    && super.mapper.getByName(query.getUsername()) != null) {
                throw new UsernameExistException();
            }
        }
        if (StrUtil.isNotEmpty(query.getPassword())) {
            if (passEncode.match(user.getPassword(), query.getPassword())) {
                query.setPassword(passEncode.Encode(query.getNewPassword()));
                super.mapper.updateById(query);
                return;
            }
            throw new PasswordErrorException();
        }
        super.mapper.updateById(query);
    }

    @Override
    public User getByAccount(String account) {
        return super.mapper.getByAccount(account);
    }

    @Override
    public User loginByAccount(User user) {
        String account = user.getAccount();
        User databaseUser = super.mapper.getByAccount(account);
        LoginHistory history = validateUser(databaseUser, user);
        loginHistoryService.insert(history);

        User returnUser = new User();
        BeanUtils.copyProperties(databaseUser, returnUser, "password");
        return returnUser;
    }

    @Override
    public User loginByTelephone(User user) {
        User databaseUser = super.mapper.getByTelephone(user.getTelephone());
        LoginHistory history = validateUser(databaseUser, user);
        loginHistoryService.insert(history);

        User returnUser = new User();
        BeanUtils.copyProperties(databaseUser, returnUser, "password");
        return returnUser;
    }

    @Override
    public User getCurrentUser() {
        String account = RequestUtil.getFromHeader("account");
        if (StrUtil.isEmpty(account)) {
            return null;
        }
        return super.mapper.getByAccount(account);
    }

    @Override
    public User getByTelephone(String telephone) {
        return super.mapper.getByTelephone(telephone);
    }

    private LoginHistory validateUser(User databaseUser, User user) {
        if (null == databaseUser) {
            throw new AccountOrPassErrorException();
        }
        if (!passEncode.match(databaseUser.getPassword(), user.getPassword())) {
            throw new AccountOrPassErrorException();
        }
        if (databaseUser.getStatus() == 1) {
            throw new UserDisableException();
        }
        LoginHistory history = new LoginHistory();
        history.setUserId(databaseUser.getUserId());
        history.setUserAccount(databaseUser.getAccount());
        history.setUsername(databaseUser.getUsername());
        return history;
    }

}
