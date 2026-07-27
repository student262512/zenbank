'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { LineChart } from '@/components/shared/charts/line-chart';
import { BarChart } from '@/components/shared/charts/bar-chart';
import { AreaChart } from '@/components/shared/charts/area-chart';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { AIInsightsPanel } from '@/components/shared/ai-insight-card';
import { TreasuryFilters } from '@/components/shared/treasury-filters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Droplets,
  TrendingUp,
  TrendingDown,
  Shield,
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
  PiggyBank,
  Landmark,
  ArrowLeftRight,
} from 'lucide-react';
import { liquidityManagementTabs } from '@/config/treasury-navigation';

// Mock KPI Data
const kpiData = {
  netLiquidity: {
    value: '2,890',
    unit: 'Cr',
    change: 5.2,
    trend: 'up' as const,
    sparkline: [2650, 2700, 2750, 2800, 2850, 2870, 2890],
    subtitle: 'Available across all entities',
  },
  availableLiquidity: {
    value: '2,450',
    unit: 'Cr',
    change: 4.8,
    trend: 'up' as const,
    sparkline: [2200, 2280, 2350, 2380, 2420, 2440, 2450],
    subtitle: 'Unrestricted cash',
  },
  minimumBuffer: {
    value: '500',
    unit: 'Cr',
    change: 0,
    trend: 'neutral' as const,
    subtitle: 'Required buffer threshold',
  },
  liquidityGap: {
    value: '78',
    unit: 'Cr',
    change: -12.5,
    trend: 'down' as const,
    sparkline: [120, 110, 100, 95, 88, 82, 78],
    subtitle: 'Projected shortfall (30 days)',
  },
  emergencyFunding: {
    value: '1,200',
    unit: 'Cr',
    change: 0,
    trend: 'neutral' as const,
    subtitle: 'Available credit lines',
  },
  liquidityRatio: {
    value: '1.45',
    unit: 'x',
    change: 3.5,
    trend: 'up' as const,
    sparkline: [1.32, 1.35, 1.38, 1.40, 1.42, 1.44, 1.45],
    subtitle: 'Current ratio',
  },
};

// Mock Liquidity Forecast Data (90 days)
const liquidityForecastData = Array.from({ length: 90 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: 2890 + Math.sin(i / 10) * 200 + Math.random() * 100 - i * 2,
  value2: 500, // Buffer line
}));

// Mock Liquidity Trend Data (12 months)
const liquidityTrendData = [
  { label: 'Jan', value: 2200 },
  { label: 'Feb', value: 2350 },
  { label: 'Mar', value: 2180 },
  { label: 'Apr', value: 2420 },
  { label: 'May', value: 2550 },
  { label: 'Jun', value: 2380 },
  { label: 'Jul', value: 2680 },
  { label: 'Aug', value: 2750 },
  { label: 'Sep', value: 2620 },
  { label: 'Oct', value: 2800 },
  { label: 'Nov', value: 2850 },
  { label: 'Dec', value: 2890 },
];

// Mock Entity Liquidity Data
interface EntityLiquidity {
  id: string;
  entity: string;
  entityType: string;
  cashBalance: number;
  netLiquidity: number;
  buffer: number;
  gap: number;
  status: 'healthy' | 'warning' | 'critical';
  recommendation: string;
}

