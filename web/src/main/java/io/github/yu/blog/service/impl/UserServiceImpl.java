package io.github.yu.blog.service.impl;

import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.UserMapper;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserQuery;
import io.github.yu.blog.service.UserService;
import io.github.yu.common.constant.ExceptionEnum;
import io.github.yu.common.exception.AccountExistException;
import io.github.yu.common.exception.AccountOrPassErrorException;
import io.github.yu.common.exception.TelephoneExistException;
import io.github.yu.common.exception.UserDisableException;
import io.github.yu.common.util.IdUtil;
import io.github.yu.common.util.PassEncode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserServiceImpl extends BaseServiceImpl<User, UserQuery, UserMapper>
        implements UserService {
    @Autowired
    private PassEncode passEncode;

    @Override
    public void insert(User user) {
        if (null == user.getUserId()) {
            user.setUserId(IdUtil.getId());
        }
        if (null == user.getCreateTime()) {
            user.setCreateTime(LocalDateTime.now());
        }
        if (super.mapper.getByAccount(user.getAccount()) != null) {
            throw new AccountExistException(ExceptionEnum.ACCOUNT_EXIST);
        }
        if (super.mapper.getByTelephone(user.getTelephone()) != null) {
            throw new TelephoneExistException(ExceptionEnum.TELEPHONE_EXIST);
        }
        user.setPassword(passEncode.Encode(user.getPassword()));
        super.mapper.insert(user);
    }

    @Override
    public User getByAccount(String account) {
        return super.mapper.getByAccount(account);
    }

    @Override
    public void login(User user) {
        String account = user.getAccount();
        User databaseUser = null;
        if (null == account || account.equals("")) {
            throw new AccountOrPassErrorException();
        }
        databaseUser = super.mapper.getByAccount(account);
        if (null == databaseUser) {
            databaseUser = super.mapper.getByTelephone(account);
            if (null == databaseUser) {
                throw new AccountOrPassErrorException();
            }
        }
        if (!passEncode.match(databaseUser.getPassword(), user.getPassword())) {
            throw new AccountOrPassErrorException();
        }
        if (databaseUser.getStatus() == 1) {
            throw new UserDisableException();
        }
    }
}
