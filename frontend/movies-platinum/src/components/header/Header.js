import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from 'react-cookie';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['username']);
  const navigate = useNavigate();

  const handleLogin = () => {
    setCookie('username', 'uzytkownik', { path: '/' });
    navigate('/profile');
  };

  const handleLogout = () => {
    removeCookie('username', { path: '/' });
    navigate('/');
  };

  const isLoggedIn = !cookies.username;

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
              <Nav.Link as={Link} to="/profile">{cookies.username}</Nav.Link>
              <Button variant="outline-info" style={{ color: 'orange' }} onClick={handleLogout}>Logout</Button>
            </Nav>
          ) : (
            <>
              <Button variant="outline-info" style={{ color: 'orange' }} as={Link} to="/Login" onClick={handleLogin}>Login</Button>
              <Button variant="outline-info" style={{ color: 'orange' }} as={Link} to="/Register">Register</Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
