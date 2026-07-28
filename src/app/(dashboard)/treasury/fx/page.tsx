'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { LineChart } from '@/components/shared/charts/line-chart';
import { BarChart } from '@/components/shared/charts/bar-chart';
import { AreaChart } from '@/components/shared/charts/area-chart';
import { PieChart } from '@/components/shared/charts/pie-chart';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { AIInsightsPanel } from '@/components/shared/ai-insight-card';
import { TreasuryFilters } from '@/components/shared/treasury-filters';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Globe,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  DollarSign,
  ArrowLeftRight,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Shield,
  RefreshCcw,
  Download,
  Bot,
  Sparkles,
  BarChart3,
  Activity,
  CheckCircle2,
  AlertCircle,
  Plus,
  Calendar,
  Target,
  Scale,
  Banknote,
  CircleDollarSign,
} from 'lucide-react';

// Mock KPI Data
const kpiData = {
  netFXExposure: {
    value: '45',
    unit: 'M USD',
    change: -5.5,
    trend: 'down' as const,
    sparkline: [52, 50, 48, 47, 46, 45, 45],
    subtitle: 'Net unhedged exposure',
  },
  hedgedAmount: {
    value: '32',
    unit: 'M USD',
    change: 8.5,
    trend: 'up' as const,
    sparkline: [25, 27, 28, 29, 30, 31, 32],
    subtitle: 'Total hedged amount',
  },
  hedgeCoverage: {
    value: '71',
    unit: '%',
    change: 5,
    trend: 'up' as const,
    sparkline: [62, 64, 66, 68, 69, 70, 71],
    subtitle: 'Hedge ratio',
  },
  openContracts: {
    value: '18',
    unit: '',
    change: 2,
    trend: 'up' as const,
    subtitle: 'Active forward contracts',
  },
  fxRiskScore: {
    value: '35',
    unit: '/100',
    change: -10,
    trend: 'down' as const,
    sparkline: [52, 48, 45, 42, 38, 36, 35],
    subtitle: 'Lower is better',
  },
  mtmGainLoss: {
    value: '+4.5',
    unit: 'Cr',
    change: 25,
    trend: 'up' as const,
    sparkline: [2.5, 3.0, 3.2, 3.8, 4.0, 4.2, 4.5],
    subtitle: 'Mark-to-market',
  },
};

// Currency Exposure Data
const currencyExposureData = [
  { label: 'USD', value: 45, color: '#3b82f6' },
  { label: 'EUR', value: 18, color: '#10b981' },
  { label: 'GBP', value: 12, color: '#f59e0b' },
  { label: 'JPY', value: 8, color: '#8b5cf6' },
  { label: 'AED', value: 5, color: '#ec4899' },
];

// FX Rate Trend Data (90 days)
const fxRateTrendData = Array.from({ length: 90 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: 83 + Math.sin(i / 10) * 1.5 + Math.random() * 0.5,
}));

// Gain/Loss Trend Data (12 months)
const gainLossTrendData = [
  { label: 'Feb', value: -1.2 },
  { label: 'Mar', value: 0.8 },
  { label: 'Apr', value: 1.5 },
  { label: 'May', value: 2.2 },
  { label: 'Jun', value: 1.8 },
  { label: 'Jul', value: -0.5 },
  { label: 'Aug', value: 0.3 },
  { label: 'Sep', value: 1.8 },
  { label: 'Oct', value: 2.5 },
  { label: 'Nov', value: 3.2 },
  { label: 'Dec', value: 3.8 },
  { label: 'Jan', value: 4.5 },
];

// FX Exposure Table Data
interface FXExposureRecord {
  id: string;
  currencyPair: string;
  grossExposure: number;
  hedgedAmount: number;
  netExposure: number;
  hedgeInstrument: 'Forward' | 'Option' | 'Swap' | 'Natural' | 'None';
  settlementDate: string;
  spotRate: number;
  forwardRate: number;
  mtmValue: number;
  status: 'Hedged' | 'Partially Hedged' | 'Unhedged';
  riskLevel: 'Low' | 'Medium' | 'High';
}

