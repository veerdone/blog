package io.github.yu.blog.config;

import com.github.pagehelper.PageHelper;
import io.github.yu.common.util.RequestUtil;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 配置分页
 */
@Aspect
@Component
public class PageConfig {
    @Pointcut("execution(* io.github.yu.blog.service.impl.*.page*(..)) || execution(* io.github.yu.base.service.impl.BaseServiceImpl.page*(..))")
    public void pointcut(){}

    @Around("pointcut()")
    public Object startPage(ProceedingJoinPoint joinPoint) throws Throwable {
        List<Integer> param = null;
        if ("GET".equals(RequestUtil.getRequestMethod())) {
            param = getParamFromHeader();
        } else {
            param = getParamFromBody(joinPoint.getArgs()[0]);
        }
        if (param.isEmpty()) {
            param = new ArrayList<>(2);
            param.add(1);
            param.add(10);
        }
        PageHelper.startPage(param.get(0), param.get(1));
        return joinPoint.proceed();
    }

    /**
     * 从请求头获取分页参数
     * @return 分页参数
     */
    public List<Integer> getParamFromHeader() {
        HttpServletRequest request = RequestUtil.getRequest();
        String startPage = request.getParameter("startPage");
        String pageSize = request.getParameter("pageSize");
        if (startPage != null && pageSize != null) {
            List<Integer> list = new ArrayList<>(2);
            list.add(Integer.parseInt(startPage));
            list.add(Integer.parseInt(pageSize));
            return list;
        }
        return Collections.emptyList();
    }

    /**
     * 从请求体获取分页参数
     * @param o 请求体
     * @return 分页参数
     * @throws IllegalAccessException 反射异常
     */
    public List<Integer> getParamFromBody(Object o) throws IllegalAccessException {
        Class<?> c = o.getClass();
        Field startPage = null;
        int i1 = 0, i2 = 0;
        try {
            startPage = c.getDeclaredField("startPage");
            startPage.setAccessible(true);
            i1 = startPage.getInt(o);

            Field pageSize = c.getDeclaredField("pageSize");
            pageSize.setAccessible(true);
            i2 = pageSize.getInt(o);
        } catch (NoSuchFieldException ignored) {

        }
        List<Integer> list = new ArrayList<>(2);
        if (i1 != 0 && i2 != 0) {
            list.add(i1);
            list.add(i2);
        }
        return list;
    }
}
