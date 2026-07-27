'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { TreasuryFilters } from '@/components/shared/treasury-filters';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Building2,
  Wallet,
  CreditCard,
  FileText,
  Users,
  Shield,
  Plus,
  Download,
  Upload,
  RefreshCcw,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { bankManagementTabs } from '@/config/treasury-navigation';

// Mock Bank Account Data
interface BankAccount {
  id: string;
  bank: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  currency: string;
  entity: string;
  branch: string;
  ifscCode: string;
  balance: number;
  availableBalance: number;
  lastUpdated: string;
  status: 'active' | 'dormant' | 'restricted' | 'closed';
}

const bankAccounts: BankAccount[] = [
  { id: '1', bank: 'HDFC Bank', bankCode: 'HDFC', accountNumber: '50200012345678', accountName: 'ZenBank Corp - Operating', accountType: 'Current', currency: 'INR', entity: 'ZenBank Corp', branch: 'Mumbai - BKC', ifscCode: 'HDFC0000123', balance: 325000000, availableBalance: 320000000, lastUpdated: '2024-07-15 09:30', status: 'active' },
  { id: '2', bank: 'SBI', bankCode: 'SBIN', accountNumber: '38765432109876', accountName: 'ZenBank Corp - Collections', accountType: 'Current', currency: 'INR', entity: 'ZenBank Corp', branch: 'Delhi - Connaught Place', ifscCode: 'SBIN0000456', balance: 280000000, availableBalance: 275000000, lastUpdated: '2024-07-15 09:25', status: 'active' },
  { id: '3', bank: 'ICICI Bank', bankCode: 'ICIC', accountNumber: '012345678901', accountName: 'Metro SPV - Project', accountType: 'Current', currency: 'INR', entity: 'Metro Projects Ltd', branch: 'Mumbai - Lower Parel', ifscCode: 'ICIC0000789', balance: 185000000, availableBalance: 185000000, lastUpdated: '2024-07-15 09:20', status: 'active' },
  { id: '4', bank: 'Axis Bank', bankCode: 'UTIB', accountNumber: '918020012345678', accountName: 'Highway SPV - Escrow', accountType: 'Escrow', currency: 'INR', entity: 'Highway Corp', branch: 'Ahmedabad - CG Road', ifscCode: 'UTIB0000234', balance: 145000000, availableBalance: 0, lastUpdated: '2024-07-15 09:15', status: 'restricted' },
  { id: '5', bank: 'Kotak Bank', bankCode: 'KKBK', accountNumber: '4011234567890', accountName: 'ZenBank Infra - Operating', accountType: 'Current', currency: 'INR', entity: 'ZenBank Infra SPV', branch: 'Bangalore - MG Road', ifscCode: 'KKBK0000567', balance: 95000000, availableBalance: 92000000, lastUpdated: '2024-07-15 09:10', status: 'active' },
  { id: '6', bank: 'HDFC Bank', bankCode: 'HDFC', accountNumber: '50200098765432', accountName: 'ZenBank Corp - Payroll', accountType: 'Savings', currency: 'INR', entity: 'ZenBank Corp', branch: 'Mumbai - Andheri', ifscCode: 'HDFC0000890', balance: 45000000, availableBalance: 45000000, lastUpdated: '2024-07-15 09:05', status: 'active' },
  { id: '7', bank: 'Standard Chartered', bankCode: 'SCBL', accountNumber: '0123456789012345', accountName: 'ZenBank Corp - USD', accountType: 'FCNR', currency: 'USD', entity: 'ZenBank Corp', branch: 'Mumbai - Fort', ifscCode: 'SCBL0000111', balance: 8500000, availableBalance: 8500000, lastUpdated: '2024-07-15 09:00', status: 'active' },
  { id: '8', bank: 'Citi Bank', bankCode: 'CITI', accountNumber: '9876543210123456', accountName: 'ZenBank Corp - EUR', accountType: 'Current', currency: 'EUR', entity: 'ZenBank Corp', branch: 'Mumbai - Nariman Point', ifscCode: 'CITI0000222', balance: 2200000, availableBalance: 2200000, lastUpdated: '2024-07-14 18:30', status: 'active' },
  { id: '9', bank: 'Yes Bank', bankCode: 'YESB', accountNumber: '012345678901234', accountName: 'Solar SPV - Project', accountType: 'Current', currency: 'INR', entity: 'Solar Energy SPV', branch: 'Pune - FC Road', ifscCode: 'YESB0000333', balance: 78000000, availableBalance: 75000000, lastUpdated: '2024-07-14 17:45', status: 'active' },
  { id: '10', bank: 'IndusInd Bank', bankCode: 'INDB', accountNumber: '201234567890', accountName: 'ZenBank Corp - Treasury', accountType: 'Current', currency: 'INR', entity: 'ZenBank Corp', branch: 'Mumbai - Worli', ifscCode: 'INDB0000444', balance: 125000000, availableBalance: 120000000, lastUpdated: '2024-07-14 17:30', status: 'active' },
  { id: '11', bank: 'IDFC First Bank', bankCode: 'IDFB', accountNumber: '10012345678901', accountName: 'Highway Corp - Dormant', accountType: 'Current', currency: 'INR', entity: 'Highway Corp', branch: 'Chennai - Anna Salai', ifscCode: 'IDFB0000555', balance: 500000, availableBalance: 500000, lastUpdated: '2024-03-15 10:00', status: 'dormant' },
  { id: '12', bank: 'RBL Bank', bankCode: 'RATN', accountNumber: '309876543210', accountName: 'Metro SPV - Closed', accountType: 'Current', currency: 'INR', entity: 'Metro Projects Ltd', branch: 'Delhi - Nehru Place', ifscCode: 'RATN0000666', balance: 0, availableBalance: 0, lastUpdated: '2024-01-31 16:00', status: 'closed' },
];

