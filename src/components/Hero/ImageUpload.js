import React, { useState } from 'react';
import './Hero.css';
import ImagePreviewModal from './ImagePreviewModal';

const ImageUpload = ({ handleGenerateIdeas, handleUploadResult }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setUploadStatus(''); 
    }
  };

  const handleConfirm = async () => {
    if (!selectedImage) return;
  
    try {
      setUploadStatus('Uploading...');
      await handleGenerateIdeas(selectedImage); 
      setUploadStatus('Image uploaded successfully!');
      handleUploadResult('Image uploaded successfully!');
     
      setImagePreview(null);
      setSelectedImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Behold modal åben og vis fejlmeddelelse
      setUploadStatus('An error occurred while uploading your image. Please try again.');
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setImagePreview(null); 
    setUploadStatus(''); 
  };

  return (
    <div className="upload-section">
      <h2>Upload your LEGO Image!</h2>
      <label htmlFor="file-upload" className="blue-button">
        Select File
      </label>
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }} // Skjul standard input
      />

      <ImagePreviewModal
        imagePreview={imagePreview}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        uploadStatus={uploadStatus}
      />
    </div>
  );
};

export default ImageUpload;


