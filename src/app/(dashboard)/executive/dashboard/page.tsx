'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { LineChart } from '@/components/shared/charts/line-chart';
import { BarChart } from '@/components/shared/charts/bar-chart';
import { PieChart } from '@/components/shared/charts/pie-chart';
import { AreaChart } from '@/components/shared/charts/area-chart';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { AIInsightsPanel } from '@/components/shared/ai-insight-card';
import { SectionItem, SectionNavigation } from '@/components/shared/section-navigation';
import { ExecutiveFilters } from '@/components/shared/executive-filters';
import { HealthStrip } from '@/components/shared/health-strip';
import { AlertFeed, mockExecutiveAlerts } from '@/components/shared/alert-feed';
import { ActivityTimeline, mockActivityEvents } from '@/components/shared/activity-timeline';
import { ForecastChart } from '@/components/shared/forecast-chart';
import { GaugeChart } from '@/components/shared/charts/gauge-chart';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Building2,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Percent,
  Target,
  Droplets,
  Receipt,
  FolderKanban,
  Shield,
  BarChart3,
  LineChart as LineChartIcon,
  PiggyBank,
  Landmark,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  CheckSquare,
  Activity,
} from 'lucide-react';

// ===== MOCK DATA =====

// Default executive dashboard sections
export const executiveDashboardSections: SectionItem[] = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'financials', label: 'Financials', icon: DollarSign },
  { id: 'liquidity', label: 'Liquidity', icon: Droplets },
  { id: 'debt', label: 'Debt', icon: CreditCard },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'revenue', label: 'Revenue', icon: Receipt },
  { id: 'risk', label: 'Risk', icon: TrendingUp },
  { id: 'forecast', label: 'Forecast', icon: LineChartIcon },
  { id: 'ai', label: 'AI', icon: Brain },
  { id: 'approvals', label: 'Approvals', icon: CheckSquare },
  { id: 'activity', label: 'Activity', icon: Activity },
];


// Section 2: Enterprise KPI Overview
const enterpriseKPIs = {
  availableCash: { value: '₹847.5 Cr', change: 12.4, sparkline: [650, 680, 720, 695, 750, 810, 847] },
  netCashPosition: { value: '₹723.2 Cr', change: 8.6, sparkline: [580, 610, 640, 620, 680, 700, 723] },
  revenueYTD: { value: '₹2,450 Cr', change: 15.2, sparkline: [180, 210, 245, 280, 320, 360, 408] },
  ebitdaYTD: { value: '₹612.5 Cr', change: 18.4, sparkline: [45, 52, 58, 65, 72, 80, 102] },
  workingCapital: { value: '₹245.6 Cr', change: 5.8, sparkline: [200, 210, 220, 225, 235, 240, 246] },
  netDebt: { value: '₹1,850 Cr', change: -2.4, sparkline: [1950, 1920, 1900, 1880, 1870, 1860, 1850] },
  enterpriseIRR: { value: '18.5%', change: 1.2 },
  enterpriseValue: { value: '₹8,500 Cr', change: 8.2 },
};

// Section 4: Financial Overview
const financialTrendData = [
  { label: 'Jan', revenue: 180, ebitda: 45, profit: 28 },
  { label: 'Feb', revenue: 195, ebitda: 48, profit: 30 },
  { label: 'Mar', revenue: 210, ebitda: 52, profit: 33 },
  { label: 'Apr', revenue: 225, ebitda: 55, profit: 35 },
  { label: 'May', revenue: 240, ebitda: 60, profit: 38 },
  { label: 'Jun', revenue: 255, ebitda: 63, profit: 40 },
  { label: 'Jul', revenue: 268, ebitda: 67, profit: 43 },
  { label: 'Aug', revenue: 285, ebitda: 71, profit: 45 },
  { label: 'Sep', revenue: 298, ebitda: 75, profit: 48 },
  { label: 'Oct', revenue: 315, ebitda: 79, profit: 50 },
  { label: 'Nov', revenue: 340, ebitda: 85, profit: 54 },
  { label: 'Dec', revenue: 365, ebitda: 92, profit: 58 },
];

