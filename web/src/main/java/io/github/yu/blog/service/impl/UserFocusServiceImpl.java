package io.github.yu.blog.service.impl;

import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.UserFocusMapper;
import io.github.yu.blog.model.UserFocus;
import io.github.yu.blog.service.UserFocusService;
import org.springframework.stereotype.Service;

@Service
public class UserFocusServiceImpl extends BaseServiceImpl<UserFocus, UserFocus, UserFocusMapper>
        implements UserFocusService {
}
