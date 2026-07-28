'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import {
  Bot,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Search,
  Zap,
  Brain,
  TrendingUp,
  Shield,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Play,
  Pause,
  Settings,
  History,
  Bookmark,
  MessageSquare,
  FileText,
  BarChart3,
  DollarSign,
  Building2,
  Lightbulb,
  Target,
  type LucideIcon,
} from 'lucide-react';

export type AgentStatus = 'active' | 'idle' | 'paused' | 'processing';

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  category: string;
  shortcut?: string;
}

export interface ActiveAgent {
  id: string;
  name: string;
  status: AgentStatus;
  currentTask?: string;
  progress?: number;
  lastActivity: Date;
}

export interface RecentActivity {
  id: string;
  type: 'recommendation' | 'alert' | 'action' | 'insight';
  title: string;
  timestamp: Date;
}

export interface CommandSidebarProps {
  agents: ActiveAgent[];
  recentActivities: RecentActivity[];
  onQuickAction?: (action: QuickAction) => void;
  onAgentControl?: (agentId: string, action: 'pause' | 'resume' | 'configure') => void;
  onActivityClick?: (activity: RecentActivity) => void;
  className?: string;
  // defaultCollapsed?: boolean;
}

const quickActions: QuickAction[] = [
  {
    id: 'optimize-liquidity',
    label: 'Optimize Liquidity',
    description: 'AI analysis of liquidity positions',
    icon: Zap,
    category: 'Treasury',
    shortcut: 'L',
  },
  {
    id: 'cash-forecast',
    label: 'Cash Forecast',
    description: '90-day cash flow projection',
    icon: TrendingUp,
    category: 'Cash Flow',
    shortcut: 'F',
  },
  {
    id: 'risk-scan',
    label: 'Risk Scan',
    description: 'Full portfolio risk assessment',
    icon: Shield,
    category: 'Risk',
    shortcut: 'R',
  },
  {
    id: 'covenant-check',
    label: 'Covenant Check',
    description: 'Verify covenant compliance',
    icon: AlertTriangle,
    category: 'Compliance',
    shortcut: 'C',
  },
  {
    id: 'idle-cash',
    label: 'Find Idle Cash',
    description: 'Identify deployment opportunities',
    icon: DollarSign,
    category: 'Treasury',
    shortcut: 'I',
  },
  {
    id: 'vendor-analysis',
    label: 'Vendor Analysis',
    description: 'Payment optimization suggestions',
    icon: Building2,
    category: 'Payments',
    shortcut: 'V',
  },
  {
    id: 'collection-priority',
    label: 'Collection Priority',
    description: 'AI-ranked collection actions',
    icon: Target,
    category: 'Collections',
    shortcut: 'P',
  },
  {
    id: 'market-brief',
    label: 'Market Brief',
    description: 'Today\'s relevant market intelligence',
    icon: Lightbulb,
    category: 'Intelligence',
    shortcut: 'M',
  },
];

const statusConfig: Record<AgentStatus, { label: string; color: string; bg: string }> = {
  active: { label: 'Active', color: 'text-green-400', bg: 'bg-green-500' },
  idle: { label: 'Idle', color: 'text-slate-400', bg: 'bg-slate-500' },
  paused: { label: 'Paused', color: 'text-yellow-400', bg: 'bg-yellow-500' },
  processing: { label: 'Processing', color: 'text-blue-400', bg: 'bg-blue-500' },
};

const activityIcons: Record<RecentActivity['type'], LucideIcon> = {
  recommendation: Lightbulb,
  alert: AlertTriangle,
  action: CheckCircle2,
  insight: Brain,
};

const activityColors: Record<RecentActivity['type'], string> = {
  recommendation: 'text-blue-400',
  alert: 'text-yellow-400',
  action: 'text-green-400',
  insight: 'text-purple-400',
};

