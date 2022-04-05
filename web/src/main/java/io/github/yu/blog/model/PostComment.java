package io.github.yu.blog.model;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 文章评论表
 * table: blog_post_comment
 */
@Data
public class PostComment {
    // 主键id
    private Long commentId;
    // 评论内容
    private String commentContent;
    // 文章id
    private Long postId;
    // 评论时间
    private LocalDateTime commentCreateTime;
    // 评论类型，0代表评论文章，1代表回复评论
    private Integer commentType;
    // 评论用户id
    private Long fromUserId;
    // 评论用户名称
    private String fromUserName;
    // 评论用户头像
    private String fromUserIcon;
    // 被评论用户id
    private Long toUserId;
    // 被评论用户名称
    private String toUserName;
    // 被评论用户头像
    private String toUserIcon;
}