// Section 5: Liquidity & Treasury
const cashDistributionData = [
  { label: 'Operating Cash', value: 320, color: '#3b82f6' },
  { label: 'Project Escrow', value: 215, color: '#22d3ee' },
  { label: 'DSRA', value: 125, color: '#10b981' },
  { label: 'FD/Investments', value: 150, color: '#f59e0b' },
  { label: 'Idle Cash', value: 45, color: '#ef4444' },
];

// Section 6: Debt & Loan Health
const debtCompositionData = [
  { label: 'Term Loans', value: 1850, color: '#3b82f6' },
  { label: 'Working Capital', value: 450, color: '#22d3ee' },
  { label: 'Construction Loans', value: 850, color: '#10b981' },
  { label: 'Bridge Finance', value: 250, color: '#f59e0b' },
  { label: 'ECB', value: 150, color: '#8b5cf6' },
  { label: 'NCDs', value: 250, color: '#ec4899' },
];

const debtMaturityData = [
  { label: '2025', value: 450, value2: 200 },
  { label: '2026', value: 680, value2: 350 },
  { label: '2027', value: 520, value2: 280 },
  { label: '2028', value: 890, value2: 420 },
  { label: '2029', value: 1260, value2: 600 },
];

// Section 7: Project Finance
interface Project {
  id: string;
  name: string;
  status: 'green' | 'yellow' | 'red';
  fundingPercent: number;
  irr: number;
  noi: number;
  riskScore: number;
  nextMilestone: string;
}

const projectData: Project[] = [
  { id: '1', name: 'Mumbai Metro Phase 1', status: 'green', fundingPercent: 85, irr: 22.5, noi: 45.2, riskScore: 18, nextMilestone: 'Track Completion Q2' },
  { id: '2', name: 'Gujarat Solar Park', status: 'yellow', fundingPercent: 72, irr: 19.8, noi: 28.5, riskScore: 32, nextMilestone: 'Grid Connection Q3' },
  { id: '3', name: 'Highway NH-48 Extension', status: 'green', fundingPercent: 90, irr: 16.2, noi: 38.4, riskScore: 15, nextMilestone: 'Phase 2 Launch Q1' },
  { id: '4', name: 'Pune Water Treatment', status: 'yellow', fundingPercent: 65, irr: 14.5, noi: 18.2, riskScore: 28, nextMilestone: 'Plant Commissioning Q4' },
  { id: '5', name: 'Hyderabad IT Park', status: 'green', fundingPercent: 95, irr: 24.8, noi: 52.1, riskScore: 12, nextMilestone: 'Tenant Occupancy Q2' },
  { id: '6', name: 'Chennai Port Expansion', status: 'red', fundingPercent: 58, irr: 12.4, noi: 15.8, riskScore: 45, nextMilestone: 'Funding Review Q1' },
];

const projectColumns: Column<Project>[] = [
  { id: 'name', header: 'Project', accessor: 'name' },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'green' ? 'success' : row.status === 'yellow' ? 'warning' : 'danger'}>
        {row.status === 'green' ? 'On Track' : row.status === 'yellow' ? 'At Risk' : 'Critical'}
      </Badge>
    ),
  },
  {
    id: 'fundingPercent',
    header: 'Funding',
    accessor: (row) => `${row.fundingPercent}%`,
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Progress value={row.fundingPercent} className="h-2 w-16" />
        <span className="text-sm">{row.fundingPercent}%</span>
      </div>
    ),
  },
  { id: 'irr', header: 'IRR', accessor: (row) => `${row.irr}%`, align: 'right' },
  { id: 'noi', header: 'NOI (Cr)', accessor: (row) => `₹${row.noi}`, align: 'right' },
  {
    id: 'riskScore',
    header: 'Risk',
    accessor: (row) => row.riskScore,
    cell: (row) => (
      <Badge variant={row.riskScore < 20 ? 'success' : row.riskScore < 35 ? 'warning' : 'danger'}>
        {row.riskScore}/100
      </Badge>
    ),
  },
  { id: 'nextMilestone', header: 'Next Milestone', accessor: 'nextMilestone' },
];

