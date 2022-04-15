package io.github.yu.blog.service.impl;

import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.PostCommentMapper;
import io.github.yu.blog.model.PostComment;
import io.github.yu.blog.model.User;
import io.github.yu.blog.service.PostCommentService;
import io.github.yu.blog.service.UserService;
import io.github.yu.common.util.IdUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostCommentServiceImpl extends BaseServiceImpl<PostComment, PostComment, PostCommentMapper>
        implements PostCommentService {
    @Autowired
    private UserService userService;

    @Override
    public void insert(PostComment postComment) {
        postComment.setCommentCreateTime(LocalDateTime.now());
        postComment.setCommentId(IdUtil.getId());

        User currentUser = userService.getCurrentUser();
        postComment.setFromUserId(currentUser.getUserId());
        postComment.setFromUsername(currentUser.getUsername());
        postComment.setFromUserIcon(currentUser.getIcon());

        // 如果评论类型是回复评论，则设置被回复人的信息
        if (postComment.getCommentType() == 1) {
            User toUser = userService.getById(postComment.getToUserId());
            postComment.setToUserIcon(toUser.getIcon());
            postComment.setToUsername(toUser.getUsername());
        }

        super.mapper.insert(postComment);
    }

    /**
     * 删除文章评论，如果有回复，先删除回复，再删除文章评论
     * @param id 文章评论id
     */
    @Override
    public void deleteById(Serializable id) {
        List<PostComment> postComments = super.mapper.listByToCommentId(id);
        if (!postComments.isEmpty()) {
            postComments.forEach(postComment -> super.deleteById(postComment.getCommentId()));
        }
        super.deleteById(id);
    }

    @Override
    public List<PostComment> listById(Long id) {
        return super.mapper.listByPostId(id);
    }
}
