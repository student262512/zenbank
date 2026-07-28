'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import {
  CreditCard,
  Landmark,
  TrendingUp,
  Wallet,
  Receipt,
  FolderKanban,
  ArrowRightLeft,
  Brain,
  CheckCircle2,
  Clock,
  type LucideIcon,
} from 'lucide-react';

export type ActivityCategory =
  | 'loans'
  | 'treasury'
  | 'investments'
  | 'payments'
  | 'collections'
  | 'projects'
  | 'transfers'
  | 'ai'
  | 'approvals';

export interface ActivityEvent {
  id: string;
  category: ActivityCategory;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  entity?: string;
  description: string;
  amount?: string;
  status: 'completed' | 'pending' | 'processing' | 'failed';
}

export interface ActivityTimelineProps {
  events: ActivityEvent[];
  className?: string;
  maxItems?: number;
  showFilters?: boolean;
}

const categoryConfig: Record<
  ActivityCategory,
  { icon: LucideIcon; color: string; bg: string; label: string }
> = {
  loans: {
    icon: CreditCard,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    label: 'Loans',
  },
  treasury: {
    icon: Landmark,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    label: 'Treasury',
  },
  investments: {
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    label: 'Investments',
  },
  payments: {
    icon: Wallet,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    label: 'Payments',
  },
  collections: {
    icon: Receipt,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    label: 'Collections',
  },
  projects: {
    icon: FolderKanban,
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    label: 'Projects',
  },
  transfers: {
    icon: ArrowRightLeft,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    label: 'Transfers',
  },
  ai: {
    icon: Brain,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    label: 'AI Decisions',
  },
  approvals: {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    label: 'Approvals',
  },
};

const statusConfig: Record<string, { color: string; label: string }> = {
  completed: { color: 'text-emerald-400', label: 'Completed' },
  pending: { color: 'text-yellow-400', label: 'Pending' },
  processing: { color: 'text-blue-400', label: 'Processing' },
  failed: { color: 'text-red-400', label: 'Failed' },
};

// Mock activity data
export const mockActivityEvents: ActivityEvent[] = [
  {
    id: '1',
    category: 'payments',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    user: { name: 'Rajesh Kumar', initials: 'RK' },
    entity: 'L&T Construction',
    description: 'Vendor payment processed',
    amount: '₹4.5 Cr',
    status: 'completed',
  },
  {
    id: '2',
    category: 'approvals',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    user: { name: 'Priya Singh', initials: 'PS' },
    entity: 'Zenith Energy SPV',
    description: 'Inter-company transfer approved',
    amount: '₹2.5 Cr',
    status: 'completed',
  },
  {
    id: '3',
    category: 'collections',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    user: { name: 'System', initials: 'SY' },
    entity: 'Mumbai Metro',
    description: 'Milestone payment received',
    amount: '₹12.8 Cr',
    status: 'completed',
  },
  {
    id: '4',
    category: 'ai',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    user: { name: 'AI Agent', initials: 'AI' },
    description: 'Liquidity optimization recommendation generated',
    amount: '+₹2.3L/day potential',
    status: 'pending',
  },
  {
    id: '5',
    category: 'transfers',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    user: { name: 'Amit Patel', initials: 'AP' },
    entity: 'HDFC → ICICI',
    description: 'Cash concentration sweep',
    amount: '₹8.5 Cr',
    status: 'completed',
  },
  {
    id: '6',
    category: 'investments',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    user: { name: 'Treasury Desk', initials: 'TD' },
    entity: 'SBI',
    description: 'Fixed deposit created',
    amount: '₹10 Cr',
    status: 'completed',
  },
  {
    id: '7',
    category: 'loans',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    user: { name: 'System', initials: 'SY' },
    entity: 'Metro Construction Loan',
    description: 'Drawdown request submitted',
    amount: '₹25 Cr',
    status: 'processing',
  },
  {
    id: '8',
    category: 'projects',
    timestamp: new Date(Date.now() - 1000 * 60 * 150),
    user: { name: 'Vikram Rao', initials: 'VR' },
    entity: 'Gujarat Solar Park',
    description: 'Milestone payment scheduled',
    amount: '₹15 Cr',
    status: 'pending',
  },
  {
    id: '9',
    category: 'treasury',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    user: { name: 'System', initials: 'SY' },
    description: 'Bank statement reconciled',
    entity: 'HDFC Current Account',
    status: 'completed',
  },
  {
    id: '10',
    category: 'approvals',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    user: { name: 'CFO', initials: 'CF' },
    entity: 'Pune Water Treatment',
    description: 'Budget reallocation approved',
    amount: '₹5 Cr',
    status: 'completed',
  },
];

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function ActivityItem({ event }: { event: ActivityEvent }) {
  const config = categoryConfig[event.category];
  const status = statusConfig[event.status];
  const Icon = config.icon;

  return (
    <div className="group relative flex gap-4 py-3">
      {/* Timeline line */}
      <div className="absolute left-5 top-12 h-full w-px bg-slate-800 group-last:hidden" />

      {/* Icon */}
      <div
        className={cn(
          'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          config.bg
        )}
      >
        <Icon className={cn('h-5 w-5', config.color)} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">{event.description}</span>
              <Badge variant="outline" className="shrink-0 text-xs">
                {config.label}
              </Badge>
            </div>
            {event.entity && (
              <p className="mt-0.5 truncate text-xs text-slate-400">{event.entity}</p>
            )}
          </div>
          {event.amount && (
            <span className="shrink-0 text-sm font-semibold text-white">{event.amount}</span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-2 flex items-center gap-3">
          {event.user && (
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5 text-[10px]">
                {event.user.initials}
              </Avatar>
              <span className="text-xs text-slate-500">{event.user.name}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="h-3 w-3" />
            <span>{formatTimeAgo(event.timestamp)}</span>
            <span className="text-slate-600">•</span>
            <span>{formatTime(event.timestamp)}</span>
          </div>
          <Badge
            variant="outline"
            className={cn('shrink-0 text-xs capitalize', status.color)}
          >
            {status.label}
          </Badge>
        </div>
      </div>
    </div>
  );
}

export function ActivityTimeline({
  events = mockActivityEvents,
  className,
  maxItems = 10,
  showFilters = false,
}: ActivityTimelineProps) {
  const [selectedCategories, setSelectedCategories] = React.useState<ActivityCategory[]>([]);

  const filteredEvents =
    selectedCategories.length > 0
      ? events.filter((e) => selectedCategories.includes(e.category))
      : events;

  const displayedEvents = filteredEvents.slice(0, maxItems);

  const toggleCategory = (category: ActivityCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Category filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(categoryConfig).map(([key, config]) => {
            const category = key as ActivityCategory;
            const isSelected = selectedCategories.includes(category);
            const Icon = config.icon;

            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                  isSelected
                    ? cn(config.bg, config.color)
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {config.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Timeline */}
      <div className="divide-y divide-slate-800/50">
        {displayedEvents.map((event) => (
          <ActivityItem key={event.id} event={event} />
        ))}
      </div>

      {/* Load more indicator */}
      {filteredEvents.length > maxItems && (
        <div className="text-center">
          <button className="text-sm text-slate-400 hover:text-white">
            View {filteredEvents.length - maxItems} more activities
          </button>
        </div>
      )}
    </div>
  );
}

export default ActivityTimeline;
