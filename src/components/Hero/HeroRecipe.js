import React from 'react';
import './Hero.css';

const HeroRecipe = ({ recipe }) => {
  if (!recipe) {
    return null; // Skjul komponenten, hvis der ikke er en opskrift
  }

  // Split opskriften i linjer
  const lines = recipe.split('\n');
  
  // Find og fjern overskriften og beskrivelsen
  const headline = lines[0]?.replace(/\*\*/g, '').trim(); // Fjern ** fra overskriften
  const description = lines[1]?.trim(); // Beskrivelse på anden linje

  // Filtrér og formater trinnene
  const steps = lines.slice(2) // Resten er trin
    .map(line => line.replace(/\*\*Step \d+:\*\*/g, '').trim()) // Fjern **Step X:** og trim linjen
    .filter(step => step); // Fjern tomme linjer

  return (
    <div className="hero-recipe">
      <h2>{headline}</h2>
      {description && <p>{description}</p>}
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default HeroRecipe;