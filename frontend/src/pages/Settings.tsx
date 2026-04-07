import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Palette, 
  Zap, 
  Globe, 
  Database,
  Shield,
  Key,
  Mail,
  Smartphone,
  Monitor,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Settings as SettingsIcon,
  Link2,
  Sparkles
} from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'ai', label: 'AI Settings', icon: Zap },
  { id: 'integrations', label: 'Integrations', icon: Database },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

const notificationSettings = [
  { id: 'email', label: 'Email Notifications', description: 'Receive updates via email', enabled: true, icon: Mail },
  { id: 'push', label: 'Push Notifications', description: 'Browser push notifications', enabled: true, icon: Bell },
  { id: 'slack', label: 'Slack Integration', description: 'Send notifications to Slack', enabled: false, icon: Monitor },
  { id: 'daily', label: 'Daily Digest', description: 'Daily summary of feedback', enabled: true, icon: Mail },
];

const aiSettings = [
  { id: 'auto-categorize', label: 'Auto-categorization', description: 'Automatically categorize feedback', enabled: true },
  { id: 'sentiment', label: 'Sentiment Analysis', description: 'Analyze feedback sentiment', enabled: true },
  { id: 'prioritize', label: 'Priority Scoring', description: 'AI-powered priority scoring', enabled: true },
  { id: 'suggestions', label: 'AI Suggestions', description: 'Get AI-powered ticket suggestions', enabled: true },
  { id: 'summaries', label: 'Auto-summaries', description: 'Generate feedback summaries', enabled: false },
];

const integrations = [
  { id: 'slack', name: 'Slack', description: 'Team communication', connected: false, icon: Monitor },
  { id: 'github', name: 'GitHub', description: 'Code management', connected: true, icon: Database },
  { id: 'jira', name: 'Jira', description: 'Project tracking', connected: false, icon: Database },
  { id: 'zapier', name: 'Zapier', description: 'Workflow automation', connected: true, icon: Zap },
];

