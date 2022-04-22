package io.github.yu.blog.service;

import io.github.yu.base.service.BaseService;
import io.github.yu.blog.model.UserFocus;
import io.github.yu.blog.model.UserFocusVo;

import java.util.List;

public interface UserFocusService extends BaseService<UserFocus, UserFocus> {
    List<UserFocusVo> listVoByEntity(UserFocus userFocus);
}
