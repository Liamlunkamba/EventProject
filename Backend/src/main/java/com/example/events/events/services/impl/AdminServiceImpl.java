package com.example.events.events.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.events.events.models.Admin;
import com.example.events.events.repository.AdminRepository;
import com.example.events.events.services.AdminService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdminRepository adminRepository;

     public Admin login(String email, String password) {
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);
        if (adminOptional.isEmpty()) {
            throw new IllegalStateException("Email not registered");
        }

        Admin admin = adminOptional.get();
        if (!password.equals(admin.getPassword())) {
            throw new IllegalStateException("Invalid password");
        }

        return admin;
    }
    public Admin saveAdmin( Admin admin){
        return adminRepository.save(admin);
    }


    public void deleteAdmin(Long id){
        adminRepository.deleteById(id);
    }
    
}
