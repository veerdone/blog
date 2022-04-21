package io.github.yu.blog.mapper;

import io.github.yu.base.mapper.BaseMapper;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserQuery;

public interface AdminUserMapper extends BaseMapper<User, UserQuery> {
    User getByAccount(String account);

    User getByTelephone(String telephone);
}
