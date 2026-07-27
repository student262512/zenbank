'use client';

import { useState } from 'react';
import {
  Truck,
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
  LayoutGrid,
  ListOrdered,
  Zap,
  AlertCircle,
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
  BarChart,
  AreaChart,
  PieChart,
  AIInsightCard,
} from '@/components/shared';
import { CashFlowFilters, CashFlowFilterState } from '@/components/shared/cash-flow-filters';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { vendorForecastTabs } from '@/config/cash-flow-navigation';

// Mock data for KPIs
const kpiData = {
  totalPayables: { value: 456.8, change: 8.5, trend: 'up' as const },
  dueThisWeek: { value: 78.4, change: -5.2, trend: 'down' as const },
  dueNextWeek: { value: 92.5, change: 12.4, trend: 'up' as const },
  overdue: { value: 34.6, change: -8.3, trend: 'down' as const },
  criticalPayments: { value: 45.2, change: 15.8, trend: 'up' as const },
  avgDaysPayable: { value: 32, change: -2, trend: 'down' as const },
  paymentEfficiency: { value: 94.5, change: 1.8, trend: 'up' as const },
  cashImpact: { value: 234.5, change: 6.2, trend: 'up' as const },
};

// Mock data for upcoming payments
const upcomingPayments = [
  {
    id: 'VP001',
    vendorId: 'VEND001',
    vendorName: 'ABC Contractors Ltd',
    vendorType: 'Construction',
    project: 'Marina Bay Towers',
    invoiceNumber: 'INV-ABC-2026-0456',
    invoiceDate: '2026-07-10',
    dueDate: '2026-07-25',
    amount: 28.50,
    priority: 'critical',
    status: 'due_today',
    paymentTerms: 'Net 15',
    approvalStatus: 'approved',
    recommendation: 'Pay Now',
  },
  {
    id: 'VP002',
    vendorId: 'VEND002',
    vendorName: 'JSW Steel',
    vendorType: 'Materials',
    project: 'Green Valley Villas',
    invoiceNumber: 'INV-JSW-2026-0234',
    invoiceDate: '2026-07-15',
    dueDate: '2026-07-28',
    amount: 12.45,
    priority: 'high',
    status: 'due_this_week',
    paymentTerms: 'Net 15',
    approvalStatus: 'approved',
    recommendation: 'Early Payment (2% discount)',
  },
  {
    id: 'VP003',
    vendorId: 'VEND003',
    vendorName: 'UltraTech Cement',
    vendorType: 'Materials',
    project: 'Downtown Plaza',
    invoiceNumber: 'INV-UTC-2026-0567',
    invoiceDate: '2026-07-18',
    dueDate: '2026-07-30',
    amount: 8.75,
    priority: 'medium',
    status: 'due_this_week',
    paymentTerms: 'Net 15',
    approvalStatus: 'pending',
    recommendation: 'Schedule',
  },
  {
    id: 'VP004',
    vendorId: 'VEND004',
    vendorName: 'Shapoorji Pallonji',
    vendorType: 'Construction',
    project: 'Tech Park Phase 2',
    invoiceNumber: 'INV-SP-2026-0789',
    invoiceDate: '2026-07-20',
    dueDate: '2026-08-05',
    amount: 45.00,
    priority: 'high',
    status: 'due_next_week',
    paymentTerms: 'Net 20',
    approvalStatus: 'approved',
    recommendation: 'Schedule',
  },
  {
    id: 'VP005',
    vendorId: 'VEND005',
    vendorName: 'L&T Construction',
    vendorType: 'Construction',
    project: 'Skyline Residency',
    invoiceNumber: 'INV-LT-2026-0345',
    invoiceDate: '2026-06-25',
    dueDate: '2026-07-20',
    amount: 35.80,
    priority: 'critical',
    status: 'overdue',
    paymentTerms: 'Net 25',
    approvalStatus: 'approved',
    recommendation: 'Urgent - Pay Now',
  },
  {
    id: 'VP006',
    vendorId: 'VEND006',
    vendorName: 'BESCOM',
    vendorType: 'Utilities',
    project: 'Tech Park Phase 1',
    invoiceNumber: 'ELEC-2026-07-001',
    invoiceDate: '2026-07-01',
    dueDate: '2026-07-31',
    amount: 2.15,
    priority: 'medium',
    status: 'due_this_week',
    paymentTerms: 'Net 30',
    approvalStatus: 'approved',
    recommendation: 'Auto-Pay',
  },
];

