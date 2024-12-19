import React, { useState } from 'react';
import './Hero.css';
import ImagePreviewModal from './ImagePreviewModal';

const ImageUpload = ({ handleUploadResult, handleGenerateIdeas }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Håndter billedvalg
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generer preview
    }
  };

  // Bekræft og start upload
  const handleConfirm = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      setUploadStatus('Uploading...');
      const response = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Image uploaded successfully!');
        handleGenerateIdeas(selectedImage); // Kalder funktionen med billedet
      } else {
        setUploadStatus('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('An error occurred. Please try again.');
    } finally {
      setImagePreview(null); // Skjul modal efter bekræftelse
      setSelectedImage(null); // Ryd valgt billede
    }
  };

  // Annuller preview
  const handleCancel = () => {
    setImagePreview(null);
    setSelectedImage(null);
  };

  return (
    <div className="upload-section">
      <h2>Upload your LEGO Image!</h2>
      <form>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </form>
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}

      {/* Modal til billede preview */}
      <ImagePreviewModal
        imagePreview={imagePreview}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ImageUpload;

