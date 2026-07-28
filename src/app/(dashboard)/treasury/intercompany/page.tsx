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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Building2,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  DollarSign,
  ArrowLeftRight,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
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
  Calendar,
  Shield,
  Percent,
  Users,
  FileCheck,
  Send,
} from 'lucide-react';

// Mock KPI Data
const kpiData = {
  totalICLoans: {
    value: '1,200',
    unit: 'Cr',
    change: 8.5,
    trend: 'up' as const,
    sparkline: [1050, 1080, 1120, 1150, 1180, 1190, 1200],
    subtitle: 'Outstanding IC loans',
  },
  activeLoans: {
    value: '18',
    unit: '',
    change: 2,
    trend: 'up' as const,
    subtitle: 'Active loan agreements',
  },
  interestIncomeYTD: {
    value: '45',
    unit: 'Cr',
    change: 12.5,
    trend: 'up' as const,
    sparkline: [35, 38, 40, 42, 43, 44, 45],
    subtitle: 'Year-to-date interest',
  },
  pendingRequests: {
    value: '4',
    unit: '',
    change: -20,
    trend: 'down' as const,
    subtitle: 'Awaiting approval',
  },
  dueThisMonth: {
    value: '85',
    unit: 'Cr',
    change: 0,
    trend: 'neutral' as const,
    subtitle: 'Repayments due',
  },
  complianceScore: {
    value: '98',
    unit: '%',
    change: 1.5,
    trend: 'up' as const,
    sparkline: [94, 95, 96, 96, 97, 97, 98],
    subtitle: 'Transfer pricing compliance',
  },
};

// Mock IC Funding Trend Data (12 months)
const fundingTrendData = [
  { label: 'Feb', value: 980 },
  { label: 'Mar', value: 1020 },
  { label: 'Apr', value: 1050 },
  { label: 'May', value: 1080 },
  { label: 'Jun', value: 1100 },
  { label: 'Jul', value: 1120 },
  { label: 'Aug', value: 1140 },
  { label: 'Sep', value: 1160 },
  { label: 'Oct', value: 1175 },
  { label: 'Nov', value: 1185 },
  { label: 'Dec', value: 1195 },
  { label: 'Jan', value: 1200 },
];

// Mock Interest Income Data (12 months)
const interestIncomeData = [
  { label: 'Feb', value: 3.2 },
  { label: 'Mar', value: 3.5 },
  { label: 'Apr', value: 3.8 },
  { label: 'May', value: 4.0 },
  { label: 'Jun', value: 4.2 },
  { label: 'Jul', value: 4.1 },
  { label: 'Aug', value: 3.9 },
  { label: 'Sep', value: 4.3 },
  { label: 'Oct', value: 4.5 },
  { label: 'Nov', value: 4.6 },
  { label: 'Dec', value: 4.4 },
  { label: 'Jan', value: 4.5 },
];

// Mock Repayment Schedule Data
const repaymentScheduleData = [
  { label: 'Jan', value: 85 },
  { label: 'Feb', value: 120 },
  { label: 'Mar', value: 95 },
  { label: 'Apr', value: 150 },
  { label: 'May', value: 80 },
  { label: 'Jun', value: 200 },
  { label: 'Jul', value: 110 },
  { label: 'Aug', value: 75 },
  { label: 'Sep', value: 130 },
  { label: 'Oct', value: 90 },
  { label: 'Nov', value: 85 },
  { label: 'Dec', value: 180 },
];

// IC Loan Table Data
interface ICLoanRecord {
  id: string;
  lenderEntity: string;
  borrowerEntity: string;
  principal: number;
  outstanding: number;
  interestRate: number;
  startDate: string;
  dueDate: string;
  tenure: string;
  nextPayment: number;
  nextPaymentDate: string;
  status: 'Active' | 'Due Soon' | 'Overdue' | 'Closed';
  compliance: 'Compliant' | 'Review' | 'Non-Compliant';
}

