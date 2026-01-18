package com.shivani.notice_zone_backend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}