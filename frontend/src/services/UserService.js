import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

class UserService {
    // Register new user (admin can create users)
    registerUser(user) {
        return axios.post(`${API_URL}/register`, user);
    }

    // Get users by role (professors, students, etc.)
    getUsersByRole(role) {
        return axios.get(`${API_URL}/role/${role}`);
    }

    // Delete user by ID
    deleteUser(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new UserService();
