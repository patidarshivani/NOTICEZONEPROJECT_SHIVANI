import React from 'react';
import { Navigate } from 'react-router-dom';

// 🔐 This component checks if user has required role before allowing access
const ProtectedRoute = ({ role, children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token || userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;


/* src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

const ProtectedRoute = ({ allowedRoles, children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;

  const role = getUserRole();
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;*/