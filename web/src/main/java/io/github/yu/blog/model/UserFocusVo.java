package io.github.yu.blog.model;

import lombok.Data;

@Data
public class UserFocusVo extends UserFocus{
    /**
     * 被关注用户
     */
    User focusUser;
}
