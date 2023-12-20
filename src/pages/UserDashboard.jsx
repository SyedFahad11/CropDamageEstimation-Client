// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/data/get', {
          headers: {
            Authorization: localStorage.getItem('jwtToken'),
          },
        });

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []); // The empty dependency array ensures that the effect runs only once after the initial render

  const handleSignout = () => {
    // Remove JWT token from local storage
    localStorage.removeItem('jwtToken');
    
    // Navigate to the landing page
    navigate('/');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>User Dashboard</h1>
        <button onClick={handleSignout}>Sign Out</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Display user data here */}
          {userData.map((user, index) => (
            <DataBox key={index} user={user} />
          ))}
        </div>
      )}

      <Link to="/draw">
        <button>Open Map</button>
      </Link>
    </div>
  );
};

const DataBox = ({ user }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        borderRadius: '8px',
      }}
    >
      <div style={{ flex: 1 }}>
        <h3>{user.content.text}</h3>
        {/* <p>{user.content.geoJSON}</p> */}
        {/* <h3>{user.content}</h3> */}
        {/* Add more details as needed */}
      </div>
      <div>
        {/* Add three buttons to the extreme right */}
        <button style={{ marginLeft: '10px' }}>Flood</button>
        <button style={{ marginLeft: '10px' }}>Drought</button>
        <button style={{ marginLeft: '10px' }}>Delete</button>
      </div>
    </div>
  );
};

export default UserDashboard;
