package io.github.yu.common.util;

import cn.hutool.core.lang.Snowflake;

public final class IdUtil {
    private static final Snowflake snow = cn.hutool.core.util.IdUtil.getSnowflake();

    public static Long getId() {
        return snow.nextId();
    }
}
