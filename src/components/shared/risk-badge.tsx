'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Info,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'minimal' | 'none';

export interface RiskBadgeProps {
  level: RiskLevel;
  label?: string;
  showIcon?: boolean;
  showLabel?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  tooltip?: string;
  className?: string;
}

const riskConfig: Record<
  RiskLevel,
  { icon: LucideIcon; color: string; bgColor: string; label: string; borderColor: string }
> = {
  critical: {
    icon: ShieldAlert,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    label: 'Critical',
  },
  high: {
    icon: AlertTriangle,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    label: 'High',
  },
  medium: {
    icon: AlertCircle,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    label: 'Medium',
  },
  low: {
    icon: Info,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    label: 'Low',
  },
  minimal: {
    icon: CheckCircle2,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    label: 'Minimal',
  },
  none: {
    icon: ShieldCheck,
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/30',
    label: 'None',
  },
};

const sizeClasses = {
  xs: { badge: 'h-5 px-1.5 text-[10px]', icon: 'h-3 w-3' },
  sm: { badge: 'h-6 px-2 text-xs', icon: 'h-3.5 w-3.5' },
  md: { badge: 'h-7 px-2.5 text-sm', icon: 'h-4 w-4' },
  lg: { badge: 'h-8 px-3 text-sm', icon: 'h-5 w-5' },
};

export function RiskBadge({
  level,
  label,
  showIcon = true,
  showLabel = true,
  size = 'sm',
  tooltip,
  className,
}: RiskBadgeProps) {
  const config = riskConfig[level];
  const Icon = config.icon;
  const displayLabel = label || config.label;

  const badge = (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        config.bgColor,
        config.borderColor,
        config.color,
        sizeClasses[size].badge,
        className
      )}
    >
      {showIcon && <Icon className={sizeClasses[size].icon} />}
      {showLabel && <span>{displayLabel}</span>}
    </div>
  );

  if (tooltip) {
    return <Tooltip content={tooltip}>{badge}</Tooltip>;
  }

  return badge;
}

// Risk Score Display
export interface RiskScoreProps {
  score: number;
  maxScore?: number;
  label?: string;
  showBar?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RiskScore({
  score,
  maxScore = 100,
  label = 'Risk Score',
  showBar = true,
  size = 'md',
  className,
}: RiskScoreProps) {
  const percentage = (score / maxScore) * 100;

  let level: RiskLevel;
  if (percentage >= 80) level = 'critical';
  else if (percentage >= 60) level = 'high';
  else if (percentage >= 40) level = 'medium';
  else if (percentage >= 20) level = 'low';
  else level = 'minimal';

  const config = riskConfig[level];

  const sizeStyles = {
    sm: { text: 'text-lg', label: 'text-xs', bar: 'h-1.5' },
    md: { text: 'text-2xl', label: 'text-sm', bar: 'h-2' },
    lg: { text: 'text-3xl', label: 'text-base', bar: 'h-2.5' },
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-baseline gap-2">
        <span className={cn('font-bold', config.color, sizeStyles[size].text)}>{score}</span>
        <span className="text-slate-500">/ {maxScore}</span>
      </div>

      {label && <p className={cn('text-slate-400', sizeStyles[size].label)}>{label}</p>}

      {showBar && (
        <div className={cn('w-full overflow-hidden rounded-full bg-slate-800', sizeStyles[size].bar)}>
          <div
            className={cn('h-full rounded-full transition-all', config.bgColor.replace('/10', ''))}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}

      <RiskBadge level={level} size="sm" />
    </div>
  );
}

// Risk Indicator Dot
export function RiskDot({
  level,
  size = 'sm',
  pulse = false,
  className,
}: {
  level: RiskLevel;
  size?: 'xs' | 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}) {
  const config = riskConfig[level];

  const sizeClasses = {
    xs: 'h-2 w-2',
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
  };

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'rounded-full',
          config.bgColor.replace('/10', ''),
          sizeClasses[size]
        )}
      />
      {pulse && (
        <div
          className={cn(
            'absolute inset-0 animate-ping rounded-full opacity-75',
            config.bgColor.replace('/10', ''),
            sizeClasses[size]
          )}
        />
      )}
    </div>
  );
}

export default RiskBadge;
