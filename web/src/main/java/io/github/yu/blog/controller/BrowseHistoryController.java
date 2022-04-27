package io.github.yu.blog.controller;

import io.github.yu.base.controller.BaseController;
import io.github.yu.blog.model.BrowseHistory;
import io.github.yu.blog.service.BrowseHistoryService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/browserHistory")
@RestController
public class BrowseHistoryController extends BaseController<BrowseHistory, BrowseHistory, BrowseHistoryService> {

}
