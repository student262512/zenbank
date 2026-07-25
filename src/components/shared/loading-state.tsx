'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton, SkeletonCard, SkeletonTable } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  className?: string;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ className, message, size = 'md' }: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <Loader2 className={cn('animate-spin text-blue-500', sizeClasses[size])} />
      {message && <p className="text-sm text-slate-400">{message}</p>}
    </div>
  );
}

export function LoadingOverlay({ message = 'Loading...', className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm',
        className
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-slate-700" />
          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-blue-500" />
        </div>
        <p className="text-sm font-medium text-slate-300">{message}</p>
      </div>
    </div>
  );
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
    </div>
  );
}

export function LoadingPulse({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500" />
      <span className="text-sm text-slate-400">Loading...</span>
    </div>
  );
}

// Page loading skeleton
export function PageLoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6 p-6', className)}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* KPI cards skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Table skeleton */}
      <SkeletonTable rows={5} columns={5} />
    </div>
  );
}

// Dashboard loading skeleton
export function DashboardLoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-lg" />
        <Skeleton className="h-80 rounded-lg" />
      </div>

      {/* Table */}
      <Skeleton className="h-96 rounded-lg" />
    </div>
  );
}

// Inline loading state
export function InlineLoading({
  message = 'Loading',
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-slate-400', className)}>
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{message}</span>
    </div>
  );
}

export default LoadingSpinner;
