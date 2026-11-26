import React from 'react';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Navbar */}
      <AppHeader />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <main className="flex-1 p-5 sm:p-7 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
