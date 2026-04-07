import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MousePointer,
  MessageSquare,
  Ticket,
  Users,
  Zap,
  TrendingRight,
  Activity
} from 'lucide-react';

const metricsCards = [
  { title: 'Total Feedback', value: '1,847', change: '+12.5%', trend: 'up', icon: MessageSquare, color: 'primary' },
  { title: 'Tickets Created', value: '342', change: '+8.2%', trend: 'up', icon: Ticket, color: 'emerald' },
  { title: 'Avg Response Time', value: '2.4h', change: '-15%', trend: 'down', icon: Zap, color: 'indigo' },
  { title: 'User Satisfaction', value: '94%', change: '+3%', trend: 'up', icon: Users, color: 'amber' },
];

const sentimentData = [
  { label: 'Positive', value: 58, color: 'bg-emerald-500' },
  { label: 'Neutral', value: 28, color: 'bg-indigo-500' },
  { label: 'Negative', value: 14, color: 'bg-red-500' },
];

const typeDistribution = [
  { type: 'Feature Requests', count: 842, percentage: 45.6 },
  { type: 'Bug Reports', count: 623, percentage: 33.7 },
  { type: 'Questions', count: 382, percentage: 20.7 },
];

const topFeatures = [
  { feature: 'Dark Mode', votes: 156, trend: 'up' },
  { feature: 'Mobile App', votes: 134, trend: 'up' },
  { feature: 'Slack Integration', votes: 98, trend: 'stable' },
  { feature: 'API Webhooks', votes: 87, trend: 'up' },
  { feature: 'Custom Dashboards', votes: 76, trend: 'down' },
];

const weeklyTrends = [
  { week: 'Week 1', feedback: 245, tickets: 52, satisfaction: 91 },
  { week: 'Week 2', feedback: 312, tickets: 68, satisfaction: 89 },
  { week: 'Week 3', feedback: 287, tickets: 71, satisfaction: 92 },
  { week: 'Week 4', feedback: 356, tickets: 84, satisfaction: 94 },
];

const sourceData = [
  { source: 'In-app Widget', percentage: 42, users: 1234 },
  { source: 'Email', percentage: 28, users: 823 },
  { source: 'API', percentage: 18, users: 529 },
  { source: 'Widget', percentage: 12, users: 352 },
];

const aiPerformance = [
  { metric: 'Auto-categorization', value: '96%', accuracy: true },
  { metric: 'Sentiment Detection', value: '94%', accuracy: true },
  { metric: 'Priority Scoring', value: '91%', accuracy: true },
  { metric: 'Duplicate Detection', value: '89%', accuracy: false },
];

const colorMap: Record<string, { bg: string; text: string; ring: string; gradient: string }> = {
  primary: { bg: 'bg-primary-50', text: 'text-primary-600', ring: 'ring-primary-500/20', gradient: 'from-primary-500 to-primary-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-500/20', gradient: 'from-emerald-500 to-emerald-600' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-500/20', gradient: 'from-indigo-500 to-indigo-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-500/20', gradient: 'from-amber-500 to-amber-600' },
};

export default function Insights() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Insights & Reports</h2>
            <p className="text-sm text-slate-500">Analytics and AI performance metrics</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
            <Calendar className="w-4 h-4" />
            Last 30 days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-all hover:shadow-lg hover:shadow-primary-500/25">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {metricsCards.map((metric, index) => {
          const colors = colorMap[metric.color];
          return (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg} ring-4 ${colors.ring}`}>
                    <metric.icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    metric.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    <span>{metric.change}</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">{metric.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Sentiment Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-50 rounded-lg">
                  <PieChart className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Sentiment Distribution</h3>
                  <p className="text-sm text-slate-500">Overall feedback sentiment</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              {/* Donut Chart */}
              <div className="relative w-36 h-36">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="58 100" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="28 100" strokeDashoffset="-58" />
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="14 100" strokeDashoffset="-86" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold text-slate-900">1.8K</span>
                  <span className="text-xs text-slate-400">Total</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-4">
                {sentimentData.map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm font-medium text-slate-600">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Trends */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Weekly Trends</h3>
                  <p className="text-sm text-slate-500">Feedback vs Tickets created</p>
                </div>
              </div>
            </div>
            
            <div className="h-40 flex items-end justify-between gap-3">
              {weeklyTrends.map((data, index) => {
                const maxVal = 400;
                const feedbackHeight = (data.feedback / maxVal) * 100;
                const ticketsHeight = (data.tickets / maxVal) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full flex flex-col gap-1 h-32 justify-end relative">
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-primary-500 to-primary-400/80 group-hover:to-primary-500 transition-all duration-300"
                        style={{ height: `${feedbackHeight}%` }}
                      />
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-emerald-500 to-emerald-400/80 group-hover:to-emerald-500 transition-all duration-300"
                        style={{ height: `${ticketsHeight}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500">{data.week}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-500" />
                <span className="text-xs text-slate-600">Feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-600">Tickets</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Top Requested Features */}
        <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-primary-50/50 to-transparent">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-bold text-slate-900">Top Requested Features</h3>
            </div>
            <p className="text-sm text-slate-500">Most requested by users</p>
          </div>
          <div className="p-5 space-y-4">
            {topFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-primary-100 text-primary-600 text-xs font-bold flex items-center justify-center">#{index + 1}</span>
                  <span className="text-sm font-medium text-slate-900">{feature.feature}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary-600">{feature.votes}</span>
                  {feature.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                  {feature.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                  {feature.trend === 'stable' && <span className="text-xs text-slate-400">—</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Sources */}
        <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-emerald-50/50 to-transparent">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">Feedback Sources</h3>
            </div>
            <p className="text-sm text-slate-500">Where feedback comes from</p>
          </div>
          <div className="p-5 space-y-4">
            {sourceData.map((source, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900">{source.source}</span>
                  <span className="text-sm text-slate-500">{source.users.toLocaleString()} users</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all group-hover:from-primary-600 group-hover:to-primary-500"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 mt-1.5 block">{source.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Performance */}
        <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50/50 to-transparent">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100 rounded-lg">
                <Zap className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">AI Performance</h3>
            </div>
            <p className="text-sm text-slate-500">Model accuracy metrics</p>
          </div>
          <div className="p-5 space-y-4">
            {aiPerformance.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-sm text-slate-600">{metric.metric}</span>
                <span className={`text-sm font-bold px-3 py-1 rounded-lg ${metric.accuracy ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
          <div className="p-5 pt-0">
            <button className="w-full py-2.5 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-xl transition-all flex items-center justify-center gap-1">
              View detailed analytics <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}