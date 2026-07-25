'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { LineChart } from '@/components/shared/charts/line-chart';
import { BarChart } from '@/components/shared/charts/bar-chart';
import { AreaChart } from '@/components/shared/charts/area-chart';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { AIInsightCard, AIInsightsPanel } from '@/components/shared/ai-insight-card';
import { CashFlowFilters } from '@/components/shared/cash-flow-filters';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  AlertTriangle,
  Clock,
  DollarSign,
  PiggyBank,
  Building2,
  Users,
  Truck,
  CreditCard,
  FileText,
  CheckCircle2,
  XCircle,
  Zap,
  BarChart3,
  RefreshCcw,
  Download,
  Share2,
  Star,
  Bot,
  Sparkles,
  CalendarDays,
  Shield,
} from 'lucide-react';
import { cashFlowDashboardTabs } from '@/config/cash-flow-navigation';

// Mock KPI Data based on checklist requirements
const kpiData = {
  availableCash: {
    value: '2,450',
    unit: 'Cr',
    change: 8.5,
    trend: 'up' as const,
    sparkline: [2100, 2180, 2250, 2320, 2380, 2420, 2450],
    subtitle: 'Across 45 bank accounts',
  },
  netLiquidity: {
    value: '1,890',
    unit: 'Cr',
    change: 5.2,
    trend: 'up' as const,
    sparkline: [1650, 1720, 1780, 1820, 1850, 1870, 1890],
    subtitle: 'After committed payments',
  },
  openingBalance: {
    value: '2,100',
    unit: 'Cr',
    change: 0,
    trend: 'neutral' as const,
    subtitle: 'As of 01 Jul 2024',
  },
  closingBalance: {
    value: '2,450',
    unit: 'Cr',
    change: 16.7,
    trend: 'up' as const,
    subtitle: 'Projected EOD',
  },
  cashInflow: {
    value: '890',
    unit: 'Cr',
    change: 12.4,
    trend: 'up' as const,
    sparkline: [720, 750, 780, 820, 850, 870, 890],
    subtitle: 'MTD collections',
  },
  cashOutflow: {
    value: '540',
    unit: 'Cr',
    change: -8.2,
    trend: 'down' as const,
    sparkline: [620, 600, 580, 560, 550, 545, 540],
    subtitle: 'MTD payments',
  },
  forecastAccuracy: {
    value: '94.5',
    unit: '%',
    change: 2.1,
    trend: 'up' as const,
    subtitle: '30-day rolling accuracy',
  },
  cashBurn: {
    value: '45',
    unit: 'Cr/month',
    change: -5.3,
    trend: 'down' as const,
    subtitle: 'Average monthly burn',
  },
  workingCapital: {
    value: '890',
    unit: 'Cr',
    change: 4.8,
    trend: 'up' as const,
    subtitle: 'Net working capital',
  },
  escrowCash: {
    value: '560',
    unit: 'Cr',
    change: 0,
    trend: 'neutral' as const,
    subtitle: 'In escrow accounts',
  },
  restrictedCash: {
    value: '320',
    unit: 'Cr',
    change: 0,
    trend: 'neutral' as const,
    subtitle: 'Regulatory reserves',
  },
  idleCash: {
    value: '125',
    unit: 'Cr',
    change: 15.2,
    trend: 'up' as const,
    subtitle: 'Optimization opportunity',
  },
  fundingGap: {
    value: '78',
    unit: 'Cr',
    change: -12.5,
    trend: 'down' as const,
    subtitle: 'Next 30 days shortfall',
  },
};

// Mock Cash Position Trend Data (30 days)
const cashPositionTrendData = Array.from({ length: 30 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: 2100 + Math.random() * 400 + i * 10,
  value2: 2000 + Math.random() * 350 + i * 8,
}));

// Mock Daily Cash Forecast Data (30 days)
const dailyForecastData = Array.from({ length: 30 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: 2200 + Math.random() * 500 + i * 15,
}));

// Mock Weekly Forecast Data (12 weeks)
const weeklyForecastData = Array.from({ length: 12 }, (_, i) => ({
  label: `W${i + 1}`,
  value: 2300 + Math.random() * 300 + i * 50,
  value2: 2100 + Math.random() * 250 + i * 40,
}));

