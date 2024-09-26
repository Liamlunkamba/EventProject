import React, { useContext } from "react";

import "./EventsHomePage.css";
import { Link } from "react-router-dom";

import { AuthContext } from "../auth/AuthContext";
const EventsHomePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(https://cdn.leonardo.ai/users/ccf4405d-bf58-4a18-b826-2308c145009f/generations/5368bf68-c865-4ab9-b23d-a4e1f1ac8d34/Leonardo_Phoenix_A_vibrant_and_bustling_urban_scene_showcasing_0.jpg)`,
      }}
    >
      <header className="home-header">
        <h1>Welcome to the Events Platform</h1>
        <p>Discover and participate in amazing events happening near you.</p>

        {isLoggedIn ? (
          <Link className="cta-button" to="/findAllEvents">
            View Events
          </Link>
        ) : (
          <Link className="cta-button" to="/register">
            Register Now
          </Link>
        )}
      </header>
    </div>
  );
};

export default EventsHomePage;
