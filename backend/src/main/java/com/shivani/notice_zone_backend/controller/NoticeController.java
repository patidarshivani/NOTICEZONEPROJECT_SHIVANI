package com.shivani.notice_zone_backend.controller;


import com.shivani.notice_zone_backend.model.*;
import com.shivani.notice_zone_backend.repository.*;
import com.shivani.notice_zone_backend.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @RestController
    @RequestMapping("/api/notice")
    @RequiredArgsConstructor
    public class NoticeController {

        private final UserRepository userRepo;
        private final NoticeService noticeService;

        @PostMapping("/add")
        public ResponseEntity<?> addNotice(@RequestBody Notice notice, Authentication auth) {
            User user = userRepo.findByUsername(auth.getName()).orElse(null);

            if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

            Role role = user.getRole();

            if (role == Role.STUDENT) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Students cannot post notices");

            //commented on 9-01-2026
//            if (role == Role.PROFESSOR || role == Role.HOD) {
//                if (!user.getDepartment().equals(notice.getDepartment())) {
//                    System.out.println(user.getDepartment() +"user department *************");
//                    System.out.println(notice.getDepartment() + "notice department *************");
//                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only post for your own department");
//                }
//            }
//            if(role == Role.ADMIN){
//                notice.setCreatedBy(user);
//                Notice saved = noticeService.addNotice(notice);
//            }
            // Admin, Professor, and HOD can all reach here

//            🔥 FIX: always set department from logged-in user
            if (role == Role.ADMIN) {
                notice.setVisibleToAll(true);     // admin notices are global
                notice.setDepartment(null);       // optional (recommended)
            } else {
                notice.setVisibleToAll(false);    // dept notices
                notice.setDepartment(user.getDepartment());
            }
            notice.setCreatedBy(user);
            Notice saved = noticeService.addNotice(notice);

            return ResponseEntity.ok(saved);
        }

        @GetMapping("/student")
        public ResponseEntity<?> getNoticesForStudent(Authentication auth) {
            User student = userRepo.findByUsername(auth.getName()).orElse(null);
            if (student == null || student.getRole() != Role.STUDENT) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

            List<Notice> notices = noticeService.getNoticesForStudent(student.getDepartment(), student.getClassSection());
            return ResponseEntity.ok(notices);
        }

        @GetMapping("/department")
        public ResponseEntity<?> getNoticesForDepartment(Authentication auth) {
            User user = userRepo.findByUsername(auth.getName()).orElse(null);
            if (user == null || user.getRole() == Role.STUDENT) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

            List<Notice> notices = noticeService.getNoticesByDepartment(user.getDepartment());
            return ResponseEntity.ok(notices);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<?> deleteNotice(@PathVariable Long id, Authentication auth) {

            if (auth == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            User user = userRepo.findByUsername(auth.getName()).orElse(null);
            Notice notice = noticeService.getNotice(id).orElse(null);


//            System.out.println("AUTH = " + auth);
            System.out.println("Logged in user: " + auth.getName());
            System.out.println("Notice created by: " + notice.getCreatedBy().getUsername());
            System.out.println("Role: " + user.getRole());

            if (notice == null) return ResponseEntity.notFound().build();

            Role role = user.getRole();
            if (role == Role.ADMIN || (role != Role.STUDENT && notice.getCreatedBy().getUsername().equals(user.getUsername()))) {
                noticeService.deleteNotice(id);
                return ResponseEntity.ok("Deleted");
            }

            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You cannot delete this notice");

        }

@GetMapping("/admin")
        public ResponseEntity<?> getAdminNotices(){
            return ResponseEntity.ok(
                    noticeService.getAdminNotices()
            );

}
    }


