'use client';

import { useState } from 'react';
import {
  ArrowDownLeft,
  Users,
  Building2,
  Landmark,
  Home,
  Percent,
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
  ArrowUpRight,
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
import { cashInflowTabs } from '@/config/cash-flow-navigation';

// Mock data for KPIs
const kpiData = {
  totalInflow: { value: 847.5, change: 12.3, trend: 'up' as const },
  customerCollections: { value: 523.4, change: 8.7, trend: 'up' as const },
  bookingAdvances: { value: 156.2, change: 24.5, trend: 'up' as const },
  loanDisbursements: { value: 89.6, change: -5.2, trend: 'down' as const },
  rentalIncome: { value: 34.8, change: 2.1, trend: 'up' as const },
  interestIncome: { value: 12.4, change: 15.6, trend: 'up' as const },
  refunds: { value: 18.7, change: -8.3, trend: 'down' as const },
  otherReceipts: { value: 12.4, change: 5.2, trend: 'up' as const },
  pendingReceipts: { value: 234.5, change: -3.2, trend: 'down' as const },
  overdueCollections: { value: 67.8, change: 12.4, trend: 'up' as const },
  collectionEfficiency: { value: 87.3, change: 2.1, trend: 'up' as const },
  avgDaysToCollect: { value: 34, change: -3, trend: 'down' as const },
};

// Mock data for inflow transactions
const inflowTransactions = [
  {
    id: 'INF001',
    date: '2026-07-25',
    type: 'Customer Collection',
    customer: 'Prestige Estates',
    project: 'Marina Bay Towers',
    description: 'Unit A-1201 - Final Payment',
    amount: 4.25,
    status: 'received',
    bankAccount: 'HDFC Current - 4521',
    reference: 'UTR2026072500123',
  },
  {
    id: 'INF002',
    date: '2026-07-25',
    type: 'Booking Advance',
    customer: 'Rahul Sharma',
    project: 'Green Valley Villas',
    description: 'Villa 12 - Booking Amount',
    amount: 0.25,
    status: 'received',
    bankAccount: 'ICICI Current - 7834',
    reference: 'UTR2026072500124',
  },
  {
    id: 'INF003',
    date: '2026-07-24',
    type: 'Loan Disbursement',
    customer: 'SBI',
    project: 'Tech Park Phase 2',
    description: 'Construction Finance - Tranche 3',
    amount: 45.0,
    status: 'received',
    bankAccount: 'SBI CC - 9012',
    reference: 'SBI2026072400567',
  },
  {
    id: 'INF004',
    date: '2026-07-24',
    type: 'Rental Income',
    customer: 'Infosys Ltd',
    project: 'Cyber Hub Tower',
    description: 'Monthly Rent - Floor 12-14',
    amount: 1.85,
    status: 'received',
    bankAccount: 'HDFC Current - 4521',
    reference: 'UTR2026072400234',
  },
  {
    id: 'INF005',
    date: '2026-07-23',
    type: 'Customer Collection',
    customer: 'DLF Group',
    project: 'Downtown Plaza',
    description: 'Commercial Unit - Progress Payment',
    amount: 12.5,
    status: 'pending',
    bankAccount: '-',
    reference: 'Expected by 07/28',
  },
  {
    id: 'INF006',
    date: '2026-07-23',
    type: 'Interest Income',
    customer: 'HDFC Bank',
    project: 'Treasury',
    description: 'FD Interest - Q2 2026',
    amount: 2.34,
    status: 'received',
    bankAccount: 'HDFC Savings - 1234',
    reference: 'INT2026072300789',
  },
  {
    id: 'INF007',
    date: '2026-07-22',
    type: 'Refund',
    customer: 'ABC Contractors',
    project: 'Marina Bay Towers',
    description: 'Advance Refund - Project Completion',
    amount: 3.45,
    status: 'received',
    bankAccount: 'ICICI Current - 7834',
    reference: 'UTR2026072200456',
  },
  {
    id: 'INF008',
    date: '2026-07-22',
    type: 'Customer Collection',
    customer: 'Lodha Developers',
    project: 'Skyline Residency',
    description: 'Bulk Units - 50% Payment',
    amount: 28.75,
    status: 'overdue',
    bankAccount: '-',
    reference: 'Due: 07/15',
  },
];

// Mock data for customer collections
const customerCollections = [
  {
    id: 'CC001',
    customerId: 'CUST001',
    customerName: 'Prestige Estates',
    customerType: 'Corporate',
    project: 'Marina Bay Towers',
    totalReceivable: 45.8,
    collected: 38.5,
    pending: 7.3,
    overdue: 2.1,
    nextDue: '2026-07-30',
    creditScore: 'A',
    paymentHistory: 94,
    lastCollection: '2026-07-25',
    trend: 'stable',
  },
  {
    id: 'CC002',
    customerId: 'CUST002',
    customerName: 'DLF Group',
    customerType: 'Corporate',
    project: 'Downtown Plaza',
    totalReceivable: 128.4,
    collected: 89.6,
    pending: 38.8,
    overdue: 12.5,
    nextDue: '2026-07-28',
    creditScore: 'A+',
    paymentHistory: 97,
    lastCollection: '2026-07-20',
    trend: 'improving',
  },
  {
    id: 'CC003',
    customerId: 'CUST003',
    customerName: 'Lodha Developers',
    customerType: 'Corporate',
    project: 'Skyline Residency',
    totalReceivable: 67.2,
    collected: 28.5,
    pending: 38.7,
    overdue: 28.75,
    nextDue: '2026-07-15',
    creditScore: 'B+',
    paymentHistory: 78,
    lastCollection: '2026-07-05',
    trend: 'declining',
  },
  {
    id: 'CC004',
    customerId: 'CUST004',
    customerName: 'Godrej Properties',
    customerType: 'Corporate',
    project: 'Green Valley Villas',
    totalReceivable: 34.5,
    collected: 34.5,
    pending: 0,
    overdue: 0,
    nextDue: '-',
    creditScore: 'A+',
    paymentHistory: 100,
    lastCollection: '2026-07-22',
    trend: 'stable',
  },
  {
    id: 'CC005',
    customerId: 'CUST005',
    customerName: 'Brigade Group',
    customerType: 'Corporate',
    project: 'Tech Park Phase 2',
    totalReceivable: 89.7,
    collected: 67.3,
    pending: 22.4,
    overdue: 5.6,
    nextDue: '2026-08-05',
    creditScore: 'A',
    paymentHistory: 91,
    lastCollection: '2026-07-18',
    trend: 'improving',
  },
];

// Mock data for booking advances
const bookingAdvances = [
  {
    id: 'BA001',
    bookingDate: '2026-07-25',
    customerName: 'Rahul Sharma',
    project: 'Green Valley Villas',
    unit: 'Villa 12',
    unitValue: 4.5,
    advanceAmount: 0.25,
    advancePercent: 5.5,
    paymentMode: 'RTGS',
    salesperson: 'Amit Kumar',
    status: 'confirmed',
  },
  {
    id: 'BA002',
    bookingDate: '2026-07-24',
    customerName: 'Priya Patel',
    project: 'Marina Bay Towers',
    unit: 'Apt B-1804',
    unitValue: 2.8,
    advanceAmount: 0.28,
    advancePercent: 10.0,
    paymentMode: 'Cheque',
    salesperson: 'Sneha Reddy',
    status: 'confirmed',
  },
  {
    id: 'BA003',
    bookingDate: '2026-07-24',
    customerName: 'Vikram Singh',
    project: 'Skyline Residency',
    unit: 'Penthouse A',
    unitValue: 8.5,
    advanceAmount: 0.85,
    advancePercent: 10.0,
    paymentMode: 'NEFT',
    salesperson: 'Rajesh Gupta',
    status: 'pending_clearance',
  },
  {
    id: 'BA004',
    bookingDate: '2026-07-23',
    customerName: 'Anita Desai',
    project: 'Downtown Plaza',
    unit: 'Shop G-15',
    unitValue: 1.2,
    advanceAmount: 0.12,
    advancePercent: 10.0,
    paymentMode: 'UPI',
    salesperson: 'Meera Shah',
    status: 'confirmed',
  },
  {
    id: 'BA005',
    bookingDate: '2026-07-22',
    customerName: 'Suresh Menon',
    project: 'Green Valley Villas',
    unit: 'Villa 8',
    unitValue: 5.2,
    advanceAmount: 0.52,
    advancePercent: 10.0,
    paymentMode: 'RTGS',
    salesperson: 'Amit Kumar',
    status: 'confirmed',
  },
];

// Mock data for loan disbursements
const loanDisbursements = [
  {
    id: 'LD001',
    disbursementDate: '2026-07-24',
    lender: 'State Bank of India',
    loanType: 'Construction Finance',
    project: 'Tech Park Phase 2',
    sanctionedAmount: 250.0,
    disbursedToDate: 145.0,
    currentDisbursement: 45.0,
    pendingDisbursement: 105.0,
    tranche: '3 of 5',
    interestRate: 9.25,
    status: 'received',
  },
  {
    id: 'LD002',
    disbursementDate: '2026-07-20',
    lender: 'HDFC Bank',
    loanType: 'Project Finance',
    project: 'Marina Bay Towers',
    sanctionedAmount: 180.0,
    disbursedToDate: 180.0,
    currentDisbursement: 35.0,
    pendingDisbursement: 0,
    tranche: '5 of 5',
    interestRate: 9.50,
    status: 'received',
  },
  {
    id: 'LD003',
    disbursementDate: '2026-07-28',
    lender: 'ICICI Bank',
    loanType: 'Construction Finance',
    project: 'Downtown Plaza',
    sanctionedAmount: 320.0,
    disbursedToDate: 128.0,
    currentDisbursement: 64.0,
    pendingDisbursement: 192.0,
    tranche: '3 of 6',
    interestRate: 9.75,
    status: 'expected',
  },
  {
    id: 'LD004',
    disbursementDate: '2026-08-05',
    lender: 'Axis Bank',
    loanType: 'Working Capital',
    project: 'Corporate',
    sanctionedAmount: 75.0,
    disbursedToDate: 25.0,
    currentDisbursement: 25.0,
    pendingDisbursement: 50.0,
    tranche: '2 of 3',
    interestRate: 10.25,
    status: 'expected',
  },
];

// Mock data for rental income
const rentalIncome = [
  {
    id: 'RI001',
    tenant: 'Infosys Ltd',
    property: 'Cyber Hub Tower',
    unit: 'Floor 12-14',
    area: 45000,
    monthlyRent: 1.85,
    escalation: 5,
    leaseStart: '2024-04-01',
    leaseEnd: '2029-03-31',
    nextPaymentDue: '2026-08-01',
    status: 'active',
    paymentStatus: 'current',
  },
  {
    id: 'RI002',
    tenant: 'TCS',
    property: 'Tech Park Phase 1',
    unit: 'Building A',
    area: 85000,
    monthlyRent: 3.40,
    escalation: 5,
    leaseStart: '2023-07-01',
    leaseEnd: '2028-06-30',
    nextPaymentDue: '2026-08-01',
    status: 'active',
    paymentStatus: 'current',
  },
  {
    id: 'RI003',
    tenant: 'Wipro',
    property: 'Cyber Hub Tower',
    unit: 'Floor 8-10',
    area: 32000,
    monthlyRent: 1.28,
    escalation: 4,
    leaseStart: '2025-01-01',
    leaseEnd: '2030-12-31',
    nextPaymentDue: '2026-08-01',
    status: 'active',
    paymentStatus: 'overdue',
  },
  {
    id: 'RI004',
    tenant: 'Amazon',
    property: 'Downtown Plaza',
    unit: 'Retail Ground Floor',
    area: 12000,
    monthlyRent: 0.96,
    escalation: 6,
    leaseStart: '2025-10-01',
    leaseEnd: '2030-09-30',
    nextPaymentDue: '2026-08-01',
    status: 'active',
    paymentStatus: 'current',
  },
];

// Mock data for inflow trends
const inflowTrendData = [
  { month: 'Feb', collections: 456, advances: 89, loans: 120, rental: 32, other: 45 },
  { month: 'Mar', collections: 512, advances: 124, loans: 85, rental: 33, other: 38 },
  { month: 'Apr', collections: 478, advances: 156, loans: 0, rental: 34, other: 52 },
  { month: 'May', collections: 534, advances: 178, loans: 95, rental: 34, other: 41 },
  { month: 'Jun', collections: 498, advances: 142, loans: 45, rental: 35, other: 48 },
  { month: 'Jul', collections: 523, advances: 156, loans: 90, rental: 35, other: 43 },
];

// Mock data for inflow by type
const inflowByTypeData = [
  { label: 'Customer Collections', value: 523.4, color: '#3b82f6' },
  { label: 'Booking Advances', value: 156.2, color: '#10b981' },
  { label: 'Loan Disbursements', value: 89.6, color: '#f59e0b' },
  { label: 'Rental Income', value: 34.8, color: '#8b5cf6' },
  { label: 'Interest Income', value: 12.4, color: '#ec4899' },
  { label: 'Refunds & Other', value: 31.1, color: '#6b7280' },
];

// AI Insights
const aiInsights = [
  {
    id: 'ai1',
    type: 'opportunity' as const,
    title: 'Collection Acceleration Opportunity',
    description: 'Early payment discounts could accelerate ₹45.6 Cr in pending collections by 15 days on average.',
    impact: '+₹2.3 Cr interest savings',
    impactLevel: 'medium',
    confidence: 89,
    action: 'Review Discount Strategy',
  },
  {
    id: 'ai2',
    type: 'warning' as const,
    title: 'Lodha Developers Payment Risk',
    description: 'Customer shows declining payment pattern. ₹28.75 Cr overdue with increasing trend.',
    impact: 'High collection risk',
    impactLevel: 'high',
    confidence: 92,
    action: 'Escalate to Collections',
  },
  {
    id: 'ai3',
    type: 'insight' as const,
    title: 'Booking Velocity Increase',
    description: 'Green Valley Villas showing 35% higher booking rate this month. Consider increasing advance percentage.',
    impact: '+₹12.4 Cr potential',
    impactLevel: 'medium',
    confidence: 78,
    action: 'Review Pricing',
  },
];

export default function CashInflowIntelligencePage() {
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
  const [selectedTransaction, setSelectedTransaction] = useState<typeof inflowTransactions[0] | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customerCollections[0] | null>(null);

  const transactionColumns: Column<typeof inflowTransactions[0]>[] = [
    {
      id: 'date',
      header: 'Date',
      sortable: true,
      cell: (row) => (
        <span className="text-sm">{new Date(row.date).toLocaleDateString('en-IN')}</span>
      ),
    },
    {
      id: 'type',
      header: 'Type',
      sortable: true,
      cell: (row) => (
        <Badge variant="outline" className="font-normal">
          {row.type}
        </Badge>
      ),
    },
    {
      id: 'customer',
      header: 'Customer/Source',
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
      cell: (row) => (
        <span className="text-sm text-muted-foreground">{row.description}</span>
      ),
    },
    {
      id: 'amount',
      header: 'Amount (₹ Cr)',
      align: 'right' as const,
      sortable: true,
      cell: (row) => (
        <span className="font-semibold text-emerald-400">+₹{row.amount.toFixed(2)} Cr</span>
      ),
    },
    {
      id: 'status',
      header: 'Status',
      sortable: true,
      cell: (row) => (
        <Badge
          variant={
            row.status === 'received' ? 'default' :
            row.status === 'pending' ? 'secondary' : 'danger'
          }
        >
          {row.status === 'received' ? 'Received' :
           row.status === 'pending' ? 'Pending' : 'Overdue'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: (row) => (
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

  const customerColumns: Column<typeof customerCollections[0]>[] = [
    {
      id: 'customerName',
      header: 'Customer',
      sortable: true,
      cell: (row) => (
        <div>
          <div className="font-medium">{row.customerName}</div>
          <div className="text-xs text-muted-foreground">{row.customerType}</div>
        </div>
      ),
    },
    {
      id: 'project',
      header: 'Project',
      sortable: true,
    },
    {
      id: 'totalReceivable',
      header: 'Total Receivable',
      align: 'right' as const,
      sortable: true,
      cell: (row) => <span>₹{row.totalReceivable.toFixed(1)} Cr</span>,
    },
    {
      id: 'collected',
      header: 'Collected',
      align: 'right' as const,
      sortable: true,
      cell: (row) => (
        <span className="text-emerald-400">₹{row.collected.toFixed(1)} Cr</span>
      ),
    },
    {
      id: 'pending',
      header: 'Pending',
      align: 'right' as const,
      sortable: true,
      cell: (row) => (
        <span className="text-amber-400">₹{row.pending.toFixed(1)} Cr</span>
      ),
    },
    {
      id: 'overdue',
      header: 'Overdue',
      align: 'right' as const,
      sortable: true,
      cell: (row) => (
        <span className={row.overdue > 0 ? 'text-red-400' : 'text-muted-foreground'}>
          ₹{row.overdue.toFixed(1)} Cr
        </span>
      ),
    },
    {
      id: 'creditScore',
      header: 'Credit',
      cell: (row) => (
        <Badge
          variant={
            row.creditScore.startsWith('A') ? 'default' :
            row.creditScore.startsWith('B') ? 'secondary' : 'danger'
          }
        >
          {row.creditScore}
        </Badge>
      ),
    },
    {
      id: 'trend',
      header: 'Trend',
      cell: (row) => (
        <div className="flex items-center gap-1">
          {row.trend === 'improving' ? (
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          ) : row.trend === 'declining' ? (
            <TrendingDown className="h-4 w-4 text-red-400" />
          ) : (
            <span className="text-muted-foreground">—</span>
          )}
        </div>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: (row) => (
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

  const bookingColumns: Column<typeof bookingAdvances[0]>[] = [
    {
      id: 'bookingDate',
      header: 'Date',
      sortable: true,
      cell: (row) => new Date(row.bookingDate).toLocaleDateString('en-IN'),
    },
    {
      id: 'customerName',
      header: 'Customer',
      sortable: true,
    },
    {
      id: 'project',
      header: 'Project',
      sortable: true,
    },
    {
      id: 'unit',
      header: 'Unit',
    },
    {
      id: 'unitValue',
      header: 'Unit Value',
      align: 'right' as const,
      cell: (row) => <span>₹{row.unitValue.toFixed(2)} Cr</span>,
    },
    {
      id: 'advanceAmount',
      header: 'Advance',
      align: 'right' as const,
      cell: (row) => (
        <span className="text-emerald-400">₹{row.advanceAmount.toFixed(2)} Cr</span>
      ),
    },
    {
      id: 'advancePercent',
      header: '%',
      align: 'right' as const,
      cell: (row) => <span>{row.advancePercent}%</span>,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge variant={row.status === 'confirmed' ? 'default' : 'secondary'}>
          {row.status === 'confirmed' ? 'Confirmed' : 'Pending'}
        </Badge>
      ),
    },
  ];

  const loanColumns: Column<typeof loanDisbursements[0]>[] = [
    {
      id: 'disbursementDate',
      header: 'Date',
      sortable: true,
      cell: (row) => new Date(row.disbursementDate).toLocaleDateString('en-IN'),
    },
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
      id: 'sanctionedAmount',
      header: 'Sanctioned',
      align: 'right' as const,
      cell: (row) => <span>₹{row.sanctionedAmount.toFixed(0)} Cr</span>,
    },
    {
      id: 'currentDisbursement',
      header: 'Current',
      align: 'right' as const,
      cell: (row) => (
        <span className="text-emerald-400">₹{row.currentDisbursement.toFixed(0)} Cr</span>
      ),
    },
    {
      id: 'tranche',
      header: 'Tranche',
    },
    {
      id: 'interestRate',
      header: 'Rate',
      align: 'right' as const,
      cell: (row) => <span>{row.interestRate}%</span>,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge variant={row.status === 'received' ? 'default' : 'secondary'}>
          {row.status === 'received' ? 'Received' : 'Expected'}
        </Badge>
      ),
    },
  ];

  const rentalColumns: Column<typeof rentalIncome[0]>[] = [
    {
      id: 'tenant',
      header: 'Tenant',
      sortable: true,
    },
    {
      id: 'property',
      header: 'Property',
      sortable: true,
    },
    {
      id: 'unit',
      header: 'Unit',
    },
    {
      id: 'area',
      header: 'Area (sq ft)',
      align: 'right' as const,
      cell: (row) => row.area.toLocaleString('en-IN'),
    },
    {
      id: 'monthlyRent',
      header: 'Monthly Rent',
      align: 'right' as const,
      cell: (row) => (
        <span className="text-emerald-400">₹{row.monthlyRent.toFixed(2)} Cr</span>
      ),
    },
    {
      id: 'escalation',
      header: 'Esc %',
      align: 'right' as const,
      cell: (row) => <span>{row.escalation}%</span>,
    },
    {
      id: 'leaseEnd',
      header: 'Lease End',
      cell: (row) => new Date(row.leaseEnd).toLocaleDateString('en-IN'),
    },
    {
      id: 'paymentStatus',
      header: 'Payment',
      cell: (row) => (
        <Badge variant={row.paymentStatus === 'current' ? 'default' : 'danger'}>
          {row.paymentStatus === 'current' ? 'Current' : 'Overdue'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cash Inflow Intelligence"
        description="Track and predict incoming cash flows across all revenue streams"
        breadcrumbs={[
          { label: 'Cash Flow', href: '/cash-flow' },
          { label: 'Inflow Intelligence' },
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
          title="Total Inflow (MTD)"
          value={`₹${kpiData.totalInflow.value} Cr`}
          change={kpiData.totalInflow.change}
          trend={kpiData.totalInflow.trend}
          icon={ArrowDownLeft}
          iconColor="text-emerald-400"
        />
        <KPICard
          title="Customer Collections"
          value={`₹${kpiData.customerCollections.value} Cr`}
          change={kpiData.customerCollections.change}
          trend={kpiData.customerCollections.trend}
          icon={Users}
          iconColor="text-blue-400"
        />
        <KPICard
          title="Booking Advances"
          value={`₹${kpiData.bookingAdvances.value} Cr`}
          change={kpiData.bookingAdvances.change}
          trend={kpiData.bookingAdvances.trend}
          icon={Building2}
          iconColor="text-violet-400"
        />
        <KPICard
          title="Pending Receipts"
          value={`₹${kpiData.pendingReceipts.value} Cr`}
          change={kpiData.pendingReceipts.change}
          trend={kpiData.pendingReceipts.trend}
          icon={Clock}
          iconColor="text-amber-400"
        />
      </KPIGrid>

      <KPIGrid columns={4}>
        <KPICard
          title="Loan Disbursements"
          value={`₹${kpiData.loanDisbursements.value} Cr`}
          change={kpiData.loanDisbursements.change}
          trend={kpiData.loanDisbursements.trend}
          icon={Landmark}
          iconColor="text-orange-400"
        />
        <KPICard
          title="Rental Income"
          value={`₹${kpiData.rentalIncome.value} Cr`}
          change={kpiData.rentalIncome.change}
          trend={kpiData.rentalIncome.trend}
          icon={Home}
          iconColor="text-cyan-400"
        />
        <KPICard
          title="Collection Efficiency"
          value={`${kpiData.collectionEfficiency.value}%`}
          change={kpiData.collectionEfficiency.change}
          trend={kpiData.collectionEfficiency.trend}
          icon={CheckCircle2}
          iconColor="text-emerald-400"
        />
        <KPICard
          title="Overdue Collections"
          value={`₹${kpiData.overdueCollections.value} Cr`}
          change={kpiData.overdueCollections.change}
          trend={kpiData.overdueCollections.trend}
          icon={AlertTriangle}
          iconColor="text-red-400"
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {cashInflowTabs.map((tab) => (
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
                <CardTitle>Inflow Trends</CardTitle>
                <CardDescription>Monthly cash inflows by category</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={inflowTrendData}
                  xKey="month"
                  series={[
                    { key: 'collections', name: 'Collections', color: '#3b82f6' },
                    { key: 'advances', name: 'Advances', color: '#10b981' },
                    { key: 'loans', name: 'Loans', color: '#f59e0b' },
                    { key: 'rental', name: 'Rental', color: '#8b5cf6' },
                  ]}
                  height={300}
                  stacked
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inflow Composition</CardTitle>
                <CardDescription>Current month breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={inflowByTypeData}
                  // height={280}
                  showLegend
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Inflows</CardTitle>
              <CardDescription>Latest cash receipts and expected inflows</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={inflowTransactions}
                columns={transactionColumns}
                searchable
                // searchKeys={['customer', 'project', 'description']}
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
                insight={insight.description}
                impactValue={insight.impact}
                impact={insight.impactLevel as 'low' | 'medium' | 'high'}
                confidence={insight.confidence}
                // action={insight.action}
              />
            ))}
          </div>
        </TabsContent>

        {/* Customer Collections Tab */}
        <TabsContent value="collections" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Receivables</p>
                    <p className="text-2xl font-bold">₹365.6 Cr</p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Collected (MTD)</p>
                    <p className="text-2xl font-bold text-emerald-400">₹258.4 Cr</p>
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
                    <p className="text-2xl font-bold text-amber-400">₹107.2 Cr</p>
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
                    <p className="text-2xl font-bold text-red-400">₹48.9 Cr</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Collections</CardTitle>
              <CardDescription>Collection status by customer</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={customerCollections}
                columns={customerColumns}
                searchable
                // searchKeys={['customerName', 'project']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Booking Advances Tab */}
        <TabsContent value="advances" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Advances (MTD)</p>
                    <p className="text-2xl font-bold">₹156.2 Cr</p>
                  </div>
                  <Building2 className="h-8 w-8 text-violet-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Bookings</p>
                    <p className="text-2xl font-bold">42</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Advance %</p>
                    <p className="text-2xl font-bold">9.2%</p>
                  </div>
                  <Percent className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Booking Advances</CardTitle>
              <CardDescription>New bookings and advance payments</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={bookingAdvances}
                columns={bookingColumns}
                searchable
                // searchKeys={['customerName', 'project', 'unit']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loan Disbursements Tab */}
        <TabsContent value="disbursements" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sanctioned</p>
                    <p className="text-2xl font-bold">₹825.0 Cr</p>
                  </div>
                  <Landmark className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Disbursed to Date</p>
                    <p className="text-2xl font-bold text-emerald-400">₹478.0 Cr</p>
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
                    <p className="text-2xl font-bold text-amber-400">₹347.0 Cr</p>
                  </div>
                  <Clock className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Interest Rate</p>
                    <p className="text-2xl font-bold">9.69%</p>
                  </div>
                  <Percent className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Loan Disbursements</CardTitle>
              <CardDescription>Received and expected loan disbursements</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={loanDisbursements}
                columns={loanColumns}
                searchable
                // searchKeys={['lender', 'project']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rental Income Tab */}
        <TabsContent value="rental" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Rental</p>
                    <p className="text-2xl font-bold">₹7.49 Cr</p>
                  </div>
                  <Home className="h-8 w-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Occupied Area</p>
                    <p className="text-2xl font-bold">1.74L sq ft</p>
                  </div>
                  <Building2 className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Rent/sq ft</p>
                    <p className="text-2xl font-bold">₹43</p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                    <p className="text-2xl font-bold">92%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rental Portfolio</CardTitle>
              <CardDescription>Active leases and rental income</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={rentalIncome}
                columns={rentalColumns}
                searchable
                // searchKeys={['tenant', 'property']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interest Income Tab */}
        <TabsContent value="interest" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interest Income</CardTitle>
              <CardDescription>Income from investments and deposits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Interest income details will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Refunds Tab */}
        <TabsContent value="refunds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Refunds Received</CardTitle>
              <CardDescription>Vendor refunds and advance returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Refund details will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other Receipts Tab */}
        <TabsContent value="other" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Other Receipts</CardTitle>
              <CardDescription>Miscellaneous income and receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Other receipts details will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Detail Drawer */}
      <Drawer open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Transaction Details</DrawerTitle>
            <DrawerDescription>
              {selectedTransaction?.id} - {selectedTransaction?.type}
            </DrawerDescription>
          </DrawerHeader>
          {selectedTransaction && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer/Source</p>
                    <p className="font-medium">{selectedTransaction.customer}</p>
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
                    <p className="text-2xl font-bold text-emerald-400">
                      ₹{selectedTransaction.amount.toFixed(2)} Cr
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
            </div>
          )}
        </DrawerContent>
      </Drawer>

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
                    <p className="text-xl font-bold">₹{selectedCustomer.totalReceivable.toFixed(1)} Cr</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Collected</p>
                    <p className="text-xl font-bold text-emerald-400">
                      ₹{selectedCustomer.collected.toFixed(1)} Cr
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-xl font-bold text-amber-400">
                      ₹{selectedCustomer.pending.toFixed(1)} Cr
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Overdue</p>
                    <p className="text-xl font-bold text-red-400">
                      ₹{selectedCustomer.overdue.toFixed(1)} Cr
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
                    <p className="text-sm text-muted-foreground">Payment History</p>
                    <p className="font-medium">{selectedCustomer.paymentHistory}% on-time</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Last Collection</p>
                    <p className="font-medium">
                      {new Date(selectedCustomer.lastCollection).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Due</p>
                    <p className="font-medium">{selectedCustomer.nextDue}</p>
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
                Generate Invoice
              </Button>
              <Button variant="outline" size="sm">
                <Users className="mr-2 h-4 w-4" />
                Send Reminders
              </Button>
              <Button variant="outline" size="sm">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Escalate Overdue
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
