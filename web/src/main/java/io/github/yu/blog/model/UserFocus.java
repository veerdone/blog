package io.github.yu.blog.model;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 用户关注表
 * table: blog_user_focus
 */
@Data
public class UserFocus {
    // 主键id
    private Long focusId;
    // 用户id
    private Long userId;
    // 关注人id
    private Long userFocusId;
    // 关注开始时间
    private LocalDateTime focusTime;
}
