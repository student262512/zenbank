'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { TreasuryFilters } from '@/components/shared/treasury-filters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Handshake,
  Building2,
  Users,
  FileText,
  CreditCard,
  TrendingUp,
  Phone,
  Mail,
  Plus,
  Download,
  Eye,
  Edit,
  Star,
  Clock,
  CheckCircle2,
  AlertTriangle,
  IndianRupee,
  Calendar,
  BarChart3,
} from 'lucide-react';
import { bankRelationshipTabs } from '@/config/treasury-navigation';

// Mock Bank Relationship Overview
interface BankRelationship {
  id: string;
  bank: string;
  relationshipSince: string;
  relationshipManager: string;
  tier: 'Primary' | 'Secondary' | 'Tertiary';
  totalBusiness: number;
  accounts: number;
  creditFacilities: number;
  rating: number;
  status: 'active' | 'under-review' | 'on-hold';
}

const bankRelationships: BankRelationship[] = [
  { id: '1', bank: 'HDFC Bank', relationshipSince: '2015', relationshipManager: 'Amit Sharma', tier: 'Primary', totalBusiness: 1250000000, accounts: 8, creditFacilities: 3, rating: 4.8, status: 'active' },
  { id: '2', bank: 'SBI', relationshipSince: '2010', relationshipManager: 'Rajesh Kumar', tier: 'Primary', totalBusiness: 980000000, accounts: 5, creditFacilities: 4, rating: 4.5, status: 'active' },
  { id: '3', bank: 'ICICI Bank', relationshipSince: '2018', relationshipManager: 'Priya Patel', tier: 'Secondary', totalBusiness: 520000000, accounts: 4, creditFacilities: 2, rating: 4.6, status: 'active' },
  { id: '4', bank: 'Axis Bank', relationshipSince: '2019', relationshipManager: 'Vikram Singh', tier: 'Secondary', totalBusiness: 380000000, accounts: 3, creditFacilities: 1, rating: 4.2, status: 'under-review' },
  { id: '5', bank: 'Kotak Bank', relationshipSince: '2020', relationshipManager: 'Sneha Gupta', tier: 'Tertiary', totalBusiness: 250000000, accounts: 2, creditFacilities: 1, rating: 4.4, status: 'active' },
  { id: '6', bank: 'Standard Chartered', relationshipSince: '2017', relationshipManager: 'John Williams', tier: 'Secondary', totalBusiness: 320000000, accounts: 2, creditFacilities: 1, rating: 4.3, status: 'active' },
];

// Mock Bank Contacts
interface BankContact {
  id: string;
  bank: string;
  name: string;
  designation: string;
  department: string;
  phone: string;
  email: string;
  type: 'RM' | 'Operations' | 'Credit' | 'Treasury' | 'IT';
  isPrimary: boolean;
}

const bankContacts: BankContact[] = [
  { id: '1', bank: 'HDFC Bank', name: 'Amit Sharma', designation: 'Senior Relationship Manager', department: 'Corporate Banking', phone: '+91 98765 43210', email: 'amit.sharma@hdfcbank.com', type: 'RM', isPrimary: true },
  { id: '2', bank: 'HDFC Bank', name: 'Neha Verma', designation: 'Operations Manager', department: 'Trade Operations', phone: '+91 98765 43211', email: 'neha.verma@hdfcbank.com', type: 'Operations', isPrimary: false },
  { id: '3', bank: 'HDFC Bank', name: 'Rahul Mehta', designation: 'Credit Analyst', department: 'Credit Risk', phone: '+91 98765 43212', email: 'rahul.mehta@hdfcbank.com', type: 'Credit', isPrimary: false },
  { id: '4', bank: 'SBI', name: 'Rajesh Kumar', designation: 'Chief Manager', department: 'Large Corporate', phone: '+91 98765 43213', email: 'rajesh.kumar@sbi.co.in', type: 'RM', isPrimary: true },
  { id: '5', bank: 'SBI', name: 'Sunita Devi', designation: 'Deputy Manager', department: 'Treasury', phone: '+91 98765 43214', email: 'sunita.devi@sbi.co.in', type: 'Treasury', isPrimary: false },
  { id: '6', bank: 'ICICI Bank', name: 'Priya Patel', designation: 'Relationship Director', department: 'Corporate Solutions', phone: '+91 98765 43215', email: 'priya.patel@icicibank.com', type: 'RM', isPrimary: true },
];

