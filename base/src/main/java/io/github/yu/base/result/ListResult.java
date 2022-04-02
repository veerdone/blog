package io.github.yu.base.result;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
public class ListResult extends BaseResult {
    private Long total;
    private List list;

    public ListResult() {
    }

    public ListResult(int status, String message, Long total, List list) {
        super(status, message);
        this.total = total;
        this.list = list;
    }

    public static ListResult result(Long total, List list) {
        return new ListResult(HttpStatus.OK.value(), "请求成功", total, list);
    }
}
