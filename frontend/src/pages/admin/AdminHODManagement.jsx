import React, { useState, useEffect } from "react";

const departments = [
  "Information Technology",
  "Computer Science Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Physics Department",
];

const AdminHODManagement = () => {
  const [hodList, setHodList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    department: "",
    email: "",
    mobile: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false); // New state for toggling the form

  useEffect(() => {
    const initialData = [
      {
        id: 1,
        name: "Dr. Neha Verma",
        department: "Information Technology",
        email: "nverma@jec.ac.in",
        mobile: "9876543210",
      },
      {
        id: 2,
        name: "Dr. A. Tiwari",
        department: "Civil Engineering",
        email: "atiwari@jec.ac.in",
        mobile: "9123456789",
      },
    ];
    setHodList(initialData);
  }, []);

  const validateForm = () => {
    const { name, department, email, mobile } = form;
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) newErrors.name = "Name is required";
    if (!department) newErrors.department = "Select a department";
    if (!email || !emailRegex.test(email)) newErrors.email = "Invalid email";
    if (!/^\d{10}$/.test(mobile)) newErrors.mobile = "Enter valid 10-digit mobile";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const handleAddOrUpdate = () => {
    if (!validateForm()) return;

    if (editingId !== null) {
      setHodList((prev) =>
        prev.map((h) => (h.id === editingId ? { ...h, ...form } : h))
      );
      setEditingId(null);
    } else {
      const newHOD = {
        id: Date.now(),
        ...form,
      };
      setHodList((prev) => [...prev, newHOD]);
    }

    setForm({ name: "", department: "", email: "", mobile: "" });
    setErrors({});
    setShowForm(false); // Hide form after submit
  };

  const handleEdit = (hod) => {
    setForm(hod);
    setEditingId(hod.id);
    setShowForm(true); // Show form when editing
  };

  const handleDelete = (id) => {
    setHodList((prev) => prev.filter((h) => h.id !== id));
  };

  const filteredHods = hodList.filter(
    (hod) =>
      hod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hod.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow rounded-xl max-w-6xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">HOD Management</h2>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or department"
          className="w-2/3 p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => {
            setForm({ name: "", department: "", email: "", mobile: "" });
            setEditingId(null);
            setShowForm(true); // Show form when adding new HOD
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add HOD
        </button>
      </div>

      {/* HOD Form */}
      {showForm && (
        <div className="bg-gray-50 p-4 rounded-xl shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? "Edit HOD" : "Add HOD"}
          </h3>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="HOD Name"
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
              <label className="block text-sm font-medium mb-1">Mobile Number</label>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Mobile"
              />
              {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
            </div>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddOrUpdate}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {editingId ? "Update HOD" : "Add HOD"}
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

      {/* HOD Table */}
      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Department</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Mobile</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHods.length > 0 ? (
            filteredHods.map((hod) => (
              <tr key={hod.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{hod.name}</td>
                <td className="border px-4 py-2">{hod.department}</td>
                <td className="border px-4 py-2">{hod.email}</td>
                <td className="border px-4 py-2">{hod.mobile}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(hod)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hod.id)}
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

export default AdminHODManagement;    