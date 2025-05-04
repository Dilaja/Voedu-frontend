import  { React,useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Form } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import DashboardSidebar from "../../components/DashboardSidebar";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import Header from "../../components/Header";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InstructorEvaluationSummary = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedModule, setSelectedModule] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/evaluations/summary")
      .then(res => {
        const processed = res.data.map(e => ({
          studentName: e.student_id.name,
          courseModule: e.module_id.modulename,
          participation: parseInt(e.Participation),
          assignmentQuality: parseInt(e.AssignmentQuality),
          understanding: parseInt(e.Understanding),
          attendance: parseInt(e.Attendance),
          comments: e.comments || ""
        }));
        setEvaluations(processed);
      })
      .catch(err => {
        console.error("Failed to fetch evaluations", err);
      });
  }, []);

  const filteredEvaluations = evaluations.filter(
    (evaluation) =>
      (selectedStudent ? evaluation.studentName === selectedStudent : true) &&
      (selectedModule ? evaluation.courseModule === selectedModule : true)
  );

  const students = [...new Set(evaluations.map(e => e.studentName))];
  const modules = [...new Set(evaluations.map(e => e.courseModule))];

  const chartData = {
    labels: filteredEvaluations.map(e => e.studentName),
    datasets: [
      {
        label: "Participation",
        data: filteredEvaluations.map(e => e.participation),
        backgroundColor: "rgba(255, 159, 64, 0.6)"
      },
      {
        label: "Assignment Quality",
        data: filteredEvaluations.map(e => e.assignmentQuality),
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      },
      {
        label: "Understanding",
        data: filteredEvaluations.map(e => e.understanding),
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      },
      {
        label: "Attendance",
        data: filteredEvaluations.map(e => e.attendance),
        backgroundColor: "rgba(153, 102, 255, 0.6)"
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Instructor Evaluation Summary" }
    },
  };

  return (
    <div className="d-flex">
      <Header />
      <DashboardSidebar role="admin" />

      <div className="container-fluid" style={{ marginLeft: "300px", width: "1200px", marginTop: "60px" }}
      >
        <Card className="shadow-lg p-4 mx-auto" >
          <Card.Title className="text-center " style={{ color: "#ff5733" }}
          >Instructor Evaluation Summary</Card.Title>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Student</Form.Label>
                <Form.Select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                  <option value="">-- Select Student --</option>
                  {students.map((student, index) => (
                    <option key={index} value={student}>{student}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Course Module</Form.Label>
                <Form.Select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)}>
                  <option value="">-- Select Module --</option>
                  {modules.map((module, index) => (
                    <option key={index} value={module}>{module}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>

            <Bar data={chartData} options={options} />

            <Table striped bordered hover responsive style={{ marginTop: "30px" }}>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Course Module</th>
                  <th>Participation</th>
                  <th>Assignment Quality</th>
                  <th>Understanding</th>
                  <th>Attendance</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvaluations.map((e, index) => (
                  <tr key={index}>
                    <td>{e.studentName}</td>
                    <td>{e.courseModule}</td>
                    <td>{e.participation}</td>
                    <td>{e.assignmentQuality}</td>
                    <td>{e.understanding}</td>
                    <td>{e.attendance}</td>
                    <td>{e.comments}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default InstructorEvaluationSummary;