// Mock Service Agreements
interface ServiceAgreement {
  id: string;
  bank: string;
  agreementType: string;
  description: string;
  startDate: string;
  endDate: string;
  value: number;
  status: 'active' | 'expiring' | 'expired' | 'renewal';
}

const serviceAgreements: ServiceAgreement[] = [
  { id: '1', bank: 'HDFC Bank', agreementType: 'Corporate Banking', description: 'Master Corporate Banking Agreement', startDate: '2023-01-01', endDate: '2025-12-31', value: 0, status: 'active' },
  { id: '2', bank: 'HDFC Bank', agreementType: 'Cash Management', description: 'Cash Management Services', startDate: '2023-04-01', endDate: '2024-03-31', value: 2500000, status: 'renewal' },
  { id: '3', bank: 'SBI', agreementType: 'Term Loan', description: 'Infrastructure Term Loan Agreement', startDate: '2022-06-15', endDate: '2027-06-14', value: 5000000000, status: 'active' },
  { id: '4', bank: 'SBI', agreementType: 'Working Capital', description: 'Cash Credit Facility', startDate: '2024-01-01', endDate: '2024-12-31', value: 2000000000, status: 'active' },
  { id: '5', bank: 'ICICI Bank', agreementType: 'Trade Finance', description: 'LC/BG Facility Agreement', startDate: '2023-07-01', endDate: '2024-06-30', value: 1000000000, status: 'expiring' },
  { id: '6', bank: 'Axis Bank', agreementType: 'Escrow Services', description: 'Project Escrow Agreement', startDate: '2023-06-01', endDate: '2025-05-31', value: 0, status: 'active' },
];

// Mock Fees & Charges
interface BankFee {
  id: string;
  bank: string;
  feeType: string;
  description: string;
  frequency: string;
  amount: number;
  lastCharged: string;
  ytdAmount: number;
}

const bankFees: BankFee[] = [
  { id: '1', bank: 'HDFC Bank', feeType: 'Account Maintenance', description: 'Current account charges', frequency: 'Quarterly', amount: 25000, lastCharged: '2024-07-01', ytdAmount: 75000 },
  { id: '2', bank: 'HDFC Bank', feeType: 'Transaction Charges', description: 'NEFT/RTGS charges', frequency: 'Monthly', amount: 45000, lastCharged: '2024-07-10', ytdAmount: 315000 },
  { id: '3', bank: 'HDFC Bank', feeType: 'API Fees', description: 'Corporate API usage', frequency: 'Monthly', amount: 15000, lastCharged: '2024-07-01', ytdAmount: 105000 },
  { id: '4', bank: 'SBI', feeType: 'Processing Fee', description: 'Loan processing', frequency: 'One-time', amount: 5000000, lastCharged: '2022-06-15', ytdAmount: 0 },
  { id: '5', bank: 'SBI', feeType: 'Commitment Fee', description: 'Undrawn facility fee', frequency: 'Quarterly', amount: 250000, lastCharged: '2024-07-01', ytdAmount: 750000 },
  { id: '6', bank: 'ICICI Bank', feeType: 'LC Commission', description: 'Letter of Credit charges', frequency: 'Per Transaction', amount: 125000, lastCharged: '2024-07-12', ytdAmount: 875000 },
];

// Mock Credit Facilities
interface CreditFacility {
  id: string;
  bank: string;
  facilityType: string;
  sanctionedAmount: number;
  utilizedAmount: number;
  availableAmount: number;
  interestRate: string;
  maturityDate: string;
  status: 'active' | 'expired' | 'under-renewal';
}

