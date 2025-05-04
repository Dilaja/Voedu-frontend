import React, { useState } from "react";
import axios from "axios";
import DashboardSidebar from "../../components/DashboardSidebar";
import { Form, Button, Container, Row, Col ,Card} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setMessage(" All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/add", formData);

      if (response.status === 201) {
        setMessage("User created successfully!");
        setFormData({ name: "", email: "", password: "", role: "" });
      }
    } catch (error) {
      if (error.response) {
        setMessage(` ${error.response.data.message}`);
      } else {
        setMessage("Server error");
      }
    }
  };

  return (
    <div className="d-flex">
      <Header/>
      <DashboardSidebar role="admin" />

      <Container fluid  style={{ marginLeft: "300px", width: "1200px" ,marginTop:"60px"}}>
       

        
        <Card className="p-4 shadow">
        <h4 className="text-center" style={{ color: "#ff5733" }}>Create New User</h4>
        <Form onSubmit={handleSubmit} >
          <Row className="mb-4">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Select Role</Form.Label>
                <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                  <option value="">-- Select Role --</option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="success" className="w-100">
            Create User
          </Button>
        </Form>
      </Card>
        {message && <p className="text-center">{message}</p>}
      </Container>
    </div>
  );
};

export default CreateUser;