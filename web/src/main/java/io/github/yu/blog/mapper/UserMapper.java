package io.github.yu.blog.mapper;

import io.github.yu.base.mapper.BaseMapper;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserQuery;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 用户mapper
 */
public interface UserMapper extends BaseMapper<User, UserQuery> {
    User getByAccount(String account);

    User getByTelephone(String telephone);

    @Override
    List<User> pageByQuery(@Param("query") UserQuery query);
}
