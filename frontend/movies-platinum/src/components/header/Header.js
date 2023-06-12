import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [userEmail, setUserEmail] = useState(""); // State for user email
  const [cookies, , removeCookie] = useCookies(["token"]); // Retrieve token from cookies
  const navigate = useNavigate();
  const isLoggedIn = !!cookies.token; // Check if the user is logged in

  useEffect(() => {
    // Fetch user information after login
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
    removeCookie("token"); // Remove the token from cookies
    navigate('/login');
  };

  let user = null;

  if (isLoggedIn) {
    user = jwtDecode(cookies.token);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" style={{ color: 'orange' }}>
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
          {isLoggedIn ? (
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link as={Link} to="/profile">{userEmail}</Nav.Link>
              <Button variant="outline-info" style={{ color: 'orange' }} onClick={handleLogout}>Logout</Button>
            </Nav>
          ) : (
            <>
              <Button variant="outline-info" style={{ color: 'orange' }} as={Link} to="/Login">Login</Button>
              <Button variant="outline-info" style={{ color: 'orange' }} as={Link} to="/Register">Register</Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
