import React, { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; 

const SessionTimeout = ({ onTimeout }) => {
  const timeoutRef = useRef(null);
  const [, , removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const resetTimeout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onTimeout();
      removeCookie('token');
      navigate('/login?logout=true'); 
    }, 180000); // 3 minuty
  };

  const handleActivity = () => {
    resetTimeout();
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    resetTimeout();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return null;
};

export default SessionTimeout;