// Section 8: Revenue & Collections
const collectionTrendData = [
  { label: 'Jan', collections: 120, target: 130 },
  { label: 'Feb', collections: 135, target: 135 },
  { label: 'Mar', collections: 142, target: 140 },
  { label: 'Apr', collections: 128, target: 145 },
  { label: 'May', collections: 155, target: 150 },
  { label: 'Jun', collections: 148, target: 155 },
  { label: 'Jul', collections: 162, target: 160 },
  { label: 'Aug', collections: 158, target: 165 },
  { label: 'Sep', collections: 175, target: 170 },
  { label: 'Oct', collections: 168, target: 175 },
  { label: 'Nov', collections: 182, target: 180 },
  { label: 'Dec', collections: 190, target: 185 },
];

const agingData = [
  { label: '0-30 days', value: 185, color: '#10b981' },
  { label: '31-60 days', value: 95, color: '#22d3ee' },
  { label: '61-90 days', value: 65, color: '#f59e0b' },
  { label: '91-120 days', value: 45, color: '#f97316' },
  { label: '121-180 days', value: 35, color: '#ef4444' },
  { label: '180+ days', value: 60, color: '#dc2626' },
];

// Section 9: Investment & Treasury
const portfolioAllocationData = [
  { label: 'Fixed Deposits', value: 450, color: '#3b82f6' },
  { label: 'Liquid Funds', value: 125, color: '#22d3ee' },
  { label: 'Debt Funds', value: 85, color: '#10b981' },
  { label: 'Treasury Bills', value: 45, color: '#f59e0b' },
  { label: 'Commercial Papers', value: 35, color: '#8b5cf6' },
  { label: 'Corp Bonds', value: 60, color: '#ec4899' },
];

// Section 10: Risk & Compliance
const riskTrendData = [
  { label: 'Jan', financial: 25, liquidity: 18, treasury: 22, compliance: 15 },
  { label: 'Feb', financial: 23, liquidity: 20, treasury: 20, compliance: 14 },
  { label: 'Mar', financial: 28, liquidity: 22, treasury: 24, compliance: 16 },
  { label: 'Apr', financial: 24, liquidity: 19, treasury: 21, compliance: 13 },
  { label: 'May', financial: 22, liquidity: 17, treasury: 19, compliance: 12 },
  { label: 'Jun', financial: 26, liquidity: 21, treasury: 23, compliance: 15 },
];

// Section 12: AI Intelligence
const aiRecommendations = [
  {
    title: 'Optimize Liquidity Distribution',
    insight: 'Redistribute ₹45 Cr from HDFC Current to overnight liquid fund for +₹2.3L daily yield.',
    type: 'opportunity' as const,
    confidence: 94,
    impact: 'high' as const,
    impactValue: '+₹8.4L/month',
  },
  {
    title: 'Refinancing Opportunity',
    insight: '₹200 Cr loan at 10.5% can be refinanced at 9.25% - potential savings ₹2.5 Cr/year.',
    type: 'recommendation' as const,
    confidence: 91,
    impact: 'high' as const,
    impactValue: '+₹2.5 Cr/yr',
  },
  {
    title: 'Collection Acceleration',
    insight: 'Prioritize follow-up on ₹85 Cr overdue from Metro Phase 1 - 30 day delay impacting cash flow.',
    type: 'warning' as const,
    confidence: 87,
    impact: 'high' as const,
  },
  {
    title: 'FX Hedge Recommendation',
    insight: 'USD exposure increased to $45M with 65% hedged. Consider forward contract for remaining $15M.',
    type: 'recommendation' as const,
    confidence: 89,
    impact: 'medium' as const,
  },
  {
    title: 'Covenant Early Warning',
    insight: 'DSCR at 1.32x approaching 1.25x minimum. Accelerate collections or defer non-essential capex.',
    type: 'warning' as const,
    confidence: 92,
    impact: 'high' as const,
  },
];

// Section 13: Approvals
interface PendingApproval {
  id: string;
  type: string;
  description: string;
  entity: string;
  project: string;
  amount: number;
  requestedBy: string;
  requestedDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'urgent';
  slaHours: number;
}

