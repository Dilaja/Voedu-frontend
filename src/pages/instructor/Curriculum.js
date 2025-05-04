import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import axios from "axios";

const CourseCurriculumForm = () => {
  const [courseList, setCourseList] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [modules, setModules] = useState([]);
  const [newModuleName, setNewModuleName] = useState("");
  const [newLesson, setNewLesson] = useState("");
  const [currentLessons, setCurrentLessons] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses/all"); 
        setCourseList(res.data);
      } catch (err) {
        console.error("Error loading courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const handleAddLesson = () => {
    if (newLesson.trim()) {
      setCurrentLessons((prev) => [...prev, newLesson.trim()]);
      setNewLesson("");
    }
  };

  const handleAddModule = () => {
    if (newModuleName.trim() !== "") {
      setModules((prev) => [...prev, { name: newModuleName, lessons: [...currentLessons] }]);
      setNewModuleName("");
      setCurrentLessons([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      for (let mod of modules) {
        
        const moduleRes = await axios.post("http://localhost:5000/api/Coursemodule/add", {
          course_id: selectedCourseId,
          modulename: mod.name,
        });

        const moduleId = moduleRes.data._id;

        
        for (let lesson of mod.lessons) {
          await axios.post("http://localhost:5000/api/modulelessons/add", {
            module_id: moduleId,
            lessontitle: lesson,
          });
        }
      }

      alert("Curriculum saved successfully!");
      setModules([]);
    } catch (err) {
      console.error("Error saving curriculum:", err);
      alert("Failed to save curriculum.");
    }
  };

  return (
    <div className="d-flex">
      <Header />
      <div style={{ width: "250px", position: "fixed", height: "100vh", backgroundColor: "#f8f9fa",marginTop:"100px" }}>
        <DashboardSidebar role="instructor" />
      </div>

      <div style={{ marginLeft: "250px", width: "1200px" ,marginTop:"100px"}}>
        <Container className="mt-4">
          <h4 className="text-center" style={{ color: "#ff5733" }}>Course Curriculum Structure</h4>

          <Form onSubmit={handleSubmit} className="p-4 shadow bg-light rounded">
            
            <Form.Group className="mb-3">
              <Form.Label>Select Course Title</Form.Label>
              <Form.Select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                required
              >
                <option value="">-- Select Course --</option>
                {courseList.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.course_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <hr />

           
            <h4>Add Module</h4>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Module Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newModuleName}
                    onChange={(e) => setNewModuleName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Lesson Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Add lesson"
                    value={newLesson}
                    onChange={(e) => setNewLesson(e.target.value)}
                  />
                  <Button variant="secondary" size="sm" className="mt-2" onClick={handleAddLesson}>
                    Add Lesson
                  </Button>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <h6>Current Lessons</h6>
                <ul>
                  {currentLessons.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
                <Button variant="primary" onClick={handleAddModule}>
                  Add Module
                </Button>
              </Col>
            </Row>

           
            {modules.length > 0 && (
              <div className="mt-4">
                <h4>Course Outline</h4>
                {modules.map((module, i) => (
                  <Card key={i} className="mb-3">
                    <Card.Body>
                      <h5>{module.name}</h5>
                      <ul>
                        {module.lessons.map((lesson, idx) => (
                          <li key={idx}>{lesson}</li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}

          
            <Button type="submit" variant="success" className="w-100 mt-4">
              Save Curriculum
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default CourseCurriculumForm;


