'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Monitor,
  AlertTriangle,
  CheckCircle2,
  Info,
  Wallet,
  Shield,
  CreditCard,
  Clock,
  Zap,
  Settings,
  Volume2,
  VolumeX,
} from 'lucide-react';

// Notification categories
const notificationCategories = [
  {
    id: 'cash-flow',
    name: 'Cash Flow Alerts',
    description: 'Notifications about cash position changes and forecasts',
    icon: Wallet,
    iconColor: 'text-blue-400',
    settings: [
      { id: 'cash-position-change', label: 'Cash position changes > ₹10 Cr', email: true, push: true, inApp: true },
      { id: 'forecast-variance', label: 'Forecast variance > 10%', email: true, push: false, inApp: true },
      { id: 'low-balance', label: 'Low balance warnings', email: true, push: true, inApp: true },
      { id: 'idle-cash', label: 'Idle cash opportunities', email: false, push: false, inApp: true },
    ],
  },
  {
    id: 'covenants',
    name: 'Covenant Monitoring',
    description: 'Alerts for covenant compliance and breach risks',
    icon: Shield,
    iconColor: 'text-yellow-400',
    settings: [
      { id: 'covenant-breach', label: 'Covenant breach alerts', email: true, push: true, inApp: true },
      { id: 'covenant-threshold', label: 'Approaching threshold (< 10%)', email: true, push: true, inApp: true },
      { id: 'covenant-cure', label: 'Covenant cure reminders', email: true, push: false, inApp: true },
      { id: 'covenant-report', label: 'Monthly compliance reports', email: true, push: false, inApp: false },
    ],
  },
  {
    id: 'payments',
    name: 'Payment Alerts',
    description: 'Notifications for payment processing and approvals',
    icon: CreditCard,
    iconColor: 'text-green-400',
    settings: [
      { id: 'payment-approval', label: 'Payment approval requests', email: true, push: true, inApp: true },
      { id: 'payment-processed', label: 'Payment processed confirmations', email: true, push: false, inApp: true },
      { id: 'payment-failed', label: 'Payment failure alerts', email: true, push: true, inApp: true },
      { id: 'payment-reminder', label: 'Upcoming payment reminders', email: true, push: false, inApp: true },
    ],
  },
  {
    id: 'ai-insights',
    name: 'AI Insights',
    description: 'Notifications from AI agents and recommendations',
    icon: Zap,
    iconColor: 'text-purple-400',
    settings: [
      { id: 'ai-recommendation', label: 'AI recommendations', email: false, push: false, inApp: true },
      { id: 'ai-anomaly', label: 'Anomaly detection alerts', email: true, push: true, inApp: true },
      { id: 'ai-forecast', label: 'Forecast updates', email: false, push: false, inApp: true },
      { id: 'ai-agent-complete', label: 'Agent task completions', email: false, push: false, inApp: true },
    ],
  },
  {
    id: 'system',
    name: 'System Notifications',
    description: 'System updates and administrative alerts',
    icon: Monitor,
    iconColor: 'text-slate-400',
    settings: [
      { id: 'system-maintenance', label: 'Scheduled maintenance', email: true, push: false, inApp: true },
      { id: 'system-updates', label: 'Feature updates', email: true, push: false, inApp: true },
      { id: 'security-alerts', label: 'Security alerts', email: true, push: true, inApp: true },
      { id: 'login-alerts', label: 'New device login alerts', email: true, push: true, inApp: true },
    ],
  },
];

// Recent notifications
const recentNotifications = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'DSCR Covenant at Risk',
    description: 'Current ratio 1.32x vs 1.25x minimum threshold',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    category: 'covenants',
  },
  {
    id: '2',
    type: 'info' as const,
    title: 'Payment Approved',
    description: 'Vendor payment to L&T Construction for ₹4.5 Cr has been approved',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    category: 'payments',
  },
  {
    id: '3',
    type: 'success' as const,
    title: 'Cash Forecast Updated',
    description: 'AI has updated the 8-week cash forecast with 94% confidence',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
    category: 'ai-insights',
  },
  {
    id: '4',
    type: 'warning' as const,
    title: 'Low Balance Alert',
    description: 'HDFC Current Account balance below ₹5 Cr threshold',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
    category: 'cash-flow',
  },
  {
    id: '5',
    type: 'info' as const,
    title: 'Reconciliation Complete',
    description: '1,245 transactions matched with 98.5% success rate',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    read: true,
    category: 'system',
  },
];

