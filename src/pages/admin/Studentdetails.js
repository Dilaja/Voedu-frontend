import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const appRes = await axios.get(`http://localhost:5000/api/courseapplications/${id}`);
        setApplication(appRes.data);

        const courseRes = await axios.get(`http://localhost:5000/api/applycourse/${id}`);
        const enrolledCourse = courseRes.data.find(course => course.is_enrolled);
        setSelectedCourse(enrolledCourse || null);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentData();
  }, [id]);

  return (
    <div className="d-flex">
      <Header />
      <DashboardSidebar role="admin" />

      <Container
        className="p-4"
        style={{ marginLeft: "300px", width: "1200px", marginTop: "60px" }}

      >
        <Button variant="secondary" className="mb-3" onClick={() => navigate("/admin/manage_student")}>
          ← Back to Manage Students
        </Button>

        <h4 className="text-center mb-4">Student Application Details</h4>

        <div style={{ width: "1200px", overflowX: "auto" }}>
          {application && (
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Reference No</th>
                  <td>{application.reference_no}</td>
                </tr>
                <tr>
                  <th>Full Name</th>
                  <td>{application.firstname} {application.lastname}</td>
                </tr>
                <tr>
                  <th>NIC</th>
                  <td>{application.nicno}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{application.email}</td>
                </tr>
                <tr>
                  <th>Phone Number</th>
                  <td>{application.phoneno}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{application.address}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{application.application_status}</td>
                </tr>
                <tr>
                  <th>Applied Date</th>
                  <td>{new Date(application.application_date).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </Table>
          )}

          <h5 className="mt-5">Enrolled Course Details</h5>
          {selectedCourse ? (
            <Table striped bordered>
              <tbody>
                <tr>
                  <th>Course Code</th>
                  <td>{selectedCourse.course_code}</td>
                </tr>
                <tr>
                  <th>Course Category</th>
                  <td>{selectedCourse.course_cat}</td>
                </tr>
                <tr>
                  <th>Institute</th>
                  <td>{selectedCourse.institute_id?.name || "N/A"}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p className="text-muted">No course enrolled yet.</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default StudentDetails;
