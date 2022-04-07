package io.github.yu.blog.mapper;

import io.github.yu.base.mapper.BaseMapper;
import io.github.yu.blog.model.BrowseHistory;

import java.io.Serializable;
import java.util.List;

/**
 * 浏览历史mapper
 */
public interface BrowseHistoryMapper extends BaseMapper<BrowseHistory, BrowseHistory> {
    /**
     * 根据id统计博客的浏览量
     * @param id 博客id
     * @return 浏览量
     */
    Integer countByPostId(Serializable id);

    /**
     * 根据id统计博客昨天的浏览量
     * @param id 博客id
     * @return 昨日浏览量
     */
    Integer countByPostIdYesterday(Serializable id);

    /**
     * 根据用户id和博客id获取浏览记录
     * @param history 浏览记录
     * @return 查找到的浏览记录
     */
    BrowseHistory getByUserIdAndPostId(BrowseHistory history);

    /**
     * 获取昨天被浏览过的博客id
     * @return 昨日被浏览过的博客id
     */
    List<Long> listPostIdByYesterdayBrowse();

}
