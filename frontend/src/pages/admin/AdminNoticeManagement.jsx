import React, { useEffect, useState } from "react";
import api from "../../services/api";
import NoticeCard from "../../components/NoticeCard";
import AddNoticeForm from '../../components/AddNoticeForm';

const AdminNoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAdminNotices();
  }, []);

  const fetchAdminNotices = async () => {
    try {
      const res = await api.get("/api/notice/admin");
      setNotices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNotice = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/notice/add", {
        title,
        description
      });

      setTitle("");
      setDescription("");
      setMessage("Admin notice added successfully");

      fetchAdminNotices();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to add admin notice");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleNoticeAdded = () => {
  setMessage("Notice added successfully");
  fetchNotices();
  setTimeout(() => setMessage(""), 3000);
};

  

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/notice/${id}`);
      setMessage("Notice deleted successfully");
      fetchAdminNotices();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Delete failed");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Announcements</h1>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      {/* Add Admin Notice */} 
      <form onSubmit={handleAddNotice} className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Admin Notice</h2>

        <input
          type="text"
          placeholder="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full mb-4"
          required
        />

        <textarea
          placeholder="Notice Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full mb-4"
          required
        />

        <button className="btn btn-primary">
          Publish Notice
        </button>
      </form>

     {/* {/* <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Notice</h2>
          <AddNoticeForm onNoticeAdded={handleAddNotice} />
         
        </div>  */}


      {/* Admin Notices List */}
      <div className="space-y-4">
        {notices.length === 0 ? (
          <p className="text-gray-500">No admin notices yet.</p>
        ) : (
          notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNoticeManagement;






//14-01-2026 commented
// import React, { useState, useEffect } from "react";
// import api from "../../api/axios"; // Axios instance with baseURL and token

// const AdminNoticeManagement = () => {
//   const [notices, setNotices] = useState([]);
//   const [newNotice, setNewNotice] = useState({ title: "", description: "", category: "" });
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchNotices();
//   }, []);

//   const fetchNotices = async () => {
//     const res = await api.get("/admin/notices");
//     setNotices(res.data);
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setPreview(URL.createObjectURL(selectedFile));
//   };

//   const uploadFile = async () => {
//     if (!file) return "";
//     const formData = new FormData();
//     formData.append("file", file);
//     const res = await api.post("/admin/files/upload", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return res.data.fileUrl;
//   };

//   const handleAdd = async () => {
//     const fileUrl = await uploadFile();
//     const res = await api.post("/admin/notices", { ...newNotice, fileUrl });
//     setNotices([...notices, res.data]);
//     resetForm();
//   };

//   const handleDelete = async (id) => {
//     await api.delete(`/admin/notices/${id}`);
//     setNotices(notices.filter((n) => n.id !== id));
//   };

//   const handleEdit = (notice) => {
//     setEditId(notice.id);
//     setNewNotice({
//       title: notice.title,
//       description: notice.description,
//       category: notice.category,
//     });
//     setPreview(notice.fileUrl || null);
//   };

//   const handleUpdate = async () => {
//     let fileUrl = preview;
//     if (file) {
//       fileUrl = await uploadFile();
//     }

//     const res = await API.put(`/admin/notices/${editId}`, {
//       ...newNotice,
//       fileUrl,
//     });

//     setNotices(
//       notices.map((n) => (n.id === editId ? res.data : n))
//     );
//     resetForm();
//   };

//   const resetForm = () => {
//     setNewNotice({ title: "", description: "", category: "" });
//     setFile(null);
//     setPreview(null);
//     setEditId(null);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">{editId ? "Edit Notice" : "Add New Notice"}</h2>

//       <div className="bg-white p-4 rounded shadow mb-6">
//         <input
//           type="text"
//           placeholder="Title"
//           value={newNotice.title}
//           onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
//           className="w-full border p-2 mb-2 rounded"
//         />
//         <textarea
//           placeholder="Description"
//           value={newNotice.description}
//           onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
//           className="w-full border p-2 mb-2 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Category"
//           value={newNotice.category}
//           onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
//           className="w-full border p-2 mb-2 rounded"
//         />

//         <input type="file" onChange={handleFileChange} className="mb-2" />
//         {preview && (
//           <div className="mb-4">
//             {preview.endsWith(".pdf") ? (
//               <embed src={preview} width="200" height="200" type="application/pdf" />
//             ) : (
//               <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded" />
//             )}
//           </div>
//         )}

//         {editId ? (
//           <button
//             onClick={handleUpdate}
//             className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
//           >
//             Update Notice
//           </button>
//         ) : (
//           <button
//             onClick={handleAdd}
//             className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//           >
//             Add Notice
//           </button>
//         )}
//         <button
//           onClick={resetForm}
//           className="bg-gray-400 text-white px-4 py-2 rounded"
//         >
//           Cancel
//         </button>
//       </div>

//       <h2 className="text-2xl font-bold mb-4">All Notices</h2>
//       <div className="grid gap-4">
//         {notices.map((notice) => (
//           <div key={notice.id} className="bg-white p-4 rounded shadow">
//             <h3 className="text-xl font-semibold">{notice.title}</h3>
//             <p className="text-gray-600">{notice.description}</p>
//             <p className="text-sm text-gray-500 mb-2">Category: {notice.category}</p>

//             {notice.fileUrl && (
//               <div className="mt-2">
//                 {notice.fileUrl.endsWith(".pdf") ? (
//                   <embed src={notice.fileUrl} width="100" height="100" type="application/pdf" />
//                 ) : (
//                   <img src={notice.fileUrl} alt="File" className="w-20 h-20 object-cover rounded" />
//                 )}
//               </div>
//             )}

//             <div className="mt-3 flex gap-2">
//               <button
//                 onClick={() => handleEdit(notice)}
//                 className="bg-yellow-400 text-white px-3 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(notice.id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminNoticeManagement;

//end of comment 14-01-2026




/*import React, { useState } from "react";

const AdminNoticeManagement = () => {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const categories = [
    "Hostel Notice",
    "Scholarship Notice",
    "Extra-Curricular Notice",
    "Exam Notice",
  ];

  const categoryColors = {
    "Hostel Notice": "bg-blue-100 text-blue-800",
    "Scholarship Notice": "bg-green-100 text-green-800",
    "Extra-Curricular Notice": "bg-purple-100 text-purple-800",
    "Exam Notice": "bg-red-100 text-red-800",
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.category) newErrors.category = "Category is required";
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
      editingId
        ? prev.map((n) => (n.id === editingId ? newNotice : n))
        : [...prev, newNotice]
    );

    setForm({ title: "", description: "", category: "", file: null });
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

  const filteredNotices = categoryFilter
    ? notices.filter((n) => n.category === categoryFilter)
    : notices;

  const getFileType = (file) => {
    if (!file) return null;
    if (file.type?.startsWith("image/")) return "image";
    if (file.type === "application/pdf") return "pdf";
    return null;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-2xl shadow">
      <h2 className="text-3xl font-bold mb-6">Notice Management</h2>

      {!showAddForm ? (
        <>
          {/* Add Notice Button 
          <div className="mb-6 text-right">
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingId(null);
                setForm({ title: "", description: "", category: "", file: null });
              }}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              + Add Notice
            </button>
          </div>

          {/* Category Filter 
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">Filter by Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Notice Table 
          <NoticeViewTable
            notices={filteredNotices}
            categoryColors={categoryColors}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showActions={true}
          />  
        </>
      ) : (
        <>
          {/* Back Button 
          <div className="mb-4">
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setForm({ title: "", description: "", category: "", file: null });
              }}
              className="text-blue-600 hover:underline text-sm"
            >
              ← Back to Notices
            </button>
          </div>

          {/* Form 
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
              <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
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

export default AdminNoticeManagement;

/*import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import NoticeCard from '../../components/NoticeCard';
import AddNoticeForm from '../../components/AddNoticeForm';

function AdminDashboard() {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    try {
      const res = await api.get('/api/notices');
      setNotices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNotice = async (id) => {
    try {
      await api.delete(`/api/notices/${id}`);
      fetchNotices();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <AddNoticeForm onNoticeAdded={fetchNotices} />
      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} onDelete={deleteNotice} />
      ))}
    </div>
  );
}

export default AdminDashboard;*/
