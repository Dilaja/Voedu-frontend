import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";

const StudentCourseCurriculum = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/coursematerials/studentmaterials/${userId}`)
        .then((res) => {
          const enrolledCourses = res.data.enrolledCourses || [];
          const materials = res.data.materials || [];
  
          
          const coursesWithMaterials = enrolledCourses.map((course) => {
            const courseMaterials = materials.find((m) =>
              m.course_id === course.course_id._id || m.course_id.toString() === course.course_id._id.toString()
            );
            return {
              ...course,
              modules: courseMaterials ? courseMaterials.materials : [],
            };
          });
  
          setCourses(coursesWithMaterials);
          if (coursesWithMaterials.length > 0) {
            setSelectedCourse(coursesWithMaterials[0]);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch materials", err);
        });
    }
  }, [userId]);
  

  return (
    <div className="d-flex">
    
      <Header />
      <DashboardSidebar role="student" />
      <Container fluid style={{ marginLeft: "200px", width: "1200px", marginTop: "60px" }}>
      <Row>
        <Col md={3}>
         
        </Col>
  
        <Col md={9} className="p-4">
          <h4 className="text-left" style={{ color: "#ff5733" }}>My Course Material</h4>
  
          {courses.length === 0 ? (
            <p>You are not enrolled in any courses</p>
          ) : (
            <>
              <Card className="mb-4">
  <Card.Body>
    <h4>Select Course</h4>
    <ListGroup>
      {courses.map((course) => (
        <ListGroup.Item
          key={course.course_code}
          action
          active={selectedCourse?.course_code === course.course_code}
          onClick={() => setSelectedCourse(course)}
        >
          {course.course_name || course.course_code}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Card.Body>
</Card>

  
              
              <Card>
                <Card.Body>
                  <h4>{selectedCourse?.course_code} Curriculum</h4>
                  {selectedCourse?.modules?.length > 0 ? (
  selectedCourse.modules.map((material, index) => (
    <ListGroup.Item key={index}>
  {material.title} ({material.type})
  <a
  href={`http://localhost:5000/uploads/${material.filename}`} target="_blank"
  style={{ textDecoration: 'none', color: '#0d6efd', marginLeft: '10px' }}
>
  Download
</a>
</ListGroup.Item>
  ))
) : (
  <p>No materials available for this course yet.</p>
)}


                </Card.Body>
              </Card>
            </>
          )}
        </Col>
        
      </Row>
      </Container>
    </div>
  );
  
};

export default StudentCourseCurriculum;
