// src/pages/DrawPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import axios from 'axios';

const DrawPage = () => {
  const navigate = useNavigate();

  const handleFinishDrawing = async ({ text, geoJSON }) => {
    try {
      // Create a JSON object with text and geoJSON
      const dataToSend = {
        text,
        geoJSON,
      };
      console.log(dataToSend);
      // Convert the JSON object to a JSON-formatted string
      const sendContent={content:dataToSend};
      console.log("send content is, ",sendContent);
  
      // Implement logic to send jsonData to the backend
      const response = await axios.post('http://localhost:3000/data/store', sendContent, {
        headers: {
          Authorization: localStorage.getItem('jwtToken'),
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Backend response:', response.data);
      
    //   console.log('Data to send:', jsonData);
  
      // After sending data to the backend, navigate back to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error handling finish drawing:', error.message);
    }
  };
  
  

  return (
    <div>
      <h1>Draw Page</h1>
      <MapComponent onFinishDrawing={handleFinishDrawing} />
    </div>
  );
};

export default DrawPage;
