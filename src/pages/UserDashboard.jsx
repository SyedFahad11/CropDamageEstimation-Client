// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/data/get', {
          headers: {
            Authorization: localStorage.getItem('jwtToken'),
          },
        });

        setUserData(response.data);
        console.log(userData)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []); // The empty dependency array ensures that the effect runs only once after the initial render

  return (
    <div>
      <h1>User Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Display user data here */}
          <ul>
            {userData.map((jsons) => (
              <p>
              {jsons.content.geoJSON}</p>
            ))}
          </ul>
        </div>
      )}

      <Link to="/draw">
        <button>Open Map</button>
      </Link>
    </div>
  );
};

export default UserDashboard;
