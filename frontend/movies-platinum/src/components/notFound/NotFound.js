import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
const NotFound = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path =""; 
    navigate(path);
  }
  return (
    <div className='container-error'>
        <div className='title-error'>
            <p className='title-error-message'>Lost your way?</p>
        </div>
        <div className='content-error'>
            <p className='content-error-message'>Sorry, we can't find that page. You'll find loads to explore on the home page.</p>
            <br></br>
            <button className='amazing-button' onClick={routeChange}>Home</button>
        </div>
    </div>
  );
}

export default NotFound;