const fxExposureTableData: FXExposureRecord[] = [
  { id: 'FX-001', currencyPair: 'USD/INR', grossExposure: 25, hedgedAmount: 20, netExposure: 5, hedgeInstrument: 'Forward', settlementDate: '2024-03-15', spotRate: 83.15, forwardRate: 83.85, mtmValue: 1.8, status: 'Hedged', riskLevel: 'Low' },
  { id: 'FX-002', currencyPair: 'USD/INR', grossExposure: 15, hedgedAmount: 10, netExposure: 5, hedgeInstrument: 'Forward', settlementDate: '2024-04-30', spotRate: 83.15, forwardRate: 84.10, mtmValue: 0.9, status: 'Partially Hedged', riskLevel: 'Medium' },
  { id: 'FX-003', currencyPair: 'USD/INR', grossExposure: 5, hedgedAmount: 2, netExposure: 3, hedgeInstrument: 'Option', settlementDate: '2024-02-28', spotRate: 83.15, forwardRate: 83.50, mtmValue: 0.3, status: 'Partially Hedged', riskLevel: 'Medium' },
  { id: 'FX-004', currencyPair: 'EUR/INR', grossExposure: 10, hedgedAmount: 8, netExposure: 2, hedgeInstrument: 'Forward', settlementDate: '2024-03-31', spotRate: 90.25, forwardRate: 91.05, mtmValue: 0.6, status: 'Hedged', riskLevel: 'Low' },
  { id: 'FX-005', currencyPair: 'EUR/INR', grossExposure: 8, hedgedAmount: 0, netExposure: 8, hedgeInstrument: 'None', settlementDate: '2024-05-15', spotRate: 90.25, forwardRate: 0, mtmValue: 0, status: 'Unhedged', riskLevel: 'High' },
  { id: 'FX-006', currencyPair: 'GBP/INR', grossExposure: 12, hedgedAmount: 10, netExposure: 2, hedgeInstrument: 'Forward', settlementDate: '2024-04-15', spotRate: 105.50, forwardRate: 106.20, mtmValue: 0.5, status: 'Hedged', riskLevel: 'Low' },
  { id: 'FX-007', currencyPair: 'JPY/INR', grossExposure: 8, hedgedAmount: 5, netExposure: 3, hedgeInstrument: 'Swap', settlementDate: '2024-06-30', spotRate: 0.56, forwardRate: 0.57, mtmValue: 0.2, status: 'Partially Hedged', riskLevel: 'Medium' },
  { id: 'FX-008', currencyPair: 'AED/INR', grossExposure: 5, hedgedAmount: 5, netExposure: 0, hedgeInstrument: 'Natural', settlementDate: '-', spotRate: 22.65, forwardRate: 0, mtmValue: 0, status: 'Hedged', riskLevel: 'Low' },
];

// Forward Contracts Data
interface ForwardContract {
  id: string;
  contractType: 'Buy' | 'Sell';
  currencyPair: string;
  notionalAmount: number;
  forwardRate: number;
  spotAtInception: number;
  currentSpot: number;
  tradeDate: string;
  settlementDate: string;
  counterparty: string;
  mtmValue: number;
  daysToSettlement: number;
  status: 'Active' | 'Settling' | 'Settled' | 'Cancelled';
}

