'use client';

import { useState } from 'react';
import {
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Download,
  RefreshCw,
  Sparkles,
  ChevronRight,
  IndianRupee,
  FileText,
  Phone,
  Mail,
  MessageSquare,
  Target,
  Percent,
} from 'lucide-react';
import { PageHeader } from '@/components/layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  KPICard,
  KPIGrid,
  DataTable,
  Column,
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  AIInsightCard,
  TrendIndicator,
} from '@/components/shared';
import { CashFlowFilters, CashFlowFilterState } from '@/components/shared/cash-flow-filters';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { collectionsForecastTabs } from '@/config/cash-flow-navigation';

// Mock data for KPIs
const kpiData = {
  totalReceivables: { value: 456.8, change: 5.2, trend: 'up' as const },
  currentDue: { value: 234.5, change: -2.1, trend: 'down' as const },
  overdue030: { value: 89.4, change: 8.5, trend: 'up' as const },
  overdue3160: { value: 45.6, change: -12.3, trend: 'down' as const },
  overdue6190: { value: 28.3, change: 4.8, trend: 'up' as const },
  overdue90Plus: { value: 59.0, change: 15.2, trend: 'up' as const },
  forecastedCollection: { value: 312.4, change: 8.7, trend: 'up' as const },
  collectionRate: { value: 78.5, change: 2.3, trend: 'up' as const },
  dso: { value: 45, change: -3, trend: 'down' as const },
  ptpAmount: { value: 67.8, change: 12.4, trend: 'up' as const },
  ptpConversion: { value: 82.5, change: 4.2, trend: 'up' as const },
  atRisk: { value: 34.2, change: -5.6, trend: 'down' as const },
};

// Mock data for customer aging
const customerAging = [
  {
    id: 'CA001',
    customerId: 'CUST001',
    customerName: 'Prestige Estates',
    customerType: 'Corporate',
    project: 'Marina Bay Towers',
    current: 12.5,
    overdue030: 8.2,
    overdue3160: 2.4,
    overdue6190: 0,
    overdue90Plus: 0,
    total: 23.1,
    creditLimit: 50.0,
    creditScore: 'A',
    lastPayment: '2026-07-20',
    paymentBehavior: 'Good',
  },
  {
    id: 'CA002',
    customerId: 'CUST002',
    customerName: 'DLF Group',
    customerType: 'Corporate',
    project: 'Downtown Plaza',
    current: 45.8,
    overdue030: 18.5,
    overdue3160: 12.4,
    overdue6190: 5.6,
    overdue90Plus: 8.2,
    total: 90.5,
    creditLimit: 150.0,
    creditScore: 'A+',
    lastPayment: '2026-07-15',
    paymentBehavior: 'Average',
  },
  {
    id: 'CA003',
    customerId: 'CUST003',
    customerName: 'Lodha Developers',
    customerType: 'Corporate',
    project: 'Skyline Residency',
    current: 8.5,
    overdue030: 15.8,
    overdue3160: 12.5,
    overdue6190: 8.4,
    overdue90Plus: 24.6,
    total: 69.8,
    creditLimit: 100.0,
    creditScore: 'B+',
    lastPayment: '2026-06-25',
    paymentBehavior: 'Poor',
  },
  {
    id: 'CA004',
    customerId: 'CUST004',
    customerName: 'Godrej Properties',
    customerType: 'Corporate',
    project: 'Green Valley Villas',
    current: 28.4,
    overdue030: 5.2,
    overdue3160: 0,
    overdue6190: 0,
    overdue90Plus: 0,
    total: 33.6,
    creditLimit: 75.0,
    creditScore: 'A+',
    lastPayment: '2026-07-22',
    paymentBehavior: 'Excellent',
  },
  {
    id: 'CA005',
    customerId: 'CUST005',
    customerName: 'Brigade Group',
    customerType: 'Corporate',
    project: 'Tech Park Phase 2',
    current: 56.2,
    overdue030: 12.4,
    overdue3160: 8.5,
    overdue6190: 4.2,
    overdue90Plus: 6.8,
    total: 88.1,
    creditLimit: 120.0,
    creditScore: 'A',
    lastPayment: '2026-07-18',
    paymentBehavior: 'Good',
  },
];

