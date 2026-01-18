import React from 'react';
import { Link } from 'react-router-dom';

const ProfessorSidebar = () => {
  return (
    <div className="w-60 bg-gray-800 text-white p-5">
      <ul>
        <li>
          <Link to="/" className="block p-2">Home</Link>
        </li>
        <li>
          <Link to="/professor-dashboard" className="block p-2">Dashboard</Link>
        </li>
        <li>
          <Link to="/professor-dashboard" className="block p-2">Add Notices</Link>
        </li>
        <li>
          <Link to="/professor-dashboard" className="block p-2">Assignment Notices</Link>
        </li>
        { <li>
          <Link to="/viewNotice" className="block p-2 hover:bg-gray-700 rounded">AdminNotice</Link>
        </li> }
        <li>
          <Link to="/department" className="block p-2 hover:bg-gray-700 rounded">DepartmentNotice</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfessorSidebar;
