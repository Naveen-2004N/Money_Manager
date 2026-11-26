import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PiggyLogo from './PiggyLogo';

const PublicNavbar = () => {
  const location = useLocation();

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Logo */}
        <PiggyLogo to="/" />

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/' ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Home
          </Link>
          <a
            href="#about"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            About us
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Contact us
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-[#5E17EB] hover:bg-[#5012cf] text-white text-sm font-medium rounded-lg shadow-sm transition-all active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
