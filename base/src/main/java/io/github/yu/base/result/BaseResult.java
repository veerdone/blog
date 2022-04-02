package io.github.yu.base.result;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseResult {
    private int status;
    private String message;

    public static BaseResult result(int status, String message) {
        return new BaseResult(status, message);
    }
}