// Mock Balance History
interface BalanceRecord {
  id: string;
  bank: string;
  accountNumber: string;
  date: string;
  openingBalance: number;
  closingBalance: number;
  currency: string;
  status: 'confirmed' | 'provisional';
}

const balanceHistory: BalanceRecord[] = [
  { id: '1', bank: 'HDFC Bank', accountNumber: 'XXXX5678', date: '2024-07-15', openingBalance: 320000000, closingBalance: 325000000, currency: 'INR', status: 'provisional' },
  { id: '2', bank: 'SBI', accountNumber: 'XXXX9876', date: '2024-07-15', openingBalance: 275000000, closingBalance: 280000000, currency: 'INR', status: 'provisional' },
  { id: '3', bank: 'ICICI Bank', accountNumber: 'XXXX8901', date: '2024-07-15', openingBalance: 180000000, closingBalance: 185000000, currency: 'INR', status: 'confirmed' },
  { id: '4', bank: 'HDFC Bank', accountNumber: 'XXXX5678', date: '2024-07-14', openingBalance: 315000000, closingBalance: 320000000, currency: 'INR', status: 'confirmed' },
  { id: '5', bank: 'SBI', accountNumber: 'XXXX9876', date: '2024-07-14', openingBalance: 268000000, closingBalance: 275000000, currency: 'INR', status: 'confirmed' },
];

// Mock Bank Statements
interface BankStatement {
  id: string;
  bank: string;
  accountNumber: string;
  statementDate: string;
  period: string;
  openingBalance: number;
  closingBalance: number;
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
  status: 'downloaded' | 'pending' | 'failed';
}

