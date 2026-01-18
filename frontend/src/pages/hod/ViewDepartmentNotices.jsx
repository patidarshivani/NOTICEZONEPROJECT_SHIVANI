import React, { useEffect, useState } from "react";
import HODSidebar from "./HODSidebar";

const ViewDepartmentNotices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/hod/notice", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setNotices(data);
    };

    fetchNotices();
  }, []);

  return (
    <div className="flex min-h-screen">
      <HODSidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Department Notices</h2>
        <ul className="space-y-4">
          {notices.map((notice, idx) => (
            <li key={idx} className="p-4 border rounded bg-white shadow">
              <h3 className="font-semibold text-lg">{notice.title}</h3>
              <a
                href={`http://localhost:8080/files/${notice.fileName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View File
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewDepartmentNotices;
