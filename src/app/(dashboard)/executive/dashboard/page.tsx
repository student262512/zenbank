'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, DashboardGrid, Section } from '@/components/layout/dashboard-shell';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { LineChart } from '@/components/shared/charts/line-chart';
import { BarChart } from '@/components/shared/charts/bar-chart';
import { PieChart } from '@/components/shared/charts/pie-chart';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { AIInsightCard, AIInsightsPanel } from '@/components/shared/ai-insight-card';
import { HealthScoreCard } from '@/components/shared/health-score';
import { GlobalFilters } from '@/components/shared/global-filters';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TrendIndicator } from '@/components/shared/trend-indicator';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Building2,
  CreditCard,
  PiggyBank,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Percent,
  Target,
  Shield,
  Zap,
} from 'lucide-react';

// Mock data for KPIs
const kpiData = {
  totalCash: {
    value: '₹847.5 Cr',
    change: 12.4,
    trend: 'up' as const,
    sparkline: [650, 680, 720, 695, 750, 810, 847],
    subtitle: 'Across 45 bank accounts',
  },
  cashInflow: {
    value: '₹156.8 Cr',
    change: 8.2,
    trend: 'up' as const,
    sparkline: [120, 135, 142, 138, 150, 148, 156],
    subtitle: 'MTD collections',
  },
  cashOutflow: {
    value: '₹124.3 Cr',
    change: -5.6,
    trend: 'down' as const,
    sparkline: [140, 135, 128, 132, 126, 125, 124],
    subtitle: 'MTD payments',
  },
  netCashFlow: {
    value: '₹32.5 Cr',
    change: 45.2,
    trend: 'up' as const,
    subtitle: 'MTD surplus',
  },
  dso: {
    value: '42 days',
    change: -3,
    trend: 'down' as const,
    subtitle: 'Days Sales Outstanding',
  },
  dpo: {
    value: '38 days',
    change: 2,
    trend: 'up' as const,
    subtitle: 'Days Payables Outstanding',
  },
  workingCapital: {
    value: '₹245.6 Cr',
    change: 5.8,
    trend: 'up' as const,
    subtitle: 'Net working capital',
  },
  debtEquity: {
    value: '1.24x',
    change: -0.08,
    trend: 'down' as const,
    subtitle: 'Debt to equity ratio',
  },
};

// Mock cash flow forecast data
const cashFlowForecastData = [
  { label: 'Week 1', value: 847, value2: 820 },
  { label: 'Week 2', value: 892, value2: 865 },
  { label: 'Week 3', value: 856, value2: 840 },
  { label: 'Week 4', value: 923, value2: 895 },
  { label: 'Week 5', value: 978, value2: 945 },
  { label: 'Week 6', value: 1012, value2: 980 },
  { label: 'Week 7', value: 1045, value2: 1015 },
  { label: 'Week 8', value: 1089, value2: 1050 },
];

// Mock entity-wise distribution
const entityDistribution = [
  { label: 'Zenith Infrastructure', value: 425, color: '#3b82f6' },
  { label: 'Zenith Realty', value: 215, color: '#22d3ee' },
  { label: 'Zenith Energy SPV', value: 125, color: '#10b981' },
  { label: 'Zenith Roads', value: 82, color: '#f59e0b' },
];

// Mock bank-wise distribution
const bankDistribution = [
  { label: 'HDFC Bank', value: 35, color: '#3b82f6' },
  { label: 'ICICI Bank', value: 28, color: '#22d3ee' },
  { label: 'SBI', value: 18, color: '#10b981' },
  { label: 'Axis Bank', value: 12, color: '#f59e0b' },
  { label: 'Others', value: 7, color: '#6366f1' },
];

// Mock pending approvals
interface PendingApproval {
  id: string;
  type: string;
  description: string;
  amount: number;
  requestedBy: string;
  requestedDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'urgent';
}

