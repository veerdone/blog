package io.github.yu.common.exception;

import io.github.yu.common.constant.ExceptionEnum;
import org.springframework.http.HttpStatus;

public class ParameterErrorException extends BaseException {
    public ParameterErrorException() {
        super(ExceptionEnum.PARAMETER_ERROR);
    }

    public ParameterErrorException(String message, HttpStatus status) {
        super(message, status);
    }

    public ParameterErrorException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum);
    }
}
