import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminEvents.css";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/events");
        setEvents(response.data);
      } catch (error) {
        setError("Failed to fetch events");
      }
    };

    fetchEvents();
  }, []);

  // Delete an event
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/events/${id}`);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      setError("Failed to delete the event");
    }
  };

  const handleEdit = (id) => {
    console.log("Edit event with ID:", id);
  };

  return (
    <div className="admin-events-page">
      <h1>Manage Events</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="events-grid">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <img
                src={event.imageURL}
                alt={event.name}
                className="event-image"
              />
              <div className="event-details">
                <h2>{event.name}</h2>
                <p>{event.address}</p>
                <p>{event.date}</p>
                <p>{event.description}</p>
                <div className="event-actions">
                  <button
                    onClick={() => handleEdit(event.id)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
