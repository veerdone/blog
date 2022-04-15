package io.github.yu.blog.controller;

import cn.hutool.core.util.StrUtil;
import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserQuery;
import io.github.yu.blog.service.UserService;
import io.github.yu.common.exception.AccountOrPassErrorException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController extends BaseController<User, UserQuery, UserService> {
    @Override
    @PostMapping("/insert")
    public void insert(@RequestBody @Validated User user) {
        super.insert(user);
    }

    @GetMapping("/getByAccount")
    public User getByAccount(@RequestParam("account") String account) {
        return this.service.getByAccount(account);
    }

    @PostMapping("/loginByAccount")
    public User loginByAccount(@RequestBody User user) {
        if (StrUtil.isEmpty(user.getAccount())) {
            throw new AccountOrPassErrorException();
        }
        if (StrUtil.isEmpty(user.getPassword())) {
            throw new AccountOrPassErrorException();
        }
        return super.service.loginByAccount(user);
    }

    @PostMapping("/loginByTelephone")
    public User loginByTelephone(@RequestBody User user) {
        if (StrUtil.isEmpty(user.getTelephone())) {
            throw new AccountOrPassErrorException();
        }
        if (StrUtil.isEmpty(user.getPassword())) {
            throw new AccountOrPassErrorException();
        }
        return super.service.loginByTelephone(user);
    }

    @GetMapping("/getCurrentUser")
    public User getCurrentUser(@RequestHeader(value = "account", required = false) String account) {
        if (StrUtil.isEmpty(account)){
            return null;
        }
        return super.service.getByAccount(account);
    }

    @PutMapping("/updateByQuery")
    public void updateByQuery(@RequestBody UserQuery query) {
        super.service.updateByQuery(query);
    }
}
