package io.github.yu.common.exception;

import io.github.yu.common.constant.ExceptionEnum;
import org.springframework.http.HttpStatus;

public class AccountOrPassErrorException extends BaseException {
    public AccountOrPassErrorException() {
        super(ExceptionEnum.ACCOUNT_OR_PASSWORD_ERROR);
    }

    public AccountOrPassErrorException(String message, HttpStatus status) {
        super(message, status);
    }

    public AccountOrPassErrorException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum);
    }
}
