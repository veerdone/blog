package io.github.yu.blog.mapper;

import io.github.yu.base.mapper.BaseMapper;
import io.github.yu.blog.model.PostComment;

import java.util.List;

/**
 * 文章评论mapper
 */
public interface PostCommentMapper extends BaseMapper<PostComment, PostComment> {
    List<PostComment> listByPostId(Long postId);
}
