package com.example.events.events.repository;

import com.example.events.events.models.Attendee;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class AttendeeRepositoryTest {

    @Autowired
    private AttendeeRepository attendeeRepository;

    private Attendee testAttendee;

    @BeforeEach
    public void setUp() {
        // Create a new Attendee object and save it to the in-memory H2 database
        testAttendee = new Attendee();
        testAttendee.setEmail("test@example.com");
        testAttendee.setFirstName("John");
        testAttendee.setLastName("Doe");

        attendeeRepository.save(testAttendee); // Save the test attendee
    }

    @Test
    public void whenFindByEmail_thenReturnAttendee() {
        // when
        Optional<Attendee> foundAttendee = attendeeRepository.findByEmail("test@example.com");

        // then
        assertThat(foundAttendee).isPresent(); // Check that the attendee exists
        assertThat(foundAttendee.get().getEmail()).isEqualTo("test@example.com");
        assertThat(foundAttendee.get().getFirstName()).isEqualTo("John");
        assertThat(foundAttendee.get().getLastName()).isEqualTo("Doe");
    }

    @Test
    public void whenFindByInvalidEmail_thenReturnEmpty() {
        // when
        Optional<Attendee> foundAttendee = attendeeRepository.findByEmail("invalid@example.com");

        // then
        assertThat(foundAttendee).isEmpty(); // No attendee should be found
    }
}











// package com.example.events.events.repository;

// import java.util.Optional;

// import org.springframework.data.jpa.repository.JpaRepository;

// import com.example.events.events.models.Attendee;

// public interface AttendeeRepository extends JpaRepository <Attendee, Long> {
//     Optional<Attendee> findByEmail(String email);
// }
