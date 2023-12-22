// src/pages/DrawPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import axios from 'axios';

const DrawPage = () => {
  const navigate = useNavigate();

  const handleFinishDrawing = async ({ geoJSON }) => {
    try {
      // Get values directly from DOM
      const text = document.getElementById('nameInput').value;
      const startDate = document.getElementById('startDateInput').value;
      const endDate = document.getElementById('endDateInput').value;

      // Create a JSON object with name, dates, and geoJSON
      const dataToSend = {
        text,
        startDate,
        endDate,
        geoJSON,
      };

      // Convert the JSON object to a JSON-formatted string
      const sendContent = { content: dataToSend };

      // Implement logic to send jsonData to the backend
      const response = await axios.post('http://localhost:3000/data/store', sendContent, {
        headers: {
          Authorization: localStorage.getItem('jwtToken'),
          'Content-Type': 'application/json',
        },
      });

      console.log('Backend response:', response.data);

      // After sending data to the backend, navigate back to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error handling finish drawing:', error.message);
    }
  };

  return (
    <div>
      <h1>Draw Page</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          id="nameInput"
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          id="startDateInput"
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          id="endDateInput"
        />
      </div>
      <MapComponent onFinishDrawing={handleFinishDrawing} />
    </div>
  );
};

export default DrawPage;
