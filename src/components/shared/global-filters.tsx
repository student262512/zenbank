'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from '@/components/ui/date-picker';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Building2,
  FolderKanban,
  Wallet,
  Calendar,
  Filter,
  X,
  ChevronDown,
  RotateCcw,
  Check,
} from 'lucide-react';

// Mock data for filters
const entities = [
  { id: 'all', name: 'All Entities', count: 25 },
  { id: 'zenith-infra', name: 'Zenith Infrastructure Ltd', count: 12 },
  { id: 'zenith-realty', name: 'Zenith Realty Holdings', count: 8 },
  { id: 'zenith-energy', name: 'Zenith Energy SPV', count: 5 },
];

const projects = [
  { id: 'all', name: 'All Projects', count: 15 },
  { id: 'metro-phase1', name: 'Mumbai Metro Phase 1', status: 'active' },
  { id: 'highway-nh48', name: 'Highway NH-48 Extension', status: 'active' },
  { id: 'solar-park', name: 'Gujarat Solar Park', status: 'active' },
  { id: 'water-treatment', name: 'Pune Water Treatment', status: 'planning' },
];

const bankAccounts = [
  { id: 'all', name: 'All Accounts', count: 45 },
  { id: 'hdfc-current', name: 'HDFC Current - 1234', balance: 125000000 },
  { id: 'icici-escrow', name: 'ICICI Escrow - 5678', balance: 450000000 },
  { id: 'sbi-operations', name: 'SBI Operations - 9012', balance: 85000000 },
  { id: 'axis-payroll', name: 'Axis Payroll - 3456', balance: 25000000 },
];

const datePresets = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'last7days', label: 'Last 7 Days' },
  { id: 'last30days', label: 'Last 30 Days' },
  { id: 'thisMonth', label: 'This Month' },
  { id: 'lastMonth', label: 'Last Month' },
  { id: 'thisQuarter', label: 'This Quarter' },
  { id: 'lastQuarter', label: 'Last Quarter' },
  { id: 'thisYear', label: 'This Year' },
  { id: 'custom', label: 'Custom Range' },
];

export interface GlobalFiltersProps {
  className?: string;
  showEntity?: boolean;
  showProject?: boolean;
  showBankAccount?: boolean;
  showDateRange?: boolean;
  compact?: boolean;
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  entityId: string;
  projectIds: string[];
  bankAccountIds: string[];
  datePreset: string;
  dateRange: { startDate?: Date; endDate?: Date };
}

