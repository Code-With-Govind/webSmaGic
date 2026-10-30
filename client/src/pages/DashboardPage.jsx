import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldAlert, ArrowLeft, Layers } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function DashboardPage() {
  useDocumentTitle('Founder Portal — Restricted Access');

  return (
    <div className="py-24 md:py-36">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-navy-900/90 border border-navy-800 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-3xl bg-navy-850 text-brand-accent border border-navy-750 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Lock className="w-8 h-8 text-brand-accent" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20 mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Restricted Founder Boundary</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Private Business Analytics Dashboard
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            This administrative route is reserved exclusively for the founders of Govind Web Solutions. Real-time visitor tracking, lead management, conversion analytics, and two-founder authentication will be securely integrated in subsequent phases.
          </p>

          <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-800 text-left text-xs text-slate-400 space-y-2 mb-8">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Layers className="w-4 h-4 text-brand-accent" />
              <span>Scheduled Roadmap</span>
            </div>
            <p>
              • <strong className="text-slate-300">Phase 4:</strong> Analytics Dashboard & Visitor Tracking Engine
            </p>
            <p>
              • <strong className="text-slate-300">Phase 5:</strong> Two-Founder Authentication & Session Security
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white text-sm font-semibold transition-colors shadow-md shadow-brand-primary/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
