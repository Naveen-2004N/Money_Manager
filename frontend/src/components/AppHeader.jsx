import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PiggyLogo from './PiggyLogo';
import { LogOut } from 'lucide-react';

const AppHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Logo */}
        <PiggyLogo to="/dashboard" />

        {/* Right User Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-purple-200 transition-all focus:outline-none"
            aria-label="User profile"
          >
            <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 overflow-hidden flex items-center justify-center">
              {user?.profileImageUrl ? (
                <img src={user.profileImageUrl} alt="User" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-amber-800">
                  {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </span>
              )}
            </div>
          </button>

          {/* Profile Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50 animate-in fade-in duration-150">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.fullName || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
