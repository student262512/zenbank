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
import { Switch } from '@/components/ui/switch';
import {
  Landmark,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  DollarSign,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
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
  Building2,
  Shield,
  Target,
  Star,
  FileText,
} from 'lucide-react';

// Mock KPI Data
const kpiData = {
  portfolioValue: {
    value: '1,450',
    unit: 'Cr',
    change: 5.2,
    trend: 'up' as const,
    sparkline: [1350, 1380, 1400, 1420, 1435, 1445, 1450],
    subtitle: 'Total investment portfolio',
  },
  averageYield: {
    value: '7.2',
    unit: '%',
    change: 0.3,
    trend: 'up' as const,
    sparkline: [6.8, 6.9, 7.0, 7.0, 7.1, 7.1, 7.2],
    subtitle: 'Weighted average yield',
  },
  expectedReturn: {
    value: '104',
    unit: 'Cr',
    change: 8.5,
    trend: 'up' as const,
    subtitle: 'Annual expected return',
  },
  maturingIn30Days: {
    value: '180',
    unit: 'Cr',
    change: 0,
    trend: 'neutral' as const,
    subtitle: 'Coming up for reinvestment',
  },
  investmentScore: {
    value: '88',
    unit: '/100',
    change: 2,
    trend: 'up' as const,
    sparkline: [82, 83, 84, 85, 86, 87, 88],
    subtitle: 'Portfolio health score',
  },
  unrealizedGain: {
    value: '12',
    unit: 'Cr',
    change: 15.5,
    trend: 'up' as const,
    sparkline: [8, 9, 9.5, 10, 10.5, 11, 12],
    subtitle: 'MTM gain on portfolio',
  },
};

// Mock Portfolio Allocation Data
const portfolioAllocationData = [
  { label: 'Fixed Deposits', value: 520, color: '#3b82f6' },
  { label: 'Liquid Funds', value: 280, color: '#10b981' },
  { label: 'Government Securities', value: 250, color: '#f59e0b' },
  { label: 'Commercial Papers', value: 180, color: '#8b5cf6' },
  { label: 'Corporate Bonds', value: 120, color: '#ec4899' },
  { label: 'Money Market', value: 60, color: '#6366f1' },
  { label: 'Treasury Bills', value: 40, color: '#14b8a6' },
];

// Mock Returns Trend Data (12 months)
const returnsTrendData = [
  { label: 'Feb', value: 7.2 },
  { label: 'Mar', value: 7.5 },
  { label: 'Apr', value: 7.8 },
  { label: 'May', value: 8.2 },
  { label: 'Jun', value: 8.5 },
  { label: 'Jul', value: 8.8 },
  { label: 'Aug', value: 9.2 },
  { label: 'Sep', value: 8.9 },
  { label: 'Oct', value: 8.6 },
  { label: 'Nov', value: 8.4 },
  { label: 'Dec', value: 8.7 },
  { label: 'Jan', value: 9.1 },
];

// Mock Maturity Ladder Data
const maturityLadderData = [
  { label: '0-30d', value: 180, value2: 120 },
  { label: '31-60d', value: 150, value2: 100 },
  { label: '61-90d', value: 220, value2: 140 },
  { label: '91-180d', value: 280, value2: 160 },
  { label: '181-365d', value: 350, value2: 180 },
  { label: '1-2y', value: 170, value2: 90 },
  { label: '2-3y', value: 100, value2: 60 },
];

// Mock Institution Exposure Data
const institutionExposureData = [
  { label: 'HDFC Bank', value: 280 },
  { label: 'ICICI Bank', value: 220 },
  { label: 'SBI', value: 200 },
  { label: 'Axis Bank', value: 180 },
  { label: 'Kotak Bank', value: 150 },
  { label: 'RBI (G-Secs)', value: 250 },
  { label: 'HDFC Ltd', value: 80 },
  { label: 'L&T Finance', value: 50 },
  { label: 'Bajaj Finance', value: 40 },
];

