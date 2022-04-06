package io.github.yu.blog.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostQuery extends Post {
    // 开始页数
    private int startPage;
    // 一页数量
    private int pageSize;
    // 开始时间
    private LocalDateTime startTime;
    // 结束时间
    private LocalDateTime endTime;
    // 排序字段
    private String column;
    // 排序方式，升序或降序
    private String order;
}