const icLoanTableData: ICLoanRecord[] = [
  { id: 'ICL-001', lenderEntity: 'ZenBank HQ', borrowerEntity: 'ZenBank Mumbai', principal: 150, outstanding: 120, interestRate: 8.5, startDate: '2023-06-15', dueDate: '2025-06-15', tenure: '24 months', nextPayment: 12.5, nextPaymentDate: '2024-02-15', status: 'Active', compliance: 'Compliant' },
  { id: 'ICL-002', lenderEntity: 'ZenBank HQ', borrowerEntity: 'ZenBank Bangalore', principal: 200, outstanding: 180, interestRate: 8.0, startDate: '2023-09-01', dueDate: '2025-09-01', tenure: '24 months', nextPayment: 15.0, nextPaymentDate: '2024-02-01', status: 'Active', compliance: 'Compliant' },
  { id: 'ICL-003', lenderEntity: 'ZenBank HQ', borrowerEntity: 'Project Alpha SPV', principal: 300, outstanding: 280, interestRate: 9.0, startDate: '2023-03-15', dueDate: '2026-03-15', tenure: '36 months', nextPayment: 25.0, nextPaymentDate: '2024-01-15', status: 'Due Soon', compliance: 'Compliant' },
  { id: 'ICL-004', lenderEntity: 'ZenBank Mumbai', borrowerEntity: 'ZenBank Chennai', principal: 80, outstanding: 65, interestRate: 8.25, startDate: '2023-04-01', dueDate: '2024-10-01', tenure: '18 months', nextPayment: 8.5, nextPaymentDate: '2024-02-01', status: 'Active', compliance: 'Compliant' },
  { id: 'ICL-005', lenderEntity: 'ZenBank HQ', borrowerEntity: 'ZenBank Delhi', principal: 100, outstanding: 85, interestRate: 8.5, startDate: '2023-07-01', dueDate: '2025-01-01', tenure: '18 months', nextPayment: 10.0, nextPaymentDate: '2024-01-20', status: 'Due Soon', compliance: 'Review' },
  { id: 'ICL-006', lenderEntity: 'ZenBank HQ', borrowerEntity: 'Subsidiary A', principal: 120, outstanding: 100, interestRate: 8.75, startDate: '2023-08-15', dueDate: '2025-08-15', tenure: '24 months', nextPayment: 11.0, nextPaymentDate: '2024-02-15', status: 'Active', compliance: 'Compliant' },
  { id: 'ICL-007', lenderEntity: 'ZenBank Bangalore', borrowerEntity: 'ZenBank Hyderabad', principal: 50, outstanding: 42, interestRate: 8.0, startDate: '2023-05-01', dueDate: '2024-11-01', tenure: '18 months', nextPayment: 5.5, nextPaymentDate: '2024-02-01', status: 'Active', compliance: 'Compliant' },
  { id: 'ICL-008', lenderEntity: 'ZenBank HQ', borrowerEntity: 'Project Beta SPV', principal: 250, outstanding: 230, interestRate: 9.25, startDate: '2023-10-01', dueDate: '2026-10-01', tenure: '36 months', nextPayment: 22.0, nextPaymentDate: '2024-02-01', status: 'Active', compliance: 'Compliant' },
];

// Funding Requests Data
interface FundingRequest {
  id: string;
  requestedBy: string;
  lenderEntity: string;
  amount: number;
  purpose: string;
  tenure: string;
  requestedRate: number;
  suggestedRate: number;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  priority: 'High' | 'Medium' | 'Low';
}

const fundingRequestsData: FundingRequest[] = [
  { id: 'FR-001', requestedBy: 'ZenBank Pune', lenderEntity: 'ZenBank HQ', amount: 75, purpose: 'Working capital expansion', tenure: '18 months', requestedRate: 8.0, suggestedRate: 8.5, requestDate: '2024-01-12', status: 'Pending', priority: 'High' },
  { id: 'FR-002', requestedBy: 'Project Gamma SPV', lenderEntity: 'ZenBank HQ', amount: 180, purpose: 'Construction phase funding', tenure: '36 months', requestedRate: 8.5, suggestedRate: 9.0, requestDate: '2024-01-10', status: 'Under Review', priority: 'High' },
  { id: 'FR-003', requestedBy: 'ZenBank Kolkata', lenderEntity: 'ZenBank Mumbai', amount: 40, purpose: 'Equipment purchase', tenure: '12 months', requestedRate: 7.5, suggestedRate: 8.0, requestDate: '2024-01-08', status: 'Pending', priority: 'Medium' },
  { id: 'FR-004', requestedBy: 'Subsidiary B', lenderEntity: 'ZenBank HQ', amount: 60, purpose: 'Inventory financing', tenure: '12 months', requestedRate: 8.0, suggestedRate: 8.25, requestDate: '2024-01-05', status: 'Under Review', priority: 'Low' },
];

