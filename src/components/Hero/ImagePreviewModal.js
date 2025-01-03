import React from 'react';
import './Modal.css';

const ImagePreviewModal = ({ imagePreview, uploadStatus, onConfirm, onCancel }) => {
  if (!imagePreview) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onCancel}>
          &times;
        </button>
        <h2>PREVIEW</h2>
        <img src={imagePreview} alt="Preview" className="modal-image" />
        {uploadStatus && <p>{uploadStatus}</p>}
        <div className="modal-buttons">
          <button onClick={onConfirm} className="upload-button">
            Upload
          </button>
          <button onClick={onCancel} className="secondary-button">
            Select New
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;