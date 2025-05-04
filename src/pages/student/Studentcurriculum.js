import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import axios from "axios";

const StudentCurriculum = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courseDetails, setCourseDetails] = useState(null);
  const [curriculum, setCurriculum] = useState([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses/all")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleLoadCurriculum = async () => {
    if (!selectedCourseId) return;

    try {
     
      const courseRes = await axios.get(`http://localhost:5000/api/courses/${selectedCourseId}`);
      setCourseDetails(courseRes.data);

     
      const modulesRes = await axios.get(`http://localhost:5000/api/courses/courses/${selectedCourseId}/modules`);

     
      const modulesWithLessons = await Promise.all(
        modulesRes.data.map(async (module) => {
          const lessonsRes = await axios.get(`http://localhost:5000/api/courses/modules/${module._id}/lessons`);
          return {
            ...module,
            lessons: lessonsRes.data,
          };
        })
      );

      setCurriculum(modulesWithLessons);
    } catch (error) {
      console.error("Error loading curriculum:", error);
    }
  };

  return (
    <div className="d-flex">
     <Header />
     <DashboardSidebar role="student" />
    <Container fluid style={{ marginLeft: "300px", width: "1200px", marginTop: "60px" }}
    >
     
      <Row>
       

        <Col md={9} className="p-4">
        <h4 className="text-left" style={{ color: "#ff5733" }}>My Course Curriculum</h4>
          <Card className="p-4 shadow">
            
            <Form.Group>
              <Form.Label>Select a Course</Form.Label>
              <Form.Select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                <option value="">-- Choose Course --</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.course_name}
                  </option>
                ))}
              </Form.Select>
              <Button
                variant="primary"
                className="mt-3"
                onClick={handleLoadCurriculum}
                disabled={!selectedCourseId}
              >
                Load Curriculum
              </Button>
            </Form.Group>

          
            {courseDetails && (
              <>
                <hr />
                <h5>{courseDetails.course_name}</h5>
                <p><strong>Code:</strong> {courseDetails.course_code}</p>
                <p><strong>Category:</strong> {courseDetails.course_cat}</p>
                <p><strong>Level:</strong> {courseDetails.course_level}</p>
                <p><strong>Duration:</strong> {courseDetails.duration_weeks} weeks</p>
                <p><strong>Description:</strong> {courseDetails.description}</p>
                <p><strong>Prerequisites:</strong> {courseDetails.prerequisites}</p>
                <p><strong>Learning Outcome:</strong> {courseDetails.learn_outcome}</p>
              </>
            )}

           
            {curriculum.length > 0 && (
              <>
                <h5 className="mt-4">Course Modules & Lessons</h5>
                {curriculum.map((mod, i) => (
                  <Card key={i} className="mb-3">
                    <Card.Body>
                      <h6>{mod.modulename}</h6>
                      {mod.lessons.length > 0 ? (
                        <ul>
                          {mod.lessons.map((lesson, j) => (
                            <li key={j}>{lesson.lessontitle
}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">No lessons available</p>
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default StudentCurriculum;

