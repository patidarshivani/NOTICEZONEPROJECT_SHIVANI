package com.shivani.notice_zone_backend.controller;

import com.shivani.notice_zone_backend.dto.*;
import com.shivani.notice_zone_backend.model.*;
import com.shivani.notice_zone_backend.repository.*;
import com.shivani.notice_zone_backend.service.CustomUserDetailsService;
import com.shivani.notice_zone_backend.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final CustomUserDetailsService userService;
    private final JwtUtil jwtUtil;
    private final DepartmentRepository deptRepo;
    private final UserRepository userRepo;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
// i have made changes here related to department because it was creating error while accessing notices
        Department dept = deptRepo.findById(request.getDepartmentId())
                .orElseThrow(() -> new RuntimeException("Invalid department ID"));

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(userService.encodePassword(request.getPassword()));
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(Role.valueOf(request.getRole()));

        if (request.getRole().equals("STUDENT")) {
            user.setRollNumber(request.getRollNumber());
            user.setClassSection(request.getClassSection());
        } else {
            user.setRollNumber(null);
            user.setClassSection(null);
        }


//        user.setRollNumber(request.getRollNumber());
//        user.setClassSection(request.getClassSection());

//        user.setDepartment(deptRepo.findById(request.getDepartmentId()).orElse(null));
       user.setDepartment(dept);
        userRepo.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        UserDetails user = userService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(user.getUsername());

        Role role = userRepo.findByUsername(request.getUsername()).get().getRole();

        return ResponseEntity.ok(new AuthResponse(token, role.name(), request.getUsername()));
    }
}