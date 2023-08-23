// import React from 'react';

// const NotFoundPage = () => {
//   return (
//     <div style={styles.container}>
//       <div style={styles.textContainer}>
//         <h1 style={styles.heading}>404</h1>
//         <p style={styles.subtext}>Coś nieoczekiwanego się wydarzyło...</p>
//         <p style={styles.subtext}>Prawdopodobnie to, czego szukasz, nie istnieje.</p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//     backgroundColor: 'orange', // Tło pomarańczowe
//   },
//   textContainer: {
//     textAlign: 'center',
//     color: 'white',
//   },
//   heading: {
//     fontSize: '6rem',
//     marginBottom: '10px',
//   },
//   subtext: {
//     fontSize: '1.5rem',
//   },
// };

// export default NotFoundPage;
// import React from 'react';
// import './page404.css'; // Zaimportuj plik CSS

// const NotFoundPage = () => {
//   return (
//     <div className="container">
//       <div className="textContainer">
//         <h1 className="heading">404</h1>
//         <p className="subtext">Coś nieoczekiwanego się wydarzyło...</p>
//         <p className="subtext">Prawdopodobnie to, czego szukasz, nie istnieje.</p>
//       </div>
//     </div>
//   );
// };

// export default NotFoundPage;
import React from 'react';
import './page404.css';

const Page404 = () => {
  return (
    <div className="page404-container">
      <div className="number-404">404</div>
      <div className="error-message">
        <p>Coś nieoczekiwanego się wydarzyło...</p>
        <p>Prawdopodobnie to, czego szukasz, nie istnieje.</p>
      </div>
    </div>
  );
};

export default Page404;

