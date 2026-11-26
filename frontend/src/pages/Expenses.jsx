import React, { useEffect, useState } from 'react';
import { expenseAPI, categoryAPI } from '../api/services';
import toast from 'react-hot-toast';
import {
  Plus,
  Trash2,
  Loader2,
  X,
  Download,
  Image as ImageIcon,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';

const EXPENSE_ICONS = [
  '🛒', '🍔', '🚗', '💊', '📱', '🎬', '✈️', '🏠', '👕', '⚡',
  '☕', '🏋️', '📚', '🎮', '💡', '🔌', '💻', '🧾', '🍕', '🚕'
];

const AddExpenseModal = ({ onClose, onAdded, categories }) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [form, setForm] = useState({
    name: '',
    amount: '',
    date: today,
    categoryId: categories[0]?.id || '',
    icon: '🛒'
  });
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.amount || !form.categoryId) {
      toast.error('Please enter name, amount, and category');
      return;
    }
    if (form.date > today) {
      toast.error('Date cannot be in the future');
      return;
    }
    setLoading(true);
    try {
      await expenseAPI.addExpense({
        name: form.name.trim(),
        amount: parseFloat(form.amount),
        date: form.date,
        categoryId: parseInt(form.categoryId),
        icon: form.icon,
      });
      toast.success('Expense added successfully', {
        icon: '✅',
        style: {
          background: '#FFFFFF',
          color: '#1E293B',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '9999px',
          padding: '10px 18px',
          fontSize: '14px',
          fontWeight: '600'
        }
      });
      onAdded();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add expense';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl p-6 sm:p-7 w-full max-w-lg shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <h3 className="text-xl font-bold text-gray-900">Add Expense</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pick Icon */}
          <div>
            <div
              onClick={() => setShowIconPicker(!showIconPicker)}
              className="inline-flex items-center gap-3 cursor-pointer p-1 rounded-xl hover:bg-purple-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center text-2xl border border-purple-100 shadow-sm">
                {form.icon || <ImageIcon className="w-6 h-6" />}
              </div>
              <span className="text-sm font-semibold text-gray-800">Pick Icon</span>
            </div>

            {showIconPicker && (
              <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-xl grid grid-cols-6 sm:grid-cols-10 gap-2 max-h-36 overflow-y-auto">
                {EXPENSE_ICONS.map(ic => (
                  <button
                    key={ic}
                    type="button"
                    onClick={() => {
                      setForm({ ...form, icon: ic });
                      setShowIconPicker(false);
                    }}
                    className={`w-9 h-9 text-xl rounded-lg flex items-center justify-center transition-all ${
                      form.icon === ic ? 'bg-purple-200 scale-110 shadow-sm' : 'hover:bg-white'
                    }`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Expense Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g., Electricity, Wifi, Home"
              className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Amount (₹)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                placeholder="0.00"
                className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Date</label>
              <input
                type="date"
                max={today}
                value={form.date}
                onChange={e => {
                  const val = e.target.value;
                  if (val > today) {
                    toast.error('Date cannot be in the future');
                    return;
                  }
                  setForm({ ...form, date: val });
                }}
                className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
            <select
              value={form.categoryId}
              onChange={e => setForm({ ...form, categoryId: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] transition-all"
            >
              <option value="">Select category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#5E17EB] hover:bg-[#5012cf] active:scale-95 text-white text-sm font-semibold rounded-lg shadow-sm transition-all disabled:opacity-75 flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [expRes, catRes] = await Promise.allSettled([
        expenseAPI.getExpenses(),
        categoryAPI.getCategoriesByType('expense')
      ]);
      if (expRes.status === 'fulfilled') setExpenses(expRes.value.data || []);
      if (catRes.status === 'fulfilled') setCategories(catRes.value.data || []);
    } catch {
      toast.error('Failed to load expense records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    setDeletingId(id);
    try {
      await expenseAPI.deleteExpense(id);
      toast.success('Expense deleted successfully');
      setExpenses(prev => prev.filter(e => e.id !== id));
    } catch {
      toast.error('Failed to delete expense');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownloadCSV = () => {
    if (expenses.length === 0) {
      toast.error('No expenses to download');
      return;
    }
    const headers = ['Name,Category,Date,Amount'];
    const rows = expenses.map(e => `"${e.name}","${e.categoryName || ''}","${e.date}","${e.amount}"`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `expenses_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloaded expense spreadsheet');
  };

  // Build chart timeline series matching Screenshot 1
  const chartData = (() => {
    const map = {};
    expenses.forEach(e => {
      const label = e.date ? format(new Date(e.date), 'do MMM') : 'N/A';
      map[label] = (map[label] || 0) + parseFloat(e.amount || 0);
    });
    return Object.entries(map).map(([date, amt]) => ({ date, amount: amt }));
  })();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Card: Expense Overview matching Screenshot 1 & 3 */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Expense Overview</h2>
            <p className="text-xs text-gray-500 mt-1">
              Track your spending trends over time and gain insights into where your money goes.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[#E6F9F0] hover:bg-[#d8f5e7] border border-[#A7F3D0] text-[#059669] text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-all active:scale-95 self-start sm:self-auto shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </button>
        </div>

        {/* Purple Area Trend Chart matching Screenshot 1 */}
        {chartData.length > 0 ? (
          <div className="h-64 sm:h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleExpenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5E17EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#5E17EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" stroke="#94A3B8" tick={{ fill: '#64748B', fontSize: 12 }} />
                <YAxis stroke="#94A3B8" tick={{ fill: '#64748B', fontSize: 12 }} />
                <Tooltip
                  formatter={(val) => `₹${parseFloat(val).toLocaleString('en-IN')}`}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '13px' }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#5E17EB"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#5E17EB', strokeWidth: 2, stroke: '#FFF' }}
                  fill="url(#purpleExpenseGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-44 flex items-center justify-center text-gray-400 text-sm">
            No expense trend data available. Click "+ Add Expense" above to record one.
          </div>
        )}
      </div>

      {/* Bottom Card: All Expenses matching Screenshot 1 & 3 */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm min-h-[300px]">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-50">
          <h3 className="text-base font-bold text-gray-900">All Expenses</h3>
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadCSV}
              className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#5E17EB]" />
            <p className="text-gray-400 text-sm">Loading expenses...</p>
          </div>
        ) : expenses.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            No expenses recorded yet.
          </div>
        ) : (
          /* Grid of expense items matching screenshot */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {expenses.map((expense, idx) => (
              <div
                key={`exp-${expense.id}-${idx}`}
                className="group p-4 rounded-xl border border-transparent hover:border-purple-100 hover:bg-[#F5F3FF] transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-white shadow-xs">
                    {expense.icon || '💸'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{expense.name}</p>
                    <p className="text-xs text-gray-400">
                      {expense.date ? format(new Date(expense.date), 'do MMM yyyy') : 'Recent'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Delete Trash Icon revealed on hover matching screenshot */}
                  <button
                    onClick={() => handleDelete(expense.id)}
                    disabled={deletingId === expense.id}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-rose-600 transition-opacity"
                    title="Delete expense"
                  >
                    {deletingId === expense.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>

                  {/* Red/Pink badge matching screenshot */}
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 inline-flex items-center gap-1 shadow-xs">
                    - ₹{parseFloat(expense.amount).toLocaleString('en-IN')}{' '}
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onAdded={fetchData}
          categories={categories}
        />
      )}
    </div>
  );
};

export default Expenses;
