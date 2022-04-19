package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.PostReview;
import io.github.yu.blog.model.PostReviewQuery;
import io.github.yu.blog.service.PostReviewService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/postReview")
public class PostReviewController extends BaseController<PostReview, PostReviewQuery, PostReviewService> {

    /**
     * 根据条件进行分页查询，如果状态为4，则代表查询全部，设置为空
     * @param query 分页查询条件
     * @return 分页数据
     */
    @Override
    @PostMapping("/pageByQuery")
    public List<PostReview> pageByQuery(@RequestBody PostReviewQuery query) {
        if (query.getReviewStatus() != null && query.getReviewStatus() == 4) {
            query.setReviewStatus(null);
        }
        return super.pageByQuery(query);
    }
}
