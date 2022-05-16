package io.github.yu.blog.service.impl;

import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.BrowseHistoryMapper;
import io.github.yu.blog.model.BrowseHistory;
import io.github.yu.blog.service.BrowseHistoryService;
import io.github.yu.common.util.IdUtil;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BrowseHistoryServiceImpl extends BaseServiceImpl<BrowseHistory, BrowseHistory, BrowseHistoryMapper>
        implements BrowseHistoryService {

    @Override
    public void insert(BrowseHistory browseHistory) {
        BrowseHistory history = super.mapper.getByEntity(browseHistory);
        if (history != null) {
            browseHistory.setLastBrowseTime(LocalDateTime.now());
            super.mapper.updateById(browseHistory);
            return;
        }
        browseHistory.setId(IdUtil.getId());
        if (null == browseHistory.getBrowseTime()) {
            browseHistory.setBrowseTime(LocalDateTime.now());
        }
        super.mapper.insert(browseHistory);
    }
}
