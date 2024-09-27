package com.example.events.events.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.events.events.models.Event;
import com.example.events.events.repository.EventRepository;
import com.example.events.events.services.EventService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {


    private final EventRepository eventRepository;


    public List<Event> getAllEvents(){
        return eventRepository.findAll();
    }

    public Event getEventById(Long id){
        return eventRepository.findById(id).orElse(null);
    }


    public Event saveEvent(Event event){
        return eventRepository.save(event);
    }


    public void deleteEvent(Long id){
        eventRepository.deleteById(id);
    }
}
