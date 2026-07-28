'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { LineChart } from '@/components/shared/charts/line-chart';
import { BarChart } from '@/components/shared/charts/bar-chart';
import { PieChart } from '@/components/shared/charts/pie-chart';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { AIInsightsPanel } from '@/components/shared/ai-insight-card';
import { TreasuryFilters } from '@/components/shared/treasury-filters';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Wallet,
  Building2,
  PiggyBank,
  CreditCard,
  ArrowLeftRight,
  Layers,
  AlertTriangle,
  Clock,
  DollarSign,
  Globe,
  Shield,
  Zap,
  BarChart3,
  RefreshCcw,
  Download,
  Bot,
  Sparkles,
  CheckCircle2,
  XCircle,
  Activity,
  Banknote,
  Currency,
} from 'lucide-react';
import { treasuryDashboardTabs } from '@/config/treasury-navigation';

// Mock KPI Data for Treasury Dashboard
const kpiData = {
  totalBankBalance: {
    value: '3,250',
    unit: 'Cr',
    change: 6.8,
    trend: 'up' as const,
    sparkline: [2900, 3000, 3100, 3150, 3200, 3220, 3250],
    subtitle: 'Across 68 bank accounts',
  },
  liquidityPosition: {
    value: '2,450',
    unit: 'Cr',
    change: 4.5,
    trend: 'up' as const,
    sparkline: [2200, 2280, 2350, 2380, 2420, 2440, 2450],
    subtitle: 'Available liquidity',
  },
  investedFunds: {
    value: '890',
    unit: 'Cr',
    change: 12.3,
    trend: 'up' as const,
    sparkline: [720, 750, 790, 820, 850, 870, 890],
    subtitle: 'FDs + Liquid Funds',
  },
  availableCredit: {
    value: '1,200',
    unit: 'Cr',
    change: 0,
    trend: 'neutral' as const,
    subtitle: 'Undrawn credit lines',
  },
  fxExposure: {
    value: '145',
    unit: 'Cr',
    change: -8.5,
    trend: 'down' as const,
    sparkline: [180, 175, 168, 160, 155, 150, 145],
    subtitle: 'Net FX exposure',
  },
  intercompanyPosition: {
    value: '320',
    unit: 'Cr',
    change: 5.2,
    trend: 'up' as const,
    subtitle: 'Net IC receivable',
  },
  cashPoolBalance: {
    value: '1,850',
    unit: 'Cr',
    change: 3.8,
    trend: 'up' as const,
    subtitle: 'Master pool balance',
  },
  treasuryRiskScore: {
    value: '78',
    unit: '/100',
    change: 4,
    trend: 'up' as const,
    subtitle: 'Low risk profile',
  },
};

// Mock Bank Distribution Data
const bankDistributionData = [
  { label: 'HDFC Bank', value: 850, color: '#3b82f6' },
  { label: 'SBI', value: 720, color: '#10b981' },
  { label: 'ICICI Bank', value: 580, color: '#f59e0b' },
  { label: 'Axis Bank', value: 420, color: '#8b5cf6' },
  { label: 'Kotak', value: 380, color: '#ec4899' },
  { label: 'Others', value: 300, color: '#6b7280' },
];

// Mock Liquidity Trend Data
const liquidityTrendData = Array.from({ length: 30 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: 2200 + Math.random() * 400 + i * 8,
  value2: 2100 + Math.random() * 350 + i * 6,
}));

// Mock Entity Cash Position Data
const entityPositionData = [
  { label: 'ZenBank Corp', value: 1250, color: '#3b82f6' },
  { label: 'ZenBank Infra SPV', value: 680, color: '#10b981' },
  { label: 'Metro Projects Ltd', value: 520, color: '#f59e0b' },
  { label: 'Highway Corp', value: 420, color: '#8b5cf6' },
  { label: 'Solar Energy SPV', value: 380, color: '#ec4899' },
];

// Mock Bank Account Summary
interface BankAccount {
  id: string;
  bank: string;
  accountNumber: string;
  accountType: string;
  currency: string;
  balance: number;
  availableBalance: number;
  status: 'active' | 'dormant' | 'restricted';
}