const entityLiquidityData: EntityLiquidity[] = [
  { id: '1', entity: 'ZenBank Corp', entityType: 'Holding', cashBalance: 850000000, netLiquidity: 780000000, buffer: 100000000, gap: 0, status: 'healthy', recommendation: 'Maintain current position' },
  { id: '2', entity: 'Metro Projects SPV', entityType: 'SPV', cashBalance: 420000000, netLiquidity: 380000000, buffer: 50000000, gap: 0, status: 'healthy', recommendation: 'Consider short-term investment' },
  { id: '3', entity: 'Highway Infra Ltd', entityType: 'Subsidiary', cashBalance: 280000000, netLiquidity: 220000000, buffer: 40000000, gap: 0, status: 'warning', recommendation: 'Monitor closely for 15 days' },
  { id: '4', entity: 'Solar Energy SPV', entityType: 'SPV', cashBalance: 180000000, netLiquidity: 150000000, buffer: 30000000, gap: 0, status: 'healthy', recommendation: 'Stable position' },
  { id: '5', entity: 'Coastal Projects', entityType: 'JV', cashBalance: 320000000, netLiquidity: 280000000, buffer: 45000000, gap: 0, status: 'healthy', recommendation: 'Excess liquidity - invest' },
  { id: '6', entity: 'Northern Expressway', entityType: 'SPV', cashBalance: 150000000, netLiquidity: 120000000, buffer: 35000000, gap: 15000000, status: 'warning', recommendation: 'Arrange IC funding' },
  { id: '7', entity: 'Smart City Dev', entityType: 'Subsidiary', cashBalance: 220000000, netLiquidity: 180000000, buffer: 40000000, gap: 0, status: 'healthy', recommendation: 'Maintain buffer' },
  { id: '8', entity: 'Industrial Park SPV', entityType: 'SPV', cashBalance: 95000000, netLiquidity: 65000000, buffer: 25000000, gap: 28000000, status: 'critical', recommendation: 'Urgent: Arrange funding' },
  { id: '9', entity: 'Logistics Hub', entityType: 'JV', cashBalance: 180000000, netLiquidity: 150000000, buffer: 30000000, gap: 0, status: 'healthy', recommendation: 'Stable' },
  { id: '10', entity: 'IT Park Ventures', entityType: 'Subsidiary', cashBalance: 260000000, netLiquidity: 220000000, buffer: 35000000, gap: 0, status: 'healthy', recommendation: 'Consider FD placement' },
  { id: '11', entity: 'Airport City SPV', entityType: 'SPV', cashBalance: 340000000, netLiquidity: 300000000, buffer: 50000000, gap: 0, status: 'healthy', recommendation: 'Strong liquidity position' },
  { id: '12', entity: 'Green Energy Ltd', entityType: 'Subsidiary', cashBalance: 125000000, netLiquidity: 85000000, buffer: 30000000, gap: 35000000, status: 'critical', recommendation: 'Drawdown available facility' },
];

// Mock Funding Gap Waterfall Data
const fundingGapData = [
  { label: 'Opening', value: 2890 },
  { label: 'Collections', value: 450 },
  { label: 'Loan Disbursements', value: 180 },
  { label: 'Vendor Payments', value: -380 },
  { label: 'Payroll', value: -285 },
  { label: 'Loan Repayments', value: -125 },
  { label: 'CapEx', value: -220 },
  { label: 'Closing', value: 2510 },
];

// Mock Funding Options
interface FundingOption {
  id: string;
  source: string;
  type: string;
  available: number;
  utilized: number;
  cost: string;
  tenor: string;
  status: 'available' | 'partially_used' | 'exhausted';
}

const fundingOptions: FundingOption[] = [
  { id: '1', source: 'HDFC Bank CC', type: 'Cash Credit', available: 500000000, utilized: 150000000, cost: '9.5%', tenor: 'Revolving', status: 'available' },
  { id: '2', source: 'SBI Working Capital', type: 'WCDL', available: 400000000, utilized: 280000000, cost: '9.2%', tenor: '12 months', status: 'partially_used' },
  { id: '3', source: 'ICICI Bank OD', type: 'Overdraft', available: 300000000, utilized: 0, cost: '10.0%', tenor: 'On-demand', status: 'available' },
  { id: '4', source: 'Intercompany - ZenBank Corp', type: 'IC Loan', available: 200000000, utilized: 0, cost: '8.5%', tenor: 'Flexible', status: 'available' },
  { id: '5', source: 'Axis Bank Term Loan', type: 'Undrawn Commitment', available: 250000000, utilized: 100000000, cost: '9.8%', tenor: '36 months', status: 'partially_used' },
];

