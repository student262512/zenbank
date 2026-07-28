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
  Layers,
  TrendingUp,
  TrendingDown,
  Users,
  ArrowRightLeft,
  DollarSign,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  RefreshCcw,
  Download,
  Bot,
  Sparkles,
  BarChart3,
  Activity,
  Wallet,
  PiggyBank,
  Landmark,
  ArrowLeftRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Settings,
  Play,
  Pause,
} from 'lucide-react';

// Mock KPI Data
const kpiData = {
  totalPoolBalance: {
    value: '890',
    unit: 'Cr',
    change: 3.2,
    trend: 'up' as const,
    sparkline: [820, 840, 855, 870, 878, 885, 890],
    subtitle: 'Across all pools',
  },
  activePools: {
    value: '6',
    unit: '',
    change: 0,
    trend: 'neutral' as const,
    subtitle: 'Cash pool structures',
  },
  participants: {
    value: '24',
    unit: '',
    change: 2,
    trend: 'up' as const,
    subtitle: 'Entities participating',
  },
  todaysSweeps: {
    value: '12',
    unit: '',
    change: 20,
    trend: 'up' as const,
    subtitle: 'Sweeps executed today',
  },
  interestSaved: {
    value: '2.4',
    unit: 'Cr/yr',
    change: 15.5,
    trend: 'up' as const,
    sparkline: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4],
    subtitle: 'Estimated annual savings',
  },
  poolEfficiency: {
    value: '94',
    unit: '%',
    change: 2.1,
    trend: 'up' as const,
    sparkline: [88, 89, 90, 91, 92, 93, 94],
    subtitle: 'Pool utilization rate',
  },
};

// Mock Pool Balance Trend Data (30 days)
const poolBalanceTrendData = Array.from({ length: 30 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: 850 + Math.sin(i / 5) * 40 + Math.random() * 20,
}));

// Mock Transfer Activity Data (30 days)
const transferActivityData = Array.from({ length: 30 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: Math.floor(8 + Math.random() * 8),
  value2: Math.floor(5 + Math.random() * 5),
}));

// Mock Pool Utilization Data
const poolUtilizationData = [
  { label: 'Main Pool', value: 320, color: '#3b82f6' },
  { label: 'Regional Pool - North', value: 180, color: '#10b981' },
  { label: 'Regional Pool - South', value: 150, color: '#f59e0b' },
  { label: 'Project Pool', value: 120, color: '#8b5cf6' },
  { label: 'Subsidiary Pool', value: 80, color: '#ec4899' },
  { label: 'Treasury Pool', value: 40, color: '#6366f1' },
];

// Mock Sweep History Data (30 days)
const sweepHistoryData = Array.from({ length: 30 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: 15 + Math.sin(i / 4) * 10 + Math.random() * 8,
}));

// Pool Table Data
interface PoolRecord {
  id: string;
  poolName: string;
  poolType: 'Physical' | 'Notional' | 'Hybrid';
  headerAccount: string;
  headerBank: string;
  participants: number;
  totalBalance: number;
  targetBalance: number;
  variance: number;
  status: 'Active' | 'Paused' | 'Pending';
  lastSweep: string;
  sweepFrequency: string;
}

const poolTableData: PoolRecord[] = [
  {
    id: 'POOL-001',
    poolName: 'Main Cash Pool',
    poolType: 'Physical',
    headerAccount: '1234567890',
    headerBank: 'HDFC Bank',
    participants: 8,
    totalBalance: 320,
    targetBalance: 300,
    variance: 20,
    status: 'Active',
    lastSweep: '2024-01-15 06:00',
    sweepFrequency: 'Daily',
  },
  {
    id: 'POOL-002',
    poolName: 'Regional Pool - North',
    poolType: 'Physical',
    headerAccount: '2345678901',
    headerBank: 'ICICI Bank',
    participants: 5,
    totalBalance: 180,
    targetBalance: 150,
    variance: 30,
    status: 'Active',
    lastSweep: '2024-01-15 06:00',
    sweepFrequency: 'Daily',
  },
  {
    id: 'POOL-003',
    poolName: 'Regional Pool - South',
    poolType: 'Notional',
    headerAccount: '3456789012',
    headerBank: 'SBI',
    participants: 4,
    totalBalance: 150,
    targetBalance: 150,
    variance: 0,
    status: 'Active',
    lastSweep: '2024-01-15 06:00',
    sweepFrequency: 'Daily',
  },
  {
    id: 'POOL-004',
    poolName: 'Project Finance Pool',
    poolType: 'Physical',
    headerAccount: '4567890123',
    headerBank: 'Axis Bank',
    participants: 3,
    totalBalance: 120,
    targetBalance: 100,
    variance: 20,
    status: 'Active',
    lastSweep: '2024-01-14 18:00',
    sweepFrequency: 'Twice Daily',
  },
  {
    id: 'POOL-005',
    poolName: 'Subsidiary Pool',
    poolType: 'Hybrid',
    headerAccount: '5678901234',
    headerBank: 'Kotak Bank',
    participants: 2,
    totalBalance: 80,
    targetBalance: 80,
    variance: 0,
    status: 'Paused',
    lastSweep: '2024-01-10 06:00',
    sweepFrequency: 'Weekly',
  },
  {
    id: 'POOL-006',
    poolName: 'Treasury Investment Pool',
    poolType: 'Notional',
    headerAccount: '6789012345',
    headerBank: 'Yes Bank',
    participants: 2,
    totalBalance: 40,
    targetBalance: 50,
    variance: -10,
    status: 'Active',
    lastSweep: '2024-01-15 06:00',
    sweepFrequency: 'Daily',
  },
];

// Pool Participants Data
interface ParticipantRecord {
  id: string;
  entityName: string;
  accountNumber: string;
  bank: string;
  poolName: string;
  currentBalance: number;
  targetBalance: number;
  sweepDirection: 'To Header' | 'From Header' | 'Both';
  status: 'Active' | 'Inactive';
  lastActivity: string;
}

const participantTableData: ParticipantRecord[] = [
  { id: 'P-001', entityName: 'ZenBank HQ', accountNumber: '1234567890', bank: 'HDFC Bank', poolName: 'Main Cash Pool', currentBalance: 120, targetBalance: 50, sweepDirection: 'To Header', status: 'Active', lastActivity: '2024-01-15 06:00' },
  { id: 'P-002', entityName: 'ZenBank Mumbai', accountNumber: '2345678901', bank: 'HDFC Bank', poolName: 'Main Cash Pool', currentBalance: 85, targetBalance: 50, sweepDirection: 'To Header', status: 'Active', lastActivity: '2024-01-15 06:00' },
  { id: 'P-003', entityName: 'ZenBank Delhi', accountNumber: '3456789012', bank: 'ICICI Bank', poolName: 'Regional Pool - North', currentBalance: 65, targetBalance: 30, sweepDirection: 'Both', status: 'Active', lastActivity: '2024-01-15 06:00' },
  { id: 'P-004', entityName: 'ZenBank Bangalore', accountNumber: '4567890123', bank: 'SBI', poolName: 'Regional Pool - South', currentBalance: 55, targetBalance: 40, sweepDirection: 'To Header', status: 'Active', lastActivity: '2024-01-15 06:00' },
  { id: 'P-005', entityName: 'ZenBank Chennai', accountNumber: '5678901234', bank: 'SBI', poolName: 'Regional Pool - South', currentBalance: 45, targetBalance: 40, sweepDirection: 'Both', status: 'Active', lastActivity: '2024-01-15 06:00' },
  { id: 'P-006', entityName: 'ZenBank Pune', accountNumber: '6789012345', bank: 'HDFC Bank', poolName: 'Main Cash Pool', currentBalance: 38, targetBalance: 30, sweepDirection: 'To Header', status: 'Active', lastActivity: '2024-01-14 18:00' },
  { id: 'P-007', entityName: 'Project Alpha SPV', accountNumber: '7890123456', bank: 'Axis Bank', poolName: 'Project Finance Pool', currentBalance: 72, targetBalance: 50, sweepDirection: 'Both', status: 'Active', lastActivity: '2024-01-14 18:00' },
  { id: 'P-008', entityName: 'ZenBank Subsidiary A', accountNumber: '8901234567', bank: 'Kotak Bank', poolName: 'Subsidiary Pool', currentBalance: 42, targetBalance: 40, sweepDirection: 'To Header', status: 'Inactive', lastActivity: '2024-01-10 06:00' },
];

