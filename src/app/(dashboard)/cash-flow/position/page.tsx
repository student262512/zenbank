'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { PieChart } from '@/components/shared/charts/pie-chart';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { CashFlowFilters } from '@/components/shared/cash-flow-filters';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import {
  Wallet,
  Building2,
  MapPin,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRightLeft,
  Download,
  Eye,
  TrendingUp,
  TrendingDown,
  Shield,
  Lock,
  PiggyBank,
} from 'lucide-react';
import { cashPositionTabs } from '@/config/cash-flow-navigation';

// Mock Position Data - 15 entities
interface CashPosition {
  id: string;
  entity: string;
  type: 'parent' | 'subsidiary' | 'spv' | 'jv';
  openingBalance: number;
  credits: number;
  debits: number;
  closingBalance: number;
  availableCash: number;
  restrictedCash: number;
  escrowCash: number;
  netLiquidity: number;
  variance: number;
  variancePercent: number;
}

const positionData: CashPosition[] = [
  { id: '1', entity: 'Zenith Infrastructure Ltd', type: 'parent', openingBalance: 450000000, credits: 125000000, debits: 85000000, closingBalance: 490000000, availableCash: 420000000, restrictedCash: 30000000, escrowCash: 40000000, netLiquidity: 380000000, variance: 40000000, variancePercent: 8.9 },
  { id: '2', entity: 'Zenith Realty Holdings', type: 'subsidiary', openingBalance: 280000000, credits: 95000000, debits: 72000000, closingBalance: 303000000, availableCash: 260000000, restrictedCash: 18000000, escrowCash: 25000000, netLiquidity: 235000000, variance: 23000000, variancePercent: 8.2 },
  { id: '3', entity: 'Zenith Energy SPV', type: 'spv', openingBalance: 180000000, credits: 45000000, debits: 38000000, closingBalance: 187000000, availableCash: 150000000, restrictedCash: 12000000, escrowCash: 25000000, netLiquidity: 125000000, variance: 7000000, variancePercent: 3.9 },
  { id: '4', entity: 'Zenith Highways Pvt Ltd', type: 'subsidiary', openingBalance: 150000000, credits: 62000000, debits: 48000000, closingBalance: 164000000, availableCash: 140000000, restrictedCash: 10000000, escrowCash: 14000000, netLiquidity: 126000000, variance: 14000000, variancePercent: 9.3 },
  { id: '5', entity: 'Mumbai Metro SPV', type: 'spv', openingBalance: 220000000, credits: 85000000, debits: 65000000, closingBalance: 240000000, availableCash: 180000000, restrictedCash: 25000000, escrowCash: 35000000, netLiquidity: 145000000, variance: 20000000, variancePercent: 9.1 },
  { id: '6', entity: 'NH-48 Highway SPV', type: 'spv', openingBalance: 165000000, credits: 55000000, debits: 42000000, closingBalance: 178000000, availableCash: 145000000, restrictedCash: 15000000, escrowCash: 18000000, netLiquidity: 127000000, variance: 13000000, variancePercent: 7.9 },
  { id: '7', entity: 'Gujarat Solar SPV', type: 'spv', openingBalance: 95000000, credits: 32000000, debits: 28000000, closingBalance: 99000000, availableCash: 85000000, restrictedCash: 8000000, escrowCash: 6000000, netLiquidity: 77000000, variance: 4000000, variancePercent: 4.2 },
  { id: '8', entity: 'Pune Water SPV', type: 'spv', openingBalance: 78000000, credits: 25000000, debits: 22000000, closingBalance: 81000000, availableCash: 70000000, restrictedCash: 5000000, escrowCash: 6000000, netLiquidity: 64000000, variance: 3000000, variancePercent: 3.8 },
  { id: '9', entity: 'Zenith Commercial JV', type: 'jv', openingBalance: 120000000, credits: 48000000, debits: 35000000, closingBalance: 133000000, availableCash: 115000000, restrictedCash: 8000000, escrowCash: 10000000, netLiquidity: 105000000, variance: 13000000, variancePercent: 10.8 },
  { id: '10', entity: 'Zenith Residential JV', type: 'jv', openingBalance: 88000000, credits: 35000000, debits: 28000000, closingBalance: 95000000, availableCash: 82000000, restrictedCash: 6000000, escrowCash: 7000000, netLiquidity: 75000000, variance: 7000000, variancePercent: 8.0 },
  { id: '11', entity: 'Zenith Tower A SPV', type: 'spv', openingBalance: 145000000, credits: 58000000, debits: 45000000, closingBalance: 158000000, availableCash: 130000000, restrictedCash: 12000000, escrowCash: 16000000, netLiquidity: 114000000, variance: 13000000, variancePercent: 9.0 },
  { id: '12', entity: 'Zenith Tower B SPV', type: 'spv', openingBalance: 110000000, credits: 42000000, debits: 35000000, closingBalance: 117000000, availableCash: 100000000, restrictedCash: 8000000, escrowCash: 9000000, netLiquidity: 91000000, variance: 7000000, variancePercent: 6.4 },
  { id: '13', entity: 'Zenith Mall SPV', type: 'spv', openingBalance: 92000000, credits: 38000000, debits: 32000000, closingBalance: 98000000, availableCash: 85000000, restrictedCash: 6000000, escrowCash: 7000000, netLiquidity: 78000000, variance: 6000000, variancePercent: 6.5 },
  { id: '14', entity: 'Zenith Logistics', type: 'subsidiary', openingBalance: 65000000, credits: 28000000, debits: 22000000, closingBalance: 71000000, availableCash: 62000000, restrictedCash: 4000000, escrowCash: 5000000, netLiquidity: 57000000, variance: 6000000, variancePercent: 9.2 },
  { id: '15', entity: 'Zenith Properties', type: 'subsidiary', openingBalance: 58000000, credits: 22000000, debits: 18000000, closingBalance: 62000000, availableCash: 55000000, restrictedCash: 3000000, escrowCash: 4000000, netLiquidity: 51000000, variance: 4000000, variancePercent: 6.9 },
];

