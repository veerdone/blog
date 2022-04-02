package io.github.yu.common.exception;

import io.github.yu.common.constant.ExceptionEnum;
import org.springframework.http.HttpStatus;

public class UserDisableException extends BaseException {
    public UserDisableException() {
        super(ExceptionEnum.USER_DISABLE);
    }

    public UserDisableException(String message, HttpStatus status) {
        super(message, status);
    }

    public UserDisableException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum);
    }
}