// Investment Portfolio Data
interface InvestmentRecord {
  id: string;
  type: 'Fixed Deposit' | 'Liquid Fund' | 'G-Sec' | 'Commercial Paper' | 'Corporate Bond' | 'Money Market' | 'T-Bill';
  institution: string;
  principal: number;
  currentValue: number;
  interestRate: number;
  yield: number;
  startDate: string;
  maturityDate: string;
  daysToMaturity: number;
  autoRenewal: boolean;
  status: 'Active' | 'Maturing' | 'Matured';
  rating: 'AAA' | 'AA+' | 'AA' | 'A+' | 'A' | 'Sovereign';
}

const investmentTableData: InvestmentRecord[] = [
  { id: 'INV-001', type: 'Fixed Deposit', institution: 'HDFC Bank', principal: 100, currentValue: 103.5, interestRate: 7.0, yield: 7.2, startDate: '2023-07-15', maturityDate: '2024-07-15', daysToMaturity: 182, autoRenewal: true, status: 'Active', rating: 'AAA' },
  { id: 'INV-002', type: 'Fixed Deposit', institution: 'ICICI Bank', principal: 80, currentValue: 82.8, interestRate: 7.25, yield: 7.4, startDate: '2023-09-01', maturityDate: '2024-09-01', daysToMaturity: 230, autoRenewal: true, status: 'Active', rating: 'AAA' },
  { id: 'INV-003', type: 'Liquid Fund', institution: 'HDFC AMC', principal: 150, currentValue: 156.2, interestRate: 0, yield: 6.8, startDate: '2023-01-01', maturityDate: '-', daysToMaturity: 0, autoRenewal: false, status: 'Active', rating: 'AAA' },
  { id: 'INV-004', type: 'G-Sec', institution: 'RBI', principal: 200, currentValue: 208.5, interestRate: 7.1, yield: 7.3, startDate: '2023-04-01', maturityDate: '2033-04-01', daysToMaturity: 3365, autoRenewal: false, status: 'Active', rating: 'Sovereign' },
  { id: 'INV-005', type: 'Commercial Paper', institution: 'HDFC Ltd', principal: 50, currentValue: 51.2, interestRate: 7.8, yield: 8.0, startDate: '2023-10-15', maturityDate: '2024-01-15', daysToMaturity: 0, autoRenewal: false, status: 'Matured', rating: 'AA+' },
  { id: 'INV-006', type: 'Corporate Bond', institution: 'L&T Finance', principal: 75, currentValue: 78.5, interestRate: 8.5, yield: 8.8, startDate: '2023-03-01', maturityDate: '2026-03-01', daysToMaturity: 775, autoRenewal: false, status: 'Active', rating: 'AA' },
  { id: 'INV-007', type: 'Fixed Deposit', institution: 'SBI', principal: 120, currentValue: 124.2, interestRate: 6.8, yield: 7.0, startDate: '2023-05-15', maturityDate: '2024-05-15', daysToMaturity: 121, autoRenewal: true, status: 'Active', rating: 'AAA' },
  { id: 'INV-008', type: 'T-Bill', institution: 'RBI', principal: 40, currentValue: 40.8, interestRate: 6.5, yield: 6.7, startDate: '2023-11-01', maturityDate: '2024-02-01', daysToMaturity: 17, autoRenewal: false, status: 'Maturing', rating: 'Sovereign' },
  { id: 'INV-009', type: 'Fixed Deposit', institution: 'Axis Bank', principal: 90, currentValue: 93.6, interestRate: 7.5, yield: 7.7, startDate: '2023-08-01', maturityDate: '2024-02-01', daysToMaturity: 17, autoRenewal: false, status: 'Maturing', rating: 'AAA' },
  { id: 'INV-010', type: 'Liquid Fund', institution: 'ICICI Prudential', principal: 130, currentValue: 134.8, interestRate: 0, yield: 6.5, startDate: '2023-06-01', maturityDate: '-', daysToMaturity: 0, autoRenewal: false, status: 'Active', rating: 'AAA' },
];

// Maturity Calendar Data
interface MaturityRecord {
  id: string;
  investmentId: string;
  type: string;
  institution: string;
  amount: number;
  maturityDate: string;
  expectedReturn: number;
  action: 'Reinvest' | 'Redeem' | 'Pending';
}

