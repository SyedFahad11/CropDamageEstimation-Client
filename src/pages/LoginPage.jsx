// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make a request to your backend
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Login</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>
                  Login
                </button>
              </form>
              <div className="mt-3 text-center">
                <p>
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
