import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="text-white text-lg font-bold">
        <Link to="/admin">Admin Dashboard</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
