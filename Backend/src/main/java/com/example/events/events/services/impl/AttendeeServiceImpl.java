package com.example.events.events.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.events.events.models.Attendee;
import com.example.events.events.models.Event;
import com.example.events.events.repository.AttendeeRepository;
import com.example.events.events.repository.EventRepository;
import com.example.events.events.services.AttendeeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendeeServiceImpl implements AttendeeService{

    @Autowired
     AttendeeRepository attendeeRepository;

     @Autowired
     EventRepository eventRepository;


    public List <Attendee> getAllAttendees(){
        return attendeeRepository.findAll();
    }

    public Attendee getAttendeeById(Long id){
        return attendeeRepository.findById(id).orElse(null);
    }

    public Attendee saveAttendee( Attendee attendee){
        return attendeeRepository.save(attendee);
    }


    public void deleteAttendee(Long id){
        attendeeRepository.deleteById(id);
    }
    public Attendee registerAttendee(Attendee attendee) {
        Optional<Attendee> existingAttendee = attendeeRepository.findByEmail(attendee.getEmail());
        if (existingAttendee.isPresent()) {
            throw new IllegalStateException("Email already registered");
        }
        return attendeeRepository.save(attendee);
    }


    public Attendee login(String email, String password) {
        Optional<Attendee> attendeeOptional = attendeeRepository.findByEmail(email);
        if (attendeeOptional.isEmpty()) {
            throw new IllegalStateException("Email not registered");
        }

        Attendee attendee = attendeeOptional.get();
        if (!password.equals(attendee.getPassword())) {
            throw new IllegalStateException("Invalid password");
        }

        return attendee;
    }
    
    public List<Event> getAttendeesEvents(Long attendeeId) {
        Attendee attendee = attendeeRepository.findById(attendeeId)
                .orElseThrow(() -> new RuntimeException("Attendee not found"));

        List<String> eventIds = attendee.getEventsAttending();

        if (eventIds == null || eventIds.isEmpty()) {
            return new ArrayList<>();
        }

        List<Event> events = new ArrayList<>();

        for (String eventId : eventIds) {
            Event event = eventRepository.findById(Long.parseLong(eventId))
                    .orElseThrow(() -> new RuntimeException("Event not found"));
            events.add(event);
        }

        return events;
    }

    
}