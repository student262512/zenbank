'use client';

import { useState } from 'react';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { PageHeader } from '@/components/layout/page-header';
import { TreasuryFilters } from '@/components/shared/treasury-filters';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { LineChart, BarChart, AreaChart } from '@/components/shared/charts';
import { AIInsightsPanel } from '@/components/shared/ai-insight-card';
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Percent,
  Clock,
  Target,
  Zap,
  PlayCircle,
  Save,
  Copy,
  FileBarChart,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
  Download,
  Share2,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Info,
  Lightbulb,
  BarChart3,
  LineChartIcon,
  Activity
} from 'lucide-react';

// Types
interface ScenarioAssumption {
  id: string;
  parameter: string;
  category: string;
  baseValue: string;
  scenarioValue: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  impact: 'high' | 'medium' | 'low';
}

interface ScenarioResult {
  id: string;
  metric: string;
  category: string;
  currentValue: string;
  projectedValue: string;
  impact: string;
  impactType: 'positive' | 'negative' | 'neutral';
  confidence: number;
}

interface ScenarioRecommendation {
  id: string;
  action: string;
  category: string;
  impact: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  owner: string;
  timeline: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface SavedScenario {
  id: string;
  name: string;
  type: string;
  createdDate: string;
  lastRun: string;
  score: number;
  status: 'active' | 'draft' | 'archived';
}

// Mock Data
const kpiData = {
  scenarioScore: { value: 72, trend: -5, label: 'Scenario Score' },
  financialImpact: { value: '-₹156 Cr', trend: -8.2, label: 'Financial Impact' },
  liquidityImpact: { value: '-₹89 Cr', trend: -5.4, label: 'Liquidity Impact' },
  riskImpact: { value: '+15 pts', trend: 15, label: 'Risk Impact' },
  probability: { value: '35%', trend: 0, label: 'Probability' },
  recoveryTime: { value: '6 months', trend: 0, label: 'Recovery Time' }
};

const scenarioAssumptions: ScenarioAssumption[] = [
  { id: '1', parameter: 'Interest Rate', category: 'Market', baseValue: '7.25%', scenarioValue: '8.50%', change: '+125 bps', changeType: 'increase', impact: 'high' },
  { id: '2', parameter: 'USD/INR Rate', category: 'FX', baseValue: '83.25', scenarioValue: '87.50', change: '+5.1%', changeType: 'increase', impact: 'high' },
  { id: '3', parameter: 'Sales Growth', category: 'Revenue', baseValue: '15%', scenarioValue: '8%', change: '-7%', changeType: 'decrease', impact: 'high' },
  { id: '4', parameter: 'Raw Material Cost', category: 'Cost', baseValue: '₹450/unit', scenarioValue: '₹495/unit', change: '+10%', changeType: 'increase', impact: 'medium' },
  { id: '5', parameter: 'Collection Days', category: 'Working Capital', baseValue: '45 days', scenarioValue: '60 days', change: '+15 days', changeType: 'increase', impact: 'high' },
  { id: '6', parameter: 'Payment Days', category: 'Working Capital', baseValue: '30 days', scenarioValue: '25 days', change: '-5 days', changeType: 'decrease', impact: 'medium' },
  { id: '7', parameter: 'Credit Availability', category: 'Funding', baseValue: '₹500 Cr', scenarioValue: '₹400 Cr', change: '-20%', changeType: 'decrease', impact: 'high' },
  { id: '8', parameter: 'Project Delays', category: 'Operations', baseValue: '0 months', scenarioValue: '3 months', change: '+3 months', changeType: 'increase', impact: 'medium' },
  { id: '9', parameter: 'Inflation Rate', category: 'Macro', baseValue: '5.5%', scenarioValue: '7.0%', change: '+150 bps', changeType: 'increase', impact: 'medium' },
  { id: '10', parameter: 'Tax Rate', category: 'Regulatory', baseValue: '25%', scenarioValue: '25%', change: '0%', changeType: 'neutral', impact: 'low' },
  { id: '11', parameter: 'Labor Cost', category: 'Cost', baseValue: '₹25 Cr/month', scenarioValue: '₹27.5 Cr/month', change: '+10%', changeType: 'increase', impact: 'medium' },
  { id: '12', parameter: 'Energy Cost', category: 'Cost', baseValue: '₹8/kWh', scenarioValue: '₹9.5/kWh', change: '+18.75%', changeType: 'increase', impact: 'medium' }
];

const scenarioResults: ScenarioResult[] = [
  { id: '1', metric: 'Net Cash Position', category: 'Liquidity', currentValue: '₹2,890 Cr', projectedValue: '₹2,734 Cr', impact: '-₹156 Cr', impactType: 'negative', confidence: 85 },
  { id: '2', metric: 'Available Liquidity', category: 'Liquidity', currentValue: '₹2,450 Cr', projectedValue: '₹2,361 Cr', impact: '-₹89 Cr', impactType: 'negative', confidence: 82 },
  { id: '3', metric: 'Debt Service Coverage', category: 'Solvency', currentValue: '2.8x', projectedValue: '2.3x', impact: '-0.5x', impactType: 'negative', confidence: 78 },
  { id: '4', metric: 'Interest Expense', category: 'Cost', currentValue: '₹145 Cr', projectedValue: '₹168 Cr', impact: '+₹23 Cr', impactType: 'negative', confidence: 90 },
  { id: '5', metric: 'FX Loss', category: 'Risk', currentValue: '₹12 Cr', projectedValue: '₹28 Cr', impact: '+₹16 Cr', impactType: 'negative', confidence: 75 },
  { id: '6', metric: 'Working Capital', category: 'Operations', currentValue: '₹1,200 Cr', projectedValue: '₹1,380 Cr', impact: '+₹180 Cr', impactType: 'negative', confidence: 80 },
  { id: '7', metric: 'EBITDA Margin', category: 'Profitability', currentValue: '18.5%', projectedValue: '15.2%', impact: '-3.3%', impactType: 'negative', confidence: 72 },
  { id: '8', metric: 'Cash Conversion Cycle', category: 'Efficiency', currentValue: '45 days', projectedValue: '58 days', impact: '+13 days', impactType: 'negative', confidence: 85 },
  { id: '9', metric: 'Credit Utilization', category: 'Funding', currentValue: '65%', projectedValue: '82%', impact: '+17%', impactType: 'negative', confidence: 88 },
  { id: '10', metric: 'Liquidity Ratio', category: 'Liquidity', currentValue: '1.45x', projectedValue: '1.28x', impact: '-0.17x', impactType: 'negative', confidence: 84 },
  { id: '11', metric: 'Operating Cash Flow', category: 'Cash Flow', currentValue: '₹320 Cr/Q', projectedValue: '₹245 Cr/Q', impact: '-₹75 Cr/Q', impactType: 'negative', confidence: 76 },
  { id: '12', metric: 'Investment Returns', category: 'Investments', currentValue: '7.2%', projectedValue: '7.8%', impact: '+0.6%', impactType: 'positive', confidence: 70 },
  { id: '13', metric: 'Hedge Effectiveness', category: 'Risk', currentValue: '85%', projectedValue: '78%', impact: '-7%', impactType: 'negative', confidence: 72 },
  { id: '14', metric: 'Bank Relationship Score', category: 'Banking', currentValue: '88/100', projectedValue: '82/100', impact: '-6 pts', impactType: 'negative', confidence: 65 },
  { id: '15', metric: 'Treasury Efficiency', category: 'Operations', currentValue: '92%', projectedValue: '85%', impact: '-7%', impactType: 'negative', confidence: 68 }
];

const scenarioRecommendations: ScenarioRecommendation[] = [
  { id: '1', action: 'Increase FX hedge coverage to 85% for USD exposure', category: 'FX Risk', impact: 'Reduce FX loss by ₹8 Cr', priority: 'critical', owner: 'Treasury', timeline: 'Immediate', status: 'pending' },
  { id: '2', action: 'Negotiate 15-day extension with top 5 suppliers', category: 'Working Capital', impact: 'Improve cash by ₹45 Cr', priority: 'high', owner: 'Procurement', timeline: '2 weeks', status: 'in_progress' },
  { id: '3', action: 'Accelerate collections with early payment discounts', category: 'Collections', impact: 'Reduce DSO by 5 days', priority: 'high', owner: 'Finance', timeline: '1 month', status: 'pending' },
  { id: '4', action: 'Draw down ₹100 Cr from committed credit line', category: 'Liquidity', impact: 'Build liquidity buffer', priority: 'high', owner: 'Treasury', timeline: 'Immediate', status: 'pending' },
  { id: '5', action: 'Convert ₹50 Cr floating debt to fixed rate', category: 'Interest Rate', impact: 'Cap interest cost', priority: 'medium', owner: 'Treasury', timeline: '2 weeks', status: 'pending' },
  { id: '6', action: 'Defer non-critical capex by 3 months', category: 'Cash Conservation', impact: 'Preserve ₹35 Cr', priority: 'medium', owner: 'CFO', timeline: '1 week', status: 'pending' },
  { id: '7', action: 'Renegotiate bank facility pricing', category: 'Cost Reduction', impact: 'Save ₹3 Cr annually', priority: 'medium', owner: 'Treasury', timeline: '1 month', status: 'pending' },
  { id: '8', action: 'Activate intercompany funding from surplus entities', category: 'Funding', impact: 'Access ₹80 Cr internally', priority: 'high', owner: 'Treasury', timeline: '1 week', status: 'in_progress' }
];

const savedScenarios: SavedScenario[] = [
  { id: '1', name: 'Interest Rate Shock +200bps', type: 'Interest Rate', createdDate: '2024-01-15', lastRun: '2024-01-20', score: 65, status: 'active' },
  { id: '2', name: 'USD/INR at 90', type: 'FX Shock', createdDate: '2024-01-10', lastRun: '2024-01-18', score: 58, status: 'active' },
  { id: '3', name: 'Sales Slowdown 20%', type: 'Revenue', createdDate: '2024-01-08', lastRun: '2024-01-19', score: 52, status: 'active' },
  { id: '4', name: 'Combined Stress Test', type: 'Combined', createdDate: '2024-01-05', lastRun: '2024-01-20', score: 45, status: 'active' },
  { id: '5', name: 'Best Case FY25', type: 'Planning', createdDate: '2023-12-15', lastRun: '2024-01-15', score: 88, status: 'active' },
  { id: '6', name: 'Worst Case FY25', type: 'Planning', createdDate: '2023-12-15', lastRun: '2024-01-15', score: 38, status: 'active' }
];

// Chart Data
const cashProjectionData = [
  { month: 'Jan', base: 2890, scenario: 2890 },
  { month: 'Feb', base: 2920, scenario: 2850 },
  { month: 'Mar', base: 2980, scenario: 2800 },
  { month: 'Apr', base: 3050, scenario: 2780 },
  { month: 'May', base: 3100, scenario: 2750 },
  { month: 'Jun', base: 3180, scenario: 2720 },
  { month: 'Jul', base: 3250, scenario: 2700 },
  { month: 'Aug', base: 3300, scenario: 2680 },
  { month: 'Sep', base: 3380, scenario: 2700 },
  { month: 'Oct', base: 3450, scenario: 2720 },
  { month: 'Nov', base: 3520, scenario: 2750 },
  { month: 'Dec', base: 3600, scenario: 2800 }
];

const liquidityCurveData = [
  { month: 'Jan', liquidity: 2450, minimum: 500, target: 800 },
  { month: 'Feb', liquidity: 2400, minimum: 500, target: 800 },
  { month: 'Mar', liquidity: 2320, minimum: 500, target: 800 },
  { month: 'Apr', liquidity: 2280, minimum: 500, target: 800 },
  { month: 'May', liquidity: 2200, minimum: 500, target: 800 },
  { month: 'Jun', liquidity: 2150, minimum: 500, target: 800 },
  { month: 'Jul', liquidity: 2100, minimum: 500, target: 800 },
  { month: 'Aug', liquidity: 2050, minimum: 500, target: 800 },
  { month: 'Sep', liquidity: 2100, minimum: 500, target: 800 },
  { month: 'Oct', liquidity: 2150, minimum: 500, target: 800 },
  { month: 'Nov', liquidity: 2200, minimum: 500, target: 800 },
  { month: 'Dec', liquidity: 2280, minimum: 500, target: 800 }
];

const scenarioComparisonData = [
  { month: 'Jan', bestCase: 2890, expected: 2890, worstCase: 2890 },
  { month: 'Feb', bestCase: 2980, expected: 2920, worstCase: 2800 },
  { month: 'Mar', bestCase: 3100, expected: 2980, worstCase: 2650 },
  { month: 'Apr', bestCase: 3250, expected: 3050, worstCase: 2500 },
  { month: 'May', bestCase: 3400, expected: 3100, worstCase: 2400 },
  { month: 'Jun', bestCase: 3580, expected: 3180, worstCase: 2300 },
  { month: 'Jul', bestCase: 3750, expected: 3250, worstCase: 2250 },
  { month: 'Aug', bestCase: 3920, expected: 3300, worstCase: 2200 },
  { month: 'Sep', bestCase: 4100, expected: 3380, worstCase: 2280 },
  { month: 'Oct', bestCase: 4280, expected: 3450, worstCase: 2350 },
  { month: 'Nov', bestCase: 4480, expected: 3520, worstCase: 2420 },
  { month: 'Dec', bestCase: 4700, expected: 3600, worstCase: 2500 }
];

const impactBreakdownData = [
  { factor: 'Interest Rate', impact: -23 },
  { factor: 'FX Movement', impact: -16 },
  { factor: 'Sales Decline', impact: -85 },
  { factor: 'Cost Increase', impact: -28 },
  { factor: 'WC Elongation', impact: -45 },
  { factor: 'Credit Squeeze', impact: -12 },
  { factor: 'Investment Gain', impact: 8 },
  { factor: 'Other', impact: 45 }
];

// Table Columns
const assumptionColumns: Column<ScenarioAssumption>[] = [
  { id: 'parameter', accessor: 'parameter', header: 'Parameter', cell: (row) => <span className="font-medium">{row.parameter}</span> },
  { id: 'category', accessor: 'category', header: 'Category', cell: (row) => <Badge variant="outline">{row.category}</Badge> },
  { id: 'baseValue', accessor: 'baseValue', header: 'Base Value' },
  { id: 'scenarioValue', accessor: 'scenarioValue', header: 'Scenario Value', cell: (row) => <span className="font-medium">{row.scenarioValue}</span> },
  {
    id: 'change',
    accessor: 'change',
    header: 'Change',
    cell: (row) => (
      <div className="flex items-center gap-1">
        {row.changeType === 'increase' && <ArrowUpRight className="h-4 w-4 text-red-500" />}
        {row.changeType === 'decrease' && <ArrowDownRight className="h-4 w-4 text-amber-500" />}
        {row.changeType === 'neutral' && <Minus className="h-4 w-4 text-muted-foreground" />}
        <span className={
          row.changeType === 'increase' ? 'text-red-600' :
          row.changeType === 'decrease' ? 'text-amber-600' : 'text-muted-foreground'
        }>
          {row.change}
        </span>
      </div>
    )
  },
  {
    id: 'impact',
    accessor: 'impact',
    header: 'Impact',
    cell: (row) => (
      <Badge variant={
        row.impact === 'high' ? 'danger' :
        row.impact === 'medium' ? 'secondary' : 'outline'
      }>
        {row.impact}
      </Badge>
    )
  }
];

const resultColumns: Column<ScenarioResult>[] = [
  { id: 'metric', accessor: 'metric', header: 'Metric', cell: (row) => <span className="font-medium">{row.metric}</span> },
  { id: 'category', accessor: 'category', header: 'Category', cell: (row) => <Badge variant="outline">{row.category}</Badge> },
  { id: 'currentValue', accessor: 'currentValue', header: 'Current' },
  { id: 'projectedValue', accessor: 'projectedValue', header: 'Projected', cell: (row) => <span className="font-medium">{row.projectedValue}</span> },
  {
    id: 'impact',
    accessor: 'impact',
    header: 'Impact',
    cell: (row) => (
      <span className={
        row.impactType === 'negative' ? 'text-red-600 font-medium' :
        row.impactType === 'positive' ? 'text-green-600 font-medium' : 'text-muted-foreground'
      }>
        {row.impact}
      </span>
    )
  },
  {
    id: 'confidence',
    accessor: 'confidence',
    header: 'Confidence',
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Progress value={row.confidence} className="w-16 h-2" />
        <span className="text-xs text-muted-foreground">{row.confidence}%</span>
      </div>
    )
  }
];

