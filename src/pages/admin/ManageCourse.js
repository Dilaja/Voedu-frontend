import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import axios from "axios";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses/all");
      setCourses(res.data);
    } catch (error) {
      console.error("Failed to load courses:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${id}`);
        setCourses(courses.filter((course) => course._id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course.");
      }
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/courses/${editingCourse._id}`, editingCourse);
      setCourses(
        courses.map((course) =>
          course._id === editingCourse._id ? editingCourse : course
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingCourse({ ...editingCourse, [name]: value });
  };

  return (
    <div className="d-flex">
      <Header />
      <DashboardSidebar role="admin" />

      <Container fluid className="p-4" style={{ marginLeft: "300px", width: "1200px", marginTop: "60px" }}>
        <h4 className="text-center" style={{ color: "#ff5733" }}>Manage Courses</h4>

        <Button variant="success" className="mb-3" href="/admin/create">
          + Create New Course
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td>{index + 1}</td>
                <td>{course.course_name}</td>
                <td>{course.course_cat}</td>
                <td>{course.duration_weeks} Weeks</td>
                <td>{course.course_level}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => handleEdit(course)}>View</Button>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(course)}>Edit</Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(course._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingCourse && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  name="course_name"
                  value={editingCourse.course_name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="course_cat"
                  value={editingCourse.course_cat}
                  onChange={handleChange}
                >
                  <option value="IT">IT & Computer Skills</option>
                  <option value="Construction">Construction & Engineering</option>
                  <option value="Healthcare">Healthcare & Nursing</option>
                  <option value="Automotive">Automotive & Mechanics</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Duration (weeks)</Form.Label>
                <Form.Control
                  type="number"
                  name="duration_weeks"
                  value={editingCourse.duration_weeks}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Level</Form.Label>
                <Form.Select
                  name="course_level"
                  value={editingCourse.course_level}
                  onChange={handleChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageCourses;

