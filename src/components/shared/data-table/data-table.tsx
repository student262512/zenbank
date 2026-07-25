'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Columns,
  RefreshCw,
} from 'lucide-react';

export interface Column<T> {
  id: string;
  header: string | React.ReactNode;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  cell?: (row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (rows: T[]) => void;
  onRowClick?: (row: T) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  toolbar?: React.ReactNode;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
  };
  className?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  stickyHeader?: boolean;
  compact?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  getRowId?: (row: T) => string;
  actions?: {
    label: string;
    icon?: React.ReactNode;
    onClick: (row: T) => void;
    variant?: 'default' | 'danger';
  }[];
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data available',
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  onRowClick,
  sortColumn,
  sortDirection,
  onSort,
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearch,
  toolbar,
  pagination,
  className,
  rowClassName,
  stickyHeader = false,
  compact = false,
  striped = false,
  hoverable = true,
  bordered = false,
  getRowId = (row: T) => JSON.stringify(row),
  actions,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(data);
    }
  };

  const handleSelectRow = (row: T) => {
    const rowId = getRowId(row);
    const isSelected = selectedRows.some((r) => getRowId(r) === rowId);

    if (isSelected) {
      onSelectionChange?.(selectedRows.filter((r) => getRowId(r) !== rowId));
    } else {
      onSelectionChange?.([...selectedRows, row]);
    }
  };

  const handleSort = (columnId: string) => {
    if (!onSort) return;

    if (sortColumn === columnId) {
      onSort(columnId, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(columnId, 'asc');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    if (column.cell) {
      return column.cell(row, data.indexOf(row));
    }

    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }

    return row[column.accessor] as React.ReactNode;
  };

  const cellPadding = compact ? 'px-3 py-2' : 'px-4 py-3';
  const headerPadding = compact ? 'px-3 py-2' : 'px-4 py-3';

  return (
    <div className={cn('rounded-lg border border-slate-800 bg-slate-900/50', className)}>
      {/* Toolbar */}
      {(searchable || toolbar) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 p-4">
          <div className="flex flex-1 items-center gap-3">
            {searchable && (
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-9"
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {toolbar}
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Columns className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Selection Info */}
      {selectable && selectedRows.length > 0 && (
        <div className="flex items-center justify-between border-b border-slate-800 bg-blue-500/5 px-4 py-2">
          <span className="text-sm text-blue-400">
            {selectedRows.length} row{selectedRows.length !== 1 ? 's' : ''} selected
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelectionChange?.([])}
            className="text-blue-400 hover:text-blue-300"
          >
            Clear selection
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className={cn(
              'border-b border-slate-800 bg-slate-900',
              stickyHeader && 'sticky top-0 z-10'
            )}
          >
            <tr>
              {selectable && (
                <th className={cn('w-12', headerPadding)}>
                  <Checkbox
                    checked={selectedRows.length === data.length && data.length > 0}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    'text-left text-xs font-medium uppercase tracking-wider text-slate-400',
                    headerPadding,
                    column.sortable && 'cursor-pointer select-none hover:text-white',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.className
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable && (
                      <span className="ml-1">
                        {sortColumn === column.id ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )
                        ) : (
                          <ChevronsUpDown className="h-4 w-4 text-slate-600" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className={cn('w-12', headerPadding)} />}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {selectable && (
                    <td className={cellPadding}>
                      <Skeleton className="h-4 w-4" />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.id} className={cellPadding}>
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                  {actions && (
                    <td className={cellPadding}>
                      <Skeleton className="h-4 w-4" />
                    </td>
                  )}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}
                  className="py-12 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const rowId = getRowId(row);
                const isSelected = selectedRows.some((r) => getRowId(r) === rowId);
                const customRowClass =
                  typeof rowClassName === 'function' ? rowClassName(row, index) : rowClassName;

                return (
                  <tr
                    key={rowId}
                    className={cn(
                      'transition-colors',
                      striped && index % 2 === 1 && 'bg-slate-900/30',
                      hoverable && 'hover:bg-slate-800/50',
                      bordered && 'border-b border-slate-800',
                      isSelected && 'bg-blue-500/10',
                      onRowClick && 'cursor-pointer',
                      customRowClass
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {selectable && (
                      <td
                        className={cellPadding}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleSelectRow(row)}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={cn(
                          'text-sm text-slate-300',
                          cellPadding,
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right',
                          column.className
                        )}
                      >
                        {getCellValue(row, column)}
                      </td>
                    ))}
                    {actions && (
                      <td
                        className={cellPadding}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {actions.map((action, i) => (
                              <DropdownMenuItem
                                key={i}
                                onClick={() => action.onClick(row)}
                                className={
                                  action.variant === 'danger'
                                    ? 'text-red-400 focus:text-red-400'
                                    : undefined
                                }
                              >
                                {action.icon}
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3">
          <div className="text-sm text-slate-500">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.ceil(pagination.total / pagination.pageSize) })
                .slice(0, 5)
                .map((_, i) => (
                  <Button
                    key={i}
                    variant={pagination.page === i + 1 ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => pagination.onPageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page * pagination.pageSize >= pagination.total}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
