'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Building2,
  Briefcase,
  FileBox,
  FolderKanban,
  Landmark,
  CreditCard,
  Calendar,
  Coins,
  GitBranch,
  Bookmark,
  ChevronDown,
  Filter,
  RotateCcw,
  Check,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data for filters
const companies = [
  { id: 'all', name: 'All Companies' },
  { id: 'zenith-group', name: 'Zenith Group Holdings' },
  { id: 'zenith-infra', name: 'Zenith Infrastructure' },
  { id: 'zenith-realty', name: 'Zenith Realty' },
];

const businessUnits = [
  { id: 'all', name: 'All Business Units' },
  { id: 'infrastructure', name: 'Infrastructure' },
  { id: 'real-estate', name: 'Real Estate' },
  { id: 'energy', name: 'Energy' },
  { id: 'roads', name: 'Roads & Highways' },
];

const spvs = [
  { id: 'all', name: 'All SPVs' },
  { id: 'spv-metro', name: 'Metro Rail SPV' },
  { id: 'spv-solar', name: 'Solar Energy SPV' },
  { id: 'spv-highway', name: 'Highway SPV' },
  { id: 'spv-water', name: 'Water Treatment SPV' },
];

const projects = [
  { id: 'all', name: 'All Projects' },
  { id: 'metro-phase1', name: 'Mumbai Metro Phase 1' },
  { id: 'highway-nh48', name: 'Highway NH-48 Extension' },
  { id: 'solar-park', name: 'Gujarat Solar Park' },
  { id: 'water-treatment', name: 'Pune Water Treatment' },
];

const banks = [
  { id: 'all', name: 'All Banks' },
  { id: 'hdfc', name: 'HDFC Bank' },
  { id: 'icici', name: 'ICICI Bank' },
  { id: 'sbi', name: 'State Bank of India' },
  { id: 'axis', name: 'Axis Bank' },
  { id: 'kotak', name: 'Kotak Mahindra' },
];

const loans = [
  { id: 'all', name: 'All Loans' },
  { id: 'loan-metro', name: 'Metro Construction Loan' },
  { id: 'loan-solar', name: 'Solar Project Finance' },
  { id: 'loan-wc', name: 'Working Capital Facility' },
];

const currencies = [
  { id: 'INR', name: 'INR - Indian Rupee' },
  { id: 'USD', name: 'USD - US Dollar' },
  { id: 'EUR', name: 'EUR - Euro' },
  { id: 'GBP', name: 'GBP - British Pound' },
];

const scenarios = [
  { id: 'base', name: 'Base Case' },
  { id: 'optimistic', name: 'Optimistic' },
  { id: 'pessimistic', name: 'Pessimistic' },
  { id: 'stress', name: 'Stress Test' },
];

const dateRanges = [
  { id: 'today', name: 'Today' },
  { id: 'yesterday', name: 'Yesterday' },
  { id: 'last7days', name: 'Last 7 Days' },
  { id: 'last30days', name: 'Last 30 Days' },
  { id: 'thisMonth', name: 'This Month' },
  { id: 'lastMonth', name: 'Last Month' },
  { id: 'thisQuarter', name: 'This Quarter' },
  { id: 'thisYear', name: 'This Year' },
];

const savedViews = [
  { id: 'default', name: 'Default View' },
  { id: 'executive', name: 'Executive Summary' },
  { id: 'liquidity', name: 'Liquidity Focus' },
  { id: 'debt', name: 'Debt Overview' },
];

export interface ExecutiveFilterState {
  companyId: string;
  businessUnitId: string;
  spvId: string;
  projectIds: string[];
  bankIds: string[];
  loanIds: string[];
  dateRange: string;
  currency: string;
  scenario: string;
  savedView: string;
}

export interface ExecutiveFiltersProps {
  className?: string;
  compact?: boolean;
  onFilterChange?: (filters: ExecutiveFilterState) => void;
}

