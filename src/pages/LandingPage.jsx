// src/pages/LandingPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImage from './download.jpg';

const LandingPage = () => {
  useEffect(() => {
    const textContainer = document.getElementById('text-container');
    const words = textContainer.innerText.split(' ');

    textContainer.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ');

    const wordSpans = document.querySelectorAll('.word');

    wordSpans.forEach((word, index) => {
      word.style.animation = `fadeIn 1s ease-in-out ${index * 0.2}s forwards`;
    });
  }, []);

  return (
    <div className="container text-center mt-5">
      <div className="mb-4">
        <img
          src={logoImage}
          alt="Logo"
          style={{ width: '100px', height: '100px', marginRight: '10px' }}
        />
        <div
          id="text-container"
          style={{
            display: 'inline-block',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            fontSize: '40px', // Adjust the font size as needed
          }}
        >
          Welcome to CropWise
        </div>
      </div>
      <div>
        <Link to="/login" className="btn btn-primary mr-2">
          Login
        </Link>
        <Link to="/register" className="btn btn-success">
          Register
        </Link>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .word {
            display: inline-block;
            white-space: nowrap;
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