const maturityCalendarData: MaturityRecord[] = [
  { id: 'MAT-001', investmentId: 'INV-008', type: 'T-Bill', institution: 'RBI', amount: 40.8, maturityDate: '2024-02-01', expectedReturn: 0.8, action: 'Reinvest' },
  { id: 'MAT-002', investmentId: 'INV-009', type: 'Fixed Deposit', institution: 'Axis Bank', amount: 93.6, maturityDate: '2024-02-01', expectedReturn: 3.6, action: 'Pending' },
  { id: 'MAT-003', investmentId: 'INV-011', type: 'Commercial Paper', institution: 'Bajaj Finance', amount: 55.5, maturityDate: '2024-02-15', expectedReturn: 2.5, action: 'Redeem' },
  { id: 'MAT-004', investmentId: 'INV-012', type: 'Fixed Deposit', institution: 'Kotak Bank', amount: 65.8, maturityDate: '2024-02-28', expectedReturn: 2.8, action: 'Reinvest' },
  { id: 'MAT-005', investmentId: 'INV-007', type: 'Fixed Deposit', institution: 'SBI', amount: 124.2, maturityDate: '2024-05-15', expectedReturn: 4.2, action: 'Pending' },
];

// AI Insights
const aiInsights = [
  {
    id: '1',
    type: 'recommendation' as const,
    title: 'Reinvestment Opportunity',
    description: 'INR 180 Cr maturing in 30 days. Recommend reinvesting in 1-year FDs at HDFC (7.5%) and ICICI (7.4%) to lock in current high rates before expected RBI rate cuts.',
    impact: 'high' as const,
    confidence: 88,
    category: 'Reinvestment',
  },
  {
    id: '2',
    type: 'alert' as const,
    title: 'Concentration Risk',
    description: 'HDFC Bank exposure at INR 280 Cr (19%) exceeds policy limit of 15%. Consider diversifying INR 60 Cr to SBI or Kotak on next maturity.',
    impact: 'high' as const,
    confidence: 95,
    category: 'Risk Management',
  },
  {
    id: '3',
    type: 'insight' as const,
    title: 'Yield Optimization',
    description: 'Liquid fund allocation (INR 280 Cr) earning 6.5% yield. Short-term FDs offering 7.2%. Consider moving INR 100 Cr to 3-month FDs for additional INR 70 Lakhs annual return.',
    impact: 'medium' as const,
    confidence: 82,
    category: 'Yield Enhancement',
  },
  {
    id: '4',
    type: 'recommendation' as const,
    title: 'Duration Extension',
    description: 'With inverted yield curve normalizing, consider extending duration on INR 200 Cr from 6-month to 12-month instruments for 50 bps yield pickup.',
    impact: 'medium' as const,
    confidence: 75,
    category: 'Strategy',
  },
];

// Investment columns
const investmentColumns: Column<InvestmentRecord>[] = [
  { id: 'id', header: 'ID', accessor: 'id' },
  {
    id: 'type',
    header: 'Type',
    accessor: 'type',
    cell: (row) => <Badge variant="outline">{row.type}</Badge>,
    sortable: true,
  },
  { id: 'institution', header: 'Institution', accessor: 'institution', sortable: true },
  {
    id: 'principal',
    header: 'Principal',
    accessor: 'principal',
    cell: (row) => <span className="font-mono">₹{row.principal} Cr</span>,
    sortable: true,
  },
  {
    id: 'currentValue',
    header: 'Current Value',
    accessor: 'currentValue',
    cell: (row) => <span className="font-mono font-medium">₹{row.currentValue} Cr</span>,
    sortable: true,
  },
  {
    id: 'yield',
    header: 'Yield',
    accessor: 'yield',
    cell: (row) => <span className="font-mono text-green-600">{row.yield}%</span>,
    sortable: true,
  },
  { id: 'maturityDate', header: 'Maturity', accessor: 'maturityDate', sortable: true },
  {
    id: 'daysToMaturity',
    header: 'Days Left',
    accessor: 'daysToMaturity',
    cell: (row) => (
      <span className={row.daysToMaturity <= 30 ? 'text-orange-600 font-medium' : ''}>
        {row.daysToMaturity === 0 ? '-' : `${row.daysToMaturity}d`}
      </span>
    ),
    sortable: true,
  },
  {
    id: 'rating',
    header: 'Rating',
    accessor: 'rating',
    cell: (row) => (
      <Badge variant={row.rating === 'Sovereign' || row.rating === 'AAA' ? 'default' : 'secondary'}>
        {row.rating}
      </Badge>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Active' ? 'default' : row.status === 'Maturing' ? 'secondary' : 'outline'}>
        {row.status === 'Maturing' && <Clock className="mr-1 h-3 w-3" />}
        {row.status}
      </Badge>
    ),
  },
  {
    id: 'autoRenewal',
    header: 'Auto Renew',
    accessor: 'autoRenewal',
    cell: (row) => (
      row.autoRenewal ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <span className="text-muted-foreground">-</span>
    ),
  },
];