// Interest Schedule Data
interface InterestRecord {
  id: string;
  loanId: string;
  borrowerEntity: string;
  principal: number;
  rate: number;
  interestAmount: number;
  periodStart: string;
  periodEnd: string;
  dueDate: string;
  status: 'Paid' | 'Due' | 'Upcoming' | 'Overdue';
}

const interestScheduleData: InterestRecord[] = [
  { id: 'INT-001', loanId: 'ICL-001', borrowerEntity: 'ZenBank Mumbai', principal: 120, rate: 8.5, interestAmount: 0.85, periodStart: '2024-01-01', periodEnd: '2024-01-31', dueDate: '2024-02-05', status: 'Due' },
  { id: 'INT-002', loanId: 'ICL-002', borrowerEntity: 'ZenBank Bangalore', principal: 180, rate: 8.0, interestAmount: 1.2, periodStart: '2024-01-01', periodEnd: '2024-01-31', dueDate: '2024-02-05', status: 'Due' },
  { id: 'INT-003', loanId: 'ICL-003', borrowerEntity: 'Project Alpha SPV', principal: 280, rate: 9.0, interestAmount: 2.1, periodStart: '2024-01-01', periodEnd: '2024-01-31', dueDate: '2024-02-05', status: 'Due' },
  { id: 'INT-004', loanId: 'ICL-004', borrowerEntity: 'ZenBank Chennai', principal: 65, rate: 8.25, interestAmount: 0.45, periodStart: '2024-01-01', periodEnd: '2024-01-31', dueDate: '2024-02-05', status: 'Due' },
  { id: 'INT-005', loanId: 'ICL-005', borrowerEntity: 'ZenBank Delhi', principal: 85, rate: 8.5, interestAmount: 0.6, periodStart: '2023-12-01', periodEnd: '2023-12-31', dueDate: '2024-01-05', status: 'Paid' },
  { id: 'INT-006', loanId: 'ICL-006', borrowerEntity: 'Subsidiary A', principal: 100, rate: 8.75, interestAmount: 0.73, periodStart: '2024-01-01', periodEnd: '2024-01-31', dueDate: '2024-02-15', status: 'Upcoming' },
];

// AI Insights
const aiInsights = [
  {
    id: '1',
    type: 'recommendation' as const,
    title: 'Optimal Funding Structure',
    insight: 'Consider restructuring ICL-003 (Project Alpha) from single lump-sum to milestone-based disbursement. This would reduce idle cash cost by INR 1.2 Cr annually.',
    impact: 'high' as const,
    confidence: 88,
    category: 'Funding Optimization',
  },
  {
    id: '2',
    type: 'warning' as const,
    title: 'Transfer Pricing Review',
    insight: 'ICL-005 (ZenBank Delhi) interest rate of 8.5% is marginally below arm\'s length benchmark (8.75%). Recommend rate adjustment to maintain compliance.',
    impact: 'high' as const,
    confidence: 92,
    category: 'Compliance',
  },
  {
    id: '3',
    type: 'insight' as const,
    title: 'Interest Rate Optimization',
    insight: 'Current blended IC lending rate is 8.4%. Based on MCLR trends, consider locking new loans at fixed rates to protect against expected 25-50 bps increase.',
    impact: 'medium' as const,
    confidence: 75,
    category: 'Rate Strategy',
  },
  {
    id: '4',
    type: 'recommendation' as const,
    title: 'Funding Request Priority',
    insight: 'Approve FR-001 (ZenBank Pune) at 8.5% rate. Entity has strong repayment history and the working capital need aligns with seasonal business pattern.',
    impact: 'medium' as const,
    confidence: 85,
    category: 'Funding Approval',
  },
];

