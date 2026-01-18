/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";  
import Login from "./pages/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import HODDashboard from "./pages/hod/HODDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
         {/* Protected Routes 
         <Route path="/student-dashboard" element={<ProtectedRoute allowedRoles={["student"]}> <StudentDashboard /> </ProtectedRoute> } />
         <Route path="/teacher-dashboard" element={<ProtectedRoute allowedRoles={["teacher"]}> <TeacherDashboard /> </ProtectedRoute> } />
         <Route path="/hod-dashboard" element={<ProtectedRoute allowedRoles={["hod"]}><HODDashboard /></ProtectedRoute>} />
         <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
         <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;*/

//import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
//import { useEffect, useState } from "react";
//import { jwtDecode } from "jwt-decode";
import Home from "./pages/Home";  
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import PrivateRoute from "./routes/PrivateRoute";
//import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";

// Admin Dashboard Sections
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminFacultyManagement from "./pages/admin/AdminFacultyManagement";
import AdminHODManagement from "./pages/admin/AdminHODManagement";
import AdminExtracurricularManagement from "./pages/admin/AdminExtracurricularManagement";
import AdminStudentManagement from "./pages/admin/AdminStudentManagement";
import AdminNoticeManagement from "./pages/admin/AdminNoticeManagement";
import NoticeViewTable from "./components/NoticeViewTable";


import DashBoard from "./pages/DashBoard";

// HOD Dashboard Sections
import HODDashboard from "./pages/hod/HODDashboard";

// Teacher Dashboard Sections
import ProfessorDashboard from "./pages/professor/ProfessorDashboard";


// Student Dashboard Sections
import StudentDashboard from "./pages/student/StudentDashboard";
import DepartmentNotice from "./components/DepartmentNotice";
import Hostel from "./components/Hostel";
//import AdminNotice from "./components/AdminNotice";
import ExtraCurricular from "./components/ExtraCurricular";
//import PublicNoticeList from "./pages/admin/PublicNoticeList";

import UserList from './components/UserList';
import AddUser from './components/AddUser';
import CreateHODNotice from "./pages/hod/CreateHODNotice";
import ManageHODNotices from "./pages/hod/ManageHODNotices";
import ViewDepartmentNotices from "./pages/hod/ViewDepartmentNotices";
import ViewAdminNotices from "./pages/hod/ViewAdminNotices";
import AssignmentNoticeList from "./pages/professor/AssignmentNoticeList";
import AddAssignmentNotice from "./pages/professor/AddAssignmentNotice";
import ViewNotice from "./components/viewNotice";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/viewNotice" element={<ViewNotice/>} />

         {/* Protected Routes */}
         <Route path="/admin-dashboard" element={<PrivateRoute allowedRoles={["ADMIN"]}><AdminDashboard /></PrivateRoute>} />
         <Route path="/users" element={<PrivateRoute allowedRoles={["ADMIN"]}><UserList /></PrivateRoute>} />
         <Route path="/add-user" element={<PrivateRoute allowedRoles={["ADMIN"]}><AddUser /></PrivateRoute>} />
    
         <Route path="/faculty-manage" element={<AdminFacultyManagement />} />
         <Route path="/admin/hod" element={<AdminHODManagement />} />
         <Route path="/admin/student" element={<AdminStudentManagement />} />
         <Route path="/admin/extra-curricular" element={<AdminExtracurricularManagement />} />
         <Route path="/admin/notices" element={<AdminNoticeManagement />} />
         <Route path="/admin-notices" element={<NoticeViewTable />} />
         


         <Route path="/hod-dashboard" element={<PrivateRoute allowedRoles={["HOD"]}><HODDashboard /></PrivateRoute>} />
         <Route path="/hod/createNotice" element={<CreateHODNotice />} />
         <Route path="/department-manage" element={<ManageHODNotices />} />
         <Route path="/department" element={<ViewDepartmentNotices />} />
         <Route path="/admin-notices" element={<ViewAdminNotices />} />


         <Route path="/professor-dashboard" element={<PrivateRoute allowedRoles={["PROFESSOR"]} ><ProfessorDashboard /></PrivateRoute>} />
         <Route path="/professor-dashboard" element={<ProfessorDashboard />}>
         <Route path="notices" element={<AssignmentNoticeList />} />
         <Route path="add" element={<AddAssignmentNotice />} />
         {/* <Route path="/dashBoard" element = {<DashBoard/>}/> */}
         </Route>

         {/* <Route path="/dashboard" element={<DashBoard />} /> */}

         <Route path="/student-dashboard" element={<PrivateRoute allowedRoles={["STUDENT"]}><StudentDashboard /></PrivateRoute>} />

        <Route path="/about" element={<AboutUs />} /> 
        <Route path="/department" element={<DepartmentNotice />} />
        {/*<Route path="/admin" element={<AdminNotice />} />
        <Route path="/public-notice" element={<PublicNoticeList />} />*/}

        <Route path="/hostel" element={<Hostel />} />
        <Route path="/extracurricular" element={<ExtraCurricular />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
