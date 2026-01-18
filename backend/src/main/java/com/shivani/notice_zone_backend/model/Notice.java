package com.shivani.notice_zone_backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String filePath; // path to PDF file

    private LocalDateTime createdAt = LocalDateTime.now();

    private String classSection; // optional

    private boolean visibleToAll = false;

    private String pdfUrl; // points to /api/files/download/{filename}


    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}
