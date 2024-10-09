import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const EventsHomePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div
      className="flex flex-col justify-center items-center h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
      }}
    >
      <header className="text-center text-white bg-black bg-opacity-50 p-8 rounded-lg max-w-xl">
        <h1 className="font-poppins text-5xl font-semibold mb-5 shadow-lg">
          Welcome to the Events Platform
        </h1>
        <p className="font-poppins text-lg font-light text-gray-200 mb-8">
          Discover and participate in amazing events hosted by your organization.
        </p>

        {isLoggedIn ? (
          <Link
            className="px-6 py-3 bg-blue-600 text-white font-poppins text-lg rounded hover:bg-blue-800 transition duration-300"
            to="/findAllEvents"
          >
            View Events
          </Link>
        ) : (
          <Link
            className="px-6 py-3 bg-blue-600 text-white font-poppins text-lg rounded hover:bg-blue-800 transition duration-300"
            to="/register"
          >
            Register Now
          </Link>
        )}
      </header>
    </div>
  );
};

export default EventsHomePage;
