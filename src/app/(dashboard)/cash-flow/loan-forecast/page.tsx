'use client';

import { useState } from 'react';
import {
  CreditCard,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Download,
  RefreshCw,
  Sparkles,
  ChevronRight,
  IndianRupee,
  Percent,
  Building2,
  Landmark,
  BarChart3,
} from 'lucide-react';
import { PageHeader } from '@/components/layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  KPICard,
  KPIGrid,
  DataTable,
  Column,
  LineChart,
  // BarChart,
  AreaChart,
  PieChart,
  AIInsightCard,
} from '@/components/shared';
import { CashFlowFilters, CashFlowFilterState } from '@/components/shared/cash-flow-filters';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { loanForecastTabs } from '@/config/cash-flow-navigation';
import { ResponsiveContainer, Bar, CartesianGrid, BarChart, Tooltip, XAxis, YAxis, Legend } from 'recharts';

// Mock data for KPIs
const kpiData = {
  totalDebt: { value: 1245.8, change: -2.5, trend: 'down' as const },
  monthlyEmi: { value: 48.6, change: 0, trend: 'neutral' as const },
  interestCost: { value: 18.4, change: -1.2, trend: 'down' as const },
  principalRepayment: { value: 30.2, change: 1.8, trend: 'up' as const },
  weightedAvgRate: { value: 9.45, change: -0.15, trend: 'down' as const },
  debtServiceRatio: { value: 1.85, change: 0.12, trend: 'up' as const },
  upcomingMaturities: { value: 125.0, change: 0, trend: 'neutral' as const },
  availableDrawdown: { value: 285.4, change: 45.0, trend: 'up' as const },
};

// Mock data for loan schedule
const loanSchedule = [
  {
    id: 'LOAN001',
    loanId: 'SBI-CF-2024-001',
    lender: 'State Bank of India',
    loanType: 'Construction Finance',
    project: 'Tech Park Phase 2',
    sanctionedAmount: 350.0,
    disbursed: 245.0,
    outstanding: 198.5,
    interestRate: 9.25,
    emiAmount: 12.45,
    nextEmiDate: '2026-08-25',
    maturityDate: '2029-07-25',
    status: 'active',
    covenantStatus: 'compliant',
  },
  {
    id: 'LOAN002',
    loanId: 'HDFC-PF-2023-045',
    lender: 'HDFC Bank',
    loanType: 'Project Finance',
    project: 'Marina Bay Towers',
    sanctionedAmount: 280.0,
    disbursed: 280.0,
    outstanding: 156.8,
    interestRate: 9.50,
    emiAmount: 15.80,
    nextEmiDate: '2026-08-15',
    maturityDate: '2028-12-15',
    status: 'active',
    covenantStatus: 'compliant',
  },
  {
    id: 'LOAN003',
    loanId: 'ICICI-CF-2024-012',
    lender: 'ICICI Bank',
    loanType: 'Construction Finance',
    project: 'Downtown Plaza',
    sanctionedAmount: 450.0,
    disbursed: 285.0,
    outstanding: 285.0,
    interestRate: 9.75,
    emiAmount: 0,
    nextEmiDate: '2026-09-01',
    maturityDate: '2030-03-01',
    status: 'moratorium',
    covenantStatus: 'compliant',
  },
  {
    id: 'LOAN004',
    loanId: 'AXIS-WC-2025-008',
    lender: 'Axis Bank',
    loanType: 'Working Capital',
    project: 'Corporate',
    sanctionedAmount: 100.0,
    disbursed: 75.0,
    outstanding: 45.8,
    interestRate: 10.25,
    emiAmount: 4.85,
    nextEmiDate: '2026-07-30',
    maturityDate: '2027-06-30',
    status: 'active',
    covenantStatus: 'watch',
  },
  {
    id: 'LOAN005',
    loanId: 'PNB-TL-2022-034',
    lender: 'Punjab National Bank',
    loanType: 'Term Loan',
    project: 'Green Valley Villas',
    sanctionedAmount: 180.0,
    disbursed: 180.0,
    outstanding: 89.4,
    interestRate: 9.00,
    emiAmount: 8.50,
    nextEmiDate: '2026-08-01',
    maturityDate: '2028-02-01',
    status: 'active',
    covenantStatus: 'compliant',
  },
];

