package com.shivani.notice_zone_backend.repository;


import com.shivani.notice_zone_backend.model.Department;
import com.shivani.notice_zone_backend.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
//    List<Notice> findByDepartmentId(Long departmentId);
//    List<Notice> findByUserId(Long userId);
    List<Notice> findByDepartment(Department department);  //this is added by me in second code of chatgpt
   List<Notice> findByVisibleToAllTrueOrderByCreatedAtDesc();
    List<Notice> findByDepartmentAndClassSection(Department dept, String section);
}

