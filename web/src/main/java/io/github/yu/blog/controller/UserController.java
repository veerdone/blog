package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserQuery;
import io.github.yu.blog.service.UserService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController extends BaseController<User, UserQuery, UserService> {
    @Override
    @PostMapping("/insert")
    public void insert(@RequestBody @Validated User user) {
        super.insert(user);
    }

    @GetMapping("/getByAccount")
    public User getByAccount(@RequestParam String account) {
        return this.service.getByAccount(account);
    }

    @PostMapping("/login")
    public void login(@RequestBody User user) {
        super.service.login(user);
    }

}
