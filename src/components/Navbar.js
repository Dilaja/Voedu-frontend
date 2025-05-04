import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";


const LandingPageNavBar = () => {
 const [user, setUser] = useState({ name: "", role: "" });
 const [userId, setUserId] = useState("");
   useEffect(() => {
     const storedUser = JSON.parse(localStorage.getItem("userInfo"));
     const id = localStorage.getItem("userId");
     setUserId(id);
     if (storedUser ) {
       setUser({ name: storedUser.name, role: storedUser.role});
     }
   }, []);

  return (
    <Navbar style={{ backgroundColor: "#003366" }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">VoEdu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/Changepass">Change Password</Nav.Link>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <h5 style={{ color: "#ff5733" }}>Welcome ! {user.name} {userId}</h5>
  
  
      </Container>
    </Navbar>
  );
};

export default LandingPageNavBar;

