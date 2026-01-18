import React, { useState } from "react";

const ProfessorNotice = () => {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "",
    category: "",
    file: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [subjectFilter, setSubjectFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const subjects = ["DBMS", "Network Management", "IoT", "Computer Science"];
  const categories = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.subject) newErrors.subject = "Subject is required";
    if (!form.category) newErrors.category = "Class is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newNotice = {
      id: editingId || Date.now(),
      ...form,
      createdDate: new Date().toLocaleDateString(),
    };

    setNotices((prev) =>
      editingId ? prev.map((n) => (n.id === editingId ? newNotice : n)) : [...prev, newNotice]
    );

    setForm({ title: "", description: "", subject: "", category: "", file: null });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleEdit = (notice) => {
    setForm({ ...notice });
    setEditingId(notice.id);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const handleFileDelete = () => {
    setForm({ ...form, file: null });
  };

  const filteredNotices = notices.filter(
    (notice) =>
      (!subjectFilter || notice.subject === subjectFilter) &&
      (!categoryFilter || notice.category === categoryFilter)
  );

  const getFileType = (file) => {
    if (!file) return null;
    if (file.type?.startsWith("image/")) return "image";
    if (file.type === "application/pdf") return "pdf";
    return null;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-2xl shadow">
      <h2 className="text-3xl font-bold mb-6">Professor Notice </h2>

      {!showAddForm ? (
        <>
          <div className="mb-6 text-right">
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingId(null);
                setForm({ title: "", description: "", subject: "", category: "", file: null });
              }}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              + Add Notice
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">Filter by Class</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Class</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">Filter by Subject</label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Subjects</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-xl">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Subject</th>
                  <th className="px-4 py-3 text-left">Class</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-center">File</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice) => (
                    <tr key={notice.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{notice.title}</td>
                      <td className="px-4 py-3">{notice.subject}</td>
                      <td className="px-4 py-3">{notice.category}</td>
                      <td className="px-4 py-3">{notice.createdDate}</td>
                      <td className="px-4 py-3 text-center">
                        {notice.file ? (
                          <a
                            href={URL.createObjectURL(notice.file)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-sm"
                          >
                            View
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => handleEdit(notice)}
                            className="text-indigo-600 hover:underline text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(notice.id)}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No notices available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setForm({ category: "", subject: "", title: "", description: "", file: null });
              }}
              className="text-blue-600 hover:underline text-sm"
            >
              ← Back to Notices
            </button>
          </div>

          <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Class</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Class</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>

         <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Subject</label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
            </div>


          <div className="grid gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Attach File</label>
              <input
                type="file"
                name="file"
                accept="application/pdf,image/*"
                onChange={handleChange}
                className="w-full"
              />
              {form.file && (
                <div className="mt-2 flex items-center gap-4">
                  {getFileType(form.file) === "pdf" ? (
                    <embed
                      src={URL.createObjectURL(form.file)}
                      type="application/pdf"
                      width="100"
                      height="100"
                      className="border rounded shadow"
                    />
                  ) : getFileType(form.file) === "image" ? (
                    <img
                      src={URL.createObjectURL(form.file)}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded border"
                    />
                  ) : (
                    <p className="text-gray-500 text-sm">Unsupported file</p>
                  )}
                  <button
                    onClick={handleFileDelete}
                    className="text-red-600 text-sm underline"
                  >
                    Remove File
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-fit"
            >
              {editingId ? "Update Notice" : "Add Notice"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfessorNotice;

/*import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import NoticeCard from '../../components/NoticeCard';
import AddNoticeForm from '../../components/AddNoticeForm';

function ProfessorDashboard() {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const res = await api.get('/api/notice/department');
      setNotices(res.data);
    } catch (err) {
      console.log("Error fetching notices:",err);
    }
  };

  const deleteNotice = async (id) => {
    try {
      await api.delete(`/api/notices/${id}`);
      fetchNotices();
    } catch (err) {
      console.log("error deleting notices:",err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div>
      <h2>Professor Dashboard</h2>
      <AddNoticeForm onNoticeAdded={fetchNotices} />
      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} onDelete={deleteNotice} />
      ))}
    </div>
  );
}

export default ProfessorDashboard;*/
