import React, { useState,useEffect } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import axios from "axios";
const StudentAssessment = () => {
  const [students, setStudents] = useState([]);
  
  const [show, setShow] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [courses, setCourses] = useState([]);
 

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/students")
      .then((res) => {
        console.log("Loaded students:", res.data); 
        setStudents(res.data);
      })
      .catch((err) => console.error("Failed to load students:", err));
    
    axios.get("http://localhost:5000/api/courses/modules")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Failed to load courses:", err));
  }, []);

  const handleClose = () => setShow(false);

  const handleShow = (course) => {
    setSelectedCourse(course);
    setSelectedModule(course.modules[0]?._id || "");
    setSelectedStudentId("");
    setGrade("");
    setFeedback("");
    setShow(true);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/studentassessments/add", {
        student_id: selectedStudentId,
        course_id: selectedCourse._id,
        module_id: selectedModule,
        marks: grade,
        remarks: feedback,
      });

      alert("Assessment submitted!");
      setShow(false);
    } catch (err) {
      console.error("Error submitting assessment:", err);
      alert("Failed to submit assessment.");
    }
  };
  return (
    
    <div className="d-flex">
      <Container fluid style={{ marginTop: "60px", marginLeft: "250px" }}>
      <Header/>
      <DashboardSidebar role="instructor" />
      
        <h4 className="text-center" style={{ color: "#ff5733" }}> Student Assessment</h4>

        <Table striped bordered hover className="mt-3">
  <thead className="bg-primary text-white">
    <tr>
      <th>#</th>
      <th>Course</th>
      <th>Modules</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {courses.map((course, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{course.course_name
        }</td>
        <td>{course.modules.map((m) => m.modulename).join(", ")}</td>
        <td>
          <Button variant="info" onClick={() => handleShow(course)}>Enter Marks</Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

<Modal show={show} onHide={() => setShow(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Enter Marks</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Select Student</Form.Label>
        <Form.Select value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)}>
        <option value="">Select Student</option>
  {students.map((student) => (
    <option key={student._id} value={student._id}>
      {student.name}
    </option>
  ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Select Module</Form.Label>
        <Form.Select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)}>
          {selectedCourse?.modules.map((mod) => (
  <option key={mod._id} value={mod._id}>{mod.modulename}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Marks</Form.Label>
        <Form.Control
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Enter Marks"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Feedback</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShow(false)}>
      Close
    </Button>
    <Button variant="success" onClick={handleSubmit}>
      Submit
    </Button>
  </Modal.Footer>
</Modal>
      </Container>
    </div>
  );
};

export default StudentAssessment;
