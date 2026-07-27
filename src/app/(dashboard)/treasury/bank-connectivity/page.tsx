'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { TreasuryFilters } from '@/components/shared/treasury-filters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Plug,
  Wifi,
  WifiOff,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  Download,
  RefreshCcw,
  Eye,
  Edit,
  Play,
  Pause,
  Settings,
  Activity,
  Calendar,
} from 'lucide-react';
import { bankConnectivityTabs } from '@/config/treasury-navigation';

// Mock Connection Data
interface BankConnection {
  id: string;
  bank: string;
  connectionType: 'API' | 'SFTP' | 'H2H' | 'Manual';
  protocol: string;
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  lastSync: string;
  nextSync: string;
  accountsLinked: number;
  successRate: number;
}

const bankConnections: BankConnection[] = [
  { id: '1', bank: 'HDFC Bank', connectionType: 'API', protocol: 'REST API v2.0', status: 'active', lastSync: '2024-07-15 09:30', nextSync: '2024-07-15 10:30', accountsLinked: 8, successRate: 99.8 },
  { id: '2', bank: 'SBI', connectionType: 'H2H', protocol: 'ISO 20022', status: 'active', lastSync: '2024-07-15 09:25', nextSync: '2024-07-15 10:25', accountsLinked: 5, successRate: 98.5 },
  { id: '3', bank: 'ICICI Bank', connectionType: 'API', protocol: 'REST API v1.5', status: 'active', lastSync: '2024-07-15 09:20', nextSync: '2024-07-15 10:20', accountsLinked: 4, successRate: 99.2 },
  { id: '4', bank: 'Axis Bank', connectionType: 'SFTP', protocol: 'MT940', status: 'error', lastSync: '2024-07-14 18:00', nextSync: 'Retry Pending', accountsLinked: 3, successRate: 92.1 },
  { id: '5', bank: 'Kotak Bank', connectionType: 'API', protocol: 'REST API v2.0', status: 'active', lastSync: '2024-07-15 09:15', nextSync: '2024-07-15 10:15', accountsLinked: 2, successRate: 99.5 },
  { id: '6', bank: 'Standard Chartered', connectionType: 'SFTP', protocol: 'BAI2', status: 'active', lastSync: '2024-07-15 08:00', nextSync: '2024-07-15 14:00', accountsLinked: 2, successRate: 97.8 },
  { id: '7', bank: 'Citi Bank', connectionType: 'H2H', protocol: 'SWIFT MT', status: 'maintenance', lastSync: '2024-07-14 16:00', nextSync: '2024-07-16 08:00', accountsLinked: 1, successRate: 98.9 },
  { id: '8', bank: 'Yes Bank', connectionType: 'Manual', protocol: 'CSV Upload', status: 'active', lastSync: '2024-07-15 07:30', nextSync: 'Manual', accountsLinked: 1, successRate: 100 },
];

// Mock API Integrations
interface APIIntegration {
  id: string;
  bank: string;
  apiName: string;
  version: string;
  endpoint: string;
  authType: 'OAuth 2.0' | 'API Key' | 'Certificate';
  status: 'active' | 'inactive' | 'deprecated';
  rateLimit: string;
  callsToday: number;
  lastCall: string;
}

const apiIntegrations: APIIntegration[] = [
  { id: '1', bank: 'HDFC Bank', apiName: 'Balance Inquiry', version: 'v2.0', endpoint: '/api/v2/balance', authType: 'OAuth 2.0', status: 'active', rateLimit: '1000/hr', callsToday: 245, lastCall: '2024-07-15 09:30' },
  { id: '2', bank: 'HDFC Bank', apiName: 'Statement Download', version: 'v2.0', endpoint: '/api/v2/statements', authType: 'OAuth 2.0', status: 'active', rateLimit: '100/hr', callsToday: 12, lastCall: '2024-07-15 09:00' },
  { id: '3', bank: 'HDFC Bank', apiName: 'Payment Initiation', version: 'v2.0', endpoint: '/api/v2/payments', authType: 'OAuth 2.0', status: 'active', rateLimit: '500/hr', callsToday: 89, lastCall: '2024-07-15 09:28' },
  { id: '4', bank: 'ICICI Bank', apiName: 'Account Info', version: 'v1.5', endpoint: '/corporate/api/accounts', authType: 'Certificate', status: 'active', rateLimit: '500/hr', callsToday: 156, lastCall: '2024-07-15 09:25' },
  { id: '5', bank: 'ICICI Bank', apiName: 'Fund Transfer', version: 'v1.5', endpoint: '/corporate/api/transfer', authType: 'Certificate', status: 'active', rateLimit: '200/hr', callsToday: 45, lastCall: '2024-07-15 09:20' },
  { id: '6', bank: 'Kotak Bank', apiName: 'Balance API', version: 'v2.0', endpoint: '/treasury/balance', authType: 'API Key', status: 'active', rateLimit: '800/hr', callsToday: 178, lastCall: '2024-07-15 09:15' },
];

