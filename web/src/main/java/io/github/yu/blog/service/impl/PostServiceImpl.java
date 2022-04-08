package io.github.yu.blog.service.impl;

import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.PostMapper;
import io.github.yu.blog.model.*;
import io.github.yu.blog.service.PostReviewService;
import io.github.yu.blog.service.PostService;
import io.github.yu.blog.service.PostTagService;
import io.github.yu.blog.service.UserService;
import io.github.yu.common.util.IdUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Autowired
    private PostTagService postTagService;

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

    @Override
    public void updateViewsByPostId(Long postId, Integer count) {
        super.mapper.updateViewsByPostId(postId, count);
    }

    @Override
    public List<PostVo> listVo() {
        List<PostVo> listVo = super.mapper.pageListVo();
        setTag(listVo);
        return listVo;
    }

    /**
     * 获取文章vo，根据postTags获取postTag
     * @return postVo
     */
    @Override
    public List<PostVo> pageListVo() {
        List<PostVo> listVo = super.mapper.pageListVo();
        setTag(listVo);
        return listVo;
    }

    @Override
    public List<PostVo> pageListVoBySortId(Serializable id) {
        List<PostVo> listVo = super.mapper.pageListVoBySortId(id);
        setTag(listVo);
        return listVo;
    }

    @Override
    public List<PostVo> pageListVoByTagId(Serializable id) {
        List<PostVo> listVo = super.mapper.pageListVoByTagId(id);
        setTag(listVo);
        return listVo;
    }

    private void setTag(List<PostVo> listVo) {
        if (listVo.isEmpty()) {
            return;
        }
        listVo.forEach(v -> {
            List<PostTag> list = new ArrayList<>(3);
            v.getPostTags().forEach(t -> list.add(postTagService.getById(t)));
            v.setTags(list);
        });
    }
}
