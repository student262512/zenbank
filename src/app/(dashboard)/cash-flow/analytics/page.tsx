'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { CashFlowFilters, CashFlowFilterState } from '@/components/shared/cash-flow-filters';
import { DataTable, Column } from '@/components/shared/data-table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { AreaChart, BarChart, PieChart, LineChart, XAxis, YAxis, Area, ResponsiveContainer, Pie, Tooltip, Legend, CartesianGrid, Bar, Line } from 'recharts';
// import { AreaChart, BarChart, PieChart, LineChart } from '@/components/shared/charts';
import { addChartColors, chartColors, chartGradients, chartPalette } from "@/components/shared/charts/chart-theme";

import {
  chartAxisStyle,
  chartGridStyle,
  chartTooltipStyle,
} from "@/components/shared/charts/chart-utils";
import { AIInsightCard } from '@/components/shared/ai-insight-card';
import { cashFlowTabs } from '@/config/cash-flow-navigation';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download,
  FileText,
  Eye,
  Zap,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Layers,
  GitCompare,
  Filter,
  Table,
  Printer,
  Mail,
  Clock,
  Building2,
  Users,
  Wallet,
  CreditCard,
  Banknote,
  Scale,
  Percent,
  Hash,
  ChevronRight,
} from 'lucide-react';
import { ChartGradients } from '@/components/shared/charts/chart-gradients';
import NeonRadialPieChart from '@/components/shared/charts/NeonRadialPieChart';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface TrendData {
  period: string;
  inflow: number;
  outflow: number;
  netCash: number;
  variance: number;
  variancePercent: number;
}

interface VarianceItem {
  id: string;
  category: string;
  subcategory: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
  status: 'favorable' | 'unfavorable' | 'on-track';
  trend: 'improving' | 'stable' | 'declining';
  explanation: string;
}

interface ComparisonMetric {
  id: string;
  metric: string;
  currentPeriod: number;
  previousPeriod: number;
  change: number;
  changePercent: number;
  benchmark: number | null;
  benchmarkVariance: number | null;
}

interface ReportItem {
  id: string;
  name: string;
  type: 'standard' | 'custom' | 'scheduled';
  category: string;
  lastGenerated: string;
  schedule: string | null;
  format: string;
  recipients: number;
}

