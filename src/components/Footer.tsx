import React from "react";
import { FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 border-t mt-10">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-gray-600">
        
        {/* Left - Logo & Text */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-center md:text-left">
          <span className="text-2xl font-extrabold text-indigo-600">
            BookingApp
          </span>
          <span className="text-sm text-gray-500">
            © {new Date().getFullYear()} All Rights Reserved
          </span>
        </div>

        {/* Center - Links */}
        <div className="flex justify-center space-x-6 text-sm font-medium">
          <a href="/about" className="hover:text-indigo-600 transition">About</a>
          <a href="/privacy" className="hover:text-indigo-600 transition">Privacy</a>
          <a href="/terms" className="hover:text-indigo-600 transition">Terms</a>
        </div>

        {/* Right - Social Icons */}
        <div className="flex justify-center md:justify-end space-x-5 text-lg">
          <a
            href="https://github.com/Udhaya007Kumar"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="p-2 rounded-full bg-white shadow hover:bg-indigo-100 transition"
          >
            <FaGithub className="text-gray-800" />
          </a>
          <a
            href="https://udhayaportfolio.vercel.app/"
            target="_blank"
            rel="noreferrer"
            title="My Portfolio"
            className="p-2 rounded-full bg-white shadow hover:bg-indigo-100 transition"
          >
            <FaGlobe className="text-sky-500" />
          </a>
          <a
            href="https://linkedin.com/in/udhaya-kumar-4b756291"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            className="p-2 rounded-full bg-white shadow hover:bg-indigo-100 transition"
          >
            <FaLinkedin className="text-blue-700" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
