import React from 'react';
import './Modal.css';

const ImagePreviewModal = ({ imagePreview, onConfirm, onCancel }) => {
  if (!imagePreview) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Preview Image</h2>
        <img src={imagePreview} alt="Preview" className="modal-image" />
        <div className="modal-buttons">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;