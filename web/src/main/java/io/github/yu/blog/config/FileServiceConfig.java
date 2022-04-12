package io.github.yu.blog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 文件服务配置
 * 为了能够访问服务器上的文件，需要通过配置才能够访问
 */
@Configuration
public class FileServiceConfig implements WebMvcConfigurer {
    @Value("${blog.upload.image}")
    private String path;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/file/**").addResourceLocations("file:" + path);
    }
}
