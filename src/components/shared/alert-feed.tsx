'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Droplets,
  CreditCard,
  FileCheck,
  FolderKanban,
  TrendingUp,
  Receipt,
  Landmark,
  DollarSign,
  Shield,
  Sparkles,
  ChevronRight,
  Clock,
  type LucideIcon,
} from 'lucide-react';

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlertCategory =
  | 'liquidity'
  | 'debt'
  | 'covenants'
  | 'projects'
  | 'investments'
  | 'collections'
  | 'treasury'
  | 'fx'
  | 'compliance';

export interface ExecutiveAlert {
  id: string;
  severity: AlertSeverity;
  category: AlertCategory;
  title: string;
  description: string;
  financialImpact?: string;
  aiRecommendation?: string;
  timestamp: Date;
  actionLabel?: string;
  actionHref?: string;
}

export interface AlertFeedProps {
  alerts: ExecutiveAlert[];
  className?: string;
  maxItems?: number;
  onAlertClick?: (alert: ExecutiveAlert) => void;
  onActionClick?: (alert: ExecutiveAlert) => void;
}

const categoryIcons: Record<AlertCategory, LucideIcon> = {
  liquidity: Droplets,
  debt: CreditCard,
  covenants: FileCheck,
  projects: FolderKanban,
  investments: TrendingUp,
  collections: Receipt,
  treasury: Landmark,
  fx: DollarSign,
  compliance: Shield,
};

const severityConfig: Record<
  AlertSeverity,
  { icon: LucideIcon; color: string; bg: string; border: string }
