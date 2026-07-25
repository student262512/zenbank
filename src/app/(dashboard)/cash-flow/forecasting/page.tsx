'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { LineChart } from '@/components/shared/charts/line-chart';
import { AreaChart } from '@/components/shared/charts/area-chart';
import { BarChart } from '@/components/shared/charts/bar-chart';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { AIInsightCard } from '@/components/shared/ai-insight-card';
import { CashFlowFilters } from '@/components/shared/cash-flow-filters';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  TrendingUp,
  Target,
  GitBranch,
  Play,
  Save,
  Download,
  Settings,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Bot,
} from 'lucide-react';
import { cashForecastingTabs } from '@/config/cash-flow-navigation';

// Mock Forecast Line Items
interface ForecastLineItem {
  id: string;
  category: string;
  type: 'inflow' | 'outflow';
  amount: number;
  date: string;
  probability: number;
  source: string;
  confidence: 'high' | 'medium' | 'low';
}

const forecastLineItems: ForecastLineItem[] = [
  { id: '1', category: 'Customer Collections', type: 'inflow', amount: 65000000, date: '2024-07-20', probability: 95, source: 'Tata Projects Ltd', confidence: 'high' },
  { id: '2', category: 'Customer Collections', type: 'inflow', amount: 42000000, date: '2024-07-22', probability: 90, source: 'Godrej Properties', confidence: 'high' },
  { id: '3', category: 'Vendor Payment', type: 'outflow', amount: 45000000, date: '2024-07-18', probability: 100, source: 'L&T Construction', confidence: 'high' },
  { id: '4', category: 'Customer Collections', type: 'inflow', amount: 38000000, date: '2024-07-25', probability: 75, source: 'DLF Limited', confidence: 'medium' },
  { id: '5', category: 'Loan Repayment', type: 'outflow', amount: 45000000, date: '2024-07-15', probability: 100, source: 'SBI Term Loan', confidence: 'high' },
  { id: '6', category: 'Payroll', type: 'outflow', amount: 85000000, date: '2024-07-22', probability: 100, source: 'Employee Salaries', confidence: 'high' },
  { id: '7', category: 'Booking Advances', type: 'inflow', amount: 28000000, date: '2024-07-28', probability: 85, source: 'New Bookings', confidence: 'medium' },
  { id: '8', category: 'GST Payment', type: 'outflow', amount: 32000000, date: '2024-07-25', probability: 100, source: 'Tax Authority', confidence: 'high' },
  { id: '9', category: 'FD Maturity', type: 'inflow', amount: 100000000, date: '2024-07-28', probability: 100, source: 'HDFC Bank FD', confidence: 'high' },
  { id: '10', category: 'Vendor Payment', type: 'outflow', amount: 18000000, date: '2024-07-20', probability: 100, source: 'ACC Cement', confidence: 'high' },
];

// Mock Forecast Versions
interface ForecastVersion {
  id: string;
  version: string;
  created: string;
  owner: string;
  status: 'active' | 'archived' | 'locked';
  accuracy: number;
}

const forecastVersions: ForecastVersion[] = [
  { id: '1', version: 'v3.2 (Current)', created: '2024-07-15', owner: 'Treasury Team', status: 'active', accuracy: 94.5 },
  { id: '2', version: 'v3.1', created: '2024-07-08', owner: 'Treasury Team', status: 'archived', accuracy: 92.3 },
  { id: '3', version: 'v3.0', created: '2024-07-01', owner: 'Treasury Team', status: 'archived', accuracy: 91.8 },
  { id: '4', version: 'Budget 2024', created: '2024-01-01', owner: 'CFO', status: 'locked', accuracy: 88.2 },
  { id: '5', version: 'v2.9', created: '2024-06-24', owner: 'Treasury Team', status: 'archived', accuracy: 90.5 },
];

// Mock chart data
const forecastVsActualData = Array.from({ length: 30 }, (_, i) => ({
  label: `Day ${i + 1}`,
  value: 2200 + Math.random() * 300 + i * 3,
  value2: 2180 + Math.random() * 280 + i * 3.2,
}));

const scenarioComparisonData = [
  { label: 'Jul', value: 2450, value2: 2580, value3: 2320 },
  { label: 'Aug', value: 2520, value2: 2680, value3: 2350 },
  { label: 'Sep', value: 2600, value2: 2780, value3: 2400 },
  { label: 'Oct', value: 2680, value2: 2900, value3: 2450 },
  { label: 'Nov', value: 2750, value2: 3000, value3: 2480 },
  { label: 'Dec', value: 2850, value2: 3150, value3: 2550 },
];

