'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import {
  Heart,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle2,
  Info,
  type LucideIcon,
} from 'lucide-react';

export type HealthStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

export interface HealthScoreProps {
  score: number;
  maxScore?: number;
  label?: string;
  subtitle?: string;
  trend?: number;
  trendPeriod?: string;
  breakdown?: {
    label: string;
    value: number;
    maxValue?: number;
    status?: HealthStatus;
  }[];
  size?: 'sm' | 'md' | 'lg';
  showGauge?: boolean;
  className?: string;
}

const healthConfig: Record<
  HealthStatus,
  { color: string; bgColor: string; label: string; icon: LucideIcon }
> = {
  excellent: {
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500',
    label: 'Excellent',
    icon: CheckCircle2,
  },
  good: {
    color: 'text-green-400',
    bgColor: 'bg-green-500',
    label: 'Good',
    icon: CheckCircle2,
  },
  fair: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500',
    label: 'Fair',
    icon: Info,
  },
  poor: {
    color: 'text-orange-400',
    bgColor: 'bg-orange-500',
    label: 'Poor',
    icon: AlertTriangle,
  },
  critical: {
    color: 'text-red-400',
    bgColor: 'bg-red-500',
    label: 'Critical',
    icon: AlertTriangle,
  },
};

function getHealthStatus(percentage: number): HealthStatus {
  if (percentage >= 90) return 'excellent';
  if (percentage >= 75) return 'good';
  if (percentage >= 50) return 'fair';
  if (percentage >= 25) return 'poor';
  return 'critical';
}

export function HealthScore({
  score,
  maxScore = 100,
  label = 'Health Score',
  subtitle,
  trend,
  trendPeriod,
  breakdown,
  size = 'md',
  showGauge = true,
  className,
}: HealthScoreProps) {
  const percentage = (score / maxScore) * 100;
  const status = getHealthStatus(percentage);
  const config = healthConfig[status];
  const StatusIcon = config.icon;

  const sizeStyles = {
    sm: {
      score: 'text-2xl',
      label: 'text-xs',
      gauge: 80,
      strokeWidth: 6,
    },
    md: {
      score: 'text-4xl',
      label: 'text-sm',
      gauge: 120,
      strokeWidth: 8,
    },
    lg: {
      score: 'text-5xl',
      label: 'text-base',
      gauge: 160,
      strokeWidth: 10,
    },
  };

  const styles = sizeStyles[size];
  const radius = (styles.gauge - styles.strokeWidth) / 2;
  const circumference = radius * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-start gap-6">
        {/* Gauge */}
        {showGauge && (
          <div className="relative" style={{ width: styles.gauge, height: styles.gauge / 2 + 10 }}>
            <svg
              viewBox={`0 0 ${styles.gauge} ${styles.gauge / 2 + 10}`}
              className="overflow-visible"
            >
              {/* Background arc */}
              <path
                d={`M ${styles.strokeWidth / 2} ${styles.gauge / 2} A ${radius} ${radius} 0 0 1 ${styles.gauge - styles.strokeWidth / 2} ${styles.gauge / 2}`}
                fill="none"
                stroke="#334155"
                strokeWidth={styles.strokeWidth}
                strokeLinecap="round"
              />
              {/* Foreground arc */}
              <path
                d={`M ${styles.strokeWidth / 2} ${styles.gauge / 2} A ${radius} ${radius} 0 0 1 ${styles.gauge - styles.strokeWidth / 2} ${styles.gauge / 2}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={styles.strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className={cn('transition-all duration-500', config.color)}
              />
            </svg>
            {/* Score in center */}
            <div className="absolute inset-x-0 bottom-0 text-center">
              <span className={cn('font-bold', config.color, styles.score)}>{score}</span>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-400">{label}</span>
            <Badge
              className={cn(
                'gap-1 border-0',
                config.bgColor.replace('bg-', 'bg-') + '/10',
                config.color
              )}
            >
              <StatusIcon className="h-3 w-3" />
              {config.label}
            </Badge>
          </div>

          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}

          {/* Trend */}
          {trend !== undefined && (
            <div className="mt-3 flex items-center gap-2">
              {trend > 0 ? (
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              ) : trend < 0 ? (
                <TrendingDown className="h-4 w-4 text-red-400" />
              ) : (
                <Minus className="h-4 w-4 text-slate-400" />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  trend > 0 ? 'text-emerald-400' : trend < 0 ? 'text-red-400' : 'text-slate-400'
                )}
              >
                {trend > 0 ? '+' : ''}
                {trend}%
              </span>
              {trendPeriod && <span className="text-xs text-slate-500">{trendPeriod}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Breakdown */}
      {breakdown && breakdown.length > 0 && (
        <div className="space-y-3 border-t border-slate-800 pt-4">
          {breakdown.map((item, i) => {
            const itemPercentage = (item.value / (item.maxValue || 100)) * 100;
            const itemStatus = item.status || getHealthStatus(itemPercentage);
            const itemConfig = healthConfig[itemStatus];

            return (
              <div key={i}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className={cn('text-xs font-medium', itemConfig.color)}>
                    {item.value}%
                  </span>
                </div>
                <Progress
                  value={itemPercentage}
                  size="sm"
                  variant={
                    itemStatus === 'excellent' || itemStatus === 'good'
                      ? 'success'
                      : itemStatus === 'fair'
                      ? 'warning'
                      : 'danger'
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Simple Health Indicator
export function HealthIndicator({
  status,
  label,
  showLabel = true,
  size = 'sm',
  className,
}: {
  status: HealthStatus;
  label?: string;
  showLabel?: boolean;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}) {
  const config = healthConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    xs: { icon: 'h-3 w-3', text: 'text-[10px]' },
    sm: { icon: 'h-4 w-4', text: 'text-xs' },
    md: { icon: 'h-5 w-5', text: 'text-sm' },
  };

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <Icon className={cn(sizeClasses[size].icon, config.color)} />
      {showLabel && (
        <span className={cn('font-medium', config.color, sizeClasses[size].text)}>
          {label || config.label}
        </span>
      )}
    </div>
  );
}

// Health Score Card
export function HealthScoreCard(props: HealthScoreProps & { title?: string }) {
  const { title, ...healthProps } = props;

  return (
    <Card className="border-slate-800 bg-slate-900/50 p-4">
      {title && (
        <div className="mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-400" />
          <h3 className="font-medium text-white">{title}</h3>
        </div>
      )}
      <HealthScore {...healthProps} />
    </Card>
  );
}

export default HealthScore;
