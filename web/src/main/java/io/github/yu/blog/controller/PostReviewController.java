package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.PostReview;
import io.github.yu.blog.model.PostReviewQuery;
import io.github.yu.blog.service.PostReviewService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/postReview")
public class PostReviewController extends BaseController<PostReview, PostReviewQuery, PostReviewService> {
}