const typeConfig = {
  warning: { icon: AlertTriangle, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
  info: { icon: Info, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  success: { icon: CheckCircle2, color: 'text-green-400', bgColor: 'bg-green-500/10' },
};

export default function NotificationsPage() {
  const [categories, setCategories] = React.useState(notificationCategories);
  const [notifications, setNotifications] = React.useState(recentNotifications);
  const [doNotDisturb, setDoNotDisturb] = React.useState(false);

  const toggleSetting = (categoryId: string, settingId: string, channel: 'email' | 'push' | 'inApp') => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              settings: cat.settings.map((setting) =>
                setting.id === settingId
                  ? { ...setting, [channel]: !setting[channel] }
                  : setting
              ),
            }
          : cat
      )
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <PageContainer>
      <PageHeader
        title="Notification Settings"
        description="Manage how you receive alerts and updates"
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          { label: 'Notifications' },
        ]}
      />

      <Tabs defaultValue="preferences" className="space-y-6">
        <TabsList>
          <TabsTrigger value="preferences" className="gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <Bell className="h-4 w-4" />
            History
            {unreadCount > 0 && (
              <Badge variant="danger" className="ml-1 h-5 px-1.5">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="mt-0">
          {/* Global Settings */}
          <Section className="mb-6">
            <Card className="border-slate-800 bg-slate-900/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {doNotDisturb ? (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                      <VolumeX className="h-6 w-6 text-red-400" />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                      <Volume2 className="h-6 w-6 text-green-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-white">Do Not Disturb</h3>
                    <p className="text-sm text-slate-400">
                      {doNotDisturb
                        ? 'All notifications are currently muted'
                        : 'You will receive notifications based on your preferences'}
                    </p>
                  </div>
                </div>
                <Switch checked={doNotDisturb} onCheckedChange={setDoNotDisturb} />
              </div>
            </Card>
          </Section>

          {/* Category Settings */}
          <div className="space-y-6">
            {categories.map((category) => (
              <Card key={category.id} className="border-slate-800 bg-slate-900/50 overflow-hidden">
                <div className="border-b border-slate-800 p-4">
                  <div className="flex items-center gap-3">
                    <category.icon className={`h-5 w-5 ${category.iconColor}`} />
                    <div>
                      <h3 className="font-semibold text-white">{category.name}</h3>
                      <p className="text-sm text-slate-400">{category.description}</p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-800">
                  {/* Header Row */}
                  <div className="grid grid-cols-[1fr,80px,80px,80px] gap-4 px-4 py-3 text-xs font-medium text-slate-500">
                    <div>Notification</div>
                    <div className="flex items-center justify-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Smartphone className="h-3 w-3" />
                      Push
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Monitor className="h-3 w-3" />
                      In-App
                    </div>
                  </div>

                  {/* Settings Rows */}
                  {category.settings.map((setting) => (
                    <div
                      key={setting.id}
                      className="grid grid-cols-[1fr,80px,80px,80px] gap-4 px-4 py-3 items-center"
                    >
                      <span className="text-sm text-slate-300">{setting.label}</span>
                      <div className="flex justify-center">
                        <Switch
                          checked={setting.email}
                          onCheckedChange={() => toggleSetting(category.id, setting.id, 'email')}
                          disabled={doNotDisturb}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch
                          checked={setting.push}
                          onCheckedChange={() => toggleSetting(category.id, setting.id, 'push')}
                          disabled={doNotDisturb}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Switch
                          checked={setting.inApp}
                          onCheckedChange={() => toggleSetting(category.id, setting.id, 'inApp')}
                          disabled={doNotDisturb}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline">Reset to Defaults</Button>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
              Save Preferences
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 p-4">
              <h3 className="font-semibold text-white">Recent Notifications</h3>
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </div>

            <div className="divide-y divide-slate-800">
              {notifications.map((notification) => {
                const config = typeConfig[notification.type];
                const Icon = config.icon;

                return (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 transition-colors hover:bg-slate-800/50 cursor-pointer ${
                      !notification.read ? 'bg-slate-800/30' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.bgColor}`}>
                      <Icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-medium text-white">{notification.title}</h4>
                          <p className="mt-1 text-sm text-slate-400">{notification.description}</p>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {notification.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-800 p-4 text-center">
              <Button variant="ghost" size="sm">
                View All Notifications
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