// Mock File Transfers
interface FileTransfer {
  id: string;
  bank: string;
  fileName: string;
  fileType: string;
  direction: 'inbound' | 'outbound';
  size: string;
  status: 'completed' | 'processing' | 'failed' | 'pending';
  transferTime: string;
  recordCount: number;
}

const fileTransfers: FileTransfer[] = [
  { id: '1', bank: 'SBI', fileName: 'SBI_STMT_20240715_001.MT940', fileType: 'MT940', direction: 'inbound', size: '245 KB', status: 'completed', transferTime: '2024-07-15 09:25', recordCount: 156 },
  { id: '2', bank: 'Standard Chartered', fileName: 'SCB_BAI2_20240715.txt', fileType: 'BAI2', direction: 'inbound', size: '128 KB', status: 'completed', transferTime: '2024-07-15 08:00', recordCount: 89 },
  { id: '3', bank: 'Axis Bank', fileName: 'AXIS_STMT_20240715.MT940', fileType: 'MT940', direction: 'inbound', size: '0 KB', status: 'failed', transferTime: '2024-07-15 06:00', recordCount: 0 },
  { id: '4', bank: 'SBI', fileName: 'PAYMENT_BATCH_001.XML', fileType: 'pain.001', direction: 'outbound', size: '56 KB', status: 'completed', transferTime: '2024-07-15 08:30', recordCount: 25 },
  { id: '5', bank: 'HDFC Bank', fileName: 'SALARY_JULY_2024.CSV', fileType: 'CSV', direction: 'outbound', size: '1.2 MB', status: 'completed', transferTime: '2024-07-13 10:00', recordCount: 1250 },
  { id: '6', bank: 'Yes Bank', fileName: 'YES_MANUAL_20240715.CSV', fileType: 'CSV', direction: 'inbound', size: '45 KB', status: 'processing', transferTime: '2024-07-15 07:30', recordCount: 32 },
];

// Mock File Formats
interface FileFormat {
  id: string;
  formatName: string;
  formatType: string;
  direction: 'inbound' | 'outbound' | 'both';
  banks: string[];
  description: string;
  status: 'active' | 'deprecated';
}

const fileFormats: FileFormat[] = [
  { id: '1', formatName: 'MT940', formatType: 'SWIFT', direction: 'inbound', banks: ['SBI', 'Axis Bank', 'ICICI Bank'], description: 'SWIFT bank statement format', status: 'active' },
  { id: '2', formatName: 'MT942', formatType: 'SWIFT', direction: 'inbound', banks: ['SBI', 'ICICI Bank'], description: 'SWIFT interim transaction report', status: 'active' },
  { id: '3', formatName: 'BAI2', formatType: 'BAI', direction: 'inbound', banks: ['Standard Chartered', 'Citi Bank'], description: 'Bank Administration Institute format', status: 'active' },
  { id: '4', formatName: 'pain.001', formatType: 'ISO 20022', direction: 'outbound', banks: ['SBI', 'HDFC Bank'], description: 'Payment initiation XML', status: 'active' },
  { id: '5', formatName: 'camt.053', formatType: 'ISO 20022', direction: 'inbound', banks: ['HDFC Bank', 'ICICI Bank'], description: 'Bank-to-customer statement', status: 'active' },
  { id: '6', formatName: 'CSV Generic', formatType: 'CSV', direction: 'both', banks: ['All'], description: 'Generic CSV format for manual upload', status: 'active' },
];

// Mock Schedules
interface Schedule {
  id: string;
  bank: string;
  taskName: string;
  taskType: string;
  frequency: string;
  lastRun: string;
  nextRun: string;
  status: 'active' | 'paused' | 'error';
}

