package io.github.yu.blog.service;

import io.github.yu.base.service.BaseService;
import io.github.yu.blog.model.BrowseHistory;

import java.io.Serializable;
import java.util.List;

public interface BrowseHistoryService extends BaseService<BrowseHistory, BrowseHistory> {
    List<Long> listPostIdByYesterdayBrowse();

    Integer countByPostId(Serializable id);

    Integer countByPostIdYesterday(Serializable id);
}
