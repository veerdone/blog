package io.github.yu.blog.mapper;

import io.github.yu.base.mapper.BaseMapper;
import io.github.yu.blog.model.Post;
import io.github.yu.blog.model.PostQuery;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PostMapper extends BaseMapper<Post, PostQuery> {

    @Override
    List<Post> pageListByQuery(@Param("query") PostQuery query);

    List<Post> listByOrder(@Param("query")PostQuery query);
}
