import React from 'react';
import './Hero.css';
import ImageUpload from './ImageUpload';

const HeroIntro = ({ 
  handleUploadResult, 
  handleGenerateIdeas, 
  uploadResult 
}) => {
  return (
    <div className="hero-container">
      <div className="hero">
        <h2>BUILD WITH ME</h2>
        <p>
          Reimagine, rebuild, and create with your brick leftovers. <br />
          LEGObot is here to help you be creative <br />
          - Let's see what you can make! <br />
          Upload your LEGO image to get ideas!
        </p>
        
        <ImageUpload 
          handleUploadResult={handleUploadResult} 
          handleGenerateIdeas={handleGenerateIdeas} 
        />
        
        {uploadResult && <p className="upload-result">{uploadResult}</p>}
      </div>
    </div>
  );
};

export default HeroIntro;



