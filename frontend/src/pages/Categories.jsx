import React, { useEffect, useState } from 'react';
import { categoryAPI } from '../api/services';
import toast from 'react-hot-toast';
import { Plus, Pencil, X, Loader2, Image as ImageIcon } from 'lucide-react';

const CATEGORY_ICONS = [
  '💰', '💵', '💼', '📈', '🏦', '💳', '🎁', '⚡', '🏠', '🛒',
  '🍔', '🚗', '💊', '📱', '🎬', '✈️', '👕', '☕', '🍕', '📚',
  '🎮', '🏋️', '🔌', '💻', '💡', '🛠️', '🧾', '🏖️', '💎', '🪙'
];

const CategoryModal = ({ onClose, onSaved, existing }) => {
  const [form, setForm] = useState({
    name: existing?.name || '',
    type: existing?.type || 'Income',
    icon: existing?.icon || '🏷️'
  });
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Please enter category name');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        type: form.type.toLowerCase(),
        icon: form.icon,
      };

      if (existing) {
        await categoryAPI.updateCategory(existing.id, payload);
        toast.success('Category updated successfully');
      } else {
        await categoryAPI.saveCategory(payload);
        toast.success('Category added successfully', {
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
      }
      onSaved();
      onClose();
    } catch {
      toast.error('Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl p-6 sm:p-7 w-full max-w-lg shadow-2xl border border-gray-100">
        {/* Modal Header matching screenshot */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <h3 className="text-xl font-bold text-gray-900">
            {existing ? 'Edit Category' : 'Add Category'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Pick Icon Section matching screenshot */}
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

            {/* Icon Picker Popover */}
            {showIconPicker && (
              <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-xl grid grid-cols-6 sm:grid-cols-10 gap-2 max-h-40 overflow-y-auto">
                {CATEGORY_ICONS.map(ic => (
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

          {/* Category Name Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Category Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g., Freelance, Salary, Groceries"
              className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
            />
          </div>

          {/* Category Type Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Category Type
            </label>
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          {/* Action Button on Bottom Right matching screenshot */}
          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#5E17EB] hover:bg-[#5012cf] active:scale-95 text-white text-sm font-semibold rounded-lg shadow-sm transition-all disabled:opacity-75 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : existing ? (
                'Save Changes'
              ) : (
                'Add Category'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoryAPI.getCategories();
      setCategories(res.data || []);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header matching screenshot */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">All Categories</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-[#E6F9F0] hover:bg-[#d8f5e7] border border-[#A7F3D0] text-[#059669] text-sm font-semibold rounded-lg flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Main Category Sources Card matching screenshot */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm min-h-[400px]">
        <h3 className="text-base font-bold text-gray-900 mb-6">Category Sources</h3>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#5E17EB]" />
            <p className="text-gray-400 text-sm">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          /* Empty state matching screenshot 3 */
          <div className="py-8 text-gray-400 text-sm">
            No categories added yet. Add some to get started!
          </div>
        ) : (
          /* Populated Grid matching screenshot 4 */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, idx) => (
              <div
                key={`cat-${cat.id}-${idx}`}
                className="group p-4 rounded-xl border border-transparent hover:border-purple-100 hover:bg-[#F5F3FF] transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-white shadow-xs">
                    {cat.icon || '🏷️'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{cat.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{cat.type}</p>
                  </div>
                </div>

                {/* Edit Pencil icon shown on hover matching screenshot */}
                <button
                  onClick={() => {
                    setEditing(cat);
                    setShowModal(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-[#5E17EB] transition-opacity"
                  title="Edit category"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <CategoryModal
          onClose={() => {
            setShowModal(false);
            setEditing(null);
          }}
          onSaved={fetchCategories}
          existing={editing}
        />
      )}
    </div>
  );
};

export default Categories;