const schedules: Schedule[] = [
  { id: '1', bank: 'HDFC Bank', taskName: 'Balance Fetch', taskType: 'API Call', frequency: 'Every 1 hour', lastRun: '2024-07-15 09:30', nextRun: '2024-07-15 10:30', status: 'active' },
  { id: '2', bank: 'HDFC Bank', taskName: 'Statement Download', taskType: 'API Call', frequency: 'Daily 6:00 AM', lastRun: '2024-07-15 06:00', nextRun: '2024-07-16 06:00', status: 'active' },
  { id: '3', bank: 'SBI', taskName: 'H2H File Pickup', taskType: 'SFTP', frequency: 'Every 1 hour', lastRun: '2024-07-15 09:25', nextRun: '2024-07-15 10:25', status: 'active' },
  { id: '4', bank: 'ICICI Bank', taskName: 'Balance Sync', taskType: 'API Call', frequency: 'Every 30 min', lastRun: '2024-07-15 09:20', nextRun: '2024-07-15 09:50', status: 'active' },
  { id: '5', bank: 'Axis Bank', taskName: 'Statement Fetch', taskType: 'SFTP', frequency: 'Every 6 hours', lastRun: '2024-07-14 18:00', nextRun: 'Paused', status: 'error' },
  { id: '6', bank: 'Citi Bank', taskName: 'SWIFT Download', taskType: 'H2H', frequency: 'Daily 4:00 PM', lastRun: '2024-07-14 16:00', nextRun: '2024-07-16 16:00', status: 'paused' },
];

// Mock Activity Logs
interface ActivityLog {
  id: string;
  timestamp: string;
  bank: string;
  activity: string;
  type: 'success' | 'error' | 'warning' | 'info';
  details: string;
  user: string;
}

const activityLogs: ActivityLog[] = [
  { id: '1', timestamp: '2024-07-15 09:30:15', bank: 'HDFC Bank', activity: 'Balance fetched successfully', type: 'success', details: '8 accounts updated', user: 'System' },
  { id: '2', timestamp: '2024-07-15 09:28:42', bank: 'HDFC Bank', activity: 'Payment initiated via API', type: 'success', details: 'Ref: PAY123456', user: 'Priya Singh' },
  { id: '3', timestamp: '2024-07-15 09:25:33', bank: 'SBI', activity: 'MT940 file processed', type: 'success', details: '156 transactions imported', user: 'System' },
  { id: '4', timestamp: '2024-07-15 06:00:45', bank: 'Axis Bank', activity: 'SFTP connection failed', type: 'error', details: 'Connection timeout after 30s', user: 'System' },
  { id: '5', timestamp: '2024-07-15 05:55:12', bank: 'Axis Bank', activity: 'Retry scheduled', type: 'warning', details: 'Will retry in 1 hour', user: 'System' },
  { id: '6', timestamp: '2024-07-14 18:00:00', bank: 'Citi Bank', activity: 'Maintenance mode enabled', type: 'info', details: 'Bank system upgrade', user: 'Admin' },
];

// Table Columns
const connectionColumns: Column<BankConnection>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  {
    id: 'connectionType',
    header: 'Type',
    accessor: 'connectionType',
    cell: (row) => (
      <Badge variant="secondary">{row.connectionType}</Badge>
    ),
  },
  { id: 'protocol', header: 'Protocol', accessor: 'protocol' },
  { id: 'accountsLinked', header: 'Accounts', accessor: 'accountsLinked', align: 'center' },
  {
    id: 'successRate',
    header: 'Success Rate',
    accessor: (row) => `${row.successRate}%`,
    cell: (row) => (
      <span className={row.successRate >= 99 ? 'text-emerald-400' : row.successRate >= 95 ? 'text-yellow-400' : 'text-red-400'}>
        {row.successRate}%
      </span>
    ),
    align: 'right',
  },
  { id: 'lastSync', header: 'Last Sync', accessor: 'lastSync' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : row.status === 'error' ? 'danger' : row.status === 'maintenance' ? 'warning' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
];

const apiColumns: Column<APIIntegration>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'apiName', header: 'API Name', accessor: 'apiName' },
  { id: 'version', header: 'Version', accessor: 'version' },
  { id: 'authType', header: 'Auth', accessor: 'authType' },
  { id: 'rateLimit', header: 'Rate Limit', accessor: 'rateLimit' },
  { id: 'callsToday', header: 'Calls Today', accessor: 'callsToday', align: 'right' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : row.status === 'deprecated' ? 'warning' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
];

const fileTransferColumns: Column<FileTransfer>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'fileName', header: 'File Name', accessor: 'fileName' },
  { id: 'fileType', header: 'Type', accessor: 'fileType' },
  {
    id: 'direction',
    header: 'Direction',
    accessor: 'direction',
    cell: (row) => (
      <Badge variant={row.direction === 'inbound' ? 'success' : 'secondary'}>
        {row.direction}
      </Badge>
    ),
  },
  { id: 'size', header: 'Size', accessor: 'size', align: 'right' },
  { id: 'recordCount', header: 'Records', accessor: 'recordCount', align: 'right' },
  { id: 'transferTime', header: 'Time', accessor: 'transferTime' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'completed' ? 'success' : row.status === 'processing' ? 'warning' : row.status === 'failed' ? 'danger' : 'secondary'}>
        {row.status}
      </Badge>
    ),
  },
];

