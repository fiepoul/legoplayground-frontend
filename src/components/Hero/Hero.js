import React from 'react';
import './Hero.css';
import ImageUpload from './ImageUpload';
import ResultDisplay from './ResultDisplay';

const Hero = ({ handleUploadResult, uploadResult, handleGenerateIdeas, ideas }) => {
  return (
    <div className="hero-container">
      <div className="hero">
        <h2>BUILD WITH ME</h2>
        <p>
          Reimagine, rebuild, and create with your brick leftovers. LEGObot is
          here to help you be creative - Let's see what you can make! 
          Upload your LEGO image to get ideas!
        </p>
        <ImageUpload handleUploadResult={handleUploadResult} 
        handleGenerateIdeas={handleGenerateIdeas}/>
        <ResultDisplay results={uploadResult || ideas} />
      </div>
    </div>
  );
};

export default Hero;