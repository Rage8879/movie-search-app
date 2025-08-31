import React from 'react';
import './LoadingSpinner.css';

/**
 * LoadingSpinner Component
 * Displays a loading animation with optional message
 * @param {string} message - Optional loading message to display
 * @param {string} size - Size of the spinner ('small', 'medium', 'large')
 */
const LoadingSpinner = ({ message = 'Loading...', size = 'medium' }) => {
  return (
    <div className="loading-spinner-container">
      <div className={`loading-spinner ${size}`}>
        <div className="spinner-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      
      {message && (
        <p className="loading-message">{message}</p>
      )}
      
      {/* Optional animated dots */}
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
