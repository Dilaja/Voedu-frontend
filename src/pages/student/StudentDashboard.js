import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

import DashboardSidebar from "../../components/DashboardSidebar";

const StudentDashboard = () => {
  

  return (
    <Container fluid>
      <row><Header/></row>
      
      <Row>
        <Col md={3}>
          <DashboardSidebar role="student" />
        </Col>
        <Col md={9} className="p-4">
          <Outlet /> 
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
