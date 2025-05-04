import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card, Image } from "react-bootstrap";
import axios from "axios";
import logo from "../assets/logo.png";
const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const res = await axios.post("http://localhost:5000/api/register/add", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        alert(res.data.message || "Account created! Please check your email to activate your account.");
        setIsSignUp(false);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      } catch (err) {
        alert(err.response?.data?.message || "Sign up failed");
      }
    } else {
      try {
        const res = await axios.post("http://localhost:5000/api/login/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", res.data.user.role);
        localStorage.setItem("userInfo", JSON.stringify(res.data.user));
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("Email", res.data.user.email);

        switch (res.data.user.role) {
          case "admin":
            window.location.href = "/admin";
            break;
          case "instructor":
            window.location.href = "/instructor";
            break;
          case "student":
            window.location.href = "/student";
            break;
          default:
            window.location.href = "/home";
        }
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5} xl={4}>
          <Card className="shadow p-4">
            <div className="text-center mb-3">
              <Image
                src={logo} 
                alt="Logo"
                width={150}
                height={50}
                roundedCircle
              />
            </div>
            <h4 className="text-center text-primary mb-4">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h4>
            <Form onSubmit={handleSubmit}>
              <Row>
                {isSignUp && (
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                )}

                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                {isSignUp && (
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                )}
              </Row>

              <Button variant="success" type="submit" className="w-100">
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </Form>

            <p className="text-center mt-3">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <Button
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
                className="p-0"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </Button>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
