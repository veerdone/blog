package io.github.yu.blog.model;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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
    @NotEmpty(message = "评论内容不能为空")
    private String commentContent;
    // 文章id
    @NotNull(message = "文章id不能为空")
    private Long postId;
    // 评论时间
    private LocalDateTime commentCreateTime;
    // 评论类型，0代表评论文章，1代表回复评论
    @NotNull(message = "评论类型不能为空")
    private Integer commentType;
    // 评论用户id
    private Long fromUserId;
    // 评论用户名称
    private String fromUsername;
    // 评论用户头像
    private String fromUserIcon;
    // 被评论用户id
    private Long toUserId;
    // 被评论用户名称
    private String toUsername;
    // 被评论用户头像
    private String toUserIcon;
    // 被回复评论id
    private Long toCommentId;
}
