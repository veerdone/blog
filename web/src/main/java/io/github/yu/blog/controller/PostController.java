package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.Post;
import io.github.yu.blog.model.PostQuery;
import io.github.yu.blog.service.PostService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController extends BaseController<Post, PostQuery, PostService>  {

    @Override
    @PostMapping("/insert")
    public void insert(@RequestBody @Validated Post post) {
        super.insert(post);
    }

    @Override
    @PutMapping("/updateById")
    public void updateById(@RequestBody @Validated Post post) {
        super.updateById(post);
    }
}
