package io.github.yu.blog.mapper;

import io.github.yu.base.mapper.BaseMapper;
import io.github.yu.blog.model.PostTag;

import java.io.Serializable;
import java.util.List;

/**
 * 文章标签mapper
 */
public interface PostTagMapper extends BaseMapper<PostTag, PostTag> {
    /**
     * 根据分类id获取标签
     * @param id 分类id
     * @return 标签
     */
    List<PostTag> listBySortId(Serializable id);
}