const pendingApprovals: PendingApproval[] = [
  { id: '1', type: 'Payment', description: 'Vendor payment - L&T Construction', entity: 'Zenith Infrastructure', project: 'Mumbai Metro', amount: 45000000, requestedBy: 'Rajesh Kumar', requestedDate: new Date(Date.now() - 1000 * 60 * 30), priority: 'high', status: 'urgent', slaHours: 2 },
  { id: '2', type: 'Transfer', description: 'Inter-company transfer', entity: 'Zenith Energy SPV', project: 'Solar Park', amount: 25000000, requestedBy: 'Priya Singh', requestedDate: new Date(Date.now() - 1000 * 60 * 60 * 2), priority: 'medium', status: 'pending', slaHours: 8 },
  { id: '3', type: 'Investment', description: 'FD renewal - HDFC Bank', entity: 'Zenith Group', project: '-', amount: 100000000, requestedBy: 'Amit Patel', requestedDate: new Date(Date.now() - 1000 * 60 * 60 * 4), priority: 'high', status: 'pending', slaHours: 12 },
  { id: '4', type: 'Payment', description: 'Loan interest payment - SBI', entity: 'Zenith Realty', project: 'Highway NH-48', amount: 12500000, requestedBy: 'System', requestedDate: new Date(Date.now() - 1000 * 60 * 60 * 6), priority: 'high', status: 'urgent', slaHours: 1 },
  { id: '5', type: 'Drawdown', description: 'Construction loan draw', entity: 'Metro SPV', project: 'Mumbai Metro', amount: 85000000, requestedBy: 'Project Team', requestedDate: new Date(Date.now() - 1000 * 60 * 60 * 8), priority: 'medium', status: 'pending', slaHours: 24 },
];

const approvalColumns: Column<PendingApproval>[] = [
  { id: 'type', header: 'Type', accessor: 'type', cell: (row) => <Badge variant="outline">{row.type}</Badge> },
  { id: 'description', header: 'Description', accessor: 'description' },
  { id: 'entity', header: 'Entity', accessor: 'entity' },
  { id: 'project', header: 'Project', accessor: 'project' },
  { id: 'amount', header: 'Amount', accessor: (row) => `₹${(row.amount / 10000000).toFixed(2)} Cr`, align: 'right' },
  { id: 'requestedBy', header: 'Requested By', accessor: 'requestedBy' },
  { id: 'priority', header: 'Priority', accessor: 'priority', cell: (row) => <Badge variant={row.priority === 'high' ? 'danger' : row.priority === 'medium' ? 'warning' : 'secondary'}>{row.priority}</Badge> },
  {
    id: 'sla', header: 'SLA', accessor: (row) => `${row.slaHours}h`, cell: (row) => (
      <div className={`flex items-center gap-1 ${row.slaHours <= 2 ? 'text-red-400' : row.slaHours <= 8 ? 'text-yellow-400' : 'text-slate-400'}`}>
        <Clock className="h-3 w-3" />
        {row.slaHours}h
      </div>
    )
  },
  {
    id: 'status', header: 'Status', accessor: 'status', cell: (row) => row.status === 'urgent' ? (
      <div className="flex items-center gap-1 text-red-400"><AlertTriangle className="h-4 w-4" />Urgent</div>
    ) : (
      <div className="flex items-center gap-1 text-yellow-400"><Clock className="h-4 w-4" />Pending</div>
    )
  },
];

// ===== COMPONENT =====

