package io.github.yu.blog.service.impl;

import cn.hutool.core.util.StrUtil;
import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.PostMapper;
import io.github.yu.blog.mapper.PostReviewMapper;
import io.github.yu.blog.model.Post;
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

    @Autowired
    private PostMapper postMapper;

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
        if (StrUtil.isEmpty(postReview.getReviewUsername())) {
            User currentUser = userService.getCurrentUser();
            postReview.setReviewUsername(currentUser.getUsername());
        }
        if (null == postReview.getReviewUpdateTime()) {
            postReview.setReviewUpdateTime(LocalDateTime.now());
        }
        if (postReview.getReviewStatus() == 3) {
            super.mapper.updateById(postReview);
        } else {
            super.mapper.deleteById(postReview.getReviewId());
        }

        Long postId = postReview.getReviewPostId();
        Post post = new Post();
        post.setPostId(postId);
        post.setStatus(postReview.getReviewStatus());
        postMapper.updateById(post);
    }
}
