package io.github.yu.blog.service;

import io.github.yu.base.service.BaseService;
import io.github.yu.blog.model.PostComment;

import java.util.List;

public interface PostCommentService extends BaseService<PostComment, PostComment> {
    List<PostComment> listById(Long id);
}
