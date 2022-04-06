package io.github.yu.blog.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostQuery extends Post {
    private int startPage;
    private int pageSize;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String column;
    private String order;
}
