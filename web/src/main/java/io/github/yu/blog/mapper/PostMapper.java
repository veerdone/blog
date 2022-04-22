package io.github.yu.blog.mapper;

import io.github.yu.base.mapper.BaseMapper;
import io.github.yu.blog.model.Post;
import io.github.yu.blog.model.PostQuery;
import io.github.yu.blog.model.PostVo;
import org.apache.ibatis.annotations.Param;

import java.io.Serializable;
import java.util.List;

/**
 * 文章mapper
 */
public interface PostMapper extends BaseMapper<Post, PostQuery> {
    List<Post> viewsLimit(String type);

    List<Post> likesLimit(String type);

    /**
     * 根据博客id和count更新博客浏览量
     * @param postId 博客id
     * @param count 浏览量
     */
    void updateViewsByPostId(@Param("postId")Long postId, @Param("count") Integer count);

    @Override
    List<Post> pageByQuery(@Param("query") PostQuery query);

    /**
     * 分页获取文章vo
     * @return 文章vo
     */
    List<PostVo> pagePostVo();

    List<PostVo> pagePostVoByQuery(@Param("query")PostQuery query);

    /**
     * 根据分类id获取文章vo
     * @param id 分类id
     * @return 文章vo
     */
    List<PostVo> pageListVoBySortId(Serializable id);

    /**
     * 根据标签id获取文章vo
     * @param id 标签id
     * @return 文章vo
     */
    List<PostVo> pagePostVoByTagId(Serializable id);

    List<PostVo> pagePostVoByUserId(Serializable id);
}
