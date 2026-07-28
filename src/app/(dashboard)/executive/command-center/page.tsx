'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { ChatInterface, type ChatMessage } from '@/components/features/ai/chat-interface';
import { AgentCard, AgentGrid } from '@/components/features/ai/agent-card';
import { DecisionCard, DecisionList, mockDecisions } from '@/components/features/ai/decision-card';
import { AIRecommendationList, mockRecommendations } from '@/components/features/ai/ai-recommendation-card';
import { RiskList, mockRisks } from '@/components/features/ai/risk-card';
import { OpportunityList, mockOpportunities } from '@/components/features/ai/opportunity-card';
import { IntelligenceList, mockIntelligence } from '@/components/features/ai/intelligence-card';
import { ScenarioBuilder } from '@/components/features/ai/scenario-builder';
import { FinancialSimulator } from '@/components/features/ai/financial-simulator';
import { CommandSidebar, mockAgents as sidebarAgents, mockRecentActivities } from '@/components/features/ai/command-sidebar';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sparkles,
  Bot,
  TrendingUp,
  TrendingDown,
  Shield,
  Wallet,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Brain,
  Target,
  Activity,
  Bell,
  Play,
  RefreshCw,
  Lightbulb,
  DollarSign,
  Globe,
  BarChart3,
  Calculator,
  Eye,
  FileText,
  AlertCircle,
  ArrowUpRight,
  Percent,
} from 'lucide-react';
import SectionNavigation, { SectionItem } from '@/components/shared/section-navigation';
import ExecutiveFilters from '@/components/shared/executive-filters';
import CommandCenterSection from '@/components/features/ai/command-center';

// Default executive command center sections
export const executiveCommandCenterSections: SectionItem[] = [
  { id: 'chat', label: 'AI Chat', icon: Sparkles },
  { id: 'decision-center', label: 'Decision Center', icon: TrendingUp },
  { id: 'ai-command', label: 'AI Command', icon: Brain },
  { id: 'agentic-kpis', label: 'Agentic KPIs', icon: Activity },
];