const formatColumns: Column<FileFormat>[] = [
  { id: 'formatName', header: 'Format', accessor: 'formatName' },
  { id: 'formatType', header: 'Type', accessor: 'formatType' },
  {
    id: 'direction',
    header: 'Direction',
    accessor: 'direction',
    cell: (row) => (
      <Badge variant={row.direction === 'inbound' ? 'success' : row.direction === 'outbound' ? 'secondary' : 'default'}>
        {row.direction}
      </Badge>
    ),
  },
  { id: 'banks', header: 'Banks', accessor: (row) => row.banks.join(', ') },
  { id: 'description', header: 'Description', accessor: 'description' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : 'warning'}>
        {row.status}
      </Badge>
    ),
  },
];

const scheduleColumns: Column<Schedule>[] = [
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'taskName', header: 'Task', accessor: 'taskName' },
  { id: 'taskType', header: 'Type', accessor: 'taskType' },
  { id: 'frequency', header: 'Frequency', accessor: 'frequency' },
  { id: 'lastRun', header: 'Last Run', accessor: 'lastRun' },
  { id: 'nextRun', header: 'Next Run', accessor: 'nextRun' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'active' ? 'success' : row.status === 'error' ? 'danger' : 'warning'}>
        {row.status}
      </Badge>
    ),
  },
];

const logColumns: Column<ActivityLog>[] = [
  { id: 'timestamp', header: 'Time', accessor: 'timestamp' },
  { id: 'bank', header: 'Bank', accessor: 'bank' },
  { id: 'activity', header: 'Activity', accessor: 'activity' },
  {
    id: 'type',
    header: 'Type',
    accessor: 'type',
    cell: (row) => (
      <Badge variant={row.type === 'success' ? 'success' : row.type === 'error' ? 'danger' : row.type === 'warning' ? 'warning' : 'secondary'}>
        {row.type}
      </Badge>
    ),
  },
  { id: 'details', header: 'Details', accessor: 'details' },
  { id: 'user', header: 'User', accessor: 'user' },
];

