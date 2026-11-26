import React from 'react';
import { Link } from 'react-router-dom';

const PiggyLogo = ({ to = "/" }) => {
  return (
    <Link to={to} className="inline-flex items-center gap-2.5 group">
      {/* Piggy bank with coin icon matching screenshots */}
      <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
        <svg
          viewBox="0 0 48 48"
          className="w-8 h-8 transition-transform group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Piggy bank body */}
          <ellipse cx="24" cy="27" rx="17" ry="13" fill="#FBBF24" stroke="#78350F" strokeWidth="2.5" />
          {/* Snout */}
          <rect x="36" y="24" width="7" height="8" rx="3.5" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
          {/* Ear */}
          <path d="M16 17 L21 11 L24 16 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
          {/* Legs */}
          <rect x="14" y="38" width="5" height="5" rx="2" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
          <rect x="27" y="38" width="5" height="5" rx="2" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
          {/* Tail */}
          <path d="M7 26 Q4 24 6 22 Q8 20 5 19" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Eye */}
          <circle cx="31" cy="23" r="1.5" fill="#1F2937" />
          {/* Slot */}
          <line x1="21" y1="15" x2="27" y2="15" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          {/* Gold Coin with Dollar */}
          <circle cx="24" cy="10" r="5" fill="#FDE047" stroke="#78350F" strokeWidth="1.5" />
          <text x="24" y="12.5" fontSize="6.5" fontWeight="bold" fill="#78350F" textAnchor="middle" fontFamily="sans-serif">$</text>
        </svg>
      </div>
      <span className="font-bold text-gray-900 text-lg tracking-tight">Money Manager</span>
    </Link>
  );
};

export default PiggyLogo;
