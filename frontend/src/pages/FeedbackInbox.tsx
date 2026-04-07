import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  CheckCircle2, 
  XCircle,
  Clock,
  Star,
  MoreHorizontal,
  Plus,
  Tag,
  User,
  Mail,
  ArrowRight,
  Inbox,
  Sparkles,
  Zap
} from 'lucide-react';
import { typeColors, typeIcons, sentimentConfig } from '../components/Layout';

const feedbackItems = [
  {
    id: 'FB-001',
    user: 'Sarah Chen',
    email: 'sarah@acme.io',
    type: 'bug',
    sentiment: 'negative',
    priority: 92,
    status: 'new',
    message: 'Login page crashes when entering special characters in password field. This happens consistently when using password managers.',
    time: '2 min ago',
    source: 'In-app',
  },
  {
    id: 'FB-002',
    user: 'Marcus Webb',
    email: 'marcus@startup.co',
    type: 'feature',
    sentiment: 'positive',
    priority: 45,
    status: 'processing',
    message: 'Would love to see dark mode support for the dashboard. The current light theme is a bit harsh on the eyes.',
    time: '15 min ago',
    source: 'Email',
  },
  {
    id: 'FB-003',
    user: 'Emily Zhang',
    email: 'emily@design.co',
    type: 'question',
    sentiment: 'neutral',
    priority: 28,
    status: 'new',
    message: 'How do I export data in CSV format? I need to analyze the feedback data in my own tools.',
    time: '32 min ago',
    source: 'Widget',
  },
  {
    id: 'FB-004',
    user: 'James Miller',
    email: 'james@tech.io',
    type: 'bug',
    sentiment: 'negative',
    priority: 88,
    status: 'ai-processed',
    message: 'API returns 500 error when filtering by date range. The error started happening after the latest update.',
    time: '1 hour ago',
    source: 'API',
  },
  {
    id: 'FB-005',
    user: 'Anna Rodriguez',
    email: 'anna@corp.com',
    type: 'feature',
    sentiment: 'positive',
    priority: 67,
    status: 'processing',
    message: 'Great job on the new analytics dashboard! Would be cool to have custom widgets for better customization.',
    time: '2 hours ago',
    source: 'In-app',
  },
  {
    id: 'FB-006',
    user: 'David Kim',
    email: 'david@dev.co',
    type: 'bug',
    sentiment: 'negative',
    priority: 95,
    status: 'ai-processed',
    message: 'Critical: Payment processing fails for international cards. We are losing customers because of this.',
    time: '3 hours ago',
    source: 'Email',
  },
  {
    id: 'FB-007',
    user: 'Lisa Thompson',
    email: 'lisa@startup.io',
    type: 'feature',
    sentiment: 'positive',
    priority: 52,
    status: 'new',
    message: 'Integration with Slack would be amazing! We want to get notifications when new feedback comes in.',
    time: '4 hours ago',
    source: 'Widget',
  },
  {
    id: 'FB-008',
    user: 'Mike Johnson',
    email: 'mike@company.com',
    type: 'question',
    sentiment: 'neutral',
    priority: 18,
    status: 'reviewed',
    message: 'Is there a way to customize the feedback form fields? We need to collect specific information from our users.',
    time: '5 hours ago',
    source: 'In-app',
  },
];

const statusConfig = {
  new: { label: 'New', bg: 'bg-blue-100', text: 'text-blue-700' },
  processing: { label: 'Processing', bg: 'bg-amber-100', text: 'text-amber-700' },
  'ai-processed': { label: 'AI Processed', bg: 'bg-purple-100', text: 'text-purple-700' },
  reviewed: { label: 'Reviewed', bg: 'bg-emerald-100', text: 'text-emerald-700' },
};

const filters = [
  { label: 'All Feedback', count: 247 },
  { label: 'New', count: 42 },
  { label: 'Processing', count: 18 },
  { label: 'AI Processed', count: 156 },
  { label: 'Reviewed', count: 31 },
];

const typeFilters = ['All Types', 'Bug', 'Feature', 'Question'];
const sentimentFilters = ['All Sentiments', 'Positive', 'Neutral', 'Negative'];

const colorMap: Record<string, { bg: string; text: string; ring: string; gradient: string }> = {
  primary: { bg: 'bg-primary-50', text: 'text-primary-600', ring: 'ring-primary-500/20', gradient: 'from-primary-500 to-primary-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-500/20', gradient: 'from-emerald-500 to-emerald-600' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-500/20', gradient: 'from-indigo-500 to-indigo-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-500/20', gradient: 'from-amber-500 to-amber-600' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-600', ring: 'ring-slate-500/20', gradient: 'from-slate-500 to-slate-600' },
};

