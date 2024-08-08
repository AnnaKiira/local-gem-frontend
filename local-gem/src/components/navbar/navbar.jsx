//import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Navbar = ({ user, handleSignout }) => (
  <Nav className="flex-column bg-light p-3" style={{ justifyContent: 'space-evenly', height: '100vh', width: '250px' }}>
    {user ? (
      <>
        <Nav.Link as={Link} to="/">{user.username}</Nav.Link>
        <Nav.Link as={Link} to="/places">Places</Nav.Link>
        <Nav.Link as={Link} to="/places/new">Add Place</Nav.Link>
        <Nav.Link as={Link} onClick={handleSignout}>Sign Out</Nav.Link>
      </>
    ) : (
      <>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
        <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
      </>
    )}
  </Nav>
);

export default Navbar;

