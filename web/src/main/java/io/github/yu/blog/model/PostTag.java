package io.github.yu.blog.model;

import lombok.Data;

/**
 * 文章标签
 * table: blog_post_tag
 */
@Data
public class PostTag {
    // 标签id
    private Long tagId;
    // 标签名称
    private String tagName;
    // 分类id
    private Long sortId;
}
