import { 
  ChevronUp, 
  ChevronDown,
  ArrowRight,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Zap,
  AlertCircle,
  Sparkles,
  Lightbulb,
  Bug,
  MessageSquare,
  HelpCircle,
  Plus,
  Target,
  Workflow,
  Zap as ZapFast,
  BarChart3
} from 'lucide-react';
import { typeColors, typeIcons, sentimentConfig } from '../components/Layout';

const summaryCards = [
  {
    title: 'Total Feedback Today',
    value: '247',
    change: '+12.5%',
    trend: 'up',
    icon: MessageSquare,
    color: 'primary',
    description: 'vs. yesterday',
  },
  {
    title: 'New Tickets Created',
    value: '38',
    change: '+8.2%',
    trend: 'up',
    icon: Workflow,
    color: 'emerald',
    description: 'vs. yesterday',
  },
  {
    title: 'Average Sentiment',
    value: 'Positive',
    change: '+0.3',
    trend: 'up',
    icon: Sparkles,
    color: 'indigo',
    sentiment: true,
    description: 'vs. yesterday',
  },
  {
    title: 'High-Priority Tickets',
    value: '7',
    change: '-2',
    trend: 'down',
    icon: AlertCircle,
    color: 'amber',
    description: 'vs. yesterday',
  },
];

const weeklyData = [
  { day: 'Mon', feedback: 45, tickets: 12 },
  { day: 'Tue', feedback: 62, tickets: 18 },
  { day: 'Wed', feedback: 38, tickets: 15 },
  { day: 'Thu', feedback: 78, tickets: 28 },
  { day: 'Fri', feedback: 95, tickets: 32 },
  { day: 'Sat', feedback: 42, tickets: 14 },
  { day: 'Sun', feedback: 35, tickets: 10 },
];

const recentFeedback = [
  {
    id: 'FB-001',
    user: 'Sarah Chen',
    email: 'sarah@acme.io',
    type: 'bug',
    sentiment: 'negative',
    priority: 92,
    message: 'Login page crashes when entering special characters in password field',
    time: '2 min ago',
  },
  {
    id: 'FB-002',
    user: 'Marcus Webb',
    email: 'marcus@startup.co',
    type: 'feature',
    sentiment: 'positive',
    priority: 45,
    message: 'Would love to see dark mode support for the dashboard',
    time: '15 min ago',
  },
  {
    id: 'FB-003',
    user: 'Emily Zhang',
    email: 'emily@design.co',
    type: 'question',
    sentiment: 'neutral',
    priority: 28,
    message: 'How do I export data in CSV format?',
    time: '32 min ago',
  },
  {
    id: 'FB-004',
    user: 'James Miller',
    email: 'james@tech.io',
    type: 'bug',
    sentiment: 'negative',
    priority: 88,
    message: 'API returns 500 error when filtering by date range',
    time: '1 hour ago',
  },
  {
    id: 'FB-005',
    user: 'Anna Rodriguez',
    email: 'anna@corp.com',
    type: 'feature',
    sentiment: 'positive',
    priority: 67,
    message: 'Great job on the new analytics dashboard! Would be cool to have custom widgets',
    time: '2 hours ago',
  },
];

const aiInsights = [
  {
    category: 'Top Requested Features',
    count: 12,
    items: ['Dark mode', 'Mobile app', 'Slack integration', 'API webhooks'],
    sentiment: 'positive',
  },
  {
    category: 'Recurring Bugs',
    count: 5,
    items: ['Login timeout', 'Export failures', 'Search not working'],
    sentiment: 'negative',
  },
  {
    category: 'Urgent Issues',
    count: 3,
    items: ['Payment processing', 'Data sync delays'],
    sentiment: 'negative',
    urgent: true,
  },
];

const quickActions = [
  { icon: Plus, label: 'Create Ticket Manually', color: 'primary', badge: null },
  { icon: ZapFast, label: 'Review AI Suggestions', color: 'indigo', badge: '3 new' },
  { icon: Target, label: 'Export Feedback Reports', color: 'emerald', badge: null },
  { icon: BarChart3, label: 'Adjust AI Settings', color: 'slate', badge: null },
];

