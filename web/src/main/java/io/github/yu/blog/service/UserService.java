package io.github.yu.blog.service;

import io.github.yu.base.service.BaseService;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserQuery;

public interface UserService extends BaseService<User, UserQuery> {
    User getByAccount(String account);

    User loginByAccount(User user);

    User loginByTelephone(User user);

    User getCurrentUser();

    User getByTelephone(String telephone);
}
