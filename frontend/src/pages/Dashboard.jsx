import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../api/services';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Loader2,
  Coins,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { format } from 'date-fns';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredSlice, setHoveredSlice] = useState(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await dashboardAPI.getDashboard();
      setData(res.data);
    } catch {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-[#5E17EB]" />
        <p className="text-gray-500 text-sm font-medium">Loading your financial dashboard...</p>
      </div>
    );
  }

  const {
    totalBalance = 0,
    totalIncome = 0,
    totalExpense = 0,
    recentTransactions = [],
    recent5Expenses = [],
    recent5Incomes = []
  } = data || {};

  // Donut chart data matching screenshots
  // Purple = Total Balance, Red = Total Expenses, Green = Total Income
  const numBalance = Math.max(0, parseFloat(totalBalance || 0));
  const numExpense = parseFloat(totalExpense || 0);
  const numIncome = parseFloat(totalIncome || 0);

  const chartData = [
    { name: 'Total Balance', value: numBalance, color: '#5E17EB' },
    { name: 'Total Expenses', value: numExpense, color: '#991B1B' },
    { name: 'Total Income', value: numIncome, color: '#0F5132' },
  ].filter(d => d.value > 0);

  // If all values are 0, show default gray ring
  const hasChartData = chartData.length > 0;
  const emptyChartData = [{ name: 'Zero', value: 1, color: '#E2E8F0' }];

  const formatCurrency = (val) => {
    const num = parseFloat(val || 0);
    return '₹' + num.toLocaleString('en-IN');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top 3 Stat Cards matching screenshot exactly */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Total Balance Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#5E17EB] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-0.5">Total Balance</p>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">
              {formatCurrency(totalBalance)}
            </p>
          </div>
        </div>

        {/* Total Income Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#0F5132] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-0.5">Total Income</p>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">
              {formatCurrency(totalIncome)}
            </p>
          </div>
        </div>

        {/* Total Expense Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#721C24] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 mb-0.5">Total Expense</p>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">
              {formatCurrency(totalExpense)}
            </p>
          </div>
        </div>
      </div>

      {/* Middle Row: Recent Transactions + Financial Overview Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Transactions Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-base sm:text-lg text-gray-900">Recent Transactions</h3>
              <Link
                to="/transactions"
                className="px-3 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
              >
                More →
              </Link>
            </div>

            {recentTransactions.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-sm">No transactions added yet.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {recentTransactions.slice(0, 5).map((tx, idx) => (
                  <div
                    key={`${tx.type || 'tx'}-${tx.id}-${idx}`}
                    className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                        {tx.icon || (tx.type === 'income' ? '💰' : '💸')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{tx.name}</p>
                        <p className="text-xs text-gray-400">
                          {tx.date ? format(new Date(tx.date), 'do MMM yyyy') : 'Recent'}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        tx.type === 'income'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {tx.type === 'income' ? '+' : '-'} ₹{parseFloat(tx.amount).toLocaleString('en-IN')}{' '}
                      {tx.type === 'income' ? (
                        <ArrowUpRight className="w-3.5 h-3.5 inline" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 inline" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Financial Overview Donut Chart Card matching screenshot */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-base sm:text-lg text-gray-900">Financial Overview</h3>
          </div>

          {/* Donut Chart with Center Balance Text */}
          <div className="relative w-full h-64 sm:h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={hasChartData ? chartData : emptyChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={105}
                  paddingAngle={hasChartData ? 3 : 0}
                  dataKey="value"
                  strokeWidth={0}
                  onMouseEnter={(_, index) => {
                    if (hasChartData && chartData[index]) {
                      setHoveredSlice(chartData[index]);
                    }
                  }}
                  onMouseLeave={() => setHoveredSlice(null)}
                >
                  {(hasChartData ? chartData : emptyChartData).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="cursor-pointer transition-opacity duration-150"
                      opacity={hoveredSlice && hoveredSlice.name !== entry.name ? 0.45 : 1}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Centered Dynamic Balance / Slice Display - No Overlapping Tooltip */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-150">
              <span
                className="text-xs font-semibold tracking-wide transition-colors duration-150"
                style={{ color: hoveredSlice ? hoveredSlice.color : '#64748B' }}
              >
                {hoveredSlice ? hoveredSlice.name : 'Total Balance'}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-0.5 transition-all duration-150">
                {formatCurrency(hoveredSlice ? hoveredSlice.value : totalBalance)}
              </span>
            </div>
          </div>

          {/* Bottom Dot Legend matching screenshot */}
          <div className="flex items-center justify-center gap-6 pt-2 border-t border-gray-50 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5E17EB]" />
              <span>Total Balance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#991B1B]" />
              <span>Total Expenses</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F5132]" />
              <span>Total Income</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Expenses + Recent Incomes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Expenses */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-gray-900">Recent Expenses</h3>
            <Link
              to="/expenses"
              className="px-3 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
            >
              More →
            </Link>
          </div>
          {recent5Expenses.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs">No recent expenses logged.</div>
          ) : (
            <div className="space-y-2.5">
              {recent5Expenses.map((e, idx) => (
                <div key={`exp-${e.id}-${idx}`} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{e.icon || '💸'}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{e.name}</p>
                      <p className="text-[10px] text-gray-400">{e.date ? format(new Date(e.date), 'do MMM yyyy') : 'Recent'}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600">
                    - ₹{parseFloat(e.amount).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Incomes */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-gray-900">Recent Incomes</h3>
            <Link
              to="/income"
              className="px-3 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
            >
              More →
            </Link>
          </div>
          {recent5Incomes.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs">No recent incomes logged.</div>
          ) : (
            <div className="space-y-2.5">
              {recent5Incomes.map((inc, idx) => (
                <div key={`inc-${inc.id}-${idx}`} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{inc.icon || '💰'}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{inc.name}</p>
                      <p className="text-[10px] text-gray-400">{inc.date ? format(new Date(inc.date), 'do MMM yyyy') : 'Recent'}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
                    + ₹{parseFloat(inc.amount).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