// Extended agents data (12 total)
const agents = [
  {
    id: 'cash-flow-agent',
    name: 'Cash Flow Intelligence',
    description: 'Monitors and forecasts cash positions across all entities',
    status: 'running' as const,
    icon: TrendingUp,
    iconColor: 'from-blue-500 to-cyan-500',
    category: 'Treasury',
    progress: 78,
    lastRun: new Date(Date.now() - 1000 * 60 * 15),
    metrics: [
      { label: 'Forecasts Generated', value: 24 },
      { label: 'Anomalies Detected', value: 3 },
    ],
    tasks: [
      { id: '1', name: 'Analyzing inflow patterns', status: 'completed' as const },
      { id: '2', name: 'Processing outflow forecasts', status: 'running' as const, progress: 65 },
      { id: '3', name: 'Identifying optimization opportunities', status: 'pending' as const },
    ],
  },
  {
    id: 'covenant-agent',
    name: 'Covenant Monitor',
    description: 'Tracks loan covenants and alerts on threshold breaches',
    status: 'running' as const,
    icon: Shield,
    iconColor: 'from-yellow-500 to-orange-500',
    category: 'Risk',
    progress: 92,
    lastRun: new Date(Date.now() - 1000 * 60 * 5),
    metrics: [
      { label: 'Covenants Monitored', value: 18 },
      { label: 'At Risk', value: 2 },
    ],
  },
  {
    id: 'collections-agent',
    name: 'Collections AI',
    description: 'Optimizes collection strategies and predicts payment behavior',
    status: 'idle' as const,
    icon: Wallet,
    iconColor: 'from-green-500 to-emerald-500',
    category: 'Working Capital',
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 2),
    nextRun: new Date(Date.now() + 1000 * 60 * 30),
    metrics: [
      { label: 'Customers Analyzed', value: 156 },
      { label: 'Risk Score Updates', value: 42 },
    ],
  },
  {
    id: 'payment-agent',
    name: 'Payment Optimizer',
    description: 'Prioritizes payments and identifies discounting opportunities',
    status: 'paused' as const,
    icon: CreditCard,
    iconColor: 'from-purple-500 to-pink-500',
    category: 'Payments',
    metrics: [
      { label: 'Payments Optimized', value: 89 },
      { label: 'Savings Identified', value: '₹12.5L' },
    ],
  },
  {
    id: 'reconciliation-agent',
    name: 'Auto Reconciliation',
    description: 'Matches transactions automatically using ML patterns',
    status: 'completed' as const,
    icon: Target,
    iconColor: 'from-cyan-500 to-blue-500',
    category: 'Operations',
    lastRun: new Date(Date.now() - 1000 * 60 * 45),
    metrics: [
      { label: 'Transactions Matched', value: '1,245' },
      { label: 'Match Rate', value: '98.5%' },
    ],
  },
  {
    id: 'forecast-agent',
    name: 'Scenario Planner',
    description: 'Runs what-if scenarios and stress tests',
    status: 'idle' as const,
    icon: Brain,
    iconColor: 'from-indigo-500 to-purple-500',
    category: 'FP&A',
    metrics: [
      { label: 'Scenarios Created', value: 15 },
      { label: 'Simulations Run', value: 48 },
    ],
  },
  {
    id: 'liquidity-agent',
    name: 'Liquidity Manager',
    description: 'Monitors liquidity ratios and optimizes buffer allocations',
    status: 'running' as const,
    icon: Zap,
    iconColor: 'from-teal-500 to-cyan-500',
    category: 'Treasury',
    progress: 85,
    lastRun: new Date(Date.now() - 1000 * 60 * 8),
    metrics: [
      { label: 'Accounts Monitored', value: 24 },
      { label: 'Alerts Generated', value: 5 },
    ],
  },
  {
    id: 'fx-agent',
    name: 'FX Risk Monitor',
    description: 'Tracks currency exposures and hedge effectiveness',
    status: 'running' as const,
    icon: Globe,
    iconColor: 'from-violet-500 to-purple-500',
    category: 'Treasury',
    progress: 72,
    lastRun: new Date(Date.now() - 1000 * 60 * 3),
    metrics: [
      { label: 'Currencies Tracked', value: 5 },
      { label: 'Hedge Coverage', value: '71%' },
    ],
  },
  {
    id: 'investment-agent',
    name: 'Investment Optimizer',
    description: 'Identifies yield opportunities and manages maturity ladder',
    status: 'idle' as const,
    icon: BarChart3,
    iconColor: 'from-emerald-500 to-green-500',
    category: 'Treasury',
    lastRun: new Date(Date.now() - 1000 * 60 * 120),
    metrics: [
      { label: 'Portfolio Value', value: '₹1,450 Cr' },
      { label: 'Average Yield', value: '7.2%' },
    ],
  },
  {
    id: 'vendor-agent',
    name: 'Vendor Intelligence',
    description: 'Analyzes vendor payment patterns and credit risks',
    status: 'completed' as const,
    icon: CreditCard,
    iconColor: 'from-orange-500 to-red-500',
    category: 'Payments',
    lastRun: new Date(Date.now() - 1000 * 60 * 60),
    metrics: [
      { label: 'Vendors Analyzed', value: 245 },
      { label: 'Discount Opportunities', value: 12 },
    ],
  },
  {
    id: 'compliance-agent',
    name: 'Compliance Checker',
    description: 'Monitors regulatory compliance and policy adherence',
    status: 'idle' as const,
    icon: FileText,
    iconColor: 'from-amber-500 to-yellow-500',
    category: 'Risk',
    lastRun: new Date(Date.now() - 1000 * 60 * 180),
    metrics: [
      { label: 'Policies Checked', value: 45 },
      { label: 'Compliance Score', value: '98%' },
    ],
  },
  {
    id: 'intelligence-agent',
    name: 'Market Intelligence',
    description: 'Gathers and analyzes market news and competitor data',
    status: 'running' as const,
    icon: Lightbulb,
    iconColor: 'from-pink-500 to-rose-500',
    category: 'Intelligence',
    progress: 60,
    lastRun: new Date(Date.now() - 1000 * 60 * 10),
    metrics: [
      { label: 'Sources Monitored', value: 125 },
      { label: 'Insights Generated', value: 18 },
    ],
  },
];