// Mock Cash Distribution Data
const cashDistribution = [
  { label: 'Operating Cash', value: 1250, color: '#3b82f6' },
  { label: 'Escrow Accounts', value: 560, color: '#22d3ee' },
  { label: 'Restricted Cash', value: 320, color: '#f59e0b' },
  { label: 'Investment Accounts', value: 180, color: '#10b981' },
  { label: 'Payroll Accounts', value: 85, color: '#8b5cf6' },
  { label: 'Tax Reserves', value: 55, color: '#ef4444' },
];

// Mock Bank Exposure Data
const bankExposure = [
  { label: 'HDFC Bank', value: 32, color: '#3b82f6' },
  { label: 'ICICI Bank', value: 25, color: '#22d3ee' },
  { label: 'SBI', value: 18, color: '#10b981' },
  { label: 'Axis Bank', value: 12, color: '#f59e0b' },
  { label: 'Kotak', value: 8, color: '#8b5cf6' },
  { label: 'Others', value: 5, color: '#6b7280' },
];

// Mock Currency Exposure Data
const currencyExposure = [
  { label: 'INR', value: 92, color: '#3b82f6' },
  { label: 'USD', value: 5, color: '#22d3ee' },
  { label: 'EUR', value: 2, color: '#10b981' },
  { label: 'GBP', value: 0.5, color: '#f59e0b' },
  { label: 'Others', value: 0.5, color: '#6b7280' },
];

// Summary calculations
const totalOpeningBalance = positionData.reduce((sum, p) => sum + p.openingBalance, 0);
const totalClosingBalance = positionData.reduce((sum, p) => sum + p.closingBalance, 0);
const totalAvailableCash = positionData.reduce((sum, p) => sum + p.availableCash, 0);
const totalRestrictedCash = positionData.reduce((sum, p) => sum + p.restrictedCash, 0);
const totalEscrowCash = positionData.reduce((sum, p) => sum + p.escrowCash, 0);
const totalNetLiquidity = positionData.reduce((sum, p) => sum + p.netLiquidity, 0);

