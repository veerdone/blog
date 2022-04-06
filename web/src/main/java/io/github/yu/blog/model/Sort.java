package io.github.yu.blog.model;

import lombok.Data;

/**
 * 文章分类
 * table: blog_sort
 */
@Data
public class Sort {
    // 分类id
    private Long sortId;
    // 分类名称
    private String sortName;
}
