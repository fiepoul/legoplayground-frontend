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
    }
  };

  const handleConfirm = async () => {
    if (!selectedImage) return;

    try {
      setUploadStatus('Uploading...');
      await handleGenerateIdeas(selectedImage); // Venter på, at idéerne genereres
      setUploadStatus('Image uploaded successfully!');
      handleUploadResult('Image uploaded successfully!'); // Opdater `uploadResult`
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('An error occurred. Please try again.');
    } finally {
      setImagePreview(null);
      setSelectedImage(null);
    }
  };

  const handleCancel = () => {
    setImagePreview(null);
    setSelectedImage(null);
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
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}

      <ImagePreviewModal
        imagePreview={imagePreview}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ImageUpload;


