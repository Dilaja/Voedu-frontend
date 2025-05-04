import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import landingImage from "../assets/landing-image.png";
import { useLanguage } from "../context/LanguageContext"; // Import context

const LandingPage = () => {
  const { language, translations } = useLanguage(); // Get translations

  return (
    <div className="landing-page d-flex align-items-center vh-100">
      <Container>
        <Row className="align-items-center">
          {/* Left Side: App Info */}
          <Col md={6} className="text-left">
            <h1 className="text-primary fw-bold">{translations[language].welcome}</h1>
            <p className="lead text-dark">
              {language === "en"
                ? "Empowering Your Future with VoEdu."
                : language === "si"
                ? "VoEdu සමඟ ඔබේ අනාගතය ශක්තිමත් කරයි."
                : "VoEdu உடன் உங்கள் எதிர்காலத்தை மேம்படுத்துங்கள்."}
            </p>
            <Button variant="success" size="lg" href="/about">
              {translations[language].about}
            </Button>
          </Col>

          {/* Right Side: Image */}
          <Col md={6} className="text-center">
            <img
              src={landingImage}
              alt="Vocational Education"
              className="img-fluid rounded shadow-lg"
              style={{ maxWidth: "90%", height: "90%" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;

