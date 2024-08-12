import React from "react";

interface Card {
  id: number;
  name: string;
  email: string;
}

const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-2 mb-2 hover:bg-gray-400 transition-all duration-300">
      <h2 className="text-sm text-gray-600">ID: {card.id}</h2>
      <h3 className="text-lg font-semibold text-gray-800">{card.name}</h3>
      <p className="text-md text-gray-700">{card.email}</p>
    </div>
  );
};

export default CardComponent;
