import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ id, name, address, date, URL, description, attendees }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/card/${id}`, {
      state: { id, name, address, date, URL, description, attendees },
    });
  };

  return (
    <div
      className="card"
      onClick={handleCardClick}
      key={id}
      style={{ cursor: "pointer" }}
    >
      <img src={URL} alt={name} className="card-image" />
      <div className="card-content">
        <h1>{name}</h1>
        <h2>{address}</h2>
        <h3>{date}</h3>
      </div>
    </div>
  );
};

export default Card;
