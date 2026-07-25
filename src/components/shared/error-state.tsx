'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  AlertTriangle,
  XCircle,
  RefreshCw,
  Home,
  ArrowLeft,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: Error | string;
  icon?: LucideIcon;
  variant?: 'default' | 'danger' | 'warning' | 'inline' | 'card';
  size?: 'sm' | 'md' | 'lg';
  onRetry?: () => void;
  onGoBack?: () => void;
  onGoHome?: () => void;
  showDetails?: boolean;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  error,
  icon: Icon = AlertTriangle,
  variant = 'default',
  size = 'md',
  onRetry,
  onGoBack,
  onGoHome,
  showDetails = false,
  className,
}: ErrorStateProps) {
  const [showError, setShowError] = React.useState(false);

  const errorMessage = error instanceof Error ? error.message : error;

  const sizeClasses = {
    sm: {
      container: 'py-6',
      icon: 'h-8 w-8',
      iconWrapper: 'h-14 w-14',
      title: 'text-base',
      message: 'text-xs',
    },
    md: {
      container: 'py-10',
      icon: 'h-10 w-10',
      iconWrapper: 'h-18 w-18',
      title: 'text-lg',
      message: 'text-sm',
    },
    lg: {
      container: 'py-14',
      icon: 'h-12 w-12',
      iconWrapper: 'h-22 w-22',
      title: 'text-xl',
      message: 'text-base',
    },
  };

  const variantClasses = {
    default: {
      iconWrapper: 'bg-red-500/10',
      icon: 'text-red-400',
    },
    danger: {
      iconWrapper: 'bg-red-500/20',
      icon: 'text-red-500',
    },
    warning: {
      iconWrapper: 'bg-yellow-500/10',
      icon: 'text-yellow-400',
    },
    inline: {
      iconWrapper: 'bg-red-500/10',
      icon: 'text-red-400',
    },
    card: {
      iconWrapper: 'bg-red-500/10',
      icon: 'text-red-400',
    },
  };

  const content = (
    <>
      <div
        className={cn(
          'mb-4 flex items-center justify-center rounded-full',
          sizeClasses[size].iconWrapper,
          variantClasses[variant].iconWrapper
        )}
        style={{ height: size === 'sm' ? 56 : size === 'md' ? 72 : 88, width: size === 'sm' ? 56 : size === 'md' ? 72 : 88 }}
      >
        <Icon className={cn(sizeClasses[size].icon, variantClasses[variant].icon)} />
      </div>

      <h3 className={cn('font-semibold text-white', sizeClasses[size].title)}>{title}</h3>

      <p className={cn('mt-2 max-w-md text-slate-400', sizeClasses[size].message)}>{message}</p>

      {/* Error details */}
      {showDetails && errorMessage && (
        <div className="mt-4 w-full max-w-md">
          <button
            onClick={() => setShowError(!showError)}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-400"
          >
            <HelpCircle className="h-3 w-3" />
            {showError ? 'Hide details' : 'Show details'}
          </button>
          {showError && (
            <pre className="mt-2 max-h-32 overflow-auto rounded-lg bg-slate-900 p-3 text-xs text-red-400">
              {errorMessage}
            </pre>
          )}
        </div>
      )}

      {/* Actions */}
      {(onRetry || onGoBack || onGoHome) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {onRetry && (
            <Button onClick={onRetry} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
          {onGoBack && (
            <Button variant="outline" onClick={onGoBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          )}
          {onGoHome && (
            <Button variant="ghost" onClick={onGoHome} className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          )}
        </div>
      )}
    </>
  );

  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg bg-red-500/10 px-4 py-3',
          className
        )}
      >
        <XCircle className="h-5 w-5 shrink-0 text-red-400" />
        <div className="flex-1">
          <p className="text-sm font-medium text-red-400">{title}</p>
          <p className="text-xs text-red-300/70">{message}</p>
        </div>
        {onRetry && (
          <Button variant="ghost" size="sm" onClick={onRetry} className="text-red-400">
            Retry
          </Button>
        )}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <Card className={cn('border-red-500/20 bg-red-500/5 p-6', className)}>
        <div className="flex flex-col items-center text-center">{content}</div>
      </Card>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeClasses[size].container,
        className
      )}
    >
      {content}
    </div>
  );
}

// Pre-configured error states
export function NetworkError({ onRetry, className }: { onRetry?: () => void; className?: string }) {
  return (
    <ErrorState
      title="Connection Error"
      message="Unable to connect to the server. Please check your internet connection and try again."
      onRetry={onRetry}
      className={className}
    />
  );
}

export function NotFoundError({
  resource = 'Page',
  onGoBack,
  onGoHome,
  className,
}: {
  resource?: string;
  onGoBack?: () => void;
  onGoHome?: () => void;
  className?: string;
}) {
  return (
    <ErrorState
      title={`${resource} Not Found`}
      message={`The ${resource.toLowerCase()} you're looking for doesn't exist or has been moved.`}
      onGoBack={onGoBack}
      onGoHome={onGoHome}
      className={className}
    />
  );
}

export function PermissionError({ onGoBack, className }: { onGoBack?: () => void; className?: string }) {
  return (
    <ErrorState
      title="Access Denied"
      message="You don't have permission to view this content. Please contact your administrator."
      variant="warning"
      onGoBack={onGoBack}
      className={className}
    />
  );
}

export default ErrorState;