// Mock data for collection forecast
const collectionForecast = [
  {
    id: 'CF001',
    period: 'Week 1 (Jul 25-31)',
    projectedAmount: 78.5,
    confidenceLevel: 92,
    customerCount: 45,
    breakdown: {
      current: 45.2,
      overdue030: 25.8,
      overdue3160: 5.5,
      overdue60Plus: 2.0,
    },
    aiAdjustment: 3.2,
    trend: 'up',
  },
  {
    id: 'CF002',
    period: 'Week 2 (Aug 1-7)',
    projectedAmount: 65.4,
    confidenceLevel: 88,
    customerCount: 38,
    breakdown: {
      current: 38.5,
      overdue030: 18.4,
      overdue3160: 6.5,
      overdue60Plus: 2.0,
    },
    aiAdjustment: -2.5,
    trend: 'stable',
  },
  {
    id: 'CF003',
    period: 'Week 3 (Aug 8-14)',
    projectedAmount: 82.3,
    confidenceLevel: 85,
    customerCount: 52,
    breakdown: {
      current: 52.4,
      overdue030: 22.5,
      overdue3160: 5.4,
      overdue60Plus: 2.0,
    },
    aiAdjustment: 4.8,
    trend: 'up',
  },
  {
    id: 'CF004',
    period: 'Week 4 (Aug 15-21)',
    projectedAmount: 56.8,
    confidenceLevel: 82,
    customerCount: 32,
    breakdown: {
      current: 32.5,
      overdue030: 16.8,
      overdue3160: 5.5,
      overdue60Plus: 2.0,
    },
    aiAdjustment: -1.2,
    trend: 'down',
  },
];

// Mock data for overdue accounts
const overdueAccounts = [
  {
    id: 'OD001',
    customerId: 'CUST003',
    customerName: 'Lodha Developers',
    project: 'Skyline Residency',
    invoiceNumber: 'INV-2026-0456',
    invoiceDate: '2026-04-15',
    dueDate: '2026-05-15',
    daysOverdue: 71,
    amount: 24.6,
    agingBucket: '61-90 Days',
    collectionStatus: 'Escalated',
    lastContact: '2026-07-20',
    nextAction: 'Legal Notice',
    priority: 'high',
  },
  {
    id: 'OD002',
    customerId: 'CUST002',
    customerName: 'DLF Group',
    project: 'Downtown Plaza',
    invoiceNumber: 'INV-2026-0512',
    invoiceDate: '2026-05-01',
    dueDate: '2026-05-31',
    daysOverdue: 55,
    amount: 12.4,
    agingBucket: '31-60 Days',
    collectionStatus: 'In Follow-up',
    lastContact: '2026-07-22',
    nextAction: 'Payment Reminder',
    priority: 'medium',
  },
  {
    id: 'OD003',
    customerId: 'CUST005',
    customerName: 'Brigade Group',
    project: 'Tech Park Phase 2',
    invoiceNumber: 'INV-2026-0589',
    invoiceDate: '2026-06-01',
    dueDate: '2026-07-01',
    daysOverdue: 24,
    amount: 12.4,
    agingBucket: '0-30 Days',
    collectionStatus: 'Contacted',
    lastContact: '2026-07-23',
    nextAction: 'Follow-up Call',
    priority: 'medium',
  },
  {
    id: 'OD004',
    customerId: 'CUST003',
    customerName: 'Lodha Developers',
    project: 'Skyline Residency',
    invoiceNumber: 'INV-2026-0234',
    invoiceDate: '2026-02-01',
    dueDate: '2026-03-01',
    daysOverdue: 146,
    amount: 18.5,
    agingBucket: '90+ Days',
    collectionStatus: 'Legal',
    lastContact: '2026-07-15',
    nextAction: 'Court Filing',
    priority: 'critical',
  },
];

