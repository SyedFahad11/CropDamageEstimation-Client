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
  }, []);

  const handleSignout = () => {
    // Remove JWT token from local storage
    localStorage.removeItem('jwtToken');

    // Navigate to the landing page
    navigate('/');
  };

  const handleDeleteBox = (deletedBoxId) => {
    // Update the user data state by filtering out the deleted box
    setUserData((prevUserData) => prevUserData.filter((user) => user._id !== deletedBoxId));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>User Dashboard</h1>
        <button className="btn btn-outline-danger" onClick={handleSignout}>
          Sign Out
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {/* Display user data here */}
          {userData.map((user, index) => (
            <DataBox key={index} user={user} onDeleteBox={handleDeleteBox} />
          ))}
        </div>
      )}

      <Link to="/draw" className="btn btn-primary">
        Open Map
      </Link>
    </div>
  );
};

const DataBox = ({ user, onDeleteBox }) => {
  const [floodArea, setFloodArea] = useState(null);
  const [loadingFlood, setLoadingFlood] = useState(false);

  const handleFloodButtonClick = async () => {
    try {
      setLoadingFlood(true);

      const gJSON = user.content.geoJSON;
      const sd = user.content.startDate;
      const ed = user.content.endDate;

      const response = await axios.post(
        'http://localhost:3000/data/fetchflood',
        {
          gJSON,
          sd,
          ed,
        },
        {
          headers: {
            Authorization: localStorage.getItem('jwtToken'),
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Flood response:', response.data);

      setFloodArea(response.data.floodAreaHa);
    } catch (error) {
      console.error('Error sending flood request:', error.message);
    } finally {
      setLoadingFlood(false);
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/data/delete/${user._id}`, {
        headers: {
          Authorization: localStorage.getItem('jwtToken'),
        },
      });

      if (response.status === 200) {
        // Handle successful deletion by calling the onDeleteBox prop
        onDeleteBox(user._id);
        console.log('Box deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting box:', error.message);
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{user.content.text}</h5>
          {loadingFlood ? (
            <p className="card-text">Loading flood data...</p>
          ) : (
            <>
              {floodArea != null ? (
                <p className="card-text text-success">Flood Area: {floodArea} ha</p>
              ) : (
                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={handleFloodButtonClick}
                >
                  Check Flood
                </button>
              )}
            </>
          )}
          <button
            className="btn btn-outline-danger mt-2"
            onClick={handleDeleteButtonClick}
          >
            Delete
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default UserDashboard;
