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
import {
  Shield,
  TrendingDown,
  AlertTriangle,
  AlertCircle,
  Building2,
  Globe,
  Droplets,
  Percent,
  RefreshCcw,
  Download,
  Bot,
  BarChart3,
  Activity,
  CheckCircle2,
  Target,
  Thermometer,
  Leaf,
  Landmark,
  Scale,
} from 'lucide-react';

// Mock KPI Data
const kpiData = {
  overallRiskScore: {
    value: '28',
    unit: '/100',
    change: -8,
    trend: 'down' as const,
    sparkline: [42, 38, 35, 32, 30, 29, 28],
    subtitle: 'Lower is better',
  },
  highRiskItems: {
    value: '5',
    unit: '',
    change: -2,
    trend: 'down' as const,
    subtitle: 'Requiring attention',
  },
  criticalAlerts: {
    value: '2',
    unit: '',
    change: -1,
    trend: 'down' as const,
    subtitle: 'Immediate action needed',
  },
  riskTrend: {
    value: 'Improving',
    unit: '',
    change: 0,
    trend: 'up' as const,
    subtitle: 'vs last quarter',
  },
  varOneDay: {
    value: '24',
    unit: 'Cr',
    change: -5,
    trend: 'down' as const,
    sparkline: [32, 30, 28, 26, 25, 24, 24],
    subtitle: '1-day 99% VaR',
  },
  stressTestImpact: {
    value: '156',
    unit: 'Cr',
    change: -12,
    trend: 'down' as const,
    subtitle: 'Worst case scenario',
  },
};

// Risk Trend Data
const riskTrendData = [
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 42 },
  { label: 'Apr', value: 48 },
  { label: 'May', value: 44 },
  { label: 'Jun', value: 40 },
  { label: 'Jul', value: 38 },
  { label: 'Aug', value: 35 },
  { label: 'Sep', value: 32 },
  { label: 'Oct', value: 30 },
  { label: 'Nov', value: 29 },
  { label: 'Dec', value: 28 },
  { label: 'Jan', value: 28 },
];

// Scenario Impact Data
const scenarioImpactData = [
  { label: 'Interest +100bps', value: 45 },
  { label: 'FX -5%', value: 38 },
  { label: 'Liquidity Crisis', value: 156 },
  { label: 'Credit Default', value: 82 },
  { label: 'Market Crash', value: 120 },
];

// Risk Register Data
interface RiskRecord {
  id: string;
  category: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  probability: 'High' | 'Medium' | 'Low';
  impact: number;
  owner: string;
  status: 'Open' | 'Mitigated' | 'Monitoring' | 'Closed';
  lastReview: string;
}

const riskRegisterData: RiskRecord[] = [
  { id: 'RISK-001', category: 'Liquidity', description: 'Short-term liquidity gap in Q2', severity: 'High', probability: 'Medium', impact: 78, owner: 'Treasury Head', status: 'Mitigated', lastReview: '2024-01-15' },
  { id: 'RISK-002', category: 'Counterparty', description: 'HDFC Bank exposure exceeds limit', severity: 'Medium', probability: 'Low', impact: 45, owner: 'Investment Manager', status: 'Monitoring', lastReview: '2024-01-14' },
  { id: 'RISK-003', category: 'FX', description: 'Unhedged EUR exposure', severity: 'High', probability: 'Medium', impact: 65, owner: 'FX Manager', status: 'Open', lastReview: '2024-01-12' },
  { id: 'RISK-004', category: 'Interest Rate', description: 'Refinancing at higher rates', severity: 'Medium', probability: 'High', impact: 52, owner: 'Debt Manager', status: 'Open', lastReview: '2024-01-10' },
  { id: 'RISK-005', category: 'Settlement', description: 'Bank connectivity issues', severity: 'Low', probability: 'Medium', impact: 25, owner: 'Operations', status: 'Mitigated', lastReview: '2024-01-08' },
  { id: 'RISK-006', category: 'Concentration', description: 'Project Alpha SPV exposure', severity: 'Medium', probability: 'Low', impact: 38, owner: 'Credit Manager', status: 'Monitoring', lastReview: '2024-01-05' },
];

// Risk by Category
const riskByCategoryData = [
  { label: 'Liquidity', value: 78 },
  { label: 'FX', value: 65 },
  { label: 'Interest Rate', value: 52 },
  { label: 'Counterparty', value: 45 },
  { label: 'Concentration', value: 38 },
  { label: 'Climate', value: 42 },
  { label: 'Settlement', value: 25 },
  { label: 'Country', value: 15 },
];

