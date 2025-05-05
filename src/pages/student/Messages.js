import React, { useState ,useEffect} from "react";
import { Container, Row, Col, Form, Button, Card, ListGroup } from "react-bootstrap";
import DashboardSidebar from "../../components/DashboardSidebar";
import "../../styles/index.css";
import axios from "axios";
import Header from "../../components/Header";

const CustomTabs = () => {
  const [activeTab, setActiveTab] = useState("send");
  const [recipients, setRecipients] = useState([]);
  const [senderId, setSenderId] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    const userId = localStorage.getItem("userId");
    
    if (userId) {
      setSenderId(userId);  // just store ID
    }
  });

     const [messageData, setMessageData] = useState({
      receiver_id: "",
      subject: "",
      message: "",
    });

    useEffect(() => {
      axios.get("http://localhost:5000/api/announcements/all")
        .then(response => setAnnouncements(response.data))
        .catch(error => console.error("Error fetching announcements:", error));
    }, []);

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("userInfo"));
      const Id = localStorage.getItem("userId");
      setSenderId(Id);
    
      // Once we have the userId, fetch received messages
      if (Id) {
        axios.get(`http://localhost:5000/api/messages/${Id}`)
          .then(response => setReceivedMessages(response.data))
          .catch(error => console.error("Error fetching received messages:", error));
      }
    }, []);

    const handleChange = (e) => {
      setMessageData({ ...messageData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const payload = {
          sender_id: senderId,
          receiver_id: messageData.receiver_id,
          subject: messageData.subject,
          message: messageData.message,
        };
    
        const res = await axios.post("http://localhost:5000/api/messages/send", payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        alert(res.data.message);
        setMessageData({ receiver_id: "", subject: "", message: "" });
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message");
      }
    };

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/recipients")
      .then(response => setRecipients(response.data))
      .catch(error => console.error("Error fetching recipients:", error));
  }, []);

  return (
    <div className="d-flex">
      <Header/>
      <DashboardSidebar role="student" />
      <Container fluid className="p-4" style={{ marginLeft: "250px", width: "1200px",marginTop:"60px" }}>
        <Row>
          <Col>
            <div className="tab-header mb-3">
              <div
                className={`tab ${activeTab === "send" ? "active" : ""}`}
                onClick={() => setActiveTab("send")}
              >
                Send
              </div>
              <div
                className={`tab ${activeTab === "received" ? "active" : ""}`}
                onClick={() => setActiveTab("received")}
              >
                Received
              </div>
              <div
                className={`tab ${activeTab === "announcement" ? "active" : ""}`}
                onClick={() => setActiveTab("announcement")}
              >
                Announcement
              </div>
            </div>

            <Card className="p-4">
              {activeTab === "send" && (
                <Form>
                  <h4 className="mb-3">Send Message</h4>
                  <Form.Group className="mb-">
                  <Form.Label>Select Recipient</Form.Label>
                  <Form.Select
  name="receiver_id"
  value={messageData.receiver_id}
  onChange={handleChange}
  required
>
  <option value="">-- Select Recipient --</option>
  {recipients.map((user) => (
    <option key={user._id} value={user._id}>
      {user.name} ({user.role})
    </option>
  ))}
</Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
  <Form.Label>Subject</Form.Label>
  <Form.Control
    type="text"
    name="subject"
    value={messageData.subject}
    onChange={handleChange}
    placeholder="Enter subject"
    required
  />
</Form.Group>
<Form.Group className="mb-3">
  <Form.Label>Message</Form.Label>
  <Form.Control
    as="textarea"
    name="message"
    value={messageData.message}
    onChange={handleChange}
    rows={3}
    placeholder="Enter message"
    required
  />
</Form.Group>

                  <Button variant="success" type="submit" onClick={handleSubmit}>
                    Send
                  </Button>
                </Form>
              )}

{activeTab === "received" && (
  <div>
    <h4 className="mb-3">Received Messages</h4>
    <ListGroup>
      {receivedMessages.length === 0 ? (
        <ListGroup.Item>No messages received</ListGroup.Item>
      ) : (
        receivedMessages.map((msg) => (
          <ListGroup.Item key={msg._id}>
            <strong>From: {msg.sender_id.name}</strong> <br />
            <em>Subject: {msg.subject}</em>
            <p>{msg.message}</p>
            <small className="text-muted">
              {new Date(msg.createdAt).toLocaleString()}
            </small>
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  </div>
)}


{activeTab === "announcement" && (
  <div>
    <h4 className="mb-3">Announcements</h4>
    <ListGroup>
      {announcements.length === 0 ? (
        <ListGroup.Item>No announcements found.</ListGroup.Item>
      ) : (
        announcements.map((announcement) => (
          <ListGroup.Item key={announcement._id}>
            <h5>{announcement.title}</h5>
            <p>{announcement.description}</p>
            <small className="text-muted">
              Posted on {new Date(announcement.createdAt).toLocaleDateString()}
            </small>
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  </div>
)}

            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomTabs;
