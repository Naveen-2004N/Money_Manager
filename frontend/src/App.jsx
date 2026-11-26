import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import Categories from './pages/Categories';
import Transactions from './pages/Transactions';
import ActivateAccount from './pages/ActivateAccount';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#FFFFFF',
              color: '#0F172A',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
              fontSize: '14px',
              fontWeight: '500',
              padding: '12px 18px',
            },
            success: {
              iconTheme: { primary: '#10B981', secondary: '#FFFFFF' },
            },
            error: {
              iconTheme: { primary: '#EF4444', secondary: '#FFFFFF' },
            },
          }}
        />
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activate" element={<ActivateAccount />} />

          {/* Protected Main App Routes with Navigation Layout */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/categories" element={
            <ProtectedRoute>
              <Layout><Categories /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/income" element={
            <ProtectedRoute>
              <Layout><Income /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/expenses" element={
            <ProtectedRoute>
              <Layout><Expenses /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/transactions" element={
            <ProtectedRoute>
              <Layout><Transactions /></Layout>
            </ProtectedRoute>
          } />

          {/* Catch-all redirect to Landing Page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
