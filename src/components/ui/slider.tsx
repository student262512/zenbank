'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value = 0, min = 0, max = 100, step = 1, onChange, showValue, ...props }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <div className={cn('relative w-full', className)}>
        <div className="relative h-2 w-full rounded-full bg-slate-800">
          <div
            className="absolute h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-600"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
          {...props}
        />
        {showValue && (
          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>{min}</span>
            <span className="font-medium text-white">{value}</span>
            <span>{max}</span>
          </div>
        )}
      </div>
    );
  }
);
Slider.displayName = 'Slider';

export { Slider };
