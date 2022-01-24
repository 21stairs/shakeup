package com.shakeup.repository;

import com.shakeup.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// JpaRepository<Entity 클래스, ID 값>
public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);   // 검색 쿼리를 실행한 결과를 전달
    Optional<Users> findById(String id);
    Optional<Users> findByUid(Long uid);
    Optional<Users> findByName(String name);
}
