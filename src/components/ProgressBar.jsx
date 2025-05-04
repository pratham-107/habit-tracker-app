// src/components/ProgressBar.jsx
import React from 'react';
import '../styles/ProgressBar.css';

const ProgressBar = ({ progress, color = '#4a69bd', height = 8 }) => {
  const progressStyle = {
    width: `${Math.min(100, Math.max(0, progress))}%`,
    backgroundColor: color,
    height: `${height}px`,
  };

  return (
    <div className="progress-bar-container" style={{ height: `${height}px` }}>
      <div className="progress-bar-fill" style={progressStyle}></div>
    </div>
  );
};

export default ProgressBar;