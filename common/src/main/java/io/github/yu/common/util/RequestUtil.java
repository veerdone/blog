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

    /**
     * 获取请求方式
     * @return 请求方式
     */
    public static String getRequestMethod() {
        HttpServletRequest request = getRequest();
        return request.getMethod();
    }

    /**
     * 获取请求IP
     * @return 请求IP
     */
    public static String getRequestIp() {
        HttpServletRequest request = getRequest();
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Forwarded-For");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return "0:0:0:0:0:0:0:1".equals(ip) ? "127.0.0.1" : ip;
    }
}
