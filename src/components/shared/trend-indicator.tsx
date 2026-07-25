'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface TrendIndicatorProps {
  value: number;
  format?: 'percentage' | 'number' | 'currency';
  currency?: string;
  showIcon?: boolean;
  showValue?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  invertColors?: boolean;
  className?: string;
  label?: string;
}

export function TrendIndicator({
  value,
  format = 'percentage',
  currency = '₹',
  showIcon = true,
  showValue = true,
  size = 'sm',
  invertColors = false,
  className,
  label,
}: TrendIndicatorProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;

  let colorClass = 'text-slate-400';
  let bgClass = 'bg-slate-800/50';

  if (isPositive) {
    colorClass = invertColors ? 'text-red-400' : 'text-emerald-400';
    bgClass = invertColors ? 'bg-red-500/10' : 'bg-emerald-500/10';
  } else if (isNegative) {
    colorClass = invertColors ? 'text-emerald-400' : 'text-red-400';
    bgClass = invertColors ? 'bg-emerald-500/10' : 'bg-red-500/10';
  }

  const sizeClasses = {
    xs: { icon: 'h-3 w-3', text: 'text-[10px]', padding: 'px-1.5 py-0.5' },
    sm: { icon: 'h-3.5 w-3.5', text: 'text-xs', padding: 'px-2 py-0.5' },
    md: { icon: 'h-4 w-4', text: 'text-sm', padding: 'px-2.5 py-1' },
    lg: { icon: 'h-5 w-5', text: 'text-base', padding: 'px-3 py-1.5' },
  };

  const Icon = isNeutral ? Minus : isPositive ? ArrowUpRight : ArrowDownRight;

  const formatValue = () => {
    const absValue = Math.abs(value);
    switch (format) {
      case 'percentage':
        return `${absValue.toFixed(1)}%`;
      case 'currency':
        return `${currency}${absValue.toLocaleString()}`;
      case 'number':
      default:
        return absValue.toLocaleString();
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full',
        bgClass,
        sizeClasses[size].padding,
        className
      )}
    >
      {showIcon && <Icon className={cn(sizeClasses[size].icon, colorClass)} />}
      {showValue && (
        <span className={cn('font-medium', sizeClasses[size].text, colorClass)}>
          {isPositive && '+'}
          {formatValue()}
        </span>
      )}
      {label && (
        <span className={cn('text-slate-500', sizeClasses[size].text)}>{label}</span>
      )}
    </div>
  );
}

// Large trend display with more details
export interface TrendDisplayProps {
  value: number;
  previousValue?: number;
  label?: string;
  period?: string;
  format?: 'percentage' | 'number' | 'currency';
  className?: string;
}

export function TrendDisplay({
  value,
  previousValue,
  label,
  period,
  format = 'percentage',
  className,
}: TrendDisplayProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;

  const Icon = value === 0 ? Minus : isPositive ? TrendingUp : TrendingDown;
  const colorClass = value === 0 ? 'text-slate-400' : isPositive ? 'text-emerald-400' : 'text-red-400';

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl',
          value === 0
            ? 'bg-slate-800'
            : isPositive
            ? 'bg-emerald-500/10'
            : 'bg-red-500/10'
        )}
      >
        <Icon className={cn('h-6 w-6', colorClass)} />
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className={cn('text-2xl font-bold', colorClass)}>
            {isPositive && '+'}
            {value.toFixed(1)}%
          </span>
          {period && <span className="text-sm text-slate-500">{period}</span>}
        </div>
        {label && <p className="text-sm text-slate-400">{label}</p>}
        {previousValue !== undefined && (
          <p className="text-xs text-slate-500">
            Previous: {previousValue.toFixed(1)}%
          </p>
        )}
      </div>
    </div>
  );
}

export default TrendIndicator;
