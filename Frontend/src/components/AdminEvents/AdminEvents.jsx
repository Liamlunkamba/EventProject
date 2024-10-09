import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Events</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <img
                src={event.imageURL}
                alt={event.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1">
                <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                <p className="text-gray-600 mb-1">{event.address}</p>
                <p className="text-gray-600 mb-1">{event.date}</p>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex justify-between mt-auto">
                  <button
                    onClick={() => handleEdit(event.id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No events available</p>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
