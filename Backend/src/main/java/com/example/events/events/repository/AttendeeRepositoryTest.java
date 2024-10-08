package com.example.events.events.repository;

import com.example.events.events.models.Attendee;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
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
        // Save a valid attendee in the database for testing
        testAttendee = new Attendee();
        testAttendee.setEmail("john.doe@example.com");
        testAttendee.setFirstName("John");
        testAttendee.setLastName("Doe");
        
        attendeeRepository.save(testAttendee);
    }

    @ParameterizedTest
    @CsvSource({
        "john.doe@example.com, true",    // Valid email should return true (found)
        "jane.doe@example.com, false",   // Invalid email should return false (not found)
        "random@example.com, false"      // Another invalid email should return false
    })
    public void testFindByEmail(String email, boolean expectedResult) {
        // when
        Optional<Attendee> foundAttendee = attendeeRepository.findByEmail(email);

        // then
        assertThat(foundAttendee.isPresent()).isEqualTo(expectedResult);
    }
}














// package com.example.events.events.repository;

// import com.example.events.events.models.Attendee;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

// import java.util.Optional;

// import static org.assertj.core.api.Assertions.assertThat;

// @DataJpaTest
// public class AttendeeRepositoryTest {

//     @Autowired
//     private AttendeeRepository attendeeRepository;

//     private Attendee testAttendee;

//     @BeforeEach
//     public void setUp() {
//         // Create a new Attendee object and save it to the in-memory H2 database
//         testAttendee = new Attendee();
//         testAttendee.setEmail("test@example.com");
//         testAttendee.setFirstName("John");
//         testAttendee.setLastName("Doe");

//         attendeeRepository.save(testAttendee); // Save the test attendee
//     }

//     @Test
//     public void whenFindByEmail_thenReturnAttendee() {
//         // when
//         Optional<Attendee> foundAttendee = attendeeRepository.findByEmail("test@example.com");

//         // then
//         assertThat(foundAttendee).isPresent(); // Check that the attendee exists
//         assertThat(foundAttendee.get().getEmail()).isEqualTo("test@example.com");
//         assertThat(foundAttendee.get().getFirstName()).isEqualTo("John");
//         assertThat(foundAttendee.get().getLastName()).isEqualTo("Doe");
//     }

//     @Test
//     public void whenFindByInvalidEmail_thenReturnEmpty() {
//         // when
//         Optional<Attendee> foundAttendee = attendeeRepository.findByEmail("invalid@example.com");

//         // then
//         assertThat(foundAttendee).isEmpty(); // No attendee should be found
//     }
// }











// package com.example.events.events.repository;

// import java.util.Optional;

// import org.springframework.data.jpa.repository.JpaRepository;

// import com.example.events.events.models.Attendee;

// public interface AttendeeRepository extends JpaRepository <Attendee, Long> {
//     Optional<Attendee> findByEmail(String email);
// }