// Maturity calendar columns
const maturityColumns: Column<MaturityRecord>[] = [
  { id: 'investmentId', header: 'Investment', accessor: 'investmentId' },
  { id: 'type', header: 'Type', accessor: 'type' },
  { id: 'institution', header: 'Institution', accessor: 'institution', sortable: true },
  {
    id: 'amount',
    header: 'Amount',
    accessor: 'amount',
    cell: (row) => <span className="font-mono font-medium">₹{row.amount} Cr</span>,
    sortable: true,
  },
  { id: 'maturityDate', header: 'Maturity Date', accessor: 'maturityDate', sortable: true },
  {
    id: 'expectedReturn',
    header: 'Interest',
    accessor: 'expectedReturn',
    cell: (row) => <span className="font-mono text-green-600">₹{row.expectedReturn} Cr</span>,
  },
  {
    id: 'action',
    header: 'Action',
    accessor: 'action',
    cell: (row) => (
      <Badge variant={row.action === 'Reinvest' ? 'default' : row.action === 'Redeem' ? 'secondary' : 'outline'}>
        {row.action}
      </Badge>
    ),
  },
];

export default function TreasuryInvestmentsPage() {
  const [activeTab, setActiveTab] = React.useState('portfolio');

  return (
    <PageContainer>
      <PageHeader
        title="Treasury Investments"
        description="Manage investment portfolio across FDs, liquid funds, and securities"
        breadcrumbs={[
          { label: 'Treasury', href: '/treasury' },
          { label: 'Investments', href: '/treasury/investments' },
        ]}
        actions={[
          {
            label: 'New Investment',
            icon: Plus,
            onClick: () => {},
            variant: 'default',
          },
          {
            label: 'Maturity Report',
            icon: Calendar,
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
          title="Portfolio Value"
          value={kpiData.portfolioValue.value}
          unit={kpiData.portfolioValue.unit}
          change={kpiData.portfolioValue.change}
          trend={kpiData.portfolioValue.trend}
          icon={Wallet}
          sparkline={kpiData.portfolioValue.sparkline}
          subtitle={kpiData.portfolioValue.subtitle}
        />
        <KPICard
          title="Average Yield"
          value={kpiData.averageYield.value}
          unit={kpiData.averageYield.unit}
          change={kpiData.averageYield.change}
          trend={kpiData.averageYield.trend}
          icon={Percent}
          sparkline={kpiData.averageYield.sparkline}
          subtitle={kpiData.averageYield.subtitle}
        />
        <KPICard
          title="Expected Return"
          value={kpiData.expectedReturn.value}
          unit={kpiData.expectedReturn.unit}
          change={kpiData.expectedReturn.change}
          trend={kpiData.expectedReturn.trend}
          icon={TrendingUp}
          subtitle={kpiData.expectedReturn.subtitle}
        />
        <KPICard
          title="Maturing in 30 Days"
          value={kpiData.maturingIn30Days.value}
          unit={kpiData.maturingIn30Days.unit}
          change={kpiData.maturingIn30Days.change}
          trend={kpiData.maturingIn30Days.trend}
          icon={Clock}
          subtitle={kpiData.maturingIn30Days.subtitle}
        />
        <KPICard
          title="Investment Score"
          value={kpiData.investmentScore.value}
          unit={kpiData.investmentScore.unit}
          change={kpiData.investmentScore.change}
          trend={kpiData.investmentScore.trend}
          icon={Star}
          sparkline={kpiData.investmentScore.sparkline}
          subtitle={kpiData.investmentScore.subtitle}
        />
        <KPICard
          title="Unrealized Gain"
          value={kpiData.unrealizedGain.value}
          unit={kpiData.unrealizedGain.unit}
          change={kpiData.unrealizedGain.change}
          trend={kpiData.unrealizedGain.trend}
          icon={ArrowUpRight}
          sparkline={kpiData.unrealizedGain.sparkline}
          subtitle={kpiData.unrealizedGain.subtitle}
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="fd">Fixed Deposits</TabsTrigger>
          <TabsTrigger value="funds">Liquid Funds</TabsTrigger>
          <TabsTrigger value="securities">Securities</TabsTrigger>
          <TabsTrigger value="maturity">Maturity Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Yield Analytics</TabsTrigger>
        </TabsList>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-muted-foreground" />
                  Allocation
                </CardTitle>
                <CardDescription>By investment type</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={portfolioAllocationData}
                  height={250}
                  showLegend
                  showTooltip
                />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  Maturity Ladder
                </CardTitle>
                <CardDescription>By time bucket</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={maturityLadderData}
                  height={250}
                  showGrid
                  showTooltip
                  color="#3b82f6"
                />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  Institution Exposure
                </CardTitle>
                <CardDescription>Top institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={institutionExposureData.slice(0, 6)}
                  height={250}
                  showGrid
                  showTooltip
                  color="#10b981"
                  horizontal
                />
              </CardContent>
            </Card>
          </div>

          {/* Investment Table */}
          <Section title="Investment Portfolio" description="All active investments">
            <DataTable
              data={investmentTableData}
              columns={investmentColumns}
              searchable
              searchPlaceholder="Search investments..."
              pageSize={10}
            />
          </Section>

          {/* AI Insights */}
          <AIInsightsPanel
            title="Investment Insights"
            insights={aiInsights}
          />
        </TabsContent>

        {/* Fixed Deposits Tab */}
        <TabsContent value="fd" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Total FDs</div>
              <div className="text-2xl font-bold">₹520 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Active FDs</div>
              <div className="text-2xl font-bold">8</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Avg Rate</div>
              <div className="text-2xl font-bold">7.15%</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Maturing (30d)</div>
              <div className="text-2xl font-bold">₹134 Cr</div>
            </Card>
          </div>

          <Section title="Fixed Deposits" description="Bank fixed deposit holdings">
            <DataTable
              data={investmentTableData.filter(i => i.type === 'Fixed Deposit')}
              columns={investmentColumns}
              searchable
              pageSize={10}
            />
          </Section>

          {/* New FD Form */}
          <Card>
            <CardHeader>
              <CardTitle>New Fixed Deposit</CardTitle>
              <CardDescription>Create a new fixed deposit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label>Bank</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hdfc">HDFC Bank (7.5%)</SelectItem>
                      <SelectItem value="icici">ICICI Bank (7.4%)</SelectItem>
                      <SelectItem value="sbi">SBI (6.8%)</SelectItem>
                      <SelectItem value="axis">Axis Bank (7.25%)</SelectItem>
                      <SelectItem value="kotak">Kotak Bank (7.0%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Principal (Cr)</Label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
                <div>
                  <Label>Tenure</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3m">3 Months</SelectItem>
                      <SelectItem value="6m">6 Months</SelectItem>
                      <SelectItem value="12m">12 Months</SelectItem>
                      <SelectItem value="24m">24 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Interest Rate (%)</Label>
                  <Input type="number" step="0.05" placeholder="7.5" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Interest Payout</Label>
                  <Select defaultValue="maturity">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maturity">At Maturity</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-renew" />
                    <Label htmlFor="auto-renew">Auto Renewal</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create FD
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Liquid Funds Tab */}
        <TabsContent value="funds" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Total in Liquid Funds</div>
              <div className="text-2xl font-bold">₹280 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Active Funds</div>
              <div className="text-2xl font-bold">3</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">7-Day Return</div>
              <div className="text-2xl font-bold text-green-600">6.5%</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">1-Year Return</div>
              <div className="text-2xl font-bold text-green-600">6.8%</div>
            </Card>
          </div>

          <Section title="Liquid Fund Holdings" description="Money market mutual funds">
            <DataTable
              data={investmentTableData.filter(i => i.type === 'Liquid Fund')}
              columns={investmentColumns}
              searchable
              pageSize={10}
            />
          </Section>
        </TabsContent>

        {/* Securities Tab */}
        <TabsContent value="securities" className="space-y-6">
          <div className="grid grid-cols-5 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">G-Secs</div>
              <div className="text-2xl font-bold">₹250 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">T-Bills</div>
              <div className="text-2xl font-bold">₹40 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Commercial Papers</div>
              <div className="text-2xl font-bold">₹180 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Corporate Bonds</div>
              <div className="text-2xl font-bold">₹120 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Money Market</div>
              <div className="text-2xl font-bold">₹60 Cr</div>
            </Card>
          </div>

          <Section title="Securities Portfolio" description="Government and corporate securities">
            <DataTable
              data={investmentTableData.filter(i => ['G-Sec', 'T-Bill', 'Commercial Paper', 'Corporate Bond', 'Money Market'].includes(i.type))}
              columns={investmentColumns}
              searchable
              pageSize={10}
            />
          </Section>
        </TabsContent>

        {/* Maturity Calendar Tab */}
        <TabsContent value="maturity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                Upcoming Maturities
              </CardTitle>
              <CardDescription>Investments maturing in next 180 days</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={maturityLadderData}
                height={300}
                showGrid
                showTooltip
                color="#8b5cf6"
              />
            </CardContent>
          </Card>

          <Section title="Maturity Schedule" description="Upcoming maturities requiring action">
            <DataTable
              data={maturityCalendarData}
              columns={maturityColumns}
              searchable
              pageSize={10}
            />
          </Section>
        </TabsContent>

        {/* Yield Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  Portfolio Yield Trend
                </CardTitle>
                <CardDescription>Monthly weighted average yield</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={returnsTrendData}
                  height={280}
                  showGrid
                  showTooltip
                  color="#10b981"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Yield Comparison</CardTitle>
                <CardDescription>Portfolio vs Benchmarks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Portfolio Yield</span>
                      <span className="font-bold text-green-600">7.2%</span>
                    </div>
                    <Progress value={72} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>SBI FD (1 Year)</span>
                      <span className="font-medium">6.8%</span>
                    </div>
                    <Progress value={68} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>10Y G-Sec</span>
                      <span className="font-medium">7.1%</span>
                    </div>
                    <Progress value={71} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Overnight MIBOR</span>
                      <span className="font-medium">6.5%</span>
                    </div>
                    <Progress value={65} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>AAA Corporate Bond</span>
                      <span className="font-medium">7.8%</span>
                    </div>
                    <Progress value={78} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Yield Analysis Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Yield Analysis Summary</CardTitle>
              <CardDescription>Portfolio performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">YTD Return</div>
                  <div className="text-2xl font-bold text-green-600">₹9.1 Cr</div>
                  <div className="text-xs text-muted-foreground">+12% vs last year</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Expected Annual</div>
                  <div className="text-2xl font-bold">₹104 Cr</div>
                  <div className="text-xs text-muted-foreground">Based on current rates</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div className="text-2xl font-bold">8.2 months</div>
                  <div className="text-xs text-muted-foreground">Weighted average</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground">Credit Quality</div>
                  <div className="text-2xl font-bold">AA+</div>
                  <div className="text-xs text-muted-foreground">Average rating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <AIInsightsPanel
            title="Yield Optimization Insights"
            insights={aiInsights.filter(i => i.category.includes('Yield') || i.category.includes('Strategy'))}
          />
        </TabsContent>
      </Tabs>

      {/* Quick Actions Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh NAV
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bot className="mr-2 h-4 w-4" />
              AI Investment Advisor
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Investment
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
