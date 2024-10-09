import React from 'react';
import "./Modal.css";

const Modal = ({ show, onClose, imageSrc }) => {
  if (!show) return null; // If `show` is false, don't render the modal

  return (
    <div className="modal">
      <span className="close" onClick={onClose}>&times;</span>
      <img className="modal-content" src={imageSrc} alt="Puzzle Full View" />
    </div>
  );
};

export default Modal;