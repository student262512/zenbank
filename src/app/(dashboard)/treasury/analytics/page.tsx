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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  LineChart as LineChartIcon,
  PieChart,
  Download,
  FileText,
  Calendar,
  RefreshCcw,
  Bot,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  Mail,
  Clock,
  Share2,
} from 'lucide-react';

// Mock KPI Dashboard Data
interface KPIRecord {
  id: string;
  name: string;
  category: string;
  currentValue: string;
  previousValue: string;
  variance: number;
  target: string;
  benchmark: string;
  status: 'On Track' | 'At Risk' | 'Off Track';
  trend: 'up' | 'down' | 'neutral';
}

const kpiDashboardData: KPIRecord[] = [
  { id: 'KPI-001', name: 'Net Liquidity', category: 'Liquidity', currentValue: '₹2,890 Cr', previousValue: '₹2,750 Cr', variance: 5.1, target: '₹2,500 Cr', benchmark: '₹2,400 Cr', status: 'On Track', trend: 'up' },
  { id: 'KPI-002', name: 'Current Ratio', category: 'Liquidity', currentValue: '1.45x', previousValue: '1.38x', variance: 5.1, target: '1.2x', benchmark: '1.5x', status: 'On Track', trend: 'up' },
  { id: 'KPI-003', name: 'Cash Conversion Cycle', category: 'Working Capital', currentValue: '45 days', previousValue: '48 days', variance: -6.3, target: '40 days', benchmark: '42 days', status: 'At Risk', trend: 'down' },
  { id: 'KPI-004', name: 'Investment Yield', category: 'Investments', currentValue: '7.2%', previousValue: '6.9%', variance: 4.3, target: '7.0%', benchmark: '6.5%', status: 'On Track', trend: 'up' },
  { id: 'KPI-005', name: 'FX Hedge Coverage', category: 'FX', currentValue: '71%', previousValue: '65%', variance: 9.2, target: '75%', benchmark: '70%', status: 'On Track', trend: 'up' },
  { id: 'KPI-006', name: 'Debt Service Coverage', category: 'Debt', currentValue: '2.8x', previousValue: '2.6x', variance: 7.7, target: '2.0x', benchmark: '2.5x', status: 'On Track', trend: 'up' },
  { id: 'KPI-007', name: 'Interest Coverage', category: 'Debt', currentValue: '4.5x', previousValue: '4.2x', variance: 7.1, target: '3.0x', benchmark: '4.0x', status: 'On Track', trend: 'up' },
  { id: 'KPI-008', name: 'Bank Relationship Score', category: 'Banks', currentValue: '85/100', previousValue: '82/100', variance: 3.7, target: '80/100', benchmark: '85/100', status: 'On Track', trend: 'up' },
  { id: 'KPI-009', name: 'Payment Efficiency', category: 'Payments', currentValue: '98.5%', previousValue: '97.8%', variance: 0.7, target: '98%', benchmark: '99%', status: 'On Track', trend: 'up' },
  { id: 'KPI-010', name: 'Forecast Accuracy', category: 'Forecasting', currentValue: '92%', previousValue: '89%', variance: 3.4, target: '95%', benchmark: '90%', status: 'At Risk', trend: 'up' },
  { id: 'KPI-011', name: 'Risk Score', category: 'Risk', currentValue: '28/100', previousValue: '32/100', variance: -12.5, target: '25/100', benchmark: '30/100', status: 'At Risk', trend: 'down' },
  { id: 'KPI-012', name: 'Treasury Efficiency', category: 'Operations', currentValue: '94%', previousValue: '91%', variance: 3.3, target: '95%', benchmark: '92%', status: 'At Risk', trend: 'up' },
];

// Liquidity KPIs Trend
const liquidityTrendData = [
  { label: 'Feb', value: 2650, value2: 1.32 },
  { label: 'Mar', value: 2700, value2: 1.35 },
  { label: 'Apr', value: 2720, value2: 1.36 },
  { label: 'May', value: 2780, value2: 1.38 },
  { label: 'Jun', value: 2800, value2: 1.40 },
  { label: 'Jul', value: 2820, value2: 1.41 },
  { label: 'Aug', value: 2840, value2: 1.42 },
  { label: 'Sep', value: 2860, value2: 1.43 },
  { label: 'Oct', value: 2875, value2: 1.44 },
  { label: 'Nov', value: 2880, value2: 1.44 },
  { label: 'Dec', value: 2885, value2: 1.45 },
  { label: 'Jan', value: 2890, value2: 1.45 },
];