const bankStatements: BankStatement[] = [
  { id: '1', bank: 'HDFC Bank', accountNumber: 'XXXX5678', statementDate: '2024-07-15', period: 'Jul 2024', openingBalance: 290000000, closingBalance: 325000000, totalCredits: 85000000, totalDebits: 50000000, transactionCount: 156, status: 'downloaded' },
  { id: '2', bank: 'SBI', accountNumber: 'XXXX9876', statementDate: '2024-07-15', period: 'Jul 2024', openingBalance: 245000000, closingBalance: 280000000, totalCredits: 72000000, totalDebits: 37000000, transactionCount: 89, status: 'downloaded' },
  { id: '3', bank: 'ICICI Bank', accountNumber: 'XXXX8901', statementDate: '2024-07-14', period: 'Jul 2024', openingBalance: 160000000, closingBalance: 185000000, totalCredits: 45000000, totalDebits: 20000000, transactionCount: 45, status: 'pending' },
  { id: '4', bank: 'Axis Bank', accountNumber: 'XXXX3456', statementDate: '2024-07-14', period: 'Jul 2024', openingBalance: 140000000, closingBalance: 145000000, totalCredits: 10000000, totalDebits: 5000000, transactionCount: 12, status: 'failed' },
];

// Mock Transactions
interface Transaction {
  id: string;
  date: string;
  valueDate: string;
  bank: string;
  accountNumber: string;
  description: string;
  reference: string;
  type: 'credit' | 'debit';
  amount: number;
  balance: number;
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  { id: '1', date: '2024-07-15', valueDate: '2024-07-15', bank: 'HDFC Bank', accountNumber: 'XXXX5678', description: 'NEFT/Tata Projects/Customer Collection', reference: 'HDFC123456789', type: 'credit', amount: 65000000, balance: 325000000, category: 'Collection', status: 'completed' },
  { id: '2', date: '2024-07-15', valueDate: '2024-07-15', bank: 'SBI', accountNumber: 'XXXX9876', description: 'RTGS/L&T Construction/Vendor Payment', reference: 'SBI987654321', type: 'debit', amount: 45000000, balance: 280000000, category: 'Vendor Payment', status: 'completed' },
  { id: '3', date: '2024-07-14', valueDate: '2024-07-14', bank: 'ICICI Bank', accountNumber: 'XXXX8901', description: 'NEFT/IC Transfer/Metro SPV', reference: 'ICIC246813579', type: 'credit', amount: 25000000, balance: 185000000, category: 'Intercompany', status: 'completed' },
  { id: '4', date: '2024-07-14', valueDate: '2024-07-14', bank: 'HDFC Bank', accountNumber: 'XXXX5678', description: 'FD Maturity/Principal + Interest', reference: 'HDFC369258147', type: 'credit', amount: 105000000, balance: 320000000, category: 'Investment', status: 'completed' },
  { id: '5', date: '2024-07-13', valueDate: '2024-07-13', bank: 'HDFC Bank', accountNumber: 'XXXX5678', description: 'Salary Payment/July 2024', reference: 'HDFC147258369', type: 'debit', amount: 85000000, balance: 215000000, category: 'Payroll', status: 'completed' },
  { id: '6', date: '2024-07-13', valueDate: '2024-07-13', bank: 'SBI', accountNumber: 'XXXX9876', description: 'GST Payment/Q1 FY25', reference: 'SBI258147369', type: 'debit', amount: 32000000, balance: 268000000, category: 'Tax', status: 'completed' },
  { id: '7', date: '2024-07-12', valueDate: '2024-07-12', bank: 'Axis Bank', accountNumber: 'XXXX3456', description: 'NEFT/DLF/Customer Advance', reference: 'UTIB369147258', type: 'credit', amount: 42000000, balance: 145000000, category: 'Collection', status: 'completed' },
  { id: '8', date: '2024-07-15', valueDate: '2024-07-16', bank: 'Kotak Bank', accountNumber: 'XXXX7890', description: 'RTGS/Vendor Payment/Pending', reference: 'KKBK456789123', type: 'debit', amount: 18000000, balance: 95000000, category: 'Vendor Payment', status: 'pending' },
];

// Mock Signatories
interface Signatory {
  id: string;
  bank: string;
  accountNumber: string;
  name: string;
  designation: string;
  signatoryType: 'A' | 'B' | 'C';
  limit: number;
  status: 'active' | 'inactive' | 'pending';
  addedDate: string;
}

