import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import DashboardSidebar from "../../components/DashboardSidebar";

const InstructorDashboard = () => {
  return (
    <Container fluid>
      <row><Header/></row>
      <Row>
        <Col md={3}>
          <DashboardSidebar role="instructor" />
        </Col>
        <Col md={9} className="p-4">
          <Outlet /> 
        </Col>
      </Row>
    </Container>
  );
};

export default InstructorDashboard;
