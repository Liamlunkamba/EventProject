package com.example.events.events.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.events.events.models.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>{
    Optional<Admin> findByEmail(String email);
}
