import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setIsLoggedIn, isLoggedIn } =
    useContext(AppContext);

  const [activeLink, setActiveLink] = useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const firstName = userData?.name?.charAt(0) || "U";

  const logout = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div className="fixed w-full z-50 bg-transparent backdrop-blur-md h-[80px] px-6 sm:px-10 flex justify-between items-center">
      {/* Logo */}
      <div className="font-michroma text-xl font-semibold text-white">
        AyurSutra
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex justify-center items-center gap-10 text-white">
        <Link
          to="/"
          onClick={() => setActiveLink("home")}
          className={`transition-all duration-150 cursor-pointer ${
            activeLink === "home"
              ? "bg-white text-black px-4 py-2 rounded-full hover:opacity-75"
              : "text-white"
          }`}
        >
          Home
        </Link>
        <Link
          to="/services"
          onClick={() => setActiveLink("services")}
          className={`transition-all duration-150 cursor-pointer ${
            activeLink === "services"
              ? "bg-white text-black px-4 py-2 rounded-full hover:opacity-75"
              : "text-white"
          }`}
        >
          Services
        </Link>

        {/* User Dropdown */}
        <li
          className="relative flex flex-col"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          {isLoggedIn ? (
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:opacity-75 transition-all cursor-pointer">
              <span>{firstName}</span>
            </div>
          ) : (
            <Link
              className="border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition-all"
              to="/login"
            >
              Login
            </Link>
          )}

          {isLoggedIn && dropdownOpen && (
            <ul className="absolute right-0 mt-10 w-48 bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-xl shadow-lg text-white flex flex-col z-50">
              <Link
                to="/dashboard"
                onClick={() => setActiveLink("dashboard")}
                className="px-4 py-3 hover:bg-white/20 transition-all rounded-t-xl"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-4 py-3 hover:bg-white/20 transition-all text-left rounded-b-xl"
              >
                Logout
              </button>
            </ul>
          )}
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <div className="md:hidden text-white text-2xl cursor-pointer">
        {menuOpen ? (
          <FaTimes onClick={() => setMenuOpen(false)} />
        ) : (
          <FaBars onClick={() => setMenuOpen(true)} />
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 right-0 w-2/3 sm:w-1/2 bg-gray-900/95 backdrop-blur-md border-l border-white/20 p-6 flex flex-col gap-6 text-white md:hidden z-50">
          <Link
            to="/"
            onClick={() => {
              setActiveLink("home");
              setMenuOpen(false);
            }}
            className={`transition-all duration-150 ${
              activeLink === "home" ? "text-blue-400 font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/services"
            onClick={() => {
              setActiveLink("services");
              setMenuOpen(false);
            }}
            className={`transition-all duration-150 ${
              activeLink === "services" ? "text-blue-400 font-semibold" : ""
            }`}
          >
            Services
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => {
                  setActiveLink("dashboard");
                  setMenuOpen(false);
                }}
                className="transition-all duration-150"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-left transition-all duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all w-fit"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
