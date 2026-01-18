import React from 'react';
import { Link } from 'react-router-dom';

const HODSidebar = () => {
  return (
    <div className="w-60 bg-gray-800 text-white p-5">
      <ul>
        <li>
          <Link to="/hod-dashboard" className="block p-2">Dashboard</Link>
        </li>
        <li>
          <Link to="/hod/createNotice" className="block p-2">Create Department Notice</Link>
        </li>
        <li>
          <Link to="/department-manage" className="block p-2"> Manage Notice</Link>
        </li>
        <li>
          <Link to="/department" className="block p-2">View Department Notices</Link>
        </li>
        <li>
          <Link to="/viewNotice" className="block p-2 hover:bg-gray-700 rounded">AdminNotice</Link>
        </li>
      </ul>
    </div>
  );
};

export default HODSidebar;
