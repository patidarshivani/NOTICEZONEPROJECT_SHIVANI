package com.shivani.notice_zone_backend.repository;


import com.shivani.notice_zone_backend.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Department findByName(String name);
}