// Mock AI Insights
const aiInsights = [
  {
    title: 'Liquidity Stress Alert',
    insight: 'Industrial Park SPV and Green Energy Ltd are projected to face liquidity shortfall within 15 days. Recommend immediate intercompany funding of ₹63 Cr.',
    type: 'warning' as const,
    confidence: 92,
    impact: 'high' as const,
    impactValue: '-₹63 Cr shortfall',
  },
  {
    title: 'Excess Liquidity Opportunity',
    insight: 'Coastal Projects has ₹35 Cr excess liquidity above buffer. Consider 30-day FD placement at 7.2% yield for additional ₹21 Lakhs interest income.',
    type: 'opportunity' as const,
    confidence: 88,
    impact: 'medium' as const,
    impactValue: '+₹21 L potential',
  },
  {
    title: 'Optimal Cash Pooling',
    insight: 'Restructuring cash pool with Metro Projects as header account could reduce overnight borrowing costs by ₹45 Lakhs annually.',
    type: 'recommendation' as const,
    confidence: 85,
    impact: 'medium' as const,
    impactValue: '₹45 L savings/yr',
  },
  {
    title: 'Collection Delay Risk',
    insight: 'Based on historical patterns, 3 major collections totaling ₹120 Cr may be delayed by 7-10 days. Recommend activating credit line as backup.',
    type: 'trend' as const,
    confidence: 78,
    impact: 'medium' as const,
    impactValue: '₹120 Cr at risk',
  },
];

// Table Columns
const entityColumns: Column<EntityLiquidity>[] = [
  { id: 'entity', header: 'Entity', accessor: 'entity' },
  { id: 'entityType', header: 'Type', accessor: 'entityType' },
  {
    id: 'cashBalance',
    header: 'Cash Balance',
    accessor: (row) => `₹${(row.cashBalance / 10000000).toFixed(1)} Cr`,
    align: 'right',
  },
  {
    id: 'netLiquidity',
    header: 'Net Liquidity',
    accessor: (row) => `₹${(row.netLiquidity / 10000000).toFixed(1)} Cr`,
    align: 'right',
  },
  {
    id: 'buffer',
    header: 'Buffer',
    accessor: (row) => `₹${(row.buffer / 10000000).toFixed(1)} Cr`,
    align: 'right',
  },
  {
    id: 'gap',
    header: 'Gap',
    accessor: (row) => row.gap > 0 ? `-₹${(row.gap / 10000000).toFixed(1)} Cr` : '—',
    cell: (row) => (
      <span className={row.gap > 0 ? 'text-red-400' : 'text-slate-500'}>
        {row.gap > 0 ? `-₹${(row.gap / 10000000).toFixed(1)} Cr` : '—'}
      </span>
    ),
    align: 'right',
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge
        variant={
          row.status === 'healthy' ? 'success' :
          row.status === 'warning' ? 'warning' : 'danger'
        }
      >
        {row.status}
      </Badge>
    ),
  },
  { id: 'recommendation', header: 'AI Recommendation', accessor: 'recommendation' },
];

const fundingColumns: Column<FundingOption>[] = [
  { id: 'source', header: 'Source', accessor: 'source' },
  { id: 'type', header: 'Type', accessor: 'type' },
  {
    id: 'available',
    header: 'Limit',
    accessor: (row) => `₹${(row.available / 10000000).toFixed(0)} Cr`,
    align: 'right',
  },
  {
    id: 'utilized',
    header: 'Utilized',
    accessor: (row) => `₹${(row.utilized / 10000000).toFixed(0)} Cr`,
    align: 'right',
  },
  {
    id: 'remaining',
    header: 'Available',
    accessor: (row) => `₹${((row.available - row.utilized) / 10000000).toFixed(0)} Cr`,
    cell: (row) => (
      <span className="text-emerald-400">
        ₹{((row.available - row.utilized) / 10000000).toFixed(0)} Cr
      </span>
    ),
    align: 'right',
  },
  { id: 'cost', header: 'Cost', accessor: 'cost', align: 'right' },
  { id: 'tenor', header: 'Tenor', accessor: 'tenor' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge
        variant={
          row.status === 'available' ? 'success' :
          row.status === 'partially_used' ? 'secondary' : 'danger'
        }
      >
        {row.status.replace('_', ' ')}
      </Badge>
    ),
  },
];

