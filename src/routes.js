import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import CourseRegistration from "./pages/CourseRegistration";
import ActivateAccount from "./pages/Accountactivate";
import Logout from "./pages/Logout";
//import Changepass from "./components/Changepass";
import Success from "./pages/Success"; 
// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import Studentcurriculum from "./pages/student/Studentcurriculum";
import Studentcourse from "./pages/student/Studentcourse";
import Studentprofile from "./pages/student/Studentprofile";
import StudentResults from "./pages/student/StudentResults";
import StudentFeedback from "./pages/student/StudentFeedback";
import Studentmessages from "./pages/student/Messages";
import Changepasss from "./pages/student/Changepasss";
// Instructor Pages
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import Curriculum from "./pages/instructor/Curriculum";
import CourseMaterial from "./pages/instructor/CourseMaterial";
import Evaluation from "./pages/instructor/Evaluation";
import Announcement from "./pages/instructor/Annoucements";
import Assessment from "./pages/instructor/Assessment";
import Feedback from "./pages/instructor/InstructorFeedback";
import Studentprogress from "./pages/instructor/Studentprogress"
import Changepassi from "./pages/instructor/Changepassi";
// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCourse from "./pages/admin/Course";
import ManageCourse from "./pages/admin/ManageCourse";
import Managestudent from "./pages/admin/Managestudent";
import Trackstudent from "./pages/admin/Trackstudent";
import Createuser from "./pages/admin/CreateUser";
import Usermanagement from "./pages/admin/Manageuser";
import Studentdetails from "./pages/admin/Studentdetails";
import Institutereg from "./pages/admin/Instituteregistration";
import Changepassa from "./pages/admin/Changepassa";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<CourseRegistration />} />
        <Route path="/Accountactivate/:token" element={<ActivateAccount />} />
        <Route path="/success" element={<Success/>} />
        <Route path="/logout" element={<Logout/>} />
        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/studentcurriculum" element={<Studentcurriculum />} />
        <Route path="/student/studentcourses" element={<Studentcourse />} />
        <Route path="/student/profile" element={<Studentprofile />} />
        <Route path="/student/results" element={<StudentResults />} />
        <Route path="/student/feedback" element={<StudentFeedback />} />
        <Route path="/student/changepass" element={<Changepasss />} />
        <Route path="/student/messages" element={<Studentmessages />} />
        {/* Instructor Routes */}
        <Route path="/instructor" element={<InstructorDashboard />} />
        <Route path="/instructor/course" element={<CourseMaterial />} />
        <Route path="/instructor/curriculum" element={<Curriculum />} />
        <Route path="/instructor/assessment" element={<Assessment />} />
        <Route path="/instructor/evaluation" element={<Evaluation />} />
        <Route path="/instructor/announcements" element={<Announcement />} />
        <Route path="/instructor/studentprogress" element={<Studentprogress/>}/>
        <Route path="/instructor/feedback" element={<Feedback />} />
        <Route path="/instructor/changepass" element={<Changepassi />} />
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateCourse />} />
        <Route path="/admin/manage" element={<ManageCourse />} />
        <Route path="/admin/manage_student" element={<Managestudent/>} />
        <Route path="/admin/student_track" element={<Trackstudent/>} />
        <Route path="/admin/createuser" element={<Createuser/>} />
        <Route path="/admin/users" element={<Usermanagement/>} />
        <Route path="/admin/student-details/:id" element={<Studentdetails />} />
        <Route path="/admin/institute" element={<Institutereg/>} />
        <Route path="admin//changepass" element={<Changepassa />} />
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;





