import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'default' | 'lg';
  showValue?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, variant = 'default', size = 'default', showValue, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const variants = {
      default: 'bg-gradient-to-r from-blue-600 to-cyan-600',
      success: 'bg-gradient-to-r from-emerald-600 to-green-500',
      warning: 'bg-gradient-to-r from-amber-600 to-yellow-500',
      danger: 'bg-gradient-to-r from-red-600 to-red-500',
    };

    const sizes = {
      sm: 'h-1',
      default: 'h-2',
      lg: 'h-3',
    };

    return (
      <div className={cn('relative', className)}>
        <div
          ref={ref}
          className={cn('w-full overflow-hidden rounded-full bg-slate-800', sizes[size])}
          {...props}
        >
          <div
            className={cn('h-full rounded-full transition-all duration-300', variants[variant])}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <span className="absolute right-0 top-full mt-1 text-xs text-slate-400">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };
