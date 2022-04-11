package io.github.yu.common.util;

import java.lang.annotation.Annotation;

public class ReflectUtil {
    public static Annotation getAnnotation(Object o, Class a) {
        Class<?> c = o.getClass();
        return c.getAnnotation(a);
    }
}
