package io.github.yu.blog.service.impl;

import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.AdminUserMapper;
import io.github.yu.blog.mapper.UserMapper;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserQuery;
import io.github.yu.blog.service.AdminUserService;
import org.springframework.stereotype.Service;

@Service
public class AdminUserServiceImpl extends BaseServiceImpl<User, UserQuery, AdminUserMapper>
        implements AdminUserService {

    @Override
    public void insert(User user) {
        User u = getByAccount(user.getAccount());
        if (u == null) {
            super.mapper.insert(user);
        }
    }

    @Override
    public User getByAccount(String account) {
        return super.mapper.getByAccount(account);
    }

    @Override
    public User getByTelephone(String telephone) {
        return super.mapper.getByTelephone(telephone);
    }
}
