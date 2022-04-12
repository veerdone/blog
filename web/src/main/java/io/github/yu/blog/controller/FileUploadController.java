package io.github.yu.blog.controller;

import io.github.yu.base.result.ObjectResult;
import io.github.yu.blog.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/file")
public class FileUploadController {
    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/upload/image")
    public ObjectResult uploadImage(@RequestParam("file")MultipartFile multipartFile) throws IOException {
        return fileUploadService.imageUpload(multipartFile);
    }

    @GetMapping("/delete/iamge")
    public void deleteImage(@RequestParam("filename") String filename) throws IOException {
        fileUploadService.deleteImage(filename);
    }
}