const forwardContractsData: ForwardContract[] = [
  { id: 'FWD-001', contractType: 'Sell', currencyPair: 'USD/INR', notionalAmount: 5, forwardRate: 83.85, spotAtInception: 82.50, currentSpot: 83.15, tradeDate: '2023-12-15', settlementDate: '2024-03-15', counterparty: 'HDFC Bank', mtmValue: 0.35, daysToSettlement: 60, status: 'Active' },
  { id: 'FWD-002', contractType: 'Sell', currencyPair: 'USD/INR', notionalAmount: 8, forwardRate: 84.10, spotAtInception: 82.80, currentSpot: 83.15, tradeDate: '2023-11-30', settlementDate: '2024-04-30', counterparty: 'ICICI Bank', mtmValue: 0.72, daysToSettlement: 106, status: 'Active' },
  { id: 'FWD-003', contractType: 'Sell', currencyPair: 'USD/INR', notionalAmount: 7, forwardRate: 83.50, spotAtInception: 82.20, currentSpot: 83.15, tradeDate: '2024-01-05', settlementDate: '2024-02-28', counterparty: 'SBI', mtmValue: 0.25, daysToSettlement: 44, status: 'Active' },
  { id: 'FWD-004', contractType: 'Sell', currencyPair: 'EUR/INR', notionalAmount: 5, forwardRate: 91.05, spotAtInception: 89.80, currentSpot: 90.25, tradeDate: '2023-12-20', settlementDate: '2024-03-31', counterparty: 'Axis Bank', mtmValue: 0.38, daysToSettlement: 76, status: 'Active' },
  { id: 'FWD-005', contractType: 'Buy', currencyPair: 'GBP/INR', notionalAmount: 3, forwardRate: 106.20, spotAtInception: 104.50, currentSpot: 105.50, tradeDate: '2024-01-10', settlementDate: '2024-04-15', counterparty: 'HDFC Bank', mtmValue: -0.21, daysToSettlement: 91, status: 'Active' },
  { id: 'FWD-006', contractType: 'Sell', currencyPair: 'USD/INR', notionalAmount: 10, forwardRate: 82.50, spotAtInception: 81.50, currentSpot: 83.15, tradeDate: '2023-09-15', settlementDate: '2024-01-15', counterparty: 'ICICI Bank', mtmValue: 0, daysToSettlement: 0, status: 'Settled' },
];

// Settlement Schedule Data
interface SettlementRecord {
  id: string;
  contractId: string;
  currencyPair: string;
  type: 'Forward' | 'Option' | 'Spot';
  amount: number;
  rate: number;
  inrAmount: number;
  settlementDate: string;
  counterparty: string;
  status: 'Scheduled' | 'Processing' | 'Completed';
}

const settlementScheduleData: SettlementRecord[] = [
  { id: 'SET-001', contractId: 'FWD-003', currencyPair: 'USD/INR', type: 'Forward', amount: 7, rate: 83.50, inrAmount: 584.5, settlementDate: '2024-02-28', counterparty: 'SBI', status: 'Scheduled' },
  { id: 'SET-002', contractId: 'FWD-001', currencyPair: 'USD/INR', type: 'Forward', amount: 5, rate: 83.85, inrAmount: 419.25, settlementDate: '2024-03-15', counterparty: 'HDFC Bank', status: 'Scheduled' },
  { id: 'SET-003', contractId: 'FWD-004', currencyPair: 'EUR/INR', type: 'Forward', amount: 5, rate: 91.05, inrAmount: 455.25, settlementDate: '2024-03-31', counterparty: 'Axis Bank', status: 'Scheduled' },
  { id: 'SET-004', contractId: 'FWD-005', currencyPair: 'GBP/INR', type: 'Forward', amount: 3, rate: 106.20, inrAmount: 318.6, settlementDate: '2024-04-15', counterparty: 'HDFC Bank', status: 'Scheduled' },
  { id: 'SET-005', contractId: 'FWD-002', currencyPair: 'USD/INR', type: 'Forward', amount: 8, rate: 84.10, inrAmount: 672.8, settlementDate: '2024-04-30', counterparty: 'ICICI Bank', status: 'Scheduled' },
];

