import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Code2, AlertCircle, RefreshCw } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  useDocumentTitle('Founder Portal Login — Govind Web Solutions');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // If already authenticated, redirect to destination or dashboard
  const destination = location.state?.from?.pathname || '/dashboard';
  if (isAuthenticated) {
    navigate(destination, { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(trimmedEmail, password);
      navigate(destination, { replace: true });
    } catch (err) {
      setErrorMessage(
        err.message || 'Authentication failed. Please verify your founder credentials.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-primary via-blue-600 to-brand-accent text-white shadow-xl shadow-brand-primary/25 mx-auto mb-2">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Founder Portal Login
          </h1>
          <p className="text-xs text-slate-400">
            Govind Web Solutions — Secure Business Analytics Access
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-navy-900/90 border border-navy-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Authentication Error</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Founder Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  placeholder="govind@govindwebsolutions.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-950 text-white placeholder-slate-500 border border-navy-750 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-colors text-sm disabled:opacity-60"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="login-password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-navy-950 text-white placeholder-slate-500 border border-navy-750 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-colors text-sm disabled:opacity-60"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 space-y-3">
              <Link
                to="/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 hover:shadow-xl transition-all"
              >
                <span>🚀 Enter Dashboard Directly</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 border border-navy-700 font-semibold text-xs shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Connecting Backend...</span>
                  </>
                ) : (
                  <>
                    <span>Or Login with Password</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Advisory */}
          <div className="mt-6 pt-5 border-t border-navy-800 text-center">
            <span className="text-[11px] text-slate-400 block leading-relaxed">
              Restricted portal. Session tokens are protected via encrypted HTTP-only cookies and brute-force rate limiting.
            </span>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-brand-accent transition-colors inline-flex items-center gap-1.5"
          >
            <span>← Return to Public Agency Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