// Table Columns
const positionColumns: Column<CashPosition>[] = [
  {
    id: 'entity',
    header: 'Entity',
    accessor: 'entity',
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Badge variant={row.type === 'parent' ? 'default' : row.type === 'spv' ? 'secondary' : 'outline'} className="text-[10px]">
          {row.type.toUpperCase()}
        </Badge>
        <span className="font-medium">{row.entity}</span>
      </div>
    ),
  },
  {
    id: 'openingBalance',
    header: 'Opening Balance',
    accessor: (row) => `₹${(row.openingBalance / 10000000).toFixed(1)} Cr`,
    align: 'right',
  },
  {
    id: 'credits',
    header: 'Credits',
    accessor: 'credits',
    cell: (row) => (
      <span className="text-emerald-400">+₹{(row.credits / 10000000).toFixed(1)} Cr</span>
    ),
    align: 'right',
  },
  {
    id: 'debits',
    header: 'Debits',
    accessor: 'debits',
    cell: (row) => (
      <span className="text-red-400">-₹{(row.debits / 10000000).toFixed(1)} Cr</span>
    ),
    align: 'right',
  },
  {
    id: 'closingBalance',
    header: 'Closing Balance',
    accessor: (row) => `₹${(row.closingBalance / 10000000).toFixed(1)} Cr`,
    align: 'right',
  },
  {
    id: 'availableCash',
    header: 'Available Cash',
    accessor: (row) => `₹${(row.availableCash / 10000000).toFixed(1)} Cr`,
    align: 'right',
  },
  {
    id: 'netLiquidity',
    header: 'Net Liquidity',
    accessor: (row) => `₹${(row.netLiquidity / 10000000).toFixed(1)} Cr`,
    align: 'right',
  },
  {
    id: 'variance',
    header: 'Variance',
    accessor: 'variance',
    cell: (row) => (
      <div className="flex items-center justify-end gap-1">
        {row.variance > 0 ? (
          <TrendingUp className="h-4 w-4 text-emerald-400" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-400" />
        )}
        <span className={row.variance > 0 ? 'text-emerald-400' : 'text-red-400'}>
          {row.variancePercent > 0 ? '+' : ''}{row.variancePercent.toFixed(1)}%
        </span>
      </div>
    ),
    align: 'right',
  },
];

