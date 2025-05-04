import React, { useState, useEffect } from "react";
import { Table, Card, Form, Container, Row, Col } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import axios from "axios";

const StudentEvaluationSummary = () => {
  const [evaluationData, setEvaluationData] = useState([]);
  const [selectedModule, setSelectedModule] = useState(""); 
  const [evaluation, setEvaluation] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    

    
    axios.get("http://localhost:5000/api/Coursemodule/all")
      .then((res) => setModules(res.data))
      .catch((err) => console.error("Error loading modules:", err));
  }, []);


  useEffect(() => {
    if (!selectedModule) return;
  
    axios
      .get(`http://localhost:5000/api/evaluations/summary?module_id=${selectedModule}`)
      .then((res) => setEvaluationData(res.data))
      .catch((err) => console.error("Error loading filtered evaluations", err));
  }, [selectedModule]);
 
  
  const filteredData = evaluationData.filter(
    (item) => item.module_id?._id === selectedModule
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluation({ ...evaluation, [name]: value });
  };

  const calculateScore = (item) => {
    const scores = [
      parseInt(item.Participation),
      parseInt(item.AssignmentQuality),
      parseInt(item.Understanding),
      parseInt(item.Attendance)
    ];
    const total = scores.reduce((sum, val) => sum + val, 0);
    return (total / scores.length).toFixed(2);
  };

  return (
    <Container fluid style={{ marginTop: "60px", marginLeft: "0px" }}>
      <Header />
      <Row>
        <Col md={3}>
          <DashboardSidebar role="instructor" />
        </Col>

        <Col md={9} className="p-4">
          <Card className="shadow p-4">
            <Card.Title className="text-center" style={{ color: "#ff5733" }}>
              Student Module Evaluation Summary
            </Card.Title>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Course Module</Form.Label>
                <Form.Select
  value={selectedModule}
  onChange={(e) => setSelectedModule(e.target.value)}
>
  <option value="">-- Select Module --</option>
  {modules.map((module) => (
    <option key={module._id} value={module._id}>
      {module.modulename}
    </option>
  ))}
</Form.Select>
              </Form.Group>

              <Table bordered hover responsive className="mt-3">
                <thead className="bg-primary text-white text-center">
                  <tr>
                    <th>Student Name</th>
                    <th>Course Module</th>
                    <th>Participation</th>
                    <th>Assignment Quality</th>
                    <th>Understanding</th>
                    <th>Attendance</th>
                    <th>Overall Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((data, index) => (
                      <tr key={index} className="text-center">
                        <td>{data.student_id?.name || "N/A"}</td>
                        <td>{data.module_id?.modulename}</td>
                        <td>{data.Participation} ★</td>
                        <td>{data.AssignmentQuality} ★</td>
                        <td>{data.Understanding} ★</td>
                        <td>{data.Attendance} ★</td>
                        <td><strong>{calculateScore(data)}</strong></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-danger">
                        No evaluations available for this module
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentEvaluationSummary;