// Mock data for promise to pay
const promiseToPay = [
  {
    id: 'PTP001',
    customerId: 'CUST002',
    customerName: 'DLF Group',
    project: 'Downtown Plaza',
    promiseDate: '2026-07-28',
    promiseAmount: 18.5,
    overdueAmount: 30.6,
    percentCovered: 60.5,
    ptpStatus: 'Active',
    createdDate: '2026-07-20',
    contactPerson: 'Rajesh Kumar',
    notes: 'Will clear in 2 installments',
    confidence: 85,
  },
  {
    id: 'PTP002',
    customerId: 'CUST003',
    customerName: 'Lodha Developers',
    project: 'Skyline Residency',
    promiseDate: '2026-08-05',
    promiseAmount: 35.0,
    overdueAmount: 61.5,
    percentCovered: 56.9,
    ptpStatus: 'Active',
    createdDate: '2026-07-18',
    contactPerson: 'Amit Shah',
    notes: 'Partial payment committed',
    confidence: 62,
  },
  {
    id: 'PTP003',
    customerId: 'CUST005',
    customerName: 'Brigade Group',
    project: 'Tech Park Phase 2',
    promiseDate: '2026-07-26',
    promiseAmount: 12.4,
    overdueAmount: 12.4,
    percentCovered: 100,
    ptpStatus: 'Active',
    createdDate: '2026-07-23',
    contactPerson: 'Priya Sharma',
    notes: 'Full payment confirmed',
    confidence: 95,
  },
  {
    id: 'PTP004',
    customerId: 'CUST001',
    customerName: 'Prestige Estates',
    project: 'Marina Bay Towers',
    promiseDate: '2026-07-22',
    promiseAmount: 8.2,
    overdueAmount: 8.2,
    percentCovered: 100,
    ptpStatus: 'Fulfilled',
    createdDate: '2026-07-15',
    contactPerson: 'Vikram Reddy',
    notes: 'Payment received on time',
    confidence: 100,
  },
];

// Mock data for aging trend
const agingTrendData = [
  { month: 'Feb', current: 245, overdue030: 78, overdue3160: 42, overdue6190: 25, overdue90: 52 },
  { month: 'Mar', current: 258, overdue030: 82, overdue3160: 38, overdue6190: 28, overdue90: 48 },
  { month: 'Apr', current: 242, overdue030: 85, overdue3160: 45, overdue6190: 24, overdue90: 55 },
  { month: 'May', current: 238, overdue030: 88, overdue3160: 48, overdue6190: 26, overdue90: 58 },
  { month: 'Jun', current: 232, overdue030: 92, overdue3160: 44, overdue6190: 28, overdue90: 56 },
  { month: 'Jul', current: 234, overdue030: 89, overdue3160: 46, overdue6190: 28, overdue90: 59 },
];

// Mock data for collection by project
const collectionByProject = [
  { name: 'Marina Bay Towers', value: 125.4, color: '#3b82f6' },
  { name: 'Downtown Plaza', value: 98.6, color: '#10b981' },
  { name: 'Skyline Residency', value: 78.2, color: '#f59e0b' },
  { name: 'Green Valley Villas', value: 65.4, color: '#8b5cf6' },
  { name: 'Tech Park Phase 2', value: 89.2, color: '#ec4899' },
];

// AI Insights
const aiInsights = [
  {
    id: 'ai1',
    type: 'warning' as const,
    title: 'High Risk Customer Alert',
    description: 'Lodha Developers shows 45% deterioration in payment behavior. ₹61.5 Cr overdue with declining trend.',
    impact: 'High collection risk',
    confidence: 94,
    action: 'Escalate Immediately',
  },
  {
    id: 'ai2',
    type: 'opportunity' as const,
    title: 'Early Collection Opportunity',
    description: 'Offering 1.5% discount to 8 customers can accelerate ₹45.2 Cr in current dues by 15 days.',
    impact: '+₹68 Lakhs interest',
    confidence: 87,
    action: 'Launch Campaign',
  },
  {
    id: 'ai3',
    type: 'insight' as const,
    title: 'PTP Conversion Rate',
    description: 'Brigade Group has 95% PTP fulfillment rate. Prioritize their commitments for cash planning.',
    impact: 'Reliable forecast',
    confidence: 92,
    action: 'Update Forecast',
  },
];

