import { motion } from "framer-motion";
import { FaLaptopCode, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

const team = [
  {
    name: "Student Users",
    role: "Receive Notices, View Timetables, Assignments",
    icon: <FaUserGraduate className="text-3xl text-blue-500" />,
  },
  {
    name: "Professor & HODs",
    role: "Upload Notices, Assignments, Manage Timetable",
    icon: <FaChalkboardTeacher className="text-3xl text-green-600" />,
  },
  {
    name: "Admin",
    role: "Manage Roles, Hostels, Events, & More",
    icon: <FaLaptopCode className="text-3xl text-purple-600" />,
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-4"
        >
          About JEC NoticeZone
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg max-w-3xl mx-auto"
        >
          Your one-stop solution for managing and accessing college notices, assignments, and event updates
          — designed for Jabalpur Engineering College.
        </motion.p>
      </div>

      {/* About Text */}
      <div className="max-w-5xl mx-auto py-16 px-6 space-y-6 text-gray-700">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg leading-relaxed"
        >
          <strong>JEC NoticeZone</strong> is a centralized web-based platform that brings
          together students, teachers, HODs, and administrative staff to communicate academic and hostel-related information effectively.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg leading-relaxed"
        >
          Built using <strong>React.js, Spring Boot, MySQL</strong> and secured with <strong>JWT authentication</strong>,
          this platform provides role-based access, file uploads, and real-time updates.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-100 p-6 rounded-lg"
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-3">Our Mission</h2>
          <p>
            To empower the JEC community with a digital platform that enhances communication, boosts transparency, and simplifies administrative processes.
          </p>
        </motion.div>
      </div>

      {/* Team Roles Section */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-blue-700 mb-8"
          >
            Who Is It For?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-blue-50 border border-blue-200 p-6 rounded-lg shadow hover:shadow-lg transition-all"
              >
                <div className="mb-4">{member.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600 mt-2">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <footer className="bg-blue-700 text-white text-center py-6">
        <p className="text-sm text-gray-300">© {new Date().getFullYear()} JEC NoticeZone</p>
      </footer>
    </div>
  );
};

export default AboutUs;
