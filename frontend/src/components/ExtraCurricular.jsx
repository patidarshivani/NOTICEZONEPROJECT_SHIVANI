  import { useState, useEffect } from "react";

  const ExtraCurricular = () => {
    const [notices, setNotices] = useState([]);
  
    // Fetch Notices from Backend
    useEffect(() => {
      fetch("http://localhost:8080/api/extracurricular-notices")
        .then((response) => response.json())
        .then((data) => setNotices(data));
    }, []);
  
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold text-blue-700 text-center">Extra-Curricular Notices</h2>
        <p className="text-gray-600 mt-4 text-center">View upcoming events, competitions, and club activities.</p>
  
        {/* Notice Table */}
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {notices.length > 0 ? (
                notices.map((notice) => (
                  <tr key={notice.id} className="border-b hover:bg-gray-100">
                    <td className="border px-4 py-2">{notice.title}</td>
                    <td className="border px-4 py-2">{new Date(notice.date).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{notice.content}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">No notices available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default ExtraCurricular;
  
  