// Loan columns
const loanColumns: Column<ICLoanRecord>[] = [
  { id: 'id', header: 'Loan ID', accessor: 'id' },
  { id: 'lenderEntity', header: 'Lender', accessor: 'lenderEntity', sortable: true },
  { id: 'borrowerEntity', header: 'Borrower', accessor: 'borrowerEntity', sortable: true },
  {
    id: 'principal',
    header: 'Principal',
    accessor: 'principal',
    cell: (row) => <span className="font-mono font-medium">₹{row.principal} Cr</span>,
    sortable: true,
  },
  {
    id: 'outstanding',
    header: 'Outstanding',
    accessor: 'outstanding',
    cell: (row) => <span className="font-mono font-medium">₹{row.outstanding} Cr</span>,
    sortable: true,
  },
  {
    id: 'interestRate',
    header: 'Rate',
    accessor: 'interestRate',
    cell: (row) => <span className="font-mono">{row.interestRate}%</span>,
  },
  { id: 'dueDate', header: 'Maturity', accessor: 'dueDate', sortable: true },
  {
    id: 'nextPayment',
    header: 'Next Payment',
    accessor: 'nextPayment',
    cell: (row) => (
      <div>
        <div className="font-mono">₹{row.nextPayment} Cr</div>
        <div className="text-xs text-muted-foreground">{row.nextPaymentDate}</div>
      </div>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Active' ? 'default' : row.status === 'Due Soon' ? 'secondary' : row.status === 'Overdue' ? 'danger' : 'outline'}>
        {row.status}
      </Badge>
    ),
  },
  {
    id: 'compliance',
    header: 'Compliance',
    accessor: 'compliance',
    cell: (row) => (
      <Badge variant={row.compliance === 'Compliant' ? 'default' : row.compliance === 'Review' ? 'secondary' : 'danger'}>
        {row.compliance === 'Compliant' && <CheckCircle2 className="mr-1 h-3 w-3" />}
        {row.compliance === 'Review' && <Clock className="mr-1 h-3 w-3" />}
        {row.compliance === 'Non-Compliant' && <AlertCircle className="mr-1 h-3 w-3" />}
        {row.compliance}
      </Badge>
    ),
  },
];

// Funding request columns
const requestColumns: Column<FundingRequest>[] = [
  { id: 'id', header: 'Request ID', accessor: 'id' },
  { id: 'requestedBy', header: 'Requested By', accessor: 'requestedBy', sortable: true },
  { id: 'lenderEntity', header: 'From', accessor: 'lenderEntity' },
  {
    id: 'amount',
    header: 'Amount',
    accessor: 'amount',
    cell: (row) => <span className="font-mono font-medium">₹{row.amount} Cr</span>,
    sortable: true,
  },
  { id: 'purpose', header: 'Purpose', accessor: 'purpose' },
  { id: 'tenure', header: 'Tenure', accessor: 'tenure' },
  {
    id: 'requestedRate',
    header: 'Req. Rate',
    accessor: 'requestedRate',
    cell: (row) => <span className="font-mono">{row.requestedRate}%</span>,
  },
  {
    id: 'suggestedRate',
    header: 'Suggested',
    accessor: 'suggestedRate',
    cell: (row) => <span className="font-mono text-green-600">{row.suggestedRate}%</span>,
  },
  {
    id: 'priority',
    header: 'Priority',
    accessor: 'priority',
    cell: (row) => (
      <Badge variant={row.priority === 'High' ? 'danger' : row.priority === 'Medium' ? 'secondary' : 'outline'}>
        {row.priority}
      </Badge>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Approved' ? 'default' : row.status === 'Pending' ? 'secondary' : row.status === 'Under Review' ? 'outline' : 'danger'}>
        {row.status}
      </Badge>
    ),
  },
];

// Interest schedule columns
const interestColumns: Column<InterestRecord>[] = [
  { id: 'loanId', header: 'Loan ID', accessor: 'loanId' },
  { id: 'borrowerEntity', header: 'Borrower', accessor: 'borrowerEntity', sortable: true },
  {
    id: 'principal',
    header: 'Principal',
    accessor: 'principal',
    cell: (row) => <span className="font-mono">₹{row.principal} Cr</span>,
  },
  {
    id: 'rate',
    header: 'Rate',
    accessor: 'rate',
    cell: (row) => <span className="font-mono">{row.rate}%</span>,
  },
  {
    id: 'interestAmount',
    header: 'Interest',
    accessor: 'interestAmount',
    cell: (row) => <span className="font-mono font-medium">₹{row.interestAmount} Cr</span>,
    sortable: true,
  },
  { id: 'periodStart', header: 'Period Start', accessor: 'periodStart' },
  { id: 'periodEnd', header: 'Period End', accessor: 'periodEnd' },
  { id: 'dueDate', header: 'Due Date', accessor: 'dueDate', sortable: true },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Paid' ? 'default' : row.status === 'Due' ? 'secondary' : row.status === 'Upcoming' ? 'outline' : 'danger'}>
        {row.status}
      </Badge>
    ),
  },
];

