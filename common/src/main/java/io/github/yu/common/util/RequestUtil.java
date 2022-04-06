package io.github.yu.common.util;

import org.springframework.util.Assert;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

public class RequestUtil {
    /**
     * 获取当前请求的请求头参数
     * @param header 请求头
     * @return 请求头对应参数
     */
    public static String getFromHeader(String header) {
        HttpServletRequest request = getRequest();
        return request.getHeader(header);
    }

    /**
     * 获取当前请求的 HttpServletRequest
     * @return httpServletRequest
     */
    public static HttpServletRequest getRequest() {
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        Assert.notNull(attributes, "RequestContextHolder.getRequestAttributes获取 attribute 为空");
        return ((ServletRequestAttributes) attributes).getRequest();
    }

}