// Mock Monthly Forecast Data (12 months)
const monthlyForecastData = [
  { label: 'Jan', inflow: 850, outflow: 520 },
  { label: 'Feb', inflow: 920, outflow: 480 },
  { label: 'Mar', inflow: 780, outflow: 560 },
  { label: 'Apr', inflow: 890, outflow: 510 },
  { label: 'May', inflow: 950, outflow: 470 },
  { label: 'Jun', inflow: 1020, outflow: 520 },
  { label: 'Jul', inflow: 880, outflow: 540 },
  { label: 'Aug', inflow: 920, outflow: 490 },
  { label: 'Sep', inflow: 980, outflow: 510 },
  { label: 'Oct', inflow: 1050, outflow: 480 },
  { label: 'Nov', inflow: 1100, outflow: 520 },
  { label: 'Dec', inflow: 1200, outflow: 560 },
];

// Mock Liquidity Trend Data (90 days)
const liquidityTrendData = Array.from({ length: 90 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: 1800 + Math.random() * 200 + Math.sin(i / 10) * 100,
}));

// Mock Cash Waterfall Data
const waterfallData = [
  { label: 'Opening', value: 2100, type: 'start' },
  { label: 'Collections', value: 890, type: 'positive' },
  { label: 'Vendor Payments', value: -320, type: 'negative' },
  { label: 'Payroll', value: -85, type: 'negative' },
  { label: 'Loan Repayments', value: -120, type: 'negative' },
  { label: 'Interest Income', value: 45, type: 'positive' },
  { label: 'Taxes', value: -60, type: 'negative' },
  { label: 'Closing', value: 2450, type: 'end' },
];

// Mock Critical Cash Events
interface CashEvent {
  id: string;
  date: string;
  event: string;
  impact: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  action: string;
}

const criticalEvents: CashEvent[] = [
  { id: '1', date: '2024-07-15', event: 'Loan Repayment - SBI', impact: -45000000, priority: 'critical', action: 'Ensure funds' },
  { id: '2', date: '2024-07-18', event: 'Vendor Payment - L&T', impact: -28000000, priority: 'high', action: 'Approve' },
  { id: '3', date: '2024-07-20', event: 'Customer Collection - Tata', impact: 65000000, priority: 'high', action: 'Follow up' },
  { id: '4', date: '2024-07-22', event: 'Payroll Processing', impact: -85000000, priority: 'critical', action: 'Schedule' },
  { id: '5', date: '2024-07-25', event: 'GST Payment', impact: -32000000, priority: 'high', action: 'Prepare' },
  { id: '6', date: '2024-07-28', event: 'FD Maturity - HDFC', impact: 100000000, priority: 'medium', action: 'Reinvest' },
  { id: '7', date: '2024-07-30', event: 'Quarter-end Settlement', impact: -45000000, priority: 'high', action: 'Review' },
  { id: '8', date: '2024-08-01', event: 'Rental Collection', impact: 15000000, priority: 'medium', action: 'Confirm' },
  { id: '9', date: '2024-08-05', event: 'Insurance Premium', impact: -8000000, priority: 'low', action: 'Process' },
  { id: '10', date: '2024-08-10', event: 'Project Milestone - Metro', impact: 120000000, priority: 'high', action: 'Track' },
];

// Mock Upcoming Collections
interface Collection {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  status: 'on-track' | 'at-risk' | 'overdue';
  risk: 'low' | 'medium' | 'high';
}

