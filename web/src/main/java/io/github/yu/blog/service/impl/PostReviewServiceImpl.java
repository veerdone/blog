package io.github.yu.blog.service.impl;

import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.PostReviewMapper;
import io.github.yu.blog.model.PostReview;
import io.github.yu.blog.service.PostReviewService;
import io.github.yu.common.util.IdUtil;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PostReviewServiceImpl extends BaseServiceImpl<PostReview, PostReview, PostReviewMapper>
        implements PostReviewService {

    @Override
    public void insert(PostReview postReview) {
        if (null == postReview.getReviewId()) {
            postReview.setReviewId(IdUtil.getId());
        }
        if (null == postReview.getReviewCreateTime()) {
            postReview.setReviewCreateTime(LocalDateTime.now());
        }
        if (null == postReview.getReviewStatus()) {
            postReview.setReviewStatus(2);
        }
        super.mapper.insert(postReview);
    }
}
