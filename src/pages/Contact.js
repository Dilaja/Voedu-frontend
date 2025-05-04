import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <Container className="my-5">
      <Card className="shadow p-4">
        <Row>
        
          <Col md={6}>
            <h2 className="text-primary">Contact Us</h2>
            <Form onSubmit={handleSubmit}>
             
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

             
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

             
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your message..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

             
              <Button variant="primary" type="submit" className="w-100">
                Send Message
              </Button>
            </Form>
          </Col>

         
          <Col md={6} className="d-flex flex-column justify-content-center">
            <div className="p-4 bg-light rounded">
              <h4 className="text-secondary">Contact Information</h4>
              <p>
                <strong>Address:</strong> 123 VoEdu Education, Vocational City, Country
              </p>
              <p>
                <strong>Phone:</strong> +123 456 7890
              </p>
              <p>
                <strong>Email:</strong> contact@voedu.edu
              </p>
              <p>
                <strong>Working Hours:</strong> Monday - Friday (9:00 AM - 5:00 PM)
              </p>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ContactUs;