export default function FeedbackInbox() {
  const [selectedFeedback, setSelectedFeedback] = useState(feedbackItems[0]);
  const [activeFilter, setActiveFilter] = useState('All Feedback');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [sentimentFilter, setSentimentFilter] = useState('All Sentiments');

  return (
    <div className="p-8 h-[calc(100vh-80px)]">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Inbox className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Feedback Inbox</h2>
            <p className="text-sm text-slate-500">Manage and process user feedback</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-all hover:shadow-lg hover:shadow-primary-500/25 active:scale-[0.98]">
          <Plus className="w-5 h-5" />
          New Feedback
        </button>
      </div>

      <div className="flex gap-6 h-[calc(100%-80px)]">
        {/* Left Sidebar - Filters */}
        <div className="w-64 flex-shrink-0 space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/50 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-slate-900">Quick Stats</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Total Feedback</span>
                <span className="text-sm font-bold text-slate-900">247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Processed</span>
                <span className="text-sm font-bold text-emerald-600">187</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Pending</span>
                <span className="text-sm font-bold text-amber-600">60</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.label)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeFilter === filter.label
                    ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className="text-sm font-medium">{filter.label}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  activeFilter === filter.label ? 'bg-primary-200 text-primary-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">Type</h4>
            <div className="space-y-1">
              {typeFilters.map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                    typeFilter === type
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Sentiment Filter */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">Sentiment</h4>
            <div className="space-y-1">
              {sentimentFilters.map((sentiment) => (
                <button
                  key={sentiment}
                  onClick={() => setSentimentFilter(sentiment)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                    sentimentFilter === sentiment
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  {sentiment}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main List */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl border border-slate-200/50 shadow-sm flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-primary-50 rounded-lg">
                <Filter className="w-4 h-4 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">All Feedback</h3>
              <span className="text-sm text-slate-500">247 items</span>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search feedback..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {feedbackItems.map((feedback) => {
              const TypeIcon = typeIcons[feedback.type as keyof typeof typeIcons];
              const sentimentStyle = sentimentConfig[feedback.sentiment as keyof typeof sentimentConfig];
              const status = statusConfig[feedback.status as keyof typeof statusConfig];
              const isSelected = selectedFeedback.id === feedback.id;

              return (
                <div
                  key={feedback.id}
                  onClick={() => setSelectedFeedback(feedback)}
                  className={`p-4 border-b border-slate-100 cursor-pointer transition-all duration-200 hover:bg-slate-50/80 ${
                    isSelected ? 'bg-gradient-to-r from-primary-50/50 to-transparent border-l-4 border-l-primary-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[feedback.type as keyof typeof typeColors]}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-semibold text-slate-900 text-sm">{feedback.user}</span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${status.bg} ${status.text}`}>
                          {status.label}
                        </span>
                        {feedback.priority > 75 && (
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 truncate mb-2">{feedback.message}</p>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${sentimentStyle.text}`}>
                          <span className={`w-2 h-2 rounded-full ${sentimentStyle.dot}`} />
                          {feedback.sentiment}
                        </span>
                        <span className="text-xs text-slate-400">{feedback.time}</span>
                        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{feedback.source}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-sm font-bold ${
                        feedback.priority > 75 ? 'text-red-600' :
                        feedback.priority > 50 ? 'text-amber-600' :
                        'text-slate-500'
                      }`}>
                        {feedback.priority}
                      </span>
                      <span className="text-xs text-slate-400">priority</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel - Detail */}
        <div className="w-96 flex-shrink-0 bg-white rounded-2xl border border-slate-200/50 shadow-sm flex flex-col overflow-hidden">
          {selectedFeedback && (
            <>
              {/* Header */}
              <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-primary-50/30 to-transparent">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary-600 bg-primary-100 px-3 py-1 rounded-lg">{selectedFeedback.id}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusConfig[selectedFeedback.status as keyof typeof statusConfig].bg} ${statusConfig[selectedFeedback.status as keyof typeof statusConfig].text}`}>
                      {statusConfig[selectedFeedback.status as keyof typeof statusConfig].label}
                    </span>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[selectedFeedback.type as keyof typeof typeColors]}`}>
                    {React.createElement(typeIcons[selectedFeedback.type as keyof typeof typeIcons], { className: "w-5 h-5" })}
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-medium ${sentimentConfig[selectedFeedback.sentiment as keyof typeof sentimentConfig].bg} ${sentimentConfig[selectedFeedback.sentiment as keyof typeof sentimentConfig].text}`}>
                    <span className={`w-2 h-2 rounded-full ${sentimentConfig[selectedFeedback.sentiment as keyof typeof sentimentConfig].dot}`} />
                    {selectedFeedback.sentiment.charAt(0).toUpperCase() + selectedFeedback.sentiment.slice(1)}
                  </span>
                  <span className="ml-auto text-sm font-bold text-slate-700">
                    <span className={`${selectedFeedback.priority > 75 ? 'text-red-600' : selectedFeedback.priority > 50 ? 'text-amber-600' : 'text-slate-600'}`}>{selectedFeedback.priority}</span>
                    <span className="text-slate-400 font-normal">/100</span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* Message */}
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Message</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedFeedback.message}</p>
                </div>

                {/* User Info */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">User Information</h4>
                  <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{selectedFeedback.user}</p>
                        <p className="text-xs text-slate-500">Customer</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">{selectedFeedback.email}</span>
                    </div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-primary-600" />
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Analysis</h4>
                  </div>
                  <div className="bg-gradient-to-br from-primary-50 to-indigo-50 rounded-xl p-4 space-y-3 border border-primary-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Category</span>
                      <span className="text-sm font-semibold text-slate-700 capitalize bg-white px-3 py-1 rounded-lg border border-primary-100">{selectedFeedback.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Confidence</span>
                      <span className="text-sm font-bold text-emerald-600">94%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Suggested Action</span>
                      <span className="text-xs font-medium text-primary-600 bg-primary-100 px-2 py-0.5 rounded">Create Ticket</span>
                    </div>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Tag className="w-3 h-3 text-slate-400" />
                      <p className="text-xs text-slate-400">Source</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{selectedFeedback.source}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <p className="text-xs text-slate-400">Received</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{selectedFeedback.time}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-5 border-t border-slate-100 bg-slate-50/50">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all hover:shadow-lg hover:shadow-primary-500/25 active:scale-[0.98]">
                  <CheckCircle2 className="w-5 h-5" />
                  Create Ticket
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}