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
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { AreaChart, BarChart, PieChart, LineChart } from '@/components/shared/charts';
import { AIInsightCard } from '@/components/shared/ai-insight-card';
import { cashRiskTabs } from '@/config/cash-flow-navigation';
import {
  AlertTriangle,
  Shield,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  DollarSign,
  Building2,
  Percent,
  Users,
  FileWarning,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  Download,
  Bell,
  Eye,
  Zap,
  BarChart3,
  Gauge,
  AlertCircle,
  ShieldAlert,
  Scale,
  Landmark,
  CreditCard,
  TrendingUp as Trending,
} from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface RiskItem {
  id: string;
  category: string;
  description: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  probability: number;
  impact: string;
  impactAmount: number;
  status: 'active' | 'mitigated' | 'monitoring' | 'resolved';
  owner: string;
  dueDate: string;
  mitigationPlan: string;
  lastReviewed: string;
}

interface LiquidityRisk {
  id: string;
  entity: string;
  currentRatio: number;
  quickRatio: number;
  cashBuffer: number;
  cashBufferDays: number;
  burnRate: number;
  riskScore: number;
  trend: 'improving' | 'stable' | 'declining';
  alert: string | null;
}

interface ConcentrationRisk {
  id: string;
  type: 'customer' | 'bank' | 'project' | 'lender' | 'vendor';
  name: string;
  exposure: number;
  percentage: number;
  limit: number;
  utilizationPercent: number;
  riskLevel: 'high' | 'medium' | 'low';
  recommendation: string;
}

interface CovenantRisk {
  id: string;
  loanId: string;
  lender: string;
  covenantType: string;
  metric: string;
  required: number;
  actual: number;
  headroom: number;
  status: 'compliant' | 'warning' | 'breach';
  nextTestDate: string;
  trend: 'improving' | 'stable' | 'declining';
}

interface CounterpartyRisk {
  id: string;
  name: string;
  type: 'customer' | 'vendor' | 'bank' | 'contractor';
  exposure: number;
  creditRating: string;
  paymentHistory: number;
  riskScore: number;
  daysPastDue: number;
  watchlist: boolean;
  lastReview: string;
}

interface FxRisk {
  id: string;
  currency: string;
  exposure: number;
  hedgedAmount: number;
  hedgeRatio: number;
  spotRate: number;
  volatility: number;
  varDaily: number;
  recommendation: string;
}

