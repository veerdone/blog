package io.github.yu.blog.service.impl;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import io.github.yu.base.result.ObjectResult;
import io.github.yu.blog.service.FileUploadService;
import io.github.yu.common.exception.FileSuffixException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.Inet4Address;
import java.net.UnknownHostException;

@Service
public class FileUploadServiceImpl implements FileUploadService {
    @Value("${blog.upload.image}")
    private String path;

    /**
     * 上传单个图片, 校验后缀是否符合规范, 上传后返回文件地址
     * @param multipartFile 图片文件
     * @return 上传后的图片服务器地址
     * @throws IOException io异常
     */
    @Override
    public ObjectResult imageUpload(MultipartFile multipartFile) throws IOException {
        File folder = new File(path);
        if (!folder.exists()) {
            folder.mkdirs();
        }
        String filename = multipartFile.getOriginalFilename();
        String suffix = checkAndGetFileSuffix(filename);
        filename = IdUtil.simpleUUID() + "." +suffix;
        File file = new File(path + filename);
        multipartFile.transferTo(file);

        return ObjectResult.result(filename);
    }

    @Override
    public void deleteImage(String filename) throws IOException {
        File file = new File(path + filename);
        if (file.exists()) {
            if (file.isDirectory()) {
                return;
            }
            file.delete();
        }
    }

    private String checkAndGetFileSuffix(String filename) {
        String suffix = FileUtil.getSuffix(filename);
        if (suffix.equals("jpg") || suffix.equals("jpeg") || suffix.equals("png")) {
            return suffix;
        }
        throw new FileSuffixException();
    }
}
