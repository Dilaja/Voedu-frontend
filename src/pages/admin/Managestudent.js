import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentCourseApplyList = () => {
  const navigate = useNavigate();
  const [selectedCourses, setSelectedCourses] = useState({});
  const [applications, setApplications] = useState([]);
  const [applyCourses, setApplyCourses] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courseapplications/allapplications");
        setApplications(res.data.applications);
        setApplyCourses(res.data.applyCourses);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchApplications();
  }, []);

  const handleCourseSelect = (applicationId, courseId) => {
    setSelectedCourses((prev) => ({
      ...prev,
      [applicationId]: courseId,
    }));
  };

  const handleEnroll = async (applicationId) => {
    const courseId = selectedCourses[applicationId];
    try {
      await axios.put("http://localhost:5000/api/courseapplications/enroll", {
        applicationId,
        applyCourseId: courseId,
      });
      alert("Enrolled successfully!");
      // Optionally refresh
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to enroll student.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courseapplications/${id}`);
      setApplications(applications.filter(app => app._id !== id));
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/admin/student-details/${id}`);
  };

  return (
    <div className="d-flex">
      <Header />
      <DashboardSidebar role="admin" />

      <Container
        fluid
        className="p-4"
        style={{ marginLeft: "300px", width: "1200px", marginTop: "60px" }}
      >
        <h4 className="text-center" style={{ color: "#ff5733" }}>
          Student Course Applications
        </h4>

        <Table striped bordered hover className="mt-3">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Reference No</th>
              <th>Student Name</th>
              <th>Applied Courses</th>
              <th>Application Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => {
              const coursesForApp = applyCourses.filter(
                (course) => course.application_id._id === app._id
              );

              const isApproved = app.application_status === "Approved";

              return (
                <tr key={app._id}>
                  <td>{index + 1}</td>
                  <td>{app.reference_no}</td>
                  <td>{app.firstname} {app.lastname}</td>
                  <td>
                    {coursesForApp.map((course, idx) => (
                      <div key={idx}>
                        <input
                          type="radio"
                          name={`selectedCourse-${app._id}`}
                          value={course._id}
                          disabled={isApproved}
                          checked={selectedCourses[app._id] === course._id}
                          onChange={() => handleCourseSelect(app._id, course._id)}
                        />
                        <strong>{course.course_code}</strong> - {course.course_cat}
                        <br />
                        <span className="text-muted">
                          Institute: {course.institute_id?.name}
                        </span>
                        <hr />
                      </div>
                    ))}
                    <Button
                      variant="success"
                      className="mt-2"
                      onClick={() => handleEnroll(app._id)}
                      disabled={!selectedCourses[app._id] || isApproved}
                    >
                      Enroll
                    </Button>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        isApproved ? "bg-success" : "bg-warning text-dark"
                      }`}
                    >
                      {app.application_status}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      className="me-2 mb-1"
                      onClick={() => handleViewDetails(app._id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(app._id)}
                      disabled={isApproved}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default StudentCourseApplyList;


