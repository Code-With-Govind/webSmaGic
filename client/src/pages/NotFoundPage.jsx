import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Code2 } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('404 — Page Not Found');

  return (
    <div className="py-24 md:py-36">
      <div className="max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold border border-red-500/20">
          <Code2 className="w-3.5 h-3.5" />
          <span>Error 404 — Resource Not Located</span>
        </div>

        <h1 className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-brand-accent to-cyan-400 tracking-tight">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Page Does Not Exist
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md mx-auto">
          The requested page or endpoint could not be found. It may have been moved, renamed, or is currently under architectural development.
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white text-sm font-semibold transition-colors shadow-lg shadow-brand-primary/25"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-200 text-sm font-semibold border border-navy-750 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
