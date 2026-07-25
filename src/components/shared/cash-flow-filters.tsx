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
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Building2,
  FolderKanban,
  Wallet,
  Calendar,
  Filter,
  ChevronDown,
  RotateCcw,
  Check,
  Briefcase,
  MapPin,
  DollarSign,
  Users,
  Truck,
  CreditCard,
  Target,
  Tag,
  Clock,
  GitBranch,
  Layers,
  X,
} from 'lucide-react';

// Mock data for cash flow filters
const companies = [
  { id: 'all', name: 'All Companies', count: 5 },
  { id: 'zenith-infra', name: 'Zenith Infrastructure Ltd', count: 12 },
  { id: 'zenith-realty', name: 'Zenith Realty Holdings', count: 8 },
  { id: 'zenith-energy', name: 'Zenith Energy SPV', count: 5 },
  { id: 'zenith-highways', name: 'Zenith Highways Pvt Ltd', count: 3 },
];

const businessUnits = [
  { id: 'all', name: 'All Business Units' },
  { id: 'commercial', name: 'Commercial Real Estate' },
  { id: 'residential', name: 'Residential Projects' },
  { id: 'infrastructure', name: 'Infrastructure' },
  { id: 'energy', name: 'Renewable Energy' },
];

const spvs = [
  { id: 'all', name: 'All SPVs' },
  { id: 'metro-spv', name: 'Mumbai Metro SPV' },
  { id: 'highway-spv', name: 'NH-48 Highway SPV' },
  { id: 'solar-spv', name: 'Gujarat Solar SPV' },
  { id: 'water-spv', name: 'Pune Water SPV' },
];

const projects = [
  { id: 'all', name: 'All Projects', count: 15 },
  { id: 'metro-phase1', name: 'Mumbai Metro Phase 1', status: 'active' },
  { id: 'highway-nh48', name: 'Highway NH-48 Extension', status: 'active' },
  { id: 'solar-park', name: 'Gujarat Solar Park', status: 'active' },
  { id: 'water-treatment', name: 'Pune Water Treatment', status: 'planning' },
  { id: 'tower-a', name: 'Zenith Tower A', status: 'active' },
  { id: 'tower-b', name: 'Zenith Tower B', status: 'planning' },
];

const regions = [
  { id: 'all', name: 'All Regions' },
  { id: 'west', name: 'West Region' },
  { id: 'north', name: 'North Region' },
  { id: 'south', name: 'South Region' },
  { id: 'east', name: 'East Region' },
];

const banks = [
  { id: 'all', name: 'All Banks', count: 8 },
  { id: 'hdfc', name: 'HDFC Bank' },
  { id: 'icici', name: 'ICICI Bank' },
  { id: 'sbi', name: 'State Bank of India' },
  { id: 'axis', name: 'Axis Bank' },
  { id: 'kotak', name: 'Kotak Mahindra Bank' },
  { id: 'yes', name: 'Yes Bank' },
];

const accounts = [
  { id: 'all', name: 'All Accounts', count: 45 },
  { id: 'hdfc-current', name: 'HDFC Current - 1234', balance: 125000000 },
  { id: 'icici-escrow', name: 'ICICI Escrow - 5678', balance: 450000000 },
  { id: 'sbi-operations', name: 'SBI Operations - 9012', balance: 85000000 },
  { id: 'axis-payroll', name: 'Axis Payroll - 3456', balance: 25000000 },
  { id: 'kotak-fd', name: 'Kotak FD - 7890', balance: 200000000 },
];

const currencies = [
  { id: 'all', name: 'All Currencies' },
  { id: 'inr', name: 'INR - Indian Rupee', symbol: '₹' },
  { id: 'usd', name: 'USD - US Dollar', symbol: '$' },
  { id: 'eur', name: 'EUR - Euro', symbol: '€' },
  { id: 'gbp', name: 'GBP - British Pound', symbol: '£' },
  { id: 'aed', name: 'AED - UAE Dirham', symbol: 'د.إ' },
];

const costCenters = [
  { id: 'all', name: 'All Cost Centers' },
  { id: 'cc-001', name: 'CC-001: Administration' },
  { id: 'cc-002', name: 'CC-002: Operations' },
  { id: 'cc-003', name: 'CC-003: Project Management' },
  { id: 'cc-004', name: 'CC-004: Finance' },
  { id: 'cc-005', name: 'CC-005: HR' },
];

