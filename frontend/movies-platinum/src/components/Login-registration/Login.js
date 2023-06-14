import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Login.css';
import cameraImage from './cinema.jpg';
import formImage from './cinema-time.jpg';

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); 
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']); // Używamy ciasteczek do przechowywania tokena JWT

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
        const { token } = data; // Wyciągamy token JWT z odpowiedzi
        console.log('Login successful!', token);
        setCookie('token', token, { path: '/' }); // Zapisujemy token JWT w ciasteczku
        navigate('/MovieList'); // Przekierowanie do strony listy filmów
      } else {
        console.log('Login failed!');
        setLoginError(true); 
      }
    } catch (error) {
      console.error('Error occurred during login:', error);

    }
  };

  const handleButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleBackButton = () => {
    setShowLoginForm(false);
    setEmail('');
    setPassword('');
    setLoginError(false); // Resetowanie stanu błędu logowania przy powrocie
  };

  const handleRegisterButton = () => {
    setShowLoginForm(true);
  };
  const handleRegisterForm = () => {
    navigate('/register');
  };

  const imageClassName = showLoginForm ? 'camera-image slide-out' : 'camera-image slide-in';
  const formClassName = showLoginForm ? 'login-form active' : 'login-form';
  const signInButtonClassName = showLoginForm ? 'sign-in-button hidden' : 'sign-in-button';
  const formImageClassName = showLoginForm ? 'login-form-image slide-in-right' : 'login-form-image slide-out-right';

  return (
    <div className="login-container">
      <div className="camera-container">
        <img src={cameraImage} alt="Camera" className={imageClassName} />
        <img src={formImage} alt="Form" className={formImageClassName} />
        <div className={formClassName}>
          <h2>Welcome again!</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showLoginForm && (
              <div className="form-buttons">
                <button className="login-button" type="submit">Login</button>
                <button className="back-button" onClick={handleBackButton}>Back</button>
              </div>
            )}
            {loginError && (
              <p className="error-message">Invalid email or password. Please try again.</p>
            )}
          </form>
        </div>
      </div>
      {!showLoginForm && (
        <div>
          <button className="sign-in-button" onClick={handleButtonClick}>Sign In</button>
          <button className="register-button" onClick={handleRegisterForm}>Register</button>
        </div>
      )}
    </div>
  );
};

export default Login;