// Mock chat messages
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Good morning! I\'ve analyzed your overnight positions. Key highlights:\n\n• Cash position is ₹847.5 Cr, up 12.4% from last week\n• 3 pending approvals require attention (2 urgent)\n• DSCR covenant is at 1.32x, approaching the 1.25x threshold\n\nWould you like me to elaborate on any of these?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    actions: [
      { label: 'Show Cash Details', onClick: () => { } },
      { label: 'View Approvals', onClick: () => { } },
      { label: 'Covenant Analysis', onClick: () => { } },
    ],
  },
];

// Mock suggestions
const chatSuggestions = [
  'What\'s our cash position by entity?',
  'Show me upcoming covenant deadlines',
  'Optimize payments for this week',
  'Run a 30-day cash forecast',
  'Identify idle cash opportunities',
  'Which collections are at risk?',
];

// Command stats (16 KPIs)
const commandStats = {
  activeAgents: 5,
  totalAgents: 12,
  insightsGenerated: 47,
  actionsCompleted: 23,
  alertsResolved: 15,
  pendingDecisions: 8,
  criticalAlerts: 2,
  opportunitiesIdentified: 12,
  riskScore: 28,
  confidenceAvg: 89,
  savingsIdentified: 12.5,
  forecastAccuracy: 94,
  automationRate: 78,
  responseTime: 1.2,
  uptime: 99.8,
  modelsActive: 8,
};

