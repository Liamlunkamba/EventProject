package com.example.events.events.services;

import com.example.events.events.models.Admin;

public interface AdminService {

    Admin login(String email, String password);
    Admin saveAdmin(Admin admin);
    void deleteAdmin(Long id);


}
