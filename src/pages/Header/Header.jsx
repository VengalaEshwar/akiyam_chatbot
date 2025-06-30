import React, { useState } from 'react';
import logo from '../../assets/logo1.png';
import { NavLink } from 'react-router-dom';
import './Header.css';
import ToggleButton from '../../components/ToggleButton/ToggleButton';

function Header({isDark,setIsDark}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navLinks = (
    <>
      <NavLink to="/" className="nav-item text-gray-400 hover:text-white" onClick={() => setIsMobileNavOpen(false)}>Home</NavLink>
      <NavLink to="/explore" className="nav-item text-gray-400 hover:text-white" onClick={() => setIsMobileNavOpen(false)}>Explore</NavLink>
      <NavLink to="/news" className="nav-item text-gray-400 hover:text-white" onClick={() => setIsMobileNavOpen(false)}>News</NavLink>
      <NavLink to="/contact" className="nav-item text-gray-400 hover:text-white" onClick={() => setIsMobileNavOpen(false)}>Contact</NavLink>
      <NavLink to="/chatbot" className="nav-item text-gray-400 hover:text-white" onClick={() => setIsMobileNavOpen(false)}>Chatbot</NavLink>
    </>
  );

  return (
    <header className="bg-[#0b0f15] header-nav text-white py-4 px-6 flex items-center justify-between shadow-md sticky z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <div className="text-2xl font-bold">
          <span className="text-[#0072ce]">Ocean</span> <span className="text-[#3f9eff]">GenAi</span>
        </div>
      </div>

      {/* Center: Nav (Desktop only) */}
      <nav className="hidden md:flex gap-8 text-lg font-medium">
        {navLinks}
      </nav>

      {/* Right: Auth Button & Menu Icon */}
      <div className="flex items-center gap-4">
     <ToggleButton isDark={isDark} setIsDark={setIsDark} />
        <button className="bg-[#3d3225] text-[#f5f2f0] px-5 py-2 rounded-full font-semibold hover:bg-[#5a4738] transition">
          Sign In / Sign Up
        </button>
        <button onClick={() => setIsMobileNavOpen(prev => !prev)} className="md:hidden focus:outline-none">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileNavOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0b0f15] px-6 py-4 flex flex-col gap-4 md:hidden shadow-lg border-t border-[#222]">
          {navLinks}
        </div>
      )}
    </header>
  );
}

export default Header;