const signatories: Signatory[] = [
  { id: '1', bank: 'HDFC Bank', accountNumber: 'XXXX5678', name: 'Rajesh Kumar', designation: 'CFO', signatoryType: 'A', limit: 500000000, status: 'active', addedDate: '2023-01-15' },
  { id: '2', bank: 'HDFC Bank', accountNumber: 'XXXX5678', name: 'Priya Singh', designation: 'Treasury Head', signatoryType: 'A', limit: 250000000, status: 'active', addedDate: '2023-01-15' },
  { id: '3', bank: 'HDFC Bank', accountNumber: 'XXXX5678', name: 'Amit Patel', designation: 'Finance Manager', signatoryType: 'B', limit: 100000000, status: 'active', addedDate: '2023-03-20' },
  { id: '4', bank: 'SBI', accountNumber: 'XXXX9876', name: 'Rajesh Kumar', designation: 'CFO', signatoryType: 'A', limit: 500000000, status: 'active', addedDate: '2023-02-10' },
  { id: '5', bank: 'SBI', accountNumber: 'XXXX9876', name: 'Sunita Sharma', designation: 'Director', signatoryType: 'A', limit: 500000000, status: 'active', addedDate: '2023-02-10' },
  { id: '6', bank: 'ICICI Bank', accountNumber: 'XXXX8901', name: 'Vikram Mehta', designation: 'SPV Director', signatoryType: 'A', limit: 200000000, status: 'active', addedDate: '2023-04-05' },
  { id: '7', bank: 'ICICI Bank', accountNumber: 'XXXX8901', name: 'Rahul Verma', designation: 'Project Head', signatoryType: 'B', limit: 50000000, status: 'pending', addedDate: '2024-07-01' },
];

// Mock Mandates
interface Mandate {
  id: string;
  bank: string;
  accountNumber: string;
  mandateType: string;
  description: string;
  combination: string;
  limit: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'expired' | 'pending';
}

const mandates: Mandate[] = [
  { id: '1', bank: 'HDFC Bank', accountNumber: 'XXXX5678', mandateType: 'Payment', description: 'All payments above ₹1 Cr', combination: 'Any 1 from A + Any 1 from B', limit: 100000000, validFrom: '2024-01-01', validTo: '2024-12-31', status: 'active' },
  { id: '2', bank: 'HDFC Bank', accountNumber: 'XXXX5678', mandateType: 'Payment', description: 'All payments above ₹5 Cr', combination: 'Any 2 from A', limit: 500000000, validFrom: '2024-01-01', validTo: '2024-12-31', status: 'active' },
  { id: '3', bank: 'SBI', accountNumber: 'XXXX9876', mandateType: 'Transfer', description: 'Intercompany transfers', combination: 'Any 1 from A', limit: 250000000, validFrom: '2024-01-01', validTo: '2024-12-31', status: 'active' },
  { id: '4', bank: 'ICICI Bank', accountNumber: 'XXXX8901', mandateType: 'Payment', description: 'Project disbursements', combination: 'Any 2 from A', limit: 200000000, validFrom: '2024-04-01', validTo: '2025-03-31', status: 'active' },
  { id: '5', bank: 'Axis Bank', accountNumber: 'XXXX3456', mandateType: 'Escrow Release', description: 'Escrow fund release', combination: 'CFO + Lender NOC', limit: 0, validFrom: '2023-06-01', validTo: '2025-05-31', status: 'active' },
];

