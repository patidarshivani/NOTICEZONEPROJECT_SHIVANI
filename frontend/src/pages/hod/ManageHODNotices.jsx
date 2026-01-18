import React, { useEffect, useState } from "react";
import HODSidebar from "./HODSidebar";

const ManageHODNotices = () => {
  const [notices, setNotices] = useState([]);
  const [editingNotice, setEditingNotice] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchNotices = async () => {
    const res = await fetch("http://localhost:8080/hod/notice", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setNotices(data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:8080/hod/notice/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("Notice deleted!");
      fetchNotices();
    } else {
      alert("Delete failed");
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice.id);
    setUpdatedTitle(notice.title);
  };

  const handleUpdate = async (id) => {
    const res = await fetch(`http://localhost:8080/hod/notice/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: updatedTitle }),
    });

    if (res.ok) {
      alert("Notice updated!");
      setEditingNotice(null);
      fetchNotices();
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <HODSidebar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Manage Department Notices</h2>

        <ul className="space-y-4">
          {notices.map((notice) => (
            <li
              key={notice.id}
              className="p-4 border bg-white rounded shadow flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                {editingNotice === notice.id ? (
                  <input
                    type="text"
                    className="border p-2 w-full md:w-64"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                ) : (
                  <h3 className="text-lg font-semibold">{notice.title}</h3>
                )}
                <a
                  href={`http://localhost:8080/files/${notice.fileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View File
                </a>
              </div>

              <div className="flex gap-2 mt-4 md:mt-0">
                {editingNotice === notice.id ? (
                  <button
                    onClick={() => handleUpdate(notice.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(notice)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notice.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageHODNotices;