const bankAccounts: BankAccount[] = [
  { id: '1', bank: 'HDFC Bank', accountNumber: 'XXXX1234', accountType: 'Current', currency: 'INR', balance: 325000000, availableBalance: 320000000, status: 'active' },
  { id: '2', bank: 'SBI', accountNumber: 'XXXX5678', accountType: 'Current', currency: 'INR', balance: 280000000, availableBalance: 275000000, status: 'active' },
  { id: '3', bank: 'ICICI Bank', accountNumber: 'XXXX9012', accountType: 'Current', currency: 'INR', balance: 185000000, availableBalance: 185000000, status: 'active' },
  { id: '4', bank: 'Axis Bank', accountNumber: 'XXXX3456', accountType: 'Escrow', currency: 'INR', balance: 145000000, availableBalance: 0, status: 'restricted' },
  { id: '5', bank: 'Kotak Bank', accountNumber: 'XXXX7890', accountType: 'Current', currency: 'INR', balance: 95000000, availableBalance: 92000000, status: 'active' },
  { id: '6', bank: 'HDFC Bank', accountNumber: 'XXXX2345', accountType: 'Savings', currency: 'INR', balance: 45000000, availableBalance: 45000000, status: 'active' },
  { id: '7', bank: 'Standard Chartered', accountNumber: 'XXXX6789', accountType: 'FCNR', currency: 'USD', balance: 8500000, availableBalance: 8500000, status: 'active' },
  { id: '8', bank: 'Citi Bank', accountNumber: 'XXXX0123', accountType: 'Current', currency: 'EUR', balance: 2200000, availableBalance: 2200000, status: 'active' },
];

// Mock Recent Transactions
interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'credit' | 'debit';
  amount: number;
  bank: string;
  status: 'completed' | 'pending' | 'failed';
}

const recentTransactions: Transaction[] = [
  { id: '1', date: '2024-07-15', description: 'Customer Collection - Tata Projects', type: 'credit', amount: 65000000, bank: 'HDFC Bank', status: 'completed' },
  { id: '2', date: '2024-07-15', description: 'Vendor Payment - L&T Construction', type: 'debit', amount: 45000000, bank: 'SBI', status: 'completed' },
  { id: '3', date: '2024-07-14', description: 'Intercompany Transfer', type: 'credit', amount: 25000000, bank: 'ICICI Bank', status: 'completed' },
  { id: '4', date: '2024-07-14', description: 'Loan Repayment - SBI Term Loan', type: 'debit', amount: 18000000, bank: 'SBI', status: 'completed' },
  { id: '5', date: '2024-07-14', description: 'FD Maturity', type: 'credit', amount: 105000000, bank: 'HDFC Bank', status: 'completed' },
  { id: '6', date: '2024-07-13', description: 'Payroll Processing', type: 'debit', amount: 85000000, bank: 'HDFC Bank', status: 'completed' },
  { id: '7', date: '2024-07-13', description: 'GST Payment', type: 'debit', amount: 32000000, bank: 'SBI', status: 'completed' },
  { id: '8', date: '2024-07-12', description: 'Customer Advance - DLF', type: 'credit', amount: 42000000, bank: 'Axis Bank', status: 'completed' },
];

// Mock Pending Approvals
interface Approval {
  id: string;
  item: string;
  type: string;
  amount: number;
  requester: string;
  status: 'pending' | 'urgent';
  submittedAt: string;
}

const pendingApprovals: Approval[] = [
  { id: '1', item: 'Intercompany Loan - Metro SPV', type: 'IC Loan', amount: 50000000, requester: 'Finance Team', status: 'urgent', submittedAt: '2 hours ago' },
  { id: '2', item: 'FD Placement - HDFC Bank', type: 'Investment', amount: 100000000, requester: 'Treasury Team', status: 'pending', submittedAt: '4 hours ago' },
  { id: '3', item: 'Bank Account Opening - Yes Bank', type: 'Account', amount: 0, requester: 'Operations', status: 'pending', submittedAt: '1 day ago' },
  { id: '4', item: 'Signatory Change - SBI Account', type: 'Mandate', amount: 0, requester: 'Compliance', status: 'pending', submittedAt: '2 days ago' },
  { id: '5', item: 'Credit Line Enhancement - ICICI', type: 'Facility', amount: 200000000, requester: 'Treasury Head', status: 'urgent', submittedAt: '3 days ago' },
];

