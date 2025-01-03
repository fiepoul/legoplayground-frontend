import React from 'react';
import './Header.css';

const Header = ({ handleBackToIntro }) => (
  <header className="header">
    <h1>
      <span className="header-text" onClick={handleBackToIntro}>
        LEGO PLAYGROUND
      </span>
    </h1>
  </header>
);

export default Header;