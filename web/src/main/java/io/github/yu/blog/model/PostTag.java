package io.github.yu.blog.model;

import lombok.Data;

/**
 * 文章标签
 * table: blog_post_tag
 */
@Data
public class PostTag {
    private Long tagId;
    private String tagName;
    private Long sortId;
}