const customers = [
  { id: 'all', name: 'All Customers', count: 150 },
  { id: 'cust-001', name: 'Tata Projects Ltd' },
  { id: 'cust-002', name: 'L&T Construction' },
  { id: 'cust-003', name: 'Godrej Properties' },
  { id: 'cust-004', name: 'Mahindra Lifespaces' },
  { id: 'cust-005', name: 'DLF Limited' },
];

const vendors = [
  { id: 'all', name: 'All Vendors', count: 250 },
  { id: 'vend-001', name: 'ACC Cement' },
  { id: 'vend-002', name: 'Tata Steel' },
  { id: 'vend-003', name: 'UltraTech Cement' },
  { id: 'vend-004', name: 'JSW Steel' },
  { id: 'vend-005', name: 'Larsen & Toubro' },
];

const loans = [
  { id: 'all', name: 'All Loans', count: 15 },
  { id: 'loan-001', name: 'HDFC Term Loan - ₹500 Cr' },
  { id: 'loan-002', name: 'SBI Project Loan - ₹800 Cr' },
  { id: 'loan-003', name: 'ICICI Working Capital - ₹200 Cr' },
  { id: 'loan-004', name: 'Axis ECB Loan - $50M' },
];

const scenarios = [
  { id: 'base', name: 'Base Case' },
  { id: 'optimistic', name: 'Optimistic' },
  { id: 'pessimistic', name: 'Pessimistic' },
  { id: 'stress', name: 'Stress Test' },
];

const forecastVersions = [
  { id: 'current', name: 'Current (v3.2)', status: 'active' },
  { id: 'v31', name: 'Version 3.1', status: 'archived' },
  { id: 'v30', name: 'Version 3.0', status: 'archived' },
  { id: 'budget', name: 'Budget 2025', status: 'locked' },
];

const forecastHorizons = [
  { id: '7d', name: '7 Days' },
  { id: '30d', name: '30 Days' },
  { id: '90d', name: '90 Days' },
  { id: '180d', name: '180 Days' },
  { id: '365d', name: '365 Days' },
];

const statuses = [
  { id: 'all', name: 'All Statuses' },
  { id: 'pending', name: 'Pending', color: 'yellow' },
  { id: 'approved', name: 'Approved', color: 'green' },
  { id: 'processing', name: 'Processing', color: 'blue' },
  { id: 'completed', name: 'Completed', color: 'green' },
  { id: 'rejected', name: 'Rejected', color: 'red' },
  { id: 'on-hold', name: 'On Hold', color: 'gray' },
];

