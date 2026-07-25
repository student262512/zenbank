import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline' | 'info';
  size?: 'sm' | 'default' | 'lg';
}

function Badge({ className, variant = 'default', size = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    secondary: 'bg-slate-700/50 text-slate-300 border-slate-600/30',
    success: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-600/20 text-amber-400 border-amber-500/30',
    danger: 'bg-red-600/20 text-red-400 border-red-500/30',
    outline: 'bg-transparent text-slate-300 border-slate-600',
    info: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30',
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    default: 'px-2 py-0.5 text-xs',
    lg: 'px-2.5 py-1 text-sm',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
