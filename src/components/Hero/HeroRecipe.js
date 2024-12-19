import React from 'react';
import './Hero.css';

const HeroRecipe = ({ recipe }) => {
  if (!recipe) {
    return null; // Skjul komponenten, hvis der ikke er data
  }

  return (
    <div className="hero-recipe">
      <h2>LEGO Recipe</h2>
      <div className="recipe-card">
        <p>{recipe}</p>
      </div>
    </div>
  );
};

export default HeroRecipe;