// Table Columns
const accountColumns: Column<BankAccount>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'accountNumber', header: 'Account Number', accessor: 'accountNumber' },
  { id: 'accountName', header: 'Account Name', accessor: 'accountName' },
  { id: 'accountType', header: 'Type', accessor: 'accountType' },
  { id: 'currency', header: 'CCY', accessor: 'currency' },
  { id: 'entity', header: 'Entity', accessor: 'entity' },
  {
    id: 'balance',
    header: 'Balance',
    accessor: (row) => row.currency === 'INR' ? `₹${(row.balance / 10000000).toFixed(2)} Cr` : `${row.currency} ${(row.balance / 1000000).toFixed(2)}M`,
    align: 'right',
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : row.status === 'restricted' ? 'warning' : row.status === 'dormant' ? 'secondary' : 'danger'}>
        {row.status}
      </Badge>
    ),
  },
];

const balanceColumns: Column<BalanceRecord>[] = [
  { id: 'date', header: 'Date', accessor: 'date' },
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'accountNumber', header: 'Account', accessor: 'accountNumber' },
  {
    id: 'openingBalance',
    header: 'Opening',
    accessor: (row) => `₹${(row.openingBalance / 10000000).toFixed(2)} Cr`,
    align: 'right',
  },
  {
    id: 'closingBalance',
    header: 'Closing',
    accessor: (row) => `₹${(row.closingBalance / 10000000).toFixed(2)} Cr`,
    align: 'right',
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'confirmed' ? 'success' : 'warning'}>
        {row.status}
      </Badge>
    ),
  },
];

const statementColumns: Column<BankStatement>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'accountNumber', header: 'Account', accessor: 'accountNumber' },
  { id: 'period', header: 'Period', accessor: 'period' },
  { id: 'transactionCount', header: 'Txns', accessor: 'transactionCount', align: 'center' },
  {
    id: 'totalCredits',
    header: 'Credits',
    accessor: (row) => `₹${(row.totalCredits / 10000000).toFixed(1)} Cr`,
    cell: (row) => <span className="text-emerald-400">+₹{(row.totalCredits / 10000000).toFixed(1)} Cr</span>,
    align: 'right',
  },
  {
    id: 'totalDebits',
    header: 'Debits',
    accessor: (row) => `₹${(row.totalDebits / 10000000).toFixed(1)} Cr`,
    cell: (row) => <span className="text-red-400">-₹{(row.totalDebits / 10000000).toFixed(1)} Cr</span>,
    align: 'right',
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'downloaded' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'}>
        {row.status}
      </Badge>
    ),
  },
];

const transactionColumns: Column<Transaction>[] = [
  { id: 'date', header: 'Date', accessor: 'date' },
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'description', header: 'Description', accessor: 'description' },
  { id: 'category', header: 'Category', accessor: 'category' },
  {
    id: 'amount',
    header: 'Amount',
    accessor: (row) => `₹${(row.amount / 10000000).toFixed(2)} Cr`,
    cell: (row) => (
      <span className={row.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}>
        {row.type === 'credit' ? '+' : '-'}₹{(row.amount / 10000000).toFixed(2)} Cr
      </span>
    ),
    align: 'right',
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'completed' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'}>
        {row.status}
      </Badge>
    ),
  },
];

const signatoryColumns: Column<Signatory>[] = [
  { id: 'name', header: 'Name', accessor: 'name' },
  { id: 'designation', header: 'Designation', accessor: 'designation' },
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'accountNumber', header: 'Account', accessor: 'accountNumber' },
  { id: 'signatoryType', header: 'Type', accessor: 'signatoryType', align: 'center' },
  {
    id: 'limit',
    header: 'Limit',
    accessor: (row) => `₹${(row.limit / 10000000).toFixed(0)} Cr`,
    align: 'right',
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
];

const mandateColumns: Column<Mandate>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'mandateType', header: 'Type', accessor: 'mandateType' },
  { id: 'description', header: 'Description', accessor: 'description' },
  { id: 'combination', header: 'Combination', accessor: 'combination' },
  {
    id: 'limit',
    header: 'Limit',
    accessor: (row) => row.limit > 0 ? `₹${(row.limit / 10000000).toFixed(0)} Cr` : 'Unlimited',
    align: 'right',
  },
  { id: 'validTo', header: 'Valid Until', accessor: 'validTo' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'}>
        {row.status}
      </Badge>
    ),
  },
];

