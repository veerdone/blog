package io.github.yu.blog.mapper;

import io.github.yu.base.mapper.BaseMapper;
import io.github.yu.blog.model.UserFocus;
import io.github.yu.blog.model.UserFocusVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 用户关注mapper
 */
public interface UserFocusMapper extends BaseMapper<UserFocus, UserFocus> {

    @Override
    UserFocus getByEntity(@Param("query") UserFocus userFocus);

    List<UserFocusVo> listVoByEntity(@Param("query") UserFocus userFocus);
}
