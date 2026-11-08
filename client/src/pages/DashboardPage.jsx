import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  LogOut,
  Calendar,
  Sparkles,
  User,
  Mail,
  Phone,
  MessageCircle,
  Search,
  Filter,
  X,
  Check,
  ChevronDown,
  ExternalLink,
  Send,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import useDocumentTitle from '../hooks/useDocumentTitle';
import dashboardService from '../services/dashboardService';
import inquiryService from '../services/inquiryService';
import { useAuth } from '../context/AuthContext';
import { COMPANY_CONFIG } from '../utils/agencyData';

export default function DashboardPage() {
  useDocumentTitle('Business Analytics & Lead CRM — Founders Portal');
  const navigate = useNavigate();
  const { founder, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [period, setPeriod] = useState('7d');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Inquiries / Lead Management Feed State
  const [inquiriesList, setInquiriesList] = useState([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [inquiryFilterStatus, setInquiryFilterStatus] = useState('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [selectedInquiryDetail, setSelectedInquiryDetail] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [statusFeedback, setStatusFeedback] = useState(null);

  // Fetch complete analytics data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await dashboardService.getDashboardData(period);
      setData(result);
      setLastRefreshed(new Date());
    } catch (err) {
      if (err.status === 401) {
        await logout();
        navigate('/login', { replace: true });
        return;
      }
      setError(err.message || 'Failed to connect to backend analytics service.');
    } finally {
      setLoading(false);
    }
  }, [period, logout, navigate]);

  // Fetch individual inquiries list (CRM feed)
  const fetchInquiries = useCallback(async () => {
    setInquiriesLoading(true);
    try {
      const result = await inquiryService.getInquiriesList({
        status: inquiryFilterStatus,
        search: inquirySearch,
      });
      setInquiriesList(result.data?.inquiries || []);
    } catch (err) {
      if (err.status === 401) {
        await logout();
        navigate('/login', { replace: true });
      }
    } finally {
      setInquiriesLoading(false);
    }
  }, [inquiryFilterStatus, inquirySearch, logout, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  // Live status update handler
  const handleStatusChange = async (inquiryId, newStatus) => {
    setUpdatingStatusId(inquiryId);
    setStatusFeedback(null);
    try {
      await inquiryService.updateStatus(inquiryId, newStatus);
      
      // Update local inquiries list
      setInquiriesList((prev) =>
        prev.map((inq) => (inq._id === inquiryId ? { ...inq, status: newStatus } : inq))
      );

      // Update selected modal inquiry if open
      if (selectedInquiryDetail?._id === inquiryId) {
        setSelectedInquiryDetail((prev) => ({ ...prev, status: newStatus }));
      }

      // Re-fetch overview counters in the background
      dashboardService.getDashboardData(period).then((res) => {
        setData((prev) => ({ ...prev, inquiries: res.inquiries, overview: res.overview }));
      }).catch(() => {});

      setStatusFeedback(`Status updated to "${newStatus}"`);
      setTimeout(() => setStatusFeedback(null), 3500);
    } catch (err) {
      alert(err.message || 'Failed to update status.');
    } finally {
      setUpdatingStatusId(null);
    }
  };

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
    { id: 'inquiries', label: 'Inquiries & CRM', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col">
      {/* Top Header Bar */}
      <header className="bg-navy-900/90 border-b border-navy-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
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
                  Business Analytics & CRM Portal
                </h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Authenticated Session
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Govind Web Solutions — First-Party Telemetry & Real-Time Lead Pipeline
              </p>
            </div>
          </div>

          {/* Right Controls: Founder badge, Date range, Refresh, Logout */}
          <div className="flex items-center gap-3">
            {/* Authenticated Founder Info */}
            <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-navy-950 border border-navy-800 text-xs">
              <div className="w-6 h-6 rounded-lg bg-brand-primary/20 text-brand-accent flex items-center justify-center font-bold text-[10px]">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <span className="text-white font-semibold block leading-tight">
                  {founder?.name || 'Authorized Founder'}
                </span>
                <span className="text-[10px] text-slate-400 block leading-tight">
                  {founder?.email || ''}
                </span>
              </div>
            </div>

            {/* Date Range Selector */}
            <div className="hidden sm:flex items-center bg-navy-950 p-1 rounded-xl border border-navy-800 text-xs">
              {['7d', '30d', '90d'].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    period === p
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => {
                fetchData();
                fetchInquiries();
              }}
              disabled={loading || inquiriesLoading}
              className="p-2.5 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-750 transition-colors disabled:opacity-50"
              title="Refresh Data"
              aria-label="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading || inquiriesLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/20 text-xs font-semibold transition-colors"
              title="End Secure Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-navy-850 scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-brand-primary text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-accent' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.id === 'inquiries' && inquiries.byStatus?.new > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold">
                    {inquiries.byStatus.new}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* Status update feedback alert */}
        {statusFeedback && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between shadow-lg animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{statusFeedback}</span>
            </div>
            <button onClick={() => setStatusFeedback(null)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block">Notice</span>
              <p className="text-xs text-amber-300/90">{error}</p>
            </div>
          </div>
        )}

        {/* Dynamic Tab Views */}
        <main className="space-y-8">
          {/* OVERVIEW TAB */}
          {(activeTab === 'overview' || activeTab === 'traffic') && (
            <>
              {/* Metric Summary Cards */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Unique Visitors */}
                <div className="p-6 rounded-3xl bg-navy-900/80 border border-navy-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs uppercase font-bold tracking-wider">Unique Visitors</span>
                    <Users className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    {Number(overview?.totalVisitors || 0).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Calculated over selected {period === '7d' ? '7 days' : period === '30d' ? '30 days' : '90 days'}
                  </div>
                </div>

                {/* Total Page Views */}
                <div className="p-6 rounded-3xl bg-navy-900/80 border border-navy-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs uppercase font-bold tracking-wider">Total Page Views</span>
                    <Eye className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    {Number(overview?.totalPageViews || 0).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {overview?.totalSessions ?? 0} distinct sessions logged
                  </div>
                </div>

                {/* Total Inquiries */}
                <div className="p-6 rounded-3xl bg-navy-900/80 border border-navy-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs uppercase font-bold tracking-wider">Project Inquiries</span>
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    {Number(overview?.totalInquiries || 0).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span>{inquiries.byStatus?.new || 0} pending review</span>
                  </div>
                </div>

                {/* Conversion Rate */}
                <div className="p-6 rounded-3xl bg-navy-900/80 border border-navy-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs uppercase font-bold tracking-wider">Conversion Rate</span>
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-3xl font-extrabold text-white">
                    {overview.conversionRate !== null ? `${overview.conversionRate}%` : 'N/A'}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Inquiries / Unique Visitors
                  </div>
                </div>
              </section>

              {/* Traffic Area Chart */}
              <section className="p-6 sm:p-7 rounded-3xl bg-navy-900/80 border border-navy-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Website Traffic Dynamics</h3>
                    <p className="text-xs text-slate-400">
                      Daily page views and unique visitor telemetry
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {traffic.length} data points
                  </span>
                </div>

                <div className="h-72 w-full pt-4">
                  {traffic.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                      <span>No traffic events logged for this timeframe yet.</span>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={traffic} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                          </linearGradient>
                          <linearGradient id="visitorsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1c2541" />
                        <XAxis
                          dataKey="date"
                          stroke="#64748b"
                          fontSize={11}
                          tickLine={false}
                          tickFormatter={(str) => (typeof str === 'string' && str.length >= 5 ? str.slice(5) : str || '')}
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
                          stroke="#3b82f6"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#viewsGrad)"
                        />
                        <Area
                          type="monotone"
                          dataKey="visitors"
                          name="Unique Visitors"
                          stroke="#06b6d4"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#visitorsGrad)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </section>
            </>
          )}

          {/* TOP PAGES TAB */}
          {(activeTab === 'overview' || activeTab === 'pages') && (
            <section className="p-6 sm:p-7 rounded-3xl bg-navy-900/80 border border-navy-800 space-y-4">
              <div className="border-b border-navy-800 pb-4">
                <h3 className="text-base font-bold text-white">Most Visited Pages</h3>
                <p className="text-xs text-slate-400">
                  Ranking routes by total views and distinct visitor engagement
                </p>
              </div>

              {topPages.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  <span>No route view records available.</span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-navy-800 text-slate-400">
                        <th className="pb-3 font-semibold">Page Route</th>
                        <th className="pb-3 font-semibold text-right">Views</th>
                        <th className="pb-3 font-semibold text-right">Unique Visitors</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-850">
                      {topPages.map((page, idx) => (
                        <tr key={idx} className="hover:bg-navy-850/40">
                          <td className="py-3 font-mono text-slate-200">{page.pagePath}</td>
                          <td className="py-3 text-right font-bold text-white">{page.views}</td>
                          <td className="py-3 text-right text-brand-accent">{page.uniqueVisitors}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* TRAFFIC SOURCES TAB */}
          {activeTab === 'traffic' && (
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
                <h3 className="text-base font-bold text-white">Service Demand & Engagement</h3>
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

          {/* INQUIRIES & LEAD MANAGEMENT MINI-CRM (PHASE E) */}
          {(activeTab === 'overview' || activeTab === 'inquiries') && (
            <section className="p-6 sm:p-8 rounded-3xl bg-navy-900/80 border border-navy-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-800 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">Lead Inquiries & Customer Pipeline</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-brand-accent border border-blue-500/30">
                      Live CRM Feed
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Persistent inquiries from prospective clients with one-click follow-up actions
                  </p>
                </div>

                {/* Filter and Search Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search name, company, email..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl bg-navy-950 text-xs text-white placeholder-slate-500 border border-navy-750 focus:border-brand-primary focus:outline-none w-48 sm:w-60"
                    />
                  </div>

                  {/* Status Dropdown Filter */}
                  <div className="flex items-center gap-1.5 bg-navy-950 px-2 py-1.5 rounded-xl border border-navy-750 text-xs">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={inquiryFilterStatus}
                      onChange={(e) => setInquiryFilterStatus(e.target.value)}
                      className="bg-transparent text-white text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Statuses</option>
                      <option value="new">New ({inquiries.byStatus?.new || 0})</option>
                      <option value="contacted">Contacted ({inquiries.byStatus?.contacted || 0})</option>
                      <option value="in-progress">In Progress ({inquiries.byStatus?.['in-progress'] || 0})</option>
                      <option value="completed">Completed ({inquiries.byStatus?.completed || 0})</option>
                      <option value="rejected">Rejected ({inquiries.byStatus?.rejected || 0})</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Status KPI Pills (Clickable Filters) */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { key: 'new', label: 'New Leads', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                  { key: 'contacted', label: 'Contacted', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
                  { key: 'in-progress', label: 'In Progress', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
                  { key: 'completed', label: 'Closed / Completed', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                  { key: 'rejected', label: 'Rejected', color: 'text-slate-400 bg-slate-500/10 border-slate-500/20' },
                ].map((st) => (
                  <button
                    key={st.key}
                    onClick={() => setInquiryFilterStatus(inquiryFilterStatus === st.key ? 'all' : st.key)}
                    className={`p-3.5 rounded-2xl border text-center transition-all ${st.color} ${
                      inquiryFilterStatus === st.key ? 'ring-2 ring-white/40 scale-[1.02]' : 'hover:opacity-90'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1">
                      {st.label}
                    </span>
                    <span className="text-xl font-black">
                      {inquiries.byStatus?.[st.key] || 0}
                    </span>
                  </button>
                ))}
              </div>

              {/* Inquiries Live Table */}
              {inquiriesLoading ? (
                <div className="text-center py-12 text-slate-400 text-xs flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-brand-accent" />
                  <span>Loading inquiries pipeline...</span>
                </div>
              ) : inquiriesList.length === 0 ? (
                <div className="text-center py-14 p-6 rounded-2xl bg-navy-950/60 border border-navy-800 text-xs text-slate-400 space-y-2">
                  <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="font-semibold text-slate-300">No customer inquiries found for this filter.</p>
                  <p className="text-[11px] text-slate-500">
                    When visitors submit the contact form, inquiries will appear here immediately for review.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-navy-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-navy-950/90 text-slate-400 uppercase tracking-wider text-[10px] border-b border-navy-800">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Client & Business</th>
                        <th className="py-3 px-4 font-semibold">Service & Budget</th>
                        <th className="py-3 px-4 font-semibold">Quick Channels</th>
                        <th className="py-3 px-4 font-semibold">Date</th>
                        <th className="py-3 px-4 font-semibold">Status Workflow</th>
                        <th className="py-3 px-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-850 bg-navy-900/60">
                      {inquiriesList.map((inq) => {
                        const statusColors = {
                          new: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                          contacted: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
                          'in-progress': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                          completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                          rejected: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
                        };

                        const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');

                        return (
                          <tr key={inq._id} className="hover:bg-navy-850/50 transition-colors">
                            {/* Client & Company */}
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-white text-sm block">
                                {inq.fullName}
                              </span>
                              <span className="text-slate-400 text-[11px] block">
                                {inq.company || 'Individual / Personal'}
                              </span>
                            </td>

                            {/* Service & Budget */}
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-brand-accent block truncate max-w-[180px]">
                                {inq.service}
                              </span>
                              <span className="text-slate-400 text-[11px] block">
                                {inq.budget || 'Budget not specified'}
                              </span>
                            </td>

                            {/* Quick Action Contact Channels */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <a
                                  href={`mailto:${inq.email}?subject=${encodeURIComponent(`Govind Web Solutions — Regarding your ${inq.service} Inquiry`)}`}
                                  className="p-1.5 rounded-lg bg-navy-800 text-slate-300 hover:text-white hover:bg-brand-primary transition-colors"
                                  title={`Email: ${inq.email}`}
                                  aria-label="Email Client"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>

                                {cleanPhone ? (
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${inq.fullName}, Govind Rathod from Govind Web Solutions here. Thank you for reaching out regarding your ${inq.service} project!`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                                    title={`Chat on WhatsApp: ${inq.phone}`}
                                    aria-label="WhatsApp Client"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                ) : (
                                  <span className="text-[10px] text-slate-500">No phone</span>
                                )}
                              </div>
                            </td>

                            {/* Submission Date */}
                            <td className="py-3.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                              {inq.createdAt
                                ? new Date(inq.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })
                                : 'Recent'}
                            </td>

                            {/* Live Status Selector */}
                            <td className="py-3.5 px-4">
                              <select
                                value={inq.status}
                                onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                                disabled={updatingStatusId === inq._id}
                                className={`text-[11px] font-semibold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                                  statusColors[inq.status] || 'bg-navy-950 text-white'
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </td>

                            {/* Actions Button */}
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => setSelectedInquiryDetail(inq)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 hover:text-white text-xs font-semibold transition-colors"
                              >
                                <span>Inspect</span>
                                <ExternalLink className="w-3 h-3 text-brand-accent" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}
        </main>
      </div>

      {/* INQUIRY DETAIL MODAL */}
      {selectedInquiryDetail && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl rounded-3xl bg-navy-900 border border-navy-750 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-navy-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-brand-accent block mb-1">
                  Customer Project Scope Review
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {selectedInquiryDetail.fullName}
                </h3>
                <span className="text-xs text-slate-400">
                  {selectedInquiryDetail.company || 'Independent Business Client'}
                </span>
              </div>
              <button
                onClick={() => setSelectedInquiryDetail(null)}
                className="p-2 rounded-xl bg-navy-850 hover:bg-navy-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-navy-950/70 border border-navy-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Service</span>
                <span className="font-semibold text-brand-accent">{selectedInquiryDetail.service}</span>
              </div>
              <div className="p-3 rounded-xl bg-navy-950/70 border border-navy-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Budget</span>
                <span className="font-semibold text-white">{selectedInquiryDetail.budget || 'Not specified'}</span>
              </div>
              <div className="p-3 rounded-xl bg-navy-950/70 border border-navy-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Preferred</span>
                <span className="font-semibold text-emerald-400">{selectedInquiryDetail.preferredContactMethod || 'Email'}</span>
              </div>
              <div className="p-3 rounded-xl bg-navy-950/70 border border-navy-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Submitted</span>
                <span className="font-semibold text-slate-300">
                  {new Date(selectedInquiryDetail.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider block text-[11px]">
                Client Communication Channels:
              </span>
              <div className="flex flex-wrap gap-4 text-slate-200">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-brand-accent" />
                  <a href={`mailto:${selectedInquiryDetail.email}`} className="hover:underline">
                    {selectedInquiryDetail.email}
                  </a>
                </div>
                {selectedInquiryDetail.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono">{selectedInquiryDetail.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Full Project Description */}
            <div className="space-y-2">
              <span className="font-bold text-slate-300 uppercase tracking-wider block text-xs">
                Project Requirements & Description:
              </span>
              <div className="p-4 rounded-2xl bg-navy-950/90 border border-navy-800 text-sm text-slate-200 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
                {selectedInquiryDetail.projectDescription}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Status Updater inside Modal */}
              <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
                <span className="text-slate-400">Update Status:</span>
                <select
                  value={selectedInquiryDetail.status}
                  onChange={(e) => handleStatusChange(selectedInquiryDetail._id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-navy-950 text-white border border-navy-750 text-xs focus:outline-none"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Direct Follow-Up Buttons */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                {selectedInquiryDetail.phone && (
                  <a
                    href={`https://wa.me/${selectedInquiryDetail.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${selectedInquiryDetail.fullName}, Govind Rathod from Govind Web Solutions here. Thank you for your inquiry about ${selectedInquiryDetail.service}!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-md shadow-emerald-900/30"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Client</span>
                  </a>
                )}
                <a
                  href={`mailto:${selectedInquiryDetail.email}?subject=${encodeURIComponent(`Govind Web Solutions — Regarding your ${selectedInquiryDetail.service} Inquiry`)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white text-xs font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
