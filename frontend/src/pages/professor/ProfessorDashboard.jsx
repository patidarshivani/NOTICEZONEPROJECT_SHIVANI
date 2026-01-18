


import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import api from '../../services/api';
import NoticeCard from '../../components/NoticeCard';
import AddNoticeForm from '../../components/AddNoticeForm';
import ProfessorSidebar from "./ProfessorSidebar";

  const ProfessorDashboard = () => {
  const [notices, setNotices] = useState([]);
  const[message, setMessage] = useState("");
  const navigate = useNavigate();
  const [adminNotices, setAdminNotices] = useState([]);

useEffect(() => {
  api.get("/api/notice/admin").then(res => setAdminNotices(res.data));
}, []); 

  // 🔽 Fetch department notices (backend decides department)
  const fetchNotices = async () => {
    try {
      const res = await api.get('/api/notice/department');
      setNotices(res.data);
    } catch (err) {
      console.error("Error fetching notices:", err);
    }
  };

  // 🔽 Delete notice
  const deleteNotice = async (id) => {
    try {
      await api.delete(`/api/notice/${id}`);

      // ✅ success message
      setMessage("Notice deleted successfully");

      fetchNotices();

      // ✅ auto-hide message after 3 seconds
      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      console.error(err);
      setMessage("Failed to delete notice");
      setTimeout(() => setMessage(""), 3000);
    }
  };
  // const deleteNotice = async (id) => {
  //   try {
  //     await api.delete(`/api/notice/${id}`);
  //     fetchNotices();
  //   } catch (err) {
  //     console.error("Error deleting notice:", err);
  //   }
  // };

  // 🔁 Fetch on mount
  useEffect(() => {
    fetchNotices();
  }, []);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };


  const handleNoticeAdded = () => {
  setMessage("Notice added successfully");
  fetchNotices();
  setTimeout(() => setMessage(""), 3000);
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      <ProfessorSidebar />

      <div className="flex-1 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">
            Professor Dashboard
          </h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <Outlet />

        {/* Add Notice */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Notice</h2>
          <AddNoticeForm onNoticeAdded={handleNoticeAdded} />
         
        </div>


{message && (
  <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-300">
    {message}
  </div>
)}
        {/* Notice List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Department Notices
          </h2>

          {notices.length === 0 ? (
            <p className="text-gray-500">No notices available.</p>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <NoticeCard
                  key={notice.id}
                  notice={notice}
                  onDelete={deleteNotice}
                />
              ))}
            </div>
          )}
        </div>
         <h2 className="text-xl font-semibold mb-4">🔔 Admin Announcements</h2>

        <div className="space-y-3 mb-8">
         {adminNotices.map(n => (
          <NoticeCard key={n.id} notice={n} />
         ))}
        </div>

      </div>
    </div>
  );
};

export default ProfessorDashboard;


//commented on 9-01-2026

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { Outlet } from "react-router-dom";

// import api from '../../services/api';
// import NoticeCard from '../../components/NoticeCard';
// import AddNoticeForm from '../../components/AddNoticeForm';
// import ProfessorSidebar from "./ProfessorSidebar";

// const ProfessorDashboard = () => {
//   const [notice, setNotice] = useState([]);
//   const [departmentId, setDepartmentId] = useState(null);
//   const navigate = useNavigate();

//   // 🔽 Fetch current professor's department
//   const fetchUserProfile = async () => {
//     try {
//       const res = await api.get('/api/users/me');
//       setDepartmentId(res.data.department.id);
//     } catch (err) {
//       console.error("Error fetching user profile:", err);
//     }
//   };

//   // 🔽 Fetch department-specific notices
//   const fetchNotice = async () => {
//     try {
//       const res = await api.get('/api/notice/department');
//       setNotice(res.data);
//     } catch (err) {
//       console.log("Error fetching notices:", err);
//     }
//   };

//   // 🔽 Delete a notice
//   const deleteNotice = async (id) => {
//     try {
//       await api.delete(`/api/notice/${id}`);
//       fetchNotice();
//     } catch (err) {
//       console.log("Error deleting notice:", err);
//     }
//   };

//   // 🔁 Fetch data on mount
//   useEffect(() => {
//     fetchUserProfile();
//     fetchNotice();
//   }, []);

//   // 🚪 Logout logic
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <ProfessorSidebar />

//       {/* Main Content Area */}
//       <div className="flex-1 p-6">
        
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-blue-800">Welcome to Professor Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Nested route rendering (if using react-router-dom nested routes) */}
//         <Outlet />

//         {/* Add Notice Section */}
//         <div className="bg-white p-6 rounded-xl shadow mb-8">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Notice</h2>
//           <AddNoticeForm departmentId={departmentId} onNoticeAdded={fetchNotice} />
//         </div>

//         {/* Notices List */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Department Notices</h2>
//           {notice.length === 0 ? (
//             <p className="text-gray-500">No notices available.</p>
//           ) : (
//             <div className="space-y-4">
//               {notice.map((notice) => (
//                 <NoticeCard key={notice.id} notice={notice} onDelete={deleteNotice} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfessorDashboard;








// import React, { useState, useEffect } from 'react';
// import api from '../../services/api';
// import NoticeCard from '../../components/NoticeCard';
// import AddNoticeForm from '../../components/AddNoticeForm';

// // import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ProfessorSidebar from "./ProfessorSidebar"; 
// import { Outlet } from "react-router-dom";

// const ProfessorDashboard = () => {


// //  this is my code of professordashboard ***
// // function ProfessorDashboard() {
//     const [notices, setNotices] = useState([]);
//     const [departmentId, setDepartmentId] = useState(null); // store professor’s department
  
//     // 🔽 Fetch user's department on mount (optional if department id is static or stored in token)
//     const fetchUserProfile = async () => {
//       try {
//         const res = await api.get('/api/users/me'); // create this endpoint if not available
//         setDepartmentId(res.data.department.id);
//       } catch (err) {
//         console.error("Error fetching user profile:", err);
//       }
//     };
  
//     const fetchNotices = async () => {
//       try {
//         const res = await api.get('/api/notice/department');
//         setNotices(res.data);
//       } catch (err) {
//         console.log("Error fetching notices:", err);
//       }
//     };
  
//     const deleteNotice = async (id) => {
//       try {
//         await api.delete(`/api/notice/${id}`);
//         fetchNotices();
//       } catch (err) {
//         console.log("Error deleting notice:", err);
//       }
//     };
  
//     useEffect(() => {
//       fetchUserProfile(); // get department
//       fetchNotices();
//     }, []);


//     //it ends here


//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   return (
//     <div className="flex min-h-screen">
//       <ProfessorSidebar /> {/* Sidebar on the left */}
      
//       <div className="flex-1 p-5">
//         {/* Header with Logout */}
//         <div className="flex justify-between items-center mb-5">
//           {/* <h1 className="text-3xl font-bold">Professor Dashboard</h1> */}
//           <h1 className="text-3xl font-bold">Welcome to Professor Dashboard    </h1>
//           {/* Outlet renders nested route component */}
//           <div className="bg-white p-4 rounded shadow">
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//                    Logout
//           </button>
//           </div>


// <Outlet />
// </div>

// {/* Dashboard Content (e.g., forms, list) goes here... */}
// </div>
//           {/* this my code */}
//           <div>
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

//           {/* it ends here */}
//     </div>
//   );
// };

// export default ProfessorDashboard;





// //this is pallavi's code


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ProfessorSidebar from "./ProfessorSidebar"; 
// import { Outlet } from "react-router-dom";

// const ProfessorDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };

//   return (
//     <div className="flex min-h-screen">
//       <ProfessorSidebar /> {/* Sidebar on the left */}
      
//       <div className="flex-1 p-5">
//         {/* Header with Logout */}
//         <div className="flex justify-between items-center mb-5">
//           {/* <h1 className="text-3xl font-bold">Professor Dashboard</h1> */}
//           <h1 className="text-3xl font-bold">Welcome to Professor Dashboard    </h1>
//           {/* Outlet renders nested route component */}
//           <div className="bg-white p-4 rounded shadow">
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//                    Logout
//           </button>
//           </div>
//           <Outlet />
//         </div>

//         {/* Dashboard Content (e.g., forms, list) goes here... */}
//       </div>
//     </div>
//   );
// };

// export default ProfessorDashboard;