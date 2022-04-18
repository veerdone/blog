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

    @GetMapping("/pagePostVo")
    public List<PostVo> PageListVo() {
        return super.service.pagePostVo();
    }

    @PostMapping("/pagePostVoByQuery")
    public List<PostVo> pagePostVoByQuery(@RequestBody PostQuery query) {
        return super.service.pagePostVoQuery(query);
    }

    @GetMapping("/pagePostVoBySortId")
    public List<PostVo> pagePostVoBySortId(@RequestParam("sortId") Integer sortId) {
        if (sortId < 0) {
            throw new ParameterErrorException();
        }
        return super.service.pagePostVoBySortId(sortId);
    }

    @GetMapping("/pagePostVoByTagId")
    public List<PostVo> pagePostVoByTagId(@RequestParam("tagId") Integer tagId) {
        if (tagId < 0) {
            throw new ParameterErrorException();
        }
        return super.service.pagePostVoByTagId(tagId);
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

    @GetMapping("/pagePostVoByUserId")
    public List<PostVo> pagePostVoByUserId(@RequestParam("userId") String userId) {
        return super.service.pagePostVoByUserId(userId);
    }
}