// Cash Conversion Cycle
const cashConversionData = [
  { label: 'Feb', value: 52 },
  { label: 'Mar', value: 50 },
  { label: 'Apr', value: 51 },
  { label: 'May', value: 49 },
  { label: 'Jun', value: 48 },
  { label: 'Jul', value: 47 },
  { label: 'Aug', value: 46 },
  { label: 'Sep', value: 46 },
  { label: 'Oct', value: 45 },
  { label: 'Nov', value: 45 },
  { label: 'Dec', value: 45 },
  { label: 'Jan', value: 45 },
];

// Bank Performance
const bankPerformanceData = [
  { label: 'HDFC Bank', value: 92 },
  { label: 'ICICI Bank', value: 88 },
  { label: 'SBI', value: 85 },
  { label: 'Axis Bank', value: 82 },
  { label: 'Kotak Bank', value: 80 },
  { label: 'Yes Bank', value: 75 },
  { label: 'IndusInd', value: 72 },
  { label: 'Federal Bank', value: 68 },
];

// Investment Returns
const investmentReturnsData = [
  { label: 'Feb', value: 7.2 },
  { label: 'Mar', value: 7.5 },
  { label: 'Apr', value: 7.8 },
  { label: 'May', value: 8.0 },
  { label: 'Jun', value: 7.6 },
  { label: 'Jul', value: 7.4 },
  { label: 'Aug', value: 7.2 },
  { label: 'Sep', value: 7.0 },
  { label: 'Oct', value: 7.1 },
  { label: 'Nov', value: 7.2 },
  { label: 'Dec', value: 7.2 },
  { label: 'Jan', value: 7.2 },
];

// Debt Trend
const debtTrendData = [
  { label: 'Feb', value: 1250 },
  { label: 'Mar', value: 1230 },
  { label: 'Apr', value: 1210 },
  { label: 'May', value: 1200 },
  { label: 'Jun', value: 1180 },
  { label: 'Jul', value: 1160 },
  { label: 'Aug', value: 1140 },
  { label: 'Sep', value: 1120 },
  { label: 'Oct', value: 1100 },
  { label: 'Nov', value: 1080 },
  { label: 'Dec', value: 1060 },
  { label: 'Jan', value: 1050 },
];

// Report Templates
interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  frequency: string;
  lastGenerated: string;
  nextScheduled: string;
  recipients: number;
  status: 'Active' | 'Paused';
}

const reportTemplates: ReportTemplate[] = [
  { id: 'RPT-001', name: 'Daily Treasury Dashboard', description: 'Key treasury metrics and cash position', frequency: 'Daily', lastGenerated: '2024-01-15 06:00', nextScheduled: '2024-01-16 06:00', recipients: 5, status: 'Active' },
  { id: 'RPT-002', name: 'Weekly Liquidity Report', description: 'Liquidity analysis and forecasts', frequency: 'Weekly', lastGenerated: '2024-01-12 09:00', nextScheduled: '2024-01-19 09:00', recipients: 8, status: 'Active' },
  { id: 'RPT-003', name: 'Monthly MIS', description: 'Comprehensive treasury MIS', frequency: 'Monthly', lastGenerated: '2024-01-01 10:00', nextScheduled: '2024-02-01 10:00', recipients: 15, status: 'Active' },
  { id: 'RPT-004', name: 'Board Treasury Report', description: 'Executive summary for board', frequency: 'Quarterly', lastGenerated: '2024-01-05 10:00', nextScheduled: '2024-04-05 10:00', recipients: 12, status: 'Active' },
  { id: 'RPT-005', name: 'Risk Analytics', description: 'Treasury risk metrics and analysis', frequency: 'Weekly', lastGenerated: '2024-01-12 14:00', nextScheduled: '2024-01-19 14:00', recipients: 6, status: 'Active' },
];

// AI Insights
const aiInsights = [
  {
    id: '1',
    type: 'insight' as const,
    title: 'Liquidity Improvement',
    insight: 'Net liquidity has improved by 8.7% over the past quarter. Primary drivers: improved collections (+12%) and optimized payment timing.',
    impact: 'high' as const,
    confidence: 92,
    category: 'Liquidity',
  },
  {
    id: '2',
    type: 'recommendation' as const,
    title: 'CCC Optimization',
    insight: 'Cash Conversion Cycle at 45 days is 5 days above target. Focus on DSO reduction: implement early payment discounts for top 10 customers.',
    impact: 'medium' as const,
    confidence: 85,
    category: 'Working Capital',
  },
  {
    id: '3',
    type: 'warning' as const,
    title: 'Forecast Accuracy Gap',
    insight: 'Forecast accuracy at 92% vs 95% target. Primary variance driver: unplanned CapEx in Q4. Recommend CapEx pipeline integration.',
    impact: 'medium' as const,
    confidence: 88,
    category: 'Forecasting',
  },
];

