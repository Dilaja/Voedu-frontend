
import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import DashboardSidebar from "../../components/DashboardSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = formData;

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const res = await axios.post(
        "http://localhost:5000/api/users/changepassword",
        { oldPassword: currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      alert(res.data.message || "Password changed successfully");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="d-flex">
       <Header/>
       <DashboardSidebar role="admin" />
    <Container fluid  style={{ marginLeft: "300px", width: "1200px", marginTop: "100px" }}>
     
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow p-4">
            <h4 className="text-center mb-4 " style={{ color: "#ff5733" }}>Change Password</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="success" className="w-100">
                Update Password
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ChangePassword;

