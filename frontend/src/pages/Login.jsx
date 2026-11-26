import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/services';
import toast from 'react-hot-toast';
import PublicNavbar from '../components/PublicNavbar';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2, KeyRound, X } from 'lucide-react';

const ResetPasswordModal = ({ onClose, onSuccess, initialEmail }) => {
  const [email, setEmail] = useState(initialEmail || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email || !newPassword) {
      toast.error('Please enter email and new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await authAPI.resetPassword({ email, newPassword });
      toast.success(res.data?.Message || 'Password reset successfully! You can now log in.');
      onSuccess(email, newPassword);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.Message || err.response?.data?.message || 'Password reset failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#5E17EB] flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-gray-900 text-lg font-bold">Reset Password</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Account Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-[#5E17EB] hover:bg-[#5012cf] text-white text-sm font-semibold shadow-md disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Set Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in email and password');
      return;
    }
    setLoading(true);
    try {
      const res = await authAPI.login({
        email: form.email.trim(),
        password: form.password,
      });
      const { token, user } = res.data;
      login(token, user);
      toast.success(`Welcome back, ${user.fullName || 'User'}! 🎉`);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.Message || err.response?.data?.message || 'Invalid email or password';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-100">
      <PublicNavbar />

      {/* Blurred background */}
      <div
        className="absolute inset-0 top-16 z-0 bg-cover bg-center pointer-events-none filter blur-[3px] opacity-35"
        style={{
          backgroundImage: `radial-gradient(#818cf8 1px, transparent 1px), radial-gradient(#c084fc 1px, #f1f5f9 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-6 sm:my-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
              Sign in to manage your finances
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
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

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs text-[#5E17EB] hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#5E17EB] hover:bg-[#5012cf] active:scale-98 text-white font-bold text-sm tracking-wider uppercase rounded-lg shadow-md transition-all disabled:opacity-75 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing In...
                </>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-gray-900 hover:text-[#5E17EB] underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>

      {showForgotModal && (
        <ResetPasswordModal
          initialEmail={form.email}
          onClose={() => setShowForgotModal(false)}
          onSuccess={(em, pwd) => {
            setForm({ email: em, password: pwd });
          }}
        />
      )}
    </div>
  );
};

export default Login;
