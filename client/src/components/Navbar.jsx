import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = ({ userName, onLogout }) => {
  const {userData, backendUrl, setIsLoggedIn, isLoggedIn} = useContext(AppContext);

  const [activeLink, setActiveLink] = useState('home')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const firstName = userData?.name.charAt(0)||"U";

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout", {}, { withCredentials: true });
      if (data.success) {
        toast.success(data.message);
        setIsLoggedIn(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div className='fixed w-full z-50 bg-transparent backdrop-blur-md h-[100px] px-10 flex justify-between items-center'>
      <div className='bg-transparent font text-xl font-michroma font-semibold text-white'>
        AyurSutra
      </div>
      <ul className='flex justify-center items-center gap-10 bg-transparent text-white'>
        <Link to='/' onClick={()=>setActiveLink("home")} className={`transition-all duration-150 cursor-pointer ${activeLink==="home"?"bg-[white] text-black px-4 py-3 rounded-full hover:opacity-75":"text-white bg-transparent"}`}>Home</Link>
        <Link to='/services' onClick={()=>setActiveLink("services")} className={`transition-all duration-150 cursor-pointer ${activeLink==="services"?"bg-white text-black px-4 py-3 rounded-full hover:opacity-75":"text-white bg-transparent"}`}>Services</Link>
        
        {/* User Dropdown Container */}
        <li 
          className='relative flex flex-col bg-transparent' 
          onMouseEnter={() => setDropdownOpen(true)} 
          onMouseLeave={() => setDropdownOpen(false)}
        >
          {/* Trigger */}
          {isLoggedIn?<div className='flex items-center gap-2 bg-white text-black justify-center w-12 h-12 rounded-full hover:opacity-75 transition-all cursor-pointer bg-transparent'>
            <span className='bg-transparent text-black'>{firstName}</span>
          </div>:<Link className='border border-white px-5 hover:bg-white transition-all duration-300 hover:text-black py-3 rounded-full' to='/login'>Login</Link>}

          {/* Dropdown */}
          {isLoggedIn && dropdownOpen && (
            <ul className='absolute right-0 mt-10 w-48 bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-xl shadow-lg text-white flex flex-col z-50'>
              <Link to='/dashboard' onClick={()=>setActiveLink("dashboard")} className='px-4 py-3 hover:bg-white/20 transition-all rounded-t-xl'>Dashboard</Link>
              <button onClick={logout} className='px-4 py-3 hover:bg-white/20 transition-all text-left rounded-b-xl'>
                Logout
              </button>
            </ul>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Navbar
