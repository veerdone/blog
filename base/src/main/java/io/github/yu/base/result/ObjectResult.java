package io.github.yu.base.result;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class ObjectResult extends BaseResult {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object data;

    public ObjectResult() {
    }

    public ObjectResult(int status, String message, Object data) {
        super(status, message);
        this.data = data;
    }

    public static ObjectResult result(Object data) {
        return new ObjectResult(HttpStatus.OK.value(), "请求成功", data);
    }
}
