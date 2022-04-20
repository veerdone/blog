package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.LoginHistory;
import io.github.yu.blog.model.LoginHistoryQuery;
import io.github.yu.blog.service.LoginHistoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/loginHistory")
public class LoginHistoryController extends BaseController<LoginHistory, LoginHistoryQuery, LoginHistoryService> {

}
