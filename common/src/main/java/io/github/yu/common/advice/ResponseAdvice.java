package io.github.yu.common.advice;

import com.github.pagehelper.PageInfo;
import io.github.yu.base.result.BaseResult;
import io.github.yu.base.result.ListResult;
import io.github.yu.base.result.ObjectResult;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import java.util.List;

@RestControllerAdvice
public class ResponseAdvice implements ResponseBodyAdvice {
    public boolean supports(MethodParameter methodParameter, Class aClass) {
        if (null == methodParameter.getMethodAnnotation(ExceptionHandler.class)) {
            return true;
        }
        return false;
    }

    public Object beforeBodyWrite(Object o, MethodParameter methodParameter, MediaType mediaType, Class aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
        if (o instanceof List) {
            List list = (List) o;
            PageInfo pageInfo = new PageInfo(list);
            return ListResult.result(pageInfo.getTotal(), list);
        } else if (o instanceof String) {
            return BaseResult.result(HttpStatus.OK.value(), (String) o);
        } else {
            return ObjectResult.result(o);
        }
    }
}
