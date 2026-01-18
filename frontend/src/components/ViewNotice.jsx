import { useState, useEffect } from "react";
import NoticeCard from "./NoticeCard";
import api from "../api/axios";

const ViewNotice = () => {



   const [adminNotices, setAdminNotices] = useState([]);

useEffect(() => {
  api.get("/api/notice/admin").then(res => setAdminNotices(res.data));
}, []); 


  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">🔔 Admin Announcements</h2>

        <div className="space-y-3 mb-8">
         {adminNotices.map(n => (
          <NoticeCard key={n.id} notice={n} />
         ))}
        </div>
        </div>

  );
};

export default ViewNotice;

    