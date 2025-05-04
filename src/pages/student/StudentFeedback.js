import React, { useState ,useEffect } from "react";
import { Form, Button, Card,Container,Row,Col  } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar"; 
import Header from "../../components/Header";
import axios from "axios";
const StudentEvaluation = () => {
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [modules, setModules] = useState([]);
  const [evaluation, setEvaluation] = useState({
    studentName: "",
    instructorName: "",
    module: "",
    teachingRating: 0,
    contentRating: 0,
    resourceRating: 0,
    comments: "",
  });

  useEffect(() => {
    
    axios.get("http://localhost:5000/api/users/students")
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  
    
    axios.get("http://localhost:5000/api/users/instructor")
      .then(response => setInstructors(response.data))
      .catch(error => console.error("Error fetching instructors:", error));
  
    
    axios.get("http://localhost:5000/api/Coursemodule/all")
      .then(response => setModules(response.data))
      .catch(error => console.error("Error fetching modules:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluation({ ...evaluation, [name]: value });
  };

  const handleRating = (field, rating) => {
    setEvaluation({ ...evaluation, [field]: rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!evaluation.teachingRating || !evaluation.contentRating || !evaluation.resourceRating) {
      alert("Please provide all ratings before submitting.");
      return;
    }
    const payload = {
      student_id: evaluation.studentName,
      instructor_id: evaluation.instructorName,
      module_id: evaluation.module,
      effectiveness: evaluation.teachingRating.toString(),
      course_content: evaluation.contentRating.toString(),
      resources: evaluation.resourceRating.toString(),
      comments: evaluation.comments,
    };
  
    axios.post("http://localhost:5000/api/studentevaluations/add", payload)
      .then(response => {
        alert("Your evaluation has been submitted successfully!");
      })
      .catch(error => {
        console.error("Error submitting evaluation:", error.response?.data || error.message);
        alert("There was an error submitting your evaluation.");
        setEvaluation({
          studentName: "",
          instructorName: "",
          module: "",
          teachingRating: 0,
          contentRating: 0,
          resourceRating: 0,
          comments: "",
        });
      });
  };

  return (
    <Container fluid>
      <Header />
      <Row>
        <Col md={3}>
          <DashboardSidebar role="student" />
        </Col>

        <Col md={9} className="p-4">
          <Card className="p-4 shadow" style={{ width: "80%",marginTop:"60px" }}>
            <Card.Title className="text-center" style={{ color: "#ff5733" }}>
              Course Module Evaluation
            </Card.Title>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                
                <Form.Group className="mb-4">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Select name="studentName" onChange={handleChange} required>
                    <option value="">-- Select Student --</option>
                    {students.map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

               
                <Form.Group className="mb-4">
                  <Form.Label>Instructor</Form.Label>
                  <Form.Select name="instructorName" onChange={handleChange} required>
                    <option value="">-- Select Instructor --</option>
                    {instructors.map((instructor) => (
                      <option key={instructor._id} value={instructor._id}>
                        {instructor.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

              
                <Form.Group className="mb-4">
                  <Form.Label>Module</Form.Label>
                  <Form.Select name="module" onChange={handleChange} required>
                    <option value="">-- Select Module --</option>
                    {modules.map((module) => (
                      <option key={module._id} value={module._id}>
                        {module.modulename}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

               
                {[
                  { label: "Teaching Effectiveness", field: "teachingRating" },
                  { label: "Course Content Clarity", field: "contentRating" },
                  { label: "Learning Resources Quality", field: "resourceRating" },
                ].map(({ label, field }) => (
                  <Form.Group key={field} className="mb-4">
                    <Form.Label>{label}</Form.Label>
                    <div>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          style={{
                            fontSize: "1.5rem",
                            cursor: "pointer",
                            color: evaluation[field] >= star ? "gold" : "gray",
                          }}
                          onClick={() => handleRating(field, star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </Form.Group>
                ))}

               
                <Form.Group className="mb-4">
                  <Form.Label>Additional Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="comments"
                    value={evaluation.comments}
                    onChange={handleChange}
                    required
                    placeholder="Share your experience..."
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  Submit Evaluation
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentEvaluation;


