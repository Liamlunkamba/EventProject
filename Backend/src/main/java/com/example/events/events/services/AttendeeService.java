package com.example.events.events.services;

import java.util.List;

import com.example.events.events.models.Attendee;

public interface AttendeeService {


    List<Attendee> getAllAttendees();

    Attendee getAttendeeById(Long id);

    Attendee saveAttendee(Attendee attendee);
    Attendee registerAttendee(Attendee attendee);

    Attendee login(String email, String password);
    void deleteAttendee(Long id);

}
