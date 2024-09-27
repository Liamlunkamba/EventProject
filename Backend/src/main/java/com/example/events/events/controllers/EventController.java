package com.example.events.events.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.events.events.models.Event;
import com.example.events.events.services.EventService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;


    @GetMapping
    public List<Event> getAllEvents() {
        return  eventService.getAllEvents();
    }
    
    @GetMapping("/id")
    public Event getEventById(@PathVariable Long id){
        return eventService.getEventById(id);
    }


    @PostMapping
    public Event createEvent(@RequestBody Event event){
        return eventService.saveEvent(event);
    }



    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event newEventDetails){
        Event event = eventService.getEventById(id);


        if(event != null){
            event.setName(newEventDetails.getName());
            event.setAddress(newEventDetails.getAddress());
            event.setDate(newEventDetails.getDate());
            event.setUrl(newEventDetails.getUrl());
            event.setDescription(newEventDetails.getDescription());
            event.setAttendees(newEventDetails.getAttendees());

            return eventService.saveEvent(event);
        } else {
            return null;
        }
    
    }


    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id){
        eventService.deleteEvent(id);
        return "Customer has been deleted";
    }
    

}
