package io.github.yu.blog.service.impl;

import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.PostMapper;
import io.github.yu.blog.model.Post;
import io.github.yu.blog.model.PostQuery;
import io.github.yu.blog.model.PostReview;
import io.github.yu.blog.model.User;
import io.github.yu.blog.service.PostReviewService;
import io.github.yu.blog.service.PostService;
import io.github.yu.blog.service.UserService;
import io.github.yu.common.util.IdUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * 文章服务
 */
@Service
public class PostServiceImpl extends BaseServiceImpl<Post, PostQuery, PostMapper>
        implements PostService {
    @Autowired
    private PostReviewService postReviewService;

    @Autowired
    private UserService userService;

    /**
     * 插入文章，并且插入文章审核
     * @param post 文章
     */
    @Override
    @Transactional(rollbackFor = {RuntimeException.class, Error.class})
    public void insert(Post post) {
        if (null == post.getPostId()) {
            post.setPostId(IdUtil.getId());
        }
        if (null == post.getCreateTime()) {
            post.setCreateTime(LocalDateTime.now());
        }
        if (null == post.getStatus()) {
            post.setStatus(2);
        }
        if (null == post.getUserId()) {
            User currentUser = userService.getCurrentUser();
            post.setUserId(currentUser.getUserId());
        }
        super.mapper.insert(post);

        PostReview postReview = new PostReview();
        postReview.setReviewPostId(post.getPostId());
        postReviewService.insert(postReview);
    }

    @Override
    public void updateById(Post post) {
        if (null == post.getUpdateTime()) {
            post.setUpdateTime(LocalDateTime.now());
        }
        super.mapper.updateById(post);
    }
}
