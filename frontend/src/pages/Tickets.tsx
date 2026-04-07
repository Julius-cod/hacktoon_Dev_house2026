import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  MoreHorizontal,
  Calendar,
  User,
  Tag,
  Flag,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Ticket,
  Zap
} from 'lucide-react';

const ticketsData = {
  todo: [
    {
      id: 'TKT-001',
      title: 'Implement dark mode toggle',
      description: 'Add a dark mode option to the dashboard settings',
      type: 'feature',
      priority: 'medium',
      assignee: 'Alex Johnson',
      reporter: 'Marcus Webb',
      created: '2 hours ago',
      comments: 3,
    },
    {
      id: 'TKT-002',
      title: 'Fix login page crash with special characters',
      description: 'Login page crashes when using password managers with special characters',
      type: 'bug',
      priority: 'high',
      assignee: 'Sarah Chen',
      reporter: 'Sarah Chen',
      created: '3 hours ago',
      comments: 5,
    },
    {
      id: 'TKT-003',
      title: 'Add CSV export functionality',
      description: 'Allow users to export feedback data in CSV format',
      type: 'feature',
      priority: 'low',
      assignee: 'Unassigned',
      reporter: 'Emily Zhang',
      created: '5 hours ago',
      comments: 1,
    },
  ],
  inProgress: [
    {
      id: 'TKT-004',
      title: 'API date range filter bug',
      description: 'API returns 500 error when filtering by date range',
      type: 'bug',
      priority: 'high',
      assignee: 'James Miller',
      reporter: 'James Miller',
      created: '1 hour ago',
      comments: 8,
    },
    {
      id: 'TKT-005',
      title: 'Custom dashboard widgets',
      description: 'Add ability to create custom widgets for analytics dashboard',
      type: 'feature',
      priority: 'medium',
      assignee: 'Anna Rodriguez',
      reporter: 'Anna Rodriguez',
      created: '6 hours ago',
      comments: 2,
    },
  ],
  review: [
    {
      id: 'TKT-006',
      title: 'Payment processing international cards',
      description: 'Critical bug with international card payments',
      type: 'bug',
      priority: 'urgent',
      assignee: 'David Kim',
      reporter: 'David Kim',
      created: '30 min ago',
      comments: 12,
    },
  ],
  done: [
    {
      id: 'TKT-007',
      title: 'Add Slack integration',
      description: 'Send notifications to Slack when new feedback arrives',
      type: 'feature',
      priority: 'medium',
      assignee: 'Lisa Thompson',
      reporter: 'Lisa Thompson',
      created: '1 day ago',
      comments: 4,
    },
    {
      id: 'TKT-008',
      title: 'Fix search functionality',
      description: 'Search not returning accurate results',
      type: 'bug',
      priority: 'high',
      assignee: 'Mike Johnson',
      reporter: 'Mike Johnson',
      created: '2 days ago',
      comments: 6,
    },
  ],
};

const priorityConfig = {
  urgent: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', label: 'Urgent', icon: AlertCircle },
  high: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300', label: 'High', icon: Flag },
  medium: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', label: 'Medium', icon: Flag },
  low: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300', label: 'Low', icon: Flag },
};

const typeConfig = {
  bug: { bg: 'bg-red-100 text-red-700', label: 'Bug' },
  feature: { bg: 'bg-emerald-100 text-emerald-700', label: 'Feature' },
  question: { bg: 'bg-blue-100 text-blue-700', label: 'Question' },
};

const columns = [
  { id: 'todo', label: 'To Do', color: 'bg-slate-500', bgColor: 'from-slate-50 to-slate-100' },
  { id: 'inProgress', label: 'In Progress', color: 'bg-blue-500', bgColor: 'from-blue-50 to-blue-100' },
  { id: 'review', label: 'In Review', color: 'bg-amber-500', bgColor: 'from-amber-50 to-amber-100' },
  { id: 'done', label: 'Done', color: 'bg-emerald-500', bgColor: 'from-emerald-50 to-emerald-100' },
];

