import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-60 bg-gray-800 text-white p-5">
      <ul>
        <li>
          <Link to="/admin-dashboard" className="block p-2">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/notices" className="block p-2">Manage Notices</Link>
        </li>
        
        {/* <li>
          <Link to="/add-user" className="block p-2">Add User</Link>
        </li> */}
        {/* <li>
          <Link to="/users" className="block p-2">User List</Link>
        </li> */}
        {/* <li>
          <Link to="/admin-notices" className="block p-2">Notice View</Link>
        </li> */}
        <li>
          <Link to="/admin/hod" className="block p-2">Manage HOD</Link>
        </li>
        <li>
          <Link to="/faculty-manage" className="block p-2">Manage Faculty</Link>
        </li>
        <li>
          <Link to="/admin/student" className="block p-2">Manage Student</Link>
        </li>
        <li>
          <Link to="/hostel" className="block p-2">Hostel</Link>
        </li>
        <li>
          <Link to="/admin/extra-curricular" className="block p-2">Extra-Curricular Activity</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
