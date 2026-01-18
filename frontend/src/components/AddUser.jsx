import React, { useState } from 'react';
import UserService from '../services/UserService';

function AddUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT'); // Default to student
    const [departmentId, setDepartmentId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username,
            password,
            role,
            department: { id: departmentId }, // If role is professor or HOD, add department
        };

        UserService.registerUser(newUser)
            .then(response => {
                alert('User registered successfully');
                setUsername('');
                setPassword('');
                setRole('STUDENT');
                setDepartmentId('');
            })
            .catch(error => {
                console.error('Error registering user:', error);
            });
    };

    return (
        <div>
            <h2>Register New User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="STUDENT">Student</option>
                        <option value="PROFESSOR">Professor</option>
                        <option value="HOD">HOD</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                {role === 'PROFESSOR' || role === 'HOD' ? (
                    <div>
                        <label>Department ID</label>
                        <input
                            type="text"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                            required
                        />
                    </div>
                ) : null}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default AddUser;