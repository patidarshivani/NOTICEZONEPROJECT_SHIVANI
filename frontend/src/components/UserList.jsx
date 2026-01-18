import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';

function UserList() {
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState('PROFESSOR'); // Default to show professors

    useEffect(() => {
        UserService.getUsersByRole(role)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, [role]);

    return (
        <div>
            <h2>Manage Users</h2>
            <select onChange={e => setRole(e.target.value)} value={role}>
                <option value="PROFESSOR">Professors</option>
                <option value="STUDENT">Students</option>
                <option value="HOD">HODs</option>
                <option value="ADMIN">Admins</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>{user.department ? user.department.name : 'N/A'}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function deleteUser(id) {
    UserService.deleteUser(id)
        .then(() => {
            alert('User deleted successfully');
            window.location.reload();
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
}

export default UserList;