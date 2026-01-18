// import React, { useState, useEffect } from 'react';
// import api from '../../services/api';
// import NoticeCard from '../../components/NoticeCard';
// import AddNoticeForm from '../../components/AddNoticeForm';

// function ProfessorDashboard() {
//   const [notices, setNotices] = useState([]);

//   const fetchNotices = async () => {
//     try {
//       const res = await api.get('/api/notice/department');
//       setNotices(res.data);
//     } catch (err) {
//       console.log("Error fetching notices:",err);
//     }
//   };

//   const deleteNotice = async (id) => {
//     try {
//       await api.delete(`/api/notices/${id}`);
//       fetchNotices();
//     } catch (err) {
//       console.log("error deleting notices:",err);
//     }
//   };

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   return (
//     <div>
//       <h2>Professor Dashboard</h2>
//       <AddNoticeForm onNoticeAdded={fetchNotices} />
//       {notices.map((notice) => (
//         <NoticeCard key={notice.id} notice={notice} onDelete={deleteNotice} />
//       ))}
//     </div>
//   );
// }

// export default ProfessorDashboard;



// import React, { useState, useEffect } from 'react';
// import api from '../../services/api';
// import NoticeCard from '../../components/NoticeCard';
// import AddNoticeForm from '../../components/AddNoticeForm';

// function ProfessorDashboard() {
//   const [notices, setNotices] = useState([]);
//   const [departmentId, setDepartmentId] = useState(null); // store professor’s department

//   // 🔽 Fetch user's department on mount (optional if department id is static or stored in token)
//   const fetchUserProfile = async () => {
//     try {
//       const res = await api.get('/api/users/me'); // create this endpoint if not available
//       setDepartmentId(res.data.department.id);
//     } catch (err) {
//       console.error("Error fetching user profile:", err);
//     }
//   };

//   const fetchNotices = async () => {
//     try {
//       const res = await api.get('/api/notice/department');
//       setNotices(res.data);
//     } catch (err) {
//       console.log("Error fetching notices:", err);
//     }
//   };

//   const deleteNotice = async (id) => {
//     try {
//       await api.delete(`/api/notice/${id}`);
//       fetchNotices();
//     } catch (err) {
//       console.log("Error deleting notice:", err);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile(); // get department
//     fetchNotices();
//   }, []);

//   return (
//     <div>
//       <h2>Professor Dashboard</h2>

//       {/* 🧾 AddNoticeForm will use departmentId to post */}
//       <AddNoticeForm
//         departmentId={departmentId}
//         onNoticeAdded={fetchNotices}
//       />

//       {notices.map((notice) => (
//         <NoticeCard key={notice.id} notice={notice} onDelete={deleteNotice} />
//       ))}
//     </div>
//   );
// }

// export default ProfessorDashboardNew;



import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import NoticeCard from '../../components/NoticeCard';
import AddNoticeForm from '../../components/AddNoticeForm';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfessorSidebar from "./ProfessorSidebar"; 
import { Outlet } from "react-router-dom";

const ProfessorDashboard = () => {


//  this is my code of professordashboard ***
// function ProfessorDashboard() {
    const [notices, setNotices] = useState([]);
    const [departmentId, setDepartmentId] = useState(null); // store professor’s department
  
    // 🔽 Fetch user's department on mount (optional if department id is static or stored in token)
    const fetchUserProfile = async () => {
      try {
        const res = await api.get('/api/users/me'); // create this endpoint if not available
        setDepartmentId(res.data.department.id);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
  
    const fetchNotices = async () => {
      try {
        const res = await api.get('/api/notice/department');
        setNotices(res.data);
      } catch (err) {
        console.log("Error fetching notices:", err);
      }
    };
  
    const deleteNotice = async (id) => {
      try {
        await api.delete(`/api/notice/${id}`);
        fetchNotices();
      } catch (err) {
        console.log("Error deleting notice:", err);
      }
    };
  
    useEffect(() => {
      fetchUserProfile(); // get department
      fetchNotices();
    }, []);


    //it ends here


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      <ProfessorSidebar /> {/* Sidebar on the left */}
      
      <div className="flex-1 p-5">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-5">
          {/* <h1 className="text-3xl font-bold">Professor Dashboard</h1> */}
          <h1 className="text-3xl font-bold">Welcome to Professor Dashboard    </h1>
          {/* Outlet renders nested route component */}
          <div className="bg-white p-4 rounded shadow">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
                   Logout
          </button>
          </div>


          {/* this my code */}
          <div>
      <h2>Professor Dashboard</h2>

      {/* 🧾 AddNoticeForm will use departmentId to post */}
      <AddNoticeForm
        departmentId={departmentId}
        onNoticeAdded={fetchNotices}
      />

      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} onDelete={deleteNotice} />
      ))}
    </div>

          {/* it ends here */}
          <Outlet />
        </div>

        {/* Dashboard Content (e.g., forms, list) goes here... */}
      </div>
    </div>
  );
};

// export default ProfessorDashboardNew;