export default function CollectionsForecastPage() {
  const [activeTab, setActiveTab] = useState('aging');
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
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customerAging[0] | null>(null);
  const [selectedPtp, setSelectedPtp] = useState<typeof promiseToPay[0] | null>(null);

  const agingColumns: Column<typeof customerAging[0]>[] = [
    {
      id: 'customerName',
      header: 'Customer',
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-medium">{row.customerName}</div>
          <div className="text-xs text-muted-foreground">{row.project}</div>
        </div>
      ),
    },
    {
      id: 'current',
      header: 'Current',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className="text-emerald-400">₹{row.current.toFixed(1)} Cr</span>
      ),
    },
    {
      id: 'overdue030',
      header: '0-30 Days',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className={row.overdue030 > 0 ? 'text-amber-400' : 'text-muted-foreground'}>
          ₹{row.overdue030.toFixed(1)} Cr
        </span>
      ),
    },
    {
      id: 'overdue3160',
      header: '31-60 Days',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className={row.overdue3160 > 0 ? 'text-orange-400' : 'text-muted-foreground'}>
          ₹{row.overdue3160.toFixed(1)} Cr
        </span>
      ),
    },
    {
      id: 'overdue6190',
      header: '61-90 Days',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className={row.overdue6190 > 0 ? 'text-red-400' : 'text-muted-foreground'}>
          ₹{row.overdue6190.toFixed(1)} Cr
        </span>
      ),
    },
    {
      id: 'overdue90Plus',
      header: '90+ Days',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className={row.overdue90Plus > 0 ? 'text-red-500 font-semibold' : 'text-muted-foreground'}>
          ₹{row.overdue90Plus.toFixed(1)} Cr
        </span>
      ),
    },
    {
      id: 'total',
      header: 'Total',
      align: 'right' as const,
      sortable: true,
      render: (row) => <span className="font-semibold">₹{row.total.toFixed(1)} Cr</span>,
    },
    {
      id: 'creditScore',
      header: 'Score',
      render: (row) => (
        <Badge
          variant={
            row.creditScore.startsWith('A') ? 'default' :
            row.creditScore.startsWith('B') ? 'secondary' : 'destructive'
          }
        >
          {row.creditScore}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: '',
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedCustomer(row)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const forecastColumns: Column<typeof collectionForecast[0]>[] = [
    {
      id: 'period',
      header: 'Period',
      sortable: true,
    },
    {
      id: 'projectedAmount',
      header: 'Projected',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-emerald-400">₹{row.projectedAmount.toFixed(1)} Cr</span>
      ),
    },
    {
      id: 'confidenceLevel',
      header: 'Confidence',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                row.confidenceLevel >= 90 ? 'bg-emerald-500' :
                row.confidenceLevel >= 80 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${row.confidenceLevel}%` }}
            />
          </div>
          <span className="text-sm">{row.confidenceLevel}%</span>
        </div>
      ),
    },
    {
      id: 'customerCount',
      header: 'Customers',
      align: 'right' as const,
    },
    {
      id: 'aiAdjustment',
      header: 'AI Adj.',
      align: 'right' as const,
      render: (row) => (
        <span className={row.aiAdjustment >= 0 ? 'text-emerald-400' : 'text-red-400'}>
          {row.aiAdjustment >= 0 ? '+' : ''}₹{row.aiAdjustment.toFixed(1)} Cr
        </span>
      ),
    },
    {
      id: 'trend',
      header: 'Trend',
      render: (row) => (
        <div className="flex items-center gap-1">
          {row.trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          ) : row.trend === 'down' ? (
            <TrendingDown className="h-4 w-4 text-red-400" />
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </div>
      ),
    },
  ];

  const overdueColumns: Column<typeof overdueAccounts[0]>[] = [
    {
      id: 'customerName',
      header: 'Customer',
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-medium">{row.customerName}</div>
          <div className="text-xs text-muted-foreground">{row.invoiceNumber}</div>
        </div>
      ),
    },
    {
      id: 'project',
      header: 'Project',
      sortable: true,
    },
    {
      id: 'amount',
      header: 'Amount',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-red-400">₹{row.amount.toFixed(1)} Cr</span>
      ),
    },
    {
      id: 'daysOverdue',
      header: 'Days Overdue',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className={
          row.daysOverdue > 90 ? 'text-red-500 font-semibold' :
          row.daysOverdue > 60 ? 'text-red-400' :
          row.daysOverdue > 30 ? 'text-orange-400' : 'text-amber-400'
        }>
          {row.daysOverdue} days
        </span>
      ),
    },
    {
      id: 'agingBucket',
      header: 'Bucket',
      render: (row) => (
        <Badge
          variant={
            row.agingBucket === '0-30 Days' ? 'secondary' :
            row.agingBucket === '31-60 Days' ? 'outline' :
            row.agingBucket === '61-90 Days' ? 'default' : 'destructive'
          }
        >
          {row.agingBucket}
        </Badge>
      ),
    },
    {
      id: 'collectionStatus',
      header: 'Status',
      render: (row) => <span className="text-sm">{row.collectionStatus}</span>,
    },
    {
      id: 'nextAction',
      header: 'Next Action',
      render: (row) => <span className="text-sm text-muted-foreground">{row.nextAction}</span>,
    },
    {
      id: 'priority',
      header: 'Priority',
      render: (row) => (
        <Badge
          variant={
            row.priority === 'critical' ? 'destructive' :
            row.priority === 'high' ? 'default' : 'secondary'
          }
        >
          {row.priority}
        </Badge>
      ),
    },
  ];

  const ptpColumns: Column<typeof promiseToPay[0]>[] = [
    {
      id: 'customerName',
      header: 'Customer',
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-medium">{row.customerName}</div>
          <div className="text-xs text-muted-foreground">{row.project}</div>
        </div>
      ),
    },
    {
      id: 'promiseDate',
      header: 'Promise Date',
      sortable: true,
      render: (row) => new Date(row.promiseDate).toLocaleDateString('en-IN'),
    },
    {
      id: 'promiseAmount',
      header: 'PTP Amount',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-emerald-400">₹{row.promiseAmount.toFixed(1)} Cr</span>
      ),
    },
    {
      id: 'overdueAmount',
      header: 'Overdue',
      align: 'right' as const,
      render: (row) => <span className="text-red-400">₹{row.overdueAmount.toFixed(1)} Cr</span>,
    },
    {
      id: 'percentCovered',
      header: 'Coverage',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                row.percentCovered >= 80 ? 'bg-emerald-500' :
                row.percentCovered >= 50 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${row.percentCovered}%` }}
            />
          </div>
          <span className="text-sm">{row.percentCovered.toFixed(0)}%</span>
        </div>
      ),
    },
    {
      id: 'confidence',
      header: 'Confidence',
      render: (row) => (
        <Badge
          variant={
            row.confidence >= 90 ? 'default' :
            row.confidence >= 70 ? 'secondary' : 'destructive'
          }
        >
          {row.confidence}%
        </Badge>
      ),
    },
    {
      id: 'ptpStatus',
      header: 'Status',
      render: (row) => (
        <Badge variant={row.ptpStatus === 'Fulfilled' ? 'default' : 'outline'}>
          {row.ptpStatus}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: '',
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedPtp(row)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Collections Forecast"
        description="Customer collections prediction, aging analysis, and promise to pay tracking"
        breadcrumbs={[
          { label: 'Cash Flow', href: '/cash-flow' },
          { label: 'Collections Forecast' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button size="sm">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Forecast
            </Button>
          </div>
        }
      />

      <CashFlowFilters initialFilters={filters} onFilterChange={setFilters} />

      {/* KPI Grid */}
      <KPIGrid columns={4}>
        <KPICard
          title="Total Receivables"
          value={`₹${kpiData.totalReceivables.value} Cr`}
          change={kpiData.totalReceivables.change}
          trend={kpiData.totalReceivables.trend}
          icon={IndianRupee}
          iconColor="text-blue-400"
        />
        <KPICard
          title="Forecasted Collection"
          value={`₹${kpiData.forecastedCollection.value} Cr`}
          change={kpiData.forecastedCollection.change}
          trend={kpiData.forecastedCollection.trend}
          icon={Target}
          iconColor="text-emerald-400"
        />
        <KPICard
          title="Collection Rate"
          value={`${kpiData.collectionRate.value}%`}
          change={kpiData.collectionRate.change}
          trend={kpiData.collectionRate.trend}
          icon={Percent}
          iconColor="text-violet-400"
        />
        <KPICard
          title="DSO (Days)"
          value={kpiData.dso.value.toString()}
          change={kpiData.dso.change}
          trend={kpiData.dso.trend}
          icon={Calendar}
          iconColor="text-amber-400"
        />
      </KPIGrid>

      <KPIGrid columns={4}>
        <KPICard
          title="Current Due"
          value={`₹${kpiData.currentDue.value} Cr`}
          change={kpiData.currentDue.change}
          trend={kpiData.currentDue.trend}
          icon={CheckCircle2}
          iconColor="text-emerald-400"
        />
        <KPICard
          title="Overdue 0-30"
          value={`₹${kpiData.overdue030.value} Cr`}
          change={kpiData.overdue030.change}
          trend={kpiData.overdue030.trend}
          icon={Clock}
          iconColor="text-amber-400"
        />
        <KPICard
          title="Overdue 90+"
          value={`₹${kpiData.overdue90Plus.value} Cr`}
          change={kpiData.overdue90Plus.change}
          trend={kpiData.overdue90Plus.trend}
          icon={AlertTriangle}
          iconColor="text-red-400"
        />
        <KPICard
          title="PTP Amount"
          value={`₹${kpiData.ptpAmount.value} Cr`}
          change={kpiData.ptpAmount.change}
          trend={kpiData.ptpAmount.trend}
          icon={FileText}
          iconColor="text-cyan-400"
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {collectionsForecastTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Customer Aging Tab */}
        <TabsContent value="aging" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Aging Trend</CardTitle>
                <CardDescription>Monthly aging bucket distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={agingTrendData}
                  xKey="month"
                  series={[
                    { key: 'current', name: 'Current', color: '#10b981' },
                    { key: 'overdue030', name: '0-30 Days', color: '#f59e0b' },
                    { key: 'overdue3160', name: '31-60 Days', color: '#f97316' },
                    { key: 'overdue6190', name: '61-90 Days', color: '#ef4444' },
                    { key: 'overdue90', name: '90+ Days', color: '#dc2626' },
                  ]}
                  height={300}
                  stacked
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>By Project</CardTitle>
                <CardDescription>Receivables distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={collectionByProject}
                  height={280}
                  showLegend
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Aging Report</CardTitle>
              <CardDescription>Receivables by customer and aging bucket</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={customerAging}
                columns={agingColumns}
                searchable
                searchKeys={['customerName', 'project']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Collection Forecast Tab */}
        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Collection Forecast</CardTitle>
              <CardDescription>AI-powered collection predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={collectionForecast}
                columns={forecastColumns}
                searchable={false}
              />
            </CardContent>
          </Card>

          {/* AI Insights */}
          <div className="grid grid-cols-3 gap-4">
            {aiInsights.map((insight) => (
              <AIInsightCard
                key={insight.id}
                type={insight.type}
                title={insight.title}
                description={insight.description}
                impact={insight.impact}
                confidence={insight.confidence}
                action={insight.action}
              />
            ))}
          </div>
        </TabsContent>

        {/* Overdue Tab */}
        <TabsContent value="overdue" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Overdue</p>
                    <p className="text-2xl font-bold text-red-400">₹222.3 Cr</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">In Follow-up</p>
                    <p className="text-2xl font-bold text-amber-400">₹145.6 Cr</p>
                  </div>
                  <Phone className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Escalated</p>
                    <p className="text-2xl font-bold text-orange-400">₹58.2 Cr</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Legal</p>
                    <p className="text-2xl font-bold text-red-500">₹18.5 Cr</p>
                  </div>
                  <FileText className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Overdue Accounts</CardTitle>
              <CardDescription>Accounts requiring collection action</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={overdueAccounts}
                columns={overdueColumns}
                searchable
                searchKeys={['customerName', 'project', 'invoiceNumber']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Promise to Pay Tab */}
        <TabsContent value="ptp" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active PTPs</p>
                    <p className="text-2xl font-bold">₹65.9 Cr</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Due This Week</p>
                    <p className="text-2xl font-bold text-amber-400">₹30.9 Cr</p>
                  </div>
                  <Calendar className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Fulfilled (MTD)</p>
                    <p className="text-2xl font-bold text-emerald-400">₹42.5 Cr</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold">82.5%</p>
                  </div>
                  <Percent className="h-8 w-8 text-violet-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Promise to Pay Tracker</CardTitle>
              <CardDescription>Customer payment commitments</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={promiseToPay}
                columns={ptpColumns}
                searchable
                searchKeys={['customerName', 'project']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recovery Analysis Tab */}
        <TabsContent value="recovery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recovery Analysis</CardTitle>
              <CardDescription>Historical recovery patterns and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Recovery analysis charts and data will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Detail Drawer */}
      <Drawer open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedCustomer?.customerName}</DrawerTitle>
            <DrawerDescription>
              {selectedCustomer?.customerType} - {selectedCustomer?.project}
            </DrawerDescription>
          </DrawerHeader>
          {selectedCustomer && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Total Receivable</p>
                    <p className="text-xl font-bold">₹{selectedCustomer.total.toFixed(1)} Cr</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Current</p>
                    <p className="text-xl font-bold text-emerald-400">
                      ₹{selectedCustomer.current.toFixed(1)} Cr
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-xl font-bold text-red-400">
                      ₹{(selectedCustomer.overdue030 + selectedCustomer.overdue3160 + selectedCustomer.overdue6190 + selectedCustomer.overdue90Plus).toFixed(1)} Cr
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Credit Available</p>
                    <p className="text-xl font-bold">
                      ₹{(selectedCustomer.creditLimit - selectedCustomer.total).toFixed(1)} Cr
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Credit Score</p>
                    <Badge variant="default" className="text-lg px-3 py-1">
                      {selectedCustomer.creditScore}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Behavior</p>
                    <p className="font-medium">{selectedCustomer.paymentBehavior}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Last Payment</p>
                    <p className="font-medium">
                      {new Date(selectedCustomer.lastPayment).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Credit Limit</p>
                    <p className="font-medium">₹{selectedCustomer.creditLimit.toFixed(1)} Cr</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Customer
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reminder
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* PTP Detail Drawer */}
      <Drawer open={!!selectedPtp} onOpenChange={() => setSelectedPtp(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Promise to Pay Details</DrawerTitle>
            <DrawerDescription>
              {selectedPtp?.customerName} - {selectedPtp?.project}
            </DrawerDescription>
          </DrawerHeader>
          {selectedPtp && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">PTP Amount</p>
                    <p className="text-xl font-bold text-emerald-400">
                      ₹{selectedPtp.promiseAmount.toFixed(1)} Cr
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Total Overdue</p>
                    <p className="text-xl font-bold text-red-400">
                      ₹{selectedPtp.overdueAmount.toFixed(1)} Cr
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Coverage</p>
                    <p className="text-xl font-bold">{selectedPtp.percentCovered.toFixed(0)}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="text-xl font-bold">{selectedPtp.confidence}%</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Promise Date</p>
                    <p className="font-medium">
                      {new Date(selectedPtp.promiseDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Person</p>
                    <p className="font-medium">{selectedPtp.contactPerson}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={selectedPtp.ptpStatus === 'Fulfilled' ? 'default' : 'outline'}>
                      {selectedPtp.ptpStatus}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="font-medium">{selectedPtp.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* Quick Actions */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Quick Actions:</span>
              <Button variant="outline" size="sm">
                <Phone className="mr-2 h-4 w-4" />
                Bulk Call
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Send Reminders
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Create PTP
              </Button>
              <Button variant="outline" size="sm">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Escalate
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