export default function BankConnectivityPage() {
  const [activeTab, setActiveTab] = React.useState('connections');

  const activeConnections = bankConnections.filter(c => c.status === 'active').length;
  const errorConnections = bankConnections.filter(c => c.status === 'error').length;

  return (
    <PageContainer>
      <PageHeader
        title="Bank Connectivity"
        description="Manage bank integrations, APIs, and file transfers"
        breadcrumbs={[
          { label: 'Treasury Management', href: '/treasury' },
          { label: 'Bank Connectivity' },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Sync All
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Connection
            </Button>
          </div>
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
            title="Total Connections"
            value={bankConnections.length.toString()}
            subtitle="Bank integrations"
            icon={Plug}
            iconColor="bg-blue-500/10 text-blue-400"
          />
          <KPICard
            title="Active"
            value={activeConnections.toString()}
            subtitle="Online and syncing"
            icon={Wifi}
            iconColor="bg-emerald-500/10 text-emerald-400"
          />
          <KPICard
            title="Errors"
            value={errorConnections.toString()}
            subtitle="Needs attention"
            icon={WifiOff}
            iconColor="bg-red-500/10 text-red-400"
          />
          <KPICard
            title="Files Today"
            value={fileTransfers.filter(f => f.transferTime.includes('2024-07-15')).length.toString()}
            subtitle="Processed"
            icon={FileText}
            iconColor="bg-purple-500/10 text-purple-400"
          />
        </KPIGrid>
      </Section>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {bankConnectivityTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="connections" className="mt-6">
          <Section
            title="Bank Connections"
            description="All configured bank integrations"
            actions={
              <Button variant="outline" size="sm">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Test All
              </Button>
            }
          >
            <DataTable
              data={bankConnections}
              columns={connectionColumns}
              hoverable
              searchable
              searchPlaceholder="Search connections..."
              actions={[
                { label: 'Test Connection', icon: <Activity className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Configure', icon: <Settings className="h-4 w-4 mr-2" />, onClick: () => {} },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="apis" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="Active APIs"
                value={apiIntegrations.filter(a => a.status === 'active').length.toString()}
                subtitle="Configured"
                icon={Plug}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
              <KPICard
                title="API Calls Today"
                value={apiIntegrations.reduce((sum, a) => sum + a.callsToday, 0).toString()}
                subtitle="Total calls"
                icon={Activity}
                iconColor="bg-blue-500/10 text-blue-400"
              />
              <KPICard
                title="Avg Response"
                value="245ms"
                subtitle="Last hour"
                icon={Clock}
                iconColor="bg-cyan-500/10 text-cyan-400"
              />
              <KPICard
                title="Success Rate"
                value="99.5%"
                subtitle="Today"
                icon={CheckCircle2}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="API Integrations"
            description="Configured API endpoints"
          >
            <DataTable
              data={apiIntegrations}
              columns={apiColumns}
              hoverable
              searchable
              searchPlaceholder="Search APIs..."
              actions={[
                { label: 'Test', icon: <Play className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'View Docs', icon: <Eye className="h-4 w-4 mr-2" />, onClick: () => {} },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="file-transfers" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="Files Received"
                value={fileTransfers.filter(f => f.direction === 'inbound' && f.status === 'completed').length.toString()}
                subtitle="Today"
                icon={Download}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
              <KPICard
                title="Files Sent"
                value={fileTransfers.filter(f => f.direction === 'outbound' && f.status === 'completed').length.toString()}
                subtitle="Today"
                icon={FileText}
                iconColor="bg-blue-500/10 text-blue-400"
              />
              <KPICard
                title="Processing"
                value={fileTransfers.filter(f => f.status === 'processing').length.toString()}
                subtitle="In progress"
                icon={Clock}
                iconColor="bg-yellow-500/10 text-yellow-400"
              />
              <KPICard
                title="Failed"
                value={fileTransfers.filter(f => f.status === 'failed').length.toString()}
                subtitle="Needs retry"
                icon={XCircle}
                iconColor="bg-red-500/10 text-red-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="File Transfers"
            description="Recent file transfers and uploads"
          >
            <DataTable
              data={fileTransfers}
              columns={fileTransferColumns}
              hoverable
              searchable
              searchPlaceholder="Search files..."
              actions={[
                { label: 'Download', icon: <Download className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Retry', icon: <RefreshCcw className="h-4 w-4 mr-2" />, onClick: () => {} },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="formats" className="mt-6">
          <Section
            title="Supported File Formats"
            description="Configured file formats for bank communication"
            actions={
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Format
              </Button>
            }
          >
            <DataTable
              data={fileFormats}
              columns={formatColumns}
              hoverable
              searchable
              searchPlaceholder="Search formats..."
              actions={[
                { label: 'View Schema', icon: <Eye className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Edit Mapping', icon: <Edit className="h-4 w-4 mr-2" />, onClick: () => {} },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="schedules" className="mt-6">
          <Section className="mb-6">
            <KPIGrid columns={4}>
              <KPICard
                title="Active Schedules"
                value={schedules.filter(s => s.status === 'active').length.toString()}
                subtitle="Running"
                icon={Calendar}
                iconColor="bg-emerald-500/10 text-emerald-400"
              />
              <KPICard
                title="Paused"
                value={schedules.filter(s => s.status === 'paused').length.toString()}
                subtitle="Temporarily stopped"
                icon={Pause}
                iconColor="bg-yellow-500/10 text-yellow-400"
              />
              <KPICard
                title="Errors"
                value={schedules.filter(s => s.status === 'error').length.toString()}
                subtitle="Failed tasks"
                icon={AlertTriangle}
                iconColor="bg-red-500/10 text-red-400"
              />
              <KPICard
                title="Next Run"
                value="09:50"
                subtitle="ICICI Balance Sync"
                icon={Clock}
                iconColor="bg-blue-500/10 text-blue-400"
              />
            </KPIGrid>
          </Section>

          <Section
            title="Scheduled Tasks"
            description="Automated sync schedules"
            actions={
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Schedule
              </Button>
            }
          >
            <DataTable
              data={schedules}
              columns={scheduleColumns}
              hoverable
              searchable
              searchPlaceholder="Search schedules..."
              actions={[
                { label: 'Run Now', icon: <Play className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Pause', icon: <Pause className="h-4 w-4 mr-2" />, onClick: () => {} },
                { label: 'Edit', icon: <Edit className="h-4 w-4 mr-2" />, onClick: () => {} },
              ]}
            />
          </Section>
        </TabsContent>

        <TabsContent value="logs" className="mt-6">
          <Section
            title="Activity Logs"
            description="Recent connectivity events"
            actions={
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Logs
              </Button>
            }
          >
            <DataTable
              data={activityLogs}
              columns={logColumns}
              hoverable
              searchable
              searchPlaceholder="Search logs..."
            />
          </Section>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
