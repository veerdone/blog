package io.github.yu.blog.service;

import io.github.yu.base.service.BaseService;
import io.github.yu.blog.model.PostTag;

import java.io.Serializable;
import java.util.List;

public interface PostTagService extends BaseService<PostTag, PostTag> {
    List<PostTag> listBySortId(Serializable id);
}