// Mock data for interest schedule
const interestSchedule = [
  {
    id: 'INT001',
    loanId: 'SBI-CF-2024-001',
    lender: 'State Bank of India',
    project: 'Tech Park Phase 2',
    period: 'Aug 2026',
    principalOutstanding: 198.5,
    interestRate: 9.25,
    interestAmount: 1.53,
    dueDate: '2026-08-25',
    status: 'upcoming',
  },
  {
    id: 'INT002',
    loanId: 'HDFC-PF-2023-045',
    lender: 'HDFC Bank',
    project: 'Marina Bay Towers',
    period: 'Aug 2026',
    principalOutstanding: 156.8,
    interestRate: 9.50,
    interestAmount: 1.24,
    dueDate: '2026-08-15',
    status: 'upcoming',
  },
  {
    id: 'INT003',
    loanId: 'ICICI-CF-2024-012',
    lender: 'ICICI Bank',
    project: 'Downtown Plaza',
    period: 'Aug 2026',
    principalOutstanding: 285.0,
    interestRate: 9.75,
    interestAmount: 2.32,
    dueDate: '2026-09-01',
    status: 'upcoming',
  },
  {
    id: 'INT004',
    loanId: 'AXIS-WC-2025-008',
    lender: 'Axis Bank',
    project: 'Corporate',
    period: 'Jul 2026',
    principalOutstanding: 45.8,
    interestRate: 10.25,
    interestAmount: 0.39,
    dueDate: '2026-07-30',
    status: 'due_soon',
  },
];

// Mock data for principal schedule
const principalSchedule = [
  {
    id: 'PRI001',
    loanId: 'SBI-CF-2024-001',
    lender: 'State Bank of India',
    project: 'Tech Park Phase 2',
    period: 'Aug 2026',
    principalDue: 10.92,
    totalEmi: 12.45,
    principalAfterPayment: 187.58,
    dueDate: '2026-08-25',
    status: 'upcoming',
  },
  {
    id: 'PRI002',
    loanId: 'HDFC-PF-2023-045',
    lender: 'HDFC Bank',
    project: 'Marina Bay Towers',
    period: 'Aug 2026',
    principalDue: 14.56,
    totalEmi: 15.80,
    principalAfterPayment: 142.24,
    dueDate: '2026-08-15',
    status: 'upcoming',
  },
  {
    id: 'PRI003',
    loanId: 'AXIS-WC-2025-008',
    lender: 'Axis Bank',
    project: 'Corporate',
    period: 'Jul 2026',
    principalDue: 4.46,
    totalEmi: 4.85,
    principalAfterPayment: 41.34,
    dueDate: '2026-07-30',
    status: 'due_soon',
  },
  {
    id: 'PRI004',
    loanId: 'PNB-TL-2022-034',
    lender: 'Punjab National Bank',
    project: 'Green Valley Villas',
    period: 'Aug 2026',
    principalDue: 7.83,
    totalEmi: 8.50,
    principalAfterPayment: 81.57,
    dueDate: '2026-08-01',
    status: 'upcoming',
  },
];

// Mock data for upcoming payments
const upcomingPayments = [
  {
    id: 'UP001',
    lender: 'Axis Bank',
    loanType: 'Working Capital',
    project: 'Corporate',
    dueDate: '2026-07-30',
    daysUntilDue: 5,
    principal: 4.46,
    interest: 0.39,
    total: 4.85,
    status: 'due_soon',
    priority: 'high',
  },
  {
    id: 'UP002',
    lender: 'Punjab National Bank',
    loanType: 'Term Loan',
    project: 'Green Valley Villas',
    dueDate: '2026-08-01',
    daysUntilDue: 7,
    principal: 7.83,
    interest: 0.67,
    total: 8.50,
    status: 'upcoming',
    priority: 'medium',
  },
  {
    id: 'UP003',
    lender: 'HDFC Bank',
    loanType: 'Project Finance',
    project: 'Marina Bay Towers',
    dueDate: '2026-08-15',
    daysUntilDue: 21,
    principal: 14.56,
    interest: 1.24,
    total: 15.80,
    status: 'upcoming',
    priority: 'medium',
  },
  {
    id: 'UP004',
    lender: 'State Bank of India',
    loanType: 'Construction Finance',
    project: 'Tech Park Phase 2',
    dueDate: '2026-08-25',
    daysUntilDue: 31,
    principal: 10.92,
    interest: 1.53,
    total: 12.45,
    status: 'scheduled',
    priority: 'medium',
  },
];

