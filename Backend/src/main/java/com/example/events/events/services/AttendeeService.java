package com.example.events.events.services;

import java.util.List;

import com.example.events.events.models.Attendee;
import com.example.events.events.models.Event;

public interface AttendeeService {


    List<Attendee> getAllAttendees();

    Attendee getAttendeeById(Long id);

    Attendee saveAttendee(Attendee attendee);
    Attendee registerAttendee(Attendee attendee);

    Attendee login(String email, String password);
    void deleteAttendee(Long id);


    List<Event> getAttendeesEvents(Long id);

}