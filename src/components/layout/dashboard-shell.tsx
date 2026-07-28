'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { TopNav } from './top-nav';
import { Sidebar } from './sidebar';

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-950">
      <TopNav />
      <div className="flex">
        <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
        <main
          className={cn(
            'flex-1 overflow-auto transition-all duration-300',
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

// Page wrapper with standard padding
interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export function PageContainer({
  children,
  className,
  maxWidth = 'full',
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full p-4 lg:p-6',
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
}

// Grid layout for dashboard pages
interface DashboardGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
}

export function DashboardGrid({
  children,
  className,
  columns = 12,
}: DashboardGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-12',
  };

  return (
    <div className={cn('grid gap-4 lg:gap-6', columnClasses[columns], className)}>
      {children}
    </div>
  );
}

// Grid item with span control
interface GridItemProps {
  children: React.ReactNode;
  className?: string;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  spanMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  spanLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
}

export function GridItem({
  children,
  className,
  span,
  spanMd,
  spanLg,
}: GridItemProps) {
  const spanClasses: string[] = [];

  if (span) {
    spanClasses.push(span === 'full' ? 'col-span-full' : `col-span-${span}`);
  }
  if (spanMd) {
    spanClasses.push(spanMd === 'full' ? 'md:col-span-full' : `md:col-span-${spanMd}`);
  }
  if (spanLg) {
    spanClasses.push(spanLg === 'full' ? 'lg:col-span-full' : `lg:col-span-${spanLg}`);
  }

  return <div className={cn(spanClasses.join(' '), className)}>{children}</div>;
}

// Section wrapper
interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function Section({
  id,
  children,
  className,
  title,
  description,
  actions,
}: SectionProps) {
  return (
    <section id={id} className={cn('space-y-4', className)}>
      {(title || description || actions) && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-white">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-slate-400">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export default DashboardShell;