const colorMap: Record<string, { bg: string; text: string; ring: string; gradient: string }> = {
  primary: { bg: 'bg-primary-50', text: 'text-primary-600', ring: 'ring-primary-500/20', gradient: 'from-primary-500 to-primary-600' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-500/20', gradient: 'from-emerald-500 to-emerald-600' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-500/20', gradient: 'from-indigo-500 to-indigo-600' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-500/20', gradient: 'from-amber-500 to-amber-600' },
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState(notificationSettings);
  const [aiSettingsState, setAiSettings] = useState(aiSettings);

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, enabled: !n.enabled } : n
    ));
  };

  const toggleAI = (id: string) => {
    setAiSettings(aiSettingsState.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };

  return (
    <div className="p-8 h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="p-2 bg-primary-100 rounded-lg">
          <SettingsIcon className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
          <p className="text-sm text-slate-500">Manage your account and preferences</p>
        </div>
      </div>

      <div className="flex gap-6 h-[calc(100%-80px)]">
        {/* Left Sidebar */}
        <div className="w-60 flex-shrink-0">
          <nav className="space-y-1.5 bg-white rounded-2xl p-2 border border-slate-200/50 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-primary-500/10 text-primary-600' 
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  <tab.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pr-2">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl">
              <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <User className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-slate-900">Profile Information</h3>
                </div>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-500/25">
                      AJ
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-500 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <button className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-xs text-slate-400 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="Alex"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Johnson"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="alex@featurebridge.ai"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                  <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all">
                    <option>Product Manager</option>
                    <option>Developer</option>
                    <option>Designer</option>
                    <option>Admin</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-all hover:shadow-lg hover:shadow-primary-500/25 active:scale-[0.98]">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 max-w-2xl">
              <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <Bell className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-slate-900">Notification Preferences</h3>
                </div>
                
                <div className="space-y-3">
                  {notifications.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                          <setting.icon className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{setting.label}</p>
                          <p className="text-xs text-slate-500">{setting.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleNotification(setting.id)}
                        className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
                          setting.enabled ? 'bg-primary-600' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${
                          setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl">
              <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <Lock className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-slate-900">Password</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
                    />
                  </div>
                </div>
                
                <button className="mt-4 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                  Update Password
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-slate-900">Two-Factor Authentication</h3>
                </div>
                <p className="text-sm text-slate-500 mb-4">Add an extra layer of security to your account</p>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-emerald-100 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-semibold text-emerald-700">2FA is enabled</span>
                  </div>
                  <button className="text-sm font-medium text-emerald-700 hover:underline">
                    Manage
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Key className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-slate-900">API Keys</h3>
                </div>
                <p className="text-sm text-slate-500 mb-4">Manage your API keys for external integrations</p>
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-900">Production Key</span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-lg">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-slate-500 font-mono bg-white px-2 py-1 rounded border">fb_sk_*************x4a</code>
                    <button className="text-xs text-primary-600 hover:underline font-medium">Reveal</button>
                  </div>
                </div>
                
                <button className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700">
                  <Link2 className="w-4 h-4" />
                  Generate New Key
                </button>
              </div>
            </div>
          )}

          {/* AI Settings Tab */}
          {activeTab === 'ai' && (
            <div className="space-y-6 max-w-2xl">
              <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Zap className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">AI Processing</h3>
                    <p className="text-sm text-slate-500">Configure how AI processes your feedback</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {aiSettingsState.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{setting.label}</p>
                        <p className="text-xs text-slate-500">{setting.description}</p>
                      </div>
                      <button
                        onClick={() => toggleAI(setting.id)}
                        className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
                          setting.enabled ? 'bg-primary-600' : 'bg-slate-200'
                        }`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${
                          setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-slate-900">AI Model Configuration</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Processing Model</label>
                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all">
                      <option>GPT-4 (Recommended)</option>
                      <option>GPT-3.5 Turbo</option>
                      <option>Claude 3</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Confidence Threshold</label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="80"
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary-500 rounded-full shadow" />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mt-2">
                      <span>More suggestions</span>
                      <span>Higher accuracy</span>
                    </div>
                  </div>
                </div>

                <button className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Retrain Model
                </button>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-6 max-w-2xl">
              <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <Database className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-slate-900">Connected Services</h3>
                </div>
                
                <div className="space-y-3">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                          <integration.icon className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{integration.name}</p>
                          <p className="text-xs text-slate-500">{integration.description}</p>
                        </div>
                      </div>
                      {integration.connected ? (
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-lg">Connected</span>
                          <button className="text-sm text-red-600 hover:underline font-medium">Disconnect</button>
                        </div>
                      ) : (
                        <button className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                          Connect
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6 max-w-2xl">
              <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <Palette className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-slate-900">Theme</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <button className="p-4 border-2 border-primary-500 rounded-xl bg-primary-50/50">
                    <div className="w-full h-20 bg-white rounded-lg border mb-2 shadow-sm" />
                    <span className="text-sm font-semibold text-primary-700">Light</span>
                  </button>
                  <button className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all">
                    <div className="w-full h-20 bg-slate-900 rounded-lg mb-2" />
                    <span className="text-sm font-medium text-slate-700">Dark</span>
                  </button>
                  <button className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all">
                    <div className="w-full h-20 bg-gradient-to-r from-white to-slate-900 rounded-lg mb-2 border" />
                    <span className="text-sm font-medium text-slate-700">System</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/50 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  <h3 className="text-lg font-bold text-slate-900">Accent Color</h3>
                </div>
                
                <div className="flex gap-3">
                  {[
                    { bg: 'bg-primary-500', selected: true },
                    { bg: 'bg-indigo-500', selected: false },
                    { bg: 'bg-emerald-500', selected: false },
                    { bg: 'bg-amber-500', selected: false },
                    { bg: 'bg-pink-500', selected: false },
                    { bg: 'bg-violet-500', selected: false },
                  ].map((color, index) => (
                    <button
                      key={index}
                      className={`w-10 h-10 rounded-xl ${color.bg} ${color.selected ? 'ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-110'} transition-transform`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}