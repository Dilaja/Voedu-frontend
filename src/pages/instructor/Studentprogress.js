import React, { useState, useEffect } from "react";
import { Table, Card, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import DashboardSidebar from "../../components/DashboardSidebar"; 
import Header from "../../components/Header";

const StudentProgress = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [progressData, setProgressData] = useState([]);
  
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  
  const [loading, setLoading] = useState(false);

  // Fetch courses and students on page load
  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses/all");  
    setCourses(res.data);
  };

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/users/students");
    setStudents(res.data);
  };

  const fetchAssessments = async (studentId, courseId) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/studentassessments/assessment/${studentId}/${courseId}`);
      setProgressData(res.data);
    } catch (error) {
      console.error("Failed to fetch assessments", error);
    }
    setLoading(false);
  };
  
  const convertMarksToGrade = (marks) => {
    if (marks >= 90) return "A";
    if (marks >= 85) return "A-";
    if (marks >= 80) return "B+";
    if (marks >= 75) return "B";
    if (marks >= 70) return "B-";
    if (marks >= 65) return "C+";
    if (marks >= 60) return "C";
    if (marks >= 55) return "C-";
    if (marks >= 50) return "D+";
    if (marks >= 45) return "D";
    return "F";
  };
  
  const gradePoints = {
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0,
  };
  

  // Trigger fetch assessments when student or course changes
  useEffect(() => {
    if (selectedStudent && selectedCourse) {
      fetchAssessments(selectedStudent, selectedCourse);
    } else {
      setProgressData([]); // Clear table if selection is empty
    }
  }, [selectedStudent, selectedCourse]);

  const totalGPA =
  progressData.length > 0
    ? (
        progressData.reduce((sum, item) => {
          const grade = convertMarksToGrade(item.marks);
          const gpa = gradePoints[grade];
          return sum + gpa;
        }, 0) / progressData.length
      ).toFixed(2)
    : "N/A";

  return (
    <div className="d-flex">
      <Header/>
      <DashboardSidebar role="instructor" />

      <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px", marginTop: "60px", maxWidth: "1200px" }}>
        <Card className="shadow-lg p-4 mx-auto">
          <Card.Title className="text-center" style={{ color: "#ff5733" }}>
            Student Progress Report
          </Card.Title>
          <Card.Body>
            
            {/* Select Course */}
            <Form.Group className="mb-3">
              <Form.Label><strong>Select Course:</strong></Form.Label>
              <Form.Control as="select" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                <option value="">-- Select Course --</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>{course.course_name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Select Student */}
            <Form.Group className="mb-3">
              <Form.Label><strong>Select Student:</strong></Form.Label>
              <Form.Control as="select" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                <option value="">-- Select Student --</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>{student.name}</option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Table */}
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <Table bordered hover responsive>
                <thead className="bg-primary text-white text-center">
                  <tr>
                    <th>Module Name</th>
                    <th>Marks</th>
                    <th>Grade</th>
                    <th>GPA</th>
                  </tr>
                </thead>
                <tbody>
    {progressData.length > 0 ? (
      progressData.map((data, index) => {
        const grade = convertMarksToGrade(data.marks);
        const gpa = gradePoints[grade];

        return (
          <tr key={index} className="text-center">
            <td>{data.module_id?.modulename || "-"}</td>
            <td>{data.marks ?? "-"}</td>
            <td>{grade}</td>
            <td>{gpa}</td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="4" className="text-center text-danger">No records found</td>
      </tr>
    )}
  </tbody>

                {/* Total GPA */}
                <tfoot>
                  <tr className="bg-light text-center">
                    <td colSpan="3"><strong>Total GPA</strong></td>
                    <td><strong>{totalGPA}</strong></td>
                  </tr>
                </tfoot>
              </Table>
            )}

          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default StudentProgress;
