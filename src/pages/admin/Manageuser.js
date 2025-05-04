import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardSidebar from "../../components/DashboardSidebar";
import { Table, Button,Modal,Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/all");
        console.log("API Response:", res.data); // 👀
        setUsers(res.data.users); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const { _id, name, role, status } = selectedUser;
      await axios.put(`http://localhost:5000/api/users/${_id}`, {
        name,
        role,
        status,
      });
  
      const updatedUsers = users.map((u) =>
        u._id === _id ? { ...u, name, role, status } : u
      );
      setUsers(updatedUsers);
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };
  

  return (
    <div className="d-flex">
      <Header/>
      <DashboardSidebar role="admin" />

      <Container fluid className="p-4" style={{ marginLeft: "300px", width: "1200px", marginTop: "60px" }}
      >
        <h4 className="text-center" style={{ color: "#ff5733" }}>User Management</h4>

        <Button variant="success" className="mb-3" href="/admin/createuser">
          + Create New User
        </Button>

        <Table striped bordered hover>
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status || "Active"}</td>
                <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(user)}
>               Edit
                </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
     {/* Edit Modal */}
     {selectedUser && (
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  >
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={selectedUser.status}
                    onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        )}
    </div>
  );
};

export default UserManagement;