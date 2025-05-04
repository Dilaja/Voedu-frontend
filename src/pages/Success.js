import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Table, Card } from "react-bootstrap";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const application = location.state?.application;
  const courses = location.state?.courses || [];

  if (!application) {
    return (
      <Container className="my-5 text-center">
        <h4>No submission data found!</h4>
        <Button onClick={() => navigate("/Home")}>Go Home</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="shadow p-4">
       

        <h5>Application Details:</h5>
        <p><strong>Name:</strong> {application.firstname} {application.lastname}</p>
        <p><strong>Email:</strong> {application.email}</p>
        <p><strong>NIC:</strong> {application.nicno}</p>
        <p><strong>Phone:</strong> {application.phoneno}</p>
        <p><strong>Address:</strong> {application.address}</p>
        <p><strong>Application Reference:</strong> {application.reference_no}</p>

        <h5 className="mt-4">Applied Courses:</h5>
        {courses.length === 0 ? (
          <p>No courses selected.</p>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Institute ID</th>
                <th>Program</th>
                <th>Course Code</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{c.institute_name}</td>
                  <td>{c.course_cat}</td>
                  <td>{c.course_code}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <Button className="mt-3" onClick={() => navigate("/Home")}>
          Back to Home
        </Button>
      </Card>
    </Container>
  );
};

export default Success;