// Mock Treasury Alerts
interface TreasuryAlert {
  id: string;
  alert: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  recommendation: string;
}

const treasuryAlerts: TreasuryAlert[] = [
  { id: '1', alert: 'Idle cash of ₹125 Cr in current accounts', severity: 'high', category: 'Optimization', recommendation: 'Transfer to overnight fund or place FD' },
  { id: '2', alert: 'Bank facility renewal due in 15 days', severity: 'medium', category: 'Facility', recommendation: 'Initiate renewal process with SBI' },
  { id: '3', alert: 'Counterparty exposure limit breached', severity: 'critical', category: 'Risk', recommendation: 'Diversify investments across more banks' },
  { id: '4', alert: 'Unhedged FX exposure increased to $1.5M', severity: 'high', category: 'FX Risk', recommendation: 'Consider forward contract for hedging' },
  { id: '5', alert: 'Bank reconciliation pending for 3 accounts', severity: 'low', category: 'Operations', recommendation: 'Complete reconciliation before month-end' },
];

// AI Insights for Treasury
const aiInsights = [
  {
    title: 'Liquidity Optimization',
    insight: 'Move ₹125 Cr from current accounts to overnight mutual fund. Projected additional yield: ₹4.2L per day at current NAV.',
    type: 'opportunity' as const,
    confidence: 94,
    impact: 'high' as const,
    impactValue: '+₹12.6L/month',
  },
  {
    title: 'Counterparty Concentration',
    insight: '45% of deposits concentrated in HDFC Bank. Recommend diversifying to maintain under 30% per counterparty.',
    type: 'warning' as const,
    confidence: 91,
    impact: 'high' as const,
  },
  {
    title: 'Cash Pooling Efficiency',
    insight: 'Implement zero-balance arrangement for 5 subsidiary accounts to reduce idle balances by ₹35 Cr.',
    type: 'recommendation' as const,
    confidence: 88,
    impact: 'medium' as const,
  },
  {
    title: 'FX Hedging Strategy',
    insight: 'Current USD exposure of $1.5M unhedged. With INR volatility, recommend 60% forward cover for 3-month horizon.',
    type: 'warning' as const,
    confidence: 85,
    impact: 'medium' as const,
  },
];

// Table Columns
const bankAccountColumns: Column<BankAccount>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'accountNumber', header: 'Account', accessor: 'accountNumber' },
  { id: 'accountType', header: 'Type', accessor: 'accountType' },
  { id: 'currency', header: 'CCY', accessor: 'currency' },
  {
    id: 'balance',
    header: 'Balance',
    accessor: (row) => row.currency === 'INR' ? `₹${(row.balance / 10000000).toFixed(1)} Cr` : `${row.currency} ${(row.balance / 1000000).toFixed(2)}M`,
    align: 'right',
  },
  {
    id: 'availableBalance',
    header: 'Available',
    accessor: (row) => row.currency === 'INR' ? `₹${(row.availableBalance / 10000000).toFixed(1)} Cr` : `${row.currency} ${(row.availableBalance / 1000000).toFixed(2)}M`,
    align: 'right',
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : row.status === 'restricted' ? 'warning' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
];

const transactionColumns: Column<Transaction>[] = [
  { id: 'date', header: 'Date', accessor: 'date' },
  { id: 'description', header: 'Description', accessor: 'description' },
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  {
    id: 'amount',
    header: 'Amount',
    accessor: (row) => `₹${(row.amount / 10000000).toFixed(1)} Cr`,
    cell: (row) => (
      <span className={row.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}>
        {row.type === 'credit' ? '+' : '-'}₹{(row.amount / 10000000).toFixed(1)} Cr
      </span>
    ),
    align: 'right',
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'completed' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'}>
        {row.status}
      </Badge>
    ),
  },
];

