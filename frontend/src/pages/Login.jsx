// // src/pages/Auth/Login.jsx
// import { useState } from 'react';
// import api from '../api/axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [emailOrUsername, setEmailOrUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await api.post('/api/auth/login', {
//         usernameOrEmail: emailOrUsername,
//         password,
//       });

//       const { token, role } = res.data;

//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role);

//       // Redirect based on role
//       if (role === 'STUDENT') navigate('/student/dashboard');
//       else if (role === 'TEACHER') navigate('/teacher/dashboard');
//       else if (role === 'HOD') navigate('/hod/dashboard');
//       else if (role === 'ADMIN') navigate('/admin/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

//         <input
//           type="text"
//           placeholder="Email or Username"
//           className="input input-bordered w-full mb-4"
//           value={emailOrUsername}
//           onChange={(e) => setEmailOrUsername(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="input input-bordered w-full mb-6"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit" className="btn btn-primary w-full">Login</button>

//         <p className="text-sm text-center mt-4">
//           Don't have an account? <a href="/register" className="text-blue-500">Register</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;


// /*import { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom'; // Import Link
// import axios from '../api/axios';
// import { AuthContext } from '../auth/AuthContext';

// export default function Login() {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/auth/login', formData);
//       login(res.data); // {token, username, role}

//       // Redirect by role
//       const { role } = res.data;
//       if (role === 'STUDENT') navigate('/student');
//       else if (role === 'PROFESSOR') navigate('/professor');
//       else if (role === 'HOD') navigate('/hod');
//       else if (role === 'ADMIN') navigate('/admin');
//     } catch (err) {
//       alert('Login failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="username"
//           placeholder="Username or Roll No"
//           onChange={handleChange}
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />
//         <button type="submit">Login</button>
//       </form>

//       <p>
//         Don't have an account? <Link to="/register">Register here</Link>
//       </p>
//     </div>
//   );
// }*/



// /*import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const login = async () => {
//     try {
//       const res = await api.post('/auth/login', { username, password });
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);
//       localStorage.setItem("username", res.data.username);

//       // Redirect based on role
//       if (res.data.role === 'STUDENT') navigate('/student');
//       else if (res.data.role === 'PROFESSOR') navigate('/professor');
//       else if (res.data.role === 'HOD') navigate('/hod');
//       else if (res.data.role === 'ADMIN') navigate('/admin');
//     } catch (err) {
//       alert("Login failed. Check credentials.");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }

// export default Login;*/

// /*import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8080/auth/login", formData);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);
//       localStorage.setItem("username", res.data.username);

//       const role = res.data.role;
//       if (role === "ADMIN") navigate("/admin-dashboard");
//       else if (role === "HOD") navigate("/hod-dashboard");
//       else if (role === "PROFESSOR") navigate("/professor-dashboard");
//       else navigate("/student-dashboard");
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           onChange={handleChange}
//           className="w-full mb-4 p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full mb-4 p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Login
//         </button>

//         {/* Link to Register 
//         <p className="mt-4 text-sm text-center">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Register here
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }*/






// /*import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const Login = () => {
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     if (token && role) {
//       navigateToDashboard(role);
//     }
//   }, []);

//   const navigateToDashboard = (role) => {
//     switch (role) {
//       case "STUDENT":
//         navigate("/student-dashboard");
//         break;
//       case "PROFESSOR":
//         navigate("/professor-dashboard");
//         break;
//       case "HOD":
//         navigate("/hod-dashboard");
//         break;
//       case "ADMIN":
//         navigate("/admin-dashboard");
//         break;
//       default:
//         navigate("/");
//     }
//   };

//   const handleChange = (e) => {
//     setCredentials((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleLogin = async () => {
//     setError("");

//     if (!credentials.username || !credentials.password) {
//       setError("Please enter both username and password.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:8080/auth/login", credentials);

//       if (response.status === 200 && response.data.token) {
//         const token = response.data.token;
//         const decoded = jwtDecode(token);

//         localStorage.setItem("token", token);
//         localStorage.setItem("role", decoded.role);
//         localStorage.setItem("username", decoded.sub);

//         navigateToDashboard(decoded.role);
//       } else {
//         setError("Invalid response from server.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={credentials.username}
//           onChange={handleChange}
//           className="block w-full p-2 border border-gray-300 rounded mb-4"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={credentials.password}
//           onChange={handleChange}
//           className="block w-full p-2 border border-gray-300 rounded mb-4"
//         />

//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className={`w-full py-2 rounded text-white ${
//             loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-center text-sm mt-4">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-blue-500">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;*/

//******this is working login page just userinterface is not good */

// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../api/axios';
// import { AuthContext } from '../auth/AuthContext';

// export default function Login() {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/auth/login', formData);
//       login(res.data); // {token, username, role}

//       // Redirect by role
//       const { role } = res.data;
//       if (role === 'STUDENT') navigate('/student-dashboard');
//       else if (role === 'PROFESSOR') navigate('/professor-dashboard');
//       else if (role === 'HOD') navigate('/hod-dashboard');
//       else if (role === 'ADMIN') navigate('/admin-dashboard');
//     } catch (err) {
//       alert('Login failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="username" placeholder="Username or Roll No" onChange={handleChange} />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} />
//         <button type="submit">Login</button>

//         <p className="text-sm text-center mt-4">
//           Don't have an account? <a href="/register" className="text-blue-500">Register</a>
//          </p>
//       </form>
//     </div>
//   );
// }



import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../auth/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      login(res.data); // {token, username, role}

      const { role } = res.data;
      if (role === 'STUDENT') navigate('/student-dashboard');
      else if (role === 'PROFESSOR') navigate('/professor-dashboard');
      else if (role === 'HOD') navigate('/hod-dashboard');
      else if (role === 'ADMIN') navigate('/admin-dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 via-blue-500 to-blue-500">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Username or Roll No</label>
            <input
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}

 