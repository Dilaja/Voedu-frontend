import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Table, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const CourseRegistration = () => {
  const navigate = useNavigate();
   const [userId, setUserId] = useState("");
   const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    user_id:"",
    fname: "",
    lname: "",
    gender: "",
    nic: "",
   
    phone: "",
    dob: "",
    address: "",
    institute: "",
    program: "",
    selectedCourse: "",
    courses: [],
  });

  const [institutes, setInstitutes] = useState([]);
  const [instituteCourseMap, setInstituteCourseMap] = useState([]);
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("userId");
  const mail = localStorage.getItem("userInfo"); // This is a stringified object

  setUserId(id || "");

  if (mail) {
    const parsedMail = JSON.parse(mail).email;
    setEmail(parsedMail);
    setFormData(prev => ({ ...prev, email: parsedMail }));
  }
  }, []);
  
  useEffect(() => {
    
    axios.get("http://localhost:5000/api/institutes/all")
      .then(res => setInstitutes(res.data))
      .catch(err => console.error("Error fetching institutes:", err));

    
  }, []);

  useEffect(() => {
    if (formData.institute) {
      axios.get(`http://localhost:5000/api/institutecourse/programs/${formData.institute}`)
        .then(res => setAvailablePrograms(res.data))
        .catch(err => console.error("Failed to load programs:", err));
    }
  }, [formData.institute]);

  useEffect(() => {
    if (formData.institute && formData.program) {
      axios.get(`http://localhost:5000/api/institutecourse/courses/${formData.institute}/${formData.program}`)
        .then(res => setAvailableCourses(res.data))
        .catch(err => console.error("Failed to load courses:", err));
    }
  }, [formData.institute, formData.program]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "institute") {
      setFormData(prev => ({
        ...prev,
        institute: value,
        program: "",
        selectedCourse: "",
        
      }));
      setAvailablePrograms([]);
      setAvailableCourses([]);
      const programs = instituteCourseMap
        .filter(map => map.institute_id === value)
        .map(map => map.course_cat);
      setAvailablePrograms([...new Set(programs)]);
      setAvailableCourses([]);
    } else if (name === "program") {
      setFormData(prev => ({
        ...prev,
        program: value,
        selectedCourse: "",
      }));

      const courses = instituteCourseMap
        .filter(map =>
          map.institute_id === formData.institute &&
          map.course_cat === value
        )
        .map(map => map.course_code);
      setAvailableCourses([...new Set(courses)]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddCourse = () => {
    const selected = availableCourses.find(c => c.course_code === formData.selectedCourse);
if (selected && !formData.courses.find(c => c.course_code === selected.course_code)) {
  setFormData(prev => ({
    ...prev,
    courses: [
      ...prev.courses,
      {
        institute_id: formData.institute,
        course_id: selected._id,             // 👈 this is the Mongo ObjectId
        course_name: selected.course_name,
        course_cat: selected.course_cat,     // you might need to ensure this is available
        course_code: selected.course_code,
      },
    ],
    selectedCourse: "",
  }));
}

  };

  const handleRemoveCourse = (index) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      
      const { courses, ...rest } = formData;
  
      const studentData = {
        user_id:userId,
        firstname: rest.fname,
        lastname: rest.lname,
        birthday: rest.dob,
        nicno: rest.nic,
        email: rest.email,
        phoneno: rest.phone,
        address: rest.address,
      };
  
      
      const res = await axios.post("http://localhost:5000/api/courseapplications/apply", studentData);
      const applicationId = res.data.application._id;
  
      
      const applyCourses = courses.map(course => ({
        application_id: applicationId,
        institute_id: course.institute_id,
        course_id:course.course_id,
        course_cat: course.course_cat,
        course_code: course.course_code,
      }));
  
      for (const course of applyCourses) {
        await axios.post("http://localhost:5000/api/applycourse/apply", course);
      }
  
      alert("Course Application Submitted Successfully!");
    
      navigate("/success", {
        state: {
          application: res.data.application, 
          courses: applyCourses.map(course => {
            const institute = institutes.find(i => i._id === course.institute_id);
            return {
              ...course,
              reference_number: res.data.application?.reference_number, 
              institute_name: institute?.name || course.institute_id,
            };
          }),
        },
      });
      // Reset form
      setFormData({
        fname: "",
        lname: "",
        gender: "",
        nic: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        institute: "",
        program: "",
        selectedCourse: "",
        courses: [],
      });
      setAvailablePrograms([]);
      setAvailableCourses([]);
  
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      alert("Something went wrong while submitting!");
    }
  };
  
  

  return (
    
    <Container  style={{  maxWidth: "1500px", marginTop: "100px" }}>
      <Navbar/>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow p-4">
            <h4 className="text-center" style={{ color: "#ff5733" }}>Course Registration</h4>
            <Form onSubmit={handleSubmit}>
              <Row>
                {/* Personal Info */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      name="fname"
                      value={formData.fname}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      name="lname"
                      value={formData.lname}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>NIC Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="nic"
                      placeholder="Enter NIC"
                      value={formData.nic}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      disabled
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      placeholder="Enter your address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                {/* Institute */}
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Institute</Form.Label>
                    <Form.Select
                      name="institute"
                      value={formData.institute}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select an Institute</option>
                      {institutes.map((inst) => (
                        <option key={inst._id} value={inst._id}>{inst.name}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Program */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Program</Form.Label>
                    <Form.Select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a Program</option>
                      {availablePrograms.map((prog, i) => (
                        <option key={i} value={prog}>{prog}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Course */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Course</Form.Label>
                    <Form.Select
                      name="selectedCourse"
                      value={formData.selectedCourse}
                      onChange={handleChange}
                      required
                      disabled={!formData.program}
                     
                    >
                      <option value="">Select a Course</option>
                      {availableCourses.map((course, i) => (
                      <option key={course._id} value={course.course_code}>
                      {course.course_name}
                      </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6} className="d-flex align-items-end">
                  <Button
                    variant="primary"
                    onClick={handleAddCourse}
                    disabled={!formData.selectedCourse}
                  >
                    Add Course
                  </Button>
                </Col>
              </Row>

              {/* Course Table */}
              {formData.courses.length > 0 && (
                <Table striped bordered hover className="mt-3">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Institute</th>
                      <th>Program</th>
                      <th>Course</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {formData.courses.map((course, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{institutes.find(inst => inst._id === course.institute_id)?.name || course.institute_id}</td>
    <td>{course.course_cat}</td>
    <td>{course.course_name}</td>
    <td>
      <Button variant="danger" size="sm" onClick={() => handleRemoveCourse(index)}>
        Remove
      </Button>
    </td>
  </tr>
))}

                  </tbody>
                </Table>
              )}

              <Button variant="success" type="submit" className="w-100 mt-3">
                Submit Application
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseRegistration;