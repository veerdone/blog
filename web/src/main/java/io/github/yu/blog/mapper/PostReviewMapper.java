package io.github.yu.blog.mapper;

import io.github.yu.base.mapper.BaseMapper;
import io.github.yu.blog.model.PostReview;
import io.github.yu.blog.model.PostReviewQuery;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 文章审核mapper
 */
public interface PostReviewMapper extends BaseMapper<PostReview, PostReviewQuery> {
    @Override
    List<PostReview> pageByQuery(@Param("query") PostReviewQuery query);
}
