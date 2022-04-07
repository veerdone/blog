package io.github.yu.blog.model;

import lombok.Data;

import java.util.List;

/**
 * 文章视图
 */
@Data
public class PostVo extends Post {
    // 标签
    List<PostTag> tags;
}
