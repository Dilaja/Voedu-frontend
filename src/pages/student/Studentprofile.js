import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Table, Alert, Spinner } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import axios from "axios";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User ID not found in localStorage");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/courseapplications/profile/${userId}`)
      .then((res) => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("Failed to load student profile");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status" />
        <div>Loading...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" className="text-center">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  if (!student || !student.personalInfo) {
    return (
      <Container className="mt-4">
        <Alert variant="warning" className="text-center">
          Student profile data is incomplete or missing.
        </Alert>
      </Container>
    );
  }

  const { personalInfo, enrolledCourses = [] } = student;

  return (
    <div className="d-flex">
    
      <Header />
      <DashboardSidebar role="student" />
      <Container fluid style={{ marginLeft: "100px", width: "1300px", marginTop: "60px" }}>
      <Row>
        <Col md={3}>
         
        </Col>
        <Col md={9} className="p-4">
          <Card className="shadow p-4" >
            <h4 className="text-center" style={{ color: "#ff5733" }}>
              Student Profile
            </h4>
            <hr />

            <Row>
              <Col md={6}>
                <Card className="mb-4 p-3 h-100">
                  <h4 className="text-secondary">Personal Information</h4>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Name:</strong> {personalInfo.firstname} {personalInfo.lastname}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>NIC:</strong> {personalInfo.nicno}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Email:</strong> {personalInfo.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Phone:</strong> {personalInfo.phoneno}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Address:</strong> {personalInfo.address}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Birthday:</strong> {new Date(personalInfo.birthday).toLocaleDateString()}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Application Status:</strong> {personalInfo.application_status}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="p-3">
                  <h4 className="text-secondary">Enrolled Courses</h4>
                  {enrolledCourses.length > 0 ? (
                    <Table striped bordered hover>
                      <thead className="bg-primary text-white">
                      <tr>
                      <th>Course Name</th>
                      <th>Course Category</th>
                      <th>Course Code</th>
                      </tr>
                      </thead>
                      <tbody>
                      {enrolledCourses.map((course) => (
                      <tr key={course._id}>
                      <td>{course.course_id ? course.course_id.course_name : "N/A"}</td>
                      <td>{course.course_cat}</td>
                      <td>{course.course_code}</td>
                      </tr>
                      ))}
                      </tbody>
                    </Table>
                  ) : (
                    <div>No enrolled courses found.</div>
                  )}
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default StudentProfile;
