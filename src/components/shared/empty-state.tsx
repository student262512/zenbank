'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  FileX,
  Search,
  Filter,
  Plus,
  RefreshCw,
  AlertCircle,
  Inbox,
  FolderOpen,
  type LucideIcon,
} from 'lucide-react';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'search' | 'filter' | 'error';
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = 'md',
  variant = 'default',
}: EmptyStateProps) {
  const variantIcons: Record<string, LucideIcon> = {
    default: Inbox,
    search: Search,
    filter: Filter,
    error: AlertCircle,
  };

  const DisplayIcon = Icon || variantIcons[variant];

  const sizeClasses = {
    sm: {
      container: 'py-8',
      icon: 'h-10 w-10',
      iconWrapper: 'h-16 w-16',
      title: 'text-base',
      description: 'text-xs',
    },
    md: {
      container: 'py-12',
      icon: 'h-12 w-12',
      iconWrapper: 'h-20 w-20',
      title: 'text-lg',
      description: 'text-sm',
    },
    lg: {
      container: 'py-16',
      icon: 'h-16 w-16',
      iconWrapper: 'h-24 w-24',
      title: 'text-xl',
      description: 'text-base',
    },
  };

  const ActionIcon = action?.icon || Plus;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeClasses[size].container,
        className
      )}
    >
      <div
        className={cn(
          'mb-4 flex items-center justify-center rounded-full bg-slate-800/50',
          sizeClasses[size].iconWrapper
        )}
      >
        <DisplayIcon className={cn('text-slate-500', sizeClasses[size].icon)} />
      </div>

      <h3 className={cn('font-semibold text-white', sizeClasses[size].title)}>{title}</h3>

      {description && (
        <p className={cn('mt-2 max-w-sm text-slate-400', sizeClasses[size].description)}>
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="mt-6 flex items-center gap-3">
          {action && (
            <Button onClick={action.onClick} className="gap-2">
              <ActionIcon className="h-4 w-4" />
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Pre-configured empty states
export function NoSearchResults({
  query,
  onClear,
  className,
}: {
  query?: string;
  onClear?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      variant="search"
      title="No results found"
      description={
        query
          ? `No matches found for "${query}". Try a different search term.`
          : 'Try adjusting your search or filters.'
      }
      action={onClear ? { label: 'Clear Search', onClick: onClear, icon: RefreshCw } : undefined}
      className={className}
    />
  );
}

export function NoData({
  resource = 'items',
  onAdd,
  className,
}: {
  resource?: string;
  onAdd?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      icon={FolderOpen}
      title={`No ${resource} yet`}
      description={`Get started by creating your first ${resource.toLowerCase()}.`}
      action={onAdd ? { label: `Add ${resource}`, onClick: onAdd } : undefined}
      className={className}
    />
  );
}

export function NoFilterResults({
  onClearFilters,
  className,
}: {
  onClearFilters?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      variant="filter"
      title="No matches"
      description="No items match your current filters. Try adjusting or clearing your filters."
      action={
        onClearFilters
          ? { label: 'Clear Filters', onClick: onClearFilters, icon: RefreshCw }
          : undefined
      }
      className={className}
    />
  );
}

export default EmptyState;