// AI Insights
const aiInsights = [
  {
    id: '1',
    type: 'recommendation' as const,
    title: 'Hedge EUR Exposure',
    insight: 'EUR/INR exposure of EUR 8M is currently unhedged. Given EUR strength forecast of 2-3% over next quarter, recommend hedging 60% via 3-month forwards at 91.50.',
    impact: 'high' as const,
    confidence: 85,
    category: 'Hedge Strategy',
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Forward Contract Settling',
    insight: 'FWD-003 (USD 7M) settling on Feb 28. Current MTM gain of INR 25 Lakhs. Ensure funds availability and consider rollover strategy.',
    impact: 'high' as const,
    confidence: 100,
    category: 'Settlement',
  },
  {
    id: '3',
    type: 'insight' as const,
    title: 'Optimal Hedge Timing',
    insight: 'USD/INR technical analysis suggests resistance at 83.50. Consider adding to USD hedge position if spot breaks above 83.30 for better forward rates.',
    impact: 'medium' as const,
    confidence: 72,
    category: 'Market Timing',
  },
  {
    id: '4',
    type: 'recommendation' as const,
    title: 'Natural Hedge Opportunity',
    insight: 'AED receivables of AED 5M can be naturally hedged against AED payables of AED 4.5M. Implement internal netting to reduce hedge costs.',
    impact: 'medium' as const,
    confidence: 90,
    category: 'Natural Hedging',
  },
];

