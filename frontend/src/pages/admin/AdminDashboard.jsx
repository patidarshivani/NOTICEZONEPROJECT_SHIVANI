import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-5 relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-5 right-5 bg-red-600 text-white px-4 py-2 rounded shadow-md hover:bg-red-700 transition"
        >
          Logout
        </button>

        {/* Admin Dashboard Home Content */}
        <div className="mt-16">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Admin Dashboard</h1>
          <p className="text-lg text-gray-600 mb-10">Manage everything from here!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className="bg-blue-100 p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/admin/notices")}
            >
              <h2 className="text-xl font-semibold mb-2">Hostel Notices</h2>
              <p className="text-gray-700">Add, edit, or delete hostel-related notices and updates.</p>
            </div>

            <div
              className="bg-green-100 p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/admin/extra-curricular")}
            >
              <h2 className="text-xl font-semibold mb-2">Extracurricular Notices</h2>
              <p className="text-gray-700">Post updates about events, clubs, and other activities.</p>
            </div>

            <div
              className="bg-yellow-100 p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/admin/notices")}
            >
              <h2 className="text-xl font-semibold mb-2">Scholarship Notices</h2>
              <p className="text-gray-700">Manage scholarship information and application deadlines.</p>
            </div>

            <div
              className="bg-purple-100 p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/admin/notices")}
            >
              <h2 className="text-xl font-semibold mb-2">Exam Notices</h2>
              <p className="text-gray-700">Create and update exam schedules or related circulars.</p>
            </div>

            <div
              className="bg-pink-100 p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/faculty-manage")}
            >
              <h2 className="text-xl font-semibold mb-2">Faculty Management</h2>
              <p className="text-gray-700">Add, edit, or remove faculty records and roles.</p>
            </div>

            <div
              className="bg-red-100 p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate("/users")}
            >
              <h2 className="text-xl font-semibold mb-2">System Users</h2>
              <p className="text-gray-700">View and manage admin, HOD, teacher, and student accounts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;





/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-5">
        {/* Logout Button 
        <button
          onClick={handleLogout}
          className="absolute top-5 right-5 bg-red-600 text-white px-4 py-2 rounded shadow-md hover:bg-red-700 transition"
        >
          Logout
        </button>


        {/* Admin Dashboard Home Content 
        <div className="mt-16">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Admin Dashboard</h1>
          <p className="text-lg text-gray-600 mb-10">Manage everything from here!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Hostel Notices</h2>
              <p className="text-gray-700">Add, edit, or delete hostel-related notices and updates.</p>
            </div>

            <div className="bg-green-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Extracurricular Notices</h2>
              <p className="text-gray-700">Post updates about events, clubs, and other activities.</p>
            </div>

            <div className="bg-yellow-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Scholarship Notices</h2>
              <p className="text-gray-700">Manage scholarship information and application deadlines.</p>
            </div>

            <div className="bg-purple-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Exam Notices</h2>
              <p className="text-gray-700">Create and update exam schedules or related circulars.</p>
            </div>

            <div className="bg-pink-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Faculty Management</h2>
              <p className="text-gray-700">Add, edit, or remove faculty records and roles.</p>
            </div>

            {/*<div className="bg-red-100 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">System Users</h2>
              <p className="text-gray-700">View and manage admin, HOD, teacher, and student accounts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; */