import { useState } from 'react';
import api from "../api/axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
    departmentId: null,
    rollNumber: '',
    classSection: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value;

    // 🔥 Convert departmentId to number
    if (e.target.name === 'departmentId') {
      value = Number(value);
    }

    setForm({ ...form, [e.target.name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // 🔥 Build request exactly as backend expects
    const payload = {
      username: form.username,
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      departmentId: form.departmentId,
    };

    // Only send student fields if role = STUDENT
    if (form.role === 'STUDENT') {
      payload.rollNumber = form.rollNumber;
      payload.classSection = form.classSection;
    }

    try {
      await api.post('/api/auth/register', payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 via-blue-500 to-blue-500">
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="departmentId"
          placeholder="Department ID"
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          required
        />

        {form.role === 'STUDENT' && (
          <>
            <input
              type="text"
              name="rollNumber"
              placeholder="Roll Number"
              className="input input-bordered w-full mb-4"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="classSection"
              placeholder="Class Section"
              className="input input-bordered w-full mb-4"
              onChange={handleChange}
              required
            />
          </>
        )}

        <select
          name="role"
          className="select select-bordered w-full mb-6"
          onChange={handleChange}
          value={form.role}
        >
          <option value="STUDENT">Student</option>
          <option value="PROFESSOR">Professor</option>
          <option value="HOD">HOD</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit" className="btn btn-primary w-full">Register</button>

        <p className="text-sm text-center mt-4">
          Already have an account? <a href="/" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;

//commented on 8-01-2026

//this is updated Register.jsx by shivani based on authcontroller
// import { useState } from 'react';
// import api from "../api/axios";
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [form, setForm] = useState({
//     username: '',
//     name: '',
//     email: '',
//     password: '',
//     role: 'STUDENT',
//     departmentId: '',
//     rollNumber: '',
//     classSection: '',
//   });

//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await api.post('/api/auth/register', form);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 via-blue-500 to-blue-500">
//       <form onSubmit={handleRegister} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

//         {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="input input-bordered w-full mb-4"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           className="input input-bordered w-full mb-4"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="input input-bordered w-full mb-4"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="input input-bordered w-full mb-4"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="departmentId"
//           placeholder="Department ID"
//           className="input input-bordered w-full mb-4"
//           onChange={handleChange}
//           required
//         />

//         {form.role === 'STUDENT' && (
//           <>
//             <input
//               type="text"
//               name="rollNumber"
//               placeholder="Roll Number"
//               className="input input-bordered w-full mb-4"
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="classSection"
//               placeholder="Class Section"
//               className="input input-bordered w-full mb-4"
//               onChange={handleChange}
//               required
//             />
//           </>
//         )}

//         <select
//           name="role"
//           className="select select-bordered w-full mb-6"
//           onChange={handleChange}
//           value={form.role}
//         >
//           <option value="STUDENT">Student</option>
//           <option value="TEACHER">Teacher</option>
//           <option value="HOD">HOD</option>
//           <option value="ADMIN">Admin</option>
//         </select>

//         <button type="submit" className="btn btn-primary w-full">Register</button>

//         <p className="text-sm text-center mt-4">
//           Already have an account? <a href="/" className="text-blue-500">Login</a>
//         </p>
//       </form>
      
//     </div>
//   );
// };

// export default Register;







// src/pages/Auth/Register.jsx
// import { useState } from 'react';
// import api from "../api/axios";
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//     department: '',
//     role: 'STUDENT',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await api.post('/api/auth/register', form);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form onSubmit={handleRegister} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

//         {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="input input-bordered w-full mb-4"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="input input-bordered w-full mb-4"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="input input-bordered w-full mb-4"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="department"
//           placeholder="Department"
//           className="input input-bordered w-full mb-4"
//           onChange={handleChange}
//         />
//         <select
//           name="role"
//           className="select select-bordered w-full mb-6"
//           onChange={handleChange}
//           value={form.role}
//         >
//           <option value="STUDENT">Student</option>
//           <option value="TEACHER">Teacher</option>
//           <option value="HOD">HOD</option>
//           <option value="ADMIN">Admin</option>
//         </select>

//         <button type="submit" className="btn btn-primary w-full">Register</button>

//         <p className="text-sm text-center mt-4">
//           Already have an account? <a href="/" className="text-blue-500">Login</a>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;





/*import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [role, setRole] = useState('STUDENT');
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({}); // reset form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let endpoint = '';
      if (role === 'STUDENT') endpoint = '/api/auth/register/student';
      if (role === 'PROFESSOR') endpoint = '/api/auth/register/professor';
      if (role === 'HOD') endpoint = '/api/auth/register/hod';

      await axios.post(endpoint, formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register as</h2>
      <select onChange={handleRoleChange} value={role}>
        <option value="STUDENT">Student</option>
        <option value="PROFESSOR">Professor</option>
        <option value="HOD">HOD</option>
      </select>

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username / Roll No" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        {/* Student-only fields 
        {role === 'STUDENT' && (
          <>
            <input name="department" placeholder="Department" onChange={handleChange} />
            <input name="section" placeholder="Section" onChange={handleChange} />
            <input name="rollNumber" placeholder="Roll Number" onChange={handleChange} />
          </>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}*/


/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("STUDENT");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department_id: "",
    class_section: "",
    rollNo: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      navigateToDashboard(role);
    }
  }, []);

  const navigateToDashboard = (role) => {
    switch (role) {
      case "STUDENT":
        navigate("/student-dashboard");
        break;
      case "PROFESSOR":
        navigate("/professor-dashboard");
        break;
      case "HOD":
        navigate("/hod-dashboard");
        break;
      case "ADMIN":
        navigate("/admin-dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    setError("");

    if (!formData.name || !formData.email || !formData.username || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (role === "STUDENT" && (!formData.class_section || !formData.rollNo || !formData.department_id)) {
      setError("Student must provide department ID, class section, and roll number.");
      return;
    }

    if ((role === "PROFESSOR" || role === "HOD") && !formData.department_id) {
      setError(`${role} must provide department ID.`);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      username: formData.username.trim(),
      password: formData.password.trim(),
      role,
    };

    if (role === "STUDENT") {
      payload.class_section = formData.class_section.trim();
      payload.rollNo = formData.rollNo.trim();
      payload.department_id = formData.department_id.trim();
    } else if (role === "PROFESSOR" || role === "HOD") {
      payload.department_id = formData.department_id.trim();
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/register", payload);
      if (response.status === 200 || response.status === 201) {
        navigate("/login");
      } else {
        setError("Register failed. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Register failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="STUDENT">Student</option>
          <option value="PROFESSOR">Professor</option>
          <option value="HOD">HOD</option>
          <option value="ADMIN">Admin</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />

        {(role === "PROFESSOR" || role === "HOD" || role === "STUDENT") && (
          <input
            type="text"
            name="department_id"
            placeholder="Department ID"
            value={formData.department_id}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded mb-4"
          />
        )}

        {role === "STUDENT" && (
          <>
            <input
              type="text"
              name="class_section"
              placeholder="Class Section"
              value={formData.class_section}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              value={formData.rollNo}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
          </>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Signing up..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;*/







/*import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState("STUDENT");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    departmentId: "",
    class_section: "",
    rollNo: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) navigateToDashboard(role);
  }, []);

  const navigateToDashboard = (role) => {
    switch (role) {
      case "STUDENT": navigate("/student-dashboard"); break;
      case "PROFESSOR": navigate("/professor-dashboard"); break;
      case "HOD": navigate("/hod-dashboard"); break;
      case "ADMIN": navigate("/admin-dashboard"); break;
      default: navigate("/");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    setError("");

    if (!formData.name || !formData.email || !formData.username || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (role === "STUDENT" && (!formData.departmentId || !formData.class_section || !formData.rollNo)) {
      setError("Student must provide department ID, class section, and roll number.");
      return;
    }

    if ((role === "PROFESSOR" || role === "HOD") && !formData.departmentId) {
      setError(`${role} must provide department ID.`);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      username: formData.username.trim(),
      password: formData.password.trim(),
      role,
    };

    if (role === "STUDENT") {
      payload.departmentId = formData.departmentId.trim();
      payload.class_section = formData.class_section.trim();
      payload.rollNo = formData.rollNo.trim();
    } else if (role === "PROFESSOR" || role === "HOD") {
      payload.departmentId = formData.departmentId.trim();
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/auth/register", payload);
      if (response.status === 200 || response.status === 201) {
        navigate("/login");
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="STUDENT">Student</option>
          <option value="PROFESSOR">Professor</option>
          <option value="HOD">HOD</option>
          <option value="ADMIN">Admin</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />

        {(role === "STUDENT" || role === "PROFESSOR" || role === "HOD") && (
          <input
            type="text"
            name="departmentId"
            placeholder="Department ID"
            value={formData.departmentId}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded mb-4"
          />
        )}

        {role === "STUDENT" && (
          <>
            <input
              type="text"
              name="class_section"
              placeholder="Class Section"
              value={formData.class_section}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="rollNo"
              placeholder="Roll Number"
              value={formData.rollNo}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded mb-4"
            />
          </>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;*/




/*import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("STUDENT");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    rollNo: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      navigateToDashboard(role);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    setError("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.username || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (role === "STUDENT" && (!formData.department || !formData.rollNo)) {
      setError("Student must provide department and roll number.");
      return;
    }

    if ((role === "TEACHER" || role === "HOD") && !formData.department) {
      setError(`${role} must provide department.`);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      username: formData.username.trim(),
      password: formData.password.trim(),
      role,
    };

    if (role === "STUDENT") {
      payload.department = formData.department.trim();
      payload.rollNo = formData.rollNo.trim();
    } else if (role === "TEACHER" || role === "HOD") {
      payload.department = formData.department.trim();
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/auth/signup", payload);

      if (response.status === 200 || response.status === 201) {
        navigate("/login");
      } else {
        setError("Signup failed. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
          <option value="HOD">HOD</option>
          <option value="ADMIN">Admin</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />

        {(role === "STUDENT" || role === "TEACHER" || role === "HOD") && (
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded mb-4"
          />
        )}

        {role === "STUDENT" && (
          <input
            type="text"
            name="rollNo"
            placeholder="Roll Number"
            value={formData.rollNo}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded mb-4"
          />
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;*/



/*import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role: student
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        username,
        password,
        role, // Role can be student, teacher, hod, or admin
      });

      if (response.status === 200) {
        setSuccess("User Registered Successfully!");
        setTimeout(() => navigate("/login"), 1500); // Redirect to login after success
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup Failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mt-1 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mt-1 mb-4"
        />
        
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mt-1 mb-4"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="hod">HOD</option>
          <option value="admin">Admin</option>
        </select>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Signup
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;*/


/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mt-1 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mt-1 mb-4"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mt-1 mb-4"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="hod">HOD</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button onClick={handleSignup} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;*/


/*import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password) {
      setError("All fields are required.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.username === username)) {
      setError("Username already exists.");
      return;
    }

    users.push({ username, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    setError("");
    setSuccess("Signup successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Select Role:
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mt-1 mb-4"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="hod">HOD</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mt-1 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mt-1 mb-4"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <button
          onClick={handleSignup}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;*/