// Counterparty Data
interface CounterpartyRecord {
  id: string;
  name: string;
  type: string;
  exposure: number;
  limit: number;
  utilization: number;
  rating: string;
  status: 'Within Limit' | 'Near Limit' | 'Exceeded';
}

const counterpartyData: CounterpartyRecord[] = [
  { id: 'CP-001', name: 'HDFC Bank', type: 'Bank', exposure: 280, limit: 250, utilization: 112, rating: 'AAA', status: 'Exceeded' },
  { id: 'CP-002', name: 'RBI (G-Secs)', type: 'Government', exposure: 250, limit: 500, utilization: 50, rating: 'Sovereign', status: 'Within Limit' },
  { id: 'CP-003', name: 'ICICI Bank', type: 'Bank', exposure: 220, limit: 250, utilization: 88, rating: 'AAA', status: 'Near Limit' },
  { id: 'CP-004', name: 'SBI', type: 'Bank', exposure: 200, limit: 250, utilization: 80, rating: 'AAA', status: 'Within Limit' },
  { id: 'CP-005', name: 'Axis Bank', type: 'Bank', exposure: 180, limit: 200, utilization: 90, rating: 'AA+', status: 'Near Limit' },
];

// AI Insights
const aiInsights = [
  {
    id: '1',
    type: 'alert' as const,
    title: 'HDFC Bank Limit Breach',
    description: 'HDFC Bank exposure at INR 280 Cr (112% of limit). Move INR 30 Cr to alternative banks on next maturity.',
    impact: 'high' as const,
    confidence: 100,
    category: 'Concentration Risk',
  },
  {
    id: '2',
    type: 'recommendation' as const,
    title: 'Liquidity Buffer Enhancement',
    description: 'Recommend increasing buffer to INR 600 Cr given Q2 payment schedule. Cost: INR 50 Lakhs/year.',
    impact: 'high' as const,
    confidence: 88,
    category: 'Liquidity Risk',
  },
  {
    id: '3',
    type: 'insight' as const,
    title: 'Interest Rate Sensitivity',
    description: 'A 100bps rate increase would impact portfolio by INR 45 Cr. Consider hedging via IRS.',
    impact: 'medium' as const,
    confidence: 82,
    category: 'Interest Rate Risk',
  },
];

// Risk columns
const riskColumns: Column<RiskRecord>[] = [
  { id: 'id', header: 'Risk ID', accessor: 'id' },
  {
    id: 'category',
    header: 'Category',
    accessor: 'category',
    cell: (row) => <Badge variant="outline">{row.category}</Badge>,
    sortable: true,
  },
  { id: 'description', header: 'Description', accessor: 'description' },
  {
    id: 'severity',
    header: 'Severity',
    accessor: 'severity',
    cell: (row) => (
      <Badge variant={row.severity === 'Critical' ? 'destructive' : row.severity === 'High' ? 'secondary' : 'outline'}>
        {row.severity}
      </Badge>
    ),
    sortable: true,
  },
  {
    id: 'impact',
    header: 'Impact (Cr)',
    accessor: 'impact',
    cell: (row) => <span className="font-mono font-medium">₹{row.impact}</span>,
    sortable: true,
  },
  { id: 'owner', header: 'Owner', accessor: 'owner' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Mitigated' ? 'default' : row.status === 'Monitoring' ? 'secondary' : row.status === 'Open' ? 'destructive' : 'outline'}>
        {row.status === 'Mitigated' && <CheckCircle2 className="mr-1 h-3 w-3" />}
        {row.status === 'Open' && <AlertCircle className="mr-1 h-3 w-3" />}
        {row.status}
      </Badge>
    ),
  },
  { id: 'lastReview', header: 'Last Review', accessor: 'lastReview' },
];

// Counterparty columns
const counterpartyColumns: Column<CounterpartyRecord>[] = [
  { id: 'name', header: 'Counterparty', accessor: 'name', sortable: true },
  { id: 'type', header: 'Type', accessor: 'type' },
  {
    id: 'exposure',
    header: 'Exposure',
    accessor: 'exposure',
    cell: (row) => <span className="font-mono font-medium">₹{row.exposure} Cr</span>,
    sortable: true,
  },
  {
    id: 'limit',
    header: 'Limit',
    accessor: 'limit',
    cell: (row) => <span className="font-mono text-muted-foreground">₹{row.limit} Cr</span>,
  },
  {
    id: 'utilization',
    header: 'Utilization',
    accessor: 'utilization',
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Progress value={Math.min(row.utilization, 100)} className="h-2 w-16" />
        <span className={`font-mono text-sm ${row.utilization > 100 ? 'text-red-600' : row.utilization > 85 ? 'text-orange-600' : ''}`}>
          {row.utilization}%
        </span>
      </div>
    ),
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Within Limit' ? 'default' : row.status === 'Near Limit' ? 'secondary' : 'destructive'}>
        {row.status}
      </Badge>
    ),
  },
];

