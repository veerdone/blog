package io.github.yu.blog.model;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 浏览记录表
 * table: post_browse_history
 */
@Data
public class BrowseHistory {
    // 主键id
    private Long id;
    // 用户id
    private Long userId;
    // 文章id
    private Long postId;
    // 浏览时间
    private LocalDateTime browseTime;
}
