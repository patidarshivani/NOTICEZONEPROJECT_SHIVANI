import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AssignmentNoticeList = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get("/api/professor/notices", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setNotices(res.data))
      .catch((err) => console.error("Error fetching notices", err));
  }, []);

  const deleteNotice = (id) => {
    axios
      .delete(`/api/professor/notices/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => setNotices(notices.filter((n) => n.id !== id)))
      .catch((err) => console.error("Delete failed", err));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Assignment Notices</h2>
      {notices.map((notice) => (
        <div key={notice.id} className="p-4 bg-gray-100 rounded mb-3">
          <h3 className="font-semibold">{notice.title}</h3>
          <p>{notice.description}</p>
          <div>
            <Link to={`/professor/notices/edit/${notice.id}`} className="mr-4 text-blue-600">
              Edit
            </Link>
            <button
              onClick={() => deleteNotice(notice.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssignmentNoticeList;

