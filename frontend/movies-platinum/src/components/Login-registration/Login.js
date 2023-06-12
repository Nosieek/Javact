// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']); // Use cookies to store the JWT token

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data; // Extract the JWT token from the response
        console.log('Login successful!', token);
        setCookie('token', token, { path: '/' }); // Store the JWT token in a cookie
        navigate('/MovieList'); // Redirect to the movie list page

      } else {
        console.log('Login failed!');
        // Handle login failure, e.g., display error message
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      // Handle error, e.g., display error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
