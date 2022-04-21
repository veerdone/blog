package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserQuery;
import io.github.yu.blog.service.AdminUserService;
import io.github.yu.blog.service.UserService;
import io.github.yu.common.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminUserController extends BaseController<User, UserQuery, AdminUserService> {
    @Autowired
    private UserService userService;

    @PostMapping("/loginByAccount")
    public void loginByAccount(@RequestBody User user) {
        User u = super.service.getByAccount(user.getAccount());
        if (null == u) {
            throw new UserNotFoundException();
        }
        userService.loginByAccount(user);
    }
    
    @PostMapping("/loginByTelephone")
    public void loginByTelephone(@RequestBody User user) {
        User u = super.service.getByTelephone(user.getTelephone());
        if (null == u) {
            throw new UserNotFoundException();
        }
        userService.loginByTelephone(user);
    }

}
