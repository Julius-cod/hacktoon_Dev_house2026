// Layout Component
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Inbox, 
  Ticket, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  Zap,
  Sparkles,
  Bug,
  Lightbulb,
  HelpCircle,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronUp,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  MoreHorizontal,
  Plus,
  Download,
  Sliders,
  Menu
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/feedback', icon: Inbox, label: 'Feedback Inbox' },
  { path: '/tickets', icon: Ticket, label: 'Tickets' },
  { path: '/insights', icon: BarChart3, label: 'Insights & Reports' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Layout() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200/60 fixed h-screen flex flex-col z-30">
        {/* Logo */}
        <div className="p-6 border-b border-slate-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent" />
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
              <Zap className="w-5 h-5 text-white relative z-10" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-lg leading-tight tracking-tight">FeatureBridge</h1>
              <p className="text-xs text-primary-600 font-medium">AI Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
              end={item.path === '/'}
            >
              {isActive(item.path) && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full" />
              )}
              <div className={`p-1.5 rounded-lg transition-colors ${
                isActive(item.path) 
                  ? 'bg-primary-500/10 text-primary-600' 
                  : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-500'
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-slate-100">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-600 to-primary-700 rounded-2xl p-4 text-white">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-white/15 rounded-lg backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </div>
                <span className="text-sm font-semibold">AI Active</span>
                <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </div>
              <p className="text-xs text-primary-100 leading-relaxed">
                Processing feedback in real-time
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-8 flex items-center justify-between sticky top-0 z-20">
          {/* Search */}
          <div className="relative w-96 group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-primary-500 transition-colors" />
            <input
              type="text"
              placeholder="Search feedback, tickets, or users..."
              className="relative w-full pl-12 pr-4 py-3 bg-slate-50/80 border border-slate-200/80 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400/50 focus:bg-white transition-all"
            />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Quick action */}
            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">New</span>
            </button>

            {/* Notifications */}
            <button className="relative p-3 rounded-xl hover:bg-slate-50 transition-colors group">
              <Bell className="w-5 h-5 text-slate-500 group-hover:text-primary-600 transition-colors" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {/* Divider */}
            <div className="h-8 w-px bg-slate-200 mx-1" />

            {/* User profile */}
            <div className="flex items-center gap-3 pl-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">Alex Johnson</p>
                <p className="text-xs text-slate-500">Product Manager</p>
              </div>
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-purple-500/20 ring-2 ring-white">
                  AJ
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="gradient-mesh min-h-[calc(100vh-5rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// Shared icons
export { Bug, Lightbulb, HelpCircle, MessageSquare, AlertCircle, CheckCircle2, XCircle, ChevronUp, ChevronDown, TrendingUp, TrendingDown, ArrowRight, MoreHorizontal, Plus, Download, Sliders };
export const typeColors = {
  bug: 'bg-red-100 text-red-700',
  feature: 'bg-emerald-100 text-emerald-700',
  question: 'bg-blue-100 text-blue-700',
};
export const typeIcons = {
  bug: Bug,
  feature: Lightbulb,
  question: HelpCircle,
};
export const sentimentConfig = {
  positive: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  neutral: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  negative: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' },
};