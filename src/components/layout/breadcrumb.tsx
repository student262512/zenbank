'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  separator?: React.ReactNode;
}

// Generate breadcrumbs from pathname
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  }

  return breadcrumbs;
}

export function Breadcrumb({
  items,
  className,
  showHome = true,
  separator = <ChevronRight className="h-3.5 w-3.5 text-slate-600" />,
}: BreadcrumbProps) {
  const pathname = usePathname();
  const breadcrumbs = items || generateBreadcrumbs(pathname);

  if (breadcrumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1.5 text-sm', className)}
    >
      {showHome && (
        <>
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-400 transition-colors hover:text-white"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
          {breadcrumbs.length > 0 && separator}
        </>
      )}

      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <React.Fragment key={item.label}>
            {isLast ? (
              <span className="flex items-center gap-1.5 font-medium text-white">
                {item.icon}
                {item.label}
              </span>
            ) : (
              <>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ) : (
                  <span className="flex items-center gap-1.5 text-slate-400">
                    {item.icon}
                    {item.label}
                  </span>
                )}
                {separator}
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

// Compact breadcrumb for mobile
export function BreadcrumbCompact({ items, className }: BreadcrumbProps) {
  const pathname = usePathname();
  const breadcrumbs = items || generateBreadcrumbs(pathname);

  if (breadcrumbs.length <= 1) return null;

  const parentCrumb = breadcrumbs[breadcrumbs.length - 2];

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1.5 text-sm', className)}
    >
      <Link
        href={parentCrumb.href || '/'}
        className="flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white"
      >
        <ChevronRight className="h-4 w-4 rotate-180" />
        <span>Back to {parentCrumb.label}</span>
      </Link>
    </nav>
  );
}

export default Breadcrumb;
