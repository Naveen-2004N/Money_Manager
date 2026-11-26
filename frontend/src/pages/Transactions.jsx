import React, { useState } from 'react';
import { filterAPI } from '../api/services';
import toast from 'react-hot-toast';
import {
  Search,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw
} from 'lucide-react';
import { format } from 'date-fns';

const Transactions = () => {
  const [filters, setFilters] = useState({
    type: 'Income',
    startDate: '',
    endDate: '',
    sortField: 'Date',
    sortOrder: 'Ascending',
    keyword: '',
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      // Map UI values to backend expected params
      const payload = {
        type: filters.type.toLowerCase(),
        startDate: filters.startDate || null,
        endDate: filters.endDate || null,
        sortField: filters.sortField.toLowerCase() === 'amount' ? 'amount' : 'date',
        sortOrder: filters.sortOrder === 'Ascending' ? 'asc' : 'desc',
        keyword: filters.keyword.trim() || null,
      };

      const res = await filterAPI.filterTransactions(payload);
      const data = res.data || [];
      // Attach transaction type for display styling
      const mapped = data.map(item => ({
        ...item,
        transactionType: filters.type.toLowerCase(),
      }));
      setResults(mapped);

      if (mapped.length === 0) {
        toast('No transactions match the selected filters', {
          icon: 'ℹ️',
          style: {
            background: '#FFFFFF',
            color: '#1E293B',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: '9999px',
            fontSize: '13px'
          }
        });
      }
    } catch (err) {
      toast.error('Failed to filter transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      type: 'Income',
      startDate: '',
      endDate: '',
      sortField: 'Date',
      sortOrder: 'Ascending',
      keyword: '',
    });
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Title matching Screenshot 2 */}
      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
        Filter Transactions
      </h1>

      {/* Filter Card matching Screenshot 2 */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5 pb-1">
          <h2 className="text-base font-bold text-gray-900">Select the filters</h2>
          {searched && (
            <button
              onClick={handleReset}
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>

        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
            {/* Type */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] transition-all"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] transition-all"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                End Date
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] transition-all"
              />
            </div>

            {/* Sort Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Sort Field
              </label>
              <select
                value={filters.sortField}
                onChange={(e) => setFilters({ ...filters, sortField: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] transition-all"
              >
                <option value="Date">Date</option>
                <option value="Amount">Amount</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Sort Order
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] transition-all"
              >
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </select>
            </div>

            {/* Search Input + Purple Search Button */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Search
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={filters.keyword}
                  onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="h-[38px] px-3.5 bg-[#5E17EB] hover:bg-[#5012cf] active:scale-95 text-white rounded-lg flex items-center justify-center transition-all flex-shrink-0 disabled:opacity-75 shadow-sm"
                  title="Search"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Transactions Results Card matching Screenshot 2 */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm min-h-[300px]">
        <h2 className="text-base font-bold text-gray-900 mb-4">Transactions</h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#5E17EB]" />
            <p className="text-gray-400 text-sm">Filtering transactions...</p>
          </div>
        ) : !searched ? (
          /* Empty prompt matching Screenshot 2 */
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400 text-sm text-center">
              Select the filters and click apply to filter the transactions
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-gray-400 text-sm">
              No transactions match the selected filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((tx, idx) => {
              const isIncome = (tx.transactionType || filters.type.toLowerCase()) === 'income';
              const amt = parseFloat(tx.amount || 0);

              return (
                <div
                  key={`${tx.transactionType || (isIncome ? 'inc' : 'exp')}-${tx.id}-${idx}`}
                  className={`p-4 rounded-xl border border-gray-100 flex items-center justify-between transition-all ${
                    isIncome ? 'hover:bg-[#F0FDF4]' : 'hover:bg-[#F5F3FF]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0 shadow-xs">
                      {tx.icon || (isIncome ? '💰' : '💸')}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {tx.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {tx.date ? format(new Date(tx.date), 'do MMM yyyy') : 'Recent'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isIncome ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 inline-flex items-center gap-1 shadow-xs">
                        + ₹{amt.toLocaleString('en-IN')}{' '}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 inline-flex items-center gap-1 shadow-xs">
                        - ₹{amt.toLocaleString('en-IN')}{' '}
                        <ArrowDownRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
