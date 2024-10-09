import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, name, address, date, URL, description, attendees }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/card/${id}`, {
      state: { id, name, address, date, URL, description, attendees },
    });
  };

  return (
    <div
      className="bg-gray-100 rounded-lg shadow-lg overflow-hidden m-5 w-72 transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
      key={id}
    >
      <img src={URL} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-2">{name}</h1>
        <h2 className="text-md text-gray-600 mb-1">{address}</h2>
        <h3 className="text-sm text-gray-500">{date}</h3>
      </div>
    </div>
  );
};

export default Card;
