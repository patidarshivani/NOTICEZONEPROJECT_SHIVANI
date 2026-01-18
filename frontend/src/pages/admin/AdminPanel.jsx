import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users/all').then(res => setUsers(res.data));
  }, []);

  const handleDelete = (id) => {
    api.delete(`/users/${id}`).then(() => {
      setUsers(users.filter(user => user.id !== id));
    });
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.role})
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;