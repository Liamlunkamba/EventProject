import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});
  const [newEvent, setNewEvent] = useState({
    name: "",
    address: "",
    description: "",
    date: "",
    url: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/events");
        setEvents(response.data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch events");
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleNewEventClick = () => {
    setPopupType("new");
    setShowPopup(true);
  };

  const handleInfoClick = (event) => {
    setSelectedEvent(event);
    setPopupType("info");
    setShowPopup(true);
  };

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setPopupType("delete");
    setShowPopup(true);
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setEditedEvent({
      name: event.name,
      address: event.address,
      description: event.description,
      date: event.date,
      url: event.url,
    });
    setPopupType("edit");
    setShowPopup(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (popupType === "edit") {
      setEditedEvent({ ...editedEvent, [name]: value });
    } else if (popupType === "new") {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:8080/events/${selectedEvent.id}`);
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
      setShowPopup(false);
      setSelectedEvent(null);
    } catch (error) {
      setError("Failed to delete event");
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/events/${selectedEvent.id}`,
        editedEvent
      );
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? { ...event, ...editedEvent } : event
        )
      );
      setShowPopup(false);
      setSelectedEvent(null);
    } catch (error) {
      setError("Failed to update event");
    }
  };

  const handleNewEventSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/events",
        newEvent
      );
      setEvents([...events, response.data]);
      setShowPopup(false);
      setNewEvent({
        name: "",
        address: "",
        description: "",
        date: "",
        url: "",
      });
    } catch (error) {
      setError("Failed to create new event");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedEvent(null);
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <h1>Admin Dashboard</h1>

      <button className="new-event-button" onClick={handleNewEventClick}>
        Create New Event
      </button>

      {error && <p className="error-message">{error}</p>}

      {isLoading ? (
        <p>Loading events...</p>
      ) : (
        <table className="events-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.address}</td>
                <td>{event.date}</td>
                <td>
                  <button
                    className="info-button"
                    onClick={() => handleInfoClick(event)}
                  >
                    Info
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(event)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(event)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            {popupType === "info" && selectedEvent && (
              <>
                <h2>{selectedEvent.name}</h2>
                <p>
                  <strong>Address:</strong> {selectedEvent.address}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedEvent.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Description:</strong> {selectedEvent.description}
                </p>
                <img
                  src={selectedEvent.url}
                  alt={selectedEvent.name}
                  className="popup-image"
                />
                <p>
                  <strong>Attendees:</strong>
                </p>
                <ul>
                  {selectedEvent.attendees &&
                  selectedEvent.attendees.length > 0 ? (
                    selectedEvent.attendees.map((attendee, index) => (
                      <li key={index}>{attendee}</li>
                    ))
                  ) : (
                    <p>No attendees</p>
                  )}
                </ul>
              </>
            )}

            {popupType === "delete" && selectedEvent && (
              <>
                <h2>Confirm Delete</h2>
                <p>
                  Are you sure you want to delete the event "
                  {selectedEvent.name}"?
                </p>
              </>
            )}

            {popupType === "edit" && selectedEvent && (
              <>
                <h2>Edit Event: {selectedEvent.name}</h2>
                <input
                  type="text"
                  name="url"
                  value={editedEvent.url}
                  onChange={handleInputChange}
                  placeholder="Event Image Url"
                  className="popup-input"
                />
                <input
                  type="text"
                  name="name"
                  value={editedEvent.name}
                  onChange={handleInputChange}
                  placeholder="Event Name"
                  className="popup-input"
                />
                <input
                  type="text"
                  name="address"
                  value={editedEvent.address}
                  onChange={handleInputChange}
                  placeholder="Event Address"
                  className="popup-input"
                />
                <textarea
                  name="description"
                  value={editedEvent.description}
                  onChange={handleInputChange}
                  placeholder="Event Description"
                  className="popup-input"
                />
                <input
                  type="text"
                  placeholder="Event Date"
                  name="date"
                  value={editedEvent.date}
                  onChange={handleInputChange}
                  className="popup-input"
                />
              </>
            )}

            {popupType === "new" && (
              <>
                <h2>Create New Event</h2>
                <input
                  type="text"
                  name="name"
                  value={newEvent.name}
                  onChange={handleInputChange}
                  placeholder="Event Name"
                  className="popup-input"
                />
                <input
                  type="text"
                  name="address"
                  value={newEvent.address}
                  onChange={handleInputChange}
                  placeholder="Event Address"
                  className="popup-input"
                />
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  placeholder="Event Description"
                  className="popup-input"
                />
                <input
                  type="input"
                  name="date"
                  placeholder="Event Date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  className="popup-input"
                />
                <input
                  type="text"
                  name="url"
                  value={newEvent.url}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                  className="popup-input"
                />
              </>
            )}

            <div className="popup-actions">
              {popupType === "delete" && (
                <button
                  onClick={handleDeleteConfirm}
                  className="confirm-button"
                >
                  Yes, Delete
                </button>
              )}
              {popupType === "edit" && (
                <button onClick={handleEditSubmit} className="confirm-button">
                  Save Changes
                </button>
              )}
              {popupType === "new" && (
                <button
                  onClick={handleNewEventSubmit}
                  className="confirm-button"
                >
                  Create Event
                </button>
              )}
              <button onClick={handleClosePopup} className="close-button">
                {popupType === "delete" ? "Cancel" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
