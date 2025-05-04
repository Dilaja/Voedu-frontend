import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import axios from "axios";

const CreateInstitute = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactno: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10,15}$/.test(formData.contactno)) {
      alert("Contact number must be 10 to 15 digits");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/institutes/add", formData);
      alert(res.data.message);
      setFormData({ name: "", address: "", contactno: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Error creating institute");
    }
  };

  return (
    <div className="d-flex">
      <Header/>
      <DashboardSidebar role="admin" />
    <Container fluid className="p-4" style={{ marginLeft: "300px", width: "1200px", marginTop: "60px" }}>
        
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow">
            <h4 className="text-center mb-4" style={{ color: "#ff5733" }}>
              Institute Registration
            </h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Institute Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter institute name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  placeholder="Enter address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactno"
                  placeholder="Enter contact number"
                  value={formData.contactno}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="success" className="w-100">
                Add Institute
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default CreateInstitute;