// Mock data for debt outlook
const debtOutlookData = [
  { month: 'Aug 26', principal: 775.5, emi: 48.6, interest: 18.4 },
  { month: 'Sep 26', principal: 745.3, emi: 48.6, interest: 17.8 },
  { month: 'Oct 26', principal: 715.1, emi: 48.6, interest: 17.2 },
  { month: 'Nov 26', principal: 684.9, emi: 48.6, interest: 16.6 },
  { month: 'Dec 26', principal: 654.7, emi: 48.6, interest: 16.0 },
  { month: 'Jan 27', principal: 624.5, emi: 48.6, interest: 15.4 },
];

// Mock data for debt by lender
const debtByLender = [
  { label: 'ICICI Bank', value: 285.0, color: '#3b82f6' },
  { label: 'SBI', value: 198.5, color: '#10b981' },
  { label: 'HDFC Bank', value: 156.8, color: '#f59e0b' },
  { label: 'PNB', value: 89.4, color: '#8b5cf6' },
  { label: 'Axis Bank', value: 45.8, color: '#ec4899' },
];

// AI Insights
const aiInsights = [
  {
    id: 'ai1',
    type: 'opportunity' as const,
    title: 'Refinancing Opportunity',
    description: 'HDFC loan at 9.5% can be refinanced at 8.75%. Potential savings of ₹1.17 Cr over remaining tenure.',
    impact: '+₹1.17 Cr savings',
    impactLevel: 'high',
    confidence: 92,
    action: 'Explore Refinance',
  },
  {
    id: 'ai2',
    type: 'warning' as const,
    title: 'Covenant Watch',
    description: 'Axis Bank WC facility showing DSCR at 1.12x against covenant of 1.15x. Action needed.',
    impact: 'Covenant breach risk',
    impactLevel: 'high',
    confidence: 88,
    action: 'Review Covenant',
  },
  {
    id: 'ai3',
    type: 'insight' as const,
    title: 'Prepayment Analysis',
    description: 'Prepaying ₹25 Cr on PNB loan can save ₹2.8 Cr in interest. No prepayment penalty applicable.',
    impact: '+₹2.8 Cr savings',
    impactLevel: 'low',
    confidence: 95,
    action: 'Evaluate Prepay',
  },
];

