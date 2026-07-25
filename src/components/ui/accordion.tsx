'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion provider');
  }
  return context;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

function Accordion({
  type = 'multiple',
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
  ...props
}: AccordionProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const value = controlledValue
    ? Array.isArray(controlledValue)
      ? controlledValue
      : [controlledValue]
    : uncontrolledValue;

  const toggleItem = React.useCallback(
    (itemValue: string) => {
      let newValue: string[];

      if (type === 'single') {
        newValue = value.includes(itemValue) ? [] : [itemValue];
      } else {
        newValue = value.includes(itemValue)
          ? value.filter((v) => v !== itemValue)
          : [...value, itemValue];
      }

      if (onValueChange) {
        onValueChange(type === 'single' ? newValue[0] || '' : newValue);
      } else {
        setUncontrolledValue(newValue);
      }
    },
    [type, value, onValueChange]
  );

  return (
    <AccordionContext.Provider value={{ expandedItems: value, toggleItem, type }}>
      <div className={cn('space-y-1', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('', className)} data-value={value} {...props}>
        {children}
      </div>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: React.ReactNode;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, value, icon, children, ...props }, ref) => {
    const { expandedItems, toggleItem } = useAccordion();
    const isExpanded = expandedItems.includes(value);

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => toggleItem(value)}
        className={cn(
          'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/50 hover:text-white',
          isExpanded && 'bg-slate-800/30 text-white',
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="flex-1">{children}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200',
            isExpanded && 'rotate-180'
          )}
        />
      </button>
    );
  }
);
AccordionTrigger.displayName = 'AccordionTrigger';

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { expandedItems } = useAccordion();
    const isExpanded = expandedItems.includes(value);

    if (!isExpanded) return null;

    return (
      <div
        ref={ref}
        className={cn('overflow-hidden pl-4', className)}
        {...props}
      >
        <div className="py-1">{children}</div>
      </div>
    );
  }
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
