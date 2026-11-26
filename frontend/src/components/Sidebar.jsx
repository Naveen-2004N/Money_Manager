import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  List,
  Wallet,
  CreditCard,
  Filter
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/categories', label: 'Category', icon: List },
  { to: '/income', label: 'Income', icon: Wallet },
  { to: '/expenses', label: 'Expense', icon: CreditCard },
  { to: '/transactions', label: 'Filters', icon: Filter },
];

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="w-56 sm:w-60 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col min-h-[calc(100vh-4rem)] p-4 sm:p-5">
      {/* User Info Header in Sidebar matching screenshots */}
      <div className="flex flex-col items-center justify-center pt-2 pb-6 border-b border-gray-100">
        <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 overflow-hidden flex items-center justify-center shadow-sm mb-2.5">
          {user?.profileImageUrl ? (
            <img src={user.profileImageUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            /* Default cartoon scholar avatar matching screenshot */
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="#FEF3C7" />
              <polygon points="50,15 85,32 50,45 15,32" fill="#1E293B" />
              <polygon points="50,45 75,36 75,48 50,56 25,48 25,36" fill="#0F172A" />
              <line x1="50" y1="32" x2="78" y2="44" stroke="#F59E0B" strokeWidth="2.5" />
              <circle cx="78" cy="45" r="2.5" fill="#D97706" />
              <circle cx="50" cy="62" r="22" fill="#FDE68A" />
              <path d="M 32 52 Q 50 48 68 52 Q 72 60 70 65 Q 65 56 50 56 Q 35 56 30 65 Z" fill="#334155" />
              <ellipse cx="43" cy="63" rx="2.5" ry="3.5" fill="#0F172A" />
              <ellipse cx="57" cy="63" rx="2.5" ry="3.5" fill="#0F172A" />
              <circle cx="44" cy="62" r="1" fill="#FFF" />
              <circle cx="58" cy="62" r="1" fill="#FFF" />
              <path d="M 44 72 Q 50 78 56 72" stroke="#B45309" strokeWidth="2" strokeLinecap="round" fill="none" />
              <circle cx="38" cy="68" r="2.5" fill="#FCA5A5" opacity="0.6" />
              <circle cx="62" cy="68" r="2.5" fill="#FCA5A5" opacity="0.6" />
            </svg>
          )}
        </div>
        <h3 className="font-semibold text-gray-800 text-sm tracking-tight text-center truncate max-w-[180px]">
          {user?.fullName || 'User'}
        </h3>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 pt-5 space-y-1.5">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#5E17EB] text-white shadow-sm font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
