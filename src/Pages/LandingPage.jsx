import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/token', { email, password });
      const token = response.data.access_token;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Redirect to the home page or dashboard after successful login
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to the registration page if unauthorized
        navigate('/register');
      } else {
        console.error('An error occurred during login:', error);
        // Optionally, show an error message to the user
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LandingPage;