// KPI columns
const kpiColumns: Column<KPIRecord>[] = [
  { id: 'name', header: 'KPI', accessor: 'name', sortable: true },
  {
    id: 'category',
    header: 'Category',
    accessor: 'category',
    cell: (row) => <Badge variant="outline">{row.category}</Badge>,
    sortable: true,
  },
  { id: 'currentValue', header: 'Current', accessor: 'currentValue' },
  { id: 'previousValue', header: 'Previous', accessor: 'previousValue' },
  {
    id: 'variance',
    header: 'Variance',
    accessor: 'variance',
    cell: (row) => (
      <span className={`font-mono flex items-center ${row.variance > 0 ? 'text-green-600' : row.variance < 0 ? 'text-red-600' : ''}`}>
        {row.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : row.trend === 'down' ? <ArrowDownRight className="h-3 w-3 mr-1" /> : null}
        {row.variance > 0 ? '+' : ''}{row.variance}%
      </span>
    ),
    sortable: true,
  },
  { id: 'target', header: 'Target', accessor: 'target' },
  { id: 'benchmark', header: 'Benchmark', accessor: 'benchmark' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'On Track' ? 'default' : row.status === 'At Risk' ? 'secondary' : 'danger'}>
        {row.status === 'On Track' && <CheckCircle2 className="mr-1 h-3 w-3" />}
        {row.status === 'At Risk' && <AlertCircle className="mr-1 h-3 w-3" />}
        {row.status}
      </Badge>
    ),
  },
];