const upcomingCollections: Collection[] = [
  { id: '1', customer: 'Tata Projects Ltd', amount: 65000000, dueDate: '2024-07-20', status: 'on-track', risk: 'low' },
  { id: '2', customer: 'Godrej Properties', amount: 42000000, dueDate: '2024-07-22', status: 'on-track', risk: 'low' },
  { id: '3', customer: 'DLF Limited', amount: 38000000, dueDate: '2024-07-25', status: 'at-risk', risk: 'medium' },
  { id: '4', customer: 'Mahindra Lifespaces', amount: 28000000, dueDate: '2024-07-28', status: 'on-track', risk: 'low' },
  { id: '5', customer: 'Brigade Group', amount: 22000000, dueDate: '2024-07-30', status: 'at-risk', risk: 'high' },
  { id: '6', customer: 'Prestige Estates', amount: 35000000, dueDate: '2024-08-02', status: 'on-track', risk: 'low' },
  { id: '7', customer: 'Sobha Limited', amount: 18000000, dueDate: '2024-08-05', status: 'overdue', risk: 'high' },
  { id: '8', customer: 'Puravankara', amount: 25000000, dueDate: '2024-08-08', status: 'on-track', risk: 'medium' },
  { id: '9', customer: 'Oberoi Realty', amount: 45000000, dueDate: '2024-08-10', status: 'on-track', risk: 'low' },
  { id: '10', customer: 'Phoenix Mills', amount: 32000000, dueDate: '2024-08-12', status: 'at-risk', risk: 'medium' },
];

// Mock Upcoming Payments
interface Payment {
  id: string;
  vendor: string;
  amount: number;
  dueDate: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'processing';
}

const upcomingPayments: Payment[] = [
  { id: '1', vendor: 'L&T Construction', amount: 45000000, dueDate: '2024-07-18', priority: 'critical', status: 'approved' },
  { id: '2', vendor: 'ACC Cement', amount: 18000000, dueDate: '2024-07-20', priority: 'high', status: 'pending' },
  { id: '3', vendor: 'Tata Steel', amount: 32000000, dueDate: '2024-07-22', priority: 'high', status: 'pending' },
  { id: '4', vendor: 'UltraTech Cement', amount: 15000000, dueDate: '2024-07-25', priority: 'medium', status: 'pending' },
  { id: '5', vendor: 'JSW Steel', amount: 28000000, dueDate: '2024-07-28', priority: 'high', status: 'pending' },
  { id: '6', vendor: 'Ambuja Cement', amount: 12000000, dueDate: '2024-07-30', priority: 'medium', status: 'pending' },
  { id: '7', vendor: 'SAIL', amount: 22000000, dueDate: '2024-08-02', priority: 'medium', status: 'pending' },
  { id: '8', vendor: 'Dalmia Bharat', amount: 8000000, dueDate: '2024-08-05', priority: 'low', status: 'pending' },
  { id: '9', vendor: 'Shree Cement', amount: 14000000, dueDate: '2024-08-08', priority: 'medium', status: 'pending' },
  { id: '10', vendor: 'Hindalco', amount: 19000000, dueDate: '2024-08-10', priority: 'medium', status: 'pending' },
];

// Mock Cash Alerts
interface CashAlert {
  id: string;
  alert: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  impact: string;
  recommendation: string;
}

const cashAlerts: CashAlert[] = [
  { id: '1', alert: 'Liquidity threshold breach in 5 days', severity: 'critical', impact: 'May impact payroll', recommendation: 'Accelerate collections or arrange short-term credit' },
  { id: '2', alert: 'Idle cash detected in 3 accounts', severity: 'medium', impact: '₹45 Cr earning no interest', recommendation: 'Move to overnight fund or FD' },
  { id: '3', alert: 'Collection delay predicted for DLF', severity: 'high', impact: '₹38 Cr may be delayed by 10 days', recommendation: 'Proactive follow-up recommended' },
  { id: '4', alert: 'FX exposure increasing', severity: 'medium', impact: '$2M unhedged exposure', recommendation: 'Consider forward contract' },
  { id: '5', alert: 'Vendor payment concentration', severity: 'low', impact: '60% payments in last week of month', recommendation: 'Negotiate staggered payments' },
];

// Mock Pending Approvals
interface Approval {
  id: string;
  item: string;
  amount: number;
  requester: string;
  status: 'pending' | 'urgent';
  actions: string[];
}

