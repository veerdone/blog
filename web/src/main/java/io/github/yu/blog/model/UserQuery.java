package io.github.yu.blog.model;

import lombok.Data;

@Data
public class UserQuery extends User {
    private String newPassword;
    private int startPage;
    private int pageSize;
}
