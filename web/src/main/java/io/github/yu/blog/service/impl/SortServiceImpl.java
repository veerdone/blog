package io.github.yu.blog.service.impl;

import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.SortMapper;
import io.github.yu.blog.model.Sort;
import io.github.yu.blog.service.SortService;
import org.springframework.stereotype.Service;

@Service
public class SortServiceImpl extends BaseServiceImpl<Sort, Sort, SortMapper>
        implements SortService {
}
