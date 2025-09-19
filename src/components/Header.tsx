import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCalendar,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaTachometerAlt,
} from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "../hooks";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const menuLinks = [
    { to: "/", label: "Home", icon: <FaHome />, show: true },
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt />, show: !!token },
    { to: "/bookings", label: "Bookings", icon: <FaCalendar />, show: !!token },
    { to: "/login", label: "Login", icon: <FaSignInAlt />, show: !token },
    { to: "/signup", label: "Signup", icon: <FaUserPlus />, show: !token },
  ];

  return (
    <header className="bg-white text-gray-800 shadow-md fixed w-full z-50 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-600 flex items-center gap-2">
          <FaCalendar className="text-blue-500" /> BookingApp
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {menuLinks.map((link) =>
            link.show ? (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-50 transition"
              >
                {link.icon} {link.label}
              </Link>
            ) : null
          )}
          {token && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-sm transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-50 border-t border-gray-200 p-4 space-y-2 animate-slide-down">
          {menuLinks.map(
            (link) =>
              link.show && (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-100 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon} {link.label}
                </Link>
              )
          )}
          {token && (
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
