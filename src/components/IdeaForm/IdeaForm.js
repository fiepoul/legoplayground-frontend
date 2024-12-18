import React from 'react';
import './IdeaForm.css';

const IdeaForm = ({ bricks, setBricks, handleSubmit }) => {
  return (
    <form className="idea-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your LEGO bricks"
        value={bricks}
        onChange={(e) => setBricks(e.target.value)}
        className="lego-input"
      />
      <button type="submit" className="lego-button">
        Get Ideas
      </button>
    </form>
  );
};

export default IdeaForm;