import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './Login.css';
import Register from './Register';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
  // lacznasc z baza
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); 
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']); // Używamy ciasteczek do przechowywania tokena JWT
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const logout = queryParams.get('logout');

  useEffect(() => {
    if (logout === 'true') {
      // Wyświetl komunikat o wylogowaniu
      console.log('You have been logged out.');
    }
  }, [logout]);

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
        navigate('/'); // Przekierowanie do strony listy filmów
      } else {
        console.log('Login failed!');
        setLoginError(true); 
      }
    } catch (error) {
      console.error('Error occurred during login:', error);

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
            {/* Login form fields */}
            <input type="email" 
              placeholder="Email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required/>

            <input type="password" 
              placeholder="Password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Log In</button>
            <button className='SignIn' onClick={handleSignUpClick}>Sign Up</button>
            {loginError && (
              <p className="error-message">Invalid email or password. Please try again.</p>
            )}
          </form>
          {logout && (
            <div className="logout-message">
              {/* <h7>You have been logged out.</h7> */}
              <p>You have been logged out <FontAwesomeIcon
                icon={faCircleCheck}
              /></p>

            </div>
          )}
        </div>
      )}

      {showRegistrationForm && (
        <div className={`form-container ${isAnimating ? 'slide-out-down' : 'slide-in-up'}`}>
          <h2>Registration Form</h2>
          <Register handleSignInClick={handleSignInClick} />
          <button className='SignIn' onClick={handleSignInClick}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default Login;
