import React from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header style={{ width: "100%", position: "fixed", top: 0, zIndex: 1000 }}>
  <Navbar style={{ backgroundColor: "#004466" }} variant="dark">
    <Container fluid>
      <Row className="w-100 align-items-center">
        {/* Left: Logo */}
        <Col xs="auto">
          <img
            src={logo}
            alt="Logo"
            width="150"
            height="50"
            className="d-inline-block align-top"
          />
        </Col>

        {/* Center: System Name */}
        <Col className="text-center">
          <Navbar.Brand className="text-white">
            <h2 className="m-0">Vocational EduPlatform Management System</h2>
          </Navbar.Brand>
        </Col>

        {/* Right: Spacer or Future Items */}
        <Col xs="auto" />
      </Row>
    </Container>
  </Navbar>
</header>
  );
};

export default Header;