export default function CommandCenterPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('decisions');
  const [showSidebar, setShowSidebar] = React.useState(true);

  const handleSendMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm analyzing your request: "${message}"\n\nBased on current data, here's what I found...\n\nThis is a simulated response. In production, this would connect to the AI backend.`,
        timestamp: new Date(),
        actions: [
          { label: 'View Details', onClick: () => { } },
          { label: 'Export Report', onClick: () => { } },
        ],
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-full">
      <PageContainer className="flex-1">
        {/* Page Header */}
        <PageHeader
          title="AI Command Center"
          description="Intelligent automation and insights hub"
          breadcrumbs={[
            { label: 'Executive Intelligence', href: '/executive' },
            { label: 'Command Center' },
          ]}
          showRefresh
        />

        {/* Executive Filters */}
        <div className="sticky top-0 z-50 -mx-6 bg-slate-950/95 px-6 py-4 backdrop-blur-sm">
          {/* <div className="mb-2"> */}
          <ExecutiveFilters compact />
          {/* </div> */}
          {/* </div> */}

          {/* Section Navigation */}
          <SectionNavigation sections={executiveCommandCenterSections} className="mt-2" />
        </div>

        {/* SECTION 1: AI Chat */}
        <Section id="chat" className="mb-8">
          {/* Top: AI Chat */}
          <div className="w-full">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              suggestions={messages.length <= 1 ? chatSuggestions : undefined}
              placeholder="Ask AI CFO..."
              className="mb-8"
            // className="max-h-[700px]"
            />
          </div>
          {/* <h2 className="mb-4 text-lg font-semibold text-white">AI Chat</h2> */}
        </Section>

        {/* SECTION 2: Decision Center */}
        <Section id="decision-center" className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-white">Decision Center</h2>
          {/* Main Content */}
          <div className="w-full">
            {/* Left: AI Chat */}
            {/* <div className="lg:col-span-1">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              suggestions={messages.length <= 1 ? chatSuggestions : undefined}
              placeholder="Ask AI CFO..."
              className="h-[700px]"
            />
          </div> */}

            {/* Right: Main Workspace */}
            <div className="w-full">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="mb-4 flex items-center justify-between">
                    <TabsList className="w-4/5">
                  <ScrollArea orientation='horizontal' className="w-full whitespace-nowrap">
                      <TabsTrigger value="decisions" className="gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Decisions
                        <Badge variant="danger" className="ml-1">
                          {mockDecisions.filter((d) => d.severity === 'critical' || d.severity === 'high').length}
                        </Badge>
                      </TabsTrigger>
                      <TabsTrigger value="recommendations" className="gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Recommendations
                      </TabsTrigger>
                      <TabsTrigger value="risks" className="gap-2">
                        <Shield className="h-4 w-4" />
                        Risks
                      </TabsTrigger>
                      <TabsTrigger value="opportunities" className="gap-2">
                        <ArrowUpRight className="h-4 w-4" />
                        Opportunities
                      </TabsTrigger>
                      <TabsTrigger value="intelligence" className="gap-2">
                        <Globe className="h-4 w-4" />
                        Intelligence
                      </TabsTrigger>
                      <TabsTrigger value="agents" className="gap-2">
                        <Bot className="h-4 w-4" />
                        Agents
                        <Badge variant="secondary" className="ml-1">
                          {agents.filter((a) => a.status === 'running').length}
                        </Badge>
                      </TabsTrigger>
                      <TabsTrigger value="modeling" className="gap-2">
                        <Calculator className="h-4 w-4" />
                        Modeling
                      </TabsTrigger>
                  </ScrollArea>
                    </TabsList>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                </div>

                {/* Priority Decision Center */}
                <TabsContent value="decisions" className="mt-0">
                  <ScrollArea className=" pr-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Priority Decision Center</h3>
                        <p className="text-sm text-slate-400">AI-identified decisions requiring executive action</p>
                      </div>
                      <Badge className="bg-blue-500/10 text-blue-400">
                        <Sparkles className="mr-1 h-3 w-3" />
                        AI Prioritized
                      </Badge>
                    </div>
                    <DecisionList
                      decisions={mockDecisions}
                      onSimulate={(d) => console.log('Simulate', d.id)}
                      onApprove={(d) => console.log('Approve', d.id)}
                      onReject={(d) => console.log('Reject', d.id)}
                      onViewDetails={(d) => console.log('View', d.id)}
                    />
                  </ScrollArea>
                </TabsContent>

                {/* Global Recommendations */}
                <TabsContent value="recommendations" className="mt-0">
                  <ScrollArea className=" pr-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Global AI Recommendations</h3>
                        <p className="text-sm text-slate-400">Strategic recommendations across all modules</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {mockRecommendations.filter((r) => r.status === 'pending').length} Pending
                        </Badge>
                        <Badge className="bg-emerald-500/10 text-emerald-400">
                          {mockRecommendations.filter((r) => r.status === 'approved').length} Approved
                        </Badge>
                      </div>
                    </div>
                    <AIRecommendationList
                      recommendations={mockRecommendations}
                      onSimulate={(r) => console.log('Simulate', r.id)}
                      onApprove={(r) => console.log('Approve', r.id)}
                      onReject={(r) => console.log('Reject', r.id)}
                      onAssign={(r) => console.log('Assign', r.id)}
                      onViewDetails={(r) => console.log('View', r.id)}
                    />
                  </ScrollArea>
                </TabsContent>

                {/* Risk Intelligence */}
                <TabsContent value="risks" className="mt-0">
                  <ScrollArea className=" pr-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Risk Intelligence</h3>
                        <p className="text-sm text-slate-400">AI-monitored risks across the enterprise</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="danger">
                          {mockRisks.filter((r) => r.severity === 'critical').length} Critical
                        </Badge>
                        <Badge variant="outline" className="text-orange-400">
                          {mockRisks.filter((r) => r.severity === 'high').length} High
                        </Badge>
                      </div>
                    </div>
                    <RiskList
                      risks={mockRisks}
                      onViewDetails={(r) => console.log('View', r.id)}
                      onToggleMonitoring={(r) => console.log('Toggle', r.id)}
                      onEscalate={(r) => console.log('Escalate', r.id)}
                    />
                  </ScrollArea>
                </TabsContent>

                {/* Opportunity Detection */}
                <TabsContent value="opportunities" className="mt-0">
                  <ScrollArea className=" pr-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Opportunity Detection</h3>
                        <p className="text-sm text-slate-400">AI-identified value creation opportunities</p>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400">
                        <TrendingUp className="mr-1 h-3 w-3" />
                        ₹{mockOpportunities.reduce((acc, o) => {
                          const match = o.expectedValue.match(/₹([\d.]+)/);
                          return acc + (match ? parseFloat(match[1]) : 0);
                        }, 0).toFixed(1)} Cr Potential
                      </Badge>
                    </div>
                    <OpportunityList
                      opportunities={mockOpportunities}
                      onPursue={(o) => console.log('Pursue', o.id)}
                      onDismiss={(o) => console.log('Dismiss', o.id)}
                      onAnalyze={(o) => console.log('Analyze', o.id)}
                      onViewDetails={(o) => console.log('View', o.id)}
                    />
                  </ScrollArea>
                </TabsContent>

                {/* Business Intelligence */}
                <TabsContent value="intelligence" className="mt-0">
                  <ScrollArea className=" pr-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Business Intelligence</h3>
                        <p className="text-sm text-slate-400">Market and business intelligence insights</p>
                      </div>
                      <Badge variant="outline">
                        {mockIntelligence.filter((i) => i.actionRequired).length} Action Required
                      </Badge>
                    </div>
                    <IntelligenceList
                      items={mockIntelligence}
                      onViewDetails={(i) => console.log('View', i.id)}
                      onBookmark={(i) => console.log('Bookmark', i.id)}
                      onShare={(i) => console.log('Share', i.id)}
                      onTakeAction={(i) => console.log('Action', i.id)}
                    />
                  </ScrollArea>
                </TabsContent>

                {/* AI Agents */}
                <TabsContent value="agents" className="mt-0">
                  <ScrollArea className=" pr-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">AI Agents</h3>
                        <p className="text-sm text-slate-400">Autonomous AI agents monitoring your enterprise</p>
                      </div>
                      <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
                        <Play className="h-4 w-4" />
                        Run All Agents
                      </Button>
                    </div>
                    <AgentGrid>
                      {agents.map((agent) => (
                        <AgentCard
                          key={agent.id}
                          {...agent}
                          onStart={() => console.log('Start', agent.id)}
                          onPause={() => console.log('Pause', agent.id)}
                          onStop={() => console.log('Stop', agent.id)}
                          onConfigure={() => console.log('Configure', agent.id)}
                        />
                      ))}
                    </AgentGrid>
                  </ScrollArea>
                </TabsContent>

                {/* Financial Modeling */}
                <TabsContent value="modeling" className="mt-0">
                  <ScrollArea className=" pr-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-white">Financial Modeling</h3>
                      <p className="text-sm text-slate-400">Scenario planning and financial simulations</p>
                    </div>
                    <Tabs defaultValue="scenario" className="w-full">
                      <TabsList className="mb-4">
                        <TabsTrigger value="scenario">Scenario Builder</TabsTrigger>
                        <TabsTrigger value="simulator">Financial Simulator</TabsTrigger>
                      </TabsList>
                      <TabsContent value="scenario">
                        <ScenarioBuilder
                          onRun={(s) => console.log('Run scenario', s)}
                          onSave={(s) => console.log('Save scenario', s)}
                          onReset={() => console.log('Reset')}
                        />
                      </TabsContent>
                      <TabsContent value="simulator">
                        <FinancialSimulator
                          onStart={() => console.log('Start simulation')}
                          onPause={() => console.log('Pause simulation')}
                          onReset={() => console.log('Reset simulation')}
                          onExport={() => console.log('Export results')}
                        />
                      </TabsContent>
                    </Tabs>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Section>


        {/* SECTION 3: AI Command */}
        <Section id="ai-command" className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-white">AI Command</h2>
          {/* Command Sidebar */}
          {showSidebar && (
            <CommandCenterSection
              agents={sidebarAgents}
              recentActivities={mockRecentActivities}
              onQuickAction={(action) => console.log('Quick action', action.id)}
              onAgentControl={(agentId, action) => console.log('Agent control', agentId, action)}
              onActivityClick={(activity) => console.log('Activity click', activity.id)}
            />
          )}
        </Section>

        {/* SECTION 4: AI Agentic KPIs */}
        <Section id="agentic-kpis" className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-white">Agentic KPIs</h2>
          <KPIGrid columns={8}>
            <KPICard
              title="Active Agents"
              value={`${commandStats.activeAgents}/${commandStats.totalAgents}`}
              icon={Bot}
              iconColor="bg-blue-500/10 text-blue-400"
              size="sm"
            />
            <KPICard
              title="Pending Decisions"
              value={commandStats.pendingDecisions}
              icon={AlertCircle}
              iconColor="bg-orange-500/10 text-orange-400"
              size="sm"
            />
            <KPICard
              title="Critical Alerts"
              value={commandStats.criticalAlerts}
              icon={AlertTriangle}
              iconColor="bg-red-500/10 text-red-400"
              size="sm"
            />
            <KPICard
              title="Opportunities"
              value={commandStats.opportunitiesIdentified}
              icon={ArrowUpRight}
              iconColor="bg-emerald-500/10 text-emerald-400"
              size="sm"
            />
            <KPICard
              title="Risk Score"
              value={`${commandStats.riskScore}/100`}
              icon={Shield}
              iconColor="bg-purple-500/10 text-purple-400"
              size="sm"
            />
            <KPICard
              title="AI Confidence"
              value={`${commandStats.confidenceAvg}%`}
              icon={Sparkles}
              iconColor="bg-blue-500/10 text-blue-400"
              size="sm"
            />
            <KPICard
              title="Savings Found"
              value={`₹${commandStats.savingsIdentified} Cr`}
              icon={DollarSign}
              iconColor="bg-green-500/10 text-green-400"
              size="sm"
            />
            <KPICard
              title="Forecast Accuracy"
              value={`${commandStats.forecastAccuracy}%`}
              icon={Target}
              iconColor="bg-cyan-500/10 text-cyan-400"
              size="sm"
            />
          </KPIGrid>
        </Section>

        {/* Secondary KPIs Row */}
        <Section className="mb-6">
          <KPIGrid columns={8}>
            <KPICard
              title="Insights Today"
              value={commandStats.insightsGenerated}
              change={12}
              trend="up"
              icon={Lightbulb}
              iconColor="bg-yellow-500/10 text-yellow-400"
              size="sm"
            />
            <KPICard
              title="Actions Completed"
              value={commandStats.actionsCompleted}
              icon={CheckCircle2}
              iconColor="bg-green-500/10 text-green-400"
              size="sm"
            />
            <KPICard
              title="Alerts Resolved"
              value={commandStats.alertsResolved}
              icon={Bell}
              iconColor="bg-yellow-500/10 text-yellow-400"
              size="sm"
            />
            <KPICard
              title="Automation Rate"
              value={`${commandStats.automationRate}%`}
              icon={Zap}
              iconColor="bg-violet-500/10 text-violet-400"
              size="sm"
            />
            <KPICard
              title="Avg Response"
              value={`${commandStats.responseTime}s`}
              icon={Clock}
              iconColor="bg-slate-500/10 text-slate-400"
              size="sm"
            />
            <KPICard
              title="System Uptime"
              value={`${commandStats.uptime}%`}
              icon={Activity}
              iconColor="bg-teal-500/10 text-teal-400"
              size="sm"
            />
            <KPICard
              title="Models Active"
              value={commandStats.modelsActive}
              icon={Brain}
              iconColor="bg-purple-500/10 text-purple-400"
              size="sm"
            />
            <KPICard
              title="System Health"
              value="98.5%"
              icon={Eye}
              iconColor="bg-cyan-500/10 text-cyan-400"
              size="sm"
            />
          </KPIGrid>
        </Section>


      </PageContainer>

    </div>
  );
}
