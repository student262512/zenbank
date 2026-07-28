'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  changeUnit?: string;
  changeLabel?: string;
  changePeriod?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendColor?: 'auto' | 'green' | 'red' | 'yellow' | 'blue';
  icon?: LucideIcon;
  iconColor?: string;
  tooltip?: string;
  aiInsight?: string;
  sparkline?: number[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient' | 'outline';
  onClick?: () => void;
}

function TrendIndicator({
  trend,
  change,
  changeUnit = '',
  trendColor,
  period,
}: {
  trend?: 'up' | 'down' | 'neutral';
  change?: number;
  changeUnit?: string;
  trendColor?: string;
  period?: string;
}) {
  if (change === undefined && !trend) return null;

  const isPositive = trend === 'up' || (change !== undefined && change > 0);
  const isNegative = trend === 'down' || (change !== undefined && change < 0);
  const isNeutral = trend === 'neutral' || change === 0;

  let colorClass = 'text-slate-400';
  let bgClass = 'bg-slate-800/50';

  if (trendColor === 'auto' || !trendColor) {
    if (isPositive) {
      colorClass = 'text-emerald-400';
      bgClass = 'bg-emerald-500/10';
    } else if (isNegative) {
      colorClass = 'text-red-400';
      bgClass = 'bg-red-500/10';
    }
  } else {
    const colors: Record<string, { text: string; bg: string }> = {
      green: { text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
      red: { text: 'text-red-400', bg: 'bg-red-500/10' },
      yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/10' },
      blue: { text: 'text-blue-400', bg: 'bg-blue-500/10' },
    };
    if (colors[trendColor]) {
      colorClass = colors[trendColor].text;
      bgClass = colors[trendColor].bg;
    }
  }

  const Icon = isPositive ? ArrowUpRight : isNegative ? ArrowDownRight : Minus;
  const changeValue = change !== undefined ? Math.abs(change) : null;

  return (
    <div className={cn('flex items-center gap-1.5 rounded-full px-2 py-0.5', bgClass)}>
      <Icon className={cn('h-3.5 w-3.5', colorClass)} />
      {changeValue !== null && (
        <span className={cn('text-xs font-medium', colorClass)}>
          {changeValue.toFixed(1)} {changeUnit}
        </span>
      )}
      {period && <span className="text-xs text-slate-500">{period}</span>}
    </div>
  );
}

function MiniSparkline({ data, className }: { data: number[]; className?: string }) {
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 60;
  const height = 24;
  const padding = 2;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const trend = data[data.length - 1] >= data[0];
  const strokeColor = trend ? '#34d399' : '#f87171';

  return (
    <svg
      width={width}
      height={height}
      className={cn('overflow-visible', className)}
    >
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function KPICard({
  title,
  value,
  subtitle,
  change,
  changeLabel,
  changePeriod,
  trend,
  trendColor = 'auto',
  icon: Icon,
  iconColor,
  tooltip,
  aiInsight,
  sparkline,
  className,
  size = 'md',
  variant = 'default',
  onClick,
}: KPICardProps) {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const valueSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const variantClasses = {
    default: 'bg-slate-900/50 border-slate-800',
    gradient: 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700',
    outline: 'bg-transparent border-slate-700',
  };

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-200',
        variantClasses[variant],
        onClick && 'cursor-pointer hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/50',
        sizeClasses[size],
        className
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {Icon && (
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg',
                iconColor || 'bg-blue-500/10 text-blue-400'
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-slate-400">{title}</span>
            {tooltip && (
              <Tooltip content={tooltip}>
                <Info className="h-3.5 w-3.5 cursor-help text-slate-500" />
              </Tooltip>
            )}
          </div>
        </div>
        {sparkline && <MiniSparkline data={sparkline} />}
      </div>

      {/* Value */}
      <div className="mt-3">
        <div className={cn('font-bold text-white', valueSizeClasses[size])}>
          {value}
        </div>
        {subtitle && (
          <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
        )}
      </div>

      {/* Change & Trend */}
      <div className="mt-3 flex items-center justify-between">
        <TrendIndicator
          trend={trend}
          change={change}
          trendColor={trendColor}
          period={changePeriod}
        />
        {changeLabel && (
          <span className="text-xs text-slate-500">{changeLabel}</span>
        )}
      </div>

      {/* AI Insight */}
      {aiInsight && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-blue-500/5 p-2">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" />
          <p className="text-xs text-slate-400">{aiInsight}</p>
        </div>
      )}
    </Card>
  );
}

// KPI Card Grid
export function KPIGrid({
  children,
  className,
  columns = 4,
}: {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4 | 5 | 6 | 7 | 8;
}) {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6',
    7: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7',
    8: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-8',
  };

  return (
    <div className={cn('grid gap-4', columnClasses[columns], className)}>
      {children}
    </div>
  );
}

export default KPICard;