// Exposure columns
const exposureColumns: Column<FXExposureRecord>[] = [
  { id: 'currencyPair', header: 'Currency Pair', accessor: 'currencyPair', sortable: true },
  {
    id: 'grossExposure',
    header: 'Gross Exposure',
    accessor: 'grossExposure',
    cell: (row) => <span className="font-mono">M {row.grossExposure}</span>,
    sortable: true,
  },
  {
    id: 'hedgedAmount',
    header: 'Hedged',
    accessor: 'hedgedAmount',
    cell: (row) => <span className="font-mono text-green-600">M {row.hedgedAmount}</span>,
  },
  {
    id: 'netExposure',
    header: 'Net Exposure',
    accessor: 'netExposure',
    cell: (row) => (
      <span className={`font-mono font-medium ${row.netExposure > 0 ? 'text-orange-600' : 'text-green-600'}`}>
        M {row.netExposure}
      </span>
    ),
    sortable: true,
  },
  {
    id: 'hedgeInstrument',
    header: 'Instrument',
    accessor: 'hedgeInstrument',
    cell: (row) => (
      <Badge variant={row.hedgeInstrument === 'None' ? 'danger' : 'outline'}>
        {row.hedgeInstrument}
      </Badge>
    ),
  },
  {
    id: 'spotRate',
    header: 'Spot Rate',
    accessor: 'spotRate',
    cell: (row) => <span className="font-mono">{row.spotRate.toFixed(2)}</span>,
  },
  {
    id: 'forwardRate',
    header: 'Forward Rate',
    accessor: 'forwardRate',
    cell: (row) => <span className="font-mono">{row.forwardRate > 0 ? row.forwardRate.toFixed(2) : '-'}</span>,
  },
  {
    id: 'mtmValue',
    header: 'MTM (Cr)',
    accessor: 'mtmValue',
    cell: (row) => (
      <span className={`font-mono ${row.mtmValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {row.mtmValue > 0 ? '+' : ''}{row.mtmValue.toFixed(1)}
      </span>
    ),
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Hedged' ? 'default' : row.status === 'Partially Hedged' ? 'secondary' : 'danger'}>
        {row.status}
      </Badge>
    ),
  },
  {
    id: 'riskLevel',
    header: 'Risk',
    accessor: 'riskLevel',
    cell: (row) => (
      <Badge variant={row.riskLevel === 'Low' ? 'outline' : row.riskLevel === 'Medium' ? 'secondary' : 'danger'}>
        {row.riskLevel}
      </Badge>
    ),
  },
];

// Forward contract columns
const forwardColumns: Column<ForwardContract>[] = [
  { id: 'id', header: 'Contract ID', accessor: 'id' },
  {
    id: 'contractType',
    header: 'Type',
    accessor: 'contractType',
    cell: (row) => (
      <Badge variant={row.contractType === 'Sell' ? 'default' : 'secondary'}>
        {row.contractType === 'Sell' ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
        {row.contractType}
      </Badge>
    ),
  },
  { id: 'currencyPair', header: 'Currency', accessor: 'currencyPair', sortable: true },
  {
    id: 'notionalAmount',
    header: 'Amount',
    accessor: 'notionalAmount',
    cell: (row) => <span className="font-mono font-medium">M {row.notionalAmount}</span>,
    sortable: true,
  },
  {
    id: 'forwardRate',
    header: 'Forward Rate',
    accessor: 'forwardRate',
    cell: (row) => <span className="font-mono">{row.forwardRate.toFixed(2)}</span>,
  },
  {
    id: 'currentSpot',
    header: 'Current Spot',
    accessor: 'currentSpot',
    cell: (row) => <span className="font-mono">{row.currentSpot.toFixed(2)}</span>,
  },
  { id: 'settlementDate', header: 'Settlement', accessor: 'settlementDate', sortable: true },
  { id: 'counterparty', header: 'Counterparty', accessor: 'counterparty' },
  {
    id: 'mtmValue',
    header: 'MTM (Cr)',
    accessor: 'mtmValue',
    cell: (row) => (
      <span className={`font-mono font-medium ${row.mtmValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {row.mtmValue > 0 ? '+' : ''}{row.mtmValue.toFixed(2)}
      </span>
    ),
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Active' ? 'default' : row.status === 'Settled' ? 'outline' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
];

// Settlement columns
const settlementColumns: Column<SettlementRecord>[] = [
  { id: 'contractId', header: 'Contract', accessor: 'contractId' },
  { id: 'currencyPair', header: 'Currency', accessor: 'currencyPair', sortable: true },
  { id: 'type', header: 'Type', accessor: 'type' },
  {
    id: 'amount',
    header: 'FCY Amount',
    accessor: 'amount',
    cell: (row) => <span className="font-mono">M {row.amount}</span>,
    sortable: true,
  },
  {
    id: 'rate',
    header: 'Rate',
    accessor: 'rate',
    cell: (row) => <span className="font-mono">{row.rate.toFixed(2)}</span>,
  },
  {
    id: 'inrAmount',
    header: 'INR Amount (Cr)',
    accessor: 'inrAmount',
    cell: (row) => <span className="font-mono font-medium">₹{(row.inrAmount / 100).toFixed(2)}</span>,
  },
  { id: 'settlementDate', header: 'Settlement Date', accessor: 'settlementDate', sortable: true },
  { id: 'counterparty', header: 'Counterparty', accessor: 'counterparty' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Completed' ? 'default' : row.status === 'Processing' ? 'secondary' : 'outline'}>
        {row.status}
      </Badge>
    ),
  },
];

export default function FXManagementPage() {
  const [activeTab, setActiveTab] = React.useState('exposure');

  return (
    <PageContainer>
      <PageHeader
        title="FX Management"
        description="Manage foreign exchange exposure, hedging, and settlements"
        breadcrumbs={[
          { label: 'Treasury', href: '/treasury' },
          { label: 'FX Management', href: '/treasury/fx' },
        ]}
        actions={[
          {
            label: 'New Hedge',
            icon: Plus,
            onClick: () => {},
            variant: 'default',
          },
          {
            label: 'Rate Alert',
            icon: AlertTriangle,
            onClick: () => {},
            variant: 'outline',
          },
          {
            label: 'Export',
            icon: Download,
            onClick: () => {},
            variant: 'outline',
          },
        ]}
      />

      <TreasuryFilters compact />

      {/* KPI Cards */}
      <KPIGrid columns={6}>
        <KPICard
          title="Net FX Exposure"
          value={kpiData.netFXExposure.value}
          changeUnit={kpiData.netFXExposure.unit}
          change={kpiData.netFXExposure.change}
          trend={kpiData.netFXExposure.trend}
          icon={Globe}
          sparkline={kpiData.netFXExposure.sparkline}
          subtitle={kpiData.netFXExposure.subtitle}
        />
        <KPICard
          title="Hedged Amount"
          value={kpiData.hedgedAmount.value}
          changeUnit={kpiData.hedgedAmount.unit}
          change={kpiData.hedgedAmount.change}
          trend={kpiData.hedgedAmount.trend}
          icon={Shield}
          sparkline={kpiData.hedgedAmount.sparkline}
          subtitle={kpiData.hedgedAmount.subtitle}
        />
        <KPICard
          title="Hedge Coverage"
          value={kpiData.hedgeCoverage.value}
          changeUnit={kpiData.hedgeCoverage.unit}
          change={kpiData.hedgeCoverage.change}
          trend={kpiData.hedgeCoverage.trend}
          icon={Target}
          sparkline={kpiData.hedgeCoverage.sparkline}
          subtitle={kpiData.hedgeCoverage.subtitle}
        />
        <KPICard
          title="Open Contracts"
          value={kpiData.openContracts.value}
          changeUnit={kpiData.openContracts.unit}
          change={kpiData.openContracts.change}
          trend={kpiData.openContracts.trend}
          icon={ArrowLeftRight}
          subtitle={kpiData.openContracts.subtitle}
        />
        <KPICard
          title="FX Risk Score"
          value={kpiData.fxRiskScore.value}
          changeUnit={kpiData.fxRiskScore.unit}
          change={kpiData.fxRiskScore.change}
          trend={kpiData.fxRiskScore.trend}
          icon={AlertTriangle}
          sparkline={kpiData.fxRiskScore.sparkline}
          subtitle={kpiData.fxRiskScore.subtitle}
        />
        <KPICard
          title="MTM Gain/Loss"
          value={kpiData.mtmGainLoss.value}
          changeUnit={kpiData.mtmGainLoss.unit}
          change={kpiData.mtmGainLoss.change}
          trend={kpiData.mtmGainLoss.trend}
          icon={TrendingUp}
          sparkline={kpiData.mtmGainLoss.sparkline}
          subtitle={kpiData.mtmGainLoss.subtitle}
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="exposure">Exposure</TabsTrigger>
          <TabsTrigger value="forwards">Forward Contracts</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <TabsTrigger value="natural">Natural Hedging</TabsTrigger>
          <TabsTrigger value="settlements">Settlements</TabsTrigger>
          <TabsTrigger value="analytics">Gains/Losses</TabsTrigger>
        </TabsList>

        {/* Exposure Tab */}
        <TabsContent value="exposure" className="space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {/* <PieChart className="h-5 w-5 text-muted-foreground" /> */}
                  Exposure by Currency
                </CardTitle>
                <CardDescription>Net exposure distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={currencyExposureData}
                  // height={250}
                  showLegend
                  // showTooltip
                />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  USD/INR Rate Trend
                </CardTitle>
                <CardDescription>90-day spot rate movement</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={fxRateTrendData}
                  height={250}
                  showGrid
                  showTooltip
                  // color="#3b82f6"
                />
              </CardContent>
            </Card>
          </div>

          {/* Exposure Table */}
          <Section title="FX Exposure" description="Currency-wise exposure and hedge status">
            <DataTable
              data={fxExposureTableData}
              columns={exposureColumns}
              searchable
              searchPlaceholder="Search exposures..."
              // pageSize={10}
            />
          </Section>

          {/* AI Insights */}
          <AIInsightsPanel
            title="FX Risk Insights"
            insights={aiInsights}
          />
        </TabsContent>

        {/* Forward Contracts Tab */}
        <TabsContent value="forwards" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Active Forwards</div>
              <div className="text-2xl font-bold">12</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Total Notional</div>
              <div className="text-2xl font-bold">M 45</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Net MTM</div>
              <div className="text-2xl font-bold text-green-600">+₹4.2 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Settling (30d)</div>
              <div className="text-2xl font-bold">3</div>
            </Card>
          </div>

          {/* New Forward Form */}
          <Card>
            <CardHeader>
              <CardTitle>Book Forward Contract</CardTitle>
              <CardDescription>Create a new FX forward contract</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label>Contract Type</Label>
                  <Select defaultValue="sell">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sell">Sell</SelectItem>
                      <SelectItem value="buy">Buy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Currency Pair</Label>
                  <Select defaultValue="usdinr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usdinr">USD/INR</SelectItem>
                      <SelectItem value="eurinr">EUR/INR</SelectItem>
                      <SelectItem value="gbpinr">GBP/INR</SelectItem>
                      <SelectItem value="jpyinr">JPY/INR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Notional Amount (M)</Label>
                  <Input type="number" placeholder="5" />
                </div>
                <div>
                  <Label>Forward Rate</Label>
                  <Input type="number" step="0.01" placeholder="83.85" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <Label>Settlement Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Counterparty</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="sbi">SBI</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Purpose</Label>
                  <Input placeholder="Export receivable hedge" />
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Book Forward
                </Button>
              </div>
            </CardContent>
          </Card>

          <Section title="Forward Contracts" description="Active and settled forward contracts">
            <DataTable
              data={forwardContractsData}
              columns={forwardColumns}
              searchable
              // pageSize={10}
            />
          </Section>
        </TabsContent>

        {/* Options Tab */}
        <TabsContent value="options" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>FX Options</CardTitle>
              <CardDescription>Currency options for flexible hedging</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Active Options</div>
                  <div className="text-2xl font-bold">3</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Total Premium Paid</div>
                  <div className="text-2xl font-bold">₹45 Lakhs</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Notional Covered</div>
                  <div className="text-2xl font-bold">M 8</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Intrinsic Value</div>
                  <div className="text-2xl font-bold text-green-600">₹32 Lakhs</div>
                </Card>
              </div>
              <p className="text-muted-foreground text-center py-8">
                Options portfolio details would be displayed here with strike prices, expiry dates, and current valuations.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Natural Hedging Tab */}
        <TabsContent value="natural" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Natural Hedging Opportunities</CardTitle>
              <CardDescription>Match FCY receivables with payables to reduce hedge costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <Card className="p-4 border-green-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium">USD Netting</div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Receivables</span>
                      <span>M 25</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payables</span>
                      <span>M 18</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Net Exposure</span>
                      <span className="text-orange-600">M 7</span>
                    </div>
                    <Progress value={72} className="h-2" />
                    <div className="text-xs text-muted-foreground">72% naturally hedged</div>
                  </div>
                </Card>
                <Card className="p-4 border-green-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium">EUR Netting</div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Receivables</span>
                      <span>M 10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payables</span>
                      <span>M 8</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Net Exposure</span>
                      <span className="text-orange-600">M 2</span>
                    </div>
                    <Progress value={80} className="h-2" />
                    <div className="text-xs text-muted-foreground">80% naturally hedged</div>
                  </div>
                </Card>
                <Card className="p-4 border-green-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium">AED Netting</div>
                    <Badge variant="outline">100% Matched</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Receivables</span>
                      <span>M 5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payables</span>
                      <span>M 5</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Net Exposure</span>
                      <span className="text-green-600">M 0</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="text-xs text-muted-foreground">100% naturally hedged</div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settlements Tab */}
        <TabsContent value="settlements" className="space-y-6">
          <Section title="Settlement Schedule" description="Upcoming and recent FX settlements">
            <DataTable
              data={settlementScheduleData}
              columns={settlementColumns}
              searchable
              // pageSize={10}
            />
          </Section>
        </TabsContent>

        {/* Gains/Losses Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Cumulative FX Gain/Loss
                </CardTitle>
                <CardDescription>12-month realized and unrealized gains</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={gainLossTrendData}
                  height={280}
                  showGrid
                  showTooltip
                  // color="#10b981"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>FX Performance Summary</CardTitle>
                <CardDescription>Year-to-date analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Realized Gain</span>
                    <span className="font-mono font-bold text-green-600">+₹3.2 Cr</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Unrealized Gain (MTM)</span>
                    <span className="font-mono font-bold text-green-600">+₹1.3 Cr</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>Hedge Cost (Premium)</span>
                    <span className="font-mono font-bold">-₹0.45 Cr</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <span className="font-medium">Net FX Gain</span>
                    <span className="font-mono font-bold text-blue-600">+₹4.05 Cr</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Rates
            </Button>
            <Button variant="outline" size="sm">
              <Banknote className="mr-2 h-4 w-4" />
              Spot Conversion
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bot className="mr-2 h-4 w-4" />
              AI Hedge Advisor
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Hedge
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