export default function BankManagementPage() {
  const [activeTab, setActiveTab] = React.useState('accounts');

  const activeAccounts = bankAccounts.filter(a => a.status === 'active').length;
  const totalBalance = bankAccounts.filter(a => a.currency === 'INR').reduce((sum, a) => sum + a.balance, 0);

  return (
    <PageContainer>
      <PageHeader
        title="Bank Management"
        description="Manage bank accounts, balances, statements, and signatories"
        breadcrumbs={[
          { label: 'Treasury Management', href: '/treasury' },
          { label: 'Bank Management' },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import Statement
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
        }
        showRefresh
        showExport
      />

      <div className="mb-6">
        <TreasuryFilters
          showCompany
          showBank
          showCurrency
          compact
        />
      </div>

      <Section className="mb-6">
        <KPIGrid columns={4}>
          <KPICard
            title="Total Accounts"
            value={bankAccounts.length.toString()}
            subtitle="Across all entities"
            icon={Building2}
            iconColor="bg-blue-500/10 text-blue-400"
          />
          <KPICard
            title="Total Balance"
            value={`₹${(totalBalance / 10000000).toFixed(0)} Cr`}
            subtitle="INR accounts"
            change={6.8}
            trend="up"
            icon={Wallet}
            iconColor="bg-emerald-500/10 text-emerald-400"
          />
          <KPICard
            title="Active Accounts"
            value={activeAccounts.toString()}
            subtitle={`${((activeAccounts / bankAccounts.length) * 100).toFixed(0)}% of total`}
            icon={CheckCircle2}
            iconColor="bg-cyan-500/10 text-cyan-400"
          />
          <KPICard
            title="Pending Reconciliation"
            value="3"
            subtitle="Requires attention"
            icon={AlertTriangle}
            iconColor="bg-yellow-500/10 text-yellow-400"
          />
        </KPIGrid>
      </Section>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {bankManagementTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="accounts" className="mt-6">
          <Section
            title="Bank Accounts"
            description="All registered bank accounts"
            actions={
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Refresh Balances
                </Button>
              </div>
            }
          >
            <DataTable
              data={bankAccounts}
              columns={accountColumns}
              hoverable
              searchable
              searchPlaceholder="Search accounts..."
              actions={[
                { label: 'View Details', icon: <Eye className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Edit', icon: <Edit className="h-4 w-4 mr-2" />, onClick: () => {} },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="balances" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="Today's Opening"
                value="₹3,180 Cr"
                subtitle="All accounts"
                icon={ArrowUpRight}
                iconColor="bg-blue-500/10 text-blue-400"
              />
              <KPICard
                title="Today's Closing"
                value="₹3,250 Cr"
                subtitle="Projected"
                change={2.2}
                trend="up"
                icon={ArrowDownRight}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
              <KPICard
                title="Confirmed"
                value="8"
                subtitle="Accounts reconciled"
                icon={CheckCircle2}
                iconColor="bg-cyan-500/10 text-cyan-400"
              />
              <KPICard
                title="Provisional"
                value="4"
                subtitle="Awaiting confirmation"
                icon={Clock}
                iconColor="bg-yellow-500/10 text-yellow-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Balance History"
            description="Daily opening and closing balances"
          >
            <DataTable
              data={balanceHistory}
              columns={balanceColumns}
              hoverable
              searchable
              searchPlaceholder="Search balances..."
            />
          </Section>
        </TabsContent>

        <TabsContent value="statements" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="Statements Downloaded"
                value="2"
                subtitle="Today"
                icon={FileText}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
              <KPICard
                title="Pending Download"
                value="1"
                subtitle="Awaiting"
                icon={Clock}
                iconColor="bg-yellow-500/10 text-yellow-400"
              />
              <KPICard
                title="Failed"
                value="1"
                subtitle="Retry required"
                icon={XCircle}
                iconColor="bg-red-500/10 text-red-400"
              />
              <KPICard
                title="Total Transactions"
                value="302"
                subtitle="This month"
                icon={CreditCard}
                iconColor="bg-blue-500/10 text-blue-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Bank Statements"
            description="Downloaded and pending statements"
            actions={
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download All
              </Button>
            }
          >
            <DataTable
              data={bankStatements}
              columns={statementColumns}
              hoverable
              actions={[
                { label: 'Download', icon: <Download className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'View', icon: <Eye className="h-4 w-4 mr-2" />, onClick: () => {} },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="Today's Credits"
                value="₹90 Cr"
                subtitle="12 transactions"
                icon={ArrowDownRight}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
              <KPICard
                title="Today's Debits"
                value="₹45 Cr"
                subtitle="8 transactions"
                icon={ArrowUpRight}
                iconColor="bg-red-500/10 text-red-400"
              />
              <KPICard
                title="Pending"
                value="1"
                subtitle="₹18 Cr value"
                icon={Clock}
                iconColor="bg-yellow-500/10 text-yellow-400"
              />
              <KPICard
                title="Failed"
                value="0"
                subtitle="All successful"
                icon={CheckCircle2}
                iconColor="bg-cyan-500/10 text-cyan-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Recent Transactions"
            description="All bank transactions"
            actions={
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            }
          >
            <DataTable
              data={transactions}
              columns={transactionColumns}
              hoverable
              searchable
              searchPlaceholder="Search transactions..."
            />
          </Section>
        </TabsContent>

        <TabsContent value="signatories" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="Total Signatories"
                value={signatories.length.toString()}
                subtitle="Across all accounts"
                icon={Users}
                iconColor="bg-blue-500/10 text-blue-400"
              />
              <KPICard
                title="Active"
                value={signatories.filter(s => s.status === 'active').length.toString()}
                subtitle="Currently authorized"
                icon={CheckCircle2}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
              <KPICard
                title="Pending Approval"
                value={signatories.filter(s => s.status === 'pending').length.toString()}
                subtitle="Awaiting bank confirmation"
                icon={Clock}
                iconColor="bg-yellow-500/10 text-yellow-400"
              />
              <KPICard
                title="Type A Signatories"
                value={signatories.filter(s => s.signatoryType === 'A').length.toString()}
                subtitle="Senior authorities"
                icon={Shield}
                iconColor="bg-purple-500/10 text-purple-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Authorized Signatories"
            description="Bank account signatories and limits"
            actions={
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Signatory
              </Button>
            }
          >
            <DataTable
              data={signatories}
              columns={signatoryColumns}
              hoverable
              searchable
              searchPlaceholder="Search signatories..."
              actions={[
                { label: 'Edit', icon: <Edit className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Remove', icon: <Trash2 className="h-4 w-4 mr-2" />, onClick: () => {}, variant: 'danger' },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="mandates" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="Active Mandates"
                value={mandates.filter(m => m.status === 'active').length.toString()}
                subtitle="Currently effective"
                icon={Shield}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
              <KPICard
                title="Expiring Soon"
                value="1"
                subtitle="Within 30 days"
                icon={AlertTriangle}
                iconColor="bg-yellow-500/10 text-yellow-400"
              />
              <KPICard
                title="Pending Approval"
                value="0"
                subtitle="All approved"
                icon={Clock}
                iconColor="bg-blue-500/10 text-blue-400"
              />
              <KPICard
                title="Expired"
                value="0"
                subtitle="No expired mandates"
                icon={XCircle}
                iconColor="bg-red-500/10 text-red-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Banking Mandates"
            description="Authorization rules and signing combinations"
            actions={
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Mandate
              </Button>
            }
          >
            <DataTable
              data={mandates}
              columns={mandateColumns}
              hoverable
              searchable
              searchPlaceholder="Search mandates..."
              actions={[
                { label: 'View', icon: <Eye className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Edit', icon: <Edit className="h-4 w-4 mr-2" />, onClick: () => {} },
              ]}
            />
          </Section>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
