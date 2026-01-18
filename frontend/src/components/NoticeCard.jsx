import React from 'react';

function NoticeCard({ notice, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition">

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {notice.title}
      </h3>

      {/* Content */}
      <p className="text-gray-600 mb-4 whitespace-pre-line">
        {notice.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Posted by:{" "}
          <span className="font-medium text-gray-700">
            {notice.createdBy?.name || notice.createdBy?.username || "Unknown"}
          </span>
        </span>

        {/* Delete button (Professor/Admin only) */}
        {onDelete && (
          <button
            onClick={() => onDelete(notice.id)}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default NoticeCard;


//commented on 9-01-2026
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function NoticeCard({ notice, onDelete }) {
//   const navigate = useNavigate();

//   return (
//     <div className="notice-card">
//       <h3>{notice.title}</h3>
//       <p>{notice.description}</p>
//       {notice.pdfUrl && <a href={notice.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>}
      
//       {/* Delete button for authorized users */}
//       {onDelete && (
//         <button onClick={() => onDelete(notice.id)}>Delete</button>
//       )}
//     </div>
//   );
// }

// export default NoticeCard;
