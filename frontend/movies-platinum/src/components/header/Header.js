

// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilm } from "@fortawesome/free-solid-svg-icons";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import jwtDecode from "jwt-decode";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { Dropdown } from "react-bootstrap";
// import FormControl from "react-bootstrap/FormControl";

// import "./Header.css";

// const Header = () => {
//   const [userEmail, setUserEmail] = useState("");
//   const [cookies, , removeCookie] = useCookies(["token"]);
//   const navigate = useNavigate();
//   const [searchText, setSearchText] = useState("");
//   const isLoggedIn = !!cookies.token;

//   const handleSearchTextChange = (e) => {
//     setSearchText(e.target.value);
//   };

//   const handleSearch = () => {
//     navigate(`/search-results?query=${searchText}`);
//   };


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
//             <NavLink className="nav-link" to="/Top">Top Ranked</NavLink>
//             <NavLink className="nav-link" to="/Fav">Favorites</NavLink>
//             {/* <NavLink className="nav-link" to="/MovieList">Watch List</NavLink> */}
//             <NavLink className="nav-link" to="/popular">About</NavLink>
//           </Nav>
//           <Nav className="ms-auto" style={{ maxHeight: '100px' }} navbarScroll>
//             {/* ale kurwa rzezba XD */}
//             <div className="header-search">
//       <FormControl
//         type="text"
//         placeholder="Search movies"
//         className="header-search-input"
//         value={searchText}
//         onChange={handleSearchTextChange}
//       />
//       <Button variant="info" className="header-search-button-small" onClick={handleSearch}>
//         Wyszukaj
//       </Button>
//     </div>

//             {isLoggedIn ? (
//                <>
//                <Dropdown align="end" className="header-dropdown">
//                  <Dropdown.Toggle variant="outline-info" id="dropdown-basic">
//                    {userEmail}
//                  </Dropdown.Toggle>

//                  <Dropdown.Menu>
//                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
//                    <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
//                    <Dropdown.Divider />
//                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//                  </Dropdown.Menu>
//                </Dropdown>
//              </>
//             ) : (
//               <>
//                 <Button variant="outline-info" className="header-login-btn" as={Link} to="/Login">Login</Button>
//               </>
//             )}
//           </Nav>
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
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Dropdown } from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import SessionTimeout from "../SessionTime/SessionTimeout";
import "./Header.css";

const Header = () => {
  const [userEmail, setUserEmail] = useState("");
  const [cookies, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const isLoggedIn = !!cookies.token;

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/search-results?query=${searchText}`);
  };

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
    setUserEmail(""); // Wyczyść email po wylogowaniu
    navigate("/login");
  };

  let user = null;

  if (isLoggedIn) {
    user = jwtDecode(cookies.token);
  }

  return (
    <>
      {/* Dodaj SessionTimeout tutaj */}
      {isLoggedIn && <SessionTimeout onTimeout={handleLogout} />}
      <Navbar className="header-navbar" bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="header-brand">
            <FontAwesomeIcon icon={faFilm} /> MovieSpot
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/Top">Top Ranked</NavLink>
              <NavLink className="nav-link" to="/Fav">Favorites</NavLink>
              {/* <NavLink className="nav-link" to="/MovieList">Watch List</NavLink> */}
              <NavLink className="nav-link" to="/popular">About</NavLink>
            </Nav>
            <Nav className="ms-auto" style={{ maxHeight: '100px' }} navbarScroll>
              <div className="header-search">
                <FormControl
                  type="text"
                  placeholder="Search movies"
                  className="header-search-input"
                  value={searchText}
                  onChange={handleSearchTextChange}
                />
                <Button variant="info" className="header-search-button-small" onClick={handleSearch}>
                  Wyszukaj
                </Button>
              </div>

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
    </>
  );
};

export default Header;