export default function IntercompanyFundingPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <PageContainer>
      <PageHeader
        title="Intercompany Funding"
        description="Manage intercompany loans, interest, and compliance"
        breadcrumbs={[
          { label: 'Treasury', href: '/treasury' },
          { label: 'Intercompany Funding', href: '/treasury/intercompany' },
        ]}
        actions={[
          {
            label: 'New Loan',
            icon: Plus,
            onClick: () => {},
            variant: 'default',
          },
          {
            label: 'Compliance Report',
            icon: FileCheck,
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
          title="Total IC Loans"
          value={kpiData.totalICLoans.value}
          changeUnit={kpiData.totalICLoans.unit}
          change={kpiData.totalICLoans.change}
          trend={kpiData.totalICLoans.trend}
          icon={Building2}
          sparkline={kpiData.totalICLoans.sparkline}
          subtitle={kpiData.totalICLoans.subtitle}
        />
        <KPICard
          title="Active Loans"
          value={kpiData.activeLoans.value}
          changeUnit={kpiData.activeLoans.unit}
          change={kpiData.activeLoans.change}
          trend={kpiData.activeLoans.trend}
          icon={FileText}
          subtitle={kpiData.activeLoans.subtitle}
        />
        <KPICard
          title="Interest Income (YTD)"
          value={kpiData.interestIncomeYTD.value}
          changeUnit={kpiData.interestIncomeYTD.unit}
          change={kpiData.interestIncomeYTD.change}
          trend={kpiData.interestIncomeYTD.trend}
          icon={Percent}
          sparkline={kpiData.interestIncomeYTD.sparkline}
          subtitle={kpiData.interestIncomeYTD.subtitle}
        />
        <KPICard
          title="Pending Requests"
          value={kpiData.pendingRequests.value}
          changeUnit={kpiData.pendingRequests.unit}
          change={kpiData.pendingRequests.change}
          trend={kpiData.pendingRequests.trend}
          icon={Clock}
          subtitle={kpiData.pendingRequests.subtitle}
        />
        <KPICard
          title="Due This Month"
          value={kpiData.dueThisMonth.value}
          changeUnit={kpiData.dueThisMonth.unit}
          change={kpiData.dueThisMonth.change}
          trend={kpiData.dueThisMonth.trend}
          icon={Calendar}
          subtitle={kpiData.dueThisMonth.subtitle}
        />
        <KPICard
          title="Compliance Score"
          value={kpiData.complianceScore.value}
          changeUnit={kpiData.complianceScore.unit}
          change={kpiData.complianceScore.change}
          trend={kpiData.complianceScore.trend}
          icon={Shield}
          sparkline={kpiData.complianceScore.sparkline}
          subtitle={kpiData.complianceScore.subtitle}
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Funding Requests</TabsTrigger>
          <TabsTrigger value="loans">Intercompany Loans</TabsTrigger>
          <TabsTrigger value="interest">Interest Schedule</TabsTrigger>
          <TabsTrigger value="repayments">Repayments</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        {/* Funding Requests Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  IC Funding Trend
                </CardTitle>
                <CardDescription>Outstanding loan balance (12 months)</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={fundingTrendData}
                  height={280}
                  showGrid
                  showTooltip
                  // color="#3b82f6"
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  Interest Income
                </CardTitle>
                <CardDescription>Monthly interest income (12 months)</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={interestIncomeData}
                  height={280}
                  showGrid
                  // showTooltip
                  // color="#10b981"
                />
              </CardContent>
            </Card>
          </div>

          {/* Funding Request Form */}
          <Card>
            <CardHeader>
              <CardTitle>New Funding Request</CardTitle>
              <CardDescription>Submit intercompany funding request</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label>Borrower Entity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mumbai">ZenBank Mumbai</SelectItem>
                      <SelectItem value="delhi">ZenBank Delhi</SelectItem>
                      <SelectItem value="bangalore">ZenBank Bangalore</SelectItem>
                      <SelectItem value="pune">ZenBank Pune</SelectItem>
                      <SelectItem value="project">Project SPV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Lender Entity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hq">ZenBank HQ</SelectItem>
                      <SelectItem value="mumbai">ZenBank Mumbai</SelectItem>
                      <SelectItem value="bangalore">ZenBank Bangalore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Amount (Cr)</Label>
                  <Input type="number" placeholder="Enter amount" />
                </div>
                <div>
                  <Label>Tenure</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="18">18 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <Label>Interest Rate (%)</Label>
                  <Input type="number" step="0.25" placeholder="8.5" />
                </div>
                <div>
                  <Label>Repayment Schedule</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="bullet">Bullet Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Purpose</Label>
                  <Input placeholder="Working capital, Project funding, etc." />
                </div>
              </div>
              <div className="mt-4">
                <Label>Additional Notes</Label>
                <Textarea placeholder="Any additional details or justification..." />
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Request
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pending Requests Table */}
          <Section title="Pending Requests" description="Funding requests awaiting approval">
            <DataTable
              data={fundingRequestsData}
              columns={requestColumns}
              searchable
              searchPlaceholder="Search requests..."
              // pageSize={10}
            />
          </Section>

          {/* AI Insights */}
          <AIInsightsPanel
            title="Funding Optimization Insights"
            insights={aiInsights}
          />
        </TabsContent>

        {/* Intercompany Loans Tab */}
        <TabsContent value="loans" className="space-y-6">
          <Section title="Active IC Loans" description="All intercompany loan agreements">
            <DataTable
              data={icLoanTableData}
              columns={loanColumns}
              searchable
              searchPlaceholder="Search loans..."
              // pageSize={10}
            />
          </Section>
        </TabsContent>

        {/* Interest Schedule Tab */}
        <TabsContent value="interest" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Interest Due (Jan)</div>
              <div className="text-2xl font-bold">₹6.2 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Interest Paid (YTD)</div>
              <div className="text-2xl font-bold">₹45 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Overdue Interest</div>
              <div className="text-2xl font-bold text-red-600">₹0</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Avg Interest Rate</div>
              <div className="text-2xl font-bold">8.4%</div>
            </Card>
          </div>

          <Section title="Interest Schedule" description="Monthly interest payment schedule">
            <DataTable
              data={interestScheduleData}
              columns={interestColumns}
              searchable
              // pageSize={10}
            />
          </Section>
        </TabsContent>

        {/* Repayments Tab */}
        <TabsContent value="repayments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                Repayment Schedule
              </CardTitle>
              <CardDescription>Principal and interest repayments (12 months)</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={repaymentScheduleData}
                height={300}
                showGrid
                showTooltip
                // color="#8b5cf6"
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Due This Month</div>
              <div className="text-2xl font-bold">₹85 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Paid (YTD)</div>
              <div className="text-2xl font-bold">₹320 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Upcoming (90 days)</div>
              <div className="text-2xl font-bold">₹340 Cr</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Overdue</div>
              <div className="text-2xl font-bold text-green-600">₹0</div>
            </Card>
          </div>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Transfer Pricing Compliance
                </CardTitle>
                <CardDescription>Arm's length principle adherence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Overall Compliance Score</span>
                    <span className="font-bold text-green-600">98%</span>
                  </div>
                  <Progress value={98} className="h-3" />

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Loans at Arm's Length Rate</span>
                      <Badge variant="default">16 of 18</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Documentation Complete</span>
                      <Badge variant="default">18 of 18</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Requiring Review</span>
                      <Badge variant="secondary">2</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Non-Compliant</span>
                      <Badge variant="outline">0</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benchmark Rates</CardTitle>
                <CardDescription>Current arm's length benchmark rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>12 Month Loan</span>
                    <span className="font-mono font-medium">7.75% - 8.25%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>18 Month Loan</span>
                    <span className="font-mono font-medium">8.00% - 8.50%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>24 Month Loan</span>
                    <span className="font-mono font-medium">8.25% - 8.75%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span>36 Month Loan</span>
                    <span className="font-mono font-medium">8.75% - 9.25%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Based on MCLR + applicable spread. Last updated: January 15, 2024
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Actions Required</CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">ICL-005: Rate Review Required</p>
                      <p className="text-sm text-muted-foreground">Current rate 8.5% below benchmark range</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Review</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Annual TP Documentation</p>
                      <p className="text-sm text-muted-foreground">Due by March 31, 2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Start</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights for Compliance */}
          <AIInsightsPanel
            title="Compliance Insights"
            insights={aiInsights.filter(i => i.category === 'Compliance')}
          />
        </TabsContent>
      </Tabs>

      {/* Quick Actions Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
            <Button variant="outline" size="sm">
              <FileCheck className="mr-2 h-4 w-4" />
              Compliance Check
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bot className="mr-2 h-4 w-4" />
              AI Rate Advisor
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New IC Loan
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
