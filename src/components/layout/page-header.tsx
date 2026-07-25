'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  RefreshCw,
  Download,
  Upload,
  Share2,
  Star,
  MoreHorizontal,
  Filter,
  Columns,
  Printer,
  Maximize2,
  Sparkles,
  Save,
  ChevronDown,
} from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: React.ReactNode;
  showRefresh?: boolean;
  showExport?: boolean;
  showImport?: boolean;
  showShare?: boolean;
  showFavorite?: boolean;
  showAI?: boolean;
  showSavedViews?: boolean;
  savedViews?: { id: string; name: string }[];
  selectedView?: string;
  onViewChange?: (viewId: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
  onAIClick?: () => void;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  showRefresh = true,
  showExport = true,
  showImport = false,
  showShare = true,
  showFavorite = true,
  showAI = true,
  showSavedViews = true,
  savedViews = [],
  selectedView,
  onViewChange,
  onRefresh,
  onExport,
  onImport,
  onShare,
  onFavorite,
  onAIClick,
  className,
}: PageHeaderProps) {
  const [isFavorited, setIsFavorited] = React.useState(false);

  const mockSavedViews = savedViews.length > 0 ? savedViews : [
    { id: 'default', name: 'Default View' },
    { id: 'compact', name: 'Compact View' },
    { id: 'detailed', name: 'Detailed View' },
  ];

  return (
    <div className={cn('mb-6 space-y-4', className)}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-slate-400">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-white">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-slate-500">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Header Content */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Title & Description */}
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Saved Views Dropdown */}
          {showSavedViews && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Save className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {mockSavedViews.find((v) => v.id === selectedView)?.name || 'Select View'}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {mockSavedViews.map((view) => (
                  <DropdownMenuItem key={view.id} onClick={() => onViewChange?.(view.id)}>
                    {view.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Save className="mr-2 h-4 w-4" />
                  Save Current View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* AI Assistant */}
          {showAI && (
            <Button
              variant="outline"
              size="sm"
              onClick={onAIClick}
              className="gap-2 border-blue-600/50 text-blue-400 hover:bg-blue-600/10"
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">AI Insights</span>
            </Button>
          )}

          {/* Favorite */}
          {showFavorite && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsFavorited(!isFavorited);
                onFavorite?.();
              }}
              className={isFavorited ? 'text-yellow-400' : ''}
            >
              <Star className={cn('h-4 w-4', isFavorited && 'fill-current')} />
            </Button>
          )}

          {/* Refresh */}
          {showRefresh && (
            <Button variant="ghost" size="icon" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}

          {/* More Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {showExport && (
                <DropdownMenuItem onClick={onExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
              )}
              {showImport && (
                <DropdownMenuItem onClick={onImport}>
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </DropdownMenuItem>
              )}
              {showShare && (
                <DropdownMenuItem onClick={onShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Columns className="mr-2 h-4 w-4" />
                Columns
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Maximize2 className="mr-2 h-4 w-4" />
                Full Screen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Custom Actions */}
          {actions}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
