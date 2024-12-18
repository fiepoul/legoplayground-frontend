import React from 'react';
import './Hero.css';

const ResultDisplay = ({ results }) => {
  if (!results) {
    return null; // Hide component if no results are available
  }

  return (
    <div className="result-display">
      <h2>LEGO Ideas and Instructions</h2>
      <div className="result-card">
        <p>{results}</p>
      </div>
    </div>
  );
};

export default ResultDisplay;