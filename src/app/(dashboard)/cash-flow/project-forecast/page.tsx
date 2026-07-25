'use client';

import { useState } from 'react';
import {
  FolderKanban,
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
  Target,
  Building2,
  Hammer,
  Milestone,
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
} from '@/components/shared';
import { CashFlowFilters, CashFlowFilterState } from '@/components/shared/cash-flow-filters';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { projectForecastTabs } from '@/config/cash-flow-navigation';

// Mock data for KPIs
const kpiData = {
  activeProjects: { value: 8, change: 2, trend: 'up' as const },
  totalBudget: { value: 2450.0, change: 15.5, trend: 'up' as const },
  spent: { value: 1234.5, change: 8.2, trend: 'up' as const },
  remaining: { value: 1215.5, change: -3.8, trend: 'down' as const },
  cashRequired90Days: { value: 345.6, change: 12.4, trend: 'up' as const },
  avgCompletion: { value: 52, change: 4.5, trend: 'up' as const },
  delayedMilestones: { value: 5, change: -2, trend: 'down' as const },
  fundingGap: { value: 45.8, change: -12.5, trend: 'down' as const },
};

// Mock data for project milestones
const projectMilestones = [
  {
    id: 'PM001',
    projectId: 'PRJ001',
    projectName: 'Marina Bay Towers',
    milestoneName: 'Floor 20-25 Structural Work',
    milestoneType: 'Construction',
    targetDate: '2026-08-15',
    estimatedCompletion: '2026-08-20',
    cashRequired: 45.8,
    fundingStatus: 'funded',
    completionPercent: 78,
    status: 'on_track',
    dependencies: 2,
  },
  {
    id: 'PM002',
    projectId: 'PRJ002',
    projectName: 'Downtown Plaza',
    milestoneName: 'Podium Level Completion',
    milestoneType: 'Construction',
    targetDate: '2026-07-30',
    estimatedCompletion: '2026-08-10',
    cashRequired: 68.5,
    fundingStatus: 'partial',
    completionPercent: 65,
    status: 'delayed',
    dependencies: 3,
  },
  {
    id: 'PM003',
    projectId: 'PRJ003',
    projectName: 'Tech Park Phase 2',
    milestoneName: 'MEP Installation - Building A',
    milestoneType: 'MEP',
    targetDate: '2026-08-25',
    estimatedCompletion: '2026-08-25',
    cashRequired: 32.4,
    fundingStatus: 'funded',
    completionPercent: 45,
    status: 'on_track',
    dependencies: 1,
  },
  {
    id: 'PM004',
    projectId: 'PRJ004',
    projectName: 'Green Valley Villas',
    milestoneName: 'Phase 2 Foundation',
    milestoneType: 'Foundation',
    targetDate: '2026-08-05',
    estimatedCompletion: '2026-08-05',
    cashRequired: 28.6,
    fundingStatus: 'funded',
    completionPercent: 85,
    status: 'ahead',
    dependencies: 0,
  },
  {
    id: 'PM005',
    projectId: 'PRJ001',
    projectName: 'Marina Bay Towers',
    milestoneName: 'Floor 25-30 Structural Work',
    milestoneType: 'Construction',
    targetDate: '2026-09-15',
    estimatedCompletion: '2026-09-20',
    cashRequired: 52.4,
    fundingStatus: 'pending',
    completionPercent: 0,
    status: 'upcoming',
    dependencies: 1,
  },
];

// Mock data for construction progress
const constructionProgress = [
  {
    id: 'CP001',
    projectName: 'Marina Bay Towers',
    projectType: 'Residential',
    totalUnits: 450,
    soldUnits: 385,
    overallProgress: 72,
    structuralProgress: 78,
    mepProgress: 45,
    finishingProgress: 25,
    expectedCompletion: '2027-06-30',
    budgetUtilization: 68,
    status: 'on_track',
  },
  {
    id: 'CP002',
    projectName: 'Downtown Plaza',
    projectType: 'Commercial',
    totalUnits: 120,
    soldUnits: 85,
    overallProgress: 48,
    structuralProgress: 65,
    mepProgress: 30,
    finishingProgress: 10,
    expectedCompletion: '2028-03-31',
    budgetUtilization: 52,
    status: 'delayed',
  },
  {
    id: 'CP003',
    projectName: 'Tech Park Phase 2',
    projectType: 'Commercial',
    totalUnits: 3,
    soldUnits: 2,
    overallProgress: 55,
    structuralProgress: 82,
    mepProgress: 45,
    finishingProgress: 20,
    expectedCompletion: '2027-12-31',
    budgetUtilization: 58,
    status: 'on_track',
  },
  {
    id: 'CP004',
    projectName: 'Green Valley Villas',
    projectType: 'Residential',
    totalUnits: 65,
    soldUnits: 58,
    overallProgress: 38,
    structuralProgress: 45,
    mepProgress: 15,
    finishingProgress: 5,
    expectedCompletion: '2028-06-30',
    budgetUtilization: 42,
    status: 'on_track',
  },
  {
    id: 'CP005',
    projectName: 'Skyline Residency',
    projectType: 'Residential',
    totalUnits: 280,
    soldUnits: 195,
    overallProgress: 62,
    structuralProgress: 75,
    mepProgress: 50,
    finishingProgress: 30,
    expectedCompletion: '2027-09-30',
    budgetUtilization: 65,
    status: 'on_track',
  },
];

