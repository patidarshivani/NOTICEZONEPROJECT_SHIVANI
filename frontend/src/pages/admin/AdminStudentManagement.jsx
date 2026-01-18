import React, { useState, useEffect } from "react";

const departments = [
  "Information Technology",
  "Computer Science Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Physics Department",
];

const AdminStudentManagement = () => {
  const [studentList, setStudentList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    department: "",
    email: "",
    rollNo: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const initialData = [
      {
        id: 1,
        name: "Ankit Sharma",
        department: "Information Technology",
        email: "ankit.it23@jec.ac.in",
        rollNo: "IT2301",
      },
      {
        id: 2,
        name: "Priya Dubey",
        department: "Civil Engineering",
        email: "priya.ce23@jec.ac.in",
        rollNo: "CE2310",
      },
    ];
    setStudentList(initialData);
  }, []);

  const validateForm = () => {
    const { name, department, email, rollNo } = form;
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = "Name is required";
    if (!department) newErrors.department = "Select a department";
    if (!email || !emailRegex.test(email)) newErrors.email = "Invalid email";
    if (!rollNo.trim()) newErrors.rollNo = "Roll No is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleAddOrUpdate = () => {
    if (!validateForm()) return;

    if (editingId !== null) {
      setStudentList((prev) =>
        prev.map((s) => (s.id === editingId ? { ...s, ...form } : s))
      );
      setEditingId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        ...form,
      };
      setStudentList((prev) => [...prev, newStudent]);
    }

    setForm({ name: "", department: "", email: "", rollNo: "" });
    setErrors({});
    setShowForm(false);
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditingId(student.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setStudentList((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredStudents = studentList.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow rounded-xl max-w-6xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Student Management</h2>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name, department or roll no"
          className="w-2/3 p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => {
            setForm({ name: "", department: "", email: "", rollNo: "" });
            setEditingId(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Student
        </button>
      </div>

      {/* Student Form */}
      {showForm && (
        <div className="bg-gray-50 p-4 rounded-xl shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Student" : "Add Student"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Student Name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Department</option>
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm">{errors.department}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Roll No</label>
              <input
                name="rollNo"
                value={form.rollNo}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Roll Number"
              />
              {errors.rollNo && <p className="text-red-500 text-sm">{errors.rollNo}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddOrUpdate}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {editingId ? "Update Student" : "Add Student"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Student Table */}
      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Department</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Roll No</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.department}</td>
                <td className="border px-4 py-2">{student.email}</td>
                <td className="border px-4 py-2">{student.rollNo}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No matching results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudentManagement;
