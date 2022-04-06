package io.github.yu.blog.model;

import lombok.Data;

@Data
public class PostReviewQuery extends PostReview {
    private int startPage;
    private int pageSize;
}
