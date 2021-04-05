import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = (props) => {
  return (
    <div
      className={`${
        (props.asClearOverlay && 'loading-spinner__clear-overlay') ||
        (props.asDarkOverlay && 'loading-spinner__dark-overlay')
      }`}
    >
      <div className={props.big ? 'size--big' : 'lds-dual-ring'}></div>
    </div>
  );
};

export default LoadingSpinner;
