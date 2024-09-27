package com.example.events.events.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.events.events.models.Attendee;
import com.example.events.events.services.AttendeeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("attendee")
public class AttendeeController {


    @Autowired
    private AttendeeService attendeeService;

    @GetMapping
    public List<Attendee> getAllAttendees(){
        return attendeeService.getAllAttendees();
    }


    @GetMapping("/{id}")
    public Attendee getAttendee(Long id){
        return attendeeService.getAttendeeById(id);
    }

    @PostMapping
    public Attendee createAttendee(@RequestBody Attendee attendee) {
        return attendeeService.saveAttendee(attendee);
    }


    @PutMapping("/{id}")
    public Attendee updateAttendee(@PathVariable Long id, @RequestBody Attendee newAttendeeDetails) {
        Attendee attendee = attendeeService.getAttendeeById(id);
        if( attendee!= null){
            attendee.setFirstName(newAttendeeDetails.getFirstName());
            attendee.setLastName(newAttendeeDetails.getLastName());
            attendee.setEmail(newAttendeeDetails.getEmail());
            attendee.setPassword(newAttendeeDetails.getPassword());
            attendee.setEventsAttending(newAttendeeDetails.getEventsAttending());
            return attendeeService.saveAttendee(attendee);
        } else {
            return null;
        }
    }


    @DeleteMapping("/{id}")
    public String deleteAttendee(@PathVariable Long id){
        attendeeService.deleteAttendee(id);
        return "Attendee has been deleted successfully";
    }
    

    @PostMapping("/register")
     public ResponseEntity<?> registerAttendee(@RequestBody Attendee attendee) {
        try {
            attendeeService.registerAttendee(attendee);
            return ResponseEntity.ok(attendee);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginAttendee(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
    
        try {
            Attendee attendee = attendeeService.login(email, password);
            return ResponseEntity.ok(attendee); 
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