const pendingApprovals: Approval[] = [
  { id: '1', item: 'Vendor Payment - L&T Construction', amount: 45000000, requester: 'Rajesh Kumar', status: 'urgent', actions: ['Approve', 'Reject', 'Hold'] },
  { id: '2', item: 'Inter-company Transfer', amount: 25000000, requester: 'Priya Singh', status: 'pending', actions: ['Approve', 'Reject'] },
  { id: '3', item: 'FD Renewal - HDFC', amount: 100000000, requester: 'Amit Patel', status: 'pending', actions: ['Approve', 'Modify'] },
  { id: '4', item: 'Loan Prepayment', amount: 50000000, requester: 'Treasury Team', status: 'pending', actions: ['Approve', 'Defer'] },
  { id: '5', item: 'Emergency Fund Release', amount: 15000000, requester: 'Operations', status: 'urgent', actions: ['Approve', 'Reject'] },
];

// Mock Funding Requirements
interface FundingRequirement {
  id: string;
  project: string;
  amount: number;
  dueDate: string;
  source: string;
  status: 'secured' | 'pending' | 'at-risk';
}

const fundingRequirements: FundingRequirement[] = [
  { id: '1', project: 'Mumbai Metro Phase 1', amount: 120000000, dueDate: '2024-07-30', source: 'SBI Term Loan', status: 'secured' },
  { id: '2', project: 'Highway NH-48', amount: 85000000, dueDate: '2024-08-15', source: 'Internal Accruals', status: 'pending' },
  { id: '3', project: 'Gujarat Solar Park', amount: 65000000, dueDate: '2024-08-20', source: 'Green Bond', status: 'at-risk' },
  { id: '4', project: 'Pune Water Treatment', amount: 45000000, dueDate: '2024-09-01', source: 'HDFC Loan', status: 'pending' },
  { id: '5', project: 'Zenith Tower A', amount: 95000000, dueDate: '2024-09-15', source: 'Customer Advances', status: 'secured' },
];

// AI Insights
const aiInsights = [
  {
    title: 'Cash Position Optimization',
    insight: 'Move ₹125 Cr idle cash to overnight mutual fund. Projected additional yield: ₹4.2L per day based on current NAV trends.',
    type: 'opportunity' as const,
    confidence: 94,
    impact: 'high' as const,
    impactValue: '+₹12.6L/month',
  },
  {
    title: 'Collection Risk Alert',
    insight: 'DLF payment of ₹38 Cr showing 75% probability of 10-day delay based on payment pattern analysis. Recommend immediate follow-up.',
    type: 'warning' as const,
    confidence: 87,
    impact: 'high' as const,
  },
  {
    title: 'Payment Scheduling',
    insight: 'Defer 2 non-critical vendor payments by 7 days to maintain liquidity buffer during payroll week.',
    type: 'recommendation' as const,
    confidence: 91,
    impact: 'medium' as const,
  },
  {
    title: 'Funding Gap Analysis',
    insight: 'Projected ₹78 Cr shortfall in next 30 days can be covered by accelerating 3 customer collections or drawing ₹50 Cr from credit line.',
    type: 'alert' as const,
    confidence: 89,
    impact: 'high' as const,
  },
];

// Table Columns
const eventColumns: Column<CashEvent>[] = [
  { id: 'date', header: 'Date', accessor: 'date' },
  { id: 'event', header: 'Event', accessor: 'event' },
  {
    id: 'impact',
    header: 'Impact',
    accessor: (row) => `₹${Math.abs(row.impact / 10000000).toFixed(1)} Cr`,
    cell: (row) => (
      <span className={row.impact > 0 ? 'text-emerald-400' : 'text-red-400'}>
        {row.impact > 0 ? '+' : '-'}₹{Math.abs(row.impact / 10000000).toFixed(1)} Cr
      </span>
    ),
    align: 'right',
  },
  {
    id: 'priority',
    header: 'Priority',
    accessor: 'priority',
    cell: (row) => (
      <Badge variant={row.priority === 'critical' ? 'danger' : row.priority === 'high' ? 'warning' : 'secondary'}>
        {row.priority}
      </Badge>
    ),
  },
  { id: 'action', header: 'Action', accessor: 'action' },
];

