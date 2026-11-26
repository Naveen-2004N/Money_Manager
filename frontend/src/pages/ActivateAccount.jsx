import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/services';
import toast from 'react-hot-toast';
import { Loader2, Wallet } from 'lucide-react';

const ActivateAccount = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast.error('Invalid activation link');
      navigate('/login');
      return;
    }
    authAPI.activateAccount(token)
      .then((res) => {
        toast.success(res.data || 'Account activated successfully!');
        setTimeout(() => navigate('/login'), 2500);
      })
      .catch(() => {
        toast.error('Activation failed or link expired');
        setTimeout(() => navigate('/login'), 2500);
      });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl animate-bounce">
          <Wallet className="w-10 h-10 text-white" />
        </div>
        <div>
          <h2 className="text-white text-3xl font-bold">Activating Account...</h2>
          <p className="text-slate-400 mt-2">Please wait while we verify your email</p>
        </div>
        <Loader2 className="w-10 h-10 text-purple-400 animate-spin mx-auto" />
      </div>
    </div>
  );
};

export default ActivateAccount;
