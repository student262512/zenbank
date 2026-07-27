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
  Wallet,
  Calendar,
  Filter,
  ChevronDown,
  RotateCcw,
  Check,
  Briefcase,
  MapPin,
  DollarSign,
  Globe,
  Landmark,
  CreditCard,
  TrendingUp,
  Tag,
  GitBranch,
  Layers,
  X,
  Users,
} from 'lucide-react';

// Mock data for treasury filters
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
];

const regions = [
  { id: 'all', name: 'All Regions' },
  { id: 'west', name: 'West Region' },
  { id: 'north', name: 'North Region' },
  { id: 'south', name: 'South Region' },
  { id: 'east', name: 'East Region' },
];

const treasuryCenters = [
  { id: 'all', name: 'All Treasury Centers' },
  { id: 'mumbai', name: 'Mumbai HQ' },
  { id: 'delhi', name: 'Delhi Regional' },
  { id: 'bangalore', name: 'Bangalore Regional' },
  { id: 'chennai', name: 'Chennai Regional' },
];

const banks = [
  { id: 'all', name: 'All Banks', count: 12 },
  { id: 'hdfc', name: 'HDFC Bank' },
  { id: 'icici', name: 'ICICI Bank' },
  { id: 'sbi', name: 'State Bank of India' },
  { id: 'axis', name: 'Axis Bank' },
  { id: 'kotak', name: 'Kotak Mahindra Bank' },
  { id: 'yes', name: 'Yes Bank' },
  { id: 'citi', name: 'Citibank' },
  { id: 'hsbc', name: 'HSBC' },
];

