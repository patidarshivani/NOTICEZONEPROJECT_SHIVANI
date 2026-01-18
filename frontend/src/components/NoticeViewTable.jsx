import React from "react";

const NoticeViewTable = ({
  notices,
  categoryColors,
  onEdit,
  onDelete,
  showActions = false,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-xl">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-center">File</th>
            {showActions && (
              <th className="px-4 py-3 text-center">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {notices.length > 0 ? (
            notices.map((notice) => (
              <tr key={notice.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{notice.title}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      categoryColors[notice.category] || "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {notice.category}
                  </span>
                </td>
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
                {showActions && (
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={() => onEdit(notice)}
                        className="text-indigo-600 hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(notice.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={showActions ? 5 : 4} className="text-center py-6 text-gray-500">
                No notices available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeViewTable;

