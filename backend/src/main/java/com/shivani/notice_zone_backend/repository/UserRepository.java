package com.shivani.notice_zone_backend.repository;


import com.shivani.notice_zone_backend.model.User;
import com.shivani.notice_zone_backend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    List<User> findByRole(Role role);

    List<User> findByRoleAndDepartmentId(Role role, Long departmentId);
}

