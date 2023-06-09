// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilm } from "@fortawesome/free-solid-svg-icons";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { NavLink, Link } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import jwtDecode from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import "./Header.css";

// const Header = () => {
//   const [userEmail, setUserEmail] = useState(""); 
//   const [cookies, , removeCookie] = useCookies(["token"]); 
//   const navigate = useNavigate();
//   const isLoggedIn = !!cookies.token; 

//   useEffect(() => {
//     if (isLoggedIn) {
//       const userEmail = getUserEmailFromToken(cookies.token);
//       setUserEmail(userEmail);
//     }
//   }, [cookies.token, isLoggedIn]);

//   const getUserEmailFromToken = (token) => {
//     const decodedToken = jwtDecode(token);
//     const userEmail = decodedToken.sub;
//     console.log(userEmail);
//     const username= decodedToken.username;
//     console.log(username);
//     return userEmail;
//   };

//   const handleLogout = () => {
//     removeCookie("token"); 
//     navigate("/login");
//   };

//   let user = null;

//   if (isLoggedIn) {
//     user = jwtDecode(cookies.token);
//   }

//   return (
//     <Navbar className="header-navbar" bg="dark" variant="dark" expand="lg" sticky="top">
//       <Container fluid>
//         <Navbar.Brand as={Link} to="/" className="header-brand">
//           <FontAwesomeIcon icon={faFilm} /> MovieSpot
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
//             <NavLink className="nav-link" to="/">Home</NavLink>
//             <NavLink className="nav-link" to="/MovieList">Watch List</NavLink>
//             <NavLink className="nav-link" to="/popular">Genres</NavLink>
//             <NavLink className="nav-link" to="/popular">Ranking</NavLink>
//             <NavLink className="nav-link" to="/popular">About</NavLink>
//           </Nav>
//           {isLoggedIn ? (
//             <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
//               <Nav.Link as={Link} to="/profile">{userEmail}</Nav.Link>
//               <Button variant="outline-info" className="header-logout-btn" onClick={handleLogout}>Logout</Button>
//             </Nav>
//           ) : (
//             <>
//               <Button variant="outline-info" className="header-login-btn" as={Link} to="/Login">Login</Button>
//             </>
//           )}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Dropdown } from "react-bootstrap";

import "./Header.css";

const Header = () => {
  const [userEmail, setUserEmail] = useState("");
  const [cookies, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const isLoggedIn = !!cookies.token;

  useEffect(() => {
    if (isLoggedIn) {
      const userEmail = getUserEmailFromToken(cookies.token);
      setUserEmail(userEmail);
    }
  }, [cookies.token, isLoggedIn]);

  const getUserEmailFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.sub;
    console.log(userEmail);
    return userEmail;
  };

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  let user = null;

  if (isLoggedIn) {
    user = jwtDecode(cookies.token);
  }

  return (
    <Navbar className="header-navbar" bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="header-brand">
          <FontAwesomeIcon icon={faFilm} /> MovieSpot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/MovieList">Watch List</NavLink>
            <NavLink className="nav-link" to="/popular">Genres</NavLink>
            <NavLink className="nav-link" to="/popular">Ranking</NavLink>
            <NavLink className="nav-link" to="/popular">About</NavLink>
          </Nav>
          <Nav className="ms-auto" style={{ maxHeight: '100px' }} navbarScroll>
            {isLoggedIn ? (
               <>
               <Dropdown align="end" className="header-dropdown">
                 <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
                   {userEmail}
                 </Dropdown.Toggle>

                 <Dropdown.Menu>
                   <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                   <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                   <Dropdown.Divider />
                   <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                 </Dropdown.Menu>
               </Dropdown>
             </>
            ) : (
              <>
                <Button variant="outline-info" className="header-login-btn" as={Link} to="/Login">Login</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