interface RiskAlert {
  id: string;
  timestamp: string;
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  status: 'new' | 'acknowledged' | 'resolved';
  assignee: string | null;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const kpiData = {
  overallRiskScore: {
    value: 72,
    maxValue: 100,
    trend: 'down' as const,
    trendValue: -3,
    status: 'medium' as const,
  },
  liquidityRisk: {
    value: 'Medium',
    score: 65,
    trend: 'neutral' as const,
    bufferDays: 45,
  },
  concentrationRisk: {
    value: 'High',
    score: 78,
    trend: 'up' as const,
    topExposure: 'HDFC Bank - 42%',
  },
  covenantRisk: {
    value: 'Low',
    score: 25,
    breaches: 0,
    warnings: 2,
  },
};

const riskItems: RiskItem[] = [
  {
    id: 'RSK001',
    category: 'Liquidity',
    description: 'Cash buffer below 30-day threshold for Skyline Heights project',
    riskLevel: 'high',
    probability: 75,
    impact: 'Project delays, contractor disputes',
    impactAmount: 15.5,
    status: 'active',
    owner: 'Rajesh Kumar',
    dueDate: '2025-02-15',
    mitigationPlan: 'Accelerate collection from Lodha Group, defer non-critical payments',
    lastReviewed: '2025-01-20',
  },
  {
    id: 'RSK002',
    category: 'Concentration',
    description: 'HDFC Bank exposure exceeds 40% of total banking relationships',
    riskLevel: 'medium',
    probability: 60,
    impact: 'Counterparty risk, pricing power loss',
    impactAmount: 245.0,
    status: 'monitoring',
    owner: 'Priya Sharma',
    dueDate: '2025-03-01',
    mitigationPlan: 'Open new credit lines with ICICI and Axis Bank',
    lastReviewed: '2025-01-18',
  },
  {
    id: 'RSK003',
    category: 'Covenant',
    description: 'DSCR approaching minimum threshold for ICICI term loan',
    riskLevel: 'medium',
    probability: 45,
    impact: 'Covenant breach, accelerated repayment',
    impactAmount: 75.0,
    status: 'active',
    owner: 'Amit Patel',
    dueDate: '2025-02-28',
    mitigationPlan: 'Reduce discretionary capex, improve collections',
    lastReviewed: '2025-01-22',
  },
  {
    id: 'RSK004',
    category: 'Counterparty',
    description: 'DLF Ltd showing deteriorating payment patterns',
    riskLevel: 'high',
    probability: 55,
    impact: 'Collection delays, bad debt provisioning',
    impactAmount: 28.5,
    status: 'active',
    owner: 'Sunita Reddy',
    dueDate: '2025-02-10',
    mitigationPlan: 'Reduce credit limit, demand security deposit',
    lastReviewed: '2025-01-21',
  },
  {
    id: 'RSK005',
    category: 'FX',
    description: 'Unhedged USD exposure for equipment imports',
    riskLevel: 'low',
    probability: 30,
    impact: 'Cost overrun on imported equipment',
    impactAmount: 8.2,
    status: 'mitigated',
    owner: 'Vikram Singh',
    dueDate: '2025-04-15',
    mitigationPlan: 'Execute forward contracts for 80% exposure',
    lastReviewed: '2025-01-19',
  },
  {
    id: 'RSK006',
    category: 'Interest Rate',
    description: 'Rising MCLR impacting floating rate loans',
    riskLevel: 'medium',
    probability: 70,
    impact: 'Increased interest expense',
    impactAmount: 12.8,
    status: 'monitoring',
    owner: 'Amit Patel',
    dueDate: '2025-03-31',
    mitigationPlan: 'Consider interest rate swaps, refinance to fixed rates',
    lastReviewed: '2025-01-20',
  },
];

const liquidityRisks: LiquidityRisk[] = [
  {
    id: 'LIQ001',
    entity: 'Skyline Towers Pvt Ltd',
    currentRatio: 1.45,
    quickRatio: 0.92,
    cashBuffer: 12.5,
    cashBufferDays: 28,
    burnRate: 0.45,
    riskScore: 72,
    trend: 'declining',
    alert: 'Cash buffer below 30-day threshold',
  },
  {
    id: 'LIQ002',
    entity: 'Green Valley Developers',
    currentRatio: 1.82,
    quickRatio: 1.15,
    cashBuffer: 45.2,
    cashBufferDays: 65,
    burnRate: 0.70,
    riskScore: 35,
    trend: 'stable',
    alert: null,
  },
  {
    id: 'LIQ003',
    entity: 'Metro Commercial Hub',
    currentRatio: 1.25,
    quickRatio: 0.78,
    cashBuffer: 8.8,
    cashBufferDays: 18,
    burnRate: 0.49,
    riskScore: 85,
    trend: 'declining',
    alert: 'Critical - Immediate action required',
  },
  {
    id: 'LIQ004',
    entity: 'Sunrise Residences',
    currentRatio: 2.10,
    quickRatio: 1.45,
    cashBuffer: 68.5,
    cashBufferDays: 95,
    burnRate: 0.72,
    riskScore: 22,
    trend: 'improving',
    alert: null,
  },
  {
    id: 'LIQ005',
    entity: 'Urban Heights Project',
    currentRatio: 1.55,
    quickRatio: 1.02,
    cashBuffer: 22.3,
    cashBufferDays: 42,
    burnRate: 0.53,
    riskScore: 55,
    trend: 'stable',
    alert: 'Monitor closely - approaching threshold',
  },
];

const concentrationRisks: ConcentrationRisk[] = [
  {
    id: 'CON001',
    type: 'bank',
    name: 'HDFC Bank',
    exposure: 245.5,
    percentage: 42.3,
    limit: 35.0,
    utilizationPercent: 120.8,
    riskLevel: 'high',
    recommendation: 'Diversify to other banks within 60 days',
  },
  {
    id: 'CON002',
    type: 'customer',
    name: 'Lodha Group',
    exposure: 125.8,
    percentage: 28.5,
    limit: 25.0,
    utilizationPercent: 114.0,
    riskLevel: 'high',
    recommendation: 'Reduce exposure, increase security deposits',
  },
  {
    id: 'CON003',
    type: 'project',
    name: 'Skyline Heights',
    exposure: 185.2,
    percentage: 35.2,
    limit: 40.0,
    utilizationPercent: 88.0,
    riskLevel: 'medium',
    recommendation: 'Within limits, continue monitoring',
  },
  {
    id: 'CON004',
    type: 'lender',
    name: 'ICICI Bank',
    exposure: 175.0,
    percentage: 32.5,
    limit: 35.0,
    utilizationPercent: 92.9,
    riskLevel: 'medium',
    recommendation: 'Approaching limit, explore alternatives',
  },
  {
    id: 'CON005',
    type: 'vendor',
    name: 'L&T Construction',
    exposure: 85.5,
    percentage: 22.8,
    limit: 30.0,
    utilizationPercent: 76.0,
    riskLevel: 'low',
    recommendation: 'Healthy diversification',
  },
];

const covenantRisks: CovenantRisk[] = [
  {
    id: 'COV001',
    loanId: 'LN2024001',
    lender: 'ICICI Bank',
    covenantType: 'Financial',
    metric: 'DSCR',
    required: 1.50,
    actual: 1.58,
    headroom: 5.3,
    status: 'warning',
    nextTestDate: '2025-03-31',
    trend: 'declining',
  },
  {
    id: 'COV002',
    loanId: 'LN2024002',
    lender: 'HDFC Bank',
    covenantType: 'Financial',
    metric: 'Current Ratio',
    required: 1.25,
    actual: 1.82,
    headroom: 45.6,
    status: 'compliant',
    nextTestDate: '2025-03-31',
    trend: 'stable',
  },
  {
    id: 'COV003',
    loanId: 'LN2024001',
    lender: 'ICICI Bank',
    covenantType: 'Financial',
    metric: 'Debt/Equity',
    required: 2.50,
    actual: 2.15,
    headroom: 14.0,
    status: 'compliant',
    nextTestDate: '2025-03-31',
    trend: 'improving',
  },
  {
    id: 'COV004',
    loanId: 'LN2024003',
    lender: 'SBI',
    covenantType: 'Operational',
    metric: 'Project Completion',
    required: 75.0,
    actual: 72.0,
    headroom: -4.0,
    status: 'warning',
    nextTestDate: '2025-02-28',
    trend: 'stable',
  },
  {
    id: 'COV005',
    loanId: 'LN2024004',
    lender: 'Axis Bank',
    covenantType: 'Financial',
    metric: 'Interest Coverage',
    required: 2.00,
    actual: 2.85,
    headroom: 42.5,
    status: 'compliant',
    nextTestDate: '2025-03-31',
    trend: 'improving',
  },
];

const counterpartyRisks: CounterpartyRisk[] = [
  {
    id: 'CPR001',
    name: 'DLF Ltd',
    type: 'customer',
    exposure: 28.5,
    creditRating: 'BBB-',
    paymentHistory: 68,
    riskScore: 75,
    daysPastDue: 45,
    watchlist: true,
    lastReview: '2025-01-15',
  },
  {
    id: 'CPR002',
    name: 'Lodha Group',
    type: 'customer',
    exposure: 125.8,
    creditRating: 'A-',
    paymentHistory: 88,
    riskScore: 42,
    daysPastDue: 12,
    watchlist: false,
    lastReview: '2025-01-20',
  },
  {
    id: 'CPR003',
    name: 'L&T Construction',
    type: 'contractor',
    exposure: 85.5,
    creditRating: 'AA',
    paymentHistory: 95,
    riskScore: 18,
    daysPastDue: 0,
    watchlist: false,
    lastReview: '2025-01-18',
  },
  {
    id: 'CPR004',
    name: 'Shapoorji Pallonji',
    type: 'contractor',
    exposure: 65.2,
    creditRating: 'A+',
    paymentHistory: 92,
    riskScore: 25,
    daysPastDue: 0,
    watchlist: false,
    lastReview: '2025-01-19',
  },
  {
    id: 'CPR005',
    name: 'Prestige Estates',
    type: 'customer',
    exposure: 42.8,
    creditRating: 'BB+',
    paymentHistory: 72,
    riskScore: 62,
    daysPastDue: 28,
    watchlist: true,
    lastReview: '2025-01-21',
  },
];

const fxRisks: FxRisk[] = [
  {
    id: 'FX001',
    currency: 'USD/INR',
    exposure: 12.5,
    hedgedAmount: 10.0,
    hedgeRatio: 80,
    spotRate: 83.25,
    volatility: 4.2,
    varDaily: 0.28,
    recommendation: 'Maintain current hedge ratio',
  },
  {
    id: 'FX002',
    currency: 'EUR/INR',
    exposure: 5.8,
    hedgedAmount: 3.5,
    hedgeRatio: 60,
    spotRate: 90.45,
    volatility: 5.8,
    varDaily: 0.18,
    recommendation: 'Increase hedge to 80%',
  },
  {
    id: 'FX003',
    currency: 'GBP/INR',
    exposure: 3.2,
    hedgedAmount: 1.6,
    hedgeRatio: 50,
    spotRate: 105.80,
    volatility: 6.5,
    varDaily: 0.12,
    recommendation: 'Consider forward contracts',
  },
];

const riskAlerts: RiskAlert[] = [
  {
    id: 'ALT001',
    timestamp: '2025-01-22 14:30',
    category: 'Liquidity',
    severity: 'critical',
    title: 'Metro Commercial Hub cash buffer critical',
    description: 'Cash buffer dropped to 18 days, below 30-day minimum threshold',
    status: 'new',
    assignee: null,
  },
  {
    id: 'ALT002',
    timestamp: '2025-01-22 11:15',
    category: 'Covenant',
    severity: 'high',
    title: 'DSCR approaching covenant threshold',
    description: 'ICICI Bank loan DSCR at 1.58, required minimum 1.50',
    status: 'acknowledged',
    assignee: 'Amit Patel',
  },
  {
    id: 'ALT003',
    timestamp: '2025-01-22 09:45',
    category: 'Counterparty',
    severity: 'medium',
    title: 'DLF payment delay exceeds 45 days',
    description: 'Outstanding amount ₹28.5 Cr now 45 days past due',
    status: 'acknowledged',
    assignee: 'Sunita Reddy',
  },
  {
    id: 'ALT004',
    timestamp: '2025-01-21 16:20',
    category: 'Concentration',
    severity: 'medium',
    title: 'HDFC Bank concentration limit exceeded',
    description: 'Exposure at 42.3% against 35% limit',
    status: 'acknowledged',
    assignee: 'Priya Sharma',
  },
];

const riskTrendData = [
  { month: 'Aug', overall: 68, liquidity: 55, concentration: 72, covenant: 28, counterparty: 45 },
  { month: 'Sep', overall: 65, liquidity: 52, concentration: 70, covenant: 25, counterparty: 48 },
  { month: 'Oct', overall: 70, liquidity: 58, concentration: 75, covenant: 22, counterparty: 52 },
  { month: 'Nov', overall: 72, liquidity: 62, concentration: 78, covenant: 24, counterparty: 55 },
  { month: 'Dec', overall: 75, liquidity: 65, concentration: 80, covenant: 26, counterparty: 58 },
  { month: 'Jan', overall: 72, liquidity: 65, concentration: 78, covenant: 25, counterparty: 55 },
];

const riskByCategory = [
  { name: 'Liquidity', value: 35, color: '#ef4444' },
  { name: 'Concentration', value: 28, color: '#f97316' },
  { name: 'Counterparty', value: 18, color: '#eab308' },
  { name: 'Covenant', value: 12, color: '#22c55e' },
  { name: 'FX & Interest', value: 7, color: '#3b82f6' },
];

const riskMatrixData = [
  { category: 'Critical', count: 1, percentage: 8 },
  { category: 'High', count: 3, percentage: 25 },
  { category: 'Medium', count: 5, percentage: 42 },
  { category: 'Low', count: 3, percentage: 25 },
];

const aiInsights = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'Liquidity Stress Predicted',
    description: 'AI models predict liquidity stress in Metro Commercial Hub within 15 days based on current burn rate and collection patterns.',
    action: 'Initiate emergency funding',
    impact: '₹45 Cr potential shortfall',
    confidence: 92,
  },
  {
    id: '2',
    type: 'insight' as const,
    title: 'Concentration Risk Mitigation',
    description: 'Opening credit lines with 2 additional banks could reduce HDFC concentration to 28% within 90 days.',
    action: 'Explore new banking relationships',
    impact: 'Reduce concentration by 14%',
    confidence: 88,
  },
  {
    id: '3',
    type: 'recommendation' as const,
    title: 'Covenant Compliance Strategy',
    description: 'Accelerating collections by ₹25 Cr would improve DSCR to 1.72, providing 15% headroom above minimum.',
    action: 'Priority collection campaign',
    impact: 'DSCR improvement +0.14',
    confidence: 85,
  },
  {
    id: '4',
    type: 'opportunity' as const,
    title: 'Interest Rate Hedge Opportunity',
    description: 'Current swap rates favorable for converting ₹150 Cr floating to fixed, locking in 8.75% vs projected 9.25%.',
    action: 'Execute interest rate swap',
    impact: '₹7.5 Cr annual savings',
    confidence: 78,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getRiskLevelColor = (level: string) => {
  switch (level) {
    case 'critical':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'high':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'low':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
    case 'new':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'monitoring':
    case 'acknowledged':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'mitigated':
    case 'resolved':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'compliant':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'warning':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'breach':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'improving':
      return <TrendingDown className="h-4 w-4 text-green-400" />;
    case 'declining':
      return <TrendingUp className="h-4 w-4 text-red-400" />;
    default:
      return <Activity className="h-4 w-4 text-yellow-400" />;
  }
};

const formatCurrency = (value: number) => {
  return `₹${value.toFixed(2)} Cr`;
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function CashRiskIntelligencePage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  // const [filters, setFilters] = useState<CashFlowFilterState>({
  //   search: '',
  //   dateRange: { startDate: undefined, endDate: undefined },
  //   entities: [],
  //   projects: [],
  //   banks: [],
  //   transactionTypes: [],
  //   status: [],
  //   minAmount: undefined,
  //   maxAmount: undefined,
  //   currency: 'INR',
  //   groupBy: 'none',
  //   sortBy: 'date',
  //   sortOrder: 'desc',
  // });
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
      statusIds: [],
      tagIds: [],
      scenario: 'actual',
      forecastVersion: 'current',
      forecastHorizon: '3m',
      datePreset: 'thisMonth',
      dateRange: { startDate: undefined, endDate: undefined },
    });
  const [selectedRisk, setSelectedRisk] = useState<RiskItem | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<RiskAlert | null>(null);

  // Get tabs configuration
  // const tabs = cashRiskTabs || [
  const tabs = [
    { id: 'dashboard', label: 'Risk Dashboard' },
    { id: 'liquidity', label: 'Liquidity Risk' },
    { id: 'concentration', label: 'Concentration Risk' },
    { id: 'covenant', label: 'Covenant Risk' },
    { id: 'counterparty', label: 'Counterparty Risk' },
    { id: 'fx', label: 'FX & Interest Risk' },
    { id: 'alerts', label: 'Risk Alerts' },
  ];

  // Column definitions
  const riskColumns: Column<RiskItem>[] = [
    {
      id: 'id',
      header: 'Risk ID',      
      accessor: 'id',
      cell: (row) => <span className="font-mono text-sm">{row.id}</span>,
      sortable: true,
    },
    {
      id: 'category',
      header: 'Category',
      accessor: 'category',
      cell: (row) => (
        <Badge variant="outline" className="bg-slate-800/50">
          {row.category}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: 'description',
      header: 'Description',
      accessor: 'description',
      cell: (row) => (
        <span className="text-sm max-w-[300px] truncate block">{row.description}</span>
      ),
    },
    {
      id: 'riskLevel',
      header: 'Risk Level',
      accessor: 'riskLevel',
      cell: (row) => (
        <Badge className={getRiskLevelColor(row.riskLevel)}>
          {row.riskLevel.toUpperCase()}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: 'probability',
      header: 'Probability',
      accessor: 'probability',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${row.probability > 60 ? 'bg-red-500' : row.probability > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${row.probability}%` }}
            />
          </div>
          <span className="text-sm">{row.probability}%</span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'impactAmount',
      header: 'Impact',
      accessor: 'impactAmount',
      cell: (row) => <span className="text-red-400">{formatCurrency(row.impactAmount)}</span>,
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <Badge className={getStatusColor(row.status)}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: 'owner',
      header: 'Owner',
      accessor: 'owner',
      cell: (row) => <span className="text-sm">{row.owner}</span>,
      sortable: true,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedRisk(row)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const liquidityColumns: Column<LiquidityRisk>[] = [
    {
      id: 'entity',
      header: 'Entity',
      cell: (row) => <span className="font-medium">{row.entity}</span>,
      sortable: true,
    },
    {
      id: 'currentRatio',
      header: 'Current Ratio',
      cell: (row) => (
        <span className={row.currentRatio < 1.25 ? 'text-red-400' : row.currentRatio < 1.5 ? 'text-yellow-400' : 'text-green-400'}>
          {row.currentRatio.toFixed(2)}
        </span>
      ),
      sortable: true,
    },
    {
      id: 'quickRatio',
      header: 'Quick Ratio',
      cell: (row) => (
        <span className={row.quickRatio < 1.0 ? 'text-red-400' : row.quickRatio < 1.2 ? 'text-yellow-400' : 'text-green-400'}>
          {row.quickRatio.toFixed(2)}
        </span>
      ),
      sortable: true,
    },
    {
      id: 'cashBuffer',
      header: 'Cash Buffer',
      cell: (row) => formatCurrency(row.cashBuffer),
      sortable: true,
    },
    {
      id: 'cashBufferDays',
      header: 'Buffer Days',
      cell: (row) => (
        <span className={row.cashBufferDays < 30 ? 'text-red-400' : row.cashBufferDays < 45 ? 'text-yellow-400' : 'text-green-400'}>
          {row.cashBufferDays} days
        </span>
      ),
      sortable: true,
    },
    {
      id: 'riskScore',
      header: 'Risk Score',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${row.riskScore > 70 ? 'bg-red-500' : row.riskScore > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${row.riskScore}%` }}
            />
          </div>
          <span className="text-sm">{row.riskScore}</span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'trend',
      header: 'Trend',
      cell: (row) => (
        <div className="flex items-center gap-1">
          {getTrendIcon(row.trend)}
          <span className="text-sm capitalize">{row.trend}</span>
        </div>
      ),
    },
    {
      id: 'alert',
      header: 'Alert',
      cell: (row) => row.alert ? (
        <span className="text-xs text-red-400">{row.alert}</span>
      ) : (
        <span className="text-xs text-slate-500">-</span>
      ),
    },
  ];

  const concentrationColumns: Column<ConcentrationRisk>[] = [
    {
      id: 'type',
      header: 'Type',
      cell: (row) => (
        <Badge variant="outline" className="capitalize bg-slate-800/50">
          {row.type}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: 'name',
      header: 'Name',
      cell: (row) => <span className="font-medium">{row.name}</span>,
      sortable: true,
    },
    {
      id: 'exposure',
      header: 'Exposure',
      cell: (row) => formatCurrency(row.exposure),
      sortable: true,
    },
    {
      id: 'percentage',
      header: '% of Total',
      cell: (row) => formatPercentage(row.percentage),
      sortable: true,
    },
    {
      id: 'limit',
      header: 'Limit',
      cell: (row) => formatPercentage(row.limit),
    },
    {
      id: 'utilizationPercent',
      header: 'Utilization',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${row.utilizationPercent > 100 ? 'bg-red-500' : row.utilizationPercent > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(row.utilizationPercent, 100)}%` }}
            />
          </div>
          <span className={`text-sm ${row.utilizationPercent > 100 ? 'text-red-400' : ''}`}>
            {formatPercentage(row.utilizationPercent)}
          </span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'riskLevel',
      header: 'Risk',
      cell: (row) => (
        <Badge className={getRiskLevelColor(row.riskLevel)}>
          {row.riskLevel.toUpperCase()}
        </Badge>
      ),
    },
    {
      id: 'recommendation',
      header: 'Recommendation',
      cell: (row) => <span className="text-xs text-slate-400">{row.recommendation}</span>,
    },
  ];

  const covenantColumns: Column<CovenantRisk>[] = [
    {
      id: 'lender',
      header: 'Lender',
      cell: (row) => <span className="font-medium">{row.lender}</span>,
      sortable: true,
    },
    {
      id: 'covenantType',
      header: 'Type',
      cell: (row) => (
        <Badge variant="outline" className="bg-slate-800/50">
          {row.covenantType}
        </Badge>
      ),
    },
    {
      id: 'metric',
      header: 'Metric',
      cell: (row) => <span>{row.metric}</span>,
      sortable: true,
    },
    {
      id: 'required',
      header: 'Required',
      cell: (row) => <span>{row.required.toFixed(2)}</span>,
    },
    {
      id: 'actual',
      header: 'Actual',
      cell: (row) => (
        <span className={row.status === 'breach' ? 'text-red-400' : row.status === 'warning' ? 'text-yellow-400' : 'text-green-400'}>
          {row.actual.toFixed(2)}
        </span>
      ),
      sortable: true,
    },
    {
      id: 'headroom',
      header: 'Headroom',
      cell: (row) => (
        <span className={row.headroom < 10 ? 'text-red-400' : row.headroom < 20 ? 'text-yellow-400' : 'text-green-400'}>
          {formatPercentage(row.headroom)}
        </span>
      ),
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge className={getStatusColor(row.status)}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
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
      id: 'nextTestDate',
      header: 'Next Test',
      cell: (row) => <span className="text-sm">{row.nextTestDate}</span>,
      sortable: true,
    },
  ];

  const counterpartyColumns: Column<CounterpartyRisk>[] = [
    {
      id: 'name',
      header: 'Counterparty',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.name}</span>
          {row.watchlist && (
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          )}
        </div>
      ),
      sortable: true,
    },
    {
      id: 'type',
      header: 'Type',
      cell: (row) => (
        <Badge variant="outline" className="capitalize bg-slate-800/50">
          {row.type}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: 'exposure',
      header: 'Exposure',
      cell: (row) => formatCurrency(row.exposure),
      sortable: true,
    },
    {
      id: 'creditRating',
      header: 'Credit Rating',
      cell: (row) => (
        <Badge variant="outline" className={
          row.creditRating.startsWith('A') ? 'bg-green-500/20 text-green-400' :
          row.creditRating.startsWith('B') ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }>
          {row.creditRating}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: 'paymentHistory',
      header: 'Payment Score',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${row.paymentHistory < 70 ? 'bg-red-500' : row.paymentHistory < 85 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${row.paymentHistory}%` }}
            />
          </div>
          <span className="text-sm">{row.paymentHistory}%</span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'daysPastDue',
      header: 'Days Past Due',
      cell: (row) => (
        <span className={row.daysPastDue > 30 ? 'text-red-400' : row.daysPastDue > 0 ? 'text-yellow-400' : 'text-green-400'}>
          {row.daysPastDue}
        </span>
      ),
      sortable: true,
    },
    {
      id: 'riskScore',
      header: 'Risk Score',
      cell: (row) => (
        <Badge className={row.riskScore > 60 ? 'bg-red-500/20 text-red-400' : row.riskScore > 40 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}>
          {row.riskScore}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: 'watchlist',
      header: 'Watchlist',
      cell: (row) => row.watchlist ? (
        <Badge className="bg-orange-500/20 text-orange-400">On Watch</Badge>
      ) : (
        <span className="text-slate-500">-</span>
      ),
    },
  ];

  const fxColumns: Column<FxRisk>[] = [
    {
      id: 'currency',
      header: 'Currency Pair',
      cell: (row) => <span className="font-medium font-mono">{row.currency}</span>,
      sortable: true,
    },
    {
      id: 'exposure',
      header: 'Exposure',
      cell: (row) => formatCurrency(row.exposure),
      sortable: true,
    },
    {
      id: 'hedgedAmount',
      header: 'Hedged',
      cell: (row) => formatCurrency(row.hedgedAmount),
      sortable: true,
    },
    {
      id: 'hedgeRatio',
      header: 'Hedge Ratio',
      cell: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${row.hedgeRatio < 50 ? 'bg-red-500' : row.hedgeRatio < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${row.hedgeRatio}%` }}
            />
          </div>
          <span className="text-sm">{row.hedgeRatio}%</span>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'spotRate',
      header: 'Spot Rate',
      cell: (row) => <span className="font-mono">{row.spotRate.toFixed(2)}</span>,
    },
    {
      id: 'volatility',
      header: 'Volatility',
      cell: (row) => (
        <span className={row.volatility > 5 ? 'text-orange-400' : 'text-slate-400'}>
          {row.volatility.toFixed(1)}%
        </span>
      ),
      sortable: true,
    },
    {
      id: 'varDaily',
      header: 'Daily VaR',
      cell: (row) => formatCurrency(row.varDaily),
    },
    {
      id: 'recommendation',
      header: 'Recommendation',
      cell: (row) => <span className="text-xs text-slate-400">{row.recommendation}</span>,
    },
  ];

  const alertColumns: Column<RiskAlert>[] = [
    {
      id: 'timestamp',
      header: 'Time',
      cell: (row) => <span className="text-sm text-slate-400">{row.timestamp}</span>,
      sortable: true,
    },
    {
      id: 'severity',
      header: 'Severity',
      cell: (row) => (
        <Badge className={getRiskLevelColor(row.severity)}>
          {row.severity.toUpperCase()}
        </Badge>
      ),
      sortable: true,
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
      id: 'title',
      header: 'Alert',
      cell: (row) => <span className="font-medium">{row.title}</span>,
    },
    {
      id: 'description',
      header: 'Description',
      cell: (row) => <span className="text-sm text-slate-400 max-w-[300px] truncate block">{row.description}</span>,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge className={getStatusColor(row.status)}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
    {
      id: 'assignee',
      header: 'Assignee',
      cell: (row) => row.assignee ? (
        <span className="text-sm">{row.assignee}</span>
      ) : (
        <span className="text-slate-500">Unassigned</span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedAlert(row)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Cash Risk Intelligence"
        description="Comprehensive risk monitoring and early warning system"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Cash Flow', href: '/cash-flow' },
          { label: 'Risk Intelligence' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Configure Alerts
            </Button>
          </div>
        }
      />

      {/* Filters */}
      <CashFlowFilters
        initialFilters={filters}
        onFilterChange={setFilters}
        // variant="compact"
        // availableFilters={['search', 'dateRange', 'entities', 'projects', 'status']}
      />

      {/* KPI Grid */}
      <KPIGrid columns={4}>
        <KPICard
          title="Overall Risk Score"
          value={kpiData.overallRiskScore.value}
          // suffix="/100"
          icon={Gauge}
          // icon={<Gauge className="h-5 w-5" />}
          trend={kpiData.overallRiskScore.trend}
          change={kpiData.overallRiskScore.trendValue}
          className={kpiData.overallRiskScore.value > 70 ? 'border-orange-500/30' : kpiData.overallRiskScore.value > 50 ? 'border-yellow-500/30' : 'border-green-500/30'}
        />
        <KPICard
          title="Liquidity Risk"
          value={kpiData.liquidityRisk.value}
          subtitle={`${kpiData.liquidityRisk.bufferDays} days buffer`}
          icon={Activity}
          // icon={<Activity className="h-5 w-5" />}
          trend={kpiData.liquidityRisk.trend}
          className="border-yellow-500/30"
        />
        <KPICard
          title="Concentration Risk"
          value={kpiData.concentrationRisk.value}
          subtitle={kpiData.concentrationRisk.topExposure}
          icon={Target}
          // icon={<Target className="h-5 w-5" />}
          trend={kpiData.concentrationRisk.trend}
          className="border-orange-500/30"
        />
        <KPICard
          title="Covenant Risk"
          value={kpiData.covenantRisk.value}
          subtitle={`${kpiData.covenantRisk.breaches} breaches, ${kpiData.covenantRisk.warnings} warnings`}
          icon={Shield}
          className="border-green-500/30"
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

        {/* Risk Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Risk Trend Chart */}
            <Card className="col-span-8 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Risk Score Trend</CardTitle>
                <CardDescription>6-month risk evolution across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={riskTrendData}
                  xKey="month"
                  lines={[
                    { key: 'overall', name: 'Overall', color: '#3b82f6' },
                    { key: 'liquidity', name: 'Liquidity', color: '#ef4444' },
                    { key: 'concentration', name: 'Concentration', color: '#f97316' },
                    { key: 'covenant', name: 'Covenant', color: '#22c55e' },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>

            {/* Risk by Category */}
            <Card className="col-span-4 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Risk by Category</CardTitle>
                <CardDescription>Current risk distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={riskByCategory}
                  nameKey="name"
                  valueKey="value"
                  height={250}
                />
              </CardContent>
            </Card>

            {/* Risk Matrix */}
            <Card className="col-span-4 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Risk Matrix</CardTitle>
                <CardDescription>Active risks by severity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {riskMatrixData.map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={getRiskLevelColor(item.category.toLowerCase())}>
                          {item.category}
                        </Badge>
                        <span className="text-sm text-slate-400">{item.count} risks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              item.category === 'Critical' ? 'bg-red-500' :
                              item.category === 'High' ? 'bg-orange-500' :
                              item.category === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm w-10 text-right">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="col-span-8 bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Recent Risk Alerts</CardTitle>
                  <CardDescription>Unresolved alerts requiring attention</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab('alerts')}>
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {riskAlerts.slice(0, 4).map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          alert.severity === 'critical' ? 'bg-red-500/20' :
                          alert.severity === 'high' ? 'bg-orange-500/20' :
                          'bg-yellow-500/20'
                        }`}>
                          <AlertTriangle className={`h-4 w-4 ${
                            alert.severity === 'critical' ? 'text-red-400' :
                            alert.severity === 'high' ? 'text-orange-400' :
                            'text-yellow-400'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{alert.title}</p>
                          <p className="text-xs text-slate-400 mt-1">{alert.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getStatusColor(alert.status)} variant="outline">
                              {alert.status}
                            </Badge>
                            <span className="text-xs text-slate-500">{alert.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedAlert(alert)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <div className="col-span-12 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                AI Risk Insights
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {aiInsights.map((insight) => (
                  <AIInsightCard
                    key={insight.id}
                    type={insight.type}
                    title={insight.title}
                    description={insight.description}
                    action={insight.action}
                    impact={insight.impact}
                    confidence={insight.confidence}
                  />
                ))}
              </div>
            </div>

            {/* Active Risks Table */}
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Active Risk Register</CardTitle>
                <CardDescription>All monitored risks and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={riskItems}
                  columns={riskColumns}
                  searchable
                  searchPlaceholder="Search risks..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Liquidity Risk Tab */}
        <TabsContent value="liquidity" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Liquidity Risk by Entity</CardTitle>
                <CardDescription>Cash buffer and liquidity metrics across entities</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={liquidityRisks}
                  columns={liquidityColumns}
                  searchable
                  searchPlaceholder="Search entities..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Concentration Risk Tab */}
        <TabsContent value="concentration" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Concentration Risk Analysis</CardTitle>
                <CardDescription>Exposure limits and utilization by category</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={concentrationRisks}
                  columns={concentrationColumns}
                  searchable
                  searchPlaceholder="Search..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Covenant Risk Tab */}
        <TabsContent value="covenant" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Covenant Compliance Monitor</CardTitle>
                <CardDescription>Financial and operational covenant tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={covenantRisks}
                  columns={covenantColumns}
                  searchable
                  searchPlaceholder="Search covenants..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Counterparty Risk Tab */}
        <TabsContent value="counterparty" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Counterparty Risk Assessment</CardTitle>
                <CardDescription>Credit risk and payment behavior analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={counterpartyRisks}
                  columns={counterpartyColumns}
                  searchable
                  searchPlaceholder="Search counterparties..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* FX & Interest Risk Tab */}
        <TabsContent value="fx" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">FX Exposure & Hedging</CardTitle>
                <CardDescription>Currency exposure and hedge positions</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={fxRisks}
                  columns={fxColumns}
                  searchable
                  searchPlaceholder="Search currencies..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Risk Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">All Risk Alerts</CardTitle>
                <CardDescription>Complete alert history and management</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={riskAlerts}
                  columns={alertColumns}
                  searchable
                  searchPlaceholder="Search alerts..."
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
              <ShieldAlert className="h-4 w-4 mr-2" />
              Run Risk Assessment
            </Button>
            <Button variant="outline" size="sm">
              <Scale className="h-4 w-4 mr-2" />
              Rebalance Exposures
            </Button>
            <Button variant="outline" size="sm">
              <Landmark className="h-4 w-4 mr-2" />
              Review Covenants
            </Button>
            <Button variant="outline" size="sm">
              <CreditCard className="h-4 w-4 mr-2" />
              Hedge Recommendations
            </Button>
            <Button variant="outline" size="sm">
              <Trending className="h-4 w-4 mr-2" />
              Stress Test Scenarios
            </Button>
            <Button variant="outline" size="sm">
              <FileWarning className="h-4 w-4 mr-2" />
              Generate Risk Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Risk Detail Drawer */}
      <Drawer open={!!selectedRisk} onOpenChange={() => setSelectedRisk(null)}>
        <DrawerContent className="bg-slate-900 border-slate-800">
          <DrawerHeader>
            <DrawerTitle>Risk Details - {selectedRisk?.id}</DrawerTitle>
            <DrawerDescription>{selectedRisk?.category} Risk</DrawerDescription>
          </DrawerHeader>
          {selectedRisk && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Description</p>
                  <p className="font-medium">{selectedRisk.description}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Risk Level</p>
                  <Badge className={getRiskLevelColor(selectedRisk.riskLevel)}>
                    {selectedRisk.riskLevel.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Probability</p>
                  <p className="font-medium">{selectedRisk.probability}%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Impact Amount</p>
                  <p className="font-medium text-red-400">{formatCurrency(selectedRisk.impactAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Impact Description</p>
                  <p className="font-medium">{selectedRisk.impact}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Status</p>
                  <Badge className={getStatusColor(selectedRisk.status)}>
                    {selectedRisk.status.charAt(0).toUpperCase() + selectedRisk.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Risk Owner</p>
                  <p className="font-medium">{selectedRisk.owner}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Due Date</p>
                  <p className="font-medium">{selectedRisk.dueDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-400">Mitigation Plan</p>
                  <p className="font-medium">{selectedRisk.mitigationPlan}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Mitigated
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Update Status
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Reassign
                </Button>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* Alert Detail Drawer */}
      <Drawer open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DrawerContent className="bg-slate-900 border-slate-800">
          <DrawerHeader>
            <DrawerTitle>Alert Details</DrawerTitle>
            <DrawerDescription>{selectedAlert?.category} Alert</DrawerDescription>
          </DrawerHeader>
          {selectedAlert && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <p className="text-sm text-slate-400">Title</p>
                  <p className="font-medium">{selectedAlert.title}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-slate-400">Description</p>
                  <p className="font-medium">{selectedAlert.description}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Severity</p>
                  <Badge className={getRiskLevelColor(selectedAlert.severity)}>
                    {selectedAlert.severity.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Status</p>
                  <Badge className={getStatusColor(selectedAlert.status)}>
                    {selectedAlert.status.charAt(0).toUpperCase() + selectedAlert.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Timestamp</p>
                  <p className="font-medium">{selectedAlert.timestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Assignee</p>
                  <p className="font-medium">{selectedAlert.assignee || 'Unassigned'}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Resolve
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-2" />
                  Acknowledge
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Assign
                </Button>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
