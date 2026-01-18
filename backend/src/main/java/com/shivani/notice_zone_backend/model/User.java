package com.shivani.notice_zone_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Used as login username (can be roll number, teacher ID, admin ID)
    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    private String name;
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // Enum: STUDENT, PROFESSOR, HOD, ADMIN

    private String classSection; // Only for students
    private String rollNumber;   // Only for students

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}