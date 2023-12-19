// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make a request to your backend
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      // Check the status code from the response
      if (response.status === 200) {
        console.log('Login successful');

        // Store the JWT token in local storage
        const { token } = response.data; // Replace 'token' with the actual key in your JSON response
        localStorage.setItem('jwtToken', token);
        navigate('/dashboard');

        // Redirect or navigate to the user dashboard (you need to implement navigation)
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };


  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
