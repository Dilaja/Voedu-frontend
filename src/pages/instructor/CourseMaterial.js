import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Table } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import Header from "../../components/Header";
import axios from "axios";

const CourseMaterials = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [materials, setMaterials] = useState([]);
  const [newMaterial, setNewMaterial] = useState({
    module_title: "",
    title: "",
    type: "",
    file: null,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/courses/all")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error loading courses:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial({ ...newMaterial, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewMaterial({ ...newMaterial, file: e.target.files[0] });
  };

  const handleAddMaterial = async () => {
    if (!newMaterial.module_title || !newMaterial.title || !newMaterial.type || !newMaterial.file || !selectedCourseId) {
      alert("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("module_title", newMaterial.module_title);
    formData.append("title", newMaterial.title);
    formData.append("type", newMaterial.type);
    formData.append("file", newMaterial.file);
    formData.append("course_id", selectedCourseId);

    try {
      const response = await axios.post("http://localhost:5000/api/coursematerials/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newEntry = response.data.material;
      setMaterials([...materials, {
        id: materials.length + 1,
        module_title: newEntry.module_title,
        title: newEntry.title,
        type: newEntry.type,
        file: newEntry.filename,
      }]);

      setNewMaterial({ module_title: "", title: "", type: "", file: null });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload material.");
    }
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter((material) => material.id !== id));
  };

  return (
    <Container fluid>
      <Header />
      <Row>
        <Col md={3}>
          <DashboardSidebar role="instructor" />
        </Col>

        <Col md={9} className="p-4">
          <h4 className="text-center" style={{ color: "#ff5733" }}>Course Materials Management</h4>
          <Card className="p-4 shadow">
            <h4>Add New Material</h4>
            <Form>
              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Course</Form.Label>
                    <Form.Select
                      name="course"
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      required
                    >
                      <option value="">Select Course</option>
                      {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.course_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Module Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="module_title"
                      value={newMaterial.module_title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={newMaterial.title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Select name="type" value={newMaterial.type} onChange={handleChange} required>
                      <option value="">Select Type</option>
                      <option value="Lecture">Lecture</option>
                      <option value="PDF">Assignment</option>
                      <option value="Video">Video</option>
                      <option value="External Link">External Link</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Upload File</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} required />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" onClick={handleAddMaterial}>
                Add Material
              </Button>
            </Form>

            <hr />

            <h4>Existing Course Materials</h4>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Module</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>File</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr key={material.id}>
                    <td>{index + 1}</td>
                    <td>{material.module_title}</td>
                    <td>{material.title}</td>
                    <td>{material.type}</td>
                    <td>
                      <a href={`#`} download>
                        {material.file}
                      </a>
                    </td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(material.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseMaterials;