// AI Insights for forecasting
const forecastInsights = [
  {
    title: 'Forecast Confidence High',
    insight: 'Current 30-day forecast shows 94.5% confidence based on strong historical patterns.',
    type: 'info' as const,
    confidence: 94,
    impact: 'medium' as const,
  },
  {
    title: 'Collection Delay Risk',
    insight: 'DLF payment of ₹38 Cr may be delayed by 10 days. Adjusting forecast probability to 75%.',
    type: 'warning' as const,
    confidence: 87,
    impact: 'high' as const,
  },
  {
    title: 'Seasonal Pattern Detected',
    insight: 'Q3 typically shows 10% lower collections. Recommend adjusting August forecast.',
    type: 'recommendation' as const,
    confidence: 85,
    impact: 'medium' as const,
  },
];

// Table Columns
const lineItemColumns: Column<ForecastLineItem>[] = [
  { id: 'category', header: 'Category', accessor: 'category' },
  {
    id: 'amount',
    header: 'Amount',
    accessor: 'amount',
    cell: (row) => (
      <span className={row.type === 'inflow' ? 'text-emerald-400' : 'text-red-400'}>
        {row.type === 'inflow' ? '+' : '-'}₹{(row.amount / 10000000).toFixed(1)} Cr
      </span>
    ),
    align: 'right',
  },
  { id: 'date', header: 'Date', accessor: 'date' },
  {
    id: 'probability',
    header: 'Probability',
    accessor: (row) => `${row.probability}%`,
    cell: (row) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${row.probability >= 90 ? 'bg-emerald-400' : row.probability >= 70 ? 'bg-yellow-400' : 'bg-red-400'}`}
            style={{ width: `${row.probability}%` }}
          />
        </div>
        <span className="text-xs">{row.probability}%</span>
      </div>
    ),
  },
  { id: 'source', header: 'Source', accessor: 'source' },
  {
    id: 'confidence',
    header: 'Confidence',
    accessor: 'confidence',
    cell: (row) => (
      <Badge variant={row.confidence === 'high' ? 'success' : row.confidence === 'medium' ? 'warning' : 'danger'}>
        {row.confidence}
      </Badge>
    ),
  },
];

const versionColumns: Column<ForecastVersion>[] = [
  { id: 'version', header: 'Version', accessor: 'version' },
  { id: 'created', header: 'Created', accessor: 'created' },
  { id: 'owner', header: 'Owner', accessor: 'owner' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : row.status === 'locked' ? 'warning' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
  {
    id: 'accuracy',
    header: 'Accuracy',
    accessor: (row) => `${row.accuracy}%`,
    cell: (row) => (
      <span className={row.accuracy >= 90 ? 'text-emerald-400' : row.accuracy >= 85 ? 'text-yellow-400' : 'text-red-400'}>
        {row.accuracy}%
      </span>
    ),
  },
];

export default function CashForecastingPage() {
  const [activeTab, setActiveTab] = React.useState('workspace');
  const [includeAI, setIncludeAI] = React.useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = React.useState([80]);

  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader
        title="Cash Forecasting"
        description="AI-powered cash flow forecasts and scenario planning"
        breadcrumbs={[
          { label: 'Cash Flow Intelligence', href: '/cash-flow' },
          { label: 'Forecasting' },
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
          showScenario
          showForecastVersion
          showForecastHorizon
          showDateRange
          compact
        />
      </div>

      {/* Summary KPIs */}
      <Section className="mb-6">
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
            subtitle="Based on AI analysis"
            icon={Shield}
            iconColor="bg-cyan-500/10 text-cyan-400"
          />
          <KPICard
            title="Active Version"
            value="v3.2"
            subtitle="Last updated 2 days ago"
            icon={GitBranch}
            iconColor="bg-purple-500/10 text-purple-400"
          />
        </KPIGrid>
      </Section>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          {cashForecastingTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Forecast Workspace Tab */}
        <TabsContent value="workspace" className="mt-6 space-y-6">
          {/* Forecast Parameters */}
          <Card className="border-slate-800 bg-slate-900/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-white">Forecast Parameters</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label>Forecast Horizon</Label>
                <Select
                  options={[
                    { value: '7d', label: '7 Days' },
                    { value: '30d', label: '30 Days' },
                    { value: '90d', label: '90 Days' },
                    { value: '180d', label: '180 Days' },
                  ]}
                  value="30d"
                  placeholder="Select horizon"
                />
              </div>
              <div className="space-y-2">
                <Label>Forecast Method</Label>
                <Select
                  options={[
                    { value: 'ai', label: 'AI-Powered' },
                    { value: 'historical', label: 'Historical Average' },
                    { value: 'seasonal', label: 'Seasonal Adjusted' },
                  ]}
                  value="ai"
                  placeholder="Select method"
                />
              </div>
              <div className="space-y-2">
                <Label>Confidence Threshold: {confidenceThreshold}%</Label>
                <Slider
                  value={confidenceThreshold}
                  onValueChange={setConfidenceThreshold}
                  min={50}
                  max={100}
                  step={5}
                />
              </div>
              <div className="space-y-2">
                <Label>Include AI Predictions</Label>
                <div className="flex items-center gap-2 h-10">
                  <Switch checked={includeAI} onCheckedChange={setIncludeAI} />
                  <span className="text-sm text-slate-400">{includeAI ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Version
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Play className="mr-2 h-4 w-4" />
                Generate Forecast
              </Button>
            </div>
          </Card>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <LineChart
              data={forecastVsActualData}
              title="Forecast vs Actual"
              subtitle="30-day comparison"
              height={350}
              legend={[
                { label: 'Forecast', color: '#3b82f6' },
                { label: 'Actual', color: '#22d3ee' },
              ]}
              formatValue={(v) => `₹${v.toFixed(0)} Cr`}
            />
            <AreaChart
              data={Array.from({ length: 90 }, (_, i) => ({
                label: `Day ${i + 1}`,
                value: 2300 + Math.random() * 400 + i * 2,
              }))}
              title="Rolling Forecast"
              subtitle="90-day projection"
              height={350}
              formatValue={(v) => `₹${v.toFixed(0)} Cr`}
            />
          </div>

          {/* AI Insights */}
          <Section title="AI Forecast Insights">
            <div className="grid gap-4 md:grid-cols-3">
              {forecastInsights.map((insight, index) => (
                <AIInsightCard key={index} {...insight} />
              ))}
            </div>
          </Section>

          {/* Forecast Line Items */}
          <Section
            title="Forecast Line Items"
            description="Detailed cash flow projections"
            actions={
              <div className="flex items-center gap-2">
                <Badge variant="success">{forecastLineItems.filter(i => i.type === 'inflow').length} Inflows</Badge>
                <Badge variant="danger">{forecastLineItems.filter(i => i.type === 'outflow').length} Outflows</Badge>
              </div>
            }
          >
            <DataTable
              data={forecastLineItems}
              columns={lineItemColumns}
              hoverable
            />
          </Section>
        </TabsContent>

        {/* Scenario Planning Tab */}
        <TabsContent value="scenario" className="mt-6 space-y-6">
          <KPIGrid columns={3}>
            <KPICard
              title="Base Case"
              value="₹2,850 Cr"
              subtitle="6-month projection"
              icon={Target}
              iconColor="bg-blue-500/10 text-blue-400"
              size="lg"
            />
            <KPICard
              title="Optimistic"
              value="₹3,150 Cr"
              subtitle="+10.5% vs base"
              icon={TrendingUp}
              iconColor="bg-emerald-500/10 text-emerald-400"
              size="lg"
            />
            <KPICard
              title="Pessimistic"
              value="₹2,550 Cr"
              subtitle="-10.5% vs base"
              icon={AlertTriangle}
              iconColor="bg-red-500/10 text-red-400"
              size="lg"
            />
          </KPIGrid>

          <BarChart
            data={scenarioComparisonData}
            title="Scenario Comparison"
            subtitle="6-month projections"
            height={400}
            legend={[
              { label: 'Base Case', color: '#3b82f6' },
              { label: 'Optimistic', color: '#10b981' },
              { label: 'Pessimistic', color: '#f87171' },
            ]}
            formatValue={(v) => `₹${v} Cr`}
          />
        </TabsContent>

        {/* Forecast Accuracy Tab */}
        <TabsContent value="accuracy" className="mt-6 space-y-6">
          <KPIGrid columns={4}>
            <KPICard
              title="Overall Accuracy"
              value="94.5%"
              subtitle="Last 90 days"
              change={2.1}
              trend="up"
              icon={Target}
              iconColor="bg-emerald-500/10 text-emerald-400"
              size="lg"
            />
            <KPICard
              title="Inflow Accuracy"
              value="92.8%"
              subtitle="Collection predictions"
              icon={CheckCircle2}
            />
            <KPICard
              title="Outflow Accuracy"
              value="96.2%"
              subtitle="Payment predictions"
              icon={CheckCircle2}
            />
            <KPICard
              title="Model Confidence"
              value="High"
              subtitle="Based on data quality"
              icon={Shield}
            />
          </KPIGrid>
        </TabsContent>

        {/* Forecast Versions Tab */}
        <TabsContent value="versions" className="mt-6 space-y-6">
          <Section
            title="Forecast Versions"
            description="Manage and compare forecast versions"
            actions={
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Save className="mr-2 h-4 w-4" />
                Create New Version
              </Button>
            }
          >
            <DataTable
              data={forecastVersions}
              columns={versionColumns}
              actions={[
                { label: 'View', onClick: () => {} },
                { label: 'Compare', onClick: () => {} },
              ]}
              hoverable
            />
          </Section>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="border-slate-800 bg-slate-900/50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="font-medium text-white">Quick Actions</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              <Play className="mr-2 h-4 w-4" />
              Run Scenario
            </Button>
            <Button variant="outline" size="sm">
              <GitBranch className="mr-2 h-4 w-4" />
              Compare Versions
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
              <Bot className="mr-2 h-4 w-4" />
              Ask AI
            </Button>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
