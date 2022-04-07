package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.PostTag;
import io.github.yu.blog.service.PostTagService;
import io.github.yu.common.exception.ParameterErrorException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/postTag")
public class PostTagController extends BaseController<PostTag, PostTag, PostTagService> {

    @GetMapping("/listBySortId")
    public List<PostTag> listBySortId(@RequestParam("sortId") Integer sortId) {
        if (sortId < 0) {
            throw new ParameterErrorException();
        }
        return super.service.listBySortId(sortId);
    }
}
