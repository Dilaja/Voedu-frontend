import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import DashboardSidebar from "../../components/DashboardSidebar";
import Footer from "../../components/Footer";
const AdminDashboard = () => {
  return (
    <Container fluid>
      <Header/>
      <Row>
        <Col md={3}>
          <DashboardSidebar role="admin" />
        </Col>
        <Col md={9} className="p-4">
          <Outlet /> 
        </Col>
      </Row>
      <div className="d-flex flex-column min-vh-100">
        <Footer/>
        </div>
    </Container>
    
  );
};

export default AdminDashboard;
