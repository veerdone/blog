package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.PostTag;
import io.github.yu.blog.service.PostTagService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/postTag")
public class PostTagController extends BaseController<PostTag, PostTag, PostTagService> {
}
