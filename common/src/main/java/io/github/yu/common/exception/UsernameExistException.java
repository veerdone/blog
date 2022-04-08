package io.github.yu.common.exception;

import io.github.yu.common.constant.ExceptionEnum;
import org.springframework.http.HttpStatus;

public class UsernameExistException extends BaseException {
    public UsernameExistException() {
        super(ExceptionEnum.USERNAME_EXIST);
    }

    public UsernameExistException(String message, HttpStatus status) {
        super(message, status);
    }

    public UsernameExistException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum);
    }
}
