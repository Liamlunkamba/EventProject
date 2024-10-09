import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const EventsNavbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center bg-black bg-opacity-95 p-4 relative w-full z-10 font-poppins">
      <div className="text-white text-3xl">
        <Link to="/">Events</Link>
      </div>
      <input type="checkbox" id="navbar-toggle" className="hidden" />
      <label htmlFor="navbar-toggle" className="text-white text-2xl cursor-pointer md:hidden">
        &#9776;
      </label>
      <ul className="hidden md:flex space-x-8 text-white">
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/contact" className="hover:bg-gray-600 px-4 py-2 rounded">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/your-events" className="hover:bg-gray-600 px-4 py-2 rounded">
                Your Events
              </Link>
            </li>
            <li>
              <Link
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="hover:bg-gray-600 px-4 py-2 rounded">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:bg-gray-600 px-4 py-2 rounded">
                Register
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:bg-gray-600 px-4 py-2 rounded">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:bg-gray-600 px-4 py-2 rounded">
                Contact Us
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default EventsNavbar;
