package io.github.yu.common.exception;

import io.github.yu.common.constant.ExceptionEnum;
import org.springframework.http.HttpStatus;

public class PasswordErrorException extends BaseException {
    public PasswordErrorException() {
        super(ExceptionEnum.PASSWORD_ERROR_EXCEPTION);
    }

    public PasswordErrorException(String message, HttpStatus status) {
        super(message, status);
    }

    public PasswordErrorException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum);
    }
}
