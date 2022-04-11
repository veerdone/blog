package io.github.yu.common.handler;

import io.github.yu.common.util.ReflectUtil;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Signature;
import org.springframework.stereotype.Component;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Intercepts({@Signature(method = "update", type = Executor.class, args = {MappedStatement.class, Object.class})})
@Component
public class TimeInterceptor implements Interceptor {
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        Object[] args = invocation.getArgs();
        for (Object arg : args) {
            Annotation annotation = ReflectUtil.getAnnotation(arg, TimeBean.class);
            if (null != annotation) {
                Field[] fields = cn.hutool.core.util.ReflectUtil.getFields(arg.getClass());
                for (Field field : fields) {
                    TimeField timeField = field.getAnnotation(TimeField.class);
                    if (timeField != null) {
                        field.setAccessible(true);
                        if (timeField.type().getSimpleName().equals("LocalDateTime")) {
                            field.set(arg, LocalDateTime.now());
                            continue;
                        }
                        if (timeField.type().getSimpleName().equals("LocalDate")) {
                            field.set(arg, LocalDate.now());
                            continue;
                        }
                        if (timeField.type().getSimpleName().equals("LocalTime")) {
                            field.set(arg, LocalTime.now());
                        }
                    }
                }
            }
        }
        return invocation.proceed();
    }
}