const pendingApprovals: PendingApproval[] = [
  {
    id: '1',
    type: 'Payment',
    description: 'Vendor payment - L&T Construction',
    amount: 45000000,
    requestedBy: 'Rajesh Kumar',
    requestedDate: new Date(Date.now() - 1000 * 60 * 30),
    priority: 'high',
    status: 'urgent',
  },
  {
    id: '2',
    type: 'Transfer',
    description: 'Inter-company transfer to Zenith Energy',
    amount: 25000000,
    requestedBy: 'Priya Singh',
    requestedDate: new Date(Date.now() - 1000 * 60 * 60 * 2),
    priority: 'medium',
    status: 'pending',
  },
  {
    id: '3',
    type: 'Investment',
    description: 'FD renewal - HDFC Bank',
    amount: 100000000,
    requestedBy: 'Amit Patel',
    requestedDate: new Date(Date.now() - 1000 * 60 * 60 * 4),
    priority: 'high',
    status: 'pending',
  },
  {
    id: '4',
    type: 'Payment',
    description: 'Loan interest payment - SBI',
    amount: 12500000,
    requestedBy: 'System',
    requestedDate: new Date(Date.now() - 1000 * 60 * 60 * 6),
    priority: 'high',
    status: 'urgent',
  },
];

// Mock AI insights
const aiInsights = [
  {
    title: 'Cash Position Optimization',
    insight: 'Move ₹45 Cr from HDFC current account to overnight mutual fund. Projected additional yield: ₹2.3L per day.',
    type: 'opportunity' as const,
    confidence: 94,
    impact: 'high' as const,
    impactValue: '+₹8.4L/month',
  },
  {
    title: 'Payment Prioritization',
    insight: 'Recommend delaying 3 non-critical vendor payments by 5 days to optimize cash position during tight period.',
    type: 'recommendation' as const,
    confidence: 87,
    impact: 'medium' as const,
  },
  {
    title: 'Covenant Risk Alert',
    insight: 'DSCR approaching threshold (1.32x vs 1.25x minimum). Consider accelerating collections or deferring non-essential capex.',
    type: 'warning' as const,
    confidence: 91,
    impact: 'high' as const,
  },
];

// Table columns
const approvalColumns: Column<PendingApproval>[] = [
  {
    id: 'type',
    header: 'Type',
    accessor: 'type',
    cell: (row) => (
      <Badge variant="outline" className="font-normal">
        {row.type}
      </Badge>
    ),
  },
  {
    id: 'description',
    header: 'Description',
    accessor: 'description',
  },
  {
    id: 'amount',
    header: 'Amount',
    accessor: (row) => `₹${(row.amount / 10000000).toFixed(2)} Cr`,
    align: 'right',
  },
  {
    id: 'requestedBy',
    header: 'Requested By',
    accessor: 'requestedBy',
  },
  {
    id: 'priority',
    header: 'Priority',
    accessor: 'priority',
    cell: (row) => (
      <Badge
        variant={row.priority === 'high' ? 'danger' : row.priority === 'medium' ? 'warning' : 'secondary'}
      >
        {row.priority}
      </Badge>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) =>
      row.status === 'urgent' ? (
        <div className="flex items-center gap-1 text-red-400">
          <AlertTriangle className="h-4 w-4" />
          Urgent
        </div>
      ) : (
        <div className="flex items-center gap-1 text-yellow-400">
          <Clock className="h-4 w-4" />
          Pending
        </div>
      ),
  },
];

