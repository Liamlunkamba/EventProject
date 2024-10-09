import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";

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
    <div className="px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold mb-12">Find All Events</h1>
      <div className="flex flex-wrap justify-center gap-6">
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