const recommendationColumns: Column<ScenarioRecommendation>[] = [
  { id: 'action', accessor: 'action', header: 'Action', cell: (row) => <span className="font-medium">{row.action}</span> },
  { id: 'category', accessor: 'category', header: 'Category', cell: (row) => <Badge variant="outline">{row.category}</Badge> },
  { id: 'impact', accessor: 'impact', header: 'Impact', cell: (row) => <span className="text-green-600">{row.impact}</span> },
  {
    id: 'priority',
    accessor: 'priority',
    header: 'Priority',
    cell: (row) => (
      <Badge variant={
        row.priority === 'critical' ? 'danger' :
        row.priority === 'high' ? 'default' :
        row.priority === 'medium' ? 'secondary' : 'outline'
      }>
        {row.priority}
      </Badge>
    )
  },
  { id: 'owner', accessor: 'owner', header: 'Owner' },
  { id: 'timeline', accessor: 'timeline', header: 'Timeline' },
  {
    id: 'status',
    accessor: 'status',
    header: 'Status',
    cell: (row) => (
      <Badge variant={
        row.status === 'completed' ? 'default' :
        row.status === 'in_progress' ? 'secondary' : 'outline'
      }>
        {row.status === 'in_progress' ? 'In Progress' : row.status}
      </Badge>
    )
  }
];

