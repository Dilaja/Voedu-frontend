import React from "react";


import "./App.css";
//import { BrowserRouter as Router } from "react-router-dom";
//import Navbar from "./components/Navbar"; // Landing Page Navbar
//import Navbarrole from "./components/Navbarrole"; // Role-Based Navbar for Authenticated Users
//import DashboardSidebar from "./components/DashboardSidebar"; // Sidebar for Authenticated Users
import AppRoutes from "./routes"; // Import Routes


// Function to Get User Role (Example: From Local Storage or API)

function App() {
  

  return (
    <>
     
      <div className="d-flex">
        
       
          <AppRoutes />
        </div>
        
     
    </>
  );
}

export default App;
