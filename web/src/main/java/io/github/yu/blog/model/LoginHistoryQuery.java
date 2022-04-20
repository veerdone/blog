package io.github.yu.blog.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LoginHistoryQuery extends LoginHistory {
    private int startPage;
    private int pageSize;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
