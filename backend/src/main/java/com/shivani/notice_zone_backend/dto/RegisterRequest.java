package com.shivani.notice_zone_backend.dto;

import com.shivani.notice_zone_backend.model.Department;
import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String name;
    private String email;
    private String role;
    private Long departmentId;
//    private String departmentName;
    private String rollNumber;
    private String classSection;

//    public Department getDept() {
//    }
}