import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', dismissible, onDismiss, children, ...props }, ref) => {
    const variants = {
      default: {
        container: 'border-slate-700 bg-slate-800/50',
        icon: <Info className="h-5 w-5 text-slate-400" />,
      },
      info: {
        container: 'border-blue-700 bg-blue-900/30',
        icon: <Info className="h-5 w-5 text-blue-400" />,
      },
      success: {
        container: 'border-emerald-700 bg-emerald-900/30',
        icon: <CheckCircle className="h-5 w-5 text-emerald-400" />,
      },
      warning: {
        container: 'border-amber-700 bg-amber-900/30',
        icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
      },
      error: {
        container: 'border-red-700 bg-red-900/30',
        icon: <AlertCircle className="h-5 w-5 text-red-400" />,
      },
    };

    const variantStyles = variants[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative flex items-start gap-3 rounded-lg border p-4',
          variantStyles.container,
          className
        )}
        {...props}
      >
        <div className="shrink-0">{variantStyles.icon}</div>
        <div className="flex-1">{children}</div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-700 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight text-white', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-slate-400', className)} {...props} />
  )
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