const creditFacilities: CreditFacility[] = [
  { id: '1', bank: 'HDFC Bank', facilityType: 'Working Capital', sanctionedAmount: 2000000000, utilizedAmount: 850000000, availableAmount: 1150000000, interestRate: 'MCLR + 0.50%', maturityDate: '2025-03-31', status: 'active' },
  { id: '2', bank: 'HDFC Bank', facilityType: 'Overdraft', sanctionedAmount: 500000000, utilizedAmount: 120000000, availableAmount: 380000000, interestRate: 'MCLR + 0.75%', maturityDate: '2024-12-31', status: 'active' },
  { id: '3', bank: 'SBI', facilityType: 'Term Loan', sanctionedAmount: 5000000000, utilizedAmount: 4200000000, availableAmount: 800000000, interestRate: 'Repo + 1.25%', maturityDate: '2027-06-14', status: 'active' },
  { id: '4', bank: 'SBI', facilityType: 'Cash Credit', sanctionedAmount: 2000000000, utilizedAmount: 1450000000, availableAmount: 550000000, interestRate: 'MCLR + 0.40%', maturityDate: '2024-12-31', status: 'active' },
  { id: '5', bank: 'ICICI Bank', facilityType: 'LC/BG Limit', sanctionedAmount: 1000000000, utilizedAmount: 680000000, availableAmount: 320000000, interestRate: '1.50% p.a.', maturityDate: '2024-06-30', status: 'under-renewal' },
  { id: '6', bank: 'Axis Bank', facilityType: 'Term Loan', sanctionedAmount: 800000000, utilizedAmount: 720000000, availableAmount: 80000000, interestRate: 'Repo + 1.50%', maturityDate: '2026-05-31', status: 'active' },
];

// Mock Bank Performance
interface BankPerformance {
  id: string;
  bank: string;
  metric: string;
  target: string;
  actual: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
}

const bankPerformance: BankPerformance[] = [
  { id: '1', bank: 'HDFC Bank', metric: 'Service Response Time', target: '< 4 hours', actual: '2.5 hours', score: 95, trend: 'up' },
  { id: '2', bank: 'HDFC Bank', metric: 'Transaction Success Rate', target: '> 99%', actual: '99.8%', score: 99, trend: 'stable' },
  { id: '3', bank: 'HDFC Bank', metric: 'Issue Resolution', target: '< 24 hours', actual: '18 hours', score: 88, trend: 'up' },
  { id: '4', bank: 'SBI', metric: 'Service Response Time', target: '< 4 hours', actual: '3.2 hours', score: 85, trend: 'down' },
  { id: '5', bank: 'SBI', metric: 'Transaction Success Rate', target: '> 99%', actual: '98.5%', score: 92, trend: 'stable' },
  { id: '6', bank: 'ICICI Bank', metric: 'Service Response Time', target: '< 4 hours', actual: '2.8 hours', score: 92, trend: 'up' },
];

// Table Columns
const relationshipColumns: Column<BankRelationship>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'relationshipSince', header: 'Since', accessor: 'relationshipSince' },
  { id: 'relationshipManager', header: 'RM', accessor: 'relationshipManager' },
  {
    id: 'tier',
    header: 'Tier',
    accessor: 'tier',
    cell: (row) => (
      <Badge variant={row.tier === 'Primary' ? 'success' : row.tier === 'Secondary' ? 'default' : 'secondary'}>
        {row.tier}
      </Badge>
    ),
  },
  {
    id: 'totalBusiness',
    header: 'Total Business',
    accessor: (row) => `₹${(row.totalBusiness / 10000000).toFixed(0)} Cr`,
    align: 'right',
  },
  { id: 'accounts', header: 'Accounts', accessor: 'accounts', align: 'center' },
  {
    id: 'rating',
    header: 'Rating',
    accessor: (row) => `${row.rating}/5`,
    cell: (row) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        <span>{row.rating}</span>
      </div>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : row.status === 'under-review' ? 'warning' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
];

const contactColumns: Column<BankContact>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'name', header: 'Name', accessor: 'name' },
  { id: 'designation', header: 'Designation', accessor: 'designation' },
  {
    id: 'type',
    header: 'Type',
    accessor: 'type',
    cell: (row) => (
      <Badge variant={row.type === 'RM' ? 'success' : 'secondary'}>
        {row.type}
      </Badge>
    ),
  },
  {
    id: 'phone',
    header: 'Phone',
    accessor: 'phone',
    cell: (row) => (
      <div className="flex items-center gap-1">
        <Phone className="h-3 w-3 text-slate-400" />
        <span>{row.phone}</span>
      </div>
    ),
  },
  {
    id: 'isPrimary',
    header: 'Primary',
    accessor: 'isPrimary',
    cell: (row) => row.isPrimary ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : null,
    align: 'center',
  },
];

