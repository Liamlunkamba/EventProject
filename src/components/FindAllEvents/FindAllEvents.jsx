import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import "./FindAllEvents.css";
const FindAllEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEventsData();
  }, []);

  return (
    <div className="events-container">
      <h1>Find All Events</h1>
      <div className="cards-grid">
        {events.map((event) => (
          <Card
            key={event.id}
            id={event.id}
            name={event.name}
            address={event.address}
            date={event.date}
            URL={event.url}
            description={event.description}
            attendees={event.attendees}
          />
        ))}
      </div>
    </div>
  );
};

export default FindAllEvents;
