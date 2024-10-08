import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext.jsx";
import "./YourEvents.css";
import Card from "../Card/Card.jsx";

function YourEvents() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Signed-up Events</h2>
      <div className="row">
        {events
          .filter((event) => {
            return event.attendees?.includes(user?.email);
          })
          .map((event) => (
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
}

export default YourEvents;