import React from 'react';
import { Link } from 'react-router-dom';

const StudentSidebar = () => {
  return (
    <div className="w-60 bg-gray-800 text-white p-5 min-h-screen">
      <ul className="space-y-2">
        <li>
          <Link to="/" className="block p-2 hover:bg-gray-700 rounded">Home</Link>
        </li>
        <li>
          <Link to="/student-dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
        </li>
        { <li>
          <Link to="/viewNotice" className="block p-2 hover:bg-gray-700 rounded">AdminNotice</Link>
        </li> }
        <li>
          <Link to="/student-dashboard" className="block p-2 hover:bg-gray-700 rounded">DepartmentNotice</Link>
        </li>
        <li>
          <Link to="/hostel" className="block p-2 hover:bg-gray-700 rounded">Hostel</Link>
        </li>
        <li>
          <Link to="/extracurricular" className="block p-2 hover:bg-gray-700 rounded">Extracurricular Activities</Link>
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar;