// Mock data for payment calendar
const paymentCalendar = [
  { date: '2026-07-25', day: 'Today', payments: 3, amount: 66.45, critical: 2 },
  { date: '2026-07-26', day: 'Sat', payments: 0, amount: 0, critical: 0 },
  { date: '2026-07-27', day: 'Sun', payments: 0, amount: 0, critical: 0 },
  { date: '2026-07-28', day: 'Mon', payments: 4, amount: 45.20, critical: 1 },
  { date: '2026-07-29', day: 'Tue', payments: 2, amount: 18.50, critical: 0 },
  { date: '2026-07-30', day: 'Wed', payments: 5, amount: 32.80, critical: 1 },
  { date: '2026-07-31', day: 'Thu', payments: 3, amount: 28.45, critical: 0 },
];

// Mock data for priority matrix
const priorityMatrix = [
  {
    id: 'PM001',
    vendorName: 'L&T Construction',
    amount: 35.80,
    daysOverdue: 5,
    vendorCriticality: 'Critical',
    projectImpact: 'High',
    relationshipRisk: 'High',
    priorityScore: 98,
    recommendation: 'Pay Immediately',
  },
  {
    id: 'PM002',
    vendorName: 'ABC Contractors Ltd',
    amount: 28.50,
    daysOverdue: 0,
    vendorCriticality: 'Critical',
    projectImpact: 'High',
    relationshipRisk: 'Medium',
    priorityScore: 92,
    recommendation: 'Pay Today',
  },
  {
    id: 'PM003',
    vendorName: 'Shapoorji Pallonji',
    amount: 45.00,
    daysOverdue: 0,
    vendorCriticality: 'Critical',
    projectImpact: 'High',
    relationshipRisk: 'Low',
    priorityScore: 85,
    recommendation: 'Schedule for Due Date',
  },
  {
    id: 'PM004',
    vendorName: 'JSW Steel',
    amount: 12.45,
    daysOverdue: 0,
    vendorCriticality: 'High',
    projectImpact: 'Medium',
    relationshipRisk: 'Low',
    priorityScore: 78,
    recommendation: 'Early Payment for Discount',
  },
  {
    id: 'PM005',
    vendorName: 'UltraTech Cement',
    amount: 8.75,
    daysOverdue: 0,
    vendorCriticality: 'Medium',
    projectImpact: 'Medium',
    relationshipRisk: 'Low',
    priorityScore: 65,
    recommendation: 'Standard Processing',
  },
];

// Mock data for cash impact
const cashImpactData = [
  { week: 'Jul 25-31', outflow: 156.8, available: 234.5, buffer: 77.7 },
  { week: 'Aug 1-7', outflow: 124.5, available: 189.2, buffer: 64.7 },
  { week: 'Aug 8-14', outflow: 98.6, available: 156.8, buffer: 58.2 },
  { week: 'Aug 15-21', outflow: 145.2, available: 178.4, buffer: 33.2 },
  { week: 'Aug 22-28', outflow: 112.4, available: 165.6, buffer: 53.2 },
];

