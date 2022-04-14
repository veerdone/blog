package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.Post;
import io.github.yu.blog.model.PostQuery;
import io.github.yu.blog.model.PostVo;
import io.github.yu.blog.service.PostService;
import io.github.yu.common.exception.ParameterErrorException;
import io.github.yu.common.util.RequestUtil;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/listVo")
    public List<PostVo> listVo() {
        return super.service.listVo();
    }

    @GetMapping("/pageListVo")
    public List<PostVo> PageListVo() {
        return super.service.pageListVo();
    }

    @GetMapping("/pageListVoBySortId")
    public List<PostVo> pageListVoBySortId(@RequestParam("sortId") Integer sortId) {
        if (sortId < 0) {
            throw new ParameterErrorException();
        }
        return super.service.pageListVoBySortId(sortId);
    }

    @GetMapping("/pageListVoByTagId")
    public List<PostVo> pageListVoByTagId(@RequestParam("tagId") Integer tagId) {
        if (tagId < 0) {
            throw new ParameterErrorException();
        }
        return super.service.pageListVoByTagId(tagId);
    }

    @GetMapping("/listVoBySortId")
    public List<PostVo> listVoBySortId(@RequestParam("sortId") Integer sortId) {
        if (sortId < 0) {
            throw new ParameterErrorException();
        }
        return super.service.listVoBySortId(sortId);
    }

    @GetMapping("/listVoByTagId")
    public List<PostVo> listVoByTagId(@RequestParam("tagId") Integer tagId) {
        if (tagId < 0) {
            throw new ParameterErrorException();
        }
        return super.service.listVoByTagId(tagId);
    }
}