const approvalColumns: Column<Approval>[] = [
  { id: 'item', header: 'Item', accessor: 'item' },
  { id: 'type', header: 'Type', accessor: 'type' },
  {
    id: 'amount',
    header: 'Amount',
    accessor: (row) => row.amount > 0 ? `₹${(row.amount / 10000000).toFixed(1)} Cr` : '-',
    align: 'right',
  },
  { id: 'requester', header: 'Requester', accessor: 'requester' },
  { id: 'submittedAt', header: 'Submitted', accessor: 'submittedAt' },
  {
    id: 'status',
    header: 'Priority',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'urgent' ? 'danger' : 'warning'}>
        {row.status}
      </Badge>
    ),
  },
];

const alertColumns: Column<TreasuryAlert>[] = [
  { id: 'alert', header: 'Alert', accessor: 'alert' },
  { id: 'category', header: 'Category', accessor: 'category' },
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
  { id: 'recommendation', header: 'Recommendation', accessor: 'recommendation' },
];

export default function TreasuryDashboardPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <PageContainer>
      <PageHeader
        title="Treasury Dashboard"
        description="Real-time treasury operations, bank positions, and AI-powered insights"
        breadcrumbs={[
          { label: 'Treasury Management', href: '/treasury' },
          { label: 'Dashboard' },
        ]}
        showAI
        showRefresh
        showExport
        showSavedViews
      />

      <div className="mb-6">
        <TreasuryFilters
          showCompany
          showBank
          showCurrency
          showDateRange
          compact
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          {treasuryDashboardTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Section>
            <KPIGrid columns={4}>
              <KPICard
                title="Total Bank Balance"
                value={`₹${kpiData.totalBankBalance.value} ${kpiData.totalBankBalance.unit}`}
                subtitle={kpiData.totalBankBalance.subtitle}
                change={kpiData.totalBankBalance.change}
                trend={kpiData.totalBankBalance.trend}
                icon={Wallet}
                iconColor="bg-blue-500/10 text-blue-400"
                sparkline={kpiData.totalBankBalance.sparkline}
                size="lg"
              />
              <KPICard
                title="Liquidity Position"
                value={`₹${kpiData.liquidityPosition.value} ${kpiData.liquidityPosition.unit}`}
                subtitle={kpiData.liquidityPosition.subtitle}
                change={kpiData.liquidityPosition.change}
                trend={kpiData.liquidityPosition.trend}
                icon={DollarSign}
                iconColor="bg-cyan-500/10 text-cyan-400"
                sparkline={kpiData.liquidityPosition.sparkline}
              />
              <KPICard
                title="Invested Funds"
                value={`₹${kpiData.investedFunds.value} ${kpiData.investedFunds.unit}`}
                subtitle={kpiData.investedFunds.subtitle}
                change={kpiData.investedFunds.change}
                trend={kpiData.investedFunds.trend}
                icon={PiggyBank}
                iconColor="bg-emerald-500/10 text-emerald-400"
                sparkline={kpiData.investedFunds.sparkline}
              />
              <KPICard
                title="Available Credit"
                value={`₹${kpiData.availableCredit.value} ${kpiData.availableCredit.unit}`}
                subtitle={kpiData.availableCredit.subtitle}
                icon={CreditCard}
                iconColor="bg-purple-500/10 text-purple-400"
              />
            </KPIGrid>
          </Section>

          <Section>
            <KPIGrid columns={4}>
              <KPICard
                title="FX Exposure"
                value={`₹${kpiData.fxExposure.value} ${kpiData.fxExposure.unit}`}
                subtitle={kpiData.fxExposure.subtitle}
                change={kpiData.fxExposure.change}
                trend={kpiData.fxExposure.trend}
                trendColor="green"
                icon={Currency}
                size="sm"
              />
              <KPICard
                title="Intercompany Position"
                value={`₹${kpiData.intercompanyPosition.value} ${kpiData.intercompanyPosition.unit}`}
                subtitle={kpiData.intercompanyPosition.subtitle}
                change={kpiData.intercompanyPosition.change}
                trend={kpiData.intercompanyPosition.trend}
                icon={ArrowLeftRight}
                size="sm"
              />
              <KPICard
                title="Cash Pool Balance"
                value={`₹${kpiData.cashPoolBalance.value} ${kpiData.cashPoolBalance.unit}`}
                subtitle={kpiData.cashPoolBalance.subtitle}
                change={kpiData.cashPoolBalance.change}
                trend={kpiData.cashPoolBalance.trend}
                icon={Layers}
                size="sm"
              />
              <KPICard
                title="Treasury Risk Score"
                value={`${kpiData.treasuryRiskScore.value}${kpiData.treasuryRiskScore.unit}`}
                subtitle={kpiData.treasuryRiskScore.subtitle}
                change={kpiData.treasuryRiskScore.change}
                trend={kpiData.treasuryRiskScore.trend}
                icon={Shield}
                iconColor="bg-emerald-500/10 text-emerald-400"
                size="sm"
              />
            </KPIGrid>
          </Section>

          <div className="grid gap-6 lg:grid-cols-2">
            <LineChart
              data={liquidityTrendData.slice(0, 14)}
              title="Liquidity Trend"
              subtitle="Last 14 days cash position"
              height={300}
              legend={[
                { label: 'Actual', color: '#3b82f6' },
                { label: 'Forecast', color: '#22d3ee' },
              ]}
              formatValue={(v) => `₹${v.toFixed(0)} Cr`}
            />
            <PieChart
              data={bankDistributionData}
              title="Bank Balance Distribution"
              subtitle="Balance by banking partner"
              // height={300}
              formatValue={(v) => `₹${v} Cr`}
            />
          </div>

          <AIInsightsPanel insights={aiInsights} title="AI Treasury Insights" />

          <div className="grid gap-6 lg:grid-cols-2">
            <Section
              title="Bank Account Summary"
              description="Top accounts by balance"
              actions={
                <Button variant="outline" size="sm">View All</Button>
              }
            >
              <DataTable
                data={bankAccounts.slice(0, 5)}
                columns={bankAccountColumns}
                hoverable
                compact
              />
            </Section>

            <Section
              title="Recent Transactions"
              description="Last 24 hours activity"
              actions={
                <Button variant="outline" size="sm">View All</Button>
              }
            >
              <DataTable
                data={recentTransactions.slice(0, 5)}
                columns={transactionColumns}
                hoverable
                compact
              />
            </Section>
          </div>
        </TabsContent>

        <TabsContent value="liquidity" className="mt-6 space-y-6">
          <Section>
            <KPIGrid columns={4}>
              <KPICard
                title="Net Liquidity"
                value="₹2,450 Cr"
                subtitle="After committed obligations"
                change={4.5}
                trend="up"
                icon={DollarSign}
                iconColor="bg-cyan-500/10 text-cyan-400"
                size="lg"
              />
              <KPICard
                title="Liquidity Ratio"
                value="1.95x"
                subtitle="Current / Quick assets"
                change={0.15}
                trend="up"
                icon={BarChart3}
              />
              <KPICard
                title="Cash Buffer Days"
                value="52 days"
                subtitle="Operating expense coverage"
                change={7}
                trend="up"
                icon={Clock}
              />
              <KPICard
                title="Undrawn Credit"
                value="₹1,200 Cr"
                subtitle="Available credit lines"
                icon={CreditCard}
              />
            </KPIGrid>
          </Section>

          <LineChart
            data={liquidityTrendData}
            title="30-Day Liquidity Trend"
            subtitle="Daily liquidity position"
            height={350}
            formatValue={(v) => `₹${v.toFixed(0)} Cr`}
          />

          <PieChart
            data={entityPositionData}
            title="Liquidity by Entity"
            subtitle="Cash position distribution"
            // height={300}
            formatValue={(v) => `₹${v} Cr`}
          />
        </TabsContent>

        <TabsContent value="positions" className="mt-6 space-y-6">
          <Section>
            <KPIGrid columns={4}>
              <KPICard
                title="Total Position"
                value="₹3,250 Cr"
                subtitle="All bank accounts"
                change={6.8}
                trend="up"
                icon={Wallet}
                iconColor="bg-blue-500/10 text-blue-400"
                size="lg"
              />
              <KPICard
                title="INR Position"
                value="₹3,085 Cr"
                subtitle="94.9% of total"
                change={5.2}
                trend="up"
                icon={Banknote}
              />
              <KPICard
                title="USD Position"
                value="$10.2M"
                subtitle="~₹85 Cr equivalent"
                change={12.5}
                trend="up"
                icon={DollarSign}
              />
              <KPICard
                title="EUR Position"
                value="€2.5M"
                subtitle="~₹23 Cr equivalent"
                change={-3.2}
                trend="down"
                icon={Globe}
              />
            </KPIGrid>
          </Section>

          <Section
            title="Bank Account Positions"
            description="All active accounts"
            actions={
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
            }
          >
            <DataTable
              data={bankAccounts}
              columns={bankAccountColumns}
              hoverable
              searchable
              searchPlaceholder="Search accounts..."
            />
          </Section>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6 space-y-6">
          <Section>
            <KPIGrid columns={4}>
              <KPICard
                title="Active Alerts"
                value="5"
                subtitle="Requiring attention"
                icon={AlertTriangle}
                iconColor="bg-yellow-500/10 text-yellow-400"
                size="lg"
              />
              <KPICard
                title="Critical"
                value="1"
                subtitle="Immediate action"
                icon={XCircle}
                iconColor="bg-red-500/10 text-red-400"
              />
              <KPICard
                title="High Priority"
                value="2"
                subtitle="Today's deadline"
                icon={AlertTriangle}
                iconColor="bg-orange-500/10 text-orange-400"
              />
              <KPICard
                title="Resolved Today"
                value="8"
                subtitle="Successfully addressed"
                icon={CheckCircle2}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Treasury Alerts"
            description="Active alerts and recommendations"
            actions={
              <Badge variant="danger">{treasuryAlerts.filter(a => a.severity === 'critical').length} Critical</Badge>
            }
          >
            <DataTable
              data={treasuryAlerts}
              columns={alertColumns}
              hoverable
              actions={[
                { label: 'Acknowledge', onClick: () => {} },
                { label: 'Dismiss', onClick: () => {}, variant: 'danger' },
              ]}
            />
          </Section>
        </TabsContent>

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
                value="₹350 Cr"
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
                value="12"
                subtitle="₹285 Cr processed"
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
                { label: 'Defer', onClick: () => {} },
              ]}
              hoverable
            />
          </Section>
        </TabsContent>

        <TabsContent value="insights" className="mt-6 space-y-6">
          <AIInsightsPanel
            insights={aiInsights}
            title="AI-Powered Treasury Insights"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-slate-800 bg-slate-900/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Bot className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Ask Treasury AI</h3>
                  <p className="text-sm text-slate-400">Get instant answers about treasury operations</p>
                </div>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-left">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
                  Optimize idle cash placement
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
                  Analyze counterparty exposure
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
                  Recommend FX hedging strategy
                </Button>
                <Button variant="outline" className="w-full justify-start text-left">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
                  Review bank fee efficiency
                </Button>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600">
                <Bot className="mr-2 h-4 w-4" />
                Open Treasury AI Agent
              </Button>
            </Card>

            <Section
              title="Recent AI Actions"
              description="Actions taken by Treasury AI"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Auto-invested ₹50 Cr in overnight fund</p>
                    <p className="text-xs text-slate-400">2 hours ago - Expected yield: ₹1.8L/day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
                    <Activity className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Detected anomaly in HDFC transaction</p>
                    <p className="text-xs text-slate-400">4 hours ago - Flagged for review</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Predicted liquidity shortfall on Day 15</p>
                    <p className="text-xs text-slate-400">Yesterday - Recommendation generated</p>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="border-slate-800 bg-slate-900/50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="font-medium text-white">Quick Actions</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              IC Transfer
            </Button>
            <Button variant="outline" size="sm">
              <PiggyBank className="mr-2 h-4 w-4" />
              Place FD
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Balances
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
              <Building2 className="mr-2 h-4 w-4" />
              New Transaction
            </Button>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
