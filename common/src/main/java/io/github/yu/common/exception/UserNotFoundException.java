package io.github.yu.common.exception;

import io.github.yu.common.constant.ExceptionEnum;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class UserNotFoundException extends BaseException {
    public UserNotFoundException() {
    }

    public UserNotFoundException(String message, HttpStatus status) {
        super(message, status);
    }

    public UserNotFoundException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum);
    }
}