const agreementColumns: Column<ServiceAgreement>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'agreementType', header: 'Type', accessor: 'agreementType' },
  { id: 'description', header: 'Description', accessor: 'description' },
  { id: 'startDate', header: 'Start', accessor: 'startDate' },
  { id: 'endDate', header: 'End', accessor: 'endDate' },
  {
    id: 'value',
    header: 'Value',
    accessor: (row) => row.value > 0 ? `₹${(row.value / 10000000).toFixed(0)} Cr` : '-',
    align: 'right',
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : row.status === 'expiring' ? 'warning' : row.status === 'renewal' ? 'default' : 'danger'}>
        {row.status}
      </Badge>
    ),
  },
];

const feeColumns: Column<BankFee>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'feeType', header: 'Fee Type', accessor: 'feeType' },
  { id: 'description', header: 'Description', accessor: 'description' },
  { id: 'frequency', header: 'Frequency', accessor: 'frequency' },
  {
    id: 'amount',
    header: 'Amount',
    accessor: (row) => `₹${(row.amount / 100000).toFixed(2)} L`,
    align: 'right',
  },
  {
    id: 'ytdAmount',
    header: 'YTD',
    accessor: (row) => `₹${(row.ytdAmount / 100000).toFixed(2)} L`,
    align: 'right',
  },
  { id: 'lastCharged', header: 'Last Charged', accessor: 'lastCharged' },
];

const facilityColumns: Column<CreditFacility>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'facilityType', header: 'Facility', accessor: 'facilityType' },
  {
    id: 'sanctionedAmount',
    header: 'Sanctioned',
    accessor: (row) => `₹${(row.sanctionedAmount / 10000000).toFixed(0)} Cr`,
    align: 'right',
  },
  {
    id: 'utilizedAmount',
    header: 'Utilized',
    accessor: (row) => `₹${(row.utilizedAmount / 10000000).toFixed(0)} Cr`,
    align: 'right',
  },
  {
    id: 'availableAmount',
    header: 'Available',
    accessor: (row) => `₹${(row.availableAmount / 10000000).toFixed(0)} Cr`,
    cell: (row) => <span className="text-emerald-400">₹{(row.availableAmount / 10000000).toFixed(0)} Cr</span>,
    align: 'right',
  },
  { id: 'interestRate', header: 'Rate', accessor: 'interestRate' },
  { id: 'maturityDate', header: 'Maturity', accessor: 'maturityDate' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : row.status === 'under-renewal' ? 'warning' : 'danger'}>
        {row.status}
      </Badge>
    ),
  },
];

const performanceColumns: Column<BankPerformance>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'metric', header: 'Metric', accessor: 'metric' },
  { id: 'target', header: 'Target', accessor: 'target' },
  { id: 'actual', header: 'Actual', accessor: 'actual' },
  {
    id: 'score',
    header: 'Score',
    accessor: (row) => `${row.score}%`,
    cell: (row) => (
      <span className={row.score >= 95 ? 'text-emerald-400' : row.score >= 85 ? 'text-yellow-400' : 'text-red-400'}>
        {row.score}%
      </span>
    ),
    align: 'right',
  },
  {
    id: 'trend',
    header: 'Trend',
    accessor: 'trend',
    cell: (row) => (
      <Badge variant={row.trend === 'up' ? 'success' : row.trend === 'down' ? 'danger' : 'secondary'}>
        {row.trend}
      </Badge>
    ),
  },
];