export default function ExecutiveDashboardPage() {
  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader
        title="Executive Dashboard"
        description="Real-time overview of your financial operations"
        breadcrumbs={[
          { label: 'Executive Intelligence', href: '/executive' },
          { label: 'Dashboard' },
        ]}
        showAI
        showRefresh
        showExport
        showSavedViews
      />

      {/* Global Filters */}
      <div className="mb-6">
        <GlobalFilters showEntity showProject showDateRange compact />
      </div>

      {/* Main KPIs */}
      <Section className="mb-6">
        <KPIGrid columns={4}>
          <KPICard
            title="Total Cash Position"
            value={kpiData.totalCash.value}
            subtitle={kpiData.totalCash.subtitle}
            change={kpiData.totalCash.change}
            trend={kpiData.totalCash.trend}
            icon={Wallet}
            iconColor="bg-blue-500/10 text-blue-400"
            sparkline={kpiData.totalCash.sparkline}
            size="lg"
          />
          <KPICard
            title="Cash Inflow (MTD)"
            value={kpiData.cashInflow.value}
            subtitle={kpiData.cashInflow.subtitle}
            change={kpiData.cashInflow.change}
            trend={kpiData.cashInflow.trend}
            icon={ArrowUpRight}
            iconColor="bg-emerald-500/10 text-emerald-400"
            sparkline={kpiData.cashInflow.sparkline}
          />
          <KPICard
            title="Cash Outflow (MTD)"
            value={kpiData.cashOutflow.value}
            subtitle={kpiData.cashOutflow.subtitle}
            change={kpiData.cashOutflow.change}
            trend={kpiData.cashOutflow.trend}
            trendColor="green"
            icon={ArrowDownRight}
            iconColor="bg-red-500/10 text-red-400"
            sparkline={kpiData.cashOutflow.sparkline}
          />
          <KPICard
            title="Net Cash Flow (MTD)"
            value={kpiData.netCashFlow.value}
            subtitle={kpiData.netCashFlow.subtitle}
            change={kpiData.netCashFlow.change}
            trend={kpiData.netCashFlow.trend}
            icon={TrendingUp}
            iconColor="bg-cyan-500/10 text-cyan-400"
          />
        </KPIGrid>
      </Section>

      {/* Secondary KPIs */}
      <Section className="mb-6">
        <KPIGrid columns={4}>
          <KPICard
            title="DSO"
            value={kpiData.dso.value}
            subtitle={kpiData.dso.subtitle}
            change={kpiData.dso.change}
            trend={kpiData.dso.trend}
            trendColor="green"
            icon={Clock}
            size="sm"
          />
          <KPICard
            title="DPO"
            value={kpiData.dpo.value}
            subtitle={kpiData.dpo.subtitle}
            change={kpiData.dpo.change}
            trend={kpiData.dpo.trend}
            icon={Clock}
            size="sm"
          />
          <KPICard
            title="Working Capital"
            value={kpiData.workingCapital.value}
            subtitle={kpiData.workingCapital.subtitle}
            change={kpiData.workingCapital.change}
            trend={kpiData.workingCapital.trend}
            icon={DollarSign}
            size="sm"
          />
          <KPICard
            title="Debt/Equity"
            value={kpiData.debtEquity.value}
            subtitle={kpiData.debtEquity.subtitle}
            change={kpiData.debtEquity.change}
            trend={kpiData.debtEquity.trend}
            trendColor="green"
            icon={Percent}
            size="sm"
          />
        </KPIGrid>
      </Section>

      {/* Charts Row */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <LineChart
          data={cashFlowForecastData}
          title="8-Week Cash Flow Forecast"
          subtitle="AI-powered projection based on historical patterns"
          height={300}
          legend={[
            { label: 'Projected', color: '#3b82f6' },
            { label: 'Conservative', color: '#22d3ee' },
          ]}
          formatValue={(v) => `₹${v} Cr`}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <PieChart
            data={entityDistribution}
            title="Cash by Entity"
            size={160}
            innerRadius={0.6}
            centerValue="₹847 Cr"
            centerLabel="Total"
            formatValue={(v) => `₹${v} Cr`}
          />
          <PieChart
            data={bankDistribution}
            title="Cash by Bank"
            size={160}
            innerRadius={0.6}
            showPercentages
          />
        </div>
      </div>

      {/* AI Insights & Health Score */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AIInsightsPanel insights={aiInsights} />
        </div>
        <HealthScoreCard
          title="Financial Health"
          score={78}
          trend={4}
          trendPeriod="vs last month"
          breakdown={[
            { label: 'Liquidity', value: 85 },
            { label: 'Cash Flow', value: 72 },
            { label: 'Debt Service', value: 68 },
            { label: 'Working Capital', value: 82 },
          ]}
        />
      </div>

      {/* Pending Approvals */}
      <Section
        title="Pending Approvals"
        description="Items requiring your attention"
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="danger">{pendingApprovals.filter((a) => a.status === 'urgent').length} Urgent</Badge>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        }
        className="mb-6"
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
              Run Forecast
            </Button>
            <Button variant="outline" size="sm">
              <Shield className="mr-2 h-4 w-4" />
              Check Covenants
            </Button>
            <Button variant="outline" size="sm">
              <Target className="mr-2 h-4 w-4" />
              Reconcile
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
