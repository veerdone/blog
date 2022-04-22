package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.UserFocus;
import io.github.yu.blog.model.UserFocusVo;
import io.github.yu.blog.service.UserFocusService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/userFocus")
public class UserFocusController extends BaseController<UserFocus, UserFocus, UserFocusService> {
    @PostMapping("/listVoByEntity")
    public List<UserFocusVo> listVoByEntity(@RequestBody UserFocus userFocus) {
        return super.service.listVoByEntity(userFocus);
    }
}