export default function TreasuryRiskPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <PageContainer>
      <PageHeader
        title="Treasury Risk"
        description="Monitor and manage treasury risk across all categories"
        breadcrumbs={[
          { label: 'Treasury', href: '/treasury' },
          { label: 'Risk', href: '/treasury/risk' },
        ]}
        actions={[
          {
            label: 'Risk Report',
            icon: Download,
            onClick: () => {},
            variant: 'default',
          },
          {
            label: 'Stress Test',
            icon: Thermometer,
            onClick: () => {},
            variant: 'outline',
          },
        ]}
      />

      <TreasuryFilters compact />

      {/* KPI Cards */}
      <KPIGrid columns={6}>
        <KPICard
          title="Overall Risk Score"
          value={kpiData.overallRiskScore.value}
          unit={kpiData.overallRiskScore.unit}
          change={kpiData.overallRiskScore.change}
          trend={kpiData.overallRiskScore.trend}
          icon={Shield}
          sparkline={kpiData.overallRiskScore.sparkline}
          subtitle={kpiData.overallRiskScore.subtitle}
        />
        <KPICard
          title="High Risk Items"
          value={kpiData.highRiskItems.value}
          unit={kpiData.highRiskItems.unit}
          change={kpiData.highRiskItems.change}
          trend={kpiData.highRiskItems.trend}
          icon={AlertTriangle}
          subtitle={kpiData.highRiskItems.subtitle}
        />
        <KPICard
          title="Critical Alerts"
          value={kpiData.criticalAlerts.value}
          unit={kpiData.criticalAlerts.unit}
          change={kpiData.criticalAlerts.change}
          trend={kpiData.criticalAlerts.trend}
          icon={AlertCircle}
          subtitle={kpiData.criticalAlerts.subtitle}
        />
        <KPICard
          title="Risk Trend"
          value={kpiData.riskTrend.value}
          unit={kpiData.riskTrend.unit}
          change={kpiData.riskTrend.change}
          trend={kpiData.riskTrend.trend}
          icon={TrendingDown}
          subtitle={kpiData.riskTrend.subtitle}
        />
        <KPICard
          title="VaR (1-day 99%)"
          value={kpiData.varOneDay.value}
          unit={kpiData.varOneDay.unit}
          change={kpiData.varOneDay.change}
          trend={kpiData.varOneDay.trend}
          icon={Target}
          sparkline={kpiData.varOneDay.sparkline}
          subtitle={kpiData.varOneDay.subtitle}
        />
        <KPICard
          title="Stress Test Impact"
          value={kpiData.stressTestImpact.value}
          unit={kpiData.stressTestImpact.unit}
          change={kpiData.stressTestImpact.change}
          trend={kpiData.stressTestImpact.trend}
          icon={Thermometer}
          subtitle={kpiData.stressTestImpact.subtitle}
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Risk Overview</TabsTrigger>
          <TabsTrigger value="liquidity">Liquidity Risk</TabsTrigger>
          <TabsTrigger value="counterparty">Counterparty Risk</TabsTrigger>
          <TabsTrigger value="market">Market Risk</TabsTrigger>
          <TabsTrigger value="concentration">Concentration</TabsTrigger>
          <TabsTrigger value="climate">Climate Risk</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  Risk Score Trend
                </CardTitle>
                <CardDescription>12-month risk score evolution</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart data={riskTrendData} height={280} showGrid showTooltip color="#ef4444" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  Scenario Impact
                </CardTitle>
                <CardDescription>Potential loss by scenario</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart data={scenarioImpactData} height={280} showGrid showTooltip color="#f59e0b" />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskByCategoryData.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium">{item.label}</div>
                    <Progress value={item.value} className="h-3 flex-1" />
                    <div className={`w-16 text-right font-mono ${item.value > 60 ? 'text-red-600' : item.value > 40 ? 'text-orange-600' : 'text-green-600'}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Section title="Risk Register" description="All identified treasury risks">
            <DataTable data={riskRegisterData} columns={riskColumns} searchable pageSize={10} />
          </Section>

          <AIInsightsPanel title="Risk Intelligence" insights={aiInsights} />
        </TabsContent>

        {/* Liquidity Risk Tab */}
        <TabsContent value="liquidity" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Liquidity Buffer</div>
              <div className="text-2xl font-bold">₹500 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Current Ratio</div>
              <div className="text-2xl font-bold">1.45x</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">30-Day Gap</div>
              <div className="text-2xl font-bold text-orange-600">-₹78 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Emergency Lines</div>
              <div className="text-2xl font-bold">₹1,200 Cr</div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                Liquidity Stress Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Normal Operations</span>
                    <Badge>No Stress</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">Coverage: 145%</p>
                </div>
                <div className="p-4 border rounded-lg border-orange-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Moderate Stress</span>
                    <Badge variant="secondary">30% outflow</Badge>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">Coverage: 108%</p>
                </div>
                <div className="p-4 border rounded-lg border-red-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Severe Stress</span>
                    <Badge variant="destructive">50% outflow</Badge>
                  </div>
                  <Progress value={45} className="h-2" />
                  <p className="text-sm text-red-600 mt-2">Coverage: 72% - Emergency lines required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Counterparty Tab */}
        <TabsContent value="counterparty" className="space-y-6">
          <Section title="Counterparty Exposure" description="Exposure limits and utilization">
            <DataTable data={counterpartyData} columns={counterpartyColumns} searchable pageSize={10} />
          </Section>
        </TabsContent>

        {/* Market Risk Tab */}
        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  Interest Rate Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between"><span>Fixed Rate</span><span className="font-mono">₹850 Cr</span></div>
                  <div className="flex justify-between"><span>Floating Rate</span><span className="font-mono">₹350 Cr</span></div>
                  <div className="flex justify-between"><span>Duration</span><span className="font-mono">1.8 years</span></div>
                  <div className="flex justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">DV01 Impact</span>
                    <span className="font-mono text-orange-600">-₹45 Cr</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  FX Risk Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between"><span>Gross Exposure</span><span className="font-mono">M 88</span></div>
                  <div className="flex justify-between"><span>Hedged</span><span className="font-mono text-green-600">M 45</span></div>
                  <div className="flex justify-between"><span>Net Exposure</span><span className="font-mono text-orange-600">M 43</span></div>
                  <div className="flex justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">5% FX Impact</span>
                    <span className="font-mono text-orange-600">-₹38 Cr</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Concentration Tab */}
        <TabsContent value="concentration" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" />Bank Concentration</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between"><span>HDFC Bank</span><span className="font-mono text-red-600">19%</span></div>
                  <div className="flex justify-between"><span>ICICI Bank</span><span className="font-mono">15%</span></div>
                  <div className="flex justify-between"><span>SBI</span><span className="font-mono">14%</span></div>
                  <div className="flex justify-between"><span>Others</span><span className="font-mono">52%</span></div>
                </div>
                <div className="mt-4 p-2 bg-muted rounded text-xs text-muted-foreground">Policy: Max 15% per bank</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Scale className="h-5 w-5" />Instrument</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between"><span>Fixed Deposits</span><span className="font-mono">36%</span></div>
                  <div className="flex justify-between"><span>Liquid Funds</span><span className="font-mono">19%</span></div>
                  <div className="flex justify-between"><span>G-Secs</span><span className="font-mono">17%</span></div>
                  <div className="flex justify-between"><span>Others</span><span className="font-mono">28%</span></div>
                </div>
                <div className="mt-4 p-2 bg-muted rounded text-xs text-muted-foreground">Policy: Max 40% per instrument</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5" />Entity</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between"><span>Project Alpha</span><span className="font-mono text-orange-600">25%</span></div>
                  <div className="flex justify-between"><span>ZenBank HQ</span><span className="font-mono">20%</span></div>
                  <div className="flex justify-between"><span>Mumbai</span><span className="font-mono">15%</span></div>
                  <div className="flex justify-between"><span>Others</span><span className="font-mono">40%</span></div>
                </div>
                <div className="mt-4 p-2 bg-muted rounded text-xs text-muted-foreground">Policy: Max 20% per entity</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Climate Tab */}
        <TabsContent value="climate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-500" />
                Climate Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Physical Risks</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Coastal Flooding</span>
                      <Badge variant="secondary">Medium</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Supply Chain</span>
                      <Badge variant="outline">Low</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Transition Risks</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Carbon Pricing</span>
                      <Badge variant="outline">Low</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <span>Regulatory Changes</span>
                      <Badge variant="secondary">Medium</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Thermometer className="mr-2 h-4 w-4" />
              Stress Test
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bot className="mr-2 h-4 w-4" />
              AI Risk Advisor
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
