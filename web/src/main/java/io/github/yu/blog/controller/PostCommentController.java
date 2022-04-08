package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.PostComment;
import io.github.yu.blog.service.PostCommentService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/postComment")
public class PostCommentController extends BaseController<PostComment, PostComment, PostCommentService> {
    @Override
    @PostMapping("/insert")
    public void insert(@RequestBody @Validated PostComment postComment) {
        super.insert(postComment);
    }
}
