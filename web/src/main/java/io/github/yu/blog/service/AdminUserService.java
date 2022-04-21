package io.github.yu.blog.service;

import io.github.yu.base.service.BaseService;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserQuery;

public interface AdminUserService extends BaseService<User, UserQuery> {
    User getByAccount(String account);

    User getByTelephone(String telephone);
}
