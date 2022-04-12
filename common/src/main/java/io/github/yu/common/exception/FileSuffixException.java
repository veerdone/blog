package io.github.yu.common.exception;

import io.github.yu.common.constant.ExceptionEnum;
import org.springframework.http.HttpStatus;

public class FileSuffixException extends BaseException {
    public FileSuffixException() {
        super(ExceptionEnum.FILE_SUFFIX_ERROR);
    }

    public FileSuffixException(String message, HttpStatus status) {
        super(message, status);
    }

    public FileSuffixException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum);
    }
}