// Mock data for cash requirements
const cashRequirements = [
  {
    id: 'CR001',
    projectName: 'Marina Bay Towers',
    period: 'Aug 2026',
    construction: 45.8,
    materials: 18.5,
    labor: 12.4,
    mep: 8.6,
    other: 5.2,
    total: 90.5,
    fundedAmount: 85.0,
    gap: 5.5,
    fundingSource: 'SBI Construction Finance',
  },
  {
    id: 'CR002',
    projectName: 'Downtown Plaza',
    period: 'Aug 2026',
    construction: 68.5,
    materials: 24.8,
    labor: 15.6,
    mep: 12.4,
    other: 8.2,
    total: 129.5,
    fundedAmount: 95.0,
    gap: 34.5,
    fundingSource: 'ICICI Project Finance',
  },
  {
    id: 'CR003',
    projectName: 'Tech Park Phase 2',
    period: 'Aug 2026',
    construction: 32.4,
    materials: 12.5,
    labor: 8.4,
    mep: 15.8,
    other: 4.5,
    total: 73.6,
    fundedAmount: 73.6,
    gap: 0,
    fundingSource: 'SBI Term Loan',
  },
  {
    id: 'CR004',
    projectName: 'Green Valley Villas',
    period: 'Aug 2026',
    construction: 28.6,
    materials: 10.2,
    labor: 6.8,
    mep: 4.5,
    other: 2.8,
    total: 52.9,
    fundedAmount: 47.1,
    gap: 5.8,
    fundingSource: 'PNB Term Loan',
  },
];

// Mock data for funding timeline
const fundingTimeline = [
  {
    id: 'FT001',
    projectName: 'Marina Bay Towers',
    milestone: 'Floor 20-25 Completion',
    expectedDate: '2026-08-15',
    requiredFunding: 45.8,
    source: 'SBI CF - Tranche 4',
    status: 'approved',
    disbursementDate: '2026-08-10',
  },
  {
    id: 'FT002',
    projectName: 'Downtown Plaza',
    milestone: 'Podium Completion',
    expectedDate: '2026-08-10',
    requiredFunding: 68.5,
    source: 'ICICI PF - Tranche 3',
    status: 'pending',
    disbursementDate: '-',
  },
  {
    id: 'FT003',
    projectName: 'Tech Park Phase 2',
    milestone: 'MEP Installation',
    expectedDate: '2026-08-25',
    requiredFunding: 32.4,
    source: 'SBI TL - Tranche 2',
    status: 'approved',
    disbursementDate: '2026-08-20',
  },
  {
    id: 'FT004',
    projectName: 'Marina Bay Towers',
    milestone: 'Floor 25-30 Start',
    expectedDate: '2026-09-15',
    requiredFunding: 52.4,
    source: 'SBI CF - Tranche 5',
    status: 'in_process',
    disbursementDate: '-',
  },
];

// Mock data for project forecast
const projectForecastData = [
  { month: 'Aug 26', required: 346.5, funded: 300.7, gap: 45.8 },
  { month: 'Sep 26', required: 298.4, funded: 285.0, gap: 13.4 },
  { month: 'Oct 26', required: 312.8, funded: 312.8, gap: 0 },
  { month: 'Nov 26', required: 285.6, funded: 275.0, gap: 10.6 },
  { month: 'Dec 26', required: 256.4, funded: 256.4, gap: 0 },
  { month: 'Jan 27', required: 278.2, funded: 268.0, gap: 10.2 },
];

// Mock data for spend by category
const spendByCategory = [
  { name: 'Construction', value: 685.4, color: '#3b82f6' },
  { name: 'Materials', value: 312.5, color: '#10b981' },
  { name: 'MEP', value: 156.8, color: '#f59e0b' },
  { name: 'Labor', value: 89.4, color: '#8b5cf6' },
  { name: 'Other', value: 45.2, color: '#6b7280' },
];

// AI Insights
const aiInsights = [
  {
    id: 'ai1',
    type: 'warning' as const,
    title: 'Funding Gap Alert',
    description: 'Downtown Plaza shows ₹34.5 Cr funding gap for Aug 2026. Customer collections can cover ₹18.5 Cr.',
    impact: '₹16 Cr shortfall',
    confidence: 92,
    action: 'Request Disbursement',
  },
  {
    id: 'ai2',
    type: 'opportunity' as const,
    title: 'Accelerate Green Valley',
    description: 'Green Valley Villas is 10 days ahead of schedule. Advancing milestone can unlock ₹12.4 Cr in customer payments.',
    impact: '+₹12.4 Cr inflow',
    confidence: 88,
    action: 'Accelerate Schedule',
  },
  {
    id: 'ai3',
    type: 'insight' as const,
    title: 'Material Cost Optimization',
    description: 'Bulk ordering steel across 3 projects can save ₹8.5 Cr. JSW Steel offering 3% discount.',
    impact: '+₹8.5 Cr savings',
    confidence: 85,
    action: 'Consolidate Orders',
  },
];

export default function ProjectCompletionForecastPage() {
  const [activeTab, setActiveTab] = useState('milestones');
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
  const [selectedMilestone, setSelectedMilestone] = useState<typeof projectMilestones[0] | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof constructionProgress[0] | null>(null);

  const milestoneColumns: Column<typeof projectMilestones[0]>[] = [
    {
      key: 'projectName',
      header: 'Project',
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-medium">{row.projectName}</div>
          <div className="text-xs text-muted-foreground">{row.milestoneName}</div>
        </div>
      ),
    },
    {
      key: 'milestoneType',
      header: 'Type',
      render: (row) => (
        <Badge variant="outline">{row.milestoneType}</Badge>
      ),
    },
    {
      key: 'targetDate',
      header: 'Target',
      sortable: true,
      render: (row) => new Date(row.targetDate).toLocaleDateString('en-IN'),
    },
    {
      key: 'estimatedCompletion',
      header: 'Est. Completion',
      render: (row) => (
        <span className={new Date(row.estimatedCompletion) > new Date(row.targetDate) ? 'text-amber-400' : ''}>
          {new Date(row.estimatedCompletion).toLocaleDateString('en-IN')}
        </span>
      ),
    },
    {
      key: 'cashRequired',
      header: 'Cash Required',
      align: 'right' as const,
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-red-400">₹{row.cashRequired.toFixed(1)} Cr</span>
      ),
    },
    {
      key: 'completionPercent',
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
      key: 'fundingStatus',
      header: 'Funding',
      render: (row) => (
        <Badge
          variant={
            row.fundingStatus === 'funded' ? 'default' :
            row.fundingStatus === 'partial' ? 'secondary' : 'destructive'
          }
        >
          {row.fundingStatus}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'ahead' ? 'default' :
            row.status === 'on_track' ? 'secondary' :
            row.status === 'delayed' ? 'destructive' : 'outline'
          }
        >
          {row.status === 'ahead' ? 'Ahead' :
           row.status === 'on_track' ? 'On Track' :
           row.status === 'delayed' ? 'Delayed' : 'Upcoming'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedMilestone(row)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const progressColumns: Column<typeof constructionProgress[0]>[] = [
    {
      key: 'projectName',
      header: 'Project',
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-medium">{row.projectName}</div>
          <div className="text-xs text-muted-foreground">{row.projectType}</div>
        </div>
      ),
    },
    {
      key: 'overallProgress',
      header: 'Overall',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${row.overallProgress}%` }}
            />
          </div>
          <span className="text-sm">{row.overallProgress}%</span>
        </div>
      ),
    },
    {
      key: 'structuralProgress',
      header: 'Structural',
      render: (row) => <span>{row.structuralProgress}%</span>,
    },
    {
      key: 'mepProgress',
      header: 'MEP',
      render: (row) => <span>{row.mepProgress}%</span>,
    },
    {
      key: 'finishingProgress',
      header: 'Finishing',
      render: (row) => <span>{row.finishingProgress}%</span>,
    },
    {
      key: 'budgetUtilization',
      header: 'Budget Used',
      render: (row) => (
        <span className={row.budgetUtilization > row.overallProgress + 10 ? 'text-red-400' : ''}>
          {row.budgetUtilization}%
        </span>
      ),
    },
    {
      key: 'expectedCompletion',
      header: 'Completion',
      render: (row) => new Date(row.expectedCompletion).toLocaleDateString('en-IN'),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'on_track' ? 'default' : 'destructive'}>
          {row.status === 'on_track' ? 'On Track' : 'Delayed'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedProject(row)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  const requirementColumns: Column<typeof cashRequirements[0]>[] = [
    {
      key: 'projectName',
      header: 'Project',
      sortable: true,
    },
    {
      key: 'period',
      header: 'Period',
    },
    {
      key: 'construction',
      header: 'Construction',
      align: 'right' as const,
      render: (row) => <span>₹{row.construction.toFixed(1)} Cr</span>,
    },
    {
      key: 'materials',
      header: 'Materials',
      align: 'right' as const,
      render: (row) => <span>₹{row.materials.toFixed(1)} Cr</span>,
    },
    {
      key: 'total',
      header: 'Total Required',
      align: 'right' as const,
      render: (row) => (
        <span className="font-semibold">₹{row.total.toFixed(1)} Cr</span>
      ),
    },
    {
      key: 'fundedAmount',
      header: 'Funded',
      align: 'right' as const,
      render: (row) => (
        <span className="text-emerald-400">₹{row.fundedAmount.toFixed(1)} Cr</span>
      ),
    },
    {
      key: 'gap',
      header: 'Gap',
      align: 'right' as const,
      render: (row) => (
        <span className={row.gap > 0 ? 'text-red-400 font-semibold' : 'text-muted-foreground'}>
          {row.gap > 0 ? `₹${row.gap.toFixed(1)} Cr` : '-'}
        </span>
      ),
    },
    {
      key: 'fundingSource',
      header: 'Source',
      render: (row) => <span className="text-sm">{row.fundingSource}</span>,
    },
  ];

  const timelineColumns: Column<typeof fundingTimeline[0]>[] = [
    {
      key: 'projectName',
      header: 'Project',
      sortable: true,
    },
    {
      key: 'milestone',
      header: 'Milestone',
    },
    {
      key: 'expectedDate',
      header: 'Expected',
      render: (row) => new Date(row.expectedDate).toLocaleDateString('en-IN'),
    },
    {
      key: 'requiredFunding',
      header: 'Required',
      align: 'right' as const,
      render: (row) => (
        <span className="font-semibold">₹{row.requiredFunding.toFixed(1)} Cr</span>
      ),
    },
    {
      key: 'source',
      header: 'Funding Source',
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'approved' ? 'default' :
            row.status === 'pending' ? 'destructive' : 'secondary'
          }
        >
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'disbursementDate',
      header: 'Disbursement',
      render: (row) => row.disbursementDate !== '-' ? new Date(row.disbursementDate).toLocaleDateString('en-IN') : '-',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Project Completion Forecast"
        description="Project cash requirements, milestones, and funding timeline"
        breadcrumbs={[
          { label: 'Cash Flow', href: '/cash-flow' },
          { label: 'Project Forecast' },
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

      <CashFlowFilters filters={filters} onFiltersChange={setFilters} />

      {/* KPI Grid */}
      <KPIGrid columns={4}>
        <KPICard
          title="Active Projects"
          value={kpiData.activeProjects.value.toString()}
          change={kpiData.activeProjects.change}
          trend={kpiData.activeProjects.trend}
          icon={FolderKanban}
          iconColor="text-blue-400"
        />
        <KPICard
          title="Cash Required (90 Days)"
          value={`₹${kpiData.cashRequired90Days.value} Cr`}
          change={kpiData.cashRequired90Days.change}
          trend={kpiData.cashRequired90Days.trend}
          icon={IndianRupee}
          iconColor="text-red-400"
        />
        <KPICard
          title="Avg Completion"
          value={`${kpiData.avgCompletion.value}%`}
          change={kpiData.avgCompletion.change}
          trend={kpiData.avgCompletion.trend}
          icon={Target}
          iconColor="text-emerald-400"
        />
        <KPICard
          title="Funding Gap"
          value={`₹${kpiData.fundingGap.value} Cr`}
          change={kpiData.fundingGap.change}
          trend={kpiData.fundingGap.trend}
          icon={AlertTriangle}
          iconColor="text-amber-400"
        />
      </KPIGrid>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {projectForecastTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Milestones</CardTitle>
              <CardDescription>Upcoming milestones and cash requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={projectMilestones}
                columns={milestoneColumns}
                searchable
                searchKeys={['projectName', 'milestoneName']}
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

        {/* Construction Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                    <p className="text-2xl font-bold">₹2,450 Cr</p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Spent to Date</p>
                    <p className="text-2xl font-bold text-red-400">₹1,234.5 Cr</p>
                  </div>
                  <ArrowUpRight className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-2xl font-bold text-emerald-400">₹1,215.5 Cr</p>
                  </div>
                  <Clock className="h-8 w-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Delayed Milestones</p>
                    <p className="text-2xl font-bold text-amber-400">5</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-amber-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Construction Progress</CardTitle>
              <CardDescription>Project-wise construction status</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={constructionProgress}
                columns={progressColumns}
                searchable
                searchKeys={['projectName']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Requirement Tab */}
        <TabsContent value="requirement" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Cash Requirement Forecast</CardTitle>
                <CardDescription>Monthly funding requirements vs availability</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={projectForecastData}
                  xKey="month"
                  series={[
                    { key: 'required', name: 'Required', color: '#ef4444' },
                    { key: 'funded', name: 'Funded', color: '#10b981' },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spend by Category</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={spendByCategory}
                  height={280}
                  showLegend
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Cash Requirements</CardTitle>
              <CardDescription>Project-wise breakdown for upcoming month</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={cashRequirements}
                columns={requirementColumns}
                searchable
                searchKeys={['projectName']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Funding Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Funding Timeline</CardTitle>
              <CardDescription>Disbursement schedule aligned with milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={fundingTimeline}
                columns={timelineColumns}
                searchable
                searchKeys={['projectName', 'milestone']}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forecast Tab */}
        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Cash Flow Forecast</CardTitle>
              <CardDescription>6-month cash requirement projection</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart
                data={projectForecastData}
                xKey="month"
                series={[
                  { key: 'required', name: 'Required', color: '#ef4444' },
                  { key: 'gap', name: 'Gap', color: '#f59e0b' },
                ]}
                height={350}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Milestone Detail Drawer */}
      <Drawer open={!!selectedMilestone} onOpenChange={() => setSelectedMilestone(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedMilestone?.milestoneName}</DrawerTitle>
            <DrawerDescription>
              {selectedMilestone?.projectName} - {selectedMilestone?.milestoneType}
            </DrawerDescription>
          </DrawerHeader>
          {selectedMilestone && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Cash Required</p>
                    <p className="text-xl font-bold text-red-400">
                      ₹{selectedMilestone.cashRequired.toFixed(1)} Cr
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Completion</p>
                    <p className="text-xl font-bold">{selectedMilestone.completionPercent}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Target Date</p>
                    <p className="text-xl font-bold">
                      {new Date(selectedMilestone.targetDate).toLocaleDateString('en-IN')}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Dependencies</p>
                    <p className="text-xl font-bold">{selectedMilestone.dependencies}</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Funding Status</p>
                    <Badge variant={selectedMilestone.fundingStatus === 'funded' ? 'default' : 'destructive'}>
                      {selectedMilestone.fundingStatus}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge
                      variant={
                        selectedMilestone.status === 'ahead' || selectedMilestone.status === 'on_track'
                          ? 'default' : 'destructive'
                      }
                    >
                      {selectedMilestone.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Completion</p>
                    <p className="font-medium">
                      {new Date(selectedMilestone.estimatedCompletion).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      {/* Project Detail Drawer */}
      <Drawer open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedProject?.projectName}</DrawerTitle>
            <DrawerDescription>
              {selectedProject?.projectType} - {selectedProject?.totalUnits} units
            </DrawerDescription>
          </DrawerHeader>
          {selectedProject && (
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                    <p className="text-xl font-bold">{selectedProject.overallProgress}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Structural</p>
                    <p className="text-xl font-bold text-blue-400">{selectedProject.structuralProgress}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">MEP</p>
                    <p className="text-xl font-bold text-amber-400">{selectedProject.mepProgress}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Finishing</p>
                    <p className="text-xl font-bold text-emerald-400">{selectedProject.finishingProgress}%</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Units Sold</p>
                    <p className="font-medium">{selectedProject.soldUnits} / {selectedProject.totalUnits}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Budget Utilization</p>
                    <p className="font-medium">{selectedProject.budgetUtilization}%</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Expected Completion</p>
                    <p className="font-medium">
                      {new Date(selectedProject.expectedCompletion).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={selectedProject.status === 'on_track' ? 'default' : 'destructive'}>
                      {selectedProject.status}
                    </Badge>
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
                <Milestone className="mr-2 h-4 w-4" />
                Update Milestone
              </Button>
              <Button variant="outline" size="sm">
                <IndianRupee className="mr-2 h-4 w-4" />
                Request Funding
              </Button>
              <Button variant="outline" size="sm">
                <Building2 className="mr-2 h-4 w-4" />
                View All Projects
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