export default function ExecutiveDashboardPage() {
  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader
        title="Executive Dashboard"
        description="Real-time overview of your financial operations"
        breadcrumbs={[
          { label: 'Executive Intelligence', href: '/executive' },
          { label: 'Dashboard' },
        ]}
        showAI
        showRefresh
        showExport
        showSavedViews
      />

      {/* Executive Filters */}
      <div className="sticky top-0 z-50 -mx-6 bg-slate-950/95 px-6 py-4 backdrop-blur-sm">
        <ExecutiveFilters compact />
        {/* </div> */}

        {/* Section Navigation */}
        <SectionNavigation sections={executiveDashboardSections} className="-mx-6 mb-6" />
      </div>

      {/* SECTION 1: Executive Health Strip */}
      <Section id="overview" className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Executive Health</h2>
        <HealthStrip />
      </Section>

      {/* SECTION 2: Enterprise KPI Overview */}
      <Section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Enterprise KPI Overview</h2>
        <KPIGrid columns={4}>
          <KPICard title="Available Cash" value={enterpriseKPIs.availableCash.value} change={enterpriseKPIs.availableCash.change} trend="up" icon={Wallet} iconColor="bg-blue-500/10 text-blue-400" sparkline={enterpriseKPIs.availableCash.sparkline} size="lg" />
          <KPICard title="Net Cash Position" value={enterpriseKPIs.netCashPosition.value} change={enterpriseKPIs.netCashPosition.change} trend="up" icon={DollarSign} iconColor="bg-cyan-500/10 text-cyan-400" sparkline={enterpriseKPIs.netCashPosition.sparkline} size="lg" />
          <KPICard title="Revenue (YTD)" value={enterpriseKPIs.revenueYTD.value} change={enterpriseKPIs.revenueYTD.change} trend="up" icon={Receipt} iconColor="bg-emerald-500/10 text-emerald-400" sparkline={enterpriseKPIs.revenueYTD.sparkline} size="lg" />
          <KPICard title="EBITDA (YTD)" value={enterpriseKPIs.ebitdaYTD.value} change={enterpriseKPIs.ebitdaYTD.change} trend="up" icon={TrendingUp} iconColor="bg-green-500/10 text-green-400" sparkline={enterpriseKPIs.ebitdaYTD.sparkline} size="lg" />
        </KPIGrid>
        <KPIGrid columns={4} className="mt-4">
          <KPICard title="Working Capital" value={enterpriseKPIs.workingCapital.value} change={enterpriseKPIs.workingCapital.change} trend="up" icon={BarChart3} sparkline={enterpriseKPIs.workingCapital.sparkline} />
          <KPICard title="Net Debt" value={enterpriseKPIs.netDebt.value} change={enterpriseKPIs.netDebt.change} trend="down" trendColor="green" icon={CreditCard} sparkline={enterpriseKPIs.netDebt.sparkline} />
          <KPICard title="Enterprise IRR" value={enterpriseKPIs.enterpriseIRR.value} change={enterpriseKPIs.enterpriseIRR.change} trend="up" icon={Target} />
          <KPICard title="Enterprise Value" value={enterpriseKPIs.enterpriseValue.value} change={enterpriseKPIs.enterpriseValue.change} trend="up" icon={Building2} />
        </KPIGrid>
      </Section>

      {/* SECTION 3: Executive Alerts */}
      <Section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Executive Alerts</h2>
          <Button variant="outline" size="sm">View All Alerts</Button>
        </div>
        <AlertFeed alerts={mockExecutiveAlerts} maxItems={4} />
      </Section>

      {/* SECTION 4: Financial Overview */}
      <Section id="financials" className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Financial Overview</h2>
        <KPIGrid columns={6}>
          <KPICard title="Revenue (YTD)" value="₹2,450 Cr" change={15.2} trend="up" icon={Receipt} size="sm" />
          <KPICard title="EBITDA (YTD)" value="₹612.5 Cr" change={18.4} trend="up" icon={TrendingUp} size="sm" />
          <KPICard title="NOI (YTD)" value="₹485.2 Cr" change={12.8} trend="up" icon={BarChart3} size="sm" />
          <KPICard title="NDCF (YTD)" value="₹320.4 Cr" change={22.1} trend="up" icon={ArrowUpRight} size="sm" />
          <KPICard title="Net Profit (YTD)" value="₹245.8 Cr" change={14.6} trend="up" icon={DollarSign} size="sm" />
          <KPICard title="Operating Margin" value="25.0%" change={1.2} trend="up" icon={Percent} size="sm" />
        </KPIGrid>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <LineChart data={financialTrendData} title="Revenue Trend" height={250} legend={[{ label: 'Revenue', color: '#3b82f6' }]} formatValue={(v) => `₹${v} Cr`} />
          <LineChart data={financialTrendData.map(d => ({ label: d.label, value: d.ebitda }))} title="EBITDA Trend" height={250} legend={[{ label: 'EBITDA', color: '#10b981' }]} formatValue={(v) => `₹${v} Cr`} />
          <LineChart data={financialTrendData.map(d => ({ label: d.label, value: d.profit }))} title="Profit Trend" height={250} legend={[{ label: 'Profit', color: '#22d3ee' }]} formatValue={(v) => `₹${v} Cr`} />
        </div>
      </Section>

      {/* SECTION 5: Liquidity & Treasury */}
      <Section id="liquidity" className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Liquidity & Treasury</h2>
        <KPIGrid columns={4}>
          <KPICard title="Available Cash" value="₹847.5 Cr" change={12.4} trend="up" icon={Wallet} />
          <KPICard title="Available Credit Lines" value="₹450 Cr" subtitle="Undrawn facilities" icon={Landmark} />
          <KPICard title="Liquidity Ratio" value="1.85x" change={0.12} trend="up" icon={Droplets} />
          <KPICard title="Treasury Health Score" value="85/100" change={3} trend="up" icon={Shield} />
        </KPIGrid>
        <KPIGrid columns={4} className="mt-4">
          <KPICard title="Cash Pool Balance" value="₹320 Cr" change={8.2} trend="up" icon={PiggyBank} size="sm" />
          <KPICard title="Idle Cash" value="₹45.2 Cr" change={-15.4} trend="down" trendColor="green" icon={AlertTriangle} size="sm" />
          <KPICard title="DSRA" value="₹125 Cr" subtitle="100% funded" icon={Shield} size="sm" />
          <KPICard title="MMR" value="₹85 Cr" subtitle="100% funded" icon={Shield} size="sm" />
        </KPIGrid>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <GaugeChart value={185} maxValue={300} title="Liquidity Ratio" unit="x" thresholds={{ low: 33, medium: 50, high: 67 }} />
          <PieChart data={cashDistributionData} title="Cash Distribution" size={180} innerRadius={0.6} centerValue="₹855 Cr" centerLabel="Total" formatValue={(v) => `₹${v} Cr`} />
          <AreaChart data={[
            { label: 'Week 1', value: 820 },
            { label: 'Week 2', value: 845 },
            { label: 'Week 3', value: 830 },
            { label: 'Week 4', value: 855 },
            { label: 'Week 5', value: 875 },
            { label: 'Week 6', value: 890 },
          ]} title="Liquidity Trend (90 Days)" height={200} formatValue={(v) => `₹${v} Cr`} />
        </div>
      </Section>

      {/* SECTION 6: Debt & Loan Health */}
      <Section id="debt" className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Debt & Loan Health</h2>
        <KPIGrid columns={4}>
          <KPICard title="Total Debt" value="₹3,800 Cr" change={-2.4} trend="down" trendColor="green" icon={CreditCard} />
          <KPICard title="Debt-to-Equity" value="1.24x" change={-0.08} trend="down" trendColor="green" icon={Percent} />
          <KPICard title="DSCR" value="1.45x" change={0.05} trend="up" icon={Shield} />
          <KPICard title="ICR" value="2.85x" change={0.12} trend="up" icon={Target} />
        </KPIGrid>
        <KPIGrid columns={4} className="mt-4">
          <KPICard title="Avg Interest Rate" value="9.25%" change={-0.15} trend="down" trendColor="green" size="sm" />
          <KPICard title="Floating Debt %" value="35%" change={-2} trend="down" trendColor="green" size="sm" />
          <KPICard title="Fixed Debt %" value="65%" change={2} trend="up" size="sm" />
          <KPICard title="Loan Utilization" value="78%" change={3} trend="up" size="sm" />
        </KPIGrid>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <BarChart data={debtMaturityData} title="Debt Maturity Timeline" height={250} legend={[{ label: 'Principal', color: '#3b82f6' }, { label: 'Interest', color: '#22d3ee' }]} formatValue={(v) => `₹${v} Cr`} />
          <PieChart data={debtCompositionData} title="Debt Composition" size={200} innerRadius={0.5} formatValue={(v) => `₹${v} Cr`} />
        </div>
      </Section>

      {/* SECTION 7: Project Finance */}
      <Section id="projects" className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Project Finance</h2>
        <KPIGrid columns={4}>
          <KPICard title="Total Projects" value="24" change={2} trend="up" icon={FolderKanban} />
          <KPICard title="Funded Projects" value="18" subtitle="75% of portfolio" icon={CheckCircle2} />
          <KPICard title="Underfunded Projects" value="6" subtitle="Needs attention" icon={AlertTriangle} />
          <KPICard title="Enterprise IRR" value="18.5%" change={1.2} trend="up" icon={Target} />
        </KPIGrid>
        <KPIGrid columns={4} className="mt-4">
          <KPICard title="Average NOI" value="₹20.2 Cr" change={8.4} trend="up" size="sm" />
          <KPICard title="Average NDCF" value="₹13.4 Cr" change={12.2} trend="up" size="sm" />
          <KPICard title="Drawdown Utilization" value="72%" change={5} trend="up" size="sm" />
          <KPICard title="Capital Deployment" value="₹2,450 Cr" change={18} trend="up" size="sm" />
        </KPIGrid>
        <div className="mt-6">
          <DataTable data={projectData} columns={projectColumns} hoverable compact />
        </div>
      </Section>

      {/* SECTION 8: Revenue & Collections */}
      <Section id="revenue" className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Revenue & Collections</h2>
        <KPIGrid columns={6}>
          <KPICard title="Revenue (MTD)" value="₹245 Cr" change={15.2} trend="up" icon={Receipt} size="sm" />
          <KPICard title="Collections (MTD)" value="₹156.8 Cr" change={8.2} trend="up" icon={ArrowUpRight} size="sm" />
          <KPICard title="Receivables" value="₹485 Cr" change={-5.4} trend="down" trendColor="green" icon={Clock} size="sm" />
          <KPICard title="DSO" value="42 days" change={-3} trend="down" trendColor="green" icon={Clock} size="sm" />
          <KPICard title="Booking Collections" value="₹85 Cr" change={22} trend="up" icon={Building2} size="sm" />
          <KPICard title="Rental Income" value="₹45 Cr" change={5.2} trend="up" icon={Landmark} size="sm" />
        </KPIGrid>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <LineChart data={collectionTrendData} title="Collection Trend" height={250} legend={[{ label: 'Collections', color: '#3b82f6' }, { label: 'Target', color: '#22d3ee' }]} formatValue={(v) => `₹${v} Cr`} />
          <BarChart data={agingData.map(d => ({ label: d.label, value: d.value }))} title="Aging Analysis" height={250} formatValue={(v) => `₹${v} Cr`} />
        </div>
      </Section>

      {/* SECTION 9: Investment & Treasury */}
      <Section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Investment & Treasury</h2>
        <KPIGrid columns={6}>
          <KPICard title="Fixed Deposits" value="₹450 Cr" change={5.2} trend="up" icon={PiggyBank} size="sm" />
          <KPICard title="Liquid Funds" value="₹125 Cr" change={12.4} trend="up" icon={Droplets} size="sm" />
          <KPICard title="Treasury Investments" value="₹85 Cr" change={8.6} trend="up" icon={TrendingUp} size="sm" />
          <KPICard title="Investment Yield" value="7.25%" change={0.15} trend="up" icon={Percent} size="sm" />
          <KPICard title="Idle Cash" value="₹45.2 Cr" change={-15.4} trend="down" trendColor="green" icon={AlertTriangle} size="sm" />
          <KPICard title="Investment Return (YTD)" value="₹42.5 Cr" change={18.2} trend="up" icon={DollarSign} size="sm" />
        </KPIGrid>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <PieChart data={portfolioAllocationData} title="Portfolio Allocation" size={200} innerRadius={0.5} formatValue={(v) => `₹${v} Cr`} />
          <BarChart data={[
            { label: 'Jan', value: 680 },
            { label: 'Feb', value: 720 },
            { label: 'Mar', value: 695 },
            { label: 'Apr', value: 750 },
            { label: 'May', value: 790 },
            { label: 'Jun', value: 800 },
          ]} title="Investment Maturity Schedule" height={250} formatValue={(v) => `₹${v} Cr`} />
        </div>
      </Section>

      {/* SECTION 10: Enterprise Risk & Compliance */}
      <Section id="risk" className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Enterprise Risk & Compliance</h2>
        <KPIGrid columns={5}>
          <KPICard title="DSCR" value="1.45x" change={0.05} trend="up" icon={Shield} size="sm" />
          <KPICard title="ICR" value="2.85x" change={0.12} trend="up" icon={Target} size="sm" />
          <KPICard title="Debt-to-Equity" value="1.24x" change={-0.08} trend="down" trendColor="green" size="sm" />
          <KPICard title="LTV" value="65%" change={-2} trend="down" trendColor="green" size="sm" />
          <KPICard title="Liquidity Risk" value="15/100" subtitle="Low risk" icon={Droplets} size="sm" />
        </KPIGrid>
        <KPIGrid columns={5} className="mt-4">
          <KPICard title="Interest Rate Risk" value="25/100" subtitle="Moderate" icon={Percent} size="sm" />
          <KPICard title="FX Risk" value="18/100" subtitle="Low" icon={DollarSign} size="sm" />
          <KPICard title="Covenant Score" value="92/100" change={2} trend="up" icon={CheckCircle2} size="sm" />
          <KPICard title="Fraud Risk" value="8/100" subtitle="Very low" icon={Shield} size="sm" />
          <KPICard title="ESG Score" value="78/100" change={3} trend="up" icon={Target} size="sm" />
        </KPIGrid>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <LineChart data={riskTrendData.map(d => ({ label: d.label, value: d.financial, value2: d.liquidity }))} title="Risk Trend (12 Months)" height={250} legend={[{ label: 'Financial Risk', color: '#ef4444' }, { label: 'Liquidity Risk', color: '#3b82f6' }]} />
          <Card className="border-slate-800 bg-slate-900/50 p-4">
            <h4 className="mb-4 text-sm font-medium text-slate-400">Covenant Status</h4>
            <div className="space-y-3">
              {[
                { name: 'DSCR', current: 1.45, minimum: 1.25, status: 'green' },
                { name: 'ICR', current: 2.85, minimum: 2.0, status: 'green' },
                { name: 'LTV', current: 65, maximum: 75, status: 'yellow' },
                { name: 'Net Worth', current: 850, minimum: 500, status: 'green' },
              ].map((covenant) => (
                <div key={covenant.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${covenant.status === 'green' ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                    <span className="text-sm text-white">{covenant.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400">Current: <span className="text-white">{covenant.current}{covenant.name === 'LTV' ? '%' : covenant.name === 'Net Worth' ? ' Cr' : 'x'}</span></span>
                    <span className="text-xs text-slate-500">{covenant.minimum ? `Min: ${covenant.minimum}` : `Max: ${covenant.maximum}`}{covenant.name === 'LTV' ? '%' : covenant.name === 'Net Worth' ? ' Cr' : 'x'}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* SECTION 11: Enterprise Forecast */}
      <Section id="forecast" className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Enterprise Forecast</h2>
        <ForecastChart />
      </Section>

      {/* SECTION 12: AI Executive Intelligence */}
      <Section id="ai" className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">AI Executive Intelligence</h2>
        <AIInsightsPanel insights={aiRecommendations} />
      </Section>

      {/* SECTION 13: Executive Approvals */}
      <Section id="approvals" className="mb-8" title="Executive Approvals" description="Items requiring your attention" actions={
        <div className="flex items-center gap-2">
          <Badge variant="danger">{pendingApprovals.filter((a) => a.status === 'urgent').length} Urgent</Badge>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      }>
        <DataTable data={pendingApprovals} columns={approvalColumns} actions={[
          { label: 'Approve', onClick: () => { } },
          { label: 'Reject', onClick: () => { }, variant: 'danger' },
          { label: 'Delegate', onClick: () => { } },
        ]} hoverable compact />
      </Section>

      {/* SECTION 14: Enterprise Activity Timeline */}
      <Section id="activity" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Enterprise Activity Timeline</h2>
          <Button variant="outline" size="sm">View Full History</Button>
        </div>
        <ActivityTimeline events={mockActivityEvents} maxItems={8} showFilters />
      </Section>
    </PageContainer>
  );
}