// Mock data for vendor exceptions
const vendorExceptions = [
  {
    id: 'EX001',
    vendorName: 'L&T Construction',
    exceptionType: 'Overdue Payment',
    description: 'Payment of ₹35.8 Cr is 5 days overdue',
    severity: 'critical',
    impact: 'Project delay risk, relationship damage',
    action: 'Immediate escalation required',
    createdDate: '2026-07-20',
  },
  {
    id: 'EX002',
    vendorName: 'ABC Contractors Ltd',
    exceptionType: 'Pending Approval',
    description: 'Invoice ₹15.2 Cr pending CFO approval for 3 days',
    severity: 'high',
    impact: 'Payment delay',
    action: 'Follow up with CFO',
    createdDate: '2026-07-22',
  },
  {
    id: 'EX003',
    vendorName: 'JSW Steel',
    exceptionType: 'Discount Opportunity',
    description: '2% early payment discount expires in 3 days',
    severity: 'medium',
    impact: 'Potential savings of ₹24.9 Lakhs',
    action: 'Process early payment',
    createdDate: '2026-07-25',
  },
];

// Mock data for payment by category
const paymentByCategory = [
  { name: 'Construction', value: 156.8, color: '#3b82f6' },
  { name: 'Materials', value: 89.4, color: '#10b981' },
  { name: 'Services', value: 45.2, color: '#f59e0b' },
  { name: 'Utilities', value: 12.5, color: '#8b5cf6' },
  { name: 'Other', value: 18.4, color: '#6b7280' },
];

// AI Insights
const aiInsights = [
  {
    id: 'ai1',
    type: 'opportunity' as const,
    title: 'Early Payment Savings',
    description: 'Processing 3 vendor payments early can save ₹45.6 Lakhs in discounts. Available cash: ₹78.4 Cr.',
    impact: '+₹45.6 Lakhs',
    confidence: 95,
    action: 'Process Early',
  },
  {
    id: 'ai2',
    type: 'warning' as const,
    title: 'Cash Shortfall Alert',
    description: 'Week of Aug 15-21 shows tight buffer of ₹33.2 Cr. Consider deferring non-critical payments.',
    impact: 'Liquidity risk',
    confidence: 88,
    action: 'Review Schedule',
  },
  {
    id: 'ai3',
    type: 'insight' as const,
    title: 'Payment Consolidation',
    description: 'Consolidating payments on 25th and 30th can reduce bank charges by 18%.',
    impact: '₹8.4 Lakhs/month',
    confidence: 82,
    action: 'Optimize Schedule',
  },
];

