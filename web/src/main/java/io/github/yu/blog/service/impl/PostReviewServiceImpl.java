package io.github.yu.blog.service.impl;

import cn.hutool.core.util.StrUtil;
import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.PostReviewMapper;
import io.github.yu.blog.model.PostReview;
import io.github.yu.blog.model.PostReviewQuery;
import io.github.yu.blog.model.User;
import io.github.yu.blog.service.PostReviewService;
import io.github.yu.blog.service.UserService;
import io.github.yu.common.util.IdUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * 文章审核服务
 */
@Service
public class PostReviewServiceImpl extends BaseServiceImpl<PostReview, PostReviewQuery, PostReviewMapper>
        implements PostReviewService {
    @Autowired
    private UserService userService;

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

    @Override
    public void updateById(PostReview postReview) {
        User currentUser = userService.getCurrentUser();
        if (StrUtil.isEmpty(postReview.getReviewUsername())) {
            postReview.setReviewUsername(currentUser.getUsername());
        }
        if (null == postReview.getReviewUpdateTime()) {
            postReview.setReviewUpdateTime(LocalDateTime.now());
        }
        super.mapper.updateById(postReview);
    }
}
