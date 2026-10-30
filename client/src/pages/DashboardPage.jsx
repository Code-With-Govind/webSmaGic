import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  MessageSquare,
  Clock,
  Layers,
  ArrowLeft,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  Lock,
  Globe,
  Share2,
  Calendar,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import useDocumentTitle from '../hooks/useDocumentTitle';
import dashboardService from '../services/dashboardService';

export default function DashboardPage() {
  useDocumentTitle('Business Analytics Dashboard — Founders Portal');

  const [activeTab, setActiveTab] = useState('overview');
  const [period, setPeriod] = useState('7d');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Determine if application is running in production mode
  const isProduction = import.meta.env.PROD;

  const fetchData = useCallback(async () => {
    // If running in production build, enforce Phase 5 security boundary
    if (isProduction) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await dashboardService.getDashboardData(period);
      setData(result);
      setLastRefreshed(new Date());
    } catch (err) {
      setError(
        err.status === 403
          ? 'Dashboard analytics is locked in production pending Phase 5 Founder Authentication & Security.'
          : err.message || 'Failed to connect to backend analytics service.'
      );
    } finally {
      setLoading(false);
    }
  }, [period, isProduction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Production Lockdown View (Strict Phase 4 Boundary)
  if (isProduction || error?.includes('Phase 5')) {
    return (
      <div className="py-24 md:py-36 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-navy-900/90 border border-navy-850 shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-3xl bg-navy-850 text-brand-accent border border-navy-750 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Lock className="w-8 h-8 text-brand-accent" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/20 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Production Security Guard</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Private Founder Dashboard
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              In accordance with architectural specifications, private business telemetry and lead metrics are restricted from public production access until Phase 5 (Two-Founder Authentication & Security) is deployed.
            </p>

            <div className="p-4 rounded-xl bg-navy-950/80 border border-navy-800 text-left text-xs text-slate-400 space-y-2 mb-8">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Sparkles className="w-4 h-4 text-brand-accent" />
                <span>Local Verification Mode</span>
              </div>
              <p>
                To preview the live analytics dashboard with real-time charts and event tracking, run the application in local development mode (<code className="text-brand-accent font-mono">npm run dev</code>).
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

  const overview = data?.overview || {
    totalVisitors: 0,
    totalSessions: 0,
    totalPageViews: 0,
    totalInquiries: 0,
    conversionRate: null,
  };

  const traffic = data?.traffic || [];
  const topPages = data?.pages || [];
  const sources = data?.sources || [];
  const services = data?.services || [];
  const inquiries = data?.inquiries || {
    total: 0,
    byStatus: { new: 0, contacted: 0, 'in-progress': 0, completed: 0, rejected: 0 },
    byContactMethod: [],
  };

  const navTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'traffic', label: 'Traffic Analytics', icon: TrendingUp },
    { id: 'pages', label: 'Top Pages', icon: Eye },
    { id: 'services', label: 'Service Insights', icon: Layers },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col">
      {/* Top Header Bar */}
      <header className="bg-navy-900/90 border-b border-navy-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-750 transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  Business Analytics Dashboard
                </h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-brand-accent border border-blue-500/20">
                  Founder Mode (Development)
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Govind Web Solutions — First-Party Telemetry & Lead Reporting
              </p>
            </div>
          </div>

          {/* Date range controls & refresh */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center bg-navy-950 p-1 rounded-xl border border-navy-800 text-xs">
              {['7d', '30d', '90d'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    period === p
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p === '7d' ? 'Last 7 Days' : p === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
                </button>
              ))}
            </div>

            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-750 transition-colors disabled:opacity-50"
              title="Refresh Analytics"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-56 shrink-0 space-y-2">
          <div className="bg-navy-900/80 border border-navy-800 rounded-2xl p-2 space-y-1">
            {navTabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-navy-850'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-navy-900/50 border border-navy-800 text-[11px] text-slate-400 space-y-2">
            <span className="font-semibold text-slate-300 block">Telemetry Status</span>
            <p>First-party privacy tracking active. IP anonymized.</p>
            <span className="text-[10px] text-slate-500 block">
              Refreshed: {lastRefreshed.toLocaleTimeString()}
            </span>
          </div>
        </aside>

        {/* Dashboard Content Area */}
        <main className="flex-grow space-y-8 min-w-0">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block">Analytics Error</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* OVERVIEW TAB */}
          {(activeTab === 'overview' || activeTab === 'traffic') && (
            <section className="space-y-8">
              {/* Top 5 KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* 1. Total Visitors */}
                <div className="p-5 rounded-2xl bg-navy-900/80 border border-navy-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Unique Visitors
                    </span>
                    <Users className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {loading ? '...' : overview.totalVisitors}
                  </div>
                  <span className="text-[11px] text-slate-500">First-party anonymous</span>
                </div>

                {/* 2. Total Sessions */}
                <div className="p-5 rounded-2xl bg-navy-900/80 border border-navy-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Total Sessions
                    </span>
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {loading ? '...' : overview.totalSessions}
                  </div>
                  <span className="text-[11px] text-slate-500">Session instances</span>
                </div>

                {/* 3. Page Views */}
                <div className="p-5 rounded-2xl bg-navy-900/80 border border-navy-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Page Views
                    </span>
                    <Eye className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {loading ? '...' : overview.totalPageViews}
                  </div>
                  <span className="text-[11px] text-slate-500">Public routes only</span>
                </div>

                {/* 4. Total Inquiries */}
                <div className="p-5 rounded-2xl bg-navy-900/80 border border-navy-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Total Inquiries
                    </span>
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {loading ? '...' : overview.totalInquiries}
                  </div>
                  <span className="text-[11px] text-slate-500">Verified DB records</span>
                </div>

                {/* 5. Conversion Rate */}
                <div className="p-5 rounded-2xl bg-navy-900/80 border border-navy-800">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Conversion Rate
                    </span>
                    <TrendingUp className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    {loading
                      ? '...'
                      : overview.conversionRate !== null
                      ? `${overview.conversionRate}%`
                      : 'N/A'}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    (Inquiries / Visitors) × 100
                  </span>
                </div>
              </div>

              {/* Traffic Trend Chart */}
              <div className="p-6 sm:p-7 rounded-3xl bg-navy-900/80 border border-navy-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Daily Website Traffic Trends
                    </h3>
                    <p className="text-xs text-slate-400">
                      Real-time breakdown of unique visitors, sessions, and total page views
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Period: {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
                  </span>
                </div>

                {traffic.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500 text-xs">
                    <BarChart3 className="w-8 h-8 mb-2 opacity-50" />
                    <span>No traffic recorded for this timeframe yet.</span>
                    <span className="text-[11px] text-slate-600 mt-1">
                      Navigate through public pages to generate telemetry events.
                    </span>
                  </div>
                ) : (
                  <div className="h-72 w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={traffic} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1c2541" />
                        <XAxis
                          dataKey="date"
                          stroke="#64748b"
                          fontSize={11}
                          tickLine={false}
                          tickFormatter={(str) => str.slice(5)}
                        />
                        <YAxis stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0b132b',
                            borderColor: '#1c2541',
                            borderRadius: '12px',
                            color: '#fff',
                            fontSize: '12px',
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                        <Area
                          type="monotone"
                          dataKey="pageViews"
                          name="Page Views"
                          stroke="#2563eb"
                          fillOpacity={1}
                          fill="url(#colorViews)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="visitors"
                          name="Unique Visitors"
                          stroke="#38bdf8"
                          fillOpacity={1}
                          fill="url(#colorVisitors)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* TOP PAGES TAB / PREVIEW */}
          {(activeTab === 'overview' || activeTab === 'pages') && (
            <section className="p-6 sm:p-7 rounded-3xl bg-navy-900/80 border border-navy-800 space-y-4">
              <div className="flex items-center justify-between border-b border-navy-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Top Visited Pages</h3>
                  <p className="text-xs text-slate-400">
                    Content pages attracting the highest attention and unique visitors
                  </p>
                </div>
                {activeTab === 'overview' && (
                  <button
                    onClick={() => setActiveTab('pages')}
                    className="text-xs text-brand-accent hover:underline font-semibold"
                  >
                    View All Pages
                  </button>
                )}
              </div>

              {topPages.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  <span>No page views logged for this timeframe yet.</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-navy-800 text-slate-400 uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">Page Path</th>
                        <th className="py-3 px-4">Total Views</th>
                        <th className="py-3 px-4">Unique Visitors</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-800/60 text-slate-200">
                      {topPages.map((page, idx) => (
                        <tr key={idx} className="hover:bg-navy-850/50 transition-colors">
                          <td className="py-3 px-4 font-mono text-brand-accent">{page.pagePath}</td>
                          <td className="py-3 px-4 font-bold">{page.views}</td>
                          <td className="py-3 px-4 text-slate-300">{page.uniqueVisitors}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* TRAFFIC SOURCES TAB / SECTION */}
          {(activeTab === 'overview' || activeTab === 'traffic') && (
            <section className="p-6 sm:p-7 rounded-3xl bg-navy-900/80 border border-navy-800 space-y-4">
              <div className="border-b border-navy-800 pb-4">
                <h3 className="text-base font-bold text-white">Traffic Acquisition Sources</h3>
                <p className="text-xs text-slate-400">
                  Origin of website visitors based on referrer URLs and UTM campaigns
                </p>
              </div>

              {sources.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  <span>No traffic attribution data recorded yet.</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                  {sources.map((src, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-navy-950/70 border border-navy-800 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-semibold uppercase text-brand-accent tracking-wider text-[11px]">
                          {src.source}
                        </span>
                        <span>{src.percentage}%</span>
                      </div>
                      <div className="text-xl font-bold text-white">{src.count} views</div>
                      <div className="w-full bg-navy-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-primary h-full rounded-full"
                          style={{ width: `${src.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* SERVICE INSIGHTS TAB */}
          {(activeTab === 'overview' || activeTab === 'services') && (
            <section className="p-6 sm:p-7 rounded-3xl bg-navy-900/80 border border-navy-800 space-y-4">
              <div className="border-b border-navy-800 pb-4">
                <h3 className="text-base font-bold text-white">Service Insights & Demand</h3>
                <p className="text-xs text-slate-400">
                  Tracking CTA click interest versus actual inquiries submitted per service category
                </p>
              </div>

              {services.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  <span>No service engagement events recorded for this timeframe yet.</span>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  {services.map((srv, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-navy-950/70 border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <span className="font-semibold text-white text-sm block">
                          {srv.service}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {srv.ctaClicks} CTA clicks recorded
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                          {srv.inquiries} Inquiries
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* INQUIRIES TAB */}
          {(activeTab === 'overview' || activeTab === 'inquiries') && (
            <section className="p-6 sm:p-7 rounded-3xl bg-navy-900/80 border border-navy-800 space-y-4">
              <div className="border-b border-navy-800 pb-4">
                <h3 className="text-base font-bold text-white">Inquiry Pipeline Status</h3>
                <p className="text-xs text-slate-400">
                  Aggregated inquiry states from the persistent MongoDB Inquiry collection
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                {[
                  { key: 'new', label: 'New', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                  { key: 'contacted', label: 'Contacted', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
                  { key: 'in-progress', label: 'In Progress', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                  { key: 'completed', label: 'Completed', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                  { key: 'rejected', label: 'Rejected', color: 'text-slate-400 bg-slate-500/10 border-slate-500/20' },
                ].map((st) => (
                  <div
                    key={st.key}
                    className={`p-4 rounded-xl border text-center ${st.color}`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1">
                      {st.label}
                    </span>
                    <span className="text-2xl font-black">
                      {inquiries.byStatus?.[st.key] || 0}
                    </span>
                  </div>
                ))}
              </div>

              {inquiries.byContactMethod && inquiries.byContactMethod.length > 0 && (
                <div className="pt-4 border-t border-navy-800">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                    Preferred Contact Methods
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {inquiries.byContactMethod.map((m, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-navy-950 border border-navy-800 text-xs text-slate-300"
                      >
                        {m.method}: <strong className="text-white">{m.count}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
