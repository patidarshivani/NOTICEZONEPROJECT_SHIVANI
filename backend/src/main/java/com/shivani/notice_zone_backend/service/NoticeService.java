package com.shivani.notice_zone_backend.service;


import com.shivani.notice_zone_backend.model.*;
import com.shivani.notice_zone_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepo;

    public List<Notice> getNoticesByDepartment(Department dept) {
        return noticeRepo.findByDepartment(dept);
    }

    public List<Notice> getNoticesForStudent(Department dept, String section) {
        return noticeRepo.findByDepartment(dept);
//        return noticeRepo.findByDepartmentAndClassSection(dept, section);
    }

    public List<Notice> getAdminNotices(){
        return noticeRepo.findByVisibleToAllTrueOrderByCreatedAtDesc();
    }


    public Notice addNotice(Notice notice) {
        return noticeRepo.save(notice);
    }

    public void deleteNotice(Long id) {
        noticeRepo.deleteById(id);
    }

    public Optional<Notice> getNotice(Long id) {
        return noticeRepo.findById(id);
    }
}