export default function BankRelationshipPage() {
  const [activeTab, setActiveTab] = React.useState('overview');

  const totalCreditLimit = creditFacilities.reduce((sum, f) => sum + f.sanctionedAmount, 0);
  const totalUtilized = creditFacilities.reduce((sum, f) => sum + f.utilizedAmount, 0);
  const totalAvailable = creditFacilities.reduce((sum, f) => sum + f.availableAmount, 0);

  return (
    <PageContainer>
      <PageHeader
        title="Bank Relationship Management"
        description="Manage bank relationships, contacts, and service agreements"
        breadcrumbs={[
          { label: 'Treasury Management', href: '/treasury' },
          { label: 'Bank Relationship' },
        ]}
        actions={
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Bank
          </Button>
        }
        showRefresh
        showExport
      />

      <div className="mb-6">
        <TreasuryFilters
          showBank
          compact
        />
      </div>

      <Section className="mb-6">
        <KPIGrid columns={4}>
          <KPICard
            title="Banking Partners"
            value={bankRelationships.length.toString()}
            subtitle="Active relationships"
            icon={Handshake}
            iconColor="bg-blue-500/10 text-blue-400"
          />
          <KPICard
            title="Total Credit Lines"
            value={`₹${(totalCreditLimit / 10000000).toFixed(0)} Cr`}
            subtitle="Sanctioned"
            icon={CreditCard}
            iconColor="bg-emerald-500/10 text-emerald-400"
          />
          <KPICard
            title="Available Credit"
            value={`₹${(totalAvailable / 10000000).toFixed(0)} Cr`}
            subtitle={`${((totalAvailable / totalCreditLimit) * 100).toFixed(0)}% unutilized`}
            icon={IndianRupee}
            iconColor="bg-cyan-500/10 text-cyan-400"
          />
          <KPICard
            title="Expiring Soon"
            value={serviceAgreements.filter(a => a.status === 'expiring' || a.status === 'renewal').length.toString()}
            subtitle="Agreements"
            icon={AlertTriangle}
            iconColor="bg-yellow-500/10 text-yellow-400"
          />
        </KPIGrid>
      </Section>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {bankRelationshipTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Section
            title="Bank Relationships"
            description="Overview of all banking partnerships"
          >
            <DataTable
              data={bankRelationships}
              columns={relationshipColumns}
              hoverable
              searchable
              searchPlaceholder="Search banks..."
              actions={[
                { label: 'View Details', icon: <Eye className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Review', icon: <Edit className="h-4 w-4 mr-2" />, onClick: () => {} },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="contacts" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="Total Contacts"
                value={bankContacts.length.toString()}
                subtitle="Across all banks"
                icon={Users}
                iconColor="bg-blue-500/10 text-blue-400"
              />
              <KPICard
                title="Primary RMs"
                value={bankContacts.filter(c => c.isPrimary).length.toString()}
                subtitle="Relationship managers"
                icon={Star}
                iconColor="bg-yellow-500/10 text-yellow-400"
              />
              <KPICard
                title="Operations"
                value={bankContacts.filter(c => c.type === 'Operations').length.toString()}
                subtitle="Operations contacts"
                icon={Building2}
                iconColor="bg-cyan-500/10 text-cyan-400"
              />
              <KPICard
                title="Treasury"
                value={bankContacts.filter(c => c.type === 'Treasury').length.toString()}
                subtitle="Treasury contacts"
                icon={CreditCard}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Bank Contacts"
            description="Key contacts at banking partners"
            actions={
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            }
          >
            <DataTable
              data={bankContacts}
              columns={contactColumns}
              hoverable
              searchable
              searchPlaceholder="Search contacts..."
              actions={[
                { label: 'Call', icon: <Phone className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Email', icon: <Mail className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Edit', icon: <Edit className="h-4 w-4 mr-2" />, onClick: () => {} },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="agreements" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="Active Agreements"
                value={serviceAgreements.filter(a => a.status === 'active').length.toString()}
                subtitle="In effect"
                icon={FileText}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
              <KPICard
                title="Expiring"
                value={serviceAgreements.filter(a => a.status === 'expiring').length.toString()}
                subtitle="Within 30 days"
                icon={Clock}
                iconColor="bg-yellow-500/10 text-yellow-400"
              />
              <KPICard
                title="Under Renewal"
                value={serviceAgreements.filter(a => a.status === 'renewal').length.toString()}
                subtitle="Processing"
                icon={Calendar}
                iconColor="bg-blue-500/10 text-blue-400"
              />
              <KPICard
                title="Expired"
                value={serviceAgreements.filter(a => a.status === 'expired').length.toString()}
                subtitle="Needs attention"
                icon={AlertTriangle}
                iconColor="bg-red-500/10 text-red-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Service Agreements"
            description="Banking service agreements and contracts"
            actions={
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Agreement
              </Button>
            }
          >
            <DataTable
              data={serviceAgreements}
              columns={agreementColumns}
              hoverable
              searchable
              searchPlaceholder="Search agreements..."
              actions={[
                { label: 'View', icon: <Eye className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Renew', icon: <Calendar className="h-4 w-4 mr-2" />, onClick: () => {} },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="fees" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="YTD Bank Fees"
                value={`₹${(bankFees.reduce((sum, f) => sum + f.ytdAmount, 0) / 100000).toFixed(1)} L`}
                subtitle="Total charges"
                change={-8.5}
                trend="down"
                trendColor="green"
                icon={IndianRupee}
                iconColor="bg-blue-500/10 text-blue-400"
              />
              <KPICard
                title="Transaction Fees"
                value={`₹${(bankFees.filter(f => f.feeType === 'Transaction Charges').reduce((sum, f) => sum + f.ytdAmount, 0) / 100000).toFixed(1)} L`}
                subtitle="YTD"
                icon={CreditCard}
                iconColor="bg-cyan-500/10 text-cyan-400"
              />
              <KPICard
                title="Commitment Fees"
                value={`₹${(bankFees.filter(f => f.feeType === 'Commitment Fee').reduce((sum, f) => sum + f.ytdAmount, 0) / 100000).toFixed(1)} L`}
                subtitle="YTD"
                icon={Clock}
                iconColor="bg-yellow-500/10 text-yellow-400"
              />
              <KPICard
                title="LC/BG Charges"
                value={`₹${(bankFees.filter(f => f.feeType === 'LC Commission').reduce((sum, f) => sum + f.ytdAmount, 0) / 100000).toFixed(1)} L`}
                subtitle="YTD"
                icon={FileText}
                iconColor="bg-purple-500/10 text-purple-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Fees & Charges"
            description="Bank fees and charges breakdown"
            actions={
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            }
          >
            <DataTable
              data={bankFees}
              columns={feeColumns}
              hoverable
              searchable
              searchPlaceholder="Search fees..."
            />
          </Section>
        </TabsContent>

        <TabsContent value="facilities" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="Total Sanctioned"
                value={`₹${(totalCreditLimit / 10000000).toFixed(0)} Cr`}
                subtitle="Credit limit"
                icon={CreditCard}
                iconColor="bg-blue-500/10 text-blue-400"
              />
              <KPICard
                title="Total Utilized"
                value={`₹${(totalUtilized / 10000000).toFixed(0)} Cr`}
                subtitle={`${((totalUtilized / totalCreditLimit) * 100).toFixed(0)}% utilization`}
                icon={TrendingUp}
                iconColor="bg-cyan-500/10 text-cyan-400"
              />
              <KPICard
                title="Available"
                value={`₹${(totalAvailable / 10000000).toFixed(0)} Cr`}
                subtitle="Undrawn"
                icon={IndianRupee}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
              <KPICard
                title="Under Renewal"
                value={creditFacilities.filter(f => f.status === 'under-renewal').length.toString()}
                subtitle="Facilities"
                icon={AlertTriangle}
                iconColor="bg-yellow-500/10 text-yellow-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Credit Facilities"
            description="Sanctioned credit lines and facilities"
          >
            <DataTable
              data={creditFacilities}
              columns={facilityColumns}
              hoverable
              searchable
              searchPlaceholder="Search facilities..."
              actions={[
                { label: 'View Terms', icon: <Eye className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Draw Down', icon: <CreditCard className="h-4 w-4 mr-2" />, onClick: () => {} },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="Avg Service Score"
                value="91%"
                subtitle="Across all banks"
                change={3.2}
                trend="up"
                icon={BarChart3}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
              <KPICard
                title="Best Performer"
                value="HDFC Bank"
                subtitle="95% avg score"
                icon={Star}
                iconColor="bg-yellow-500/10 text-yellow-400"
              />
              <KPICard
                title="Needs Improvement"
                value="1"
                subtitle="Bank"
                icon={AlertTriangle}
                iconColor="bg-red-500/10 text-red-400"
              />
              <KPICard
                title="Reviews Pending"
                value="2"
                subtitle="This quarter"
                icon={Clock}
                iconColor="bg-blue-500/10 text-blue-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Bank Performance"
            description="Service level metrics and scores"
          >
            <DataTable
              data={bankPerformance}
              columns={performanceColumns}
              hoverable
              searchable
              searchPlaceholder="Search metrics..."
            />
          </Section>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
