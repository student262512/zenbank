'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, Minus } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  indeterminate?: boolean;
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate, label, checked, onChange, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => innerRef.current!);

    React.useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

    return (
      <label className="inline-flex cursor-pointer items-center gap-2">
        <div className="relative">
          <input
            ref={innerRef}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded border border-slate-600 bg-slate-900/50 transition-all peer-checked:border-blue-500 peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-500/20 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
              indeterminate && 'border-blue-500 bg-blue-600',
              className
            )}
          >
            {indeterminate ? (
              <Minus className="h-3 w-3 text-white" />
            ) : (
              checked && <Check className="h-3 w-3 text-white" />
            )}
          </div>
        </div>
        {label && <span className="text-sm text-slate-300">{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
