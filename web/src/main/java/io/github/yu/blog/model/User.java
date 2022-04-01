package io.github.yu.blog.model;


import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.time.LocalDateTime;

@Data
@Alias("User")
public class User {
    private Long userId;
    private String account;
    private String username;
    private String password;
    private String telephone;
    private Boolean sex;
    private Long fans;
    private Long focus;
    private Long likes;
    private LocalDateTime createTime;
    private Integer status;
    private String icon;
}
