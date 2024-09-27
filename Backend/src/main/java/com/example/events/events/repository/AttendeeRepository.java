package com.example.events.events.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.events.events.models.Attendee;

public interface AttendeeRepository extends JpaRepository <Attendee, Long> {
    Optional<Attendee> findByEmail(String email);
}