> = {
  critical: {
    icon: AlertTriangle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
  },
  high: {
    icon: AlertCircle,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
  },
  medium: {
    icon: AlertCircle,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
  },
  low: {
    icon: Info,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
};

// Mock executive alerts data
export const mockExecutiveAlerts: ExecutiveAlert[] = [
  {
    id: '1',
    severity: 'critical',
    category: 'liquidity',
    title: 'Liquidity Shortfall Alert',
    description: 'Projected cash deficit of ₹45 Cr in 7 days due to scheduled loan repayment',
    financialImpact: '₹45 Cr',
    aiRecommendation: 'Recommend drawing ₹50 Cr from HDFC credit facility to maintain buffer',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    actionLabel: 'View Details',
    actionHref: '/treasury/liquidity',
  },
  {
    id: '2',
    severity: 'high',
    category: 'covenants',
    title: 'DSCR Approaching Threshold',
    description: 'DSCR at 1.32x vs 1.25x minimum covenant. Risk of breach in Q4',
    financialImpact: '₹120 Cr facility at risk',
    aiRecommendation: 'Accelerate collections or defer ₹25 Cr non-essential capex',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    actionLabel: 'Review Covenant',
    actionHref: '/covenants/dashboard',
  },
  {
    id: '3',
    severity: 'high',
    category: 'collections',
    title: 'Major Collection Delay',
    description: 'Expected ₹85 Cr from Metro Phase 1 delayed by 30 days',
    financialImpact: '₹85 Cr delayed',
    aiRecommendation: 'Escalate with project team. Consider bridge financing if delay extends',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    actionLabel: 'Track Collection',
    actionHref: '/collections/dashboard',
  },
  {
    id: '4',
    severity: 'medium',
    category: 'projects',
    title: 'Project Underfunding Risk',
    description: 'Gujarat Solar Park showing 15% funding gap for Q4 milestones',
    financialImpact: '₹28 Cr shortfall',
    aiRecommendation: 'Request additional draw from project loan or reallocate from Pune project',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    actionLabel: 'View Project',
    actionHref: '/project-finance/funding-sources',
  },
  {
    id: '5',
    severity: 'medium',
    category: 'fx',
    title: 'FX Exposure Increase',
    description: 'USD exposure increased to $45M with only 65% hedged',
    financialImpact: '₹12 Cr potential loss',
    aiRecommendation: 'Consider forward contract for remaining $15M exposure',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    actionLabel: 'Hedge Now',
    actionHref: '/treasury/fx',
  },
  {
    id: '6',
    severity: 'medium',
    category: 'treasury',
    title: 'Idle Cash Opportunity',
    description: '₹125 Cr sitting idle across 3 current accounts',
    financialImpact: '+₹2.5 Cr/year potential',
    aiRecommendation: 'Deploy ₹100 Cr in overnight liquid funds for better yield',
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    actionLabel: 'Optimize',
    actionHref: '/treasury/investments',
  },
  {
    id: '7',
    severity: 'low',
    category: 'debt',
    title: 'Refinancing Opportunity',
    description: '₹200 Cr loan maturing in 90 days at 10.5% can be refinanced at 9.25%',
    financialImpact: '+₹2.5 Cr/year savings',
    aiRecommendation: 'Initiate refinancing discussion with ICICI Bank',
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    actionLabel: 'Start Refinance',
    actionHref: '/loan-debt/refinancing',
  },
  {
    id: '8',
    severity: 'low',
    category: 'investments',
    title: 'FD Maturity Reminder',
    description: '₹50 Cr FD maturing in 5 days with SBI',
    financialImpact: '₹50 Cr',
    aiRecommendation: 'Reinvest at current rates or deploy for upcoming payment',
    timestamp: new Date(Date.now() - 1000 * 60 * 360),
    actionLabel: 'Plan Reinvestment',
    actionHref: '/investments/fds',
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

function AlertCard({
  alert,
  onClick,
  onActionClick,
}: {
  alert: ExecutiveAlert;
  onClick?: () => void;
  onActionClick?: () => void;
}) {
  const severity = severityConfig[alert.severity];
  const CategoryIcon = categoryIcons[alert.category];
  const SeverityIcon = severity.icon;

  return (
    <Card
      className={cn(
        'cursor-pointer border p-4 transition-all duration-200 hover:shadow-lg',
        severity.border,
        'bg-slate-900/50'
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', severity.bg)}>
            <SeverityIcon className={cn('h-5 w-5', severity.color)} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="truncate text-sm font-medium text-white">{alert.title}</h4>
              <Badge variant="outline" className="shrink-0 text-xs capitalize">
                <CategoryIcon className="mr-1 h-3 w-3" />
                {alert.category}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-slate-400">{alert.description}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-xs text-slate-500">
          <Clock className="h-3 w-3" />
          {formatTimeAgo(alert.timestamp)}
        </div>
      </div>

      {/* Financial Impact */}
      {alert.financialImpact && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-slate-500">Impact:</span>
          <span className={cn('text-sm font-semibold', severity.color)}>{alert.financialImpact}</span>
        </div>
      )}

      {/* AI Recommendation */}
      {alert.aiRecommendation && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-blue-500/5 p-2">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
          <p className="text-xs text-slate-400">{alert.aiRecommendation}</p>
        </div>
      )}

      {/* Action */}
      {alert.actionLabel && (
        <div className="mt-3 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className={cn('gap-1', severity.color)}
            onClick={(e) => {
              e.stopPropagation();
              onActionClick?.();
            }}
          >
            {alert.actionLabel}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  );
}

export function AlertFeed({
  alerts = mockExecutiveAlerts,
  className,
  maxItems = 5,
  onAlertClick,
  onActionClick,
}: AlertFeedProps) {
  const displayedAlerts = alerts.slice(0, maxItems);
  const remainingCount = alerts.length - maxItems;

  // Group alerts by severity for summary
  const alertCounts = {
    critical: alerts.filter((a) => a.severity === 'critical').length,
    high: alerts.filter((a) => a.severity === 'high').length,
    medium: alerts.filter((a) => a.severity === 'medium').length,
    low: alerts.filter((a) => a.severity === 'low').length,
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Summary badges */}
      <div className="flex flex-wrap items-center gap-2">
        {alertCounts.critical > 0 && (
          <Badge variant="danger" className="gap-1">
            <AlertTriangle className="h-3 w-3" />
            {alertCounts.critical} Critical
          </Badge>
        )}
        {alertCounts.high > 0 && (
          <Badge variant="warning" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            {alertCounts.high} High
          </Badge>
        )}
        {alertCounts.medium > 0 && (
          <Badge variant="secondary" className="gap-1">
            {alertCounts.medium} Medium
          </Badge>
        )}
        {alertCounts.low > 0 && (
          <Badge variant="outline" className="gap-1">
            {alertCounts.low} Low
          </Badge>
        )}
      </div>

      {/* Alert cards */}
      <div className="space-y-3">
        {displayedAlerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onClick={() => onAlertClick?.(alert)}
            onActionClick={() => onActionClick?.(alert)}
          />
        ))}
      </div>

      {/* Show more */}
      {remainingCount > 0 && (
        <Button variant="outline" className="w-full" size="sm">
          View {remainingCount} more alerts
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export default AlertFeed;
