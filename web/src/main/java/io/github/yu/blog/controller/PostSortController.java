package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.Sort;
import io.github.yu.blog.service.SortService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/postSort")
public class PostSortController extends BaseController<Sort, Sort, SortService> {
}