const bankAccounts = [
  { id: 'all', name: 'All Accounts', count: 48 },
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

const countries = [
  { id: 'all', name: 'All Countries' },
  { id: 'in', name: 'India' },
  { id: 'us', name: 'United States' },
  { id: 'ae', name: 'UAE' },
  { id: 'sg', name: 'Singapore' },
  { id: 'uk', name: 'United Kingdom' },
];

const legalEntities = [
  { id: 'all', name: 'All Legal Entities' },
  { id: 'zenith-infra', name: 'Zenith Infrastructure Ltd' },
  { id: 'zenith-realty', name: 'Zenith Realty Holdings' },
  { id: 'zenith-energy', name: 'Zenith Energy SPV' },
  { id: 'zenith-highways', name: 'Zenith Highways Pvt Ltd' },
];

const counterparties = [
  { id: 'all', name: 'All Counterparties', count: 25 },
  { id: 'hdfc', name: 'HDFC Bank', type: 'Bank' },
  { id: 'icici', name: 'ICICI Bank', type: 'Bank' },
  { id: 'sbi', name: 'SBI', type: 'Bank' },
  { id: 'tata', name: 'Tata Projects', type: 'Vendor' },
  { id: 'lnt', name: 'L&T', type: 'Vendor' },
];

const loans = [
  { id: 'all', name: 'All Loans', count: 18 },
  { id: 'loan-001', name: 'HDFC Term Loan - ₹500 Cr' },
  { id: 'loan-002', name: 'SBI Project Loan - ₹800 Cr' },
  { id: 'loan-003', name: 'ICICI Working Capital - ₹200 Cr' },
  { id: 'loan-004', name: 'Axis ECB Loan - $50M' },
];

const investments = [
  { id: 'all', name: 'All Investments', count: 35 },
  { id: 'fd-001', name: 'HDFC FD - ₹100 Cr' },
  { id: 'fd-002', name: 'SBI FD - ₹150 Cr' },
  { id: 'liquid-001', name: 'HDFC Liquid Fund - ₹200 Cr' },
  { id: 'gsec-001', name: 'G-Sec 2030 - ₹50 Cr' },
];

const scenarios = [
  { id: 'base', name: 'Base Case' },
  { id: 'optimistic', name: 'Optimistic' },
  { id: 'pessimistic', name: 'Pessimistic' },
  { id: 'stress', name: 'Stress Test' },
];

const statuses = [
  { id: 'all', name: 'All Statuses' },
  { id: 'active', name: 'Active', color: 'green' },
  { id: 'pending', name: 'Pending', color: 'yellow' },
  { id: 'approved', name: 'Approved', color: 'green' },
  { id: 'processing', name: 'Processing', color: 'blue' },
  { id: 'completed', name: 'Completed', color: 'green' },
  { id: 'blocked', name: 'Blocked', color: 'red' },
  { id: 'dormant', name: 'Dormant', color: 'gray' },
];

const tags = [
  { id: 'critical', name: 'Critical', color: 'red' },
  { id: 'high-value', name: 'High Value', color: 'purple' },
  { id: 'escrow', name: 'Escrow', color: 'blue' },
  { id: 'operating', name: 'Operating', color: 'cyan' },
  { id: 'investment', name: 'Investment', color: 'green' },
  { id: 'payroll', name: 'Payroll', color: 'orange' },
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

export interface TreasuryFilterState {
  companyIds: string[];
  businessUnitIds: string[];
  spvIds: string[];
  projectIds: string[];
  regionIds: string[];
  treasuryCenterIds: string[];
  bankIds: string[];
  bankAccountIds: string[];
  currencyIds: string[];
  countryIds: string[];
  legalEntityIds: string[];
  counterpartyIds: string[];
  loanIds: string[];
  investmentIds: string[];
  scenario: string;
  datePreset: string;
  dateRange: { startDate?: Date; endDate?: Date };
  statusIds: string[];
  tagIds: string[];
}

export interface TreasuryFiltersProps {
  className?: string;
  showCompany?: boolean;
  showBusinessUnit?: boolean;
  showSPV?: boolean;
  showProject?: boolean;
  showRegion?: boolean;
  showTreasuryCenter?: boolean;
  showBank?: boolean;
  showBankAccount?: boolean;
  showCurrency?: boolean;
  showCountry?: boolean;
  showLegalEntity?: boolean;
  showCounterparty?: boolean;
  showLoan?: boolean;
  showInvestment?: boolean;
  showScenario?: boolean;
  showDateRange?: boolean;
  showStatus?: boolean;
  showTags?: boolean;
  compact?: boolean;
  onFilterChange?: (filters: TreasuryFilterState) => void;
}

const defaultFilters: TreasuryFilterState = {
  companyIds: [],
  businessUnitIds: [],
  spvIds: [],
  projectIds: [],
  regionIds: [],
  treasuryCenterIds: [],
  bankIds: [],
  bankAccountIds: [],
  currencyIds: [],
  countryIds: [],
  legalEntityIds: [],
  counterpartyIds: [],
  loanIds: [],
  investmentIds: [],
  scenario: 'base',
  datePreset: 'thisMonth',
  dateRange: {},
  statusIds: [],
  tagIds: [],
};

export function TreasuryFilters({
  className,
  showCompany = true,
  showBusinessUnit = false,
  showSPV = false,
  showProject = false,
  showRegion = false,
  showTreasuryCenter = false,
  showBank = true,
  showBankAccount = false,
  showCurrency = true,
  showCountry = false,
  showLegalEntity = false,
  showCounterparty = false,
  showLoan = false,
  showInvestment = false,
  showScenario = false,
  showDateRange = true,
  showStatus = false,
  showTags = false,
  compact = false,
  onFilterChange,
}: TreasuryFiltersProps) {
  const [filters, setFilters] = React.useState<TreasuryFilterState>(defaultFilters);

  const updateFilters = (updates: Partial<TreasuryFilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const toggleArrayFilter = (
    key: keyof TreasuryFilterState,
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
    filters.treasuryCenterIds.length +
    filters.bankIds.length +
    filters.bankAccountIds.length +
    filters.currencyIds.length +
    filters.countryIds.length +
    filters.legalEntityIds.length +
    filters.counterpartyIds.length +
    filters.loanIds.length +
    filters.investmentIds.length +
    filters.statusIds.length +
    filters.tagIds.length +
    (filters.scenario !== 'base' ? 1 : 0) +
    (filters.datePreset !== 'thisMonth' ? 1 : 0);

  const selectedDatePreset = datePresets.find((d) => d.id === filters.datePreset);
  const selectedScenario = scenarios.find((s) => s.id === filters.scenario);

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
          icon={Briefcase}
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

      {/* Treasury Center Filter */}
      {showTreasuryCenter && (
        <MultiSelectFilter
          label="Treasury Center"
          icon={Landmark}
          options={treasuryCenters}
          selectedIds={filters.treasuryCenterIds}
          onToggle={(id) => toggleArrayFilter('treasuryCenterIds', id, filters.treasuryCenterIds)}
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

      {/* Bank Account Filter */}
      {showBankAccount && (
        <MultiSelectFilter
          label="Account"
          icon={Wallet}
          options={bankAccounts}
          selectedIds={filters.bankAccountIds}
          onToggle={(id) => toggleArrayFilter('bankAccountIds', id, filters.bankAccountIds)}
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

      {/* Country Filter */}
      {showCountry && (
        <MultiSelectFilter
          label="Country"
          icon={Globe}
          options={countries}
          selectedIds={filters.countryIds}
          onToggle={(id) => toggleArrayFilter('countryIds', id, filters.countryIds)}
          compact={compact}
        />
      )}

      {/* Legal Entity Filter */}
      {showLegalEntity && (
        <MultiSelectFilter
          label="Legal Entity"
          icon={Building2}
          options={legalEntities}
          selectedIds={filters.legalEntityIds}
          onToggle={(id) => toggleArrayFilter('legalEntityIds', id, filters.legalEntityIds)}
          compact={compact}
        />
      )}

      {/* Counterparty Filter */}
      {showCounterparty && (
        <MultiSelectFilter
          label="Counterparty"
          icon={Users}
          options={counterparties}
          selectedIds={filters.counterpartyIds}
          onToggle={(id) => toggleArrayFilter('counterpartyIds', id, filters.counterpartyIds)}
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

      {/* Investment Filter */}
      {showInvestment && (
        <MultiSelectFilter
          label="Investment"
          icon={TrendingUp}
          options={investments}
          selectedIds={filters.investmentIds}
          onToggle={(id) => toggleArrayFilter('investmentIds', id, filters.investmentIds)}
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
          icon={Filter}
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
          <DropdownMenuItem>Treasury Center</DropdownMenuItem>
          <DropdownMenuItem>Legal Entity</DropdownMenuItem>
          <DropdownMenuItem>Counterparty</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Loan</DropdownMenuItem>
          <DropdownMenuItem>Investment</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Country</DropdownMenuItem>
          <DropdownMenuItem>Scenario</DropdownMenuItem>
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
  type?: string;
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
                    variant={option.status === 'active' ? 'default' : 'secondary'}
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

export default TreasuryFilters;