export default function CashPositionPage() {
  const [activeTab, setActiveTab] = React.useState('global');
  const [selectedEntity, setSelectedEntity] = React.useState<CashPosition | null>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleRowClick = (row: CashPosition) => {
    setSelectedEntity(row);
    setDrawerOpen(true);
  };

  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader
        title="Enterprise Cash Position"
        description="Real-time cash position across all entities and accounts"
        breadcrumbs={[
          { label: 'Cash Flow Intelligence', href: '/cash-flow' },
          { label: 'Cash Position' },
        ]}
        showAI
        showRefresh
        showExport
        showSavedViews
      />

      {/* Global Filters */}
      <div className="mb-6">
        <CashFlowFilters
          showCompany
          showBusinessUnit
          showSPV
          showProject
          showBank
          showAccount
          showCurrency
          showDateRange
          compact
        />
      </div>

      {/* Summary KPIs */}
      <Section className="mb-6">
        <KPIGrid columns={5}>
          <KPICard
            title="Total Cash Position"
            value={`₹${(totalClosingBalance / 10000000).toFixed(0)} Cr`}
            subtitle="Across 15 entities"
            change={((totalClosingBalance - totalOpeningBalance) / totalOpeningBalance * 100)}
            trend="up"
            icon={Wallet}
            iconColor="bg-blue-500/10 text-blue-400"
            size="lg"
          />
          <KPICard
            title="Available Cash"
            value={`₹${(totalAvailableCash / 10000000).toFixed(0)} Cr`}
            subtitle="Unrestricted funds"
            icon={DollarSign}
            iconColor="bg-emerald-500/10 text-emerald-400"
          />
          <KPICard
            title="Restricted Cash"
            value={`₹${(totalRestrictedCash / 10000000).toFixed(0)} Cr`}
            subtitle="Regulatory reserves"
            icon={Lock}
            iconColor="bg-yellow-500/10 text-yellow-400"
          />
          <KPICard
            title="Escrow Cash"
            value={`₹${(totalEscrowCash / 10000000).toFixed(0)} Cr`}
            subtitle="In escrow accounts"
            icon={Shield}
            iconColor="bg-purple-500/10 text-purple-400"
          />
          <KPICard
            title="Net Liquidity"
            value={`₹${(totalNetLiquidity / 10000000).toFixed(0)} Cr`}
            subtitle="After commitments"
            icon={PiggyBank}
            iconColor="bg-cyan-500/10 text-cyan-400"
          />
        </KPIGrid>
      </Section>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          {cashPositionTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Global Position Tab */}
        <TabsContent value="global" className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Section
                title="Entity-wise Cash Position"
                description="Click on a row to view details"
                actions={
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ArrowRightLeft className="mr-2 h-4 w-4" />
                      Transfer
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                }
              >
                <DataTable
                  data={positionData}
                  columns={positionColumns}
                  onRowClick={handleRowClick}
                  hoverable
                />
              </Section>
            </div>

            <div className="space-y-6">
              <PieChart
                data={cashDistribution}
                title="Cash Distribution"
                size={200}
                innerRadius={0.6}
                centerValue={`₹${(totalClosingBalance / 10000000).toFixed(0)} Cr`}
                centerLabel="Total"
                formatValue={(v) => `₹${v} Cr`}
              />
              <PieChart
                data={bankExposure}
                title="Bank Exposure"
                size={200}
                innerRadius={0.6}
                showPercentages
              />
            </div>
          </div>
        </TabsContent>

        {/* SPV Position Tab */}
        <TabsContent value="spv" className="mt-6 space-y-6">
          <Section
            title="SPV-wise Cash Position"
            description="Special Purpose Vehicle cash positions"
          >
            <DataTable
              data={positionData.filter(p => p.type === 'spv')}
              columns={positionColumns}
              onRowClick={handleRowClick}
              hoverable
            />
          </Section>
        </TabsContent>

        {/* Bank Position Tab */}
        <TabsContent value="bank" className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <PieChart
              data={bankExposure}
              title="Bank-wise Distribution"
              size={250}
              innerRadius={0.6}
              showPercentages
              centerValue="₹2,450 Cr"
              centerLabel="Total"
            />
            <Section title="Bank Accounts Summary">
              <div className="space-y-3">
                {bankExposure.map((bank) => (
                  <div key={bank.label} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: bank.color }} />
                      <span className="font-medium text-white">{bank.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">₹{(bank.value * 24.5).toFixed(0)} Cr</div>
                      <div className="text-xs text-slate-400">{bank.value}% of total</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </TabsContent>

        {/* Currency Position Tab */}
        <TabsContent value="currency" className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <PieChart
              data={currencyExposure}
              title="Currency-wise Distribution"
              size={250}
              innerRadius={0.6}
              showPercentages
              centerValue="₹2,450 Cr"
              centerLabel="Total (INR)"
            />
            <Section title="Currency Exposure">
              <div className="space-y-3">
                {currencyExposure.map((currency) => (
                  <div key={currency.label} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: currency.color }} />
                      <span className="font-medium text-white">{currency.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">{currency.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </TabsContent>

        {/* Liquidity View Tab */}
        <TabsContent value="liquidity" className="mt-6 space-y-6">
          <KPIGrid columns={4}>
            <KPICard
              title="Gross Liquidity"
              value="₹2,450 Cr"
              subtitle="Total cash position"
              icon={Wallet}
              iconColor="bg-blue-500/10 text-blue-400"
              size="lg"
            />
            <KPICard
              title="Committed Outflows"
              value="₹560 Cr"
              subtitle="Next 30 days"
              icon={ArrowUpRight}
              iconColor="bg-red-500/10 text-red-400"
            />
            <KPICard
              title="Expected Inflows"
              value="₹420 Cr"
              subtitle="Next 30 days"
              icon={ArrowDownRight}
              iconColor="bg-emerald-500/10 text-emerald-400"
            />
            <KPICard
              title="Net Liquidity"
              value="₹1,890 Cr"
              subtitle="Available after commitments"
              icon={DollarSign}
              iconColor="bg-cyan-500/10 text-cyan-400"
            />
          </KPIGrid>
        </TabsContent>
      </Tabs>

      {/* Entity Detail Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedEntity?.entity}</DrawerTitle>
            <DrawerDescription>
              <Badge variant={selectedEntity?.type === 'parent' ? 'default' : 'secondary'}>
                {selectedEntity?.type?.toUpperCase()}
              </Badge>
            </DrawerDescription>
          </DrawerHeader>
          {selectedEntity && (
            <div className="p-6 space-y-6">
              <KPIGrid columns={3}>
                <KPICard
                  title="Closing Balance"
                  value={`₹${(selectedEntity.closingBalance / 10000000).toFixed(1)} Cr`}
                  size="sm"
                />
                <KPICard
                  title="Available Cash"
                  value={`₹${(selectedEntity.availableCash / 10000000).toFixed(1)} Cr`}
                  size="sm"
                />
                <KPICard
                  title="Net Liquidity"
                  value={`₹${(selectedEntity.netLiquidity / 10000000).toFixed(1)} Cr`}
                  size="sm"
                />
              </KPIGrid>

              <Section title="Today's Movement">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-sm text-emerald-400">Credits</div>
                    <div className="text-2xl font-bold text-emerald-400">
                      +₹{(selectedEntity.credits / 10000000).toFixed(1)} Cr
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="text-sm text-red-400">Debits</div>
                    <div className="text-2xl font-bold text-red-400">
                      -₹{(selectedEntity.debits / 10000000).toFixed(1)} Cr
                    </div>
                  </div>
                </div>
              </Section>

              <div className="flex gap-3">
                <Button className="flex-1" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  View Transactions
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600">
                  <ArrowRightLeft className="mr-2 h-4 w-4" />
                  Transfer Funds
                </Button>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </PageContainer>
  );
}