export default function Tickets() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');

  const getTotalTickets = () => {
    return Object.values(ticketsData).reduce((acc, arr) => acc + arr.length, 0);
  };

  return (
    <div className="p-8 h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Ticket className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Tickets</h2>
            <p className="text-sm text-slate-500">Manage and track your support tickets</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-all hover:shadow-lg hover:shadow-primary-500/25 active:scale-[0.98]">
          <Plus className="w-5 h-5" />
          Create Ticket
        </button>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-2xl border border-slate-200/50 shadow-sm">
        <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl">
          <Ticket className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-semibold text-primary-700">{getTotalTickets()} Total</span>
        </div>
        <div className="h-6 w-px bg-slate-200" />
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          <span>{ticketsData.todo.length} To Do</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>{ticketsData.inProgress.length} In Progress</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>{ticketsData.review.length} Review</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{ticketsData.done.length} Done</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
          />
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
          <Filter className="w-4 h-4" />
          Filters
        </button>

        <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setViewMode('kanban')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'kanban' ? 'bg-primary-100 text-primary-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary-100 text-primary-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-5 h-[calc(100%-180px)] overflow-x-auto pb-4">
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80 flex flex-col">
              {/* Column Header */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-xl border border-slate-200/50 shadow-sm">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <h3 className="font-bold text-slate-900">{column.label}</h3>
                <span className="ml-auto text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                  {ticketsData[column.id as keyof typeof ticketsData].length}
                </span>
              </div>

              {/* Column Content */}
              <div className={`flex-1 space-y-3 overflow-y-auto p-2 rounded-2xl bg-gradient-to-b ${column.bgColor}`}>
                {ticketsData[column.id as keyof typeof ticketsData].map((ticket) => {
                  const PriorityIcon = priorityConfig[ticket.priority as keyof typeof priorityConfig].icon;
                  return (
                    <div
                      key={ticket.id}
                      className="bg-white rounded-xl border border-slate-200/50 p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${typeConfig[ticket.type as keyof typeof typeConfig].bg}`}>
                            {typeConfig[ticket.type as keyof typeof typeConfig].label}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{ticket.id}</span>
                        </div>
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-all">
                          <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>

                      <h4 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">{ticket.title}</h4>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{ticket.description}</p>

                      <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${priorityConfig[ticket.priority as keyof typeof priorityConfig].bg} ${priorityConfig[ticket.priority as keyof typeof priorityConfig].text}`}>
                          <PriorityIcon className="w-3.5 h-3.5" />
                          {priorityConfig[ticket.priority as keyof typeof priorityConfig].label}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{ticket.comments}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-medium text-white">
                          {ticket.assignee === 'Unassigned' ? '?' : ticket.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs text-slate-500">{ticket.assignee}</span>
                        <span className="ml-auto text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {ticket.created}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assignee</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Created</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...ticketsData.todo, ...ticketsData.inProgress, ...ticketsData.review, ...ticketsData.done].map((ticket) => {
                const status = ticket.id.startsWith('TKT-007') || ticket.id.startsWith('TKT-008') ? 'Done' :
                  ticket.id.startsWith('TKT-006') ? 'Review' :
                  ticket.id.startsWith('TKT-004') || ticket.id.startsWith('TKT-005') ? 'In Progress' : 'To Do';
                
                const statusColors = {
                  'Done': 'bg-emerald-100 text-emerald-700',
                  'Review': 'bg-amber-100 text-amber-700',
                  'In Progress': 'bg-blue-100 text-blue-700',
                  'To Do': 'bg-slate-100 text-slate-600',
                };
                
                return (
                  <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-primary-600">{ticket.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900 group-hover:text-primary-600 transition-colors">{ticket.title}</p>
                        <p className="text-xs text-slate-500 truncate max-w-xs">{ticket.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${typeConfig[ticket.type as keyof typeof typeConfig].bg}`}>
                        {typeConfig[ticket.type as keyof typeof typeConfig].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${priorityConfig[ticket.priority as keyof typeof priorityConfig].bg} ${priorityConfig[ticket.priority as keyof typeof priorityConfig].text}`}>
                        {priorityConfig[ticket.priority as keyof typeof priorityConfig].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${statusColors[status as keyof typeof statusColors]}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs font-medium text-white">
                          {ticket.assignee === 'Unassigned' ? '?' : ticket.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm text-slate-600">{ticket.assignee}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{ticket.created}</td>
                    <td className="px-6 py-4">
                      <button className="p-1.5 rounded-lg hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-all">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}