import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import axios from "axios"; 
const StudentAnnouncement = () => {
  const [announcement, setAnnouncement] = useState({
    type: "",
    title: "",
    description: "",
    file: null,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAnnouncement({ ...announcement, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const payload = {
        announcement_type: announcement.type, // match your backend field names
        title: announcement.title,
        description: announcement.description,
      };
  
      await axios.post("http://localhost:5000/api/announcements/add", payload); 
  
      setSuccessMessage("Your announcement has been submitted successfully!");
  
      setAnnouncement({ type: "", title: "", description: "", file: null });
  
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Error submitting announcement:", error);
    }
  };

  return (
    <Container fluid style={{ marginTop: "50px", marginLeft: "0px" }}>
      <Header/>
      <Row>
       
        <Col md={3}>
          <DashboardSidebar role="instructor" />
        </Col>

       
        <Col md={9} className="p-4">
          <h4 className="text-center" style={{ color: "#ff5733" }}>Submit Student Announcement</h4>

          {successMessage && <Alert variant="success">{successMessage}</Alert>}

         
          <Card className="p-4 shadow">
            <Form onSubmit={handleSubmit}>
              
              <Form.Group className="mb-3">
                <Form.Label>Announcement Type</Form.Label>
                <Form.Select name="type" value={announcement.type} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  <option value="General">General Announcement</option>
                  <option value="Event">Event Notice</option>
                  <option value="Request">Special Request</option>
                </Form.Select>
              </Form.Group>

             
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={announcement.title} onChange={handleChange} placeholder="Enter announcement title" required />
              </Form.Group>

             
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} name="description" value={announcement.description} onChange={handleChange} placeholder="Provide details about the announcement" required />
              </Form.Group>


             
              <Button variant="success" type="submit">
                Announcement
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentAnnouncement;
