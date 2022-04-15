package io.github.yu.blog.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

/**
 * 用户
 * table: blog_user
 */
@Data
public class User {
    // 用户id
    private Long userId;

    // 用户账号
    @NotEmpty(message = "账号不能为空")
    private String account;

    // 用户名
    @NotEmpty(message = "用户名不能为空")
    private String username;

    // 用户密码
    @NotEmpty(message = "密码不能为空")
    private String password;

    // 用户手机号
    @NotEmpty(message = "手机号不能为空")
    private String telephone;

    // 用户性别，0代码女，1代表男
    private Boolean sex;
    // 粉丝数
    private Long fans;
    // 关注人数
    private Long focus;
    // 总点赞数
    private Long likes;
    // 创建时间
    private LocalDateTime createTime;
    // 用户状态，0表示正常，1表示禁用
    private Integer status;
    // 用户头像
    private String icon;
}
