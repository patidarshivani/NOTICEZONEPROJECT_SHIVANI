import React from 'react';
import { useEffect } from 'react';

const Dashboard = () => {
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role === 'STUDENT') window.location.href = '/notices';
    else if (role === 'PROFESSOR' || role === 'HOD') window.location.href = '/add-notice';
    else if (role === 'ADMIN') window.location.href = '/admin';
  }, [role]);

  return <div>Redirecting...</div>;
};

export default Dashboard;