import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/services';
import toast from 'react-hot-toast';
import PublicNavbar from '../components/PublicNavbar';
import { Eye, EyeOff, User, Upload, Trash2, Loader2 } from 'lucide-react';

const Register = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = (e) => {
    e.stopPropagation();
    setAvatarPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await authAPI.register({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        profileImageUrl: avatarPreview || null,
      });
      toast.success('Account created successfully! Please sign in.', { icon: '🎉' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error('This email is already registered! Please sign in.', { icon: '⚠️' });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const msg = err.response?.data?.message || err.response?.data?.detail || err.response?.data?.Message || 'Registration failed.';
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-100">
      <PublicNavbar />

      {/* Currency Notes Pattern Blurred Background matching screenshots */}
      <div
        className="absolute inset-0 top-16 z-0 bg-cover bg-center pointer-events-none filter blur-[3px] opacity-35"
        style={{
          backgroundImage: `radial-gradient(#818cf8 1px, transparent 1px), radial-gradient(#c084fc 1px, #f1f5f9 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-6 sm:my-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Create An Account
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
              Start tracking your spendings by joining with us.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Circular Avatar Upload matching screenshot */}
            <div className="flex flex-col items-center justify-center mb-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative w-20 h-20 rounded-full bg-[#EDE9FE] border-2 border-[#DDD6FE] flex items-center justify-center cursor-pointer hover:bg-purple-100 transition-all shadow-sm overflow-visible"
              >
                {avatarPreview ? (
                  <>
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                    {/* Delete badge */}
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md border-2 border-white transition-all"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <User className="w-9 h-9 text-[#7C3AED]" />
                    {/* Upload badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white text-[#7C3AED] border border-gray-200 flex items-center justify-center shadow-sm">
                      <Upload className="w-3 h-3" />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 2-column: Full Name & Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Jhon Doe"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 rounded-lg pl-3.5 pr-10 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button matching screenshot */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#5E17EB] hover:bg-[#5012cf] active:scale-98 text-white font-bold text-sm tracking-wider uppercase rounded-lg shadow-md transition-all disabled:opacity-75 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing Up...
                </>
              ) : (
                'SIGN UP'
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-xs text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-gray-900 hover:text-[#5E17EB] underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