// Report columns
const reportColumns: Column<ReportTemplate>[] = [
  { id: 'name', header: 'Report', accessor: 'name', sortable: true },
  { id: 'description', header: 'Description', accessor: 'description' },
  {
    id: 'frequency',
    header: 'Frequency',
    accessor: 'frequency',
    cell: (row) => <Badge variant="outline">{row.frequency}</Badge>,
  },
  { id: 'lastGenerated', header: 'Last Generated', accessor: 'lastGenerated' },
  { id: 'nextScheduled', header: 'Next Scheduled', accessor: 'nextScheduled' },
  {
    id: 'recipients',
    header: 'Recipients',
    accessor: 'recipients',
    cell: (row) => (
      <span className="flex items-center">
        <Mail className="h-3 w-3 mr-1" />
        {row.recipients}
      </span>
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
];

export default function TreasuryAnalyticsPage() {
  const [activeTab, setActiveTab] = React.useState('kpis');

  return (
    <PageContainer>
      <PageHeader
        title="Treasury Analytics"
        description="KPIs, benchmarking, variance analysis, and executive reports"
        breadcrumbs={[
          { label: 'Treasury', href: '/treasury' },
          { label: 'Analytics', href: '/treasury/analytics' },
        ]}
        actions={[
          {
            label: 'Generate Report',
            icon: FileText,
            onClick: () => {},
            variant: 'default',
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

      {/* Summary KPIs */}
      <KPIGrid columns={4}>
        <KPICard
          title="KPIs On Track"
          value="9"
          changeUnit="/12"
          change={8.3}
          trend="up"
          icon={CheckCircle2}
          subtitle="75% of KPIs meeting targets"
        />
        <KPICard
          title="KPIs At Risk"
          value="3"
          changeUnit=""
          change={-25}
          trend="down"
          icon={AlertCircle}
          subtitle="Requires attention"
        />
        <KPICard
          title="Avg Variance"
          value="+3.2"
          changeUnit="%"
          change={1.5}
          trend="up"
          icon={TrendingUp}
          subtitle="Above targets"
        />
        <KPICard
          title="Reports Generated"
          value="28"
          changeUnit=""
          change={12}
          trend="up"
          icon={FileText}
          subtitle="This month"
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="kpis">KPI Dashboard</TabsTrigger>
          <TabsTrigger value="benchmarking">Benchmarking</TabsTrigger>
          <TabsTrigger value="variance">Variance Analysis</TabsTrigger>
          <TabsTrigger value="accuracy">Forecast Accuracy</TabsTrigger>
          <TabsTrigger value="reports">Executive Reports</TabsTrigger>
        </TabsList>

        {/* KPI Dashboard Tab */}
        <TabsContent value="kpis" className="space-y-6">
          <Section title="Treasury KPIs" description="All key performance indicators">
            <DataTable data={kpiDashboardData} columns={kpiColumns} searchable />
          </Section>

          <AIInsightsPanel title="KPI Insights" insights={aiInsights} />
        </TabsContent>

        {/* Benchmarking Tab */}
        <TabsContent value="benchmarking" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  Liquidity Metrics
                </CardTitle>
                <CardDescription>Net liquidity and current ratio trend</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart data={liquidityTrendData} height={280} showGrid showTooltip />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-muted-foreground" />
                  Cash Conversion Cycle
                </CardTitle>
                <CardDescription>Days trend (lower is better)</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart data={cashConversionData} height={280} showGrid showTooltip />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  Bank Performance
                </CardTitle>
                <CardDescription>Service quality scores</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart data={bankPerformanceData} height={280} showGrid />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  Investment Returns
                </CardTitle>
                <CardDescription>Weighted average yield %</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart data={investmentReturnsData} height={280} showGrid showTooltip />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Variance Analysis Tab */}
        <TabsContent value="variance" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Liquidity Variance</CardTitle>
                <CardDescription>Current vs Budget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between"><span>Net Liquidity</span><span className="font-mono text-green-600">+₹390 Cr</span></div>
                  <div className="flex justify-between"><span>Available Cash</span><span className="font-mono text-green-600">+₹250 Cr</span></div>
                  <div className="flex justify-between"><span>Buffer</span><span className="font-mono">₹0</span></div>
                  <Progress value={115} className="h-2" />
                  <p className="text-sm text-muted-foreground">115% of budget</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Investment Variance</CardTitle>
                <CardDescription>Current vs Budget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between"><span>Portfolio Value</span><span className="font-mono text-green-600">+₹50 Cr</span></div>
                  <div className="flex justify-between"><span>Yield</span><span className="font-mono text-green-600">+0.2%</span></div>
                  <div className="flex justify-between"><span>Returns</span><span className="font-mono text-green-600">+₹4 Cr</span></div>
                  <Progress value={105} className="h-2" />
                  <p className="text-sm text-muted-foreground">105% of budget</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Debt Variance</CardTitle>
                <CardDescription>Current vs Budget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between"><span>Total Debt</span><span className="font-mono text-green-600">-₹50 Cr</span></div>
                  <div className="flex justify-between"><span>Interest Cost</span><span className="font-mono text-green-600">-₹2 Cr</span></div>
                  <div className="flex justify-between"><span>Avg Rate</span><span className="font-mono text-red-600">+0.15%</span></div>
                  <Progress value={95} className="h-2" />
                  <p className="text-sm text-muted-foreground">95% of budget (favorable)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-muted-foreground" />
                Debt Trend
              </CardTitle>
              <CardDescription>Outstanding debt over 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart data={debtTrendData} height={300} showGrid showTooltip />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forecast Accuracy Tab */}
        <TabsContent value="accuracy" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">30-Day Accuracy</div>
              <div className="text-2xl font-bold">94%</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">60-Day Accuracy</div>
              <div className="text-2xl font-bold">91%</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">90-Day Accuracy</div>
              <div className="text-2xl font-bold">88%</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Target</div>
              <div className="text-2xl font-bold">95%</div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Forecast vs Actual</CardTitle>
              <CardDescription>Last 12 months comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Cash Inflows</span>
                    <span className="font-mono">94% accurate</span>
                  </div>
                  <div className="flex gap-2">
                    <Progress value={94} className="h-3 flex-1" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Cash Outflows</span>
                    <span className="font-mono">92% accurate</span>
                  </div>
                  <Progress value={92} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Net Cash Flow</span>
                    <span className="font-mono">89% accurate</span>
                  </div>
                  <Progress value={89} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Closing Balance</span>
                    <span className="font-mono">91% accurate</span>
                  </div>
                  <Progress value={91} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Executive Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Report</CardTitle>
              <CardDescription>Create a new executive report</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Treasury Dashboard</SelectItem>
                      <SelectItem value="weekly">Weekly Liquidity Report</SelectItem>
                      <SelectItem value="monthly">Monthly MIS</SelectItem>
                      <SelectItem value="board">Board Treasury Report</SelectItem>
                      <SelectItem value="risk">Risk Analytics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="ppt">PowerPoint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select defaultValue="current">
                    <SelectTrigger>
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Period</SelectItem>
                      <SelectItem value="mtd">Month to Date</SelectItem>
                      <SelectItem value="qtd">Quarter to Date</SelectItem>
                      <SelectItem value="ytd">Year to Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Generate
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Section title="Scheduled Reports" description="Automated report generation">
            <DataTable data={reportTemplates} columns={reportColumns} searchable />
          </Section>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Report
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bot className="mr-2 h-4 w-4" />
              AI Analytics
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
