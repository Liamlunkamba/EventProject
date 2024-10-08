
import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../auth/AuthContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CardDetail.css";

const CardDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, address, date, URL, description, attendees } =
    location.state;

  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [coords, setCoords] = useState([51.505, -0.09]); // Default coordinates (London)
  const [loadingMap, setLoadingMap] = useState(true);

  const isAttending =
    attendees?.length > 0 && user?.email && attendees.includes(user.email);

  // Geocode the address to get coordinates
  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setCoords([parseFloat(lat), parseFloat(lon)]);
          setLoadingMap(false);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setLoadingMap(false);
      }
    };

    if (address) {
      fetchCoords();
    }
  }, [address]);

  // Google Maps directions URL
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}`;

  const handleAttend = async () => {
    if (!user) {
      setMessage("You must be logged in to attend this event.");
      return;
    }

    try {
      const updatedAttendees = [...(attendees || []), user.email];

      await axios.put(`http://localhost:8080/events/${id}`, {
        id: id,
        name: name,
        address: address,
        date: date,
        url: URL,
        description: description,
        attendees: updatedAttendees,
      });

      setMessage("Successfully registered for the event!");
      setTimeout(()=>navigate("/findAllEvents"),1000)
      
    } catch (error) {
      setMessage("Failed to register for the event. Please try again.");
      console.error("Error during attend request:", error);
    }
  };

  const handleWithdraw = async () => {
    if (!user) {
      setMessage("You must be logged in to withdraw from this event.");
      return;
    }

    try {
      const updatedAttendees = attendees.filter(
        (email) => email !== user.email
      );

      await axios.put(`http://localhost:8080/events/${id}`, {
        id: id,
        name: name,
        address: address,
        date: date,
        url: URL,
        description: description,
        attendees: updatedAttendees,
      });

      setMessage("Successfully withdrawn from the event!");
      setTimeout(()=>navigate("/findAllEvents"),1000)
      
    } catch (error) {
      setMessage("Failed to withdraw from the event. Please try again.");
      console.error("Error during withdraw request:", error);
    }
  };

  return (
    <div className="card-detail-container">
      <h1>{name}</h1>

      <img src={URL} alt={name} className="card-detail-image" />
      <h2>{address}</h2>
      <h3>{date}</h3>
      <p>{description}</p>

      {isAttending ? (
        <button onClick={handleWithdraw} className="withdraw-button">
          Withdraw
        </button>
      ) : (
        <button onClick={handleAttend} className="attend-button">
          Attend
        </button>
      )}

      {message && <p className="message">{message}</p>}

      {/* Show map if coordinates are loaded */}
      {!loadingMap ? (
        <div className="map-container">
          <MapContainer center={coords} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coords}>
              <Popup>
                {name} <br /> {address}
                <br />
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default CardDetail;
