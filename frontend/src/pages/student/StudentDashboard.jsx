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
       {/* this my dashboardcode
       <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-8">
  <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl px-8 py-10">
    <div className="flex items-center gap-4 mb-8 border-b pb-4 border-gray-300">
      <HiOutlineSpeakerphone className="text-4xl text-indigo-600" />
      <h2 className="text-3xl font-semibold text-gray-800 tracking-wide">
        Department Notices 
      </h2>
    </div>

    {notices.length === 0 ? (
      <p className="text-center text-lg text-gray-500">No notices available.</p>
    ) : (
      <div className="grid gap-6">
        {notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>
    )}
  </div>
</div> */}




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
         
               {/* Main Content */}
      <div className="flex-1 p-6 relative">
       {/* this my dashboardcode */}
       <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-8">
  <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl px-8 py-10">
    <div className="flex items-center gap-4 mb-8 border-b pb-4 border-gray-300">
      <HiOutlineSpeakerphone className="text-4xl text-indigo-600" />
      <h2 className="text-3xl font-semibold text-gray-800 tracking-wide">
        Department Notices 
      </h2>
    </div>

    {notices.length === 0 ? (
      <p className="text-center text-lg text-gray-500">No notices available.</p>
    ) : (
      <div className="grid gap-6">
        {notices.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>
    )}
  </div>
</div>
               

          <Outlet />
        </div>
      </div>
    </div>
    </div>
  );
};

export default StudentDashboard;





//this is pallavi's studentdashboard
// import React from 'react';
// import StudentSidebar from './StudentSidebar';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// const StudentDashboard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isDashboardHome =
//     location.pathname === "/student-dashboard" ||
//     location.pathname === "/student-dashboard/dashboard";

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("token"); // or sessionStorage.removeItem("token");
//     navigate("/"); // or navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <StudentSidebar />

//       {/* Main Content */}
//       <div className="flex-1 p-6 relative">
//         {/* Logout button */}
//         <button
//           onClick={handleLogout}
//           className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>

//         {isDashboardHome && (
//           <h1 className="text-2xl font-bold mb-4">
//             Welcome to Student Dashboard
//           </h1>
//         )}

//         <div className="bg-white p-4 rounded shadow">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

/*import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import NoticeCard from '../../components/NoticeCard';

function StudentDashboard() {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const res = await api.get('/api/notices');
      setNotices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div>
      <h2>Student Dashboard</h2>
      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} />
      ))}
    </div>
  );
}

export default StudentDashboard;*/
