import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Collapse } from "react-bootstrap";
import profile from "../assets/profile.png";
import {
  FaHome, FaUsers, FaBook, FaClipboardList, FaChartBar,
  FaCogs, FaChalkboardTeacher, FaUserCog, FaGraduationCap,FaAward,FaUserPlus , FaFileAlt
} from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { TbPasswordUser } from "react-icons/tb";
import "../styles/DashboardSidebar.css"; // Custom CSS

const DashboardSidebar = ({ role }) => {
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser({ name: storedUser.name, role: storedUser.role });
    }
  }, []);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  let dashboardLinks = [];

  if (role === "student") {
    
    dashboardLinks = [
      
      { path: "/student/studentcurriculum", label: "Course Curriculum", icon: <FaBook /> },
      { path: "/student/studentcourses", label: "My Courses", icon: <FaChalkboardTeacher /> },
      { path: "/student/profile", label: "Profile", icon: <FaUserCog /> },
      { path: "/student/results", label: "Grades", icon: <FaClipboardList /> },
      { path: "/student/feedback", label: "Module Evaluation", icon: <FaAward /> },
      { path: "/student/messages", label: "Massages", icon: <FaFileAlt /> },
      { path: "/student/changepass", label: "Change Password", icon: <TbPasswordUser /> },
      { path: "/logout", label: "Logout", icon: <IoMdLogOut /> }
    ];
  } else if (role === "instructor") {
    dashboardLinks = [
      {
        label: "Course Management", isDropdown: true, icon: <FaBook />,
        subLinks: [
          { path: "/instructor/curriculum", label: "Course Curriculum", icon: <FaGraduationCap /> },
          { path: "/instructor/course", label: "Upload Materials", icon: <FaFileAlt /> },
        ],
      },
      { path: "/instructor/assessment", label: "Assessment", icon: <FaClipboardList /> },
      { path: "/instructor/evaluation", label: "Module Evaluation", icon: <FaChartBar /> },
      { path: "/instructor/studentprogress", label: "Student Progress", icon: <FaUsers /> },
      { path: "/instructor/announcements", label: "Announcements", icon: <FaBook /> },
      { path: "/instructor/feedback", label: "Evaluation Summery", icon: <FaFileAlt /> },
      { path: "/instructor/changepass", label: "Change Password", icon: <TbPasswordUser /> },
      { path: "/logout", label: "Logout", icon: <IoMdLogOut /> }
    ];
  } else if (role === "admin") {
    dashboardLinks = [
      { path: "/admin/create", label: "Create Course", icon: <FaBook /> },
      { path: "/admin/institute", label: "Institute Registration", icon: <FaBook /> },
      { path: "/admin/manage", label: "Manage Courses", icon: <FaClipboardList /> },
      {
        label: "Student Management", isDropdown: true, icon: <FaUsers />,
        subLinks: [
          { path: "/admin/manage_student", label: "Manage Student Registration", icon: <FaUserCog /> },
          { path: "/admin/student_track", label: "Track Student Performance", icon: <FaChartBar /> },
        ],
      },
      { path: "/admin/createuser", label: "Create User", icon: <FaUserPlus /> },
      { path: "/admin/users", label: "User Management", icon: <FaUsers /> },
      { path: "/admin/changepass", label: "Change Password", icon: <TbPasswordUser /> },
      { path: "/logout", label: "Logout", icon: <IoMdLogOut /> }
    ];
  }

  return (
    <Nav className="flex-column sidebar">
      {/* User Profile Section */}
      <div className="container mt-5 pt-5 text-center">
  {/* User Avatar */}
  <img
    src={profile} // Replace with user's actual image if available
    alt="User"
    className="rounded-circle mb-3"
    width="75"
    height="75"
  />

  {/* Welcome Text */}
  <h5 style={{ color: "#ff5733" }}>Welcome ! {user.name}</h5>
  
  <p style={{ color: "#ff5733" }} className="lead">Login As <strong>{user.role}</strong></p>
</div>
      {/* Dynamic Menu Items */}
      {dashboardLinks.map((link, index) => (
        link.isDropdown ? (
          <div key={index} className="dropdown">
            <Nav.Link onClick={() => toggleDropdown(index)} className="nav-item">
              {link.icon} <span>{link.label}</span> {openDropdown === index ? "+" : "▶"}
            </Nav.Link>
            <Collapse in={openDropdown === index}>
              <div className="sub-menu">
                {link.subLinks.map((subLink, subIndex) => (
                  <Nav.Link as={Link} to={subLink.path} key={subIndex} className="sub-item">
                    {subLink.icon} <span>{subLink.label}</span>
                  </Nav.Link>
                ))}
              </div>
            </Collapse>
          </div>
        ) : (
          <Nav.Link as={Link} to={link.path} key={index} className="nav-item">
            {link.icon} <span>{link.label}</span>
          </Nav.Link>
        )
      ))}
    </Nav>
  );
};

export default DashboardSidebar;  