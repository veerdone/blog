package io.github.yu.common.exception;

import io.github.yu.common.constant.ExceptionEnum;
import org.springframework.http.HttpStatus;

public class TelephoneExistException extends BaseException {

    public TelephoneExistException() {
    }

    public TelephoneExistException(String message, HttpStatus status) {
        super(message, status);
    }

    public TelephoneExistException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum);
    }
}
