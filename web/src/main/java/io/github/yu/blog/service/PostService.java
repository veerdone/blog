package io.github.yu.blog.service;

import io.github.yu.base.service.BaseService;
import io.github.yu.blog.model.Post;
import io.github.yu.blog.model.PostQuery;
import io.github.yu.blog.model.PostVo;

import java.io.Serializable;
import java.util.List;

public interface PostService extends BaseService<Post, PostQuery> {
    void updateViewsByPostId(Long postId, Integer count);

    List<PostVo> pageListVo();

    List<PostVo> pageListVoBySortId(Serializable id);

    List<PostVo> pageListVoByTagId(Serializable id);
}
