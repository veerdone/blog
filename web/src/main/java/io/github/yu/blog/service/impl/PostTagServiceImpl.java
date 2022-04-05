package io.github.yu.blog.service.impl;

import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.PostTagMapper;
import io.github.yu.blog.model.PostTag;
import io.github.yu.blog.service.PostTagService;
import org.springframework.stereotype.Service;

@Service
public class PostTagServiceImpl extends BaseServiceImpl<PostTag, PostTag, PostTagMapper>
        implements PostTagService {
}
