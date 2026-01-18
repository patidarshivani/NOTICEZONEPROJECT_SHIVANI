package com.shivani.notice_zone_backend.service;


import org.apache.tomcat.util.file.ConfigurationSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;


import java.io.*;
import java.nio.file.*;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String storeFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir).resolve(fileName);
        Files.createDirectories(filePath.getParent());
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    public Resource loadFile(String filename) throws IOException {
        Path path = Paths.get(uploadDir).resolve(filename).normalize();
        return new UrlResource(path.toUri());
    }

//    public Resource loadFile(String filename) throws IOException {
//        Path path = Paths.get(uploadDir).resolve(filename).normalize();
//
//        // Security check
//        if (!path.startsWith(Paths.get(uploadDir).toAbsolutePath())) {
//            throw new SecurityException("Unauthorized path access attempt: " + filename);
//        }
//
//        Resource resource = new UrlResource(path.toUri());
//        if (resource.exists() && resource.isReadable()) {
//            return resource;
//        } else {
//            throw new FileNotFoundException("File not found or not readable: " + filename);
//        }
//    }

}

