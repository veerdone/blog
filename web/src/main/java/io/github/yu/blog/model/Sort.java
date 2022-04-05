package io.github.yu.blog.model;

import lombok.Data;

/**
 * 文章分类
 * table: blog_sort
 */
@Data
public class Sort {
    private Long sortId;
    private String sortName;
}
