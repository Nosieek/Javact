import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [duplicateUserError, setDuplicateUserError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Sprawdź, czy hasła się zgadzają
    if (password !== repeatPassword) {
      setPasswordMismatchError(true);
      return;
    }

    const registerData = {
      name,
      username,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', registerData);

      if (response.status === 200) {
        const { token } = response.data;
        console.log('Registration successful!', token);
        setCookie('token', token, { path: '/' });
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setDuplicateUserError(true);
      } else {
        console.error('Error occurred during registration:', error);
      }
    }
  };

  const handleResetErrors = () => {
    setPasswordMismatchError(false);
    setDuplicateUserError(false);
  };

  return (
    <div className="register">
        <form onSubmit={handleRegister}>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            id="email"
            placeholder="example@exampl.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            id="repeat-password"
            placeholder="Repat Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
          />

          {passwordMismatchError && <p className="error">Passwords do not match.</p>}
          {duplicateUserError && <p className="error">Username or email already exists.</p>}

          <button className="register-submit-button" type="submit" onClick={handleResetErrors}>
            Register
          </button>
        </form>
        </div>
  );
};

export default Register;
