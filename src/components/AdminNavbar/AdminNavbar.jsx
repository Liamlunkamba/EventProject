import React from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-logo">
        <Link to="/admin">Admin Dashboard</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