export function CommandCenterSection({
  agents,
  recentActivities,
  onQuickAction,
  onAgentControl,
  onActivityClick,
  className,
  // defaultCollapsed = false,
}: CommandSidebarProps) {
  // const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const categories = React.useMemo(() => {
    const cats = new Set(quickActions.map((a) => a.category));
    return Array.from(cats);
  }, []);

  const filteredActions = React.useMemo(() => {
    return quickActions.filter((action) => {
      const matchesSearch =
        searchQuery === '' ||
        action.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        action.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === null || action.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const formatTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className={cn('flex w-full flex-col border-l border-slate-800 bg-slate-900/50', className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-400" />
          <span className="font-medium text-white">AI Command</span>
        </div>
        {/* <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(true)}>
          <ChevronRight className="h-4 w-4" />
        </Button> */}
      </div>

      <ScrollArea className="flex-1">
        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search actions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-xs font-medium uppercase text-slate-500">Quick Actions</h4>
            <Badge variant="secondary" className="text-[10px]">
              {filteredActions.length}
            </Badge>
          </div>

          {/* Category Filters */}
          <div className="mb-3 flex flex-wrap gap-1">
            <Button
              variant={selectedCategory === null ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="h-6 text-xs"
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="h-6 text-xs"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Action List */}
          <div className="space-y-2">
            {filteredActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => onQuickAction?.(action)}
                  className="flex w-full items-start gap-3 rounded-lg border border-slate-800 p-3 text-left transition-colors hover:bg-slate-800/50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                    <Icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{action.label}</span>
                      {action.shortcut && (
                        <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">
                          ⌘{action.shortcut}
                        </kbd>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Agents */}
        <div className="border-t border-slate-800 px-4 py-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-xs font-medium uppercase text-slate-500">Active Agents</h4>
            <Badge variant="secondary" className="text-[10px]">
              {agents.filter((a) => a.status !== 'idle').length} running
            </Badge>
          </div>

          <div className="space-y-2">
            {agents.map((agent) => {
              const status = statusConfig[agent.status];
              return (
                <div
                  key={agent.id}
                  className="rounded-lg border border-slate-800 p-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn('h-2 w-2 rounded-full', status.bg)} />
                      <span className="text-sm font-medium text-white">{agent.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {agent.status === 'active' || agent.status === 'processing' ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onAgentControl?.(agent.id, 'pause')}
                        >
                          <Pause className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onAgentControl?.(agent.id, 'resume')}
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => onAgentControl?.(agent.id, 'configure')}
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  {agent.currentTask && (
                    <p className="mt-1 text-xs text-slate-400">{agent.currentTask}</p>
                  )}
                  {agent.progress !== undefined && (
                    <div className="mt-2">
                      <div className="h-1 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-blue-500 transition-all"
                          style={{ width: `${agent.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(agent.lastActivity)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="border-t border-slate-800 px-4 py-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-xs font-medium uppercase text-slate-500">Recent Activity</h4>
            <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
              <History className="h-3 w-3" />
              View All
            </Button>
          </div>

          <div className="space-y-2">
            {recentActivities.map((activity) => {
              const Icon = activityIcons[activity.type];
              return (
                <button
                  key={activity.id}
                  onClick={() => onActivityClick?.(activity)}
                  className="flex w-full items-start gap-2 rounded-lg p-2 text-left transition-colors hover:bg-slate-800/50"
                >
                  <Icon className={cn('mt-0.5 h-4 w-4', activityColors[activity.type])} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-slate-300">{activity.title}</p>
                    <span className="text-[10px] text-slate-500">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-blue-400" />
            <span>AI Status: Online</span>
          </div>
          <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs">
            <MessageSquare className="h-3 w-3" />
            Chat
          </Button>
        </div>
      </div>
    </div>
  );
}

// Mock data
export const mockAgents: ActiveAgent[] = [
  {
    id: 'agent-1',
    name: 'Treasury Monitor',
    status: 'active',
    currentTask: 'Monitoring cash positions across 24 accounts',
    lastActivity: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: 'agent-2',
    name: 'Risk Scanner',
    status: 'processing',
    currentTask: 'Analyzing covenant compliance',
    progress: 65,
    lastActivity: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 'agent-3',
    name: 'Collection Optimizer',
    status: 'idle',
    lastActivity: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'agent-4',
    name: 'FX Watcher',
    status: 'active',
    currentTask: 'Tracking USD/INR volatility',
    lastActivity: new Date(Date.now() - 1000 * 60 * 1),
  },
];

export const mockRecentActivities: RecentActivity[] = [
  {
    id: 'activity-1',
    type: 'alert',
    title: 'DSCR approaching covenant threshold',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: 'activity-2',
    type: 'recommendation',
    title: 'Deploy ₹40 Cr idle cash to liquid funds',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'activity-3',
    type: 'action',
    title: 'Approved: FX hedge for $15M',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: 'activity-4',
    type: 'insight',
    title: 'Customer ABC Corp credit deterioration detected',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: 'activity-5',
    type: 'recommendation',
    title: 'Refinancing opportunity: ₹2.5 Cr/year savings',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
  },
];

export default CommandCenterSection;
