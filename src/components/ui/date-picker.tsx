'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Calendar } from './calendar';
import { Popover, PopoverTrigger, PopoverContent } from './popover';
import { Button } from './button';
import { formatDate } from '@/lib/formatters';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  className,
  disabled,
  minDate,
  maxDate,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50',
            !value && 'text-slate-500',
            value && 'text-slate-100',
            className
          )}
        >
          <span className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-slate-400" />
            {value ? formatDate(value) : placeholder}
          </span>
          {value && (
            <X
              className="h-4 w-4 text-slate-400 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(undefined);
              }}
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
          minDate={minDate}
          maxDate={maxDate}
        />
      </PopoverContent>
    </Popover>
  );
}

export interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange?: (range: { startDate?: Date; endDate?: Date }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function DateRangePicker({
  startDate,
  endDate,
  onChange,
  placeholder = 'Select date range',
  className,
  disabled,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [selectingEnd, setSelectingEnd] = React.useState(false);

  const handleSelect = (date: Date) => {
    if (!selectingEnd) {
      onChange?.({ startDate: date, endDate: undefined });
      setSelectingEnd(true);
    } else {
      if (startDate && date < startDate) {
        onChange?.({ startDate: date, endDate: startDate });
      } else {
        onChange?.({ startDate, endDate: date });
      }
      setSelectingEnd(false);
      setOpen(false);
    }
  };

  const formatRange = () => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    if (startDate) {
      return `${formatDate(startDate)} - ...`;
    }
    return placeholder;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50',
            !startDate && 'text-slate-500',
            startDate && 'text-slate-100',
            className
          )}
        >
          <span className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-slate-400" />
            {formatRange()}
          </span>
          {(startDate || endDate) && (
            <X
              className="h-4 w-4 text-slate-400 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onChange?.({ startDate: undefined, endDate: undefined });
                setSelectingEnd(false);
              }}
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 border-b border-slate-800">
          <p className="text-xs text-slate-400">
            {selectingEnd ? 'Select end date' : 'Select start date'}
          </p>
        </div>
        <Calendar
          selected={selectingEnd ? endDate : startDate}
          onSelect={handleSelect}
          minDate={selectingEnd ? startDate : undefined}
        />
        <div className="flex justify-end gap-2 border-t border-slate-800 p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onChange?.({ startDate: undefined, endDate: undefined });
              setSelectingEnd(false);
            }}
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, DateRangePicker };
