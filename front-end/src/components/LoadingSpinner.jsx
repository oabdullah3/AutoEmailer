import React, { useState, useEffect } from 'react';
import WordSearch from './wordsearch';

const loadingMessages = [
  "Loading...",
  "Extracting your emails...",
  "Generating your email...",
  "Contacting DeepSeek...",
  "Please wait..."
];

const LoadingSpinner = () => {
  const [loadingText, setLoadingText] = useState(loadingMessages[0]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
      setLoadingText(loadingMessages[(messageIndex + 1) % loadingMessages.length]);
    }, 3000); // Change message every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, [messageIndex]);

  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="loading-text">{loadingText}</p>
      <WordSearch />
    </div>
  );
};

export default LoadingSpinner;