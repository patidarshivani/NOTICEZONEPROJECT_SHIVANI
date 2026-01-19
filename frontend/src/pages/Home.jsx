import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "/src/assets/logo.png";
import heroBg from "/src/assets/hero-bg.jpg";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const contactRef = useRef(null);
  const navigate = useNavigate(); // ← For redirection
  const role = localStorage.getItem("role");

  // Check login status when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/"); // Redirect to home
  };

  // Smooth scroll to Contact
  const handleScrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  //added on 13-01-2026 for dashBoard addition in navbar
  const handleDashboardClick = () => {
  const role = localStorage.getItem("role");

  if (!role) {
    navigate("/"); // not logged in
    return;
  }

  switch (role) {
    case "PROFESSOR":
      navigate("/professor-dashboard");
      break;
    case "STUDENT":
      navigate("/student-dashboard");
      break;
    case "HOD":
      navigate("/hod-dashboard");
      break;
    case "ADMIN":
      navigate("/admin-dashboard");
      break;
    default:
      navigate("/");
  }
};


  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-6 shadow-lg fixed top-0 left-0 w-full z-50">
        <div className="flex justify-between items-center">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="JEC Logo" className="h-10" />
            <div className="text-2xl font-bold">JEC NoticeZone</div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden cursor-pointer z-50" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </div>

          {/* Navigation Links */}
          <ul
            className={`absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent shadow-lg md:shadow-none md:flex md:gap-6 text-center transition-all duration-300 ease-in-out ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full md:opacity-100 md:translate-y-0"
            }`}
          >
            <li className="py-3 md:py-0">
              {/* <Link
                to="/dashBoard"
                className="block p-3 hover:bg-blue-800 md:hover:bg-transparent md:hover:text-yellow-300 transition-all"
              >
                Dashboard
              </Link> */}
            
   <div 
        className="block p-3 hover:bg-blue-800 md:hover:bg-transparent md:hover:text-yellow-300 transition-all">
        {/* <button onClick={() => navigate("/")}>Home</button> */}

        {/* Show dashboard only if logged in */}
        {role && (
          <span
            onClick={handleDashboardClick}
            className="cursor-pointer"
          >
            Dashboard
          </span>
        )}

        {!role && (
          <span onClick={() => navigate("/login")}
          className="cursor-pointer">
            Dashboard
          </span>
        )}
      </div>
            </li>
            <li className="py-3 md:py-0">
              <Link
                to="/about"
                className="block p-3 hover:bg-blue-800 md:hover:bg-transparent md:hover:text-yellow-300 transition-all"
              >
                About Us
              </Link>
            </li>
            <li className="py-3 md:py-0">
              <span
                onClick={handleScrollToContact}
                className="block p-3 cursor-pointer hover:bg-blue-800 md:hover:bg-transparent md:hover:text-yellow-300 transition-all"
              >
                Contact
              </span>
            </li>
            {isLoggedIn ? (
              <li className="py-3 md:py-0">
                <span
                  onClick={handleLogout}
                  className="block p-3 cursor-pointer hover:bg-blue-800 md:hover:bg-transparent md:hover:text-yellow-300 transition-all"
                >
                  Logout
                </span>
              </li>
            ) : (
              <li className="py-3 md:py-0">
                <Link
                  to="/login"
                  className="block p-3 hover:bg-blue-800 md:hover:bg-transparent md:hover:text-yellow-300 transition-all"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="relative text-center py-40 bg-cover bg-center flex flex-col items-center justify-center mt-16"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-white relative z-10"
        >
          Welcome to JEC NoticeZone
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg text-gray-200 relative z-10"
        >
          Stay updated with the latest college notices, events, and announcements.
        </motion.p>
      </header>

      {/* Main Sections */}
      <main className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {["Departments", "Admin", "Hostel", "Extra Curricular"].map((section, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h2 className="text-3xl font-bold text-blue-700">{section}</h2>
            <p className="text-gray-600 mt-2">
              Explore updates and information related to {section.toLowerCase()}.
            </p>
          </motion.section>
        ))}
      </main>

      {/* Contact Section */}
      <section ref={contactRef} className="bg-blue-100 py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800">Contact Us</h3>
          <p className="text-gray-600 mt-2">Get in touch with us for any queries or assistance.</p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mt-6"
          >
            <div className="flex items-center gap-2 text-gray-700">
              <FaPhoneAlt className="text-blue-600" /> <span>+91 12345 67890</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaEnvelope className="text-blue-600" /> <span>info@jec.edu</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt className="text-blue-600" /> <span>Jabalpur, MP, India</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-6 mt-8">
        <p className="text-lg font-semibold">© {new Date().getFullYear()} JEC NoticeZone</p>
        <p className="text-gray-300">All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
