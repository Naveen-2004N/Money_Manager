import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import { ArrowRight, Wallet, TrendingUp, TrendingDown, CheckCircle2, Shield, BarChart3 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
          Take Control of Your Finances
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-9 leading-relaxed">
          Your foundation for secure, intelligent financial management. Effortlessly track your income and expenses to achieve your financial goals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/register"
            className="w-full sm:w-auto px-7 py-3.5 bg-[#5E17EB] hover:bg-[#5012cf] text-white font-medium text-sm rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Start Tracking for Free
          </Link>
          <a
            href="#about"
            className="w-full sm:w-auto px-7 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm rounded-lg transition-all flex items-center justify-center gap-2"
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Dashboard Preview Showcase Frame */}
        <div className="relative mx-auto max-w-4xl rounded-2xl border border-gray-200 shadow-2xl overflow-hidden bg-[#F8FAFC]">
          {/* Mockup Header */}
          <div className="h-10 bg-white border-b border-gray-100 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-xs text-gray-400 mx-auto font-medium">Money Manager - Interactive Dashboard</span>
          </div>

          {/* Mini Mock Dashboard */}
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5E17EB] text-white flex items-center justify-center">
                  <Wallet className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Total Balance</p>
                  <p className="text-lg font-bold text-gray-900">₹84,200</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F5132] text-white flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Total Income</p>
                  <p className="text-lg font-bold text-gray-900">₹1,85,000</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#721C24] text-white flex items-center justify-center">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Total Expense</p>
                  <p className="text-lg font-bold text-gray-900">₹1,00,800</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-left">
              <p className="text-sm font-bold text-gray-900 mb-3">Recent Transactions</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">💰</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Freelance</p>
                      <p className="text-[10px] text-gray-400">13th Jul 2025</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
                    + ₹8,000 ↗
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">🚗</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Uber Ride</p>
                      <p className="text-[10px] text-gray-400">12th Jul 2025</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600">
                    - ₹300 ↘
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-[#F8FAFC] border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Money Manager?</h2>
            <p className="text-gray-600">Everything you need to manage your personal finances in one clean, straightforward workspace.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#5E17EB] flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Visual Breakdown</h3>
              <p className="text-sm text-gray-600">Interactive financial overview donut charts and expense trends to understand where your money goes.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Category Management</h3>
              <p className="text-sm text-gray-600">Create, customize, and tag custom income and expense categories with intuitive icons.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-sm text-gray-600">JWT-secured Spring Boot backend with MySQL database ensuring your financial data is protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section / Footer */}
      <footer id="contact" className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 Money Manager. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#about" className="hover:text-gray-900">About</a>
            <a href="#contact" className="hover:text-gray-900">Support</a>
            <Link to="/login" className="hover:text-gray-900">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