// AI Insights
const aiInsights = [
  {
    id: '1',
    title: 'Critical Liquidity Risk Identified',
    insight: 'The scenario projects available liquidity falling below target buffer in Q2. Recommend drawing committed credit lines preemptively.',
    type: 'warning' as const,
    impact: 'high' as const,
    impactValue: 'Risk of covenant breach if not addressed',
    action: 'Draw Credit Line',
    confidence: 92
  },
  {
    id: '2',
    title: 'FX Hedge Gap Detected',
    insight: 'Current 71% hedge coverage insufficient for projected USD/INR volatility. Increasing to 85% would reduce scenario loss by ₹8 Cr.',
    type: 'recommendation' as const,
    impact: 'high' as const,
    impactValue: 'Reduce FX exposure by ₹8 Cr',
    action: 'Increase Hedge',
    confidence: 88
  },
  {
    id: '3',
    title: 'Working Capital Optimization',
    insight: 'Monte Carlo simulation shows 78% probability of exceeding collection days target. Implement early payment discount program.',
    type: 'insight' as const,
    priority: 'medium' as const,
    impact: 'high' as const,
    impactValue: 'Improve DSO by 5-8 days',
    action: 'View Analysis',
    confidence: 78
  },
  {
    id: '4',
    title: 'Interest Rate Sensitivity',
    insight: 'Every 25bps rate increase adds ₹4.5 Cr to annual interest expense. Consider fixing portion of floating debt.',
    type: 'insight' as const,
    priority: 'medium' as const,
    impact: 'high' as const,
    impactValue: 'Cap interest expense volatility',
    action: 'Analyze Options',
    confidence: 85
  }
];

