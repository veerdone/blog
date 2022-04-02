package io.github.yu.common.exception;

import io.github.yu.common.constant.ExceptionEnum;
import org.springframework.http.HttpStatus;

public class AccountExistException extends BaseException {
    public AccountExistException() {
    }

    public AccountExistException(String message, HttpStatus status) {
        super(message, status);
    }

    public AccountExistException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum);
    }
}