const colorMap: Record<string, { bg: string; text: string; ring: string; gradient: string }> = {
  primary: { bg: 'bg-primary-50', text: 'text-primary-600', ring: 'ring-primary-500/20', gradient: 'from-primary-500 to-primary-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-500/20', gradient: 'from-emerald-500 to-emerald-600' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-500/20', gradient: 'from-indigo-500 to-indigo-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-500/20', gradient: 'from-amber-500 to-amber-600' },
};

export default function Dashboard() {
  const getMaxValue = () => Math.max(...weeklyData.map(d => Math.max(d.feedback, d.tickets)));

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Zap className="w-5 h-5 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        </div>
        <p className="text-slate-500">Welcome back! Here's what's happening with your feedback.</p>
      </div>

      {/* AI Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => {
          const colors = colorMap[card.color];
          return (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-transparent to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg} ring-4 ${colors.ring}`}>
                    <card.icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    card.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {card.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{card.change}</span>
                  </div>
                </div>
                <p className="text-slate-500 text-sm mb-1">{card.title}</p>
                <p className={`text-3xl font-bold tracking-tight ${
                  card.sentiment 
                    ? 'text-emerald-600' 
                    : card.title === 'High-Priority Tickets' 
                      ? 'text-amber-600'
                      : 'text-slate-900'
                }`}>
                  {card.value}
                </p>
                <p className="text-xs text-slate-400 mt-2">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback Activity Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm mb-8 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-bold text-slate-900">Feedback Activity</h3>
              </div>
              <p className="text-sm text-slate-500">Volume over the last 7 days</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-500" />
                <span className="text-sm text-slate-600">Feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-sm text-slate-600">Tickets</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4">
            {weeklyData.map((data, index) => {
              const maxVal = getMaxValue();
              const feedbackHeight = (data.feedback / maxVal) * 100;
              const ticketsHeight = (data.tickets / maxVal) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex flex-col gap-1 h-52 justify-end relative">
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap z-10">
                      Feedback: {data.feedback} | Tickets: {data.tickets}
                    </div>
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-primary-500 to-primary-400/80 hover:to-primary-500 transition-all duration-300"
                      style={{ height: `${feedbackHeight}%` }}
                    />
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-emerald-500 to-emerald-400/80 hover:to-emerald-500 transition-all duration-300"
                      style={{ height: `${ticketsHeight}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-500">{data.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-8">
        {/* Recent Feedback - 2 columns */}
        <div className="col-span-2 bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-50 rounded-lg">
                <MessageSquare className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent Feedback</h3>
                <p className="text-sm text-slate-500">Latest user submissions</p>
              </div>
            </div>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentFeedback.map((feedback) => {
              const TypeIcon = typeIcons[feedback.type as keyof typeof typeIcons];
              const sentimentStyle = sentimentConfig[feedback.sentiment as keyof typeof sentimentConfig];
              return (
                <div key={feedback.id} className="p-4 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <div className="flex items-start gap-4">
                    {/* Type indicator */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[feedback.type as keyof typeof typeColors]}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-slate-900">{feedback.user}</span>
                        <span className="text-xs text-slate-400">{feedback.email}</span>
                      </div>
                      <p className="text-sm text-slate-600 truncate mb-2">{feedback.message}</p>
                      <div className="flex items-center gap-3">
                        {/* Sentiment badge */}
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${sentimentStyle.bg} ${sentimentStyle.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sentimentStyle.dot}`} />
                          {feedback.sentiment.charAt(0).toUpperCase() + feedback.sentiment.slice(1)}
                        </span>
                        
                        {/* Priority */}
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                          feedback.priority > 75 ? 'bg-red-100 text-red-700' :
                          feedback.priority > 50 ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          Prio: {feedback.priority}
                        </span>
                        
                        <span className="text-xs text-slate-400">{feedback.time}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-1.5 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm shadow-primary-500/25">
                        Create Ticket
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - AI Insights + Quick Actions */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-primary-50/50 to-transparent">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary-100 rounded-lg">
                  <Sparkles className="w-4 h-4 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">AI Insights</h3>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] cursor-pointer ${
                    insight.urgent 
                      ? 'bg-gradient-to-r from-red-50 to-red-100/50 border-red-200' 
                      : insight.sentiment === 'positive'
                        ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-emerald-200'
                        : 'bg-gradient-to-r from-slate-50 to-slate-100/50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900 text-sm">{insight.category}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      insight.urgent 
                        ? 'bg-red-200 text-red-700' 
                        : insight.sentiment === 'positive'
                          ? 'bg-emerald-200 text-emerald-700'
                          : 'bg-slate-200 text-slate-600'
                    }`}>
                      {insight.count}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {insight.items.map((item, i) => (
                      <span key={i} className="text-xs bg-white px-2 py-1 rounded-md text-slate-600 border border-slate-200 shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
            </div>
            <div className="p-5 space-y-3">
              {quickActions.map((action, index) => {
                const colors = colorMap[action.color] || colorMap.slate;
                return (
                  <button key={index} className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all group">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 ${colors.bg}`}>
                      <action.icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{action.label}</span>
                    {action.badge && (
                      <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                        {action.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}