import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";

const InstructorStudentEvaluation = () => {
  const [students, setStudents] = useState([]);
  const [modules, setModules] = useState([]);
  const [evaluation, setEvaluation] = useState({
    student_id: "",
    module_id: "",
    Participation: 0,
    AssignmentQuality: 0,
    Understanding: 0,
    Attendance: 0,
    comments: "",
  });

  useEffect(() => {
   
    axios.get("http://localhost:5000/api/users/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error loading students:", err));

   
    axios.get("http://localhost:5000/api/Coursemodule/all")
      .then((res) => setModules(res.data))
      .catch((err) => console.error("Error loading modules:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluation({ ...evaluation, [name]: value });
  };

  const handleRating = (field, rating) => {
    setEvaluation({ ...evaluation, [field]: rating.toString() }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (
      !evaluation.Participation ||
      !evaluation.AssignmentQuality ||
      !evaluation.Understanding ||
      !evaluation.Attendance
    ) {
      alert("Please rate all criteria.");
      return;
    }

    axios.post("http://localhost:5000/api/evaluations/add", evaluation)
      .then((res) => {
        alert("Evaluation submitted successfully!");
       
        setEvaluation({
          student_id: "",
          module_id: "",
          Participation: 0,
          AssignmentQuality: 0,
          Understanding: 0,
          Attendance: 0,
          comments: "",
        });
      })
      .catch((err) => {
        console.error("Error submitting evaluation:", err);
        alert("Not Add Evaluation");
      });
  };

  return (
    <Container fluid style={{ marginTop: "60px", marginLeft: "0px" }}>
      <Header />
      <Row>
        <Col md={3}>
          <DashboardSidebar role="instructor" />
        </Col>

        <Col md={9} className="p-4">
          <Card className="p-4 shadow">
            <Card.Title className="text-center mb-4" style={{ color: "#ff5733" }}>
              Instructor Evaluation of Student
            </Card.Title>
            <Card.Body>
              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Select name="student_id" onChange={handleChange} value={evaluation.student_id} required>
                    <option value="">-- Select Student --</option>
                    {students.map(student => (
                      <option key={student._id} value={student._id}>{student.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Course Module</Form.Label>
                  <Form.Select name="module_id" onChange={handleChange} value={evaluation.module_id} required>
                    <option value="">-- Select Module --</option>
                    {modules.map(module => (
                      <option key={module._id} value={module._id}>{module.modulename}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                
                {[
                  { label: "Participation", field: "Participation" },
                  { label: "Assignment Quality", field: "AssignmentQuality" },
                  { label: "Understanding of Concepts", field: "Understanding" },
                  { label: "Attendance", field: "Attendance" },
                ].map(({ label, field }) => (
                  <Form.Group className="mb-3" key={field}>
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

              
                <Form.Group className="mb-3">
                  <Form.Label>Additional Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="comments"
                    value={evaluation.comments}
                    onChange={handleChange}
                    placeholder="feedback"
                  />
                </Form.Group>

                <Button type="submit" className="w-100" variant="success">
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

export default InstructorStudentEvaluation;