export function GlobalFilters({
  className,
  showEntity = true,
  showProject = true,
  showBankAccount = true,
  showDateRange = true,
  compact = false,
  onFilterChange,
}: GlobalFiltersProps) {
  const [filters, setFilters] = React.useState<FilterState>({
    entityId: 'all',
    projectIds: [],
    bankAccountIds: [],
    datePreset: 'thisMonth',
    dateRange: {},
  });

  const [showCustomDate, setShowCustomDate] = React.useState(false);

  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      entityId: 'all',
      projectIds: [],
      bankAccountIds: [],
      datePreset: 'thisMonth',
      dateRange: {},
    };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  const activeFilterCount =
    (filters.entityId !== 'all' ? 1 : 0) +
    filters.projectIds.length +
    filters.bankAccountIds.length +
    (filters.datePreset !== 'thisMonth' ? 1 : 0);

  const selectedEntity = entities.find((e) => e.id === filters.entityId);
  const selectedDatePreset = datePresets.find((d) => d.id === filters.datePreset);

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {/* Entity Filter */}
      {showEntity && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={compact ? 'sm' : 'default'} className="gap-2">
              <Building2 className="h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">{selectedEntity?.name || 'Entity'}</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {entities.map((entity) => (
              <DropdownMenuItem
                key={entity.id}
                onClick={() => updateFilters({ entityId: entity.id })}
                className="justify-between"
              >
                <span>{entity.name}</span>
                <div className="flex items-center gap-2">
                  {entity.count && (
                    <Badge variant="secondary" className="h-5 px-1.5">
                      {entity.count}
                    </Badge>
                  )}
                  {filters.entityId === entity.id && (
                    <Check className="h-4 w-4 text-blue-400" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Project Filter */}
      {showProject && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={compact ? 'sm' : 'default'} className="gap-2">
              <FolderKanban className="h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">
                {filters.projectIds.length > 0
                  ? `${filters.projectIds.length} Projects`
                  : 'All Projects'}
              </span>
              {filters.projectIds.length > 0 && (
                <Badge variant="secondary" className="h-5 px-1.5">
                  {filters.projectIds.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {projects.map((project) => (
              <DropdownMenuCheckboxItem
                key={project.id}
                checked={
                  project.id === 'all'
                    ? filters.projectIds.length === 0
                    : filters.projectIds.includes(project.id)
                }
                onCheckedChange={(checked) => {
                  if (project.id === 'all') {
                    updateFilters({ projectIds: [] });
                  } else {
                    updateFilters({
                      projectIds: checked
                        ? [...filters.projectIds, project.id]
                        : filters.projectIds.filter((id) => id !== project.id),
                    });
                  }
                }}
              >
                <span className="flex-1">{project.name}</span>
                {project.status && (
                  <Badge
                    variant={project.status === 'active' ? 'success' : 'secondary'}
                    className="ml-2 h-5 px-1.5"
                  >
                    {project.status}
                  </Badge>
                )}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Bank Account Filter */}
      {showBankAccount && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={compact ? 'sm' : 'default'} className="gap-2">
              <Wallet className="h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">
                {filters.bankAccountIds.length > 0
                  ? `${filters.bankAccountIds.length} Accounts`
                  : 'All Accounts'}
              </span>
              {filters.bankAccountIds.length > 0 && (
                <Badge variant="secondary" className="h-5 px-1.5">
                  {filters.bankAccountIds.length}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72">
            {bankAccounts.map((account) => (
              <DropdownMenuCheckboxItem
                key={account.id}
                checked={
                  account.id === 'all'
                    ? filters.bankAccountIds.length === 0
                    : filters.bankAccountIds.includes(account.id)
                }
                onCheckedChange={(checked) => {
                  if (account.id === 'all') {
                    updateFilters({ bankAccountIds: [] });
                  } else {
                    updateFilters({
                      bankAccountIds: checked
                        ? [...filters.bankAccountIds, account.id]
                        : filters.bankAccountIds.filter((id) => id !== account.id),
                    });
                  }
                }}
              >
                <span className="flex-1">{account.name}</span>
                {account.balance && (
                  <span className="ml-2 text-xs text-slate-500">
                    ₹{(account.balance / 10000000).toFixed(1)} Cr
                  </span>
                )}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Date Range Filter */}
      {showDateRange && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={compact ? 'sm' : 'default'} className="gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">{selectedDatePreset?.label || 'Date Range'}</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {datePresets.map((preset) => (
              <DropdownMenuItem
                key={preset.id}
                onClick={() => {
                  updateFilters({ datePreset: preset.id });
                  if (preset.id === 'custom') {
                    setShowCustomDate(true);
                  }
                }}
                className="justify-between"
              >
                <span>{preset.label}</span>
                {filters.datePreset === preset.id && (
                  <Check className="h-4 w-4 text-blue-400" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Custom Date Picker */}
      {showCustomDate && (
        <DateRangePicker
          startDate={filters.dateRange.startDate}
          endDate={filters.dateRange.endDate}
          onChange={(range) => updateFilters({ dateRange: range })}
          className="w-64"
        />
      )}

      {/* Active Filter Count & Reset */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Filter className="h-3 w-3" />
            {activeFilterCount} active
          </Badge>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1 text-slate-400">
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}

// Quick filter chips
export interface FilterChipProps {
  label: string;
  value?: string;
  onRemove?: () => void;
  className?: string;
}

export function FilterChip({ label, value, onRemove, className }: FilterChipProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs',
        className
      )}
    >
      <span className="text-slate-400">{label}:</span>
      <span className="font-medium text-white">{value}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 rounded-full p-0.5 hover:bg-slate-700"
        >
          <X className="h-3 w-3 text-slate-400" />
        </button>
      )}
    </div>
  );
}

export default GlobalFilters;