export default function LiquidityManagementPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <PageContainer>
      <PageHeader
        title="Liquidity Management"
        description="Enterprise liquidity position, forecasting, and funding management"
        breadcrumbs={[
          { label: 'Treasury', href: '/treasury' },
          { label: 'Liquidity Management' },
        ]}
        actions={[
          { label: 'Refresh', icon: RefreshCcw, variant: 'outline' },
          { label: 'Export', icon: Download, variant: 'outline' },
          { label: 'AI Analysis', icon: Bot, variant: 'default' },
        ]}
      />

      <TreasuryFilters compact className="mb-6" />

      {/* KPI Cards */}
      <KPIGrid columns={6} className="mb-6">
        <KPICard
          title="Net Liquidity"
          value={`₹${kpiData.netLiquidity.value} ${kpiData.netLiquidity.unit}`}
          subtitle={kpiData.netLiquidity.subtitle}
          change={kpiData.netLiquidity.change}
          trend={kpiData.netLiquidity.trend}
          icon={Droplets}
          iconColor="bg-blue-500/10 text-blue-400"
          sparkline={kpiData.netLiquidity.sparkline}
          size="md"
        />
        <KPICard
          title="Available Liquidity"
          value={`₹${kpiData.availableLiquidity.value} ${kpiData.availableLiquidity.unit}`}
          subtitle={kpiData.availableLiquidity.subtitle}
          change={kpiData.availableLiquidity.change}
          trend={kpiData.availableLiquidity.trend}
          icon={Wallet}
          iconColor="bg-emerald-500/10 text-emerald-400"
          sparkline={kpiData.availableLiquidity.sparkline}
          size="md"
        />
        <KPICard
          title="Minimum Buffer"
          value={`₹${kpiData.minimumBuffer.value} ${kpiData.minimumBuffer.unit}`}
          subtitle={kpiData.minimumBuffer.subtitle}
          icon={Shield}
          iconColor="bg-purple-500/10 text-purple-400"
          size="md"
        />
        <KPICard
          title="Liquidity Gap"
          value={`₹${kpiData.liquidityGap.value} ${kpiData.liquidityGap.unit}`}
          subtitle={kpiData.liquidityGap.subtitle}
          change={kpiData.liquidityGap.change}
          trend={kpiData.liquidityGap.trend}
          icon={AlertTriangle}
          iconColor="bg-orange-500/10 text-orange-400"
          sparkline={kpiData.liquidityGap.sparkline}
          size="md"
        />
        <KPICard
          title="Emergency Funding"
          value={`₹${kpiData.emergencyFunding.value} ${kpiData.emergencyFunding.unit}`}
          subtitle={kpiData.emergencyFunding.subtitle}
          icon={Landmark}
          iconColor="bg-cyan-500/10 text-cyan-400"
          size="md"
        />
        <KPICard
          title="Liquidity Ratio"
          value={`${kpiData.liquidityRatio.value}${kpiData.liquidityRatio.unit}`}
          subtitle={kpiData.liquidityRatio.subtitle}
          change={kpiData.liquidityRatio.change}
          trend={kpiData.liquidityRatio.trend}
          icon={BarChart3}
          iconColor="bg-indigo-500/10 text-indigo-400"
          sparkline={kpiData.liquidityRatio.sparkline}
          size="md"
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          {liquidityManagementTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            <AreaChart
              data={liquidityForecastData.slice(0, 30)}
              title="30-Day Liquidity Forecast"
              subtitle="Projected liquidity vs minimum buffer"
              height={300}
              legend={[
                { label: 'Projected Liquidity', color: '#3b82f6' },
                { label: 'Minimum Buffer', color: '#ef4444' },
              ]}
              formatValue={(v) => `₹${v.toFixed(0)} Cr`}
            />
            <LineChart
              data={liquidityTrendData}
              title="Liquidity Trend (12 Months)"
              subtitle="Historical net liquidity position"
              height={300}
              legend={[{ label: 'Net Liquidity', color: '#10b981' }]}
              formatValue={(v) => `₹${v} Cr`}
            />
          </div>

          {/* AI Insights */}
          <AIInsightsPanel insights={aiInsights} title="AI Liquidity Insights" />

          {/* Entity Liquidity Table */}
          <Section
            title="Entity Liquidity Position"
            description="Liquidity status across all entities"
            actions={
              <Button variant="outline" size="sm">
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                Optimize Liquidity
              </Button>
            }
          >
            <DataTable
              data={entityLiquidityData}
              columns={entityColumns}
              searchable
              searchPlaceholder="Search entities..."
              hoverable
            />
          </Section>
        </TabsContent>

        {/* Liquidity Position Tab */}
        <TabsContent value="position" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Cash Position by Entity Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'Holding Company', amount: 850, percentage: 29 },
                    { type: 'SPVs', amount: 1185, percentage: 41 },
                    { type: 'Subsidiaries', amount: 605, percentage: 21 },
                    { type: 'Joint Ventures', amount: 250, percentage: 9 },
                  ].map((item) => (
                    <div key={item.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">{item.type}</span>
                        <span className="text-white font-medium">₹{item.amount} Cr ({item.percentage}%)</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Liquidity Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Operations', amount: 1200, color: 'bg-blue-500' },
                    { category: 'Project Funding', amount: 850, color: 'bg-emerald-500' },
                    { category: 'Debt Service', amount: 420, color: 'bg-purple-500' },
                    { category: 'Buffer/Reserve', amount: 500, color: 'bg-orange-500' },
                  ].map((item) => (
                    <div key={item.category} className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-slate-300 text-sm">{item.category}</span>
                          <span className="text-white font-medium text-sm">₹{item.amount} Cr</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Section title="Detailed Entity Position">
            <DataTable
              data={entityLiquidityData}
              columns={entityColumns}
              searchable
              hoverable
            />
          </Section>
        </TabsContent>

        {/* Buffers Tab */}
        <TabsContent value="buffers" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Buffer Adequacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400">185%</div>
                  <div className="text-sm text-slate-400 mt-1">Above minimum requirement</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Current Buffer</span>
                    <span className="text-white">₹925 Cr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Required Buffer</span>
                    <span className="text-white">₹500 Cr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Excess</span>
                    <span className="text-emerald-400">₹425 Cr</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Buffer Coverage Days</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400">45</div>
                  <div className="text-sm text-slate-400 mt-1">Days of operating expenses</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Daily Burn Rate</span>
                    <span className="text-white">₹20.5 Cr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Target Coverage</span>
                    <span className="text-white">30 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Stress Test Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400">28</div>
                  <div className="text-sm text-slate-400 mt-1">Days survival under stress</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Scenario</span>
                    <span className="text-white">50% collection drop</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Risk Level</span>
                    <Badge variant="warning">Medium</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Forecast Tab */}
        <TabsContent value="forecast" className="space-y-6">
          <AreaChart
            data={liquidityForecastData}
            title="90-Day Liquidity Forecast"
            subtitle="AI-powered liquidity projection with confidence intervals"
            height={400}
            legend={[
              { label: 'Projected Liquidity', color: '#3b82f6' },
              { label: 'Minimum Buffer', color: '#ef4444' },
            ]}
            formatValue={(v) => `₹${v.toFixed(0)} Cr`}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Forecast Assumptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: 'Collection Rate', value: '92%', status: 'normal' },
                    { label: 'Payment Timing', value: 'On Schedule', status: 'normal' },
                    { label: 'Loan Disbursements', value: '₹180 Cr', status: 'normal' },
                    { label: 'Major CapEx', value: '₹220 Cr', status: 'warning' },
                    { label: 'Seasonal Impact', value: 'Low', status: 'normal' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">{item.label}</span>
                      <Badge variant={item.status === 'warning' ? 'warning' : 'secondary'}>
                        {item.value}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Forecast Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-emerald-400">94.2%</div>
                    <div className="text-sm text-slate-400">30-day forecast accuracy</div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { period: '7-day', accuracy: 97 },
                      { period: '30-day', accuracy: 94 },
                      { period: '60-day', accuracy: 88 },
                      { period: '90-day', accuracy: 82 },
                    ].map((item) => (
                      <div key={item.period} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">{item.period}</span>
                          <span className="text-white">{item.accuracy}%</span>
                        </div>
                        <Progress value={item.accuracy} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Planning Tab */}
        <TabsContent value="planning" className="space-y-6">
          <BarChart
            data={fundingGapData}
            title="Cash Flow Waterfall"
            subtitle="30-day projected cash movements"
            height={350}
            formatValue={(v) => `₹${v} Cr`}
          />

          <Section title="Liquidity Planning Actions">
            <div className="grid gap-4 lg:grid-cols-3">
              {[
                { action: 'Optimize Cash Pools', impact: '₹45 L savings', priority: 'high', status: 'pending' },
                { action: 'Accelerate Collections', impact: '₹85 Cr faster', priority: 'high', status: 'in_progress' },
                { action: 'Defer Non-Critical CapEx', impact: '₹50 Cr freed', priority: 'medium', status: 'pending' },
                { action: 'Negotiate Payment Terms', impact: '15 days extension', priority: 'medium', status: 'pending' },
                { action: 'Drawdown Credit Line', impact: '₹100 Cr available', priority: 'low', status: 'ready' },
                { action: 'Intercompany Funding', impact: '₹63 Cr transfer', priority: 'high', status: 'pending' },
              ].map((item) => (
                <Card key={item.action} className="bg-slate-900/50 border-slate-800">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{item.action}</h4>
                      <Badge
                        variant={
                          item.priority === 'high' ? 'danger' :
                          item.priority === 'medium' ? 'warning' : 'secondary'
                        }
                      >
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-emerald-400 text-sm mb-2">{item.impact}</p>
                    <Badge variant={item.status === 'in_progress' ? 'success' : 'secondary'}>
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        </TabsContent>

        {/* Funding Tab */}
        <TabsContent value="funding" className="space-y-6">
          <Section
            title="Available Funding Sources"
            description="Credit facilities and funding options"
            actions={
              <Button variant="outline" size="sm">
                <DollarSign className="mr-2 h-4 w-4" />
                Request Funding
              </Button>
            }
          >
            <DataTable
              data={fundingOptions}
              columns={fundingColumns}
              hoverable
            />
          </Section>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Funding Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-white">₹530 Cr</div>
                    <div className="text-sm text-slate-400">Utilized of ₹1,650 Cr available</div>
                  </div>
                  <Progress value={32} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Utilization</span>
                    <span className="text-white">32%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">AI Funding Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-white text-sm font-medium">Optimal Funding Strategy</p>
                        <p className="text-slate-400 text-sm mt-1">
                          Use HDFC Cash Credit (₹350 Cr at 9.5%) instead of Axis Term Loan to save ₹12 L in interest over 30 days.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Bot className="mr-2 h-4 w-4" />
                    Get Detailed Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <Button variant="outline" className="shadow-lg">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Sync Balances
        </Button>
        <Button className="shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          <Sparkles className="mr-2 h-4 w-4" />
          Optimize Liquidity
        </Button>
      </div>
    </PageContainer>
  );
}
