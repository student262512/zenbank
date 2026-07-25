'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface RadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
  name: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
  const context = React.useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }
  return context;
}

function RadioGroup({
  value,
  onChange,
  children,
  className,
  orientation = 'vertical',
}: RadioGroupProps) {
  const name = React.useId();

  return (
    <RadioGroupContext.Provider value={{ value, onChange, name }}>
      <div
        role="radiogroup"
        className={cn(
          'flex gap-3',
          orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
          className
        )}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string;
  label?: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, label, disabled, ...props }, ref) => {
    const { value: groupValue, onChange, name } = useRadioGroup();
    const isChecked = value === groupValue;

    return (
      <label
        className={cn(
          'inline-flex cursor-pointer items-center gap-2',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <div className="relative">
          <input
            ref={ref}
            type="radio"
            name={name}
            value={value}
            checked={isChecked}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-600 bg-slate-900/50 transition-all peer-checked:border-blue-500 peer-focus:ring-2 peer-focus:ring-blue-500/20',
              className
            )}
          >
            {isChecked && (
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            )}
          </div>
        </div>
        {label && <span className="text-sm text-slate-300">{label}</span>}
      </label>
    );
  }
);
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
