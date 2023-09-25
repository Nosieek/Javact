import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Login.css';
import Register from './Register';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../api/axiosConfig';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const logout = queryParams.get('logout');
  const [autoLogout, setAutoLogout] = useState(false); 

  useEffect(() => {
    if (logout === 'true') { 
      setAutoLogout(true);
    }
  }, [logout]);

  useEffect(() => {
    if (autoLogout) { 
      console.log('You have been logged out.');
    }
  }, [autoLogout]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const loginData = {
      email,
      password,
    };
  
    try {
      const response = await axios.post('/auth/authenticate', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const data = response.data;
        const { token } = data;
        console.log('Login successful!', token);
        setCookie('token', token, { path: '/' });
        navigate('/');
      } else {
        console.log('Login failed!');
        setLoginError(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setLoginError(true);
      } else {
        console.error('Error occurred during login:', error);
      }
    }
  };
  
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSignInClick = () => {
    if (!showLoginForm && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setShowRegistrationForm(false);
        setShowLoginForm(true);
        setIsAnimating(false);
      }, 500);
      setShowLoginForm(false);
      setEmail('');
      setPassword('');
      setLoginError(false);
    }
  };

  const handleSignUpClick = () => {
    if (!showRegistrationForm && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setShowLoginForm(false);
        setShowRegistrationForm(true);
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <div className="login-container">
      {showLoginForm && (
        <div className={`form-container ${isAnimating ? 'slide-out-up' : 'slide-in-down'}`}>
          <h2>Login Form</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
            {loginError && (
              <div className="error-message">
                <p>
                  Invalid email or password. Please try again.{' '}
                  <FontAwesomeIcon icon={faCircleXmark} />
                </p>
              </div>
            )}
          </form>
          <button className="SignIn" onClick={handleSignUpClick}>
            Sign Up
          </button>

          {autoLogout && (
            <div className="logout-message">
              <p>
                You have been logged out{' '}
                <FontAwesomeIcon icon={faCircleCheck} />
              </p>
            </div>
          )}
        </div>
      )}

      {showRegistrationForm && (
        <div className={`form-container ${isAnimating ? 'slide-out-down' : 'slide-in-up'}`}>
          <h2>Registration Form</h2>
          <Register handleSignInClick={handleSignInClick} />
          <button className="SignIn" onClick={handleSignInClick}>
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
