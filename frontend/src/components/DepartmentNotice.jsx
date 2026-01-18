import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DepartmentNotice = () => {
  const [activeCategory, setActiveCategory] = useState("hod");
  const [activeYear, setActiveYear] = useState("1st Year");
  const [notices, setNotices] = useState([]);

  const classYears = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  useEffect(() => {
    // Sample data with fileUrl for download
    const sampleNotices = [
      {
        id: 1,
        type: "hod",
        title: "Exam Schedule",
        date: "2025-03-02",
        description: "Mid-term exams schedule released.",
        fileUrl: "/files/exam-schedule.pdf",
      },
      {
        id: 2,
        type: "class",
        year: "1st Year",
        title: "AI Workshop",
        date: "2025-03-05",
        description: "Intro to AI workshop.",
        fileUrl: "/files/ai-workshop.pdf",
      },
      {
        id: 3,
        type: "hod",
        title: "Project Submission",
        date: "2025-03-10",
        description: "Final year project submission deadline.",
      },
      {
        id: 4,
        type: "class",
        year: "2nd Year",
        title: "Guest Lecture",
        date: "2025-03-15",
        description: "Guest lecture on Robotics.",
        fileUrl: "/files/guest-lecture.jpg",
      },
      {
        id: 5,
        type: "class",
        year: "1st Year",
        title: "Python Basics",
        date: "2025-03-20",
        description: "Basics of Python Programming.",
      },
    ];
    setNotices(sampleNotices);
  }, []);

  const filteredNotices =
    activeCategory === "hod"
      ? notices.filter((notice) => notice.type === "hod")
      : notices.filter(
          (notice) => notice.type === "class" && notice.year === activeYear
        );

  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop();
    link.target = "_blank";
    link.click();
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 min-h-screen">
        <h3 className="text-xl font-bold mb-4">Notice Categories</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveCategory("hod")}
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeCategory === "hod"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              HOD Notices
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveCategory("class")}
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeCategory === "class"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              Class Notices
            </button>
          </li>
        </ul>

        {activeCategory === "class" && (
          <div className="mt-6">
            <h4 className="text-md font-semibold mb-2 text-gray-700">
              Select Class Year
            </h4>
            <ul className="space-y-1">
              {classYears.map((year) => (
                <li key={year}>
                  <button
                    onClick={() => setActiveYear(year)}
                    className={`block w-full text-left px-3 py-1 rounded-md text-sm ${
                      activeYear === year
                        ? "bg-blue-500 text-white"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    {year}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">
          {activeCategory === "hod" ? "HOD Notices" : `${activeYear} Notices`}
        </h2>
        <p className="text-gray-600">
          Stay updated with the latest{" "}
          {activeCategory === "hod" ? "HOD" : activeYear} notices.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <motion.div
                key={notice.id}
                whileHover={{ scale: 1.03 }}
                className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-blue-700">
                  {notice.title}
                </h3>
                <p className="text-sm text-gray-500">{notice.date}</p>
                <p className="text-gray-600 mt-2">{notice.description}</p>

                {notice.fileUrl && (
                  <button
                    onClick={() => handleDownload(notice.fileUrl)}
                    className="mt-3 text-sm text-blue-600 hover:underline"
                  >
                    Download File
                  </button>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No notices found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentNotice;
