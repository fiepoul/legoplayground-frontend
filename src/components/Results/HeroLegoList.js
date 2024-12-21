import React from 'react';
import './Results.css';

const HeroLegoList = ({ legoList }) => {
  if (!legoList || legoList.length === 0) {
    return null; // Skjul komponenten, hvis der ikke er data
  }

  return (
    <div className="hero-list">
      <h2>LEGO Pieces Detected</h2>
      <ul>
        {legoList.map((piece, index) => (
          <li key={index}>
            {piece.quantity} x {piece.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroLegoList;