'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { LineChart } from '@/components/shared/charts/line-chart';
import { BarChart } from '@/components/shared/charts/bar-chart';
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
import { Switch } from '@/components/ui/switch';
import {
  ArrowUpToLine,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
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
  CheckCircle2,
  AlertCircle,
  Plus,
  Settings,
  Play,
  Pause,
  Calendar,
  Filter,
  FileText,
} from 'lucide-react';

// Mock KPI Data
const kpiData = {
  concentratedToday: {
    value: '156',
    unit: 'Cr',
    change: 12.5,
    trend: 'up' as const,
    sparkline: [120, 135, 142, 148, 152, 154, 156],
    subtitle: 'Funds moved to header accounts',
  },
  pendingTransfers: {
    value: '8',
    unit: '',
    change: -20,
    trend: 'down' as const,
    subtitle: 'Awaiting execution',
  },
  activeRules: {
    value: '24',
    unit: '',
    change: 2,
    trend: 'up' as const,
    subtitle: 'Concentration rules active',
  },
  exceptionCount: {
    value: '3',
    unit: '',
    change: -40,
    trend: 'down' as const,
    subtitle: 'Requires manual review',
  },
  idleCashIdentified: {
    value: '45',
    unit: 'Cr',
    change: -15.5,
    trend: 'down' as const,
    sparkline: [68, 62, 58, 52, 48, 46, 45],
    subtitle: 'Idle cash in accounts',
  },
};

// Mock Concentration Trend Data (30 days)
const concentrationTrendData = Array.from({ length: 30 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: 140 + Math.sin(i / 4) * 30 + Math.random() * 20,
}));

// Mock Transfer Volume Data (12 months)
const transferVolumeData = [
  { label: 'Jan', value: 1250 },
  { label: 'Feb', value: 1180 },
  { label: 'Mar', value: 1320 },
  { label: 'Apr', value: 1280 },
  { label: 'May', value: 1450 },
  { label: 'Jun', value: 1380 },
  { label: 'Jul', value: 1520 },
  { label: 'Aug', value: 1480 },
  { label: 'Sep', value: 1620 },
  { label: 'Oct', value: 1580 },
  { label: 'Nov', value: 1720 },
  { label: 'Dec', value: 1680 },
];

// Concentration Rules Data
interface ConcentrationRule {
  id: string;
  sourceAccount: string;
  sourceEntity: string;
  sourceBank: string;
  targetAccount: string;
  targetEntity: string;
  currentBalance: number;
  threshold: number;
  transferAmount: number;
  schedule: string;
  frequency: 'Daily' | 'Twice Daily' | 'Weekly' | 'Monthly' | 'On Demand';
  status: 'Active' | 'Paused' | 'Error';
  lastRun: string;
  nextRun: string;
}

const concentrationRulesData: ConcentrationRule[] = [
  { id: 'CR-001', sourceAccount: '1234567890', sourceEntity: 'ZenBank HQ', sourceBank: 'HDFC Bank', targetAccount: '0987654321', targetEntity: 'Treasury Header', currentBalance: 85, threshold: 50, transferAmount: 35, schedule: '06:00 AM', frequency: 'Daily', status: 'Active', lastRun: '2024-01-15 06:00', nextRun: '2024-01-16 06:00' },
  { id: 'CR-002', sourceAccount: '2345678901', sourceEntity: 'ZenBank Mumbai', sourceBank: 'HDFC Bank', targetAccount: '0987654321', targetEntity: 'Treasury Header', currentBalance: 62, threshold: 30, transferAmount: 32, schedule: '06:00 AM', frequency: 'Daily', status: 'Active', lastRun: '2024-01-15 06:00', nextRun: '2024-01-16 06:00' },
  { id: 'CR-003', sourceAccount: '3456789012', sourceEntity: 'ZenBank Delhi', sourceBank: 'ICICI Bank', targetAccount: '1122334455', targetEntity: 'Regional Header - North', currentBalance: 48, threshold: 25, transferAmount: 23, schedule: '06:00 AM, 18:00 PM', frequency: 'Twice Daily', status: 'Active', lastRun: '2024-01-15 06:00', nextRun: '2024-01-15 18:00' },
  { id: 'CR-004', sourceAccount: '4567890123', sourceEntity: 'ZenBank Bangalore', sourceBank: 'SBI', targetAccount: '5566778899', targetEntity: 'Regional Header - South', currentBalance: 38, threshold: 20, transferAmount: 18, schedule: '06:00 AM', frequency: 'Daily', status: 'Active', lastRun: '2024-01-15 06:00', nextRun: '2024-01-16 06:00' },
  { id: 'CR-005', sourceAccount: '5678901234', sourceEntity: 'ZenBank Chennai', sourceBank: 'SBI', targetAccount: '5566778899', targetEntity: 'Regional Header - South', currentBalance: 28, threshold: 15, transferAmount: 13, schedule: '06:00 AM', frequency: 'Daily', status: 'Active', lastRun: '2024-01-15 06:00', nextRun: '2024-01-16 06:00' },
  { id: 'CR-006', sourceAccount: '6789012345', sourceEntity: 'ZenBank Pune', sourceBank: 'HDFC Bank', targetAccount: '0987654321', targetEntity: 'Treasury Header', currentBalance: 22, threshold: 20, transferAmount: 2, schedule: '06:00 AM', frequency: 'Daily', status: 'Active', lastRun: '2024-01-15 06:00', nextRun: '2024-01-16 06:00' },
  { id: 'CR-007', sourceAccount: '7890123456', sourceEntity: 'ZenBank Hyderabad', sourceBank: 'Axis Bank', targetAccount: '5566778899', targetEntity: 'Regional Header - South', currentBalance: 15, threshold: 10, transferAmount: 5, schedule: 'Monday 06:00 AM', frequency: 'Weekly', status: 'Paused', lastRun: '2024-01-08 06:00', nextRun: '-' },
  { id: 'CR-008', sourceAccount: '8901234567', sourceEntity: 'ZenBank Kolkata', sourceBank: 'ICICI Bank', targetAccount: '1122334455', targetEntity: 'Regional Header - North', currentBalance: 32, threshold: 25, transferAmount: 7, schedule: '06:00 AM', frequency: 'Daily', status: 'Error', lastRun: '2024-01-14 06:00', nextRun: 'Retry Pending' },
  { id: 'CR-009', sourceAccount: '9012345678', sourceEntity: 'Project Alpha SPV', sourceBank: 'Axis Bank', targetAccount: '2233445566', targetEntity: 'Project Header', currentBalance: 55, threshold: 30, transferAmount: 25, schedule: '18:00 PM', frequency: 'Daily', status: 'Active', lastRun: '2024-01-14 18:00', nextRun: '2024-01-15 18:00' },
  { id: 'CR-010', sourceAccount: '0123456789', sourceEntity: 'ZenBank Ahmedabad', sourceBank: 'Kotak Bank', targetAccount: '0987654321', targetEntity: 'Treasury Header', currentBalance: 18, threshold: 15, transferAmount: 3, schedule: '06:00 AM', frequency: 'Daily', status: 'Active', lastRun: '2024-01-15 06:00', nextRun: '2024-01-16 06:00' },
];

// Schedule Data
interface ScheduleRecord {
  id: string;
  ruleName: string;
  sourceEntity: string;
  targetEntity: string;
  scheduledTime: string;
  estimatedAmount: number;
  frequency: string;
  status: 'Scheduled' | 'Running' | 'Completed' | 'Failed';
}

const scheduleData: ScheduleRecord[] = [
  { id: 'SCH-001', ruleName: 'HQ to Treasury', sourceEntity: 'ZenBank HQ', targetEntity: 'Treasury Header', scheduledTime: '2024-01-16 06:00', estimatedAmount: 35, frequency: 'Daily', status: 'Scheduled' },
  { id: 'SCH-002', ruleName: 'Mumbai to Treasury', sourceEntity: 'ZenBank Mumbai', targetEntity: 'Treasury Header', scheduledTime: '2024-01-16 06:00', estimatedAmount: 32, frequency: 'Daily', status: 'Scheduled' },
  { id: 'SCH-003', ruleName: 'Delhi to North', sourceEntity: 'ZenBank Delhi', targetEntity: 'Regional Header - North', scheduledTime: '2024-01-15 18:00', estimatedAmount: 23, frequency: 'Twice Daily', status: 'Scheduled' },
  { id: 'SCH-004', ruleName: 'Bangalore to South', sourceEntity: 'ZenBank Bangalore', targetEntity: 'Regional Header - South', scheduledTime: '2024-01-16 06:00', estimatedAmount: 18, frequency: 'Daily', status: 'Scheduled' },
  { id: 'SCH-005', ruleName: 'Project Alpha Sweep', sourceEntity: 'Project Alpha SPV', targetEntity: 'Project Header', scheduledTime: '2024-01-15 18:00', estimatedAmount: 25, frequency: 'Daily', status: 'Scheduled' },
];

// Exceptions Data
interface ExceptionRecord {
  id: string;
  ruleId: string;
  sourceEntity: string;
  errorType: 'Insufficient Balance' | 'Bank Timeout' | 'Account Frozen' | 'Limit Exceeded';
  errorMessage: string;
  occurredAt: string;
  attempts: number;
  status: 'Pending' | 'Resolved' | 'Escalated';
  resolution: string;
}

const exceptionsData: ExceptionRecord[] = [
  { id: 'EXC-001', ruleId: 'CR-008', sourceEntity: 'ZenBank Kolkata', errorType: 'Bank Timeout', errorMessage: 'Connection timeout while executing transfer to ICICI Bank', occurredAt: '2024-01-14 06:05', attempts: 3, status: 'Pending', resolution: '' },
  { id: 'EXC-002', ruleId: 'CR-012', sourceEntity: 'ZenBank Jaipur', errorType: 'Insufficient Balance', errorMessage: 'Account balance INR 8 Cr below threshold INR 10 Cr', occurredAt: '2024-01-15 06:02', attempts: 1, status: 'Pending', resolution: '' },
  { id: 'EXC-003', ruleId: 'CR-015', sourceEntity: 'Subsidiary B', errorType: 'Account Frozen', errorMessage: 'Account temporarily frozen for regulatory compliance check', occurredAt: '2024-01-13 06:00', attempts: 1, status: 'Escalated', resolution: 'Awaiting compliance clearance' },
];

// AI Insights
const aiInsights = [
  {
    id: '1',
    type: 'recommendation' as const,
    title: 'Optimize Concentration Rules',
    description: 'Increasing threshold for ZenBank Pune from INR 20 Cr to INR 25 Cr would reduce daily transfer frequency by 40% while maintaining optimal liquidity.',
    impact: 'medium' as const,
    confidence: 85,
    category: 'Rule Optimization',
  },
  {
    id: '2',
    type: 'alert' as const,
    title: 'Idle Cash Alert',
    description: 'INR 45 Cr idle cash identified across 5 accounts that are not covered by concentration rules. Consider adding rules for ZenBank Surat and ZenBank Lucknow.',
    impact: 'high' as const,
    confidence: 92,
    category: 'Cash Optimization',
  },
  {
    id: '3',
    type: 'insight' as const,
    title: 'Schedule Optimization',
    description: 'Moving Delhi concentration from 06:00 AM to 05:30 AM would capture INR 2.5 Cr additional early morning collections.',
    impact: 'medium' as const,
    confidence: 78,
    category: 'Schedule Optimization',
  },
  {
    id: '4',
    type: 'recommendation' as const,
    title: 'Error Resolution',
    description: 'The Kolkata rule has failed 3 consecutive times due to bank timeout. Recommend switching to HDFC Bank backup account or adjusting retry timing.',
    impact: 'high' as const,
    confidence: 88,
    category: 'Error Resolution',
  },
];

// Rule columns
const ruleColumns: Column<ConcentrationRule>[] = [
  { id: 'sourceEntity', header: 'Source Entity', accessor: 'sourceEntity', sortable: true },
  { id: 'sourceBank', header: 'Bank', accessor: 'sourceBank', sortable: true },
  { id: 'targetEntity', header: 'Target', accessor: 'targetEntity', sortable: true },
  {
    id: 'currentBalance',
    header: 'Current Balance',
    accessor: 'currentBalance',
    cell: (row) => <span className="font-mono font-medium">₹{row.currentBalance} Cr</span>,
    sortable: true,
  },
  {
    id: 'threshold',
    header: 'Threshold',
    accessor: 'threshold',
    cell: (row) => <span className="font-mono text-muted-foreground">₹{row.threshold} Cr</span>,
  },
  {
    id: 'transferAmount',
    header: 'Transfer Amt',
    accessor: 'transferAmount',
    cell: (row) => (
      <span className={`font-mono font-medium ${row.transferAmount > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
        ₹{row.transferAmount} Cr
      </span>
    ),
    sortable: true,
  },
  {
    id: 'frequency',
    header: 'Frequency',
    accessor: 'frequency',
    cell: (row) => <Badge variant="outline">{row.frequency}</Badge>,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Active' ? 'default' : row.status === 'Paused' ? 'secondary' : 'destructive'}>
        {row.status === 'Active' && <CheckCircle2 className="mr-1 h-3 w-3" />}
        {row.status === 'Paused' && <Pause className="mr-1 h-3 w-3" />}
        {row.status === 'Error' && <AlertCircle className="mr-1 h-3 w-3" />}
        {row.status}
      </Badge>
    ),
  },
  { id: 'lastRun', header: 'Last Run', accessor: 'lastRun' },
  { id: 'nextRun', header: 'Next Run', accessor: 'nextRun' },
];

// Schedule columns
const scheduleColumns: Column<ScheduleRecord>[] = [
  { id: 'ruleName', header: 'Rule', accessor: 'ruleName', sortable: true },
  { id: 'sourceEntity', header: 'Source', accessor: 'sourceEntity' },
  { id: 'targetEntity', header: 'Target', accessor: 'targetEntity' },
  { id: 'scheduledTime', header: 'Scheduled', accessor: 'scheduledTime', sortable: true },
  {
    id: 'estimatedAmount',
    header: 'Est. Amount',
    accessor: 'estimatedAmount',
    cell: (row) => <span className="font-mono font-medium">₹{row.estimatedAmount} Cr</span>,
  },
  { id: 'frequency', header: 'Frequency', accessor: 'frequency' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Scheduled' ? 'outline' : row.status === 'Running' ? 'default' : row.status === 'Completed' ? 'secondary' : 'destructive'}>
        {row.status}
      </Badge>
    ),
  },
];

// Exception columns
const exceptionColumns: Column<ExceptionRecord>[] = [
  { id: 'id', header: 'Exception ID', accessor: 'id' },
  { id: 'ruleId', header: 'Rule ID', accessor: 'ruleId' },
  { id: 'sourceEntity', header: 'Source Entity', accessor: 'sourceEntity', sortable: true },
  {
    id: 'errorType',
    header: 'Error Type',
    accessor: 'errorType',
    cell: (row) => (
      <Badge variant="outline" className="text-red-600">
        {row.errorType}
      </Badge>
    ),
  },
  { id: 'errorMessage', header: 'Message', accessor: 'errorMessage' },
  { id: 'occurredAt', header: 'Occurred At', accessor: 'occurredAt', sortable: true },
  { id: 'attempts', header: 'Attempts', accessor: 'attempts' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Resolved' ? 'default' : row.status === 'Pending' ? 'secondary' : 'destructive'}>
        {row.status}
      </Badge>
    ),
  },
];

export default function CashConcentrationPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <PageContainer>
      <PageHeader
        title="Cash Concentration"
        description="Automate fund concentration from subsidiary accounts to central treasury"
        breadcrumbs={[
          { label: 'Treasury', href: '/treasury' },
          { label: 'Cash Concentration', href: '/treasury/concentration' },
        ]}
        actions={[
          {
            label: 'Execute Now',
            icon: Play,
            onClick: () => {},
            variant: 'default',
          },
          {
            label: 'New Rule',
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
      <KPIGrid columns={5}>
        <KPICard
          title="Concentrated Today"
          value={kpiData.concentratedToday.value}
          unit={kpiData.concentratedToday.unit}
          change={kpiData.concentratedToday.change}
          trend={kpiData.concentratedToday.trend}
          icon={ArrowUpToLine}
          sparkline={kpiData.concentratedToday.sparkline}
          subtitle={kpiData.concentratedToday.subtitle}
        />
        <KPICard
          title="Pending Transfers"
          value={kpiData.pendingTransfers.value}
          unit={kpiData.pendingTransfers.unit}
          change={kpiData.pendingTransfers.change}
          trend={kpiData.pendingTransfers.trend}
          icon={Clock}
          subtitle={kpiData.pendingTransfers.subtitle}
        />
        <KPICard
          title="Active Rules"
          value={kpiData.activeRules.value}
          unit={kpiData.activeRules.unit}
          change={kpiData.activeRules.change}
          trend={kpiData.activeRules.trend}
          icon={Settings}
          subtitle={kpiData.activeRules.subtitle}
        />
        <KPICard
          title="Exceptions"
          value={kpiData.exceptionCount.value}
          unit={kpiData.exceptionCount.unit}
          change={kpiData.exceptionCount.change}
          trend={kpiData.exceptionCount.trend}
          icon={AlertTriangle}
          subtitle={kpiData.exceptionCount.subtitle}
        />
        <KPICard
          title="Idle Cash Identified"
          value={kpiData.idleCashIdentified.value}
          unit={kpiData.idleCashIdentified.unit}
          change={kpiData.idleCashIdentified.change}
          trend={kpiData.idleCashIdentified.trend}
          icon={Wallet}
          sparkline={kpiData.idleCashIdentified.sparkline}
          subtitle={kpiData.idleCashIdentified.subtitle}
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rules">Transfer Rules</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  Concentration Trend
                </CardTitle>
                <CardDescription>Daily concentration amounts (30 days)</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={concentrationTrendData}
                  height={280}
                  showGrid
                  showTooltip
                  color="#3b82f6"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  Transfer Volume
                </CardTitle>
                <CardDescription>Monthly transfer volumes (12 months)</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={transferVolumeData}
                  height={280}
                  showGrid
                  showTooltip
                  color="#10b981"
                />
              </CardContent>
            </Card>
          </div>

          {/* Concentration Rules Table */}
          <Section title="Concentration Rules" description="Active and paused concentration rules">
            <DataTable
              data={concentrationRulesData}
              columns={ruleColumns}
              searchable
              searchPlaceholder="Search rules..."
              pageSize={10}
            />
          </Section>

          {/* AI Insights */}
          <AIInsightsPanel
            title="Concentration Optimization Insights"
            insights={aiInsights}
          />
        </TabsContent>

        {/* Transfer Rules Tab */}
        <TabsContent value="rules" className="space-y-6">
          {/* Rule Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create Concentration Rule</CardTitle>
              <CardDescription>Define a new automated concentration rule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Source Entity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hq">ZenBank HQ</SelectItem>
                      <SelectItem value="mumbai">ZenBank Mumbai</SelectItem>
                      <SelectItem value="delhi">ZenBank Delhi</SelectItem>
                      <SelectItem value="bangalore">ZenBank Bangalore</SelectItem>
                      <SelectItem value="chennai">ZenBank Chennai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Source Account</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hdfc">HDFC - 1234567890</SelectItem>
                      <SelectItem value="icici">ICICI - 2345678901</SelectItem>
                      <SelectItem value="sbi">SBI - 3456789012</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Target Account</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="treasury">Treasury Header - 0987654321</SelectItem>
                      <SelectItem value="north">Regional North - 1122334455</SelectItem>
                      <SelectItem value="south">Regional South - 5566778899</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-4">
                <div>
                  <Label>Threshold (Cr)</Label>
                  <Input type="number" placeholder="20" />
                </div>
                <div>
                  <Label>Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="twice">Twice Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Schedule Time</Label>
                  <Input type="time" defaultValue="06:00" />
                </div>
                <div className="flex items-end">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-execute" />
                    <Label htmlFor="auto-execute">Auto Execute</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Rule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rules Table */}
          <Section title="All Rules" description="Manage concentration rules">
            <DataTable
              data={concentrationRulesData}
              columns={ruleColumns}
              searchable
              searchPlaceholder="Search rules..."
              pageSize={10}
            />
          </Section>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                Concentration Schedule
              </CardTitle>
              <CardDescription>Upcoming scheduled concentration transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Scheduled Today</div>
                  <div className="text-2xl font-bold">12</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Est. Amount</div>
                  <div className="text-2xl font-bold">₹168 Cr</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Next Execution</div>
                  <div className="text-2xl font-bold">18:00</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Completed Today</div>
                  <div className="text-2xl font-bold">8</div>
                </Card>
              </div>

              <DataTable
                data={scheduleData}
                columns={scheduleColumns}
                searchable
                pageSize={10}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exceptions Tab */}
        <TabsContent value="exceptions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Concentration Exceptions
              </CardTitle>
              <CardDescription>Failed transfers requiring manual review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="p-4 border-red-200">
                  <div className="text-sm text-muted-foreground">Open Exceptions</div>
                  <div className="text-2xl font-bold text-red-600">3</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Resolved (7 days)</div>
                  <div className="text-2xl font-bold">12</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Escalated</div>
                  <div className="text-2xl font-bold text-orange-600">1</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Avg Resolution Time</div>
                  <div className="text-2xl font-bold">2.5 hrs</div>
                </Card>
              </div>

              <DataTable
                data={exceptionsData}
                columns={exceptionColumns}
                searchable
                searchPlaceholder="Search exceptions..."
                pageSize={10}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Concentration Efficiency</CardTitle>
                <CardDescription>Rule performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Success Rate</span>
                    <span className="font-medium">96.5%</span>
                  </div>
                  <Progress value={96.5} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>On-Time Execution</span>
                    <span className="font-medium">98.2%</span>
                  </div>
                  <Progress value={98.2} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span>Idle Cash Reduction</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Summary</CardTitle>
                <CardDescription>January 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Concentrated</span>
                    <span className="font-medium">₹4,250 Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transfers Executed</span>
                    <span className="font-medium">342</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Daily</span>
                    <span className="font-medium">₹142 Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interest Earned</span>
                    <span className="font-medium">₹18.5 Lakhs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exceptions</span>
                    <span className="font-medium">15 (4.4%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <AIInsightsPanel
            title="Analytics Insights"
            insights={aiInsights.slice(0, 2)}
          />
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
              <Filter className="mr-2 h-4 w-4" />
              Filter Rules
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bot className="mr-2 h-4 w-4" />
              AI Optimizer
            </Button>
            <Button size="sm">
              <Play className="mr-2 h-4 w-4" />
              Execute All Pending
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
