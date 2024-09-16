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
        backgroundImage: `url(https://img.freepik.com/free-photo/people-taking-part-business-event_23-2149333686.jpg?t=st=1726199873~exp=1726203473~hmac=0053bb489e40d9221eee3d4389b2866af1eae04bf586b5b987cc1caa5994bc24&w=1380)`,
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
