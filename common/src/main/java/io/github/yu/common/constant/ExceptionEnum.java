package io.github.yu.common.constant;

import org.springframework.http.HttpStatus;

public enum ExceptionEnum {
    USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "用户不存在"),
    ACCOUNT_EXIST(HttpStatus.BAD_REQUEST, "账号已存在"),
    TELEPHONE_EXIST(HttpStatus.BAD_REQUEST, "手机号已注册"),
    ACCOUNT_OR_PASSWORD_ERROR(HttpStatus.BAD_REQUEST, "用户名或密码错误"),
    USER_DISABLE(HttpStatus.FORBIDDEN, "用户被禁用"),
    PARAMETER_ERROR(HttpStatus.BAD_REQUEST, "参数错误"),
    USERNAME_EXIST(HttpStatus.BAD_REQUEST, "用户名已存在")
    ;

    ExceptionEnum(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    private final HttpStatus status;
    private final String message;

    public HttpStatus getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
