import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HODSidebar from "./HODSidebar";

const HODDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      <HODSidebar />
      <div className="flex-1 p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">HOD Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HODDashboard;