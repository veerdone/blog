package io.github.yu.blog.service;

import io.github.yu.base.service.BaseService;
import io.github.yu.blog.model.Post;
import io.github.yu.blog.model.PostQuery;
import io.github.yu.blog.model.PostVo;

import java.io.Serializable;
import java.util.List;

public interface PostService extends BaseService<Post, PostQuery> {
    void updateViewsByPostId(Long postId, Integer count);

    List<PostVo> listVo();

    List<PostVo> pagePostVo();

    List<PostVo> pagePostVoQuery(PostQuery query);

    List<PostVo> pagePostVoBySortId(Serializable id);

    List<PostVo> pagePostVoByTagId(Serializable id);

    List<PostVo> pagePostVoByUserId(Serializable id);

    List<PostVo> listVoBySortId(Serializable id);

    List<PostVo> listVoByTagId(Serializable id);
}
