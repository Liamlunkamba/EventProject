import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EventsNavbar.css";
import { AuthContext } from "../auth/AuthContext";

const EventsNavbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">EventsFinder</Link>
      </div>
      <input type="checkbox" id="navbar-toggle" className="navbar-toggle" />
      <label htmlFor="navbar-toggle" className="navbar-icon">
        &#9776;
      </label>
      {/* creating an unordered list that contain links of the navbar */}
      <ul className="navbar-links">
        {isLoggedIn ? (
          <>
            <li>
            
                <Link to="/contact"> <button  className="/contact"> Contact Us</button> </Link>
              
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default EventsNavbar;