const collectionColumns: Column<Collection>[] = [
  { id: 'customer', header: 'Customer', accessor: 'customer' },
  {
    id: 'amount',
    header: 'Amount',
    accessor: (row) => `₹${(row.amount / 10000000).toFixed(1)} Cr`,
    align: 'right',
  },
  { id: 'dueDate', header: 'Due Date', accessor: 'dueDate' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'on-track' ? 'success' : row.status === 'at-risk' ? 'warning' : 'danger'}>
        {row.status}
      </Badge>
    ),
  },
  {
    id: 'risk',
    header: 'Risk',
    accessor: 'risk',
    cell: (row) => (
      <Badge variant={row.risk === 'low' ? 'success' : row.risk === 'medium' ? 'warning' : 'danger'}>
        {row.risk}
      </Badge>
    ),
  },
];

const paymentColumns: Column<Payment>[] = [
  { id: 'vendor', header: 'Vendor', accessor: 'vendor' },
  {
    id: 'amount',
    header: 'Amount',
    accessor: (row) => `₹${(row.amount / 10000000).toFixed(1)} Cr`,
    align: 'right',
  },
  { id: 'dueDate', header: 'Due Date', accessor: 'dueDate' },
  {
    id: 'priority',
    header: 'Priority',
    accessor: 'priority',
    cell: (row) => (
      <Badge variant={row.priority === 'critical' ? 'danger' : row.priority === 'high' ? 'warning' : 'secondary'}>
        {row.priority}
      </Badge>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'approved' ? 'success' : row.status === 'processing' ? 'warning' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
];

const alertColumns: Column<CashAlert>[] = [
  { id: 'alert', header: 'Alert', accessor: 'alert' },
  {
    id: 'severity',
    header: 'Severity',
    accessor: 'severity',
    cell: (row) => (
      <Badge variant={row.severity === 'critical' ? 'danger' : row.severity === 'high' ? 'warning' : 'secondary'}>
        {row.severity}
      </Badge>
    ),
  },
  { id: 'impact', header: 'Impact', accessor: 'impact' },
  { id: 'recommendation', header: 'Recommendation', accessor: 'recommendation' },
];

const approvalColumns: Column<Approval>[] = [
  { id: 'item', header: 'Item', accessor: 'item' },
  {
    id: 'amount',
    header: 'Amount',
    accessor: (row) => `₹${(row.amount / 10000000).toFixed(1)} Cr`,
    align: 'right',
  },
  { id: 'requester', header: 'Requester', accessor: 'requester' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'urgent' ? 'danger' : 'warning'}>
        {row.status}
      </Badge>
    ),
  },
];

const fundingColumns: Column<FundingRequirement>[] = [
  { id: 'project', header: 'Project', accessor: 'project' },
  {
    id: 'amount',
    header: 'Amount',
    accessor: (row) => `₹${(row.amount / 10000000).toFixed(1)} Cr`,
    align: 'right',
  },
  { id: 'dueDate', header: 'Due Date', accessor: 'dueDate' },
  { id: 'source', header: 'Source', accessor: 'source' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'secured' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'}>
        {row.status}
      </Badge>
    ),
  },
];

