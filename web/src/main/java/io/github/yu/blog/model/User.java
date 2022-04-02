package io.github.yu.blog.model;


import lombok.Data;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

@Data
public class User {
    // 用户id
    private Long userId;
    @NotEmpty(message = "账号不能为空")
    // 用户账号
    private String account;
    @NotEmpty(message = "用户名不能为空")
    // 用户名
    private String username;
    @NotEmpty(message = "密码不能为空")
    // 用户密码
    private String password;
    @NotEmpty(message = "手机号不能为空")
    // 用户手机号
    private String telephone;
    // 用户性别，0代码男，1代表女
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
