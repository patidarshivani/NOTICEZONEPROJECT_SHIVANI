// import React, { useState, useEffect } from 'react';
// import api from '../../services/api';
// import NoticeCard from '../../components/NoticeCard';
// import { HiOutlineSpeakerphone } from 'react-icons/hi';

// function StudentDashboard() {
//   const [notices, setNotices] = useState([]);

//   const fetchNotices = async () => {
//     try {
//       const res = await api.get('/api/notice/student');
//       setNotices(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
//         <div className="flex items-center gap-3 mb-6 border-b pb-3 border-gray-200">
//           <HiOutlineSpeakerphone className="text-3xl text-blue-500" />
//           <h2 className="text-2xl font-bold text-gray-700">Student Dashboard</h2>
//         </div>

//         {notices.length === 0 ? (
//           <p className="text-gray-500 text-center">No notices available.</p>
//         ) : (
//           <div className="space-y-4">
//             {notices.map((notice) => (
//               <NoticeCard key={notice.id} notice={notice} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default StudentDashboard;



import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import NoticeCard from '../../components/NoticeCard';
import { HiOutlineSpeakerphone } from 'react-icons/hi';

// import React from 'react';
import StudentSidebar from './StudentSidebar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {

//this is my studentdashboard code
const [notices, setNotices] = useState([]);

const fetchNotices = async () => {
  try {
    const res = await api.get('/api/notice/student');
    setNotices(res.data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  fetchNotices();
}, []);



  const location = useLocation();
  const navigate = useNavigate();

  const isDashboardHome =
    location.pathname === "/student-dashboard" ||
    location.pathname === "/student-dashboard/dashboard";

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // or sessionStorage.removeItem("token");
    navigate("/"); // or navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 relative">
       {/* this my dashboardcode */}
       <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6 border-b pb-3 border-gray-200">
          <HiOutlineSpeakerphone className="text-3xl text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-700">Student Dashboard</h2>
        </div>

        {notices.length === 0 ? (
          <p className="text-gray-500 text-center">No notices available.</p>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </div>
        )}
      </div>
    </div>




        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

        {isDashboardHome && (
          <h1 className="text-2xl font-bold mb-4">
            Welcome to Student Dashboard
          </h1>
        )}

        <div className="bg-white p-4 rounded shadow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