interface AnalyticsQuery {
  id: string;
  name: string;
  description: string;
  lastRun: string;
  savedBy: string;
  isShared: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const kpiData = {
  avgDailyInflow: {
    value: 8.45,
    trend: 'up' as const,
    trendValue: 12.3,
    changeUnit: '%',
    vsLastMonth: 7.52,
  },
  avgDailyOutflow: {
    value: 6.82,
    trend: 'down' as const,
    trendValue: -5.2,
    changeUnit: '%',
    vsLastMonth: 7.19,
  },
  cashConversionCycle: {
    value: 45,
    unit: 'days',
    trend: 'down' as const,
    trendValue: -3,
    changeUnit: 'days',
    benchmark: 42,
  },
  forecastAccuracy: {
    value: 94.2,
    unit: '%',
    trend: 'up' as const,
    trendValue: 2.1,
    changeUnit: '%',
    target: 95.0,
  },
};

const monthlyTrendData: TrendData[] = [
  { period: 'Aug 2024', inflow: 245.5, outflow: 198.2, netCash: 47.3, variance: 5.2, variancePercent: 12.3 },
  { period: 'Sep 2024', inflow: 268.8, outflow: 215.5, netCash: 53.3, variance: 8.1, variancePercent: 17.9 },
  { period: 'Oct 2024', inflow: 285.2, outflow: 232.8, netCash: 52.4, variance: -3.5, variancePercent: -6.3 },
  { period: 'Nov 2024', inflow: 312.5, outflow: 258.2, netCash: 54.3, variance: 2.8, variancePercent: 5.4 },
  { period: 'Dec 2024', inflow: 342.8, outflow: 285.5, netCash: 57.3, variance: 4.5, variancePercent: 8.5 },
  { period: 'Jan 2025', inflow: 328.5, outflow: 268.2, netCash: 60.3, variance: 6.2, variancePercent: 11.5 },
];

const weeklyTrendData = [
  { week: 'W1', inflow: 78.5, outflow: 62.3, netCash: 16.2 },
  { week: 'W2', inflow: 85.2, outflow: 68.5, netCash: 16.7 },
  { week: 'W3', inflow: 82.8, outflow: 72.2, netCash: 10.6 },
  { week: 'W4', inflow: 82.0, outflow: 65.2, netCash: 16.8 },
];

const inflowBySource = [
  { name: 'Customer Collections', value: 45, fill: '#3b82f6' },
  { name: 'Booking Advances', value: 25, fill: '#22c55e' },
  { name: 'Loan Disbursements', value: 18, fill: '#f97316' },
  { name: 'Rental Income', value: 8, fill: '#eab308' },
  { name: 'Other', value: 4, fill: '#6b7280' },
];

const pieInflowBySourceData = addChartColors(inflowBySource);

const outflowByCategory = [
  { name: 'Construction', value: 42, fill: '#ef4444' },
  { name: 'Vendor Payments', value: 22, fill: '#f97316' },
  { name: 'Loan Repayments', value: 18, fill: '#eab308' },
  { name: 'Payroll', value: 12, fill: '#22c55e' },
  { name: 'Other', value: 6, fill: '#6b7280' },
];

const varianceItems: VarianceItem[] = [
  {
    id: 'VAR001',
    category: 'Inflow',
    subcategory: 'Customer Collections',
    budgeted: 145.0,
    actual: 158.5,
    variance: 13.5,
    variancePercent: 9.3,
    status: 'favorable',
    trend: 'improving',
    explanation: 'Early payment discounts effective, improved collection efficiency',
  },
  {
    id: 'VAR002',
    category: 'Inflow',
    subcategory: 'Booking Advances',
    budgeted: 85.0,
    actual: 78.2,
    variance: -6.8,
    variancePercent: -8.0,
    status: 'unfavorable',
    trend: 'stable',
    explanation: 'Seasonal slowdown in new bookings',
  },
  {
    id: 'VAR003',
    category: 'Outflow',
    subcategory: 'Construction Costs',
    budgeted: 125.0,
    actual: 132.5,
    variance: -7.5,
    variancePercent: -6.0,
    status: 'unfavorable',
    trend: 'declining',
    explanation: 'Material cost inflation, accelerated project timeline',
  },
  {
    id: 'VAR004',
    category: 'Outflow',
    subcategory: 'Vendor Payments',
    budgeted: 65.0,
    actual: 62.8,
    variance: 2.2,
    variancePercent: 3.4,
    status: 'favorable',
    trend: 'stable',
    explanation: 'Early payment discounts captured',
  },
  {
    id: 'VAR005',
    category: 'Outflow',
    subcategory: 'Loan Repayments',
    budgeted: 52.0,
    actual: 52.0,
    variance: 0.0,
    variancePercent: 0.0,
    status: 'on-track',
    trend: 'stable',
    explanation: 'Fixed scheduled payments',
  },
  {
    id: 'VAR006',
    category: 'Inflow',
    subcategory: 'Rental Income',
    budgeted: 28.0,
    actual: 26.5,
    variance: -1.5,
    variancePercent: -5.4,
    status: 'unfavorable',
    trend: 'declining',
    explanation: 'Vacancy in Block B commercial space',
  },
];

const comparisonMetrics: ComparisonMetric[] = [
  {
    id: 'CMP001',
    metric: 'Total Inflow',
    currentPeriod: 328.5,
    previousPeriod: 312.5,
    change: 16.0,
    changePercent: 5.1,
    benchmark: 315.0,
    benchmarkVariance: 4.3,
  },
  {
    id: 'CMP002',
    metric: 'Total Outflow',
    currentPeriod: 268.2,
    previousPeriod: 258.2,
    change: 10.0,
    changePercent: 3.9,
    benchmark: 270.0,
    benchmarkVariance: -0.7,
  },
  {
    id: 'CMP003',
    metric: 'Net Cash Flow',
    currentPeriod: 60.3,
    previousPeriod: 54.3,
    change: 6.0,
    changePercent: 11.0,
    benchmark: 45.0,
    benchmarkVariance: 34.0,
  },
  {
    id: 'CMP004',
    metric: 'Operating Cash Flow',
    currentPeriod: 85.5,
    previousPeriod: 78.2,
    change: 7.3,
    changePercent: 9.3,
    benchmark: 80.0,
    benchmarkVariance: 6.9,
  },
  {
    id: 'CMP005',
    metric: 'Cash Burn Rate',
    currentPeriod: 8.94,
    previousPeriod: 8.61,
    change: 0.33,
    changePercent: 3.8,
    benchmark: 9.0,
    benchmarkVariance: -0.7,
  },
  {
    id: 'CMP006',
    metric: 'Collection Efficiency',
    currentPeriod: 92.5,
    previousPeriod: 89.8,
    change: 2.7,
    changePercent: 3.0,
    benchmark: 90.0,
    benchmarkVariance: 2.8,
  },
  {
    id: 'CMP007',
    metric: 'Days Sales Outstanding',
    currentPeriod: 42,
    previousPeriod: 48,
    change: -6,
    changePercent: -12.5,
    benchmark: 45,
    benchmarkVariance: -6.7,
  },
  {
    id: 'CMP008',
    metric: 'Days Payable Outstanding',
    currentPeriod: 35,
    previousPeriod: 32,
    change: 3,
    changePercent: 9.4,
    benchmark: 30,
    benchmarkVariance: 16.7,
  },
];

const reportItems: ReportItem[] = [
  {
    id: 'RPT001',
    name: 'Daily Cash Position Report',
    type: 'scheduled',
    category: 'Cash Position',
    lastGenerated: '2025-01-22 08:00',
    schedule: 'Daily at 8:00 AM',
    format: 'PDF',
    recipients: 5,
  },
  {
    id: 'RPT002',
    name: 'Weekly Cash Flow Summary',
    type: 'scheduled',
    category: 'Cash Flow',
    lastGenerated: '2025-01-20 09:00',
    schedule: 'Weekly on Monday',
    format: 'Excel',
    recipients: 8,
  },
  {
    id: 'RPT003',
    name: 'Monthly Variance Analysis',
    type: 'scheduled',
    category: 'Variance',
    lastGenerated: '2025-01-01 10:00',
    schedule: 'Monthly on 1st',
    format: 'PDF',
    recipients: 12,
  },
  {
    id: 'RPT004',
    name: 'Project-wise Cash Flow',
    type: 'standard',
    category: 'Projects',
    lastGenerated: '2025-01-18 14:30',
    schedule: null,
    format: 'Excel',
    recipients: 0,
  },
  {
    id: 'RPT005',
    name: 'Entity Cash Flow Comparison',
    type: 'custom',
    category: 'Comparison',
    lastGenerated: '2025-01-15 11:45',
    schedule: null,
    format: 'PDF',
    recipients: 3,
  },
];

const analyticsQueries: AnalyticsQuery[] = [
  {
    id: 'QRY001',
    name: 'Top 10 Collection Sources',
    description: 'Identify highest contributing collection sources by amount',
    lastRun: '2025-01-22 10:30',
    savedBy: 'Rajesh Kumar',
    isShared: true,
  },
  {
    id: 'QRY002',
    name: 'Overdue Analysis by Project',
    description: 'Breakdown of overdue receivables by project and age',
    lastRun: '2025-01-21 15:45',
    savedBy: 'Priya Sharma',
    isShared: true,
  },
  {
    id: 'QRY003',
    name: 'Vendor Payment Pattern',
    description: 'Analyze vendor payment timing and discount capture',
    lastRun: '2025-01-20 09:15',
    savedBy: 'Amit Patel',
    isShared: false,
  },
  {
    id: 'QRY004',
    name: 'Cash Conversion Trend',
    description: 'Track cash conversion cycle components over time',
    lastRun: '2025-01-19 14:00',
    savedBy: 'Sunita Reddy',
    isShared: true,
  },
];

const entityComparison = [
  { entity: 'Skyline Towers Pvt Ltd', inflow: 125.5, outflow: 98.2, netCash: 27.3, margin: 21.8 },
  { entity: 'Green Valley Developers', inflow: 85.2, outflow: 72.5, netCash: 12.7, margin: 14.9 },
  { entity: 'Metro Commercial Hub', inflow: 65.8, outflow: 58.2, netCash: 7.6, margin: 11.6 },
  { entity: 'Sunrise Residences', inflow: 52.0, outflow: 39.3, netCash: 12.7, margin: 24.4 },
];

const projectComparison = [
  { project: 'Skyline Heights Phase 2', budgeted: 125.0, actual: 132.5, variance: -7.5, completion: 72 },
  { project: 'Green Valley Township', budgeted: 85.0, actual: 78.2, variance: 6.8, completion: 45 },
  { project: 'Metro Mall Expansion', budgeted: 65.0, actual: 68.5, variance: -3.5, completion: 85 },
  { project: 'Sunrise Gardens Block C', budgeted: 45.0, actual: 42.8, variance: 2.2, completion: 38 },
];

const seasonalityData = [
  { month: 'Jan', avgInflow: 285, avgOutflow: 248, pattern: 'Low' },
  { month: 'Feb', avgInflow: 268, avgOutflow: 235, pattern: 'Low' },
  { month: 'Mar', avgInflow: 312, avgOutflow: 265, pattern: 'Medium' },
  { month: 'Apr', avgInflow: 298, avgOutflow: 258, pattern: 'Medium' },
  { month: 'May', avgInflow: 275, avgOutflow: 242, pattern: 'Low' },
  { month: 'Jun', avgInflow: 265, avgOutflow: 238, pattern: 'Low' },
  { month: 'Jul', avgInflow: 288, avgOutflow: 255, pattern: 'Medium' },
  { month: 'Aug', avgInflow: 302, avgOutflow: 268, pattern: 'Medium' },
  { month: 'Sep', avgInflow: 328, avgOutflow: 285, pattern: 'High' },
  { month: 'Oct', avgInflow: 345, avgOutflow: 298, pattern: 'High' },
  { month: 'Nov', avgInflow: 358, avgOutflow: 312, pattern: 'High' },
  { month: 'Dec', avgInflow: 325, avgOutflow: 288, pattern: 'High' },
];

const aiInsights = [
  {
    id: '1',
    type: 'insight' as const,
    title: 'Collection Efficiency Improvement',
    description: 'Collection efficiency improved by 3% this month. Early payment incentives contributed ₹4.2 Cr in accelerated collections.',
    action: 'Continue early payment incentive program',
    impact: '₹4.2 Cr accelerated collections',
    impactLevel: 'medium',
    confidence: 92,
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Construction Cost Overrun Pattern',
    description: 'Construction costs exceeded budget by 6% for 3 consecutive months. Material cost inflation identified as primary driver.',
    action: 'Review material procurement strategy',
    impact: '₹7.5 Cr cost overrun YTD',
    impactLevel: 'high',
    confidence: 88,
  },
  {
    id: '3',
    type: 'recommendation' as const,
    title: 'Seasonal Cash Optimization',
    description: 'Historical data shows Q4 has 25% higher cash inflows. Consider accelerating collections and deferring non-critical payments in Q1-Q2.',
    action: 'Implement seasonal cash strategy',
    impact: '₹15 Cr working capital optimization',
    impactLevel: 'high',
    confidence: 85,
  },
  {
    id: '4',
    type: 'opportunity' as const,
    title: 'Vendor Payment Optimization',
    description: 'Analysis shows ₹2.8 Cr in uncaptured early payment discounts. Optimizing payment timing could improve cash efficiency.',
    action: 'Review vendor payment terms',
    impact: '₹2.8 Cr annual savings potential',
    impactLevel: 'low',
    confidence: 82,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const formatCurrency = (value: number) => {
  return `₹${value.toFixed(2)} Cr`;
};

const formatPercentage = (value: number) => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
};

const getVarianceColor = (status: string) => {
  switch (status) {
    case 'favorable':
      return 'text-green-400';
    case 'unfavorable':
      return 'text-red-400';
    default:
      return 'text-slate-400';
  }
};

const getVarianceBadgeColor = (status: string) => {
  switch (status) {
    case 'favorable':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'unfavorable':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'improving':
      return <TrendingUp className="h-4 w-4 text-green-400" />;
    case 'declining':
      return <TrendingDown className="h-4 w-4 text-red-400" />;
    default:
      return <Activity className="h-4 w-4 text-yellow-400" />;
  }
};

const getReportTypeBadge = (type: string) => {
  switch (type) {
    case 'scheduled':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'custom':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function CashFlowAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedComparison, setSelectedComparison] = useState('mom');
  const [filters, setFilters] = useState<CashFlowFilterState>({
    companyIds: [],
    businessUnitIds: [],
    spvIds: [],
    projectIds: [],
    regionIds: [],
    bankIds: [],
    accountIds: [],
    currencyIds: [],
    costCenterIds: [],
    customerIds: [],
    vendorIds: [],
    loanIds: [],
    scenario: 'base',
    forecastVersion: 'current',
    forecastHorizon: '30d',
    datePreset: 'thisMonth',
    dateRange: {
      startDate: (() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 1);
        return d;
      })(), endDate: new Date()
    },
    statusIds: [],
    tagIds: [],
    // search: '',
    // dateRange: { startDate: undefined, endDate: undefined },
    // entities: [],
    // projects: [],
    // banks: [],
    // transactionTypes: [],
    // status: [],
    // minAmount: undefined,
    // maxAmount: undefined,
    // currency: 'INR',
    // groupBy: 'none',
    // sortBy: 'date',
    // sortOrder: 'desc',
  });
  const [selectedVariance, setSelectedVariance] = useState<VarianceItem | null>(null);

