// src/pages/Unauthorized.jsx
import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-red-600">403 - Unauthorized</h1>
      <p className="text-lg mt-4">You do not have permission to access this page.</p>
    </div>
  );
};

export default Unauthorized;
