package io.github.yu.common.exception;

import io.github.yu.common.constant.ExceptionEnum;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class BaseException extends RuntimeException {
    private ExceptionEnum exceptionEnum;
    private HttpStatus status;

    public BaseException() {
    }

    public BaseException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public BaseException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum.getMessage());
        this.status = exceptionEnum.getStatus();
    }
}