const tags = [
  { id: 'critical', name: 'Critical', color: 'red' },
  { id: 'high-value', name: 'High Value', color: 'purple' },
  { id: 'recurring', name: 'Recurring', color: 'blue' },
  { id: 'one-time', name: 'One-time', color: 'gray' },
  { id: 'urgent', name: 'Urgent', color: 'orange' },
  { id: 'scheduled', name: 'Scheduled', color: 'cyan' },
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

export interface CashFlowFilterState {
  companyIds: string[];
  businessUnitIds: string[];
  spvIds: string[];
  projectIds: string[];
  regionIds: string[];
  bankIds: string[];
  accountIds: string[];
  currencyIds: string[];
  costCenterIds: string[];
  customerIds: string[];
  vendorIds: string[];
  loanIds: string[];
  scenario: string;
  forecastVersion: string;
  forecastHorizon: string;
  datePreset: string;
  dateRange: { startDate?: Date; endDate?: Date };
  statusIds: string[];
  tagIds: string[];
}

export interface CashFlowFiltersProps {
  className?: string;
  showCompany?: boolean;
  showBusinessUnit?: boolean;
  showSPV?: boolean;
  showProject?: boolean;
  showRegion?: boolean;
  showBank?: boolean;
  showAccount?: boolean;
  showCurrency?: boolean;
  showCostCenter?: boolean;
  showCustomer?: boolean;
  showVendor?: boolean;
  showLoan?: boolean;
  showScenario?: boolean;
  showForecastVersion?: boolean;
  showForecastHorizon?: boolean;
  showDateRange?: boolean;
  showStatus?: boolean;
  showTags?: boolean;
  compact?: boolean;
  onFilterChange?: (filters: CashFlowFilterState) => void;
}

const defaultFilters: CashFlowFilterState = {
  companyIds: [],
  businessUnitIds: [],
  spvIds: [],
  projectIds: [],
  regionIds: [],
  bankIds: [],
  accountIds: [],
  currencyIds: [],
  costCenterIds: [],
  customerIds: [],
  vendorIds: [],
  loanIds: [],
  scenario: 'base',
  forecastVersion: 'current',
  forecastHorizon: '30d',
  datePreset: 'thisMonth',
  dateRange: {},
  statusIds: [],
  tagIds: [],
};

export function CashFlowFilters({
  className,
  showCompany = true,
  showBusinessUnit = false,
  showSPV = false,
  showProject = true,
  showRegion = false,
  showBank = true,
  showAccount = false,
  showCurrency = false,
  showCostCenter = false,
  showCustomer = false,
  showVendor = false,
  showLoan = false,
  showScenario = false,
  showForecastVersion = false,
  showForecastHorizon = false,
  showDateRange = true,
  showStatus = false,
  showTags = false,
  compact = false,
  onFilterChange,
}: CashFlowFiltersProps) {
  const [filters, setFilters] = React.useState<CashFlowFilterState>(defaultFilters);

  const updateFilters = (updates: Partial<CashFlowFilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const toggleArrayFilter = (
    key: keyof CashFlowFilterState,
    value: string,
    currentValues: string[]
  ) => {
    if (value === 'all') {
      updateFilters({ [key]: [] });
    } else {
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      updateFilters({ [key]: newValues });
    }
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  const activeFilterCount =
    filters.companyIds.length +
    filters.businessUnitIds.length +
    filters.spvIds.length +
    filters.projectIds.length +
    filters.regionIds.length +
    filters.bankIds.length +
    filters.accountIds.length +
    filters.currencyIds.length +
    filters.costCenterIds.length +
    filters.customerIds.length +
    filters.vendorIds.length +
    filters.loanIds.length +
    filters.statusIds.length +
    filters.tagIds.length +
    (filters.scenario !== 'base' ? 1 : 0) +
    (filters.forecastVersion !== 'current' ? 1 : 0) +
    (filters.forecastHorizon !== '30d' ? 1 : 0) +
    (filters.datePreset !== 'thisMonth' ? 1 : 0);

  const selectedDatePreset = datePresets.find((d) => d.id === filters.datePreset);
  const selectedScenario = scenarios.find((s) => s.id === filters.scenario);
  const selectedVersion = forecastVersions.find((v) => v.id === filters.forecastVersion);
  const selectedHorizon = forecastHorizons.find((h) => h.id === filters.forecastHorizon);

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {/* Company Filter */}
      {showCompany && (
        <MultiSelectFilter
          label="Company"
          icon={Building2}
          options={companies}
          selectedIds={filters.companyIds}
          onToggle={(id) => toggleArrayFilter('companyIds', id, filters.companyIds)}
          compact={compact}
        />
      )}

      {/* Business Unit Filter */}
      {showBusinessUnit && (
        <MultiSelectFilter
          label="Business Unit"
          icon={Briefcase}
          options={businessUnits}
          selectedIds={filters.businessUnitIds}
          onToggle={(id) => toggleArrayFilter('businessUnitIds', id, filters.businessUnitIds)}
          compact={compact}
        />
      )}

      {/* SPV Filter */}
      {showSPV && (
        <MultiSelectFilter
          label="SPV"
          icon={Layers}
          options={spvs}
          selectedIds={filters.spvIds}
          onToggle={(id) => toggleArrayFilter('spvIds', id, filters.spvIds)}
          compact={compact}
        />
      )}

      {/* Project Filter */}
      {showProject && (
        <MultiSelectFilter
          label="Project"
          icon={FolderKanban}
          options={projects}
          selectedIds={filters.projectIds}
          onToggle={(id) => toggleArrayFilter('projectIds', id, filters.projectIds)}
          compact={compact}
          showStatus
        />
      )}

      {/* Region Filter */}
      {showRegion && (
        <MultiSelectFilter
          label="Region"
          icon={MapPin}
          options={regions}
          selectedIds={filters.regionIds}
          onToggle={(id) => toggleArrayFilter('regionIds', id, filters.regionIds)}
          compact={compact}
        />
      )}

      {/* Bank Filter */}
      {showBank && (
        <MultiSelectFilter
          label="Bank"
          icon={Building2}
          options={banks}
          selectedIds={filters.bankIds}
          onToggle={(id) => toggleArrayFilter('bankIds', id, filters.bankIds)}
          compact={compact}
        />
      )}

      {/* Account Filter */}
      {showAccount && (
        <MultiSelectFilter
          label="Account"
          icon={Wallet}
          options={accounts}
          selectedIds={filters.accountIds}
          onToggle={(id) => toggleArrayFilter('accountIds', id, filters.accountIds)}
          compact={compact}
          showBalance
        />
      )}

      {/* Currency Filter */}
      {showCurrency && (
        <MultiSelectFilter
          label="Currency"
          icon={DollarSign}
          options={currencies}
          selectedIds={filters.currencyIds}
          onToggle={(id) => toggleArrayFilter('currencyIds', id, filters.currencyIds)}
          compact={compact}
        />
      )}

      {/* Cost Center Filter */}
      {showCostCenter && (
        <MultiSelectFilter
          label="Cost Center"
          icon={Target}
          options={costCenters}
          selectedIds={filters.costCenterIds}
          onToggle={(id) => toggleArrayFilter('costCenterIds', id, filters.costCenterIds)}
          compact={compact}
        />
      )}

      {/* Customer Filter */}
      {showCustomer && (
        <MultiSelectFilter
          label="Customer"
          icon={Users}
          options={customers}
          selectedIds={filters.customerIds}
          onToggle={(id) => toggleArrayFilter('customerIds', id, filters.customerIds)}
          compact={compact}
        />
      )}

      {/* Vendor Filter */}
      {showVendor && (
        <MultiSelectFilter
          label="Vendor"
          icon={Truck}
          options={vendors}
          selectedIds={filters.vendorIds}
          onToggle={(id) => toggleArrayFilter('vendorIds', id, filters.vendorIds)}
          compact={compact}
        />
      )}

      {/* Loan Filter */}
      {showLoan && (
        <MultiSelectFilter
          label="Loan"
          icon={CreditCard}
          options={loans}
          selectedIds={filters.loanIds}
          onToggle={(id) => toggleArrayFilter('loanIds', id, filters.loanIds)}
          compact={compact}
        />
      )}

      {/* Scenario Filter */}
      {showScenario && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={compact ? 'sm' : 'default'} className="gap-2">
              <GitBranch className="h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">{selectedScenario?.name || 'Scenario'}</span>
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
      )}

      {/* Forecast Version Filter */}
      {showForecastVersion && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={compact ? 'sm' : 'default'} className="gap-2">
              <GitBranch className="h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">{selectedVersion?.name || 'Version'}</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {forecastVersions.map((version) => (
              <DropdownMenuItem
                key={version.id}
                onClick={() => updateFilters({ forecastVersion: version.id })}
                className="justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>{version.name}</span>
                  <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                    {version.status}
                  </Badge>
                </div>
                {filters.forecastVersion === version.id && (
                  <Check className="h-4 w-4 text-blue-400" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Forecast Horizon Filter */}
      {showForecastHorizon && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={compact ? 'sm' : 'default'} className="gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">{selectedHorizon?.name || 'Horizon'}</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            {forecastHorizons.map((horizon) => (
              <DropdownMenuItem
                key={horizon.id}
                onClick={() => updateFilters({ forecastHorizon: horizon.id })}
                className="justify-between"
              >
                <span>{horizon.name}</span>
                {filters.forecastHorizon === horizon.id && (
                  <Check className="h-4 w-4 text-blue-400" />
                )}
              </DropdownMenuItem>
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
          <DropdownMenuContent align="start" className="w-48">
            {datePresets.map((preset) => (
              <DropdownMenuItem
                key={preset.id}
                onClick={() => updateFilters({ datePreset: preset.id })}
                className="justify-between"
              >
                <span>{preset.label}</span>
                {filters.datePreset === preset.id && <Check className="h-4 w-4 text-blue-400" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Status Filter */}
      {showStatus && (
        <MultiSelectFilter
          label="Status"
          icon={Target}
          options={statuses}
          selectedIds={filters.statusIds}
          onToggle={(id) => toggleArrayFilter('statusIds', id, filters.statusIds)}
          compact={compact}
          showColor
        />
      )}

      {/* Tags Filter */}
      {showTags && (
        <MultiSelectFilter
          label="Tags"
          icon={Tag}
          options={tags}
          selectedIds={filters.tagIds}
          onToggle={(id) => toggleArrayFilter('tagIds', id, filters.tagIds)}
          compact={compact}
          showColor
        />
      )}

      {/* More Filters Button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={compact ? 'sm' : 'default'} className="gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="hidden sm:inline">More</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>Business Unit</DropdownMenuItem>
          <DropdownMenuItem>SPV</DropdownMenuItem>
          <DropdownMenuItem>Region</DropdownMenuItem>
          <DropdownMenuItem>Currency</DropdownMenuItem>
          <DropdownMenuItem>Cost Center</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Customer</DropdownMenuItem>
          <DropdownMenuItem>Vendor</DropdownMenuItem>
          <DropdownMenuItem>Loan</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Status</DropdownMenuItem>
          <DropdownMenuItem>Tags</DropdownMenuItem>
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
  );
}

// Multi-select filter dropdown component
interface FilterOption {
  id: string;
  name: string;
  count?: number;
  status?: string;
  balance?: number;
  color?: string;
  symbol?: string;
}

interface MultiSelectFilterProps {
  label: string;
  icon: React.ElementType;
  options: FilterOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  compact?: boolean;
  showStatus?: boolean;
  showBalance?: boolean;
  showColor?: boolean;
}

function MultiSelectFilter({
  label,
  icon: Icon,
  options,
  selectedIds,
  onToggle,
  compact,
  showStatus,
  showBalance,
  showColor,
}: MultiSelectFilterProps) {
  const selectedCount = selectedIds.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={compact ? 'sm' : 'default'} className="gap-2">
          <Icon className="h-4 w-4 text-slate-400" />
          <span className="hidden sm:inline">
            {selectedCount > 0 ? `${selectedCount} ${label}${selectedCount > 1 ? 's' : ''}` : `All ${label}s`}
          </span>
          {selectedCount > 0 && (
            <Badge variant="secondary" className="h-5 px-1.5">
              {selectedCount}
            </Badge>
          )}
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 max-h-80 overflow-auto">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.id}
            checked={option.id === 'all' ? selectedIds.length === 0 : selectedIds.includes(option.id)}
            onCheckedChange={() => onToggle(option.id)}
            className="gap-2"
          >
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-2">
                {showColor && option.color && (
                  <div
                    className={cn('h-2 w-2 rounded-full', {
                      'bg-red-400': option.color === 'red',
                      'bg-yellow-400': option.color === 'yellow',
                      'bg-green-400': option.color === 'green',
                      'bg-blue-400': option.color === 'blue',
                      'bg-purple-400': option.color === 'purple',
                      'bg-cyan-400': option.color === 'cyan',
                      'bg-orange-400': option.color === 'orange',
                      'bg-gray-400': option.color === 'gray',
                    })}
                  />
                )}
                <span className="truncate">{option.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {option.count !== undefined && (
                  <Badge variant="secondary" className="h-5 px-1.5">
                    {option.count}
                  </Badge>
                )}
                {showStatus && option.status && (
                  <Badge
                    variant={option.status === 'active' ? 'success' : 'secondary'}
                    className="h-5 px-1.5"
                  >
                    {option.status}
                  </Badge>
                )}
                {showBalance && option.balance !== undefined && (
                  <span className="text-xs text-slate-500">
                    ₹{(option.balance / 10000000).toFixed(1)} Cr
                  </span>
                )}
              </div>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Active filter chips display
export function CashFlowFilterChips({
  filters,
  onRemove,
  className,
}: {
  filters: CashFlowFilterState;
  onRemove: (key: keyof CashFlowFilterState, value?: string) => void;
  className?: string;
}) {
  const getFilterLabel = (key: string, value: string): string => {
    const lookups: Record<string, FilterOption[]> = {
      companyIds: companies,
      projectIds: projects,
      bankIds: banks,
      accountIds: accounts,
    };
    const list = lookups[key];
    if (list) {
      const item = list.find((i) => i.id === value);
      return item?.name || value;
    }
    return value;
  };

  const chips: { key: keyof CashFlowFilterState; label: string; value: string }[] = [];

  // Build chips from array filters
  const arrayKeys: (keyof CashFlowFilterState)[] = [
    'companyIds',
    'projectIds',
    'bankIds',
    'accountIds',
    'statusIds',
    'tagIds',
  ];

  arrayKeys.forEach((key) => {
    const values = filters[key] as string[];
    values.forEach((value) => {
      chips.push({
        key,
        label: key.replace('Ids', '').replace(/([A-Z])/g, ' $1').trim(),
        value: getFilterLabel(key, value),
      });
    });
  });

  if (chips.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {chips.map((chip, index) => (
        <div
          key={`${chip.key}-${index}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs"
        >
          <span className="text-slate-400">{chip.label}:</span>
          <span className="font-medium text-white">{chip.value}</span>
          <button
            onClick={() => onRemove(chip.key, chip.value)}
            className="ml-1 rounded-full p-0.5 hover:bg-slate-700"
          >
            <X className="h-3 w-3 text-slate-400" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default CashFlowFilters;
