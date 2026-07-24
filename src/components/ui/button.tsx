import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants = {
      default:
        'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg',
      destructive:
        'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md hover:from-red-700 hover:to-red-600',
      outline:
        'border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white',
      secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700',
      ghost: 'text-slate-400 hover:bg-slate-800 hover:text-white',
      link: 'text-blue-400 underline-offset-4 hover:underline hover:text-blue-300',
    };

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-12 px-6 text-base',
      icon: 'h-10 w-10',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
