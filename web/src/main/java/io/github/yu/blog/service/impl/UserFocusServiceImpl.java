package io.github.yu.blog.service.impl;

import io.github.yu.base.service.impl.BaseServiceImpl;
import io.github.yu.blog.mapper.UserFocusMapper;
import io.github.yu.blog.model.User;
import io.github.yu.blog.model.UserFocus;
import io.github.yu.blog.model.UserFocusVo;
import io.github.yu.blog.service.UserFocusService;
import io.github.yu.blog.service.UserService;
import io.github.yu.common.util.IdUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserFocusServiceImpl extends BaseServiceImpl<UserFocus, UserFocus, UserFocusMapper>
        implements UserFocusService {

    @Autowired
    private UserService userService;

    @Override
    public void insert(UserFocus userFocus) {
        if (null == userFocus.getFocusId()) {
            userFocus.setFocusId(IdUtil.getId());
        }
        if (null == userFocus.getFocusTime()) {
            userFocus.setFocusTime(LocalDateTime.now());
        }
        super.mapper.insert(userFocus);
    }

    @Override
    public List<UserFocusVo> listVoByEntity(UserFocus userFocus) {
        List<UserFocusVo> voList = super.mapper.listVoByEntity(userFocus);
        voList.forEach(vo -> {
            User user = userService.getById(vo.getUserFocusId());
            vo.setFocusUser(user);
        });
        return voList;
    }
}
