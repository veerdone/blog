package io.github.yu.blog.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostReview {
    // 审核id
    private Long reviewId;
    // 审核人名称
    private String reviewUsername;
    // 审核文章id
    private Long reviewPostId;
    // 审核状态，2代表待审核，3代表审核不通过
    private Integer reviewStatus;
    // 审核失败原因
    private String reviewFailReason;
    // 创建时间
    private LocalDateTime reviewCreateTime;
    // 修改时间
    private LocalDateTime reviewUpdateTime;
}