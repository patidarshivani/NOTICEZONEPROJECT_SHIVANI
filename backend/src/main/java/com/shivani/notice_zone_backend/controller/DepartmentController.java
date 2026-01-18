package com.shivani.notice_zone_backend.controller;

import com.shivani.notice_zone_backend.model.Department;
import com.shivani.notice_zone_backend.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentRepository departmentRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createDepartment(@RequestBody Department department) {
        Department savedDept = departmentRepository.save(department);
        return ResponseEntity.ok(savedDept);
    }
}
