package com.example.events.events.seed;

import com.example.events.events.models.Event;
import com.example.events.events.repository.EventRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SeedData {

    @Bean
    CommandLineRunner seedDatabase(EventRepository eventRepository) {
        return args -> {
            // Check if the database is empty before adding seed data
            if (eventRepository.count() == 0) {
                List<Event> events = Arrays.asList(
                    new Event(null, "Liam's Tech Conference", "50 Hudson Yards",
                     "Join us for an exciting and insightful tech conference, hosted by none other than your future CEO, Liam Lunkamba. Don't miss this opportunity to be part of a dynamic event that will inspire and engage all attendees.", "2024-03-12", "https://cdn.leonardo.ai/users/ccf4405d-bf58-4a18-b826-2308c145009f/generations/0beb630d-1d87-4a53-9ae9-450caeb1e3c9/Leonardo_Phoenix_A_sprawling_luxury_event_room_in_New_York_Cit_1.jpg", Arrays.asList("john.doe@example.com", "jane.smith@example.com")),
                    new Event(null, "Soccer Day  ", "Pier 5, 334 Furman St, Brooklyn Heights, NY 11201", 
                    "This event is designed for passionate soccer fans and sports enthusiasts ", "2024-09-15", "https://i.pinimg.com/originals/16/88/8d/16888d253c960de87dd10283ca2b0c4b.jpg", Arrays.asList("alice.johnson@example.com", "bob.brown@example.com")),
                    new Event(null, "Art Exhibit", "789 Art Gallery", 
                    "An exhibition of modern art", "2024-11-01", "https://catiospaces.com/wp-content/uploads/2021/03/catio-cat-enclosure-time-fighter-catiospaces-1.jpg", Arrays.asList("emily.white@example.com", "david.green@example.com")),
                    new Event(null, "Night of Covenant House Stars", "Jacob Javits Convention Center",
                     "Join us for an unforgettable evening of giving and appreciation in support of Covenant House. ", "2024-12-05", "https://media.licdn.com/dms/image/v2/D4E22AQGW-izcZ9pORQ/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1716306206972?e=2147483647&v=beta&t=n9iqZ8wlbzofAPH-vDPHJXaKW0XD8Go7n7mMTvpxi0I", Arrays.asList("michael.blue@example.com", "sara.yellow@example.com")),
                    new Event(null, "The 3 Changers", "1 Manhattan West", 
                    "Join us to hear about what the big 3 changers have to say about impacting underserved communities in different parts of the country", "2024-09-20", "https://media.licdn.com/dms/image/v2/D5622AQF3g_GBSsRakg/feedshare-shrink_800/feedshare-shrink_800/0/1716485338861?e=2147483647&v=beta&t=eu9B3ud-CX82SRTokyXeJW58zDyUMuES8_2bYIceBzw", Arrays.asList("chris.red@example.com", "sam.purple@example.com"))
                );

                // Save all events to the repository 
                eventRepository.saveAll(events);
                System.out.println("Seed data initialized");
            } else {
                System.out.println("Database already initialized, skipping seed data.");
            }
        };
    }
}
