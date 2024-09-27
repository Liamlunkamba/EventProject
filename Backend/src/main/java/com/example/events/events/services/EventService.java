package com.example.events.events.services;


import java.util.List;

import com.example.events.events.models.Event;

public interface EventService {
    List<Event> getAllEvents();
    Event getEventById(Long id);

    Event saveEvent(Event event);


    void deleteEvent(Long id);

}
