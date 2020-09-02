import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navi = ({user, signOutFunc}) => (
    <Navbar expand="lg" bg="light">
      <div className="container">
        <Navbar.Brand href="/">
          <img className="d-inline-block " alt="photobook" src="images/logo.png" height="20px" />
          Photos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="https://github.com/vallard/MicroServicesOnAWS">Docs</Nav.Link>
            <NavDropdown title={user || "user"} id="collasible-nav-dropdown"> 
              <NavDropdown.Item onClick={signOutFunc} >Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
);

export default Navi

