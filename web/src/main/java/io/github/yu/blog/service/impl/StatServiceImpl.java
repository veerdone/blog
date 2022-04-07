package io.github.yu.blog.service.impl;

import io.github.yu.blog.service.BrowseHistoryService;
import io.github.yu.blog.service.PostService;
import io.github.yu.blog.service.StatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 定时统计
 */
@Component
public class StatServiceImpl implements StatService {
    @Autowired
    private PostService postService;

    @Autowired
    private BrowseHistoryService browseHistoryService;

    /**
     * 每日定时更新昨天博客浏览量
     */
    @Override
    @Scheduled //todo 输入定时
    public void statPostViews() {
        List<Long> postIds = browseHistoryService.listPostIdByYesterdayBrowse();
        postIds.forEach(postId -> {
            Integer count = browseHistoryService.countByPostIdYesterday(postId);
            postService.updateViewsByPostId(postId, count);
        });
    }
}
