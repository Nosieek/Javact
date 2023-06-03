import React from 'react';
import './NotFound.css'; // Import the CSS file for styling
const NotFound = () => {
  return (
    <div className='container-error'>
        <div className='title-error'>
            <p className='title-error-message'>Lost your way?</p>
        </div>
        <div className='content-error'>
            <p className='content-error-message'>Sorry, we can't find that page. You'll find loads to explore on the home page.</p>
            <br></br>
            <button className='amazing-button'>Home</button>
        </div>
    </div>
  );
}

export default NotFound;