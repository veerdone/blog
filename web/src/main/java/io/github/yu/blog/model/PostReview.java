package io.github.yu.blog.model;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 文章审核
 * table: post_review
 */
@Data
public class PostReview {
    // 审核id
    private Long reviewId;
    // 审核人名称
    private String reviewUsername;
    // 审核文章id
    private Long reviewPostId;
    // 审核文章标题
    private String reviewPostTitle;
    // 审核状态，1代表审核通过，2代表待审核，3代表审核不通过
    private Integer reviewStatus;
    // 审核失败原因
    private String reviewFailReason;
    // 创建时间
    private LocalDateTime reviewCreateTime;
    // 修改时间
    private LocalDateTime reviewUpdateTime;
}
