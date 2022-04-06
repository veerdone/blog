package io.github.yu.common.advice;

import io.github.yu.base.result.BaseResult;
import io.github.yu.common.exception.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestControllerAdvice
@Slf4j
public class ExceptionAdvice {

    @ExceptionHandler(BindException.class)
    public BaseResult bindExceptionHandle(BindException e, HttpServletResponse response) {
        String message = getMessage(e);
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        return BaseResult.result(HttpStatus.BAD_REQUEST.value(), message);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public BaseResult MethodArgumentNotValidExceptionHandle(MethodArgumentNotValidException e, HttpServletResponse response) {
        String message = getMessage(e);
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        return BaseResult.result(HttpStatus.BAD_REQUEST.value(), message);
    }

    @ExceptionHandler({RuntimeException.class, Exception.class})
    public BaseResult exceptionHandle(Exception e, HttpServletResponse response) {
        if (e instanceof BaseException) {
            response.setStatus(((BaseException) e).getStatus().value());
            return BaseResult.result(((BaseException) e).getStatus().value(), e.getMessage());
        }
        log.warn("{}", e.getMessage());
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        return BaseResult.result(HttpStatus.INTERNAL_SERVER_ERROR.value(), "系统繁忙");
    }

    @ExceptionHandler({Error.class})
    public BaseResult errorHandler(Error error, HttpServletResponse response) {
        log.error("{}", error.getMessage());
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        return BaseResult.result(HttpStatus.INTERNAL_SERVER_ERROR.value(), "系统错误");
    }

    private String getMessage(Exception e) {
        BindingResult result = null;
        if (e instanceof BindException) {
            result = ((BindException) e).getBindingResult();
        } else if (e instanceof MethodArgumentNotValidException) {
            result = ((MethodArgumentNotValidException) e).getBindingResult();
        }
        StringBuilder builder = new StringBuilder();
        List<FieldError> fieldErrors = result.getFieldErrors();
        fieldErrors.forEach(fieldError -> {
            builder.append(fieldError.getDefaultMessage()).append("!");
        });
        return builder.toString();
    }
}