// Recent Transfers Data
interface TransferRecord {
  id: string;
  fromAccount: string;
  fromEntity: string;
  toAccount: string;
  toEntity: string;
  amount: number;
  transferType: 'Sweep' | 'Manual' | 'Target Balance' | 'Zero Balance';
  pool: string;
  timestamp: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

const recentTransfersData: TransferRecord[] = [
  { id: 'TRF-001', fromAccount: '1234567890', fromEntity: 'ZenBank HQ', toAccount: '0987654321', toEntity: 'Header - Main Pool', amount: 25, transferType: 'Sweep', pool: 'Main Cash Pool', timestamp: '2024-01-15 06:05', status: 'Completed' },
  { id: 'TRF-002', fromAccount: '2345678901', fromEntity: 'ZenBank Mumbai', toAccount: '0987654321', toEntity: 'Header - Main Pool', amount: 18, transferType: 'Sweep', pool: 'Main Cash Pool', timestamp: '2024-01-15 06:04', status: 'Completed' },
  { id: 'TRF-003', fromAccount: '3456789012', fromEntity: 'ZenBank Delhi', toAccount: '1122334455', toEntity: 'Header - North', amount: 12, transferType: 'Target Balance', pool: 'Regional Pool - North', timestamp: '2024-01-15 06:03', status: 'Completed' },
  { id: 'TRF-004', fromAccount: '4567890123', fromEntity: 'ZenBank Bangalore', toAccount: '5566778899', toEntity: 'Header - South', amount: 8, transferType: 'Zero Balance', pool: 'Regional Pool - South', timestamp: '2024-01-15 06:02', status: 'Completed' },
  { id: 'TRF-005', fromAccount: '5678901234', fromEntity: 'ZenBank Chennai', toAccount: '5566778899', toEntity: 'Header - South', amount: 5, transferType: 'Sweep', pool: 'Regional Pool - South', timestamp: '2024-01-15 06:01', status: 'Completed' },
  { id: 'TRF-006', fromAccount: '7890123456', fromEntity: 'Project Alpha SPV', toAccount: '2233445566', toEntity: 'Header - Project', amount: 15, transferType: 'Manual', pool: 'Project Finance Pool', timestamp: '2024-01-14 18:30', status: 'Completed' },
  { id: 'TRF-007', fromAccount: '6789012345', fromEntity: 'ZenBank Pune', toAccount: '0987654321', toEntity: 'Header - Main Pool', amount: 6, transferType: 'Sweep', pool: 'Main Cash Pool', timestamp: '2024-01-14 18:05', status: 'Completed' },
  { id: 'TRF-008', fromAccount: '8901234567', fromEntity: 'ZenBank Subsidiary A', toAccount: '3344556677', toEntity: 'Header - Subsidiary', amount: 2, transferType: 'Target Balance', pool: 'Subsidiary Pool', timestamp: '2024-01-10 06:05', status: 'Completed' },
];

// AI Insights
const aiInsights = [
  {
    id: '1',
    type: 'recommendation' as const,
    title: 'Optimize Pool Structure',
    insight: 'Consider merging Regional Pool - North and Regional Pool - South into a single regional pool to reduce operational complexity and improve efficiency by 8%.',
    impact: 'high' as const,
    confidence: 87,
    category: 'Pool Optimization',
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Reactivate Subsidiary Pool',
    insight: 'Subsidiary Pool has been paused for 5 days. Reactivating would capture INR 1.2 Cr in idle cash currently sitting in participant accounts.',
    impact: 'medium' as const,
    confidence: 92,
    category: 'Pool Management',
  },
  {
    id: '3',
    type: 'insight' as const,
    title: 'Sweep Timing Optimization',
    insight: 'Moving sweep execution from 6:00 AM to 5:30 AM would capture additional INR 45 Lakhs daily in early morning receipts.',
    impact: 'medium' as const,
    confidence: 78,
    category: 'Sweep Optimization',
  },
  {
    id: '4',
    type: 'recommendation' as const,
    title: 'Add New Participant',
    insight: 'ZenBank Hyderabad (new entity) should be added to Regional Pool - South. Projected annual interest savings: INR 32 Lakhs.',
    impact: 'medium' as const,
    confidence: 85,
    category: 'Pool Expansion',
  },
];

// Pool columns
const poolColumns: Column<PoolRecord>[] = [
  { id: 'poolName', header: 'Pool Name', accessor: 'poolName', sortable: true },
  {
    id: 'poolType',
    header: 'Type',
    accessor: 'poolType',
    cell: (row) => (
      <Badge variant={row.poolType === 'Physical' ? 'default' : row.poolType === 'Notional' ? 'secondary' : 'outline'}>
        {row.poolType}
      </Badge>
    ),
  },
  { id: 'headerBank', header: 'Header Bank', accessor: 'headerBank', sortable: true },
  { id: 'participants', header: 'Participants', accessor: 'participants', sortable: true },
  {
    id: 'totalBalance',
    header: 'Total Balance',
    accessor: 'totalBalance',
    cell: (row) => <span className="font-mono font-medium">₹{row.totalBalance} Cr</span>,
    sortable: true,
  },
  {
    id: 'targetBalance',
    header: 'Target',
    accessor: 'targetBalance',
    cell: (row) => <span className="font-mono text-muted-foreground">₹{row.targetBalance} Cr</span>,
  },
  {
    id: 'variance',
    header: 'Variance',
    accessor: 'variance',
    cell: (row) => (
      <span className={`font-mono font-medium ${row.variance > 0 ? 'text-green-600' : row.variance < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
        {row.variance > 0 ? '+' : ''}{row.variance} Cr
      </span>
    ),
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Active' ? 'default' : row.status === 'Paused' ? 'secondary' : 'outline'}>
        {row.status === 'Active' && <CheckCircle2 className="mr-1 h-3 w-3" />}
        {row.status === 'Paused' && <Pause className="mr-1 h-3 w-3" />}
        {row.status === 'Pending' && <Clock className="mr-1 h-3 w-3" />}
        {row.status}
      </Badge>
    ),
  },
  { id: 'sweepFrequency', header: 'Frequency', accessor: 'sweepFrequency' },
  { id: 'lastSweep', header: 'Last Sweep', accessor: 'lastSweep' },
];

// Participant columns
const participantColumns: Column<ParticipantRecord>[] = [
  { id: 'entityName', header: 'Entity', accessor: 'entityName', sortable: true },
  { id: 'accountNumber', header: 'Account', accessor: 'accountNumber' },
  { id: 'bank', header: 'Bank', accessor: 'bank', sortable: true },
  { id: 'poolName', header: 'Pool', accessor: 'poolName', sortable: true },
  {
    id: 'currentBalance',
    header: 'Current Balance',
    accessor: 'currentBalance',
    cell: (row) => <span className="font-mono font-medium">₹{row.currentBalance} Cr</span>,
    sortable: true,
  },
  {
    id: 'targetBalance',
    header: 'Target',
    accessor: 'targetBalance',
    cell: (row) => <span className="font-mono text-muted-foreground">₹{row.targetBalance} Cr</span>,
  },
  {
    id: 'sweepDirection',
    header: 'Sweep Direction',
    accessor: 'sweepDirection',
    cell: (row) => (
      <Badge variant="outline">
        {row.sweepDirection === 'To Header' && <ArrowUpRight className="mr-1 h-3 w-3" />}
        {row.sweepDirection === 'From Header' && <ArrowDownRight className="mr-1 h-3 w-3" />}
        {row.sweepDirection === 'Both' && <ArrowLeftRight className="mr-1 h-3 w-3" />}
        {row.sweepDirection}
      </Badge>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Active' ? 'default' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
  { id: 'lastActivity', header: 'Last Activity', accessor: 'lastActivity' },
];

// Transfer columns
const transferColumns: Column<TransferRecord>[] = [
  { id: 'id', header: 'Transfer ID', accessor: 'id' },
  { id: 'fromEntity', header: 'From', accessor: 'fromEntity', sortable: true },
  { id: 'toEntity', header: 'To', accessor: 'toEntity', sortable: true },
  {
    id: 'amount',
    header: 'Amount',
    accessor: 'amount',
    cell: (row) => <span className="font-mono font-medium">₹{row.amount} Cr</span>,
    sortable: true,
  },
  {
    id: 'transferType',
    header: 'Type',
    accessor: 'transferType',
    cell: (row) => (
      <Badge variant="outline">{row.transferType}</Badge>
    ),
  },
  { id: 'pool', header: 'Pool', accessor: 'pool', sortable: true },
  { id: 'timestamp', header: 'Timestamp', accessor: 'timestamp', sortable: true },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Completed' ? 'default' : row.status === 'Pending' ? 'secondary' : 'danger'}>
        {row.status === 'Completed' && <CheckCircle2 className="mr-1 h-3 w-3" />}
        {row.status === 'Pending' && <Clock className="mr-1 h-3 w-3" />}
        {row.status === 'Failed' && <AlertCircle className="mr-1 h-3 w-3" />}
        {row.status}
      </Badge>
    ),
  },
];

export default function CashPoolingPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <PageContainer>
      <PageHeader
        title="Cash Pooling"
        description="Manage physical and notional cash pools across entities"
        breadcrumbs={[
          { label: 'Treasury', href: '/treasury' },
          { label: 'Cash Pooling', href: '/treasury/pooling' },
        ]}
        actions={[
          {
            label: 'Execute Sweep',
            icon: Play,
            onClick: () => {},
            variant: 'default',
          },
          {
            label: 'New Pool',
            icon: Plus,
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
          title="Total Pool Balance"
          value={kpiData.totalPoolBalance.value}
          changeUnit={kpiData.totalPoolBalance.unit}
          change={kpiData.totalPoolBalance.change}
          trend={kpiData.totalPoolBalance.trend}
          icon={Wallet}
          sparkline={kpiData.totalPoolBalance.sparkline}
          subtitle={kpiData.totalPoolBalance.subtitle}
        />
        <KPICard
          title="Active Pools"
          value={kpiData.activePools.value}
          changeUnit={kpiData.activePools.unit}
          change={kpiData.activePools.change}
          trend={kpiData.activePools.trend}
          icon={Layers}
          subtitle={kpiData.activePools.subtitle}
        />
        <KPICard
          title="Participants"
          value={kpiData.participants.value}
          changeUnit={kpiData.participants.unit}
          change={kpiData.participants.change}
          trend={kpiData.participants.trend}
          icon={Users}
          subtitle={kpiData.participants.subtitle}
        />
        <KPICard
          title="Today's Sweeps"
          value={kpiData.todaysSweeps.value}
          changeUnit={kpiData.todaysSweeps.unit}
          change={kpiData.todaysSweeps.change}
          trend={kpiData.todaysSweeps.trend}
          icon={ArrowRightLeft}
          subtitle={kpiData.todaysSweeps.subtitle}
        />
        <KPICard
          title="Interest Saved"
          value={kpiData.interestSaved.value}
          changeUnit={kpiData.interestSaved.unit}
          change={kpiData.interestSaved.change}
          trend={kpiData.interestSaved.trend}
          icon={TrendingUp}
          sparkline={kpiData.interestSaved.sparkline}
          subtitle={kpiData.interestSaved.subtitle}
        />
        <KPICard
          title="Pool Efficiency"
          value={kpiData.poolEfficiency.value}
          changeUnit={kpiData.poolEfficiency.unit}
          change={kpiData.poolEfficiency.change}
          trend={kpiData.poolEfficiency.trend}
          icon={Target}
          sparkline={kpiData.poolEfficiency.sparkline}
          subtitle={kpiData.poolEfficiency.subtitle}
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Pool Overview</TabsTrigger>
          <TabsTrigger value="physical">Physical Pooling</TabsTrigger>
          <TabsTrigger value="notional">Notional Pooling</TabsTrigger>
          <TabsTrigger value="zero">Zero Balancing</TabsTrigger>
          <TabsTrigger value="target">Target Balancing</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  Pool Balance Trend
                </CardTitle>
                <CardDescription>30-day pool balance history</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={poolBalanceTrendData}
                  height={280}
                  showGrid
                  showTooltip
                  // color="#3b82f6"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  Transfer Activity
                </CardTitle>
                <CardDescription>Daily sweep and manual transfers</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={transferActivityData}
                  height={280}
                  showGrid
                  // showTooltip
                  // color="#10b981"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {/* <PieChart className="h-5 w-5 text-muted-foreground" /> */}
                  Pool Utilization
                </CardTitle>
                <CardDescription>Balance distribution by pool</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={poolUtilizationData}
                  // height={250}
                  showLegend
                  // showTooltip
                />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCcw className="h-5 w-5 text-muted-foreground" />
                  Sweep History
                </CardTitle>
                <CardDescription>Daily sweep amounts (in Cr)</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={sweepHistoryData}
                  height={250}
                  showGrid
                  showTooltip
                  // color="#8b5cf6"
                />
              </CardContent>
            </Card>
          </div>

          {/* Pool Table */}
          <Section title="Cash Pools" description="All active and paused cash pool structures">
            <DataTable
              data={poolTableData}
              columns={poolColumns}
              searchable
              searchPlaceholder="Search pools..."
              // pageSize={10}
            />
          </Section>

          {/* AI Insights */}
          <AIInsightsPanel
            title="Pool Optimization Insights"
            insights={aiInsights}
          />
        </TabsContent>

        {/* Physical Pooling Tab */}
        <TabsContent value="physical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Physical Cash Pooling</CardTitle>
              <CardDescription>
                Physical pooling involves actual movement of funds between accounts. Cash is swept from participant accounts to a header account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Physical Pools</div>
                  <div className="text-2xl font-bold">3</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Total Participants</div>
                  <div className="text-2xl font-bold">16</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Today's Sweeps</div>
                  <div className="text-2xl font-bold">8</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Swept Amount</div>
                  <div className="text-2xl font-bold">₹68 Cr</div>
                </Card>
              </div>

              <DataTable
                data={poolTableData.filter(p => p.poolType === 'Physical')}
                columns={poolColumns}
                searchable
                // pageSize={5}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notional Pooling Tab */}
        <TabsContent value="notional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notional Cash Pooling</CardTitle>
              <CardDescription>
                Notional pooling aggregates balances for interest calculation without physical fund movement. Each account maintains its own balance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Notional Pools</div>
                  <div className="text-2xl font-bold">2</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Total Participants</div>
                  <div className="text-2xl font-bold">6</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Net Balance</div>
                  <div className="text-2xl font-bold">₹190 Cr</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Interest Benefit</div>
                  <div className="text-2xl font-bold">₹1.1 Cr/yr</div>
                </Card>
              </div>

              <DataTable
                data={poolTableData.filter(p => p.poolType === 'Notional')}
                columns={poolColumns}
                searchable
                // pageSize={5}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Zero Balancing Tab */}
        <TabsContent value="zero" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zero Balance Accounts (ZBA)</CardTitle>
              <CardDescription>
                Accounts are swept to zero balance at end of day, with all funds concentrated in the header account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">ZBA Accounts</div>
                  <div className="text-2xl font-bold">12</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Today's ZBA Sweeps</div>
                  <div className="text-2xl font-bold">4</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Concentrated Amount</div>
                  <div className="text-2xl font-bold">₹42 Cr</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Efficiency</div>
                  <div className="text-2xl font-bold">100%</div>
                </Card>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="font-medium mb-4">ZBA Configuration</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Sweep Time</Label>
                    <Select defaultValue="eod">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eod">End of Day (18:00)</SelectItem>
                        <SelectItem value="bod">Beginning of Day (06:00)</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Threshold Amount</Label>
                    <Input type="number" placeholder="0" defaultValue="0" />
                  </div>
                </div>
              </div>

              <DataTable
                data={recentTransfersData.filter(t => t.transferType === 'Zero Balance')}
                columns={transferColumns}
                searchable
                // pageSize={5}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Target Balancing Tab */}
        <TabsContent value="target" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Target Balance Accounts (TBA)</CardTitle>
              <CardDescription>
                Accounts are swept to maintain a target balance. Excess funds move to header, deficits are funded from header.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">TBA Accounts</div>
                  <div className="text-2xl font-bold">8</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Today's TBA Sweeps</div>
                  <div className="text-2xl font-bold">6</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Total Target</div>
                  <div className="text-2xl font-bold">₹340 Cr</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Current Variance</div>
                  <div className="text-2xl font-bold text-green-600">+₹28 Cr</div>
                </Card>
              </div>

              <DataTable
                data={participantTableData.filter(p => p.targetBalance > 0)}
                columns={participantColumns}
                searchable
                searchPlaceholder="Search participants..."
                // pageSize={10}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transfers Tab */}
        <TabsContent value="transfers" className="space-y-6">
          {/* Transfer Form */}
          <Card>
            <CardHeader>
              <CardTitle>New Transfer</CardTitle>
              <CardDescription>Initiate a manual inter-pool or intra-pool transfer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label>Source Account</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {participantTableData.map(p => (
                        <SelectItem key={p.id} value={p.accountNumber}>
                          {p.entityName} - {p.accountNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Target Account</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {participantTableData.map(p => (
                        <SelectItem key={p.id} value={p.accountNumber}>
                          {p.entityName} - {p.accountNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Amount (Cr)</Label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
                <div>
                  <Label>Transfer Type</Label>
                  <Select defaultValue="manual">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="sweep">Sweep</SelectItem>
                      <SelectItem value="target">Target Balance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <Label>Value Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Reference</Label>
                  <Input placeholder="Enter reference" />
                </div>
                <div>
                  <Label>Notes</Label>
                  <Input placeholder="Optional notes" />
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  Initiate Transfer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transfers */}
          <Section title="Recent Transfers" description="Transfer history across all pools">
            <DataTable
              data={recentTransfersData}
              columns={transferColumns}
              searchable
              searchPlaceholder="Search transfers..."
              // pageSize={10}
            />
          </Section>
        </TabsContent>
      </Tabs>

      {/* Quick Actions Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Balances
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Pool Settings
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bot className="mr-2 h-4 w-4" />
              AI Pool Optimizer
            </Button>
            <Button size="sm">
              <Play className="mr-2 h-4 w-4" />
              Execute All Sweeps
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