export default function CashFlowDashboardPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader
        title="Cash Flow Dashboard"
        description="Real-time cash position, forecasts, and AI-powered insights"
        breadcrumbs={[
          { label: 'Cash Flow Intelligence', href: '/cash-flow' },
          { label: 'Dashboard' },
        ]}
        showAI
        showRefresh
        showExport
        showSavedViews
      />

      {/* Global Filters */}
      <div className="mb-6">
        <CashFlowFilters
          showCompany
          showProject
          showBank
          showDateRange
          compact
        />
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          {cashFlowDashboardTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Primary KPIs */}
          <Section>
            <KPIGrid columns={4}>
              <KPICard
                title="Available Cash"
                value={`₹${kpiData.availableCash.value} ${kpiData.availableCash.unit}`}
                subtitle={kpiData.availableCash.subtitle}
                change={kpiData.availableCash.change}
                trend={kpiData.availableCash.trend}
                icon={Wallet}
                iconColor="bg-blue-500/10 text-blue-400"
                sparkline={kpiData.availableCash.sparkline}
                size="lg"
              />
              <KPICard
                title="Net Liquidity"
                value={`₹${kpiData.netLiquidity.value} ${kpiData.netLiquidity.unit}`}
                subtitle={kpiData.netLiquidity.subtitle}
                change={kpiData.netLiquidity.change}
                trend={kpiData.netLiquidity.trend}
                icon={DollarSign}
                iconColor="bg-cyan-500/10 text-cyan-400"
                sparkline={kpiData.netLiquidity.sparkline}
              />
              <KPICard
                title="Cash Inflow (MTD)"
                value={`₹${kpiData.cashInflow.value} ${kpiData.cashInflow.unit}`}
                subtitle={kpiData.cashInflow.subtitle}
                change={kpiData.cashInflow.change}
                trend={kpiData.cashInflow.trend}
                icon={ArrowDownRight}
                iconColor="bg-emerald-500/10 text-emerald-400"
                sparkline={kpiData.cashInflow.sparkline}
              />
              <KPICard
                title="Cash Outflow (MTD)"
                value={`₹${kpiData.cashOutflow.value} ${kpiData.cashOutflow.unit}`}
                subtitle={kpiData.cashOutflow.subtitle}
                change={kpiData.cashOutflow.change}
                trend={kpiData.cashOutflow.trend}
                trendColor="green"
                icon={ArrowUpRight}
                iconColor="bg-red-500/10 text-red-400"
                sparkline={kpiData.cashOutflow.sparkline}
              />
            </KPIGrid>
          </Section>

          {/* Secondary KPIs */}
          <Section>
            <KPIGrid columns={5}>
              <KPICard
                title="Forecast Accuracy"
                value={`${kpiData.forecastAccuracy.value}${kpiData.forecastAccuracy.unit}`}
                subtitle={kpiData.forecastAccuracy.subtitle}
                change={kpiData.forecastAccuracy.change}
                trend={kpiData.forecastAccuracy.trend}
                icon={Target}
                size="sm"
              />
              <KPICard
                title="Cash Burn"
                value={`₹${kpiData.cashBurn.value} ${kpiData.cashBurn.unit}`}
                subtitle={kpiData.cashBurn.subtitle}
                change={kpiData.cashBurn.change}
                trend={kpiData.cashBurn.trend}
                trendColor="green"
                icon={TrendingDown}
                size="sm"
              />
              <KPICard
                title="Escrow Cash"
                value={`₹${kpiData.escrowCash.value} ${kpiData.escrowCash.unit}`}
                subtitle={kpiData.escrowCash.subtitle}
                icon={Shield}
                size="sm"
              />
              <KPICard
                title="Idle Cash"
                value={`₹${kpiData.idleCash.value} ${kpiData.idleCash.unit}`}
                subtitle={kpiData.idleCash.subtitle}
                change={kpiData.idleCash.change}
                trend={kpiData.idleCash.trend}
                icon={PiggyBank}
                size="sm"
                aiInsight="Optimization opportunity: ₹12.6L/month"
              />
              <KPICard
                title="Funding Gap"
                value={`₹${kpiData.fundingGap.value} ${kpiData.fundingGap.unit}`}
                subtitle={kpiData.fundingGap.subtitle}
                change={kpiData.fundingGap.change}
                trend={kpiData.fundingGap.trend}
                trendColor="green"
                icon={AlertTriangle}
                size="sm"
              />
            </KPIGrid>
          </Section>

          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            <LineChart
              data={cashPositionTrendData.slice(0, 14)}
              title="Cash Position Trend"
              subtitle="Last 14 days actual vs forecast"
              height={300}
              legend={[
                { label: 'Actual', color: '#3b82f6' },
                { label: 'Forecast', color: '#22d3ee' },
              ]}
              formatValue={(v) => `₹${v.toFixed(0)} Cr`}
            />
            <BarChart
              data={monthlyForecastData.slice(0, 6)}
              title="Monthly Inflow vs Outflow"
              subtitle="Current fiscal year"
              height={300}
              legend={[
                { label: 'Inflow', color: '#10b981' },
                { label: 'Outflow', color: '#f87171' },
              ]}
              formatValue={(v) => `₹${v} Cr`}
            />
          </div>

          {/* AI Insights Panel */}
          <AIInsightsPanel insights={aiInsights} title="AI Cash Flow Insights" />

          {/* Tables Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Section
              title="Critical Cash Events"
              description="Upcoming high-impact transactions"
              actions={
                <Button variant="outline" size="sm">View All</Button>
              }
            >
              <DataTable
                data={criticalEvents.slice(0, 5)}
                columns={eventColumns}
                hoverable
                compact
              />
            </Section>

            <Section
              title="Upcoming Collections"
              description="Expected customer payments"
              actions={
                <Button variant="outline" size="sm">View All</Button>
              }
            >
              <DataTable
                data={upcomingCollections.slice(0, 5)}
                columns={collectionColumns}
                hoverable
                compact
              />
            </Section>
          </div>

          {/* Payments & Approvals */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Section
              title="Upcoming Payments"
              description="Scheduled vendor payments"
              actions={
                <Badge variant="warning">{upcomingPayments.filter(p => p.priority === 'critical').length} Critical</Badge>
              }
            >
              <DataTable
                data={upcomingPayments.slice(0, 5)}
                columns={paymentColumns}
                hoverable
                compact
              />
            </Section>

            <Section
              title="Pending Approvals"
              description="Items requiring your action"
              actions={
                <Badge variant="danger">{pendingApprovals.filter(a => a.status === 'urgent').length} Urgent</Badge>
              }
            >
              <DataTable
                data={pendingApprovals}
                columns={approvalColumns}
                actions={[
                  { label: 'Approve', onClick: () => {} },
                  { label: 'Reject', onClick: () => {}, variant: 'danger' },
                ]}
                hoverable
                compact
              />
            </Section>
          </div>
        </TabsContent>

        {/* Forecast Tab */}
        <TabsContent value="forecast" className="mt-6 space-y-6">
          <Section>
            <KPIGrid columns={4}>
              <KPICard
                title="30-Day Forecast"
                value="₹2,680 Cr"
                subtitle="Projected closing balance"
                change={9.4}
                trend="up"
                icon={TrendingUp}
                iconColor="bg-blue-500/10 text-blue-400"
                size="lg"
              />
              <KPICard
                title="Forecast Accuracy"
                value="94.5%"
                subtitle="30-day rolling"
                change={2.1}
                trend="up"
                icon={Target}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
              <KPICard
                title="Confidence Level"
                value="High"
                subtitle="Based on historical patterns"
                icon={Shield}
                iconColor="bg-cyan-500/10 text-cyan-400"
              />
              <KPICard
                title="Variance"
                value="±₹45 Cr"
                subtitle="Expected range"
                icon={BarChart3}
                iconColor="bg-purple-500/10 text-purple-400"
              />
            </KPIGrid>
          </Section>

          <div className="grid gap-6 lg:grid-cols-2">
            <AreaChart
              data={dailyForecastData}
              title="30-Day Cash Forecast"
              subtitle="Daily projected cash position"
              height={350}
              formatValue={(v) => `₹${v.toFixed(0)} Cr`}
            />
            <BarChart
              data={weeklyForecastData}
              title="12-Week Rolling Forecast"
              subtitle="Weekly projections with confidence bands"
              height={350}
              legend={[
                { label: 'Optimistic', color: '#10b981' },
                { label: 'Base Case', color: '#3b82f6' },
              ]}
              formatValue={(v) => `₹${v} Cr`}
            />
          </div>
        </TabsContent>

        {/* Liquidity Tab */}
        <TabsContent value="liquidity" className="mt-6 space-y-6">
          <Section>
            <KPIGrid columns={4}>
              <KPICard
                title="Net Liquidity"
                value="₹1,890 Cr"
                subtitle="After committed obligations"
                change={5.2}
                trend="up"
                icon={DollarSign}
                iconColor="bg-cyan-500/10 text-cyan-400"
                size="lg"
              />
              <KPICard
                title="Liquidity Ratio"
                value="1.85x"
                subtitle="Current / Quick assets"
                change={0.12}
                trend="up"
                icon={BarChart3}
              />
              <KPICard
                title="Cash Buffer Days"
                value="45 days"
                subtitle="Operating expense coverage"
                change={5}
                trend="up"
                icon={CalendarDays}
              />
              <KPICard
                title="Undrawn Credit"
                value="₹500 Cr"
                subtitle="Available credit lines"
                icon={CreditCard}
              />
            </KPIGrid>
          </Section>

          <LineChart
            data={liquidityTrendData.slice(0, 30)}
            title="Liquidity Trend"
            subtitle="30-day liquidity position"
            height={350}
            formatValue={(v) => `₹${v.toFixed(0)} Cr`}
          />
        </TabsContent>

        {/* Risks Tab */}
        <TabsContent value="risks" className="mt-6 space-y-6">
          <Section>
            <KPIGrid columns={4}>
              <KPICard
                title="Risk Score"
                value="72/100"
                subtitle="Overall cash risk"
                change={-5}
                trend="down"
                trendColor="green"
                icon={AlertTriangle}
                iconColor="bg-yellow-500/10 text-yellow-400"
                size="lg"
              />
              <KPICard
                title="Liquidity Score"
                value="85/100"
                subtitle="Liquidity health"
                change={3}
                trend="up"
                icon={Shield}
              />
              <KPICard
                title="Collection Risk"
                value="₹65 Cr"
                subtitle="At-risk collections"
                change={12}
                trend="up"
                icon={Users}
              />
              <KPICard
                title="Funding Gap"
                value="₹78 Cr"
                subtitle="30-day shortfall"
                change={-12.5}
                trend="down"
                trendColor="green"
                icon={TrendingDown}
              />
            </KPIGrid>
          </Section>

          <Section
            title="Active Cash Alerts"
            description="Risk alerts requiring attention"
            actions={
              <Badge variant="danger">{cashAlerts.filter(a => a.severity === 'critical').length} Critical</Badge>
            }
          >
            <DataTable
              data={cashAlerts}
              columns={alertColumns}
              hoverable
            />
          </Section>
        </TabsContent>

        {/* Approvals Tab */}
        <TabsContent value="approvals" className="mt-6 space-y-6">
          <Section>
            <KPIGrid columns={4}>
              <KPICard
                title="Pending Approvals"
                value="5"
                subtitle="Awaiting your action"
                icon={Clock}
                iconColor="bg-yellow-500/10 text-yellow-400"
                size="lg"
              />
              <KPICard
                title="Total Value"
                value="₹235 Cr"
                subtitle="Pending approval value"
                icon={DollarSign}
              />
              <KPICard
                title="Urgent"
                value="2"
                subtitle="Requires immediate action"
                icon={AlertTriangle}
                iconColor="bg-red-500/10 text-red-400"
              />
              <KPICard
                title="Approved Today"
                value="8"
                subtitle="₹156 Cr processed"
                icon={CheckCircle2}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Pending Approvals"
            description="Items requiring your authorization"
          >
            <DataTable
              data={pendingApprovals}
              columns={approvalColumns}
              actions={[
                { label: 'Approve', onClick: () => {} },
                { label: 'Reject', onClick: () => {}, variant: 'danger' },
                { label: 'Hold', onClick: () => {}, variant: 'secondary' },
              ]}
              hoverable
            />
          </Section>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="mt-6 space-y-6">
          <AIInsightsPanel
            insights={aiInsights}
            title="AI-Powered Cash Flow Insights"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-slate-800 bg-slate-900/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Bot className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Ask AI CFO</h3>
                  <p className="text-sm text-slate-400">Get instant answers about your cash flow</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-left">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
                  Explain today's cash position
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
                  Predict cash shortage risks
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
                  Optimize idle cash
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
                  Recommend payment priorities
                </Button>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600">
                <Bot className="mr-2 h-4 w-4" />
                Open AI Agent
              </Button>
            </Card>

            <Section
              title="Funding Requirements"
              description="Upcoming project funding needs"
            >
              <DataTable
                data={fundingRequirements}
                columns={fundingColumns}
                hoverable
                compact
              />
            </Section>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions Bar */}
      <Card className="border-slate-800 bg-slate-900/50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="font-medium text-white">Quick Actions</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              <TrendingUp className="mr-2 h-4 w-4" />
              Generate Forecast
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Position
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
              <Building2 className="mr-2 h-4 w-4" />
              New Transfer
            </Button>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