export function ExecutiveFilters({
  className,
  compact = false,
  onFilterChange,
}: ExecutiveFiltersProps) {
  const [filters, setFilters] = React.useState<ExecutiveFilterState>({
    companyId: 'all',
    businessUnitId: 'all',
    spvId: 'all',
    projectIds: [],
    bankIds: [],
    loanIds: [],
    dateRange: 'thisMonth',
    currency: 'INR',
    scenario: 'base',
    savedView: 'default',
  });

  const updateFilters = (updates: Partial<ExecutiveFilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: ExecutiveFilterState = {
      companyId: 'all',
      businessUnitId: 'all',
      spvId: 'all',
      projectIds: [],
      bankIds: [],
      loanIds: [],
      dateRange: 'thisMonth',
      currency: 'INR',
      scenario: 'base',
      savedView: 'default',
    };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  const activeFilterCount =
    (filters.companyId !== 'all' ? 1 : 0) +
    (filters.businessUnitId !== 'all' ? 1 : 0) +
    (filters.spvId !== 'all' ? 1 : 0) +
    filters.projectIds.length +
    filters.bankIds.length +
    filters.loanIds.length +
    (filters.dateRange !== 'thisMonth' ? 1 : 0) +
    (filters.scenario !== 'base' ? 1 : 0);

  const buttonSize = compact ? 'sm' : 'default';

  return (
    // <ScrollArea orientation="horizontal" className={cn("w-full whitespace-nowrap", className)}>
    <div className={cn('flex flex-wrap items-center gap-2 z-50', className)}>
    {/* <div className="w-full">
      <div className="horizontal-scrollbar">
        <div className="inline-flex w-max items-center gap-2 pb-2"> */}
          {/* Company Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={buttonSize} className="gap-2">
                <Building2 className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">
                  {companies.find((c) => c.id === filters.companyId)?.name || 'Company'}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {companies.map((company) => (
                <DropdownMenuItem
                  key={company.id}
                  onClick={() => updateFilters({ companyId: company.id })}
                  className="justify-between"
                >
                  <span>{company.name}</span>
                  {filters.companyId === company.id && <Check className="h-4 w-4 text-blue-400" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Business Unit Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={buttonSize} className="gap-2">
                <Briefcase className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">
                  {businessUnits.find((b) => b.id === filters.businessUnitId)?.name || 'Business Unit'}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {businessUnits.map((bu) => (
                <DropdownMenuItem
                  key={bu.id}
                  onClick={() => updateFilters({ businessUnitId: bu.id })}
                  className="justify-between"
                >
                  <span>{bu.name}</span>
                  {filters.businessUnitId === bu.id && <Check className="h-4 w-4 text-blue-400" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* SPV Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={buttonSize} className="gap-2">
                <FileBox className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">
                  {spvs.find((s) => s.id === filters.spvId)?.name || 'SPV'}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {spvs.map((spv) => (
                <DropdownMenuItem
                  key={spv.id}
                  onClick={() => updateFilters({ spvId: spv.id })}
                  className="justify-between"
                >
                  <span>{spv.name}</span>
                  {filters.spvId === spv.id && <Check className="h-4 w-4 text-blue-400" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Project Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={buttonSize} className="gap-2">
                <FolderKanban className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">
                  {filters.projectIds.length > 0 ? `${filters.projectIds.length} Projects` : 'Projects'}
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
                  {project.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Bank Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={buttonSize} className="gap-2">
                <Landmark className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">
                  {filters.bankIds.length > 0 ? `${filters.bankIds.length} Banks` : 'Banks'}
                </span>
                {filters.bankIds.length > 0 && (
                  <Badge variant="secondary" className="h-5 px-1.5">
                    {filters.bankIds.length}
                  </Badge>
                )}
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {banks.map((bank) => (
                <DropdownMenuCheckboxItem
                  key={bank.id}
                  checked={
                    bank.id === 'all'
                      ? filters.bankIds.length === 0
                      : filters.bankIds.includes(bank.id)
                  }
                  onCheckedChange={(checked) => {
                    if (bank.id === 'all') {
                      updateFilters({ bankIds: [] });
                    } else {
                      updateFilters({
                        bankIds: checked
                          ? [...filters.bankIds, bank.id]
                          : filters.bankIds.filter((id) => id !== bank.id),
                      });
                    }
                  }}
                >
                  {bank.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Date Range Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={buttonSize} className="gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">
                  {dateRanges.find((d) => d.id === filters.dateRange)?.name || 'Date Range'}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {dateRanges.map((range) => (
                <DropdownMenuItem
                  key={range.id}
                  onClick={() => updateFilters({ dateRange: range.id })}
                  className="justify-between"
                >
                  <span>{range.name}</span>
                  {filters.dateRange === range.id && <Check className="h-4 w-4 text-blue-400" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Currency Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={buttonSize} className="gap-2">
                <Coins className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">{filters.currency}</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {currencies.map((currency) => (
                <DropdownMenuItem
                  key={currency.id}
                  onClick={() => updateFilters({ currency: currency.id })}
                  className="justify-between"
                >
                  <span>{currency.name}</span>
                  {filters.currency === currency.id && <Check className="h-4 w-4 text-blue-400" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Scenario Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={buttonSize} className="gap-2">
                <GitBranch className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">
                  {scenarios.find((s) => s.id === filters.scenario)?.name || 'Scenario'}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {scenarios.map((scenario) => (
                <DropdownMenuItem
                  key={scenario.id}
                  onClick={() => updateFilters({ scenario: scenario.id })}
                  className="justify-between"
                >
                  <span>{scenario.name}</span>
                  {filters.scenario === scenario.id && <Check className="h-4 w-4 text-blue-400" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Saved View Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={buttonSize} className="gap-2">
                <Bookmark className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">
                  {savedViews.find((v) => v.id === filters.savedView)?.name || 'View'}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {savedViews.map((view) => (
                <DropdownMenuItem
                  key={view.id}
                  onClick={() => updateFilters({ savedView: view.id })}
                  className="justify-between"
                >
                  <span>{view.name}</span>
                  {filters.savedView === view.id && <Check className="h-4 w-4 text-blue-400" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
    //   </div>
    // </div>
    // </div >
    // </ScrollArea>
  );
}

export default ExecutiveFilters;
