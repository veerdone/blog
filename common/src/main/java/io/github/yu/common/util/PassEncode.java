package io.github.yu.common.util;

import cn.hutool.core.util.CharsetUtil;
import cn.hutool.crypto.symmetric.SymmetricAlgorithm;
import cn.hutool.crypto.symmetric.SymmetricCrypto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PassEncode {
    @Value("${blog.password.key}")
    private String key;

    public String Encode(String data) {
        SymmetricCrypto aes = new SymmetricCrypto(SymmetricAlgorithm.AES, key.getBytes());
        return aes.encryptHex(data);
    }

    public boolean match(String src, String pass) {
        SymmetricCrypto aes = new SymmetricCrypto(SymmetricAlgorithm.AES, key.getBytes());
        src = aes.decryptStr(src, CharsetUtil.CHARSET_UTF_8);
        return src.equals(pass);
    }
}
