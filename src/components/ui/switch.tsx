'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, checked, onChange, disabled, ...props }, ref) => {
    return (
      <label className={cn('inline-flex cursor-pointer items-center gap-2', disabled && 'cursor-not-allowed opacity-50')}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'h-6 w-11 rounded-full bg-slate-700 transition-colors peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500/20',
              className
            )}
          />
          <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
        </div>
        {label && <span className="text-sm text-slate-300">{label}</span>}
      </label>
    );
  }
);
Switch.displayName = 'Switch';

export { Switch };
