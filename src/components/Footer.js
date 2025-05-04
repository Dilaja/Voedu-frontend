import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="text-white mt-auto w-100 py-3" style={{ backgroundColor: "#004466" }}>
      <Container className="text-center">
        <small>© {new Date().getFullYear()} EduPlatform. All rights reserved.</small>
      </Container>
    </footer>
  );
};

export default Footer;
