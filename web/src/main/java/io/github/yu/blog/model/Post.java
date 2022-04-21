package io.github.yu.blog.model;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 文章
 * table: blog_post
 */
@Data
public class Post {
    // 文章id
    private Long postId;

    // 文章标题
    @NotEmpty(message = "文章标题不能为空")
    private String postTitle;

    // 文章内容
    @NotEmpty(message = "文章内容不能为空")
    private String postContent;
    // 文章作者id
    private Long userId;
    // 浏览量
    private Integer postViews;
    // 点赞数
    private Integer postLikes;
    // 创建时间
    private LocalDateTime createTime;
    // 修改时间
    private LocalDateTime updateTime;
    // 状态,0表示公开，1表示仅自己可见，2表示审核中，3表示审核失败
    private Integer status;

    // 分类id
    @NotNull(message = "文章分类不能为空")
    private Long sortId;
    // 标题图片
    private String titlePicture;
    // 文章标签id
    @NotEmpty(message = "文章标签不能为空")
    private List<String> postTags;
}
