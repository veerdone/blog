package io.github.yu.blog.mapper;

import io.github.yu.base.mapper.BaseMapper;
import io.github.yu.blog.model.LoginHistory;
import io.github.yu.blog.model.LoginHistoryQuery;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 登录历史mapper
 */
public interface LoginHistoryMapper extends BaseMapper<LoginHistory, LoginHistoryQuery> {
    @Override
    List<LoginHistory> pageByQuery(@Param("query") LoginHistoryQuery query);
}
