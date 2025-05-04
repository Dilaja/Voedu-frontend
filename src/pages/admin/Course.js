import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import axios from "axios";

const CreateCourseForm = () => {
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_code: "",
    course_cat: "",
    duration_weeks: "",
    course_level: "",
    institute_id: "",
    description: "",
    prerequisites: "",
    learn_outcome: "",
  });

  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/institutes/all");
        setInstitutes(res.data);
      } catch (err) {
        console.error("Failed to fetch institutes:", err);
      }
    };

    fetchInstitutes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const res = await axios.post("http://localhost:5000/api/courses/add", courseData);

      
      const { course_code, course_cat, institute_id } = courseData;
      await axios.post("http://localhost:5000/api/institutecourse/add", {
        course_code,
        course_cat,
        institute_id,
      });

      alert("Course and institute mapping created successfully!");

      
      setCourseData({
        course_name: "",
        course_code: "",
        course_cat: "",
        duration_weeks: "",
        course_level: "",
        institute_id: "",
        description: "",
        prerequisites: "",
        learn_outcome: "",
      });
    } catch (error) {
      console.error("Course or mapping creation failed:", error);
      alert(error.response?.data?.message || "Error creating course or mapping");
    }
  };

  return (
    <div className="d-flex">
      <Header />
      <DashboardSidebar role="admin" />
      <Container
        fluid
        
        style={{ marginLeft: "300px", width: "1200px", marginTop: "60px" }}
      >
        <Row className="justify-content-center">
          <Col md={12}>
            <Card className="shadow p-4">
              <h4 className="text-center" style={{ color: "#ff5733" }}>
                Course Registration
              </h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Course Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="course_name"
                        value={courseData.course_name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Course Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="course_code"
                        value={courseData.course_code}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="course_cat"
                        value={courseData.course_cat}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="IT">IT & Computer Skills</option>
                        <option value="Construction">Construction & Engineering</option>
                        <option value="Healthcare">Healthcare & Nursing</option>
                        <option value="Automotive">Automotive & Mechanics</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Duration (weeks)</Form.Label>
                      <Form.Control
                        type="number"
                        name="duration_weeks"
                        min="1"
                        value={courseData.duration_weeks}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Course Level</Form.Label>
                      <Form.Select
                        name="course_level"
                        value={courseData.course_level}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Institute</Form.Label>
                      <Form.Select
                        name="institute_id"
                        value={courseData.institute_id}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Institute</option>
                        {institutes.map((inst) => (
                          <option key={inst._id} value={inst._id}>
                            {inst.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    rows={3}
                    value={courseData.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Prerequisites</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="prerequisites"
                    rows={2}
                    value={courseData.prerequisites}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Learning Outcomes</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="learn_outcome"
                    rows={3}
                    value={courseData.learn_outcome}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button type="submit" variant="success" className="w-100">
                  Create Course
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateCourseForm;