  // Get tabs configuration
  // const tabs = cashFlowTabs.analytics || [
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'trends', label: 'Trend Analysis' },
    { id: 'variance', label: 'Variance Analysis' },
    { id: 'comparison', label: 'Comparisons' },
    { id: 'reports', label: 'Reports' },
    { id: 'custom', label: 'Custom Analytics' },
  ];

  // Column definitions
  const trendColumns: Column<TrendData>[] = [
    {
      id: 'period',
      header: 'Period',
      cell: (row) => <span className="font-medium">{row.period}</span>,
      sortable: true,
    },
    {
      id: 'inflow',
      header: 'Inflow',
      cell: (row) => <span className="text-green-400">{formatCurrency(row.inflow)}</span>,
      sortable: true,
    },
    {
      id: 'outflow',
      header: 'Outflow',
      cell: (row) => <span className="text-red-400">{formatCurrency(row.outflow)}</span>,
      sortable: true,
    },
    {
      id: 'netCash',
      header: 'Net Cash',
      cell: (row) => (
        <span className={row.netCash >= 0 ? 'text-green-400' : 'text-red-400'}>
          {formatCurrency(row.netCash)}
        </span>
      ),
      sortable: true,
    },
    {
      id: 'variance',
      header: 'Variance vs Budget',
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.variance >= 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-400" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-400" />
          )}
          <span className={row.variance >= 0 ? 'text-green-400' : 'text-red-400'}>
            {formatCurrency(Math.abs(row.variance))}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'variancePercent',
      header: 'Variance %',
      cell: (row) => (
        <Badge className={row.variancePercent >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
          {formatPercentage(row.variancePercent)}
        </Badge>
      ),
      sortable: true,
    },
  ];

  const varianceColumns: Column<VarianceItem>[] = [
    {
      id: 'category',
      header: 'Category',
      cell: (row) => (
        <Badge variant="outline" className="bg-slate-800/50">
          {row.category}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: 'subcategory',
      header: 'Subcategory',
      cell: (row) => <span className="font-medium">{row.subcategory}</span>,
      sortable: true,
    },
    {
      id: 'budgeted',
      header: 'Budgeted',
      cell: (row) => formatCurrency(row.budgeted),
      sortable: true,
    },
    {
      id: 'actual',
      header: 'Actual',
      cell: (row) => formatCurrency(row.actual),
      sortable: true,
    },
    {
      id: 'variance',
      header: 'Variance',
      cell: (row) => (
        <span className={getVarianceColor(row.status)}>
          {row.variance >= 0 ? '+' : ''}{formatCurrency(row.variance)}
        </span>
      ),
      sortable: true,
    },
    {
      id: 'variancePercent',
      header: 'Variance %',
      cell: (row) => (
        <Badge className={getVarianceBadgeColor(row.status)}>
          {formatPercentage(row.variancePercent)}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge className={getVarianceBadgeColor(row.status)}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1).replace('-', ' ')}
        </Badge>
      ),
    },
    {
      id: 'trend',
      header: 'Trend',
      cell: (row) => (
        <div className="flex items-center gap-1">
          {getTrendIcon(row.trend)}
        </div>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: (row) => (
        <Button variant="ghost" size="sm" onClick={() => setSelectedVariance(row)}>
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const comparisonColumns: Column<ComparisonMetric>[] = [
    {
      id: 'metric',
      header: 'Metric',
      cell: (row) => <span className="font-medium">{row.metric}</span>,
      sortable: true,
    },
    {
      id: 'currentPeriod',
      header: 'Current Period',
      cell: (row) => (
        <span>
          {typeof row.currentPeriod === 'number' && row.currentPeriod > 100
            ? formatCurrency(row.currentPeriod)
            : row.currentPeriod}
        </span>
      ),
      sortable: true,
    },
    {
      id: 'previousPeriod',
      header: 'Previous Period',
      cell: (row) => (
        <span className="text-slate-400">
          {typeof row.previousPeriod === 'number' && row.previousPeriod > 100
            ? formatCurrency(row.previousPeriod)
            : row.previousPeriod}
        </span>
      ),
      sortable: true,
    },
    {
      id: 'change',
      header: 'Change',
      cell: (row) => (
        <div className="flex items-center gap-1">
          {row.change >= 0 ? (
            <ArrowUpRight className="h-4 w-4 text-green-400" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-400" />
          )}
          <span className={row.change >= 0 ? 'text-green-400' : 'text-red-400'}>
            {Math.abs(row.change) > 100 ? formatCurrency(Math.abs(row.change)) : Math.abs(row.change)}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'changePercent',
      header: 'Change %',
      cell: (row) => (
        <Badge className={row.changePercent >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
          {formatPercentage(row.changePercent)}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: 'benchmark',
      header: 'Benchmark',
      cell: (row) => (
        row.benchmark !== null ? (
          <span className="text-slate-400">
            {row.benchmark > 100 ? formatCurrency(row.benchmark) : row.benchmark}
          </span>
        ) : <span className="text-slate-500">-</span>
      ),
    },
    {
      id: 'benchmarkVariance',
      header: 'vs Benchmark',
      cell: (row) => (
        row.benchmarkVariance !== null ? (
          <Badge className={row.benchmarkVariance >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
            {formatPercentage(row.benchmarkVariance)}
          </Badge>
        ) : <span className="text-slate-500">-</span>
      ),
    },
  ];

  const reportColumns: Column<ReportItem>[] = [
    {
      id: 'name',
      header: 'Report Name',
      cell: (row) => <span className="font-medium">{row.name}</span>,
      sortable: true,
    },
    {
      id: 'type',
      header: 'Type',
      cell: (row) => (
        <Badge className={getReportTypeBadge(row.type)}>
          {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      cell: (row) => (
        <Badge variant="outline" className="bg-slate-800/50">
          {row.category}
        </Badge>
      ),
    },
    {
      id: 'lastGenerated',
      header: 'Last Generated',
      cell: (row) => <span className="text-sm text-slate-400">{row.lastGenerated}</span>,
      sortable: true,
    },
    {
      id: 'schedule',
      header: 'Schedule',
      cell: (row) => row.schedule ? (
        <span className="text-sm">{row.schedule}</span>
      ) : (
        <span className="text-slate-500">On-demand</span>
      ),
    },
    {
      id: 'format',
      header: 'Format',
      cell: (row) => (
        <Badge variant="outline" className="bg-slate-800/50">
          {row.format}
        </Badge>
      ),
    },
    {
      id: 'recipients',
      header: 'Recipients',
      cell: (row) => row.recipients > 0 ? (
        <span className="text-sm">{row.recipients}</span>
      ) : (
        <span className="text-slate-500">-</span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const queryColumns: Column<AnalyticsQuery>[] = [
    {
      id: 'name',
      header: 'Query Name',
      cell: (row) => <span className="font-medium">{row.name}</span>,
      sortable: true,
    },
    {
      id: 'description',
      header: 'Description',
      cell: (row) => <span className="text-sm text-slate-400">{row.description}</span>,
    },
    {
      id: 'lastRun',
      header: 'Last Run',
      cell: (row) => <span className="text-sm">{row.lastRun}</span>,
      sortable: true,
    },
    {
      id: 'savedBy',
      header: 'Saved By',
      cell: (row) => <span className="text-sm">{row.savedBy}</span>,
    },
    {
      id: 'isShared',
      header: 'Shared',
      cell: (row) => row.isShared ? (
        <Badge className="bg-green-500/20 text-green-400">Shared</Badge>
      ) : (
        <Badge className="bg-slate-500/20 text-slate-400">Private</Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Cash Flow Analytics"
        description="Comprehensive analytics, trends, and reporting for cash flow management"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Cash Flow', href: '/cash-flow' },
          { label: 'Analytics' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Select value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value ?? "monthly")}>
              <SelectTrigger className="w-[140px] bg-slate-900 border-slate-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        }
      />

      {/* Filters */}
      <CashFlowFilters
        initialFilters={filters}
        onFilterChange={setFilters}
      // variant="compact"
      // availableFilters={['search', 'dateRange', 'entities', 'projects']}
      />

      {/* KPI Grid */}
      <KPIGrid columns={4}>
        <KPICard
          title="Avg Daily Inflow"
          value={formatCurrency(kpiData.avgDailyInflow.value)}
          icon={ArrowUpRight}
          trend={kpiData.avgDailyInflow.trend}
          change={kpiData.avgDailyInflow.trendValue}
          changeUnit={kpiData.avgDailyInflow.changeUnit}
          subtitle={`vs ${formatCurrency(kpiData.avgDailyInflow.vsLastMonth)} last month`}
        />
        <KPICard
          title="Avg Daily Outflow"
          value={formatCurrency(kpiData.avgDailyOutflow.value)}
          icon={ArrowDownRight}
          trend={kpiData.avgDailyOutflow.trend}
          change={kpiData.avgDailyOutflow.trendValue}
          changeUnit={kpiData.avgDailyOutflow.changeUnit}
          subtitle={`vs ${formatCurrency(kpiData.avgDailyOutflow.vsLastMonth)} last month`}
        />
        <KPICard
          title="Cash Conversion Cycle"
          value={kpiData.cashConversionCycle.value}
          icon={Clock}
          trend={kpiData.cashConversionCycle.trend}
          change={kpiData.cashConversionCycle.trendValue}
          changeUnit={kpiData.cashConversionCycle.changeUnit}
          subtitle={`Benchmark: ${kpiData.cashConversionCycle.benchmark} days`}
        />
        <KPICard
          title="Forecast Accuracy"
          value={kpiData.forecastAccuracy.value}
          icon={Target}
          trend={kpiData.forecastAccuracy.trend}
          change={kpiData.forecastAccuracy.trendValue}
          changeUnit={kpiData.forecastAccuracy.changeUnit}
          subtitle={`Target: ${kpiData.forecastAccuracy.target}%`}
        />
      </KPIGrid>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-slate-900 border border-slate-800">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-slate-800"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Cash Flow Trend */}
            <Card className="col-span-8 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Cash Flow Trend</CardTitle>
                <CardDescription>6-month inflow, outflow, and net cash flow</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <AreaChart
                  data={monthlyTrendData}
                  xKey="period"
                  series={[
                    { key: 'inflow', name: 'Inflow', color: '#22c55e' },
                    { key: 'outflow', name: 'Outflow', color: '#ef4444' },
                  ]}
                  height={300}
                /> */}
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyTrendData}>
                    <ChartGradients />
                    <XAxis
                      dataKey="period"
                      {...chartAxisStyle}
                    />
                    <YAxis
                      {...chartAxisStyle}
                    />
                    <Tooltip
                      contentStyle={chartTooltipStyle}
                    />
                    <Area
                      type="monotone"
                      dataKey="inflow"
                      stroke="#00FFA3"
                      strokeWidth={3}
                      fill="url(#gradient-green)"
                    />
                    <Area
                      type="monotone"
                      dataKey="outflow"
                      stroke="#FF3366"
                      strokeWidth={3}
                      fill="url(#gradient-red)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Inflow by Source */}
            <Card className="col-span-4 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Inflow by Source</CardTitle>
                <CardDescription>Current month breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <PieChart
                  data={inflowBySource}
                  nameKey="name"
                  valueKey="value"
                  height={250}
                /> */}
                {/* <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieInflowBySourceData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      label
                    />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer> */}
                <NeonRadialPieChart
                  data={inflowBySource}
                  dataKey="value"
                  nameKey="name"
                  height={300}
                />
              </CardContent>
            </Card>

            {/* Net Cash Flow */}
            <Card className="col-span-4 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Net Cash Flow</CardTitle>
                <CardDescription>Monthly trend</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <BarChart
                  data={monthlyTrendData}
                  xKey="period"
                  bars={[
                    { key: 'netCash', name: 'Net Cash', color: '#3b82f6' },
                  ]}
                  height={250}
                /> */}
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyTrendData}>
                    <CartesianGrid {...chartGridStyle} />
                    <XAxis
                      dataKey="period"
                      {...chartAxisStyle}
                    />
                    <YAxis
                      {...chartAxisStyle}
                    />
                    <Tooltip
                      contentStyle={chartTooltipStyle}
                    />
                    <Bar
                      dataKey="netCash"
                      fill="url(#gradient-blue-purple)"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Outflow by Category */}
            <Card className="col-span-4 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Outflow by Category</CardTitle>
                <CardDescription>Current month breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <PieChart
                  data={outflowByCategory}
                  nameKey="name"
                  valueKey="value"
                  height={250}
                /> */}
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={outflowByCategory}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      label
                    />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly View */}
            <Card className="col-span-4 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">This Month by Week</CardTitle>
                <CardDescription>Weekly cash flow breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inflow" name="Inflow" fill="#22c55e" />
                    <Bar dataKey="outflow" name="Outflow" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <div className="col-span-12 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                AI Analytics Insights
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {aiInsights.map((insight) => (
                  <AIInsightCard
                    key={insight.id}
                    type={insight.type}
                    title={insight.title}
                    insight={insight.description}
                    // actions={insight.action}
                    impact={insight.impactLevel as 'low' | 'medium' | 'high'}
                    impactValue={insight.impact}
                    confidence={insight.confidence}
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Trend Analysis Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Seasonality Chart */}
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Seasonality Analysis</CardTitle>
                <CardDescription>Historical average cash flow patterns by month</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <LineChart
                  data={seasonalityData}
                  xKey="month"
                  lines={[
                    { key: 'avgInflow', name: 'Avg Inflow', color: '#22c55e' },
                    { key: 'avgOutflow', name: 'Avg Outflow', color: '#ef4444' },
                  ]}
                  height={300}
                /> */}
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={seasonalityData}>
                    <CartesianGrid
                      stroke="#1E293B"
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      dataKey="month"
                    />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="avgInflow"
                      stroke={chartColors.neonGreen}
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: chartColors.neonGreen
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="avgOutflow"
                      stroke={chartColors.neonRed}
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: chartColors.neonRed
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Trend Data Table */}
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Monthly Trend Data</CardTitle>
                <CardDescription>Detailed monthly cash flow with variance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={monthlyTrendData}
                  columns={trendColumns}
                  searchable={false}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Variance Analysis Tab */}
        <TabsContent value="variance" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Summary Cards */}
            <div className="col-span-12 grid grid-cols-4 gap-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Total Favorable</p>
                      <p className="text-2xl font-bold text-green-400">₹15.7 Cr</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-400/50" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Total Unfavorable</p>
                      <p className="text-2xl font-bold text-red-400">₹15.8 Cr</p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-red-400/50" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Net Variance</p>
                      <p className="text-2xl font-bold text-red-400">-₹0.1 Cr</p>
                    </div>
                    <Scale className="h-8 w-8 text-slate-400/50" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Variance %</p>
                      <p className="text-2xl font-bold text-red-400">-0.03%</p>
                    </div>
                    <Percent className="h-8 w-8 text-slate-400/50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Variance Table */}
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Budget vs Actual Variance</CardTitle>
                <CardDescription>Detailed variance analysis by category</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={varianceItems}
                  columns={varianceColumns}
                  searchable
                  searchPlaceholder="Search variances..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Comparisons Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Comparison Type Selector */}
            <div className="col-span-12">
              <Select value={selectedComparison} onValueChange={(value) => setSelectedComparison(value ?? "mom")}>
                <SelectTrigger className="w-[200px] bg-slate-900 border-slate-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mom">Month over Month</SelectItem>
                  <SelectItem value="qoq">Quarter over Quarter</SelectItem>
                  <SelectItem value="yoy">Year over Year</SelectItem>
                  <SelectItem value="entity">By Entity</SelectItem>
                  <SelectItem value="project">By Project</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comparison Metrics */}
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Period Comparison</CardTitle>
                <CardDescription>Key metrics comparison with benchmark</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={comparisonMetrics}
                  columns={comparisonColumns}
                  searchable={false}
                />
              </CardContent>
            </Card>

            {/* Entity Comparison */}
            <Card className="col-span-6 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Entity Comparison</CardTitle>
                <CardDescription>Cash flow by legal entity</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <BarChart
                  data={entityComparison}
                  xKey="entity"
                  bars={[
                    { key: 'inflow', name: 'Inflow', color: '#22c55e' },
                    { key: 'outflow', name: 'Outflow', color: '#ef4444' },
                    { key: 'netCash', name: 'Net Cash', color: '#3b82f6' },
                  ]}
                  height={300}
                /> */}
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={entityComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="entity" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inflow" name="Inflow" fill="#22c55e" />
                    <Bar dataKey="outflow" name="Outflow" fill="#ef4444" />
                    <Bar dataKey="netCash" name="Net Cash" fill="#3b82f6" />
                    <Bar dataKey="margin" name="Margin" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Project Comparison */}
            <Card className="col-span-6 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Project Comparison</CardTitle>
                <CardDescription>Budget vs Actual by project</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="project" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="budgeted" name="Budgeted" fill="#6b7280" />
                    <Bar dataKey="actual" name="Actual" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Quick Report Generation */}
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Quick Reports</CardTitle>
                <CardDescription>Generate common reports instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Cash Position
                  </Button>
                  <Button variant="outline" size="sm">
                    <Activity className="h-4 w-4 mr-2" />
                    Cash Flow Statement
                  </Button>
                  <Button variant="outline" size="sm">
                    <GitCompare className="h-4 w-4 mr-2" />
                    Variance Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Building2 className="h-4 w-4 mr-2" />
                    Entity Summary
                  </Button>
                  <Button variant="outline" size="sm">
                    <Layers className="h-4 w-4 mr-2" />
                    Project Summary
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Collections Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Wallet className="h-4 w-4 mr-2" />
                    Payments Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Bank Reconciliation
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Report List */}
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Available Reports</CardTitle>
                <CardDescription>Standard, custom, and scheduled reports</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={reportItems}
                  columns={reportColumns}
                  searchable
                  searchPlaceholder="Search reports..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Custom Analytics Tab */}
        <TabsContent value="custom" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Query Builder Placeholder */}
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Analytics Query Builder</CardTitle>
                <CardDescription>Create custom analytics queries and visualizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-48 border border-dashed border-slate-700 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400">Query Builder Interface</p>
                    <p className="text-sm text-slate-500 mt-1">Select dimensions, metrics, and filters to create custom analytics</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Hash className="h-4 w-4 mr-2" />
                      New Query
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Saved Queries */}
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Saved Queries</CardTitle>
                <CardDescription>Your saved and shared analytics queries</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={analyticsQueries}
                  columns={queryColumns}
                  searchable
                  searchPlaceholder="Search queries..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Trend Analysis
            </Button>
            <Button variant="outline" size="sm">
              <PieChartIcon className="h-4 w-4 mr-2" />
              Composition Analysis
            </Button>
            <Button variant="outline" size="sm">
              <GitCompare className="h-4 w-4 mr-2" />
              Period Comparison
            </Button>
            <Button variant="outline" size="sm">
              <Table className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print Report
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email Report
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Variance Detail Drawer */}
      <Drawer open={!!selectedVariance} onOpenChange={() => setSelectedVariance(null)}>
        <DrawerContent className="bg-slate-900 border-slate-800">
          <DrawerHeader>
            <DrawerTitle>Variance Details</DrawerTitle>
            <DrawerDescription>{selectedVariance?.category} - {selectedVariance?.subcategory}</DrawerDescription>
          </DrawerHeader>
          {selectedVariance && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Budgeted</p>
                  <p className="text-xl font-bold">{formatCurrency(selectedVariance.budgeted)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Actual</p>
                  <p className="text-xl font-bold">{formatCurrency(selectedVariance.actual)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Variance</p>
                  <p className={`text-xl font-bold ${getVarianceColor(selectedVariance.status)}`}>
                    {selectedVariance.variance >= 0 ? '+' : ''}{formatCurrency(selectedVariance.variance)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Status</p>
                  <Badge className={getVarianceBadgeColor(selectedVariance.status)}>
                    {selectedVariance.status.charAt(0).toUpperCase() + selectedVariance.status.slice(1).replace('-', ' ')}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Trend</p>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(selectedVariance.trend)}
                    <span className="capitalize">{selectedVariance.trend}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-400">Explanation</p>
                <p className="mt-1">{selectedVariance.explanation}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
