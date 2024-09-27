package com.example.events.events.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.events.events.models.Event;

public interface EventRepository extends JpaRepository<Event, Long> {


}