export default function LoanRepaymentForecastPage() {
  const [activeTab, setActiveTab] = useState('schedule');
  const [filters, setFilters] = useState<CashFlowFilterState>({
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
    statusIds: [],
    tagIds: [],
    scenario: 'actual',
    forecastVersion: 'current',
    forecastHorizon: '3m',
    datePreset: 'thisMonth',
    dateRange: { startDate: undefined, endDate: undefined },
  });
  const [selectedLoan, setSelectedLoan] = useState<typeof loanSchedule[0] | null>(null);

  const loanColumns: Column<typeof loanSchedule[0]>[] = [
    {
      id: 'lender',
      header: 'Lender',
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-medium">{row.lender}</div>
          <div className="text-xs text-muted-foreground">{row.loanId}</div>
        </div>
      ),
    },
    {
      id: 'loanType',
      header: 'Type',
      cell: (row) => (
        <Badge variant="outline">{row.loanType}</Badge>
      ),
    },
    {
      id: 'project',
      header: 'Project',
      sortable: true,
    },
    {
      id: 'sanctionedAmount',
      header: 'Sanctioned',
      align: 'right' as const,
      cell: (row) => <span>₹{row.sanctionedAmount.toFixed(0)} Cr</span>,
    },
    {
      id: 'outstanding',
      header: 'Outstanding',
      align: 'right' as const,
      sortable: true,
      cell: (row) => (
        <span className="font-semibold text-red-400">₹{row.outstanding.toFixed(1)} Cr</span>
      ),
    },
    {
      id: 'interestRate',
      header: 'Rate',
      align: 'right' as const,
      cell: (row) => <span>{row.interestRate}%</span>,
    },
    {
      id: 'emiAmount',
      header: 'EMI',
      align: 'right' as const,
      cell: (row) => (
        <span>{row.emiAmount > 0 ? `₹${row.emiAmount.toFixed(2)} Cr` : 'Moratorium'}</span>
      ),
    },
    {
      id: 'nextEmiDate',
      header: 'Next EMI',
      cell: (row) => new Date(row.nextEmiDate).toLocaleDateString('en-IN'),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge
          variant={
            row.status === 'active' ? 'default' :
            row.status === 'moratorium' ? 'secondary' : 'outline'
          }
        >
          {row.status === 'active' ? 'Active' : 'Moratorium'}
        </Badge>
      ),
    },
    {
      id: 'covenantStatus',
      header: 'Covenant',
      cell: (row) => (
        <Badge
          variant={
            row.covenantStatus === 'compliant' ? 'default' :
            row.covenantStatus === 'watch' ? 'secondary' : 'danger'
          }
        >
          {row.covenantStatus}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedLoan(row)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const interestColumns: Column<typeof interestSchedule[0]>[] = [
    {
      id: 'lender',
      header: 'Lender',
      sortable: true,
    },
    {
      id: 'project',
      header: 'Project',
      sortable: true,
    },
    {
      id: 'period',
      header: 'Period',
    },
    {
      id: 'principalOutstanding',
      header: 'Principal O/S',
      align: 'right' as const,
      cell: (row) => <span>₹{row.principalOutstanding.toFixed(1)} Cr</span>,
    },
    {
      id: 'interestRate',
      header: 'Rate',
      align: 'right' as const,
      cell: (row) => <span>{row.interestRate}%</span>,
    },
    {
      id: 'interestAmount',
      header: 'Interest Due',
      align: 'right' as const,
      cell: (row) => (
        <span className="font-semibold text-amber-400">₹{row.interestAmount.toFixed(2)} Cr</span>
      ),
    },
    {
      id: 'dueDate',
      header: 'Due Date',
      cell: (row) => new Date(row.dueDate).toLocaleDateString('en-IN'),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge variant={row.status === 'due_soon' ? 'default' : 'secondary'}>
          {row.status === 'due_soon' ? 'Due Soon' : 'Upcoming'}
        </Badge>
      ),
    },
  ];

  const principalColumns: Column<typeof principalSchedule[0]>[] = [
    {
      id: 'lender',
      header: 'Lender',
      sortable: true,
    },
    {
      id: 'project',
      header: 'Project',
      sortable: true,
    },
    {
      id: 'period',
      header: 'Period',
    },
    {
      id: 'principalDue',
      header: 'Principal Due',
      align: 'right' as const,
      cell: (row) => (
        <span className="font-semibold text-red-400">₹{row.principalDue.toFixed(2)} Cr</span>
      ),
    },
    {
      id: 'totalEmi',
      header: 'Total EMI',
      align: 'right' as const,
      cell: (row) => <span>₹{row.totalEmi.toFixed(2)} Cr</span>,
    },
    {
      id: 'principalAfterPayment',
      header: 'After Payment',
      align: 'right' as const,
      cell: (row) => <span>₹{row.principalAfterPayment.toFixed(2)} Cr</span>,
    },
    {
      id: 'dueDate',
      header: 'Due Date',
      cell: (row) => new Date(row.dueDate).toLocaleDateString('en-IN'),
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge variant={row.status === 'due_soon' ? 'default' : 'secondary'}>
          {row.status === 'due_soon' ? 'Due Soon' : 'Upcoming'}
        </Badge>
      ),
    },
  ];

  const upcomingColumns: Column<typeof upcomingPayments[0]>[] = [
    {
      id: 'lender',
      header: 'Lender',
      sortable: true,
    },
    {
      id: 'project',
      header: 'Project',
      sortable: true,
    },
    {
      id: 'dueDate',
      header: 'Due Date',
      sortable: true,
      cell: (row) => new Date(row.dueDate).toLocaleDateString('en-IN'),
    },
    {
      id: 'daysUntilDue',
      header: 'Days',
      align: 'right' as const,
      cell: (row) => (
        <span className={row.daysUntilDue <= 7 ? 'text-amber-400' : ''}>
          {row.daysUntilDue}
        </span>
      ),
    },
    {
      id: 'principal',
      header: 'Principal',
      align: 'right' as const,
      cell: (row) => <span>₹{row.principal.toFixed(2)} Cr</span>,
    },
    {
      id: 'interest',
      header: 'Interest',
      align: 'right' as const,
      cell: (row) => <span>₹{row.interest.toFixed(2)} Cr</span>,
    },
    {
      id: 'total',
      header: 'Total',
      align: 'right' as const,
      cell: (row) => (
        <span className="font-semibold text-red-400">₹{row.total.toFixed(2)} Cr</span>
      ),
    },
    {
      id: 'priority',
      header: 'Priority',
      cell: (row) => (
        <Badge variant={row.priority === 'high' ? 'default' : 'secondary'}>
          {row.priority}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Loan Repayment Forecast"
        description="Debt service schedules, interest analysis, and repayment planning"
        breadcrumbs={[
          { label: 'Cash Flow', href: '/cash-flow' },
          { label: 'Loan Forecast' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button size="sm">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Analysis
            </Button>
          </div>
        }
      />

      <CashFlowFilters initialFilters={filters} onFilterChange={setFilters} />

      {/* KPI Grid */}
      <KPIGrid columns={4}>
        <KPICard
          title="Total Debt"
          value={`₹${kpiData.totalDebt.value} Cr`}
          change={kpiData.totalDebt.change}
          trend={kpiData.totalDebt.trend}
          icon={Landmark}
          iconColor="text-blue-400"
        />
        <KPICard
          title="Monthly EMI"
          value={`₹${kpiData.monthlyEmi.value} Cr`}
          change={kpiData.monthlyEmi.change}
          trend={kpiData.monthlyEmi.trend}
          icon={CreditCard}
          iconColor="text-red-400"
        />
        <KPICard
          title="Weighted Avg Rate"
          value={`${kpiData.weightedAvgRate.value}%`}
          change={kpiData.weightedAvgRate.change}
          trend={kpiData.weightedAvgRate.trend}
          icon={Percent}
          iconColor="text-amber-400"
        />
        <KPICard
          title="Debt Service Ratio"
          value={kpiData.debtServiceRatio.value.toFixed(2)}
          change={kpiData.debtServiceRatio.change}
          trend={kpiData.debtServiceRatio.trend}
          icon={BarChart3}
          iconColor="text-emerald-400"
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {loanForecastTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Loan Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Portfolio</CardTitle>
              <CardDescription>Active loans and repayment schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={loanSchedule}
                columns={loanColumns}
                searchable
                // searchKeys={['lender', 'project', 'loanId']}
              />
            </CardContent>
          </Card>

          {/* AI Insights */}
          <div className="grid grid-cols-3 gap-4">
            {aiInsights.map((insight) => (
              <AIInsightCard
                key={insight.id}
                type={insight.type}
                title={insight.title}
                insight={insight.description}
                impactValue={insight.impact}
                impact={insight.impactLevel as 'low' | 'medium' | 'high'}
                confidence={insight.confidence}
                // action={insight.action}
              />
            ))}
          </div>
        </TabsContent>

        {/* Interest Tab */}
        <TabsContent value="interest" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Interest</p>
                    <p className="text-2xl font-bold text-amber-400">₹18.4 Cr</p>
                  </div>
                  <Percent className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">YTD Interest</p>
                    <p className="text-2xl font-bold">₹128.8 Cr</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Interest Rate</p>
                    <p className="text-2xl font-bold">9.45%</p>
                  </div>
                  <Percent className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Interest Coverage</p>
                    <p className="text-2xl font-bold text-emerald-400">2.85x</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Interest Schedule</CardTitle>
              <CardDescription>Upcoming interest payments by loan</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={interestSchedule}
                columns={interestColumns}
                searchable
                // searchKeys={['lender', 'project']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Principal Tab */}
        <TabsContent value="principal" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Principal</p>
                    <p className="text-2xl font-bold text-red-400">₹30.2 Cr</p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">YTD Repaid</p>
                    <p className="text-2xl font-bold text-emerald-400">₹211.4 Cr</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Remaining Tenure</p>
                    <p className="text-2xl font-bold">3.5 Yrs</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Maturities (12M)</p>
                    <p className="text-2xl font-bold text-amber-400">₹125.0 Cr</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Principal Repayment Schedule</CardTitle>
              <CardDescription>Upcoming principal payments by loan</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={principalSchedule}
                columns={principalColumns}
                searchable
                // searchKeys={['lender', 'project']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upcoming Payments Tab */}
        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Loan Payments</CardTitle>
              <CardDescription>EMI payments due in the next 60 days</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={upcomingPayments}
                columns={upcomingColumns}
                searchable
                // searchKeys={['lender', 'project']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Debt Outlook Tab */}
        <TabsContent value="outlook" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Debt Reduction Forecast</CardTitle>
                <CardDescription>Principal reduction over next 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={debtOutlookData}
                  xKey="month"
                  series={[
                    { key: 'principal', name: 'Outstanding Principal', color: '#ef4444' },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Debt by Lender</CardTitle>
                <CardDescription>Outstanding distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={debtByLender}
                  // height={280}
                  showLegend
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Payment Forecast</CardTitle>
              <CardDescription>EMI breakdown over next 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <BarChart
                data={debtOutlookData}
                xKey="month"
                series={[
                  { key: 'interest', name: 'Interest', color: '#f59e0b' },
                  { key: 'emi', name: 'EMI', color: '#ef4444' },
                ]}
                height={300}
              /> */}
              <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={debtOutlookData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Bar dataKey="interest" name="Interest" fill="#f59e0b" />
                                  <Bar dataKey="emi" name="EMI" fill="#ef4444" />
                                </BarChart>
                              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Loan Detail Drawer */}
      <Drawer open={!!selectedLoan} onOpenChange={() => setSelectedLoan(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedLoan?.lender}</DrawerTitle>
            <DrawerDescription>
              {selectedLoan?.loanId} - {selectedLoan?.loanType}
            </DrawerDescription>
          </DrawerHeader>
          {selectedLoan && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Sanctioned</p>
                    <p className="text-xl font-bold">₹{selectedLoan.sanctionedAmount.toFixed(0)} Cr</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Disbursed</p>
                    <p className="text-xl font-bold text-blue-400">
                      ₹{selectedLoan.disbursed.toFixed(0)} Cr
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Outstanding</p>
                    <p className="text-xl font-bold text-red-400">
                      ₹{selectedLoan.outstanding.toFixed(1)} Cr
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="text-xl font-bold text-emerald-400">
                      ₹{(selectedLoan.sanctionedAmount - selectedLoan.disbursed).toFixed(0)} Cr
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Project</p>
                    <p className="font-medium">{selectedLoan.project}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="font-medium">{selectedLoan.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">EMI Amount</p>
                    <p className="font-medium">
                      {selectedLoan.emiAmount > 0 ? `₹${selectedLoan.emiAmount.toFixed(2)} Cr` : 'Moratorium'}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Next EMI Date</p>
                    <p className="font-medium">
                      {new Date(selectedLoan.nextEmiDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Maturity Date</p>
                    <p className="font-medium">
                      {new Date(selectedLoan.maturityDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Covenant Status</p>
                    <Badge
                      variant={selectedLoan.covenantStatus === 'compliant' ? 'default' : 'secondary'}
                    >
                      {selectedLoan.covenantStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* Quick Actions */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Quick Actions:</span>
              <Button variant="outline" size="sm">
                <CreditCard className="mr-2 h-4 w-4" />
                Process EMI
              </Button>
              <Button variant="outline" size="sm">
                <IndianRupee className="mr-2 h-4 w-4" />
                Prepay Loan
              </Button>
              <Button variant="outline" size="sm">
                <Landmark className="mr-2 h-4 w-4" />
                Request Drawdown
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
