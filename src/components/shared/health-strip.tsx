'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  Heart,
  Droplets,
  Shield,
  Brain,
  Clock,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';

export interface HealthScoreItem {
  id: string;
  title: string;
  score: number | string;
  maxScore?: number;
  unit?: string;
  trend?: number;
  trendDirection?: 'up' | 'down' | 'neutral';
  status: 'green' | 'yellow' | 'red' | 'blue';
  tooltip?: string;
  icon?: LucideIcon;
  drilldownHref?: string;
}

export interface HealthStripProps {
  items?: HealthScoreItem[];
  className?: string;
  onItemClick?: (item: HealthScoreItem) => void;
}

// Default executive health scores
export const defaultHealthScores: HealthScoreItem[] = [
  {
    id: 'enterprise-health',
    title: 'Enterprise Health Score',
    score: 82,
    maxScore: 100,
    trend: 4,
    trendDirection: 'up',
    status: 'green',
    tooltip: 'Overall enterprise financial health based on liquidity, profitability, and risk metrics',
    icon: Heart,
    drilldownHref: '/executive/command-center',
  },
  {
    id: 'liquidity-score',
    title: 'Liquidity Score',
    score: 88,
    maxScore: 100,
    trend: 2,
    trendDirection: 'up',
    status: 'green',
    tooltip: 'Measure of ability to meet short-term obligations',
    icon: Droplets,
    drilldownHref: '/treasury/liquidity',
  },
  {
    id: 'risk-score',
    title: 'Enterprise Risk Score',
    score: 24,
    maxScore: 100,
    trend: -3,
    trendDirection: 'down',
    status: 'green',
    tooltip: 'Lower is better. Composite risk score across all risk categories',
    icon: Shield,
    drilldownHref: '/treasury/risk',
  },
  {
    id: 'ai-confidence',
    title: 'AI Confidence Score',
    score: 94,
    maxScore: 100,
    trend: 1,
    trendDirection: 'up',
    status: 'blue',
    tooltip: 'AI model confidence in current forecasts and recommendations',
    icon: Brain,
    drilldownHref: '/executive/command-center',
  },
  {
    id: 'cash-runway',
    title: 'Cash Runway',
    score: '8.5',
    unit: 'months',
    trend: 0.3,
    trendDirection: 'up',
    status: 'green',
    tooltip: 'Estimated months of operation possible with current cash reserves',
    icon: Clock,
    drilldownHref: '/cash-flow/forecasting',
  },
  {
    id: 'board-status',
    title: 'Board Status',
    score: 'On Track',
    status: 'green',
    tooltip: 'Overall status for board-level KPIs and milestones',
    icon: CheckCircle2,
    drilldownHref: '/financial-close/board-reports',
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case 'green':
      return {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        glow: 'shadow-emerald-500/20',
      };
    case 'yellow':
      return {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
        glow: 'shadow-yellow-500/20',
      };
    case 'red':
      return {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        glow: 'shadow-red-500/20',
      };
    case 'blue':
      return {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        glow: 'shadow-blue-500/20',
      };
    default:
      return {
        bg: 'bg-slate-500/10',
        border: 'border-slate-500/30',
        text: 'text-slate-400',
        glow: 'shadow-slate-500/20',
      };
  }
}

function HealthScoreCard({ item, onClick }: { item: HealthScoreItem; onClick?: () => void }) {
  const statusColors = getStatusColor(item.status);
  const Icon = item.icon;

  const TrendIcon =
    item.trendDirection === 'up'
      ? TrendingUp
      : item.trendDirection === 'down'
      ? TrendingDown
      : Minus;

  const displayScore =
    typeof item.score === 'number'
      ? item.maxScore
        ? `${item.score}/${item.maxScore}`
        : item.score.toString()
      : item.score;

  return (
    <Card
      className={cn(
        'relative cursor-pointer overflow-hidden border p-4 transition-all duration-200',
        'hover:shadow-lg hover:shadow-slate-900/50',
        statusColors.border,
        'bg-slate-900/50'
      )}
      onClick={onClick}
    >
      {/* Status indicator line */}
      <div className={cn('absolute left-0 top-0 h-full w-1', statusColors.bg.replace('/10', ''))} />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 pl-2">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', statusColors.bg)}>
              <Icon className={cn('h-4 w-4', statusColors.text)} />
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-slate-400">{item.title}</span>
            {item.tooltip && (
              <Tooltip content={item.tooltip}>
                <Info className="h-3 w-3 cursor-help text-slate-500" />
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="mt-3 pl-2">
        <div className="flex items-baseline gap-1">
          <span className={cn('text-2xl font-bold', statusColors.text)}>{displayScore}</span>
          {item.unit && <span className="text-sm text-slate-500">{item.unit}</span>}
        </div>
      </div>

      {/* Trend */}
      {item.trend !== undefined && (
        <div className="mt-2 flex items-center gap-1.5 pl-2">
          <TrendIcon
            className={cn(
              'h-3.5 w-3.5',
              item.trendDirection === 'up'
                ? 'text-emerald-400'
                : item.trendDirection === 'down'
                ? 'text-red-400'
                : 'text-slate-400'
            )}
          />
          <span
            className={cn(
              'text-xs font-medium',
              item.trendDirection === 'up'
                ? 'text-emerald-400'
                : item.trendDirection === 'down'
                ? 'text-red-400'
                : 'text-slate-400'
            )}
          >
            {item.trend > 0 ? '+' : ''}
            {item.trend}
            {typeof item.score === 'number' ? ' pts' : ''}
          </span>
          <span className="text-xs text-slate-500">vs last month</span>
        </div>
      )}
    </Card>
  );
}

export function HealthStrip({
  items = defaultHealthScores,
  className,
  onItemClick,
}: HealthStripProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 2xl:grid-cols-6', className)}>
      {items.map((item) => (
        <HealthScoreCard key={item.id} item={item} onClick={() => onItemClick?.(item)} />
      ))}
    </div>
  );
}

export default HealthStrip;
