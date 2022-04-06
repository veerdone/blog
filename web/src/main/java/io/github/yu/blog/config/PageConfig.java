package io.github.yu.blog.config;

import com.github.pagehelper.PageHelper;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Aspect
@Component
public class PageConfig {
    @Pointcut("execution(* io.github.yu.blog.service.impl.*.page*(..)) || execution(* io.github.yu.base.service.impl.BaseServiceImpl.page*(..))")
    public void pointcut(){}

    @Around("pointcut()")
    public Object startPage(ProceedingJoinPoint joinPoint) throws Throwable {
        List<Integer> param = null;
        param = getParamFromHeader();
        if (param.isEmpty()) {
            param = getParamFromBody(joinPoint.getArgs()[0]);
            if (param.isEmpty()) {
                param = new ArrayList<>(2);
                param.add(1);
                param.add(10);
            }
        }
        PageHelper.startPage(param.get(0), param.get(1));
        return joinPoint.proceed();
    }

    public List<Integer> getParamFromHeader() {
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes) attributes).getRequest();
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

    public List<Integer> getParamFromBody(Object o) throws NoSuchFieldException, IllegalAccessException {
        Class<?> c = o.getClass();
        Field startPage = c.getDeclaredField("startPage");
        startPage.setAccessible(true);
        int i1 = startPage.getInt(o);

        Field pageSize = c.getDeclaredField("pageSize");
        pageSize.setAccessible(true);
        int i2 = pageSize.getInt(o);
        List<Integer> list = new ArrayList<>(2);
        if (i1 != 0 && i2 != 0) {
            list.add(i1);
            list.add(i2);
        }
        return list;
    }
}
