// import React, { useEffect, useState } from 'react';
// import api from '../services/api';

// const NoticeList = () => {
//   const [notices, setNotices] = useState([]);

//   useEffect(() => {
//     api.get('/notices/department/1') // Assume dept ID = 1 for demo
//       .then(res => setNotices(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>Department Notices</h2>
//       <ul>
//         {notices.map((notice) => (
//           <li key={notice.id}>
//             <h3>{notice.title}</h3>
//             <p>{notice.description}</p>
//             {notice.filePath && (
//               <a href={`http://localhost:8080/uploads/${notice.filePath}`} target="_blank" rel="noopener noreferrer">
//                 View PDF
//               </a>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NoticeList;


import React, { useEffect, useState } from 'react';
import api from '../services/api';




const NoticeList = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    api.get('/notices/department/1') // Assume dept ID = 1 for demo
      .then(res => setNotices(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Department Notices
        </h2>

        {notices.length === 0 ? (
          <p className="text-center text-gray-500">No notices available.</p>
        ) : (
          <ul className="space-y-6">
            {notices.map((notice) => (
              <li key={notice.id} className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{notice.title}</h3>
                <p className="text-gray-600 mb-3">{notice.description}</p>
                {notice.filePath && (
                  <a
                    href={`http://localhost:8080/uploads/${notice.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    📄 View Attached PDF
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NoticeList;
