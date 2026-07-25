'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { type LucideIcon } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  progress?: number;
  progressLabel?: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger';
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  progress,
  progressLabel,
  badge,
  badgeVariant = 'default',
  footer,
  className,
  onClick,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        'bg-slate-900/50 border-slate-800 p-4 transition-all duration-200',
        onClick && 'cursor-pointer hover:border-slate-700 hover:bg-slate-900/80',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-400">{title}</span>
            {badge && (
              <Badge variant={badgeVariant} className="h-5 px-1.5 text-[10px]">
                {badge}
              </Badge>
            )}
          </div>
          <div className="mt-2 text-2xl font-bold text-white">{value}</div>
          {description && (
            <p className="mt-1 text-xs text-slate-500">{description}</p>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800',
              iconClassName
            )}
          >
            <Icon className="h-5 w-5 text-slate-400" />
          </div>
        )}
      </div>

      {progress !== undefined && (
        <div className="mt-4">
          <Progress value={progress} size="sm" />
          {progressLabel && (
            <p className="mt-1.5 text-xs text-slate-500">{progressLabel}</p>
          )}
        </div>
      )}

      {footer && (
        <div className="mt-4 border-t border-slate-800 pt-3">{footer}</div>
      )}
    </Card>
  );
}

// Comparison Stat Card
export interface ComparisonStatProps {
  title: string;
  current: string | number;
  previous: string | number;
  currentLabel?: string;
  previousLabel?: string;
  change?: number;
  className?: string;
}

export function ComparisonStat({
  title,
  current,
  previous,
  currentLabel = 'Current',
  previousLabel = 'Previous',
  change,
  className,
}: ComparisonStatProps) {
  return (
    <Card className={cn('bg-slate-900/50 border-slate-800 p-4', className)}>
      <span className="text-sm font-medium text-slate-400">{title}</span>

      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-500">{currentLabel}</p>
          <p className="mt-1 text-xl font-bold text-white">{current}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">{previousLabel}</p>
          <p className="mt-1 text-xl font-bold text-slate-400">{previous}</p>
        </div>
      </div>

      {change !== undefined && (
        <div className="mt-3 flex items-center gap-2">
          <div
            className={cn(
              'rounded-full px-2 py-0.5 text-xs font-medium',
              change >= 0
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-red-500/10 text-red-400'
            )}
          >
            {change >= 0 ? '+' : ''}
            {change.toFixed(1)}%
          </div>
          <span className="text-xs text-slate-500">vs previous period</span>
        </div>
      )}
    </Card>
  );
}

// Mini Stat
export interface MiniStatProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  className?: string;
}

export function MiniStat({ label, value, icon: Icon, className }: MiniStatProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {Icon && (
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
          <Icon className="h-4 w-4 text-slate-400" />
        </div>
      )}
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
