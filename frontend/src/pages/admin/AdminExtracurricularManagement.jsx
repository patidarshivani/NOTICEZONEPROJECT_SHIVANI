import React, { useState, useEffect } from "react";

const AdminExtracurricularManagement = () => {
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({
    activityName: "",
    description: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Sample data or fetch from backend
    setActivities([
      { id: 1, activityName: "Coding Competition", description: "A coding challenge for students.", date: "2025-05-01" },
      { id: 2, activityName: "Sports Meet", description: "Annual sports event for students.", date: "2025-06-15" },
      { id: 3, activityName: "Cultural Fest", description: "Celebration of arts and culture.", date: "2025-07-20" },
    ]);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.activityName.trim()) newErrors.activityName = "Activity name is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingId !== null) {
      setActivities((prev) =>
        prev.map((activity) => (activity.id === editingId ? { ...activity, ...form } : activity))
      );
      setEditingId(null);
    } else {
      const newActivity = {
        id: Date.now(),
        ...form,
      };
      setActivities((prev) => [...prev, newActivity]);
    }
    setForm({ activityName: "", description: "", date: "" });
  };

  const handleEdit = (activity) => {
    setForm(activity);
    setEditingId(activity.id);
  };

  const handleDelete = (id) => {
    setActivities((prev) => prev.filter((activity) => activity.id !== id));
  };

  const filteredActivities = activities.filter((activity) =>
    activity.activityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Extracurricular Activity Management</h2>

      <input
        type="text"
        placeholder="Search by activity name"
        className="w-full p-2 mb-4 border rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Activity Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          name="activityName"
          value={form.activityName}
          onChange={handleChange}
          placeholder="e.g. Coding Competition"
        />
        {errors.activityName && <p className="text-red-500 text-sm">{errors.activityName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="e.g. A competitive coding event for all students."
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mb-6"
      >
        {editingId ? "Update Activity" : "Add Activity"}
      </button>

      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Activity Name</th>
            <th className="border px-4 py-2 text-left">Description</th>
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{activity.activityName}</td>
                <td className="border px-4 py-2">{activity.description}</td>
                <td className="border px-4 py-2">{activity.date}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(activity)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No activities found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminExtracurricularManagement;