export default function ScenarioSimulatorPage() {
  const [activeTab, setActiveTab] = useState('builder');
  const [scenarioType, setScenarioType] = useState('custom');
  const [timeHorizon, setTimeHorizon] = useState('12');

  // Slider values
  const [interestRateChange, setInterestRateChange] = useState(125);
  const [salesChange, setSalesChange] = useState(-7);
  const [costChange, setCostChange] = useState(10);
  const [fxChange, setFxChange] = useState(5);
  const [collectionDelay, setCollectionDelay] = useState(15);
  const [paymentAcceleration, setPaymentAcceleration] = useState(5);

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <PageContainer>
      <PageHeader
        title="Scenario Simulator"
        breadcrumbs={[
          { label: 'Treasury', href: '/treasury/dashboard' },
          { label: 'Scenario Simulator' }
        ]}
        actions={[
          { label: 'Run Scenario', icon: PlayCircle, variant: 'default' },
          { label: 'Save', icon: Save, variant: 'outline' },
          { label: 'Export', icon: Download, variant: 'outline' }
        ]}
      />

      <TreasuryFilters compact />

      {/* KPI Grid */}
      <KPIGrid columns={6}>
        <KPICard
          title={kpiData.scenarioScore.label}
          value={kpiData.scenarioScore.value.toString()}
          subtitle="/100"
          change={kpiData.scenarioScore.trend}
          icon={Target}
          variant={kpiData.scenarioScore.value >= 70 ? 'default' : 'gradient'}
        />
        <KPICard
          title={kpiData.financialImpact.label}
          value={kpiData.financialImpact.value}
          change={kpiData.financialImpact.trend}
          icon={TrendingDown}
          variant="gradient"
        />
        <KPICard
          title={kpiData.liquidityImpact.label}
          value={kpiData.liquidityImpact.value}
          change={kpiData.liquidityImpact.trend}
          icon={Activity}
          variant="gradient"
        />
        <KPICard
          title={kpiData.riskImpact.label}
          value={kpiData.riskImpact.value}
          change={kpiData.riskImpact.trend}
          icon={AlertTriangle}
          variant="gradient"
        />
        <KPICard
          title={kpiData.probability.label}
          value={kpiData.probability.value}
          change={kpiData.probability.trend}
          icon={Percent}
          variant="default"
        />
        <KPICard
          title={kpiData.recoveryTime.label}
          value={kpiData.recoveryTime.value}
          change={kpiData.recoveryTime.trend}
          icon={Clock}
          variant="default"
        />
      </KPIGrid>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid grid-cols-6 w-full max-w-4xl">
          <TabsTrigger value="builder">Scenario Builder</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="recommendations">Actions</TabsTrigger>
          <TabsTrigger value="sensitivity">Sensitivity</TabsTrigger>
          <TabsTrigger value="saved">Saved Scenarios</TabsTrigger>
        </TabsList>

        {/* Scenario Builder Tab */}
        <TabsContent value="builder" className="mt-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Scenario Configuration */}
            <div className="col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Scenario Configuration
                  </CardTitle>
                  <CardDescription>Define scenario parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Scenario Name</Label>
                    <Input placeholder="Enter scenario name" defaultValue="Custom Stress Test" />
                  </div>
                  <div className="space-y-2">
                    <Label>Scenario Type</Label>
                    <Select value={scenarioType} onValueChange={(value) => setScenarioType(value ?? "custom")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">Custom Scenario</SelectItem>
                        <SelectItem value="interest">Interest Rate Shock</SelectItem>
                        <SelectItem value="fx">FX Shock</SelectItem>
                        <SelectItem value="liquidity">Liquidity Stress</SelectItem>
                        <SelectItem value="sales">Sales Slowdown</SelectItem>
                        <SelectItem value="cost">Cost Increase</SelectItem>
                        <SelectItem value="combined">Combined Stress</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Horizon</Label>
                    <Select value={timeHorizon} onValueChange={(value) => setTimeHorizon(value ?? "12")}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 Months</SelectItem>
                        <SelectItem value="6">6 Months</SelectItem>
                        <SelectItem value="12">12 Months</SelectItem>
                        <SelectItem value="24">24 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <h4 className="font-medium text-sm">Market Parameters</h4>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Interest Rate Change</span>
                        <span className="font-medium text-red-600">+{interestRateChange} bps</span>
                      </div>
                      <Slider
                        value={interestRateChange}
                        onChange={setInterestRateChange}
                        min={-200}
                        max={300}
                        step={25}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>USD/INR Change</span>
                        <span className="font-medium text-red-600">+{fxChange}%</span>
                      </div>
                      <Slider
                        value={fxChange}
                        onChange={setFxChange}
                        min={-15}
                        max={15}
                        step={1}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <h4 className="font-medium text-sm">Business Parameters</h4>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Sales Growth Change</span>
                        <span className="font-medium text-amber-600">{salesChange}%</span>
                      </div>
                      <Slider
                        value={salesChange}
                        onChange={setSalesChange}
                        min={-30}
                        max={30}
                        step={1}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Cost Change</span>
                        <span className="font-medium text-red-600">+{costChange}%</span>
                      </div>
                      <Slider
                        value={costChange}
                        onChange={setCostChange}
                        min={-20}
                        max={30}
                        step={1}
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <h4 className="font-medium text-sm">Working Capital</h4>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Collection Delay</span>
                        <span className="font-medium text-red-600">+{collectionDelay} days</span>
                      </div>
                      <Slider
                        value={collectionDelay}
                        onChange={setCollectionDelay}
                        min={0}
                        max={30}
                        step={1}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Payment Acceleration</span>
                        <span className="font-medium text-amber-600">{paymentAcceleration} days</span>
                      </div>
                      <Slider
                        value={paymentAcceleration}
                        onChange={setPaymentAcceleration}
                        min={0}
                        max={15}
                        step={1}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Run Scenario
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Preview Charts */}
            <div className="col-span-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5" />
                    Cash Position Projection
                  </CardTitle>
                  <CardDescription>Base case vs scenario comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={cashProjectionData}
                    xKey="month"
                    series={[
                      { key: 'base', name: 'Base Case', color: '#3b82f6' },
                      { key: 'scenario', name: 'Scenario', color: '#ef4444' }
                    ]}
                    height={280}
                  />
                </CardContent>
              </Card>

              {/* <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Liquidity Projection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart
                      data={liquidityCurveData}
                      xKey="month"
                      series={[
                        { key: 'liquidity', name: 'Available Liquidity', color: '#3b82f6' },
                        { key: 'minimum', name: 'Minimum Buffer', color: '#ef4444' },
                        { key: 'target', name: 'Target Buffer', color: '#f59e0b' }
                      ]}
                      height={200}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Impact Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={impactBreakdownData}
                      xKey="factor"
                      series={[{ key: 'impact', name: 'Impact (₹ Cr)', color: '#ef4444' }]}
                      height={200}
                    />
                  </CardContent>
                </Card>
              </div> */}

              {/* Assumptions Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Scenario Assumptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={assumptionColumns}
                    data={scenarioAssumptions}
                    searchable
                    searchPlaceholder="Search assumptions..."
                    // pageSize={6}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="mt-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>Scenario Impact Analysis</CardTitle>
                  <CardDescription>Projected impact on key financial metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={resultColumns}
                    data={scenarioResults}
                    searchable
                    searchPlaceholder="Search metrics..."
                    // pageSize={10}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Scenario Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(72)}`}>72</div>
                    <div className="text-sm text-muted-foreground mt-1">/100</div>
                    <Progress value={72} className="mt-4 h-3" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>High Risk</span>
                      <span>Low Risk</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Liquidity Risk</span>
                      <Badge variant="danger">High</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Solvency Risk</span>
                      <Badge variant="secondary">Medium</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Profitability Risk</span>
                      <Badge variant="danger">High</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Operational Risk</span>
                      <Badge variant="secondary">Medium</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Key Findings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 p-2 bg-red-50 dark:bg-red-950 rounded-lg">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Liquidity breach in Q2</div>
                      <div className="text-muted-foreground">Falls below target buffer</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-amber-50 dark:bg-amber-950 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Working capital stress</div>
                      <div className="text-muted-foreground">+₹180 Cr additional requirement</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-amber-50 dark:bg-amber-950 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Margin compression</div>
                      <div className="text-muted-foreground">EBITDA margin drops 3.3%</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-950 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Investment returns improve</div>
                      <div className="text-muted-foreground">Higher rates benefit portfolio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="mt-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>Scenario Comparison</CardTitle>
                  <CardDescription>Best case, expected case, and worst case projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={scenarioComparisonData}
                    xKey="month"
                    series={[
                      { key: 'bestCase', name: 'Best Case', color: '#22c55e' },
                      { key: 'expected', name: 'Expected', color: '#3b82f6' },
                      { key: 'worstCase', name: 'Worst Case', color: '#ef4444' }
                    ]}
                    height={350}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="col-span-4 space-y-6">
              {/* Best Case */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-green-600 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Best Case
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Score</span>
                      <span className="font-medium text-green-600">88/100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Year-End Cash</span>
                      <span className="font-medium">₹4,700 Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Net Impact</span>
                      <span className="font-medium text-green-600">+₹810 Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Probability</span>
                      <span className="font-medium">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Expected Case */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-blue-600 flex items-center gap-2">
                    <Minus className="h-4 w-4" />
                    Expected Case
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Score</span>
                      <span className="font-medium text-blue-600">72/100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Year-End Cash</span>
                      <span className="font-medium">₹3,600 Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Net Impact</span>
                      <span className="font-medium text-amber-600">-₹156 Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Probability</span>
                      <span className="font-medium">55%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Worst Case */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-red-600 flex items-center gap-2">
                    <TrendingDown className="h-4 w-4" />
                    Worst Case
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Score</span>
                      <span className="font-medium text-red-600">38/100</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Year-End Cash</span>
                      <span className="font-medium">₹2,500 Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Net Impact</span>
                      <span className="font-medium text-red-600">-₹390 Cr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Probability</span>
                      <span className="font-medium">25%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="mt-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                  <CardDescription>AI-generated mitigation strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={recommendationColumns}
                    data={scenarioRecommendations}
                    searchable
                    searchPlaceholder="Search actions..."
                    // pageSize={8}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="col-span-4">
              <AIInsightsPanel
                title="AI Analysis"
                insights={aiInsights}
              />
            </div>
          </div>
        </TabsContent>

        {/* Sensitivity Tab */}
        <TabsContent value="sensitivity" className="mt-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>Sensitivity Analysis</CardTitle>
                  <CardDescription>Impact of parameter changes on key metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Interest Rate Sensitivity */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Interest Rate Sensitivity</h4>
                      <Badge variant="outline">High Impact</Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      {[-100, -50, 0, 50, 100].map((change) => (
                        <div key={change} className={`p-3 rounded-lg border text-center ${change === 0 ? 'bg-muted' : ''}`}>
                          <div className="text-xs text-muted-foreground">{change >= 0 ? '+' : ''}{change} bps</div>
                          <div className={`font-medium ${change > 0 ? 'text-red-600' : change < 0 ? 'text-green-600' : ''}`}>
                            {change > 0 ? '-' : change < 0 ? '+' : ''}₹{Math.abs(change * 0.18).toFixed(0)} Cr
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FX Rate Sensitivity */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">USD/INR Sensitivity</h4>
                      <Badge variant="outline">High Impact</Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      {[-5, -2.5, 0, 2.5, 5].map((change) => (
                        <div key={change} className={`p-3 rounded-lg border text-center ${change === 0 ? 'bg-muted' : ''}`}>
                          <div className="text-xs text-muted-foreground">{change >= 0 ? '+' : ''}{change}%</div>
                          <div className={`font-medium ${change > 0 ? 'text-red-600' : change < 0 ? 'text-green-600' : ''}`}>
                            {change > 0 ? '-' : change < 0 ? '+' : ''}₹{Math.abs(change * 3.2).toFixed(0)} Cr
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sales Sensitivity */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Sales Growth Sensitivity</h4>
                      <Badge variant="outline">Critical Impact</Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      {[-10, -5, 0, 5, 10].map((change) => (
                        <div key={change} className={`p-3 rounded-lg border text-center ${change === 0 ? 'bg-muted' : ''}`}>
                          <div className="text-xs text-muted-foreground">{change >= 0 ? '+' : ''}{change}%</div>
                          <div className={`font-medium ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : ''}`}>
                            {change < 0 ? '-' : change > 0 ? '+' : ''}₹{Math.abs(change * 12).toFixed(0)} Cr
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Collection Days Sensitivity */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Collection Days Sensitivity</h4>
                      <Badge variant="outline">Medium Impact</Badge>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      {[-10, -5, 0, 5, 10].map((change) => (
                        <div key={change} className={`p-3 rounded-lg border text-center ${change === 0 ? 'bg-muted' : ''}`}>
                          <div className="text-xs text-muted-foreground">{change >= 0 ? '+' : ''}{change} days</div>
                          <div className={`font-medium ${change > 0 ? 'text-red-600' : change < 0 ? 'text-green-600' : ''}`}>
                            {change > 0 ? '-' : change < 0 ? '+' : ''}₹{Math.abs(change * 3).toFixed(0)} Cr
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monte Carlo Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Simulations Run</div>
                    <div className="text-2xl font-bold">10,000</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">5th Percentile</span>
                      <span className="font-medium text-red-600">₹2,180 Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">25th Percentile</span>
                      <span className="font-medium text-amber-600">₹2,650 Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Median (50th)</span>
                      <span className="font-medium">₹2,890 Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">75th Percentile</span>
                      <span className="font-medium text-green-600">₹3,250 Cr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">95th Percentile</span>
                      <span className="font-medium text-green-600">₹3,780 Cr</span>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Probability of Loss</span>
                      <span className="font-medium text-amber-600">35%</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">Expected Shortfall (CVaR)</span>
                      <span className="font-medium text-red-600">₹245 Cr</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Key Drivers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Sales Growth</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Interest Rate</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>FX Rate</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Working Capital</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Saved Scenarios Tab */}
        <TabsContent value="saved" className="mt-6">
          <div className="grid grid-cols-3 gap-6">
            {savedScenarios.map((scenario) => (
              <Card key={scenario.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{scenario.name}</CardTitle>
                    <Badge variant={scenario.status === 'active' ? 'default' : 'secondary'}>
                      {scenario.status}
                    </Badge>
                  </div>
                  <CardDescription>{scenario.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Score</span>
                      <span className={`font-medium ${getScoreColor(scenario.score)}`}>
                        {scenario.score}/100
                      </span>
                    </div>
                    <Progress value={scenario.score} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Created</span>
                      <span>{scenario.createdDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Run</span>
                      <span>{scenario.lastRun}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Run
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions Footer */}
      <Section className="mt-6">
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Last simulation: Today at 2:45 PM | 10,000 iterations | 8.2s runtime
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <FileBarChart className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </Button>
                <Button size="sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Ask AI to Explain
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>
    </PageContainer>
  );
}
