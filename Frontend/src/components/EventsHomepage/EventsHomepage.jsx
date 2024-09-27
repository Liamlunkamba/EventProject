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
        backgroundImage: `url(https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
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