export default function VendorPaymentForecastPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
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
    scenarioId: 'actual',
    forecastVersionId: 'current',
    forecastHorizon: '3m',
    dateRange: { startDate: undefined, endDate: undefined },
  });
  const [selectedPayment, setSelectedPayment] = useState<typeof upcomingPayments[0] | null>(null);

  const paymentColumns: Column<typeof upcomingPayments[0]>[] = [
    {
      id: 'vendorName',
      header: 'Vendor',
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-medium">{row.vendorName}</div>
          <div className="text-xs text-muted-foreground">{row.vendorType}</div>
        </div>
      ),
    },
    {
      id: 'project',
      header: 'Project',
      sortable: true,
    },
    {
      id: 'invoiceNumber',
      header: 'Invoice',
      render: (row) => <span className="text-sm">{row.invoiceNumber}</span>,
    },
    {
      id: 'dueDate',
      header: 'Due Date',
      sortable: true,
      render: (row) => new Date(row.dueDate).toLocaleDateString('en-IN'),
    },
    {
      id: 'amount',
      header: 'Amount',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className="font-semibold">₹{row.amount.toFixed(2)} Cr</span>
      ),
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
    {
      id: 'status',
      header: 'Status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'overdue' ? 'destructive' :
            row.status === 'due_today' ? 'default' : 'outline'
          }
        >
          {row.status === 'overdue' ? 'Overdue' :
           row.status === 'due_today' ? 'Due Today' :
           row.status === 'due_this_week' ? 'This Week' : 'Next Week'}
        </Badge>
      ),
    },
    {
      id: 'recommendation',
      header: 'AI Recommendation',
      render: (row) => (
        <span className="text-sm text-muted-foreground">{row.recommendation}</span>
      ),
    },
    {
      id: 'actions',
      header: '',
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedPayment(row)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const priorityColumns: Column<typeof priorityMatrix[0]>[] = [
    {
      id: 'vendorName',
      header: 'Vendor',
      sortable: true,
    },
    {
      id: 'amount',
      header: 'Amount',
      align: 'right' as const,
      sortable: true,
      render: (row) => <span className="font-semibold">₹{row.amount.toFixed(2)} Cr</span>,
    },
    {
      id: 'vendorCriticality',
      header: 'Criticality',
      render: (row) => (
        <Badge
          variant={
            row.vendorCriticality === 'Critical' ? 'destructive' :
            row.vendorCriticality === 'High' ? 'default' : 'secondary'
          }
        >
          {row.vendorCriticality}
        </Badge>
      ),
    },
    {
      id: 'projectImpact',
      header: 'Project Impact',
      render: (row) => (
        <Badge variant={row.projectImpact === 'High' ? 'destructive' : 'secondary'}>
          {row.projectImpact}
        </Badge>
      ),
    },
    {
      id: 'relationshipRisk',
      header: 'Relationship Risk',
      render: (row) => (
        <Badge
          variant={
            row.relationshipRisk === 'High' ? 'destructive' :
            row.relationshipRisk === 'Medium' ? 'default' : 'secondary'
          }
        >
          {row.relationshipRisk}
        </Badge>
      ),
    },
    {
      id: 'priorityScore',
      header: 'Score',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                row.priorityScore >= 90 ? 'bg-red-500' :
                row.priorityScore >= 75 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${row.priorityScore}%` }}
            />
          </div>
          <span className="text-sm font-medium">{row.priorityScore}</span>
        </div>
      ),
    },
    {
      id: 'recommendation',
      header: 'Recommendation',
      render: (row) => <span className="text-sm">{row.recommendation}</span>,
    },
  ];

  const exceptionColumns: Column<typeof vendorExceptions[0]>[] = [
    {
      id: 'vendorName',
      header: 'Vendor',
      sortable: true,
    },
    {
      id: 'exceptionType',
      header: 'Type',
      render: (row) => (
        <Badge variant="outline">{row.exceptionType}</Badge>
      ),
    },
    {
      id: 'description',
      header: 'Description',
      render: (row) => <span className="text-sm">{row.description}</span>,
    },
    {
      id: 'severity',
      header: 'Severity',
      render: (row) => (
        <Badge
          variant={
            row.severity === 'critical' ? 'destructive' :
            row.severity === 'high' ? 'default' : 'secondary'
          }
        >
          {row.severity}
        </Badge>
      ),
    },
    {
      id: 'action',
      header: 'Action Required',
      render: (row) => <span className="text-sm text-amber-400">{row.action}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Vendor Payment Forecast"
        description="Vendor payment scheduling, prioritization, and cash impact optimization"
        breadcrumbs={[
          { label: 'Cash Flow', href: '/cash-flow' },
          { label: 'Vendor Forecast' },
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
              AI Optimize
            </Button>
          </div>
        }
      />

      <CashFlowFilters initialFilters={filters} onFilterChange={setFilters} />

      {/* KPI Grid */}
      <KPIGrid columns={4}>
        <KPICard
          title="Total Payables"
          value={`₹${kpiData.totalPayables.value} Cr`}
          change={kpiData.totalPayables.change}
          trend={kpiData.totalPayables.trend}
          icon={Truck}
          iconColor="text-blue-400"
        />
        <KPICard
          title="Due This Week"
          value={`₹${kpiData.dueThisWeek.value} Cr`}
          change={kpiData.dueThisWeek.change}
          trend={kpiData.dueThisWeek.trend}
          icon={Calendar}
          iconColor="text-amber-400"
        />
        <KPICard
          title="Critical Payments"
          value={`₹${kpiData.criticalPayments.value} Cr`}
          change={kpiData.criticalPayments.change}
          trend={kpiData.criticalPayments.trend}
          icon={AlertTriangle}
          iconColor="text-red-400"
        />
        <KPICard
          title="Overdue"
          value={`₹${kpiData.overdue.value} Cr`}
          change={kpiData.overdue.change}
          trend={kpiData.overdue.trend}
          icon={Clock}
          iconColor="text-red-400"
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {vendorForecastTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Upcoming Payments Tab */}
        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Vendor Payments</CardTitle>
              <CardDescription>Payments due in the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={upcomingPayments}
                columns={paymentColumns}
                searchable
                searchKeys={['vendorName', 'project', 'invoiceNumber']}
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

        {/* Payment Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-7 gap-4">
            {paymentCalendar.map((day) => (
              <Card key={day.date} className={day.critical > 0 ? 'border-red-500/50' : ''}>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">{day.day}</p>
                    <p className="text-lg font-semibold">
                      {new Date(day.date).getDate()}
                    </p>
                    {day.payments > 0 ? (
                      <>
                        <p className="text-2xl font-bold text-red-400 mt-2">
                          ₹{day.amount.toFixed(1)} Cr
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {day.payments} payments
                        </p>
                        {day.critical > 0 && (
                          <Badge variant="destructive" className="mt-2">
                            {day.critical} critical
                          </Badge>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-4">No payments</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Weekly Payment Schedule</CardTitle>
                <CardDescription>Outflow forecast for next 5 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={cashImpactData}
                  xKey="week"
                  series={[
                    { key: 'outflow', name: 'Payments', color: '#ef4444' },
                    { key: 'buffer', name: 'Buffer', color: '#10b981' },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>By Category</CardTitle>
                <CardDescription>Payment distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={paymentByCategory}
                  height={280}
                  showLegend
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Priority Matrix Tab */}
        <TabsContent value="priority" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Priority Matrix</CardTitle>
              <CardDescription>AI-ranked payment priorities based on multiple factors</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={priorityMatrix}
                columns={priorityColumns}
                searchable
                searchKeys={['vendorName']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Impact Tab */}
        <TabsContent value="impact" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Cash Available</p>
                    <p className="text-2xl font-bold text-emerald-400">₹234.5 Cr</p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Committed Outflow</p>
                    <p className="text-2xl font-bold text-red-400">₹156.8 Cr</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Buffer</p>
                    <p className="text-2xl font-bold">₹77.7 Cr</p>
                  </div>
                  <Zap className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Deferrable</p>
                    <p className="text-2xl font-bold text-blue-400">₹45.2 Cr</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cash Impact Analysis</CardTitle>
              <CardDescription>Weekly cash position after vendor payments</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={cashImpactData}
                xKey="week"
                series={[
                  { key: 'available', name: 'Available', color: '#10b981' },
                  { key: 'outflow', name: 'Outflow', color: '#ef4444' },
                ]}
                height={300}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exceptions Tab */}
        <TabsContent value="exceptions" className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Critical</p>
                    <p className="text-2xl font-bold text-red-400">2</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">High</p>
                    <p className="text-2xl font-bold text-amber-400">3</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Medium</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Exceptions</CardTitle>
              <CardDescription>Items requiring attention or action</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={vendorExceptions}
                columns={exceptionColumns}
                searchable
                searchKeys={['vendorName', 'exceptionType']}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Detail Drawer */}
      <Drawer open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Payment Details</DrawerTitle>
            <DrawerDescription>
              {selectedPayment?.vendorName} - {selectedPayment?.invoiceNumber}
            </DrawerDescription>
          </DrawerHeader>
          {selectedPayment && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Vendor</p>
                    <p className="font-medium">{selectedPayment.vendorName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Project</p>
                    <p className="font-medium">{selectedPayment.project}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Invoice Number</p>
                    <p className="font-medium">{selectedPayment.invoiceNumber}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-2xl font-bold text-red-400">
                      ₹{selectedPayment.amount.toFixed(2)} Cr
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">
                      {new Date(selectedPayment.dueDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Terms</p>
                    <p className="font-medium">{selectedPayment.paymentTerms}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Process Payment
                </Button>
                <Button variant="outline" className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button variant="outline" className="flex-1">
                  <Clock className="mr-2 h-4 w-4" />
                  Defer
                </Button>
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
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Process Due Today
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Batch Schedule
              </Button>
              <Button variant="outline" size="sm">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Handle Exceptions
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
