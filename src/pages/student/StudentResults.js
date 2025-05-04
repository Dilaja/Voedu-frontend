import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import axios from "axios";

const StudentResults = () => {
  const [results, setResults] = useState([]);
  const userId = localStorage.getItem("userId"); 

  

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/studentassessments/student/${userId}`);
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching student assessments:", err);
      }
    };
  
    fetchResults();
  }, []);

 
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

  const calculateGPA = () => {
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
  
    let totalPoints = 0;
    results.forEach((result) => {
      const grade = convertMarksToGrade(result.marks);
      totalPoints += gradePoints[grade] || 0;
    });
  
    return results.length > 0 ? (totalPoints / results.length).toFixed(2) : "N/A";
  };

  return (
    <Container fluid>
      <Header />
      <DashboardSidebar role="student" />
      <Row>
        
        <Col md={9} className="p-4">
          <Card className="shadow p-4" style={{ marginLeft: "250px", width: "1200px", marginTop: "60px" }}>
            <h4 className="text-center" style={{ color: "#ff5733" }}>Student Module Assessment Results</h4>
            <hr />

            <Table striped bordered hover className="mt-3">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Module</th>
                  <th>Score (%)</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                  <td>{result.module_id?.modulename}</td>
                  <td>{result.marks}%</td>
                  <td>{convertMarksToGrade(result.marks)}</td>
                </tr>
                ))}
              </tbody>
            </Table>

            <Card className="mt-4 p-3 text-center bg-light">
              <h5>Overall GPA</h5>
              <h3 className="text-success">{calculateGPA()}</h3>
            </Card>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentResults;

