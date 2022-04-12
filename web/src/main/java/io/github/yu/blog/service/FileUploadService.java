package io.github.yu.blog.service;

import io.github.yu.base.result.ObjectResult;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileUploadService {
    ObjectResult imageUpload(MultipartFile multipartFile) throws IOException;

    void deleteImage(String filename) throws IOException;
}
