'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { ChatInterface, type ChatMessage } from '@/components/features/ai/chat-interface';
import { AgentCard, AgentGrid } from '@/components/features/ai/agent-card';
import { AIInsightCard } from '@/components/shared/ai-insight-card';
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
  MessageSquare,
  Play,
  Pause,
  BarChart3,
  PieChart,
  LineChart,
  FileText,
  RefreshCw,
} from 'lucide-react';

// Mock agents data
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
];

// Mock chat messages
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Good morning! I\'ve analyzed your overnight positions. Key highlights:\n\n• Cash position is ₹847.5 Cr, up 12.4% from last week\n• 3 pending approvals require attention (2 urgent)\n• DSCR covenant is at 1.32x, approaching the 1.25x threshold\n\nWould you like me to elaborate on any of these?',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    actions: [
      { label: 'Show Cash Details', onClick: () => {} },
      { label: 'View Approvals', onClick: () => {} },
      { label: 'Covenant Analysis', onClick: () => {} },
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

// Mock alerts
const alerts = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'DSCR Covenant at Risk',
    description: 'Current ratio 1.32x vs 1.25x minimum threshold',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    agent: 'Covenant Monitor',
  },
  {
    id: '2',
    type: 'opportunity' as const,
    title: 'Idle Cash Detected',
    description: '₹45 Cr can be moved to earn additional yield',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    agent: 'Cash Flow Intelligence',
  },
  {
    id: '3',
    type: 'recommendation' as const,
    title: 'Payment Optimization',
    description: 'Early payment to 3 vendors could save ₹12.5L',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    agent: 'Payment Optimizer',
  },
];

// Command stats
const commandStats = {
  activeAgents: 2,
  totalAgents: 6,
  insightsGenerated: 47,
  actionsCompleted: 23,
  alertsResolved: 15,
};

export default function CommandCenterPage() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('agents');

  const handleSendMessage = (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm analyzing your request: "${message}"\n\nBased on current data, here's what I found...\n\nThis is a simulated response. In production, this would connect to the AI backend.`,
        timestamp: new Date(),
        actions: [
          { label: 'View Details', onClick: () => {} },
          { label: 'Export Report', onClick: () => {} },
        ],
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <PageContainer>
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

      {/* Stats */}
      <Section className="mb-6">
        <KPIGrid columns={5}>
          <KPICard
            title="Active Agents"
            value={`${commandStats.activeAgents}/${commandStats.totalAgents}`}
            icon={Bot}
            iconColor="bg-blue-500/10 text-blue-400"
            size="sm"
          />
          <KPICard
            title="Insights Today"
            value={commandStats.insightsGenerated}
            change={12}
            trend="up"
            icon={Sparkles}
            iconColor="bg-purple-500/10 text-purple-400"
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
            title="System Health"
            value="98.5%"
            icon={Activity}
            iconColor="bg-cyan-500/10 text-cyan-400"
            size="sm"
          />
        </KPIGrid>
      </Section>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: AI Chat */}
        <div className="lg:col-span-1">
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            suggestions={messages.length <= 1 ? chatSuggestions : undefined}
            placeholder="Ask AI CFO..."
            className="h-[600px]"
          />
        </div>

        {/* Right: Agents & Alerts */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="mb-4 flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="agents" className="gap-2">
                  <Bot className="h-4 w-4" />
                  AI Agents
                  <Badge variant="secondary" className="ml-1">
                    {agents.filter((a) => a.status === 'running').length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="alerts" className="gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Alerts
                  <Badge variant="danger" className="ml-1">
                    {alerts.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="insights" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Insights
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600">
                  <Play className="h-4 w-4" />
                  Run All Agents
                </Button>
              </div>
            </div>

            <TabsContent value="agents" className="mt-0">
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
            </TabsContent>

            <TabsContent value="alerts" className="mt-0">
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <AIInsightCard
                    key={alert.id}
                    title={alert.title}
                    insight={alert.description}
                    type={alert.type}
                    source={alert.agent}
                    timestamp={alert.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    actions={[
                      { label: 'View Details', onClick: () => {} },
                      { label: 'Take Action', onClick: () => {}, primary: true },
                    ]}
                    onFeedback={(positive) => console.log('Feedback', alert.id, positive)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="mt-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border-slate-800 bg-slate-900/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                      <BarChart3 className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Cash Flow Analysis</h4>
                      <p className="text-xs text-slate-500">Generated 2 hours ago</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">
                    Weekly cash flow analysis shows 12% improvement in collections. Projected surplus of ₹32.5 Cr for the month.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Report
                  </Button>
                </Card>

                <Card className="border-slate-800 bg-slate-900/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                      <PieChart className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Entity Performance</h4>
                      <p className="text-xs text-slate-500">Generated 4 hours ago</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">
                    Zenith Infrastructure outperforming other entities with 18% higher cash conversion efficiency.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Report
                  </Button>
                </Card>

                <Card className="border-slate-800 bg-slate-900/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                      <LineChart className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Trend Forecast</h4>
                      <p className="text-xs text-slate-500">Generated 1 hour ago</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">
                    8-week forecast indicates steady growth. Expected to reach ₹1,089 Cr by end of period.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Report
                  </Button>
                </Card>

                <Card className="border-slate-800 bg-slate-900/50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                      <FileText className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Risk Assessment</h4>
                      <p className="text-xs text-slate-500">Generated 30 mins ago</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">
                    2 covenants require attention. DSCR at 1.32x and Current Ratio at 1.48x need monitoring.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Report
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
}
