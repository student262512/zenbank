'use client';

import { useState } from 'react';
import {
  ArrowUpRight,
  Truck,
  Building2,
  Users,
  CreditCard,
  Receipt,
  Zap,
  Hammer,
  RotateCcw,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Download,
  Filter,
  RefreshCw,
  Sparkles,
  ChevronRight,
  IndianRupee,
  FileText,
  Ban,
  Play,
  Pause,
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
import { cashOutflowTabs } from '@/config/cash-flow-navigation';

// Mock data for KPIs
const kpiData = {
  totalOutflow: { value: 678.4, change: 8.2, trend: 'up' as const },
  vendorPayments: { value: 312.5, change: 12.4, trend: 'up' as const },
  constructionBills: { value: 189.3, change: 6.8, trend: 'up' as const },
  payroll: { value: 45.2, change: 2.1, trend: 'up' as const },
  loanRepayments: { value: 67.8, change: 0, trend: 'neutral' as const },
  taxes: { value: 34.5, change: -15.2, trend: 'down' as const },
  utilities: { value: 8.6, change: 3.4, trend: 'up' as const },
  pendingPayments: { value: 156.8, change: 5.6, trend: 'up' as const },
  overduePayables: { value: 23.4, change: -8.5, trend: 'down' as const },
  paymentEfficiency: { value: 94.2, change: 1.8, trend: 'up' as const },
  avgDaysToPayable: { value: 28, change: -2, trend: 'down' as const },
  cashBurn: { value: 22.6, change: -3.2, trend: 'down' as const },
};

// Mock data for outflow transactions
const outflowTransactions = [
  {
    id: 'OUT001',
    date: '2026-07-25',
    type: 'Vendor Payment',
    vendor: 'ABC Contractors Ltd',
    project: 'Marina Bay Towers',
    description: 'Construction - Floor 18-22',
    amount: 12.45,
    status: 'paid',
    bankAccount: 'HDFC Current - 4521',
    reference: 'UTR2026072500456',
    priority: 'high',
  },
  {
    id: 'OUT002',
    date: '2026-07-25',
    type: 'Payroll',
    vendor: 'Internal',
    project: 'Corporate',
    description: 'July 2026 Salaries',
    amount: 15.80,
    status: 'paid',
    bankAccount: 'ICICI Current - 7834',
    reference: 'SAL2026072500001',
    priority: 'critical',
  },
  {
    id: 'OUT003',
    date: '2026-07-24',
    type: 'Loan Repayment',
    vendor: 'State Bank of India',
    project: 'Tech Park Phase 2',
    description: 'EMI - Construction Finance',
    amount: 8.75,
    status: 'paid',
    bankAccount: 'SBI CC - 9012',
    reference: 'EMI2026072400123',
    priority: 'critical',
  },
  {
    id: 'OUT004',
    date: '2026-07-24',
    type: 'Construction Bill',
    vendor: 'Shapoorji Pallonji',
    project: 'Downtown Plaza',
    description: 'Civil Works - RA Bill #12',
    amount: 28.50,
    status: 'pending_approval',
    bankAccount: '-',
    reference: 'RA-DP-012',
    priority: 'high',
  },
  {
    id: 'OUT005',
    date: '2026-07-23',
    type: 'Vendor Payment',
    vendor: 'JSW Steel',
    project: 'Green Valley Villas',
    description: 'Steel Supply - Phase 2',
    amount: 8.25,
    status: 'scheduled',
    bankAccount: 'HDFC Current - 4521',
    reference: 'PO-GVV-2026-089',
    priority: 'medium',
  },
  {
    id: 'OUT006',
    date: '2026-07-23',
    type: 'Taxes',
    vendor: 'GST Dept',
    project: 'Corporate',
    description: 'GST Payment - June 2026',
    amount: 18.50,
    status: 'paid',
    bankAccount: 'ICICI Current - 7834',
    reference: 'GST2026072300234',
    priority: 'critical',
  },
  {
    id: 'OUT007',
    date: '2026-07-22',
    type: 'Utilities',
    vendor: 'BESCOM',
    project: 'Tech Park Phase 1',
    description: 'Electricity - July 2026',
    amount: 2.15,
    status: 'paid',
    bankAccount: 'HDFC Current - 4521',
    reference: 'ELEC2026072200567',
    priority: 'medium',
  },
  {
    id: 'OUT008',
    date: '2026-07-22',
    type: 'Vendor Payment',
    vendor: 'L&T Construction',
    project: 'Skyline Residency',
    description: 'Structural Work - Tower B',
    amount: 45.00,
    status: 'overdue',
    bankAccount: '-',
    reference: 'Due: 07/15',
    priority: 'high',
  },
];

// Mock data for vendor payments
const vendorPayments = [
  {
    id: 'VP001',
    vendorId: 'VEND001',
    vendorName: 'ABC Contractors Ltd',
    vendorType: 'Construction',
    project: 'Marina Bay Towers',
    totalPayable: 156.8,
    paid: 132.5,
    pending: 24.3,
    overdue: 0,
    nextDue: '2026-07-30',
    paymentTerms: 'Net 30',
    relationship: 'A',
    trend: 'stable',
  },
  {
    id: 'VP002',
    vendorId: 'VEND002',
    vendorName: 'Shapoorji Pallonji',
    vendorType: 'Construction',
    project: 'Downtown Plaza',
    totalPayable: 245.6,
    paid: 178.4,
    pending: 67.2,
    overdue: 28.5,
    nextDue: '2026-07-28',
    paymentTerms: 'Net 45',
    relationship: 'A+',
    trend: 'increasing',
  },
  {
    id: 'VP003',
    vendorId: 'VEND003',
    vendorName: 'L&T Construction',
    vendorType: 'Construction',
    project: 'Skyline Residency',
    totalPayable: 189.4,
    paid: 89.4,
    pending: 100.0,
    overdue: 45.0,
    nextDue: '2026-07-15',
    paymentTerms: 'Net 30',
    relationship: 'B+',
    trend: 'increasing',
  },
  {
    id: 'VP004',
    vendorId: 'VEND004',
    vendorName: 'JSW Steel',
    vendorType: 'Materials',
    project: 'Multiple',
    totalPayable: 67.8,
    paid: 59.55,
    pending: 8.25,
    overdue: 0,
    nextDue: '2026-07-28',
    paymentTerms: 'Net 15',
    relationship: 'A',
    trend: 'stable',
  },
  {
    id: 'VP005',
    vendorId: 'VEND005',
    vendorName: 'UltraTech Cement',
    vendorType: 'Materials',
    project: 'Multiple',
    totalPayable: 45.2,
    paid: 45.2,
    pending: 0,
    overdue: 0,
    nextDue: '-',
    paymentTerms: 'Net 30',
    relationship: 'A+',
    trend: 'stable',
  },
];

// Mock data for construction bills
const constructionBills = [
  {
    id: 'CB001',
    billNumber: 'RA-MBT-045',
    contractor: 'ABC Contractors Ltd',
    project: 'Marina Bay Towers',
    workDescription: 'Civil & Structural - Floor 18-22',
    billAmount: 28.50,
    retention: 2.85,
    netPayable: 25.65,
    completionPercent: 78,
    certifiedDate: '2026-07-20',
    dueDate: '2026-07-30',
    status: 'certified',
  },
  {
    id: 'CB002',
    billNumber: 'RA-DP-012',
    contractor: 'Shapoorji Pallonji',
    project: 'Downtown Plaza',
    workDescription: 'Civil Works - Podium Level',
    billAmount: 35.20,
    retention: 3.52,
    netPayable: 31.68,
    completionPercent: 45,
    certifiedDate: '2026-07-22',
    dueDate: '2026-08-05',
    status: 'pending_approval',
  },
  {
    id: 'CB003',
    billNumber: 'RA-SR-028',
    contractor: 'L&T Construction',
    project: 'Skyline Residency',
    workDescription: 'Structural Work - Tower B',
    billAmount: 52.80,
    retention: 5.28,
    netPayable: 47.52,
    completionPercent: 62,
    certifiedDate: '2026-07-10',
    dueDate: '2026-07-25',
    status: 'overdue',
  },
  {
    id: 'CB004',
    billNumber: 'RA-GVV-015',
    contractor: 'NCC Ltd',
    project: 'Green Valley Villas',
    workDescription: 'Foundation Work - Phase 2',
    billAmount: 18.45,
    retention: 1.85,
    netPayable: 16.60,
    completionPercent: 35,
    certifiedDate: '2026-07-18',
    dueDate: '2026-08-02',
    status: 'certified',
  },
];

// Mock data for loan repayments
const loanRepayments = [
  {
    id: 'LR001',
    lender: 'State Bank of India',
    loanType: 'Construction Finance',
    project: 'Tech Park Phase 2',
    emiAmount: 8.75,
    principal: 5.25,
    interest: 3.50,
    dueDate: '2026-07-25',
    outstandingPrincipal: 145.0,
    status: 'paid',
    nextEmiDate: '2026-08-25',
  },
  {
    id: 'LR002',
    lender: 'HDFC Bank',
    loanType: 'Project Finance',
    project: 'Marina Bay Towers',
    emiAmount: 12.50,
    principal: 8.75,
    interest: 3.75,
    dueDate: '2026-07-28',
    outstandingPrincipal: 89.6,
    status: 'upcoming',
    nextEmiDate: '2026-08-28',
  },
  {
    id: 'LR003',
    lender: 'ICICI Bank',
    loanType: 'Construction Finance',
    project: 'Downtown Plaza',
    emiAmount: 15.80,
    principal: 10.20,
    interest: 5.60,
    dueDate: '2026-08-01',
    outstandingPrincipal: 234.5,
    status: 'upcoming',
    nextEmiDate: '2026-09-01',
  },
  {
    id: 'LR004',
    lender: 'Axis Bank',
    loanType: 'Working Capital',
    project: 'Corporate',
    emiAmount: 4.25,
    principal: 3.15,
    interest: 1.10,
    dueDate: '2026-07-30',
    outstandingPrincipal: 28.5,
    status: 'upcoming',
    nextEmiDate: '2026-08-30',
  },
];

// Mock data for payroll
const payrollData = [
  {
    id: 'PR001',
    month: 'July 2026',
    entity: 'ZenBank Holdings',
    employees: 245,
    grossSalary: 8.45,
    deductions: 1.25,
    netPayable: 7.20,
    pf: 0.85,
    esi: 0.12,
    tds: 0.95,
    status: 'processed',
    paymentDate: '2026-07-25',
  },
  {
    id: 'PR002',
    month: 'July 2026',
    entity: 'Marina Bay SPV',
    employees: 156,
    grossSalary: 5.20,
    deductions: 0.78,
    netPayable: 4.42,
    pf: 0.52,
    esi: 0.08,
    tds: 0.58,
    status: 'processed',
    paymentDate: '2026-07-25',
  },
  {
    id: 'PR003',
    month: 'July 2026',
    entity: 'Downtown SPV',
    employees: 89,
    grossSalary: 3.15,
    deductions: 0.47,
    netPayable: 2.68,
    pf: 0.32,
    esi: 0.05,
    tds: 0.35,
    status: 'processed',
    paymentDate: '2026-07-25',
  },
  {
    id: 'PR004',
    month: 'July 2026',
    entity: 'Construction Site Staff',
    employees: 420,
    grossSalary: 2.85,
    deductions: 0.32,
    netPayable: 2.53,
    pf: 0.29,
    esi: 0.04,
    tds: 0.15,
    status: 'pending',
    paymentDate: '2026-07-28',
  },
];

// Mock data for outflow trends
const outflowTrendData = [
  { month: 'Feb', vendors: 285, construction: 165, payroll: 42, loans: 68, taxes: 25, utilities: 8 },
  { month: 'Mar', vendors: 312, construction: 178, payroll: 43, loans: 68, taxes: 45, utilities: 8 },
  { month: 'Apr', vendors: 298, construction: 185, payroll: 44, loans: 68, taxes: 28, utilities: 9 },
  { month: 'May', vendors: 325, construction: 192, payroll: 44, loans: 68, taxes: 32, utilities: 8 },
  { month: 'Jun', vendors: 308, construction: 186, payroll: 45, loans: 68, taxes: 38, utilities: 9 },
  { month: 'Jul', vendors: 312, construction: 189, payroll: 45, loans: 68, taxes: 35, utilities: 9 },
];

// Mock data for outflow by type
const outflowByTypeData = [
  { name: 'Vendor Payments', value: 312.5, color: '#3b82f6' },
  { name: 'Construction Bills', value: 189.3, color: '#f59e0b' },
  { name: 'Loan Repayments', value: 67.8, color: '#ef4444' },
  { name: 'Payroll', value: 45.2, color: '#10b981' },
  { name: 'Taxes', value: 34.5, color: '#8b5cf6' },
  { name: 'Utilities & Other', value: 29.1, color: '#6b7280' },
];

// AI Insights
const aiInsights = [
  {
    id: 'ai1',
    type: 'opportunity' as const,
    title: 'Early Payment Discount',
    description: 'JSW Steel offers 2% discount for payments within 7 days. ₹8.25 Cr due - potential savings of ₹16.5 Lakhs.',
    impact: '+₹16.5 Lakhs savings',
    confidence: 95,
    action: 'Process Early Payment',
  },
  {
    id: 'ai2',
    type: 'warning' as const,
    title: 'L&T Payment Overdue',
    description: 'Payment of ₹45 Cr to L&T is 7 days overdue. Risk of supply disruption and relationship damage.',
    impact: 'Project delay risk',
    confidence: 92,
    action: 'Prioritize Payment',
  },
  {
    id: 'ai3',
    type: 'insight' as const,
    title: 'Payment Optimization',
    description: 'Consolidating vendor payments on 25th and 30th can reduce transaction fees by 15%.',
    impact: '₹2.4 Lakhs/month',
    confidence: 87,
    action: 'Review Schedule',
  },
];

export default function CashOutflowIntelligencePage() {
  const [activeTab, setActiveTab] = useState('overview');
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
  const [selectedTransaction, setSelectedTransaction] = useState<typeof outflowTransactions[0] | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<typeof vendorPayments[0] | null>(null);

  const transactionColumns: Column<typeof outflowTransactions[0]>[] = [
    {
      id: 'date',
      header: 'Date',
      sortable: true,
      render: (row) => (
        <span className="text-sm">{new Date(row.date).toLocaleDateString('en-IN')}</span>
      ),
    },
    {
      id: 'type',
      header: 'Type',
      sortable: true,
      render: (row) => (
        <Badge variant="outline" className="font-normal">
          {row.type}
        </Badge>
      ),
    },
    {
      id: 'vendor',
      header: 'Vendor/Payee',
      sortable: true,
    },
    {
      id: 'project',
      header: 'Project',
      sortable: true,
    },
    {
      id: 'description',
      header: 'Description',
      render: (row) => (
        <span className="text-sm text-muted-foreground">{row.description}</span>
      ),
    },
    {
      id: 'amount',
      header: 'Amount (₹ Cr)',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-red-400">-₹{row.amount.toFixed(2)} Cr</span>
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
      sortable: true,
      render: (row) => (
        <Badge
          variant={
            row.status === 'paid' ? 'default' :
            row.status === 'scheduled' ? 'secondary' :
            row.status === 'pending_approval' ? 'outline' : 'destructive'
          }
        >
          {row.status === 'paid' ? 'Paid' :
           row.status === 'scheduled' ? 'Scheduled' :
           row.status === 'pending_approval' ? 'Pending' : 'Overdue'}
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
          onClick={() => setSelectedTransaction(row)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const vendorColumns: Column<typeof vendorPayments[0]>[] = [
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
      id: 'totalPayable',
      header: 'Total Payable',
      align: 'right' as const,
      sortable: true,
      render: (row) => <span>₹{row.totalPayable.toFixed(1)} Cr</span>,
    },
    {
      id: 'paid',
      header: 'Paid',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className="text-emerald-400">₹{row.paid.toFixed(1)} Cr</span>
      ),
    },
    {
      id: 'pending',
      header: 'Pending',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className="text-amber-400">₹{row.pending.toFixed(1)} Cr</span>
      ),
    },
    {
      id: 'overdue',
      header: 'Overdue',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className={row.overdue > 0 ? 'text-red-400' : 'text-muted-foreground'}>
          ₹{row.overdue.toFixed(1)} Cr
        </span>
      ),
    },
    {
      id: 'relationship',
      header: 'Rating',
      render: (row) => (
        <Badge
          variant={
            row.relationship.startsWith('A') ? 'default' :
            row.relationship.startsWith('B') ? 'secondary' : 'destructive'
          }
        >
          {row.relationship}
        </Badge>
      ),
    },
    {
      id: 'trend',
      header: 'Trend',
      render: (row) => (
        <div className="flex items-center gap-1">
          {row.trend === 'increasing' ? (
            <TrendingUp className="h-4 w-4 text-red-400" />
          ) : row.trend === 'decreasing' ? (
            <TrendingDown className="h-4 w-4 text-emerald-400" />
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </div>
      ),
    },
    {
      id: 'actions',
      header: '',
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedVendor(row)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const constructionColumns: Column<typeof constructionBills[0]>[] = [
    {
      id: 'billNumber',
      header: 'Bill #',
      sortable: true,
    },
    {
      id: 'contractor',
      header: 'Contractor',
      sortable: true,
    },
    {
      id: 'project',
      header: 'Project',
      sortable: true,
    },
    {
      id: 'workDescription',
      header: 'Work Description',
      render: (row) => (
        <span className="text-sm">{row.workDescription}</span>
      ),
    },
    {
      id: 'billAmount',
      header: 'Bill Amount',
      align: 'right' as const,
      render: (row) => <span>₹{row.billAmount.toFixed(2)} Cr</span>,
    },
    {
      id: 'netPayable',
      header: 'Net Payable',
      align: 'right' as const,
      render: (row) => (
        <span className="text-red-400">₹{row.netPayable.toFixed(2)} Cr</span>
      ),
    },
    {
      id: 'completionPercent',
      header: 'Progress',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${row.completionPercent}%` }}
            />
          </div>
          <span className="text-sm">{row.completionPercent}%</span>
        </div>
      ),
    },
    {
      id: 'dueDate',
      header: 'Due Date',
      render: (row) => new Date(row.dueDate).toLocaleDateString('en-IN'),
    },
    {
      id: 'status',
      header: 'Status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'certified' ? 'default' :
            row.status === 'pending_approval' ? 'secondary' : 'destructive'
          }
        >
          {row.status === 'certified' ? 'Certified' :
           row.status === 'pending_approval' ? 'Pending' : 'Overdue'}
        </Badge>
      ),
    },
  ];

  const loanColumns: Column<typeof loanRepayments[0]>[] = [
    {
      id: 'lender',
      header: 'Lender',
      sortable: true,
    },
    {
      id: 'project',
      header: 'Project',
      sortable: true,
    },
    {
      id: 'emiAmount',
      header: 'EMI',
      align: 'right' as const,
      render: (row) => (
        <span className="text-red-400">₹{row.emiAmount.toFixed(2)} Cr</span>
      ),
    },
    {
      id: 'principal',
      header: 'Principal',
      align: 'right' as const,
      render: (row) => <span>₹{row.principal.toFixed(2)} Cr</span>,
    },
    {
      id: 'interest',
      header: 'Interest',
      align: 'right' as const,
      render: (row) => <span>₹{row.interest.toFixed(2)} Cr</span>,
    },
    {
      id: 'dueDate',
      header: 'Due Date',
      render: (row) => new Date(row.dueDate).toLocaleDateString('en-IN'),
    },
    {
      id: 'outstandingPrincipal',
      header: 'Outstanding',
      align: 'right' as const,
      render: (row) => <span>₹{row.outstandingPrincipal.toFixed(1)} Cr</span>,
    },
    {
      id: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'paid' ? 'default' : 'secondary'}>
          {row.status === 'paid' ? 'Paid' : 'Upcoming'}
        </Badge>
      ),
    },
  ];

  const payrollColumns: Column<typeof payrollData[0]>[] = [
    {
      id: 'entity',
      header: 'Entity',
      sortable: true,
    },
    {
      id: 'employees',
      header: 'Employees',
      align: 'right' as const,
    },
    {
      id: 'grossSalary',
      header: 'Gross Salary',
      align: 'right' as const,
      render: (row) => <span>₹{row.grossSalary.toFixed(2)} Cr</span>,
    },
    {
      id: 'pf',
      header: 'PF',
      align: 'right' as const,
      render: (row) => <span>₹{row.pf.toFixed(2)} Cr</span>,
    },
    {
      id: 'tds',
      header: 'TDS',
      align: 'right' as const,
      render: (row) => <span>₹{row.tds.toFixed(2)} Cr</span>,
    },
    {
      id: 'netPayable',
      header: 'Net Payable',
      align: 'right' as const,
      render: (row) => (
        <span className="text-red-400">₹{row.netPayable.toFixed(2)} Cr</span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'processed' ? 'default' : 'secondary'}>
          {row.status === 'processed' ? 'Processed' : 'Pending'}
        </Badge>
      ),
    },
    {
      id: 'paymentDate',
      header: 'Payment Date',
      render: (row) => new Date(row.paymentDate).toLocaleDateString('en-IN'),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cash Outflow Intelligence"
        description="Manage and optimize outgoing payments across all expenditure categories"
        breadcrumbs={[
          { label: 'Cash Flow', href: '/cash-flow' },
          { label: 'Outflow Intelligence' },
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
              AI Analysis
            </Button>
          </div>
        }
      />

      <CashFlowFilters initialFilters={filters} onFilterChange={setFilters} />

      {/* KPI Grid */}
      <KPIGrid columns={4}>
        <KPICard
          title="Total Outflow (MTD)"
          value={`₹${kpiData.totalOutflow.value} Cr`}
          change={kpiData.totalOutflow.change}
          trend={kpiData.totalOutflow.trend}
          icon={ArrowUpRight}
          iconColor="text-red-400"
        />
        <KPICard
          title="Vendor Payments"
          value={`₹${kpiData.vendorPayments.value} Cr`}
          change={kpiData.vendorPayments.change}
          trend={kpiData.vendorPayments.trend}
          icon={Truck}
          iconColor="text-blue-400"
        />
        <KPICard
          title="Construction Bills"
          value={`₹${kpiData.constructionBills.value} Cr`}
          change={kpiData.constructionBills.change}
          trend={kpiData.constructionBills.trend}
          icon={Hammer}
          iconColor="text-orange-400"
        />
        <KPICard
          title="Pending Payments"
          value={`₹${kpiData.pendingPayments.value} Cr`}
          change={kpiData.pendingPayments.change}
          trend={kpiData.pendingPayments.trend}
          icon={Clock}
          iconColor="text-amber-400"
        />
      </KPIGrid>

      <KPIGrid columns={4}>
        <KPICard
          title="Loan Repayments"
          value={`₹${kpiData.loanRepayments.value} Cr`}
          change={kpiData.loanRepayments.change}
          trend={kpiData.loanRepayments.trend}
          icon={CreditCard}
          iconColor="text-violet-400"
        />
        <KPICard
          title="Payroll"
          value={`₹${kpiData.payroll.value} Cr`}
          change={kpiData.payroll.change}
          trend={kpiData.payroll.trend}
          icon={Users}
          iconColor="text-cyan-400"
        />
        <KPICard
          title="Payment Efficiency"
          value={`${kpiData.paymentEfficiency.value}%`}
          change={kpiData.paymentEfficiency.change}
          trend={kpiData.paymentEfficiency.trend}
          icon={CheckCircle2}
          iconColor="text-emerald-400"
        />
        <KPICard
          title="Overdue Payables"
          value={`₹${kpiData.overduePayables.value} Cr`}
          change={kpiData.overduePayables.change}
          trend={kpiData.overduePayables.trend}
          icon={AlertTriangle}
          iconColor="text-red-400"
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {cashOutflowTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Outflow Trends</CardTitle>
                <CardDescription>Monthly cash outflows by category</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={outflowTrendData}
                  xKey="month"
                  series={[
                    { key: 'vendors', name: 'Vendors', color: '#3b82f6' },
                    { key: 'construction', name: 'Construction', color: '#f59e0b' },
                    { key: 'loans', name: 'Loans', color: '#ef4444' },
                    { key: 'payroll', name: 'Payroll', color: '#10b981' },
                  ]}
                  height={300}
                  stacked
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outflow Composition</CardTitle>
                <CardDescription>Current month breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={outflowByTypeData}
                  height={280}
                  showLegend
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Outflows</CardTitle>
              <CardDescription>Latest payments and scheduled outflows</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={outflowTransactions}
                columns={transactionColumns}
                searchable
                searchKeys={['vendor', 'project', 'description']}
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

        {/* Vendor Payments Tab */}
        <TabsContent value="vendors" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Payables</p>
                    <p className="text-2xl font-bold">₹704.8 Cr</p>
                  </div>
                  <Truck className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Paid (MTD)</p>
                    <p className="text-2xl font-bold text-emerald-400">₹505.0 Cr</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-amber-400">₹199.8 Cr</p>
                  </div>
                  <Clock className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-2xl font-bold text-red-400">₹73.5 Cr</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vendor Payments</CardTitle>
              <CardDescription>Payment status by vendor</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={vendorPayments}
                columns={vendorColumns}
                searchable
                searchKeys={['vendorName', 'project']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Construction Bills Tab */}
        <TabsContent value="construction" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Bills Received</p>
                    <p className="text-2xl font-bold">₹134.9 Cr</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Certified</p>
                    <p className="text-2xl font-bold text-emerald-400">₹42.2 Cr</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Approval</p>
                    <p className="text-2xl font-bold text-amber-400">₹31.7 Cr</p>
                  </div>
                  <Clock className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Retention</p>
                    <p className="text-2xl font-bold text-violet-400">₹13.5 Cr</p>
                  </div>
                  <Ban className="h-8 w-8 text-violet-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Construction Bills (RA Bills)</CardTitle>
              <CardDescription>Running account bills from contractors</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={constructionBills}
                columns={constructionColumns}
                searchable
                searchKeys={['contractor', 'project', 'billNumber']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payroll Tab */}
        <TabsContent value="payroll" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                    <p className="text-2xl font-bold">910</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Gross Payroll</p>
                    <p className="text-2xl font-bold">₹19.65 Cr</p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Net Payable</p>
                    <p className="text-2xl font-bold text-red-400">₹16.83 Cr</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Statutory Dues</p>
                    <p className="text-2xl font-bold text-amber-400">₹2.82 Cr</p>
                  </div>
                  <Receipt className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payroll Summary</CardTitle>
              <CardDescription>Entity-wise payroll breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={payrollData}
                columns={payrollColumns}
                searchable
                searchKeys={['entity']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loan Repayments Tab */}
        <TabsContent value="loan-repayments" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly EMI</p>
                    <p className="text-2xl font-bold">₹41.30 Cr</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-violet-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Principal</p>
                    <p className="text-2xl font-bold">₹27.35 Cr</p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Interest</p>
                    <p className="text-2xl font-bold text-amber-400">₹13.95 Cr</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Outstanding</p>
                    <p className="text-2xl font-bold text-red-400">₹497.6 Cr</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Loan Repayment Schedule</CardTitle>
              <CardDescription>Upcoming and recent EMI payments</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={loanRepayments}
                columns={loanColumns}
                searchable
                searchKeys={['lender', 'project']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Taxes Tab */}
        <TabsContent value="taxes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Payments</CardTitle>
              <CardDescription>GST, TDS, and other statutory payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Tax payment details will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Utilities Tab */}
        <TabsContent value="utilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Utility Payments</CardTitle>
              <CardDescription>Electricity, water, and other utilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Utility payment details will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Construction Expenses Tab */}
        <TabsContent value="construction-expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Construction Expenses</CardTitle>
              <CardDescription>Project-wise construction expenditure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Construction expense details will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Refunds Tab */}
        <TabsContent value="refunds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Refunds Issued</CardTitle>
              <CardDescription>Customer refunds and advance returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Refund details will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other Payments Tab */}
        <TabsContent value="other" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Other Payments</CardTitle>
              <CardDescription>Miscellaneous expenses and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Other payment details will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Detail Drawer */}
      <Drawer open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Payment Details</DrawerTitle>
            <DrawerDescription>
              {selectedTransaction?.id} - {selectedTransaction?.type}
            </DrawerDescription>
          </DrawerHeader>
          {selectedTransaction && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Vendor/Payee</p>
                    <p className="font-medium">{selectedTransaction.vendor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Project</p>
                    <p className="font-medium">{selectedTransaction.project}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="font-medium">{selectedTransaction.description}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-2xl font-bold text-red-400">
                      -₹{selectedTransaction.amount.toFixed(2)} Cr
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bank Account</p>
                    <p className="font-medium">{selectedTransaction.bankAccount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reference</p>
                    <p className="font-medium">{selectedTransaction.reference}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {selectedTransaction.status === 'pending_approval' && (
                  <>
                    <Button className="flex-1">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Ban className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </>
                )}
                {selectedTransaction.status === 'scheduled' && (
                  <>
                    <Button className="flex-1">
                      <Play className="mr-2 h-4 w-4" />
                      Process Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Pause className="mr-2 h-4 w-4" />
                      Hold
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* Vendor Detail Drawer */}
      <Drawer open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedVendor?.vendorName}</DrawerTitle>
            <DrawerDescription>
              {selectedVendor?.vendorType} - {selectedVendor?.project}
            </DrawerDescription>
          </DrawerHeader>
          {selectedVendor && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Total Payable</p>
                    <p className="text-xl font-bold">₹{selectedVendor.totalPayable.toFixed(1)} Cr</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Paid</p>
                    <p className="text-xl font-bold text-emerald-400">
                      ₹{selectedVendor.paid.toFixed(1)} Cr
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-xl font-bold text-amber-400">
                      ₹{selectedVendor.pending.toFixed(1)} Cr
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-xl font-bold text-red-400">
                      ₹{selectedVendor.overdue.toFixed(1)} Cr
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Relationship Rating</p>
                    <Badge variant="default" className="text-lg px-3 py-1">
                      {selectedVendor.relationship}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Terms</p>
                    <p className="font-medium">{selectedVendor.paymentTerms}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Next Due</p>
                    <p className="font-medium">{selectedVendor.nextDue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Trend</p>
                    <p className="font-medium capitalize">{selectedVendor.trend}</p>
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
                <FileText className="mr-2 h-4 w-4" />
                Create Payment
              </Button>
              <Button variant="outline" size="sm">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Bulk Approve
              </Button>
              <Button variant="outline" size="sm">
                <Clock className="mr-2 h-4 w-4" />
                Schedule Payments
              </Button>
              <Button variant="outline" size="sm">
                <AlertTriangle className="mr-2 h-4 w-4" />
                View Overdue
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
