'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout';
import { KPICard, KPIGrid } from '@/components/shared/kpi-card';
import { DataTable, Column } from '@/components/shared/data-table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AIInsightCard } from '@/components/shared/ai-insight-card';
import { cashFlowTabs } from '@/config/cash-flow-navigation';
import {
  Bot,
  Send,
  Sparkles,
  Brain,
  Zap,
  MessageSquare,
  History,
  Settings,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Activity,
  RefreshCw,
  Download,
  Mic,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  Copy,
  MoreHorizontal,
  ChevronRight,
  Lightbulb,
  FileText,
  BarChart3,
  Users,
  Wallet,
  CreditCard,
  Building2,
  PieChart,
  ArrowRight,
  Star,
  Shield,
  Gauge,
  Eye,
  RotateCcw,
  Trash2,
  Plus,
  X,
} from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: AgentAction[];
  insights?: AgentInsight[];
}

interface AgentAction {
  id: string;
  type: 'analysis' | 'recommendation' | 'automation' | 'alert';
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: string;
}

interface AgentInsight {
  type: 'info' | 'warning' | 'success' | 'opportunity';
  title: string;
  value: string;
}

interface AgentCapability {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  isActive: boolean;
  lastUsed: string | null;
  usageCount: number;
}

interface TaskHistory {
  id: string;
  query: string;
  result: string;
  timestamp: string;
  duration: string;
  status: 'completed' | 'failed';
  category: string;
}

interface QuickAction {
  id: string;
  label: string;
  query: string;
  icon: React.ReactNode;
  category: string;
}

interface AgentSuggestion {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  action: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const kpiData = {
  tasksCompleted: {
    value: 142,
    trend: 'up' as const,
    trendValue: '+23',
    period: 'this week',
  },
  avgResponseTime: {
    value: 2.3,
    unit: 's',
    trend: 'down' as const,
    trendValue: '-0.5s',
  },
  accuracyScore: {
    value: 96.8,
    unit: '%',
    trend: 'up' as const,
    trendValue: '+1.2%',
  },
  automationsSaved: {
    value: 48,
    unit: 'hrs',
    trend: 'up' as const,
    trendValue: '+8 hrs',
    period: 'this month',
  },
};

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your Cash Flow AI Agent. I can help you with cash flow analysis, forecasting, risk assessment, and automated recommendations. What would you like to explore today?',
    timestamp: '09:00 AM',
    insights: [
      { type: 'info', title: 'Today\'s Position', value: '₹485.2 Cr' },
      { type: 'warning', title: 'Upcoming Payments', value: '₹45.8 Cr (3 days)' },
      { type: 'success', title: 'Collections Expected', value: '₹62.5 Cr' },
    ],
  },
];

const agentCapabilities: AgentCapability[] = [
  {
    id: 'CAP001',
    name: 'Cash Position Analysis',
    description: 'Real-time analysis of cash positions across all entities and bank accounts',
    category: 'Analysis',
    icon: 'DollarSign',
    isActive: true,
    lastUsed: '2025-01-22 10:30',
    usageCount: 245,
  },
  {
    id: 'CAP002',
    name: 'Forecast Generation',
    description: 'AI-powered cash flow forecasting with multiple scenarios',
    category: 'Forecasting',
    icon: 'TrendingUp',
    isActive: true,
    lastUsed: '2025-01-22 09:15',
    usageCount: 189,
  },
  {
    id: 'CAP003',
    name: 'Risk Assessment',
    description: 'Automated risk scoring and early warning detection',
    category: 'Risk',
    icon: 'Shield',
    isActive: true,
    lastUsed: '2025-01-22 08:45',
    usageCount: 156,
  },
  {
    id: 'CAP004',
    name: 'Collection Optimization',
    description: 'Smart prioritization of collection activities',
    category: 'Collections',
    icon: 'Users',
    isActive: true,
    lastUsed: '2025-01-21 16:20',
    usageCount: 98,
  },
  {
    id: 'CAP005',
    name: 'Payment Scheduling',
    description: 'Intelligent payment prioritization and timing optimization',
    category: 'Payments',
    icon: 'Wallet',
    isActive: true,
    lastUsed: '2025-01-21 14:30',
    usageCount: 134,
  },
  {
    id: 'CAP006',
    name: 'Anomaly Detection',
    description: 'Automatic detection of unusual patterns and outliers',
    category: 'Monitoring',
    icon: 'AlertTriangle',
    isActive: true,
    lastUsed: '2025-01-22 07:00',
    usageCount: 312,
  },
  {
    id: 'CAP007',
    name: 'Report Generation',
    description: 'Automated generation of cash flow reports and summaries',
    category: 'Reporting',
    icon: 'FileText',
    isActive: true,
    lastUsed: '2025-01-22 08:00',
    usageCount: 178,
  },
  {
    id: 'CAP008',
    name: 'What-If Analysis',
    description: 'Scenario modeling and impact simulation',
    category: 'Analysis',
    icon: 'Brain',
    isActive: true,
    lastUsed: '2025-01-20 11:45',
    usageCount: 67,
  },
];

const taskHistory: TaskHistory[] = [
  {
    id: 'TSK001',
    query: 'Analyze cash position for Skyline Towers',
    result: 'Current position ₹45.2 Cr, 28 days runway, declining trend',
    timestamp: '2025-01-22 10:30',
    duration: '2.1s',
    status: 'completed',
    category: 'Analysis',
  },
  {
    id: 'TSK002',
    query: 'Generate 90-day cash forecast',
    result: 'Forecast generated with 3 scenarios: Base, Optimistic, Conservative',
    timestamp: '2025-01-22 09:15',
    duration: '4.5s',
    status: 'completed',
    category: 'Forecasting',
  },
  {
    id: 'TSK003',
    query: 'Identify high-risk collections',
    result: 'Found 5 customers with ₹28.5 Cr at risk, recommendations generated',
    timestamp: '2025-01-22 08:45',
    duration: '3.2s',
    status: 'completed',
    category: 'Risk',
  },
  {
    id: 'TSK004',
    query: 'Optimize payment schedule for this week',
    result: 'Optimized 23 payments, saved ₹1.2 Cr in early payment discounts',
    timestamp: '2025-01-21 16:20',
    duration: '5.8s',
    status: 'completed',
    category: 'Payments',
  },
  {
    id: 'TSK005',
    query: 'Compare entity cash performance',
    result: 'Comparison report generated for 4 entities',
    timestamp: '2025-01-21 14:30',
    duration: '2.8s',
    status: 'completed',
    category: 'Analysis',
  },
];

const quickActions: QuickAction[] = [
  {
    id: 'QA001',
    label: 'Cash Position Summary',
    query: 'Show me the current cash position across all entities',
    icon: <DollarSign className="h-4 w-4" />,
    category: 'Position',
  },
  {
    id: 'QA002',
    label: '7-Day Forecast',
    query: 'Generate a 7-day cash flow forecast',
    icon: <TrendingUp className="h-4 w-4" />,
    category: 'Forecast',
  },
  {
    id: 'QA003',
    label: 'High Priority Collections',
    query: 'What are the high priority collections due this week?',
    icon: <Users className="h-4 w-4" />,
    category: 'Collections',
  },
  {
    id: 'QA004',
    label: 'Payment Recommendations',
    query: 'Recommend optimal payment schedule for this week',
    icon: <Wallet className="h-4 w-4" />,
    category: 'Payments',
  },
  {
    id: 'QA005',
    label: 'Risk Assessment',
    query: 'Run a comprehensive risk assessment',
    icon: <Shield className="h-4 w-4" />,
    category: 'Risk',
  },
  {
    id: 'QA006',
    label: 'Variance Analysis',
    query: 'Analyze variance between budget and actual for this month',
    icon: <BarChart3 className="h-4 w-4" />,
    category: 'Analysis',
  },
];

const agentSuggestions: AgentSuggestion[] = [
  {
    id: 'SUG001',
    title: 'Accelerate Collections from Lodha Group',
    description: 'AI detected ₹45.8 Cr due in next 7 days from Lodha Group. Historical data shows 85% success rate with early follow-up.',
    priority: 'high',
    impact: '₹45.8 Cr potential inflow',
    action: 'Send collection reminder',
  },
  {
    id: 'SUG002',
    title: 'Optimize HDFC Bank Concentration',
    description: 'HDFC exposure at 42% exceeds 35% limit. Recommend diversifying ₹50 Cr to ICICI and Axis Bank.',
    priority: 'medium',
    impact: 'Reduce concentration risk by 14%',
    action: 'Generate rebalancing plan',
  },
  {
    id: 'SUG003',
    title: 'Capture Early Payment Discount',
    description: 'L&T Construction invoice eligible for 2% discount if paid within 3 days. Potential savings ₹1.2 Cr.',
    priority: 'high',
    impact: '₹1.2 Cr savings',
    action: 'Schedule early payment',
  },
  {
    id: 'SUG004',
    title: 'Liquidity Buffer Alert',
    description: 'Metro Commercial Hub cash buffer at 18 days, below 30-day threshold. Recommend immediate funding action.',
    priority: 'high',
    impact: 'Prevent liquidity stress',
    action: 'View funding options',
  },
];

const conversationStarters = [
  'How is our cash position looking today?',
  'What are the biggest risks to our cash flow?',
  'Help me optimize payments for this week',
  'Generate a monthly cash flow report',
  'What collections should we prioritize?',
  'Compare cash performance across entities',
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
    case 'success':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'running':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'failed':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'low':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

const getInsightColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-500/10 border-green-500/30';
    case 'warning':
      return 'bg-yellow-500/10 border-yellow-500/30';
    case 'opportunity':
      return 'bg-blue-500/10 border-blue-500/30';
    default:
      return 'bg-slate-500/10 border-slate-500/30';
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function CashFlowAIAgentPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Get tabs configuration
  const tabs = cashFlowTabs.agent || [
    { id: 'chat', label: 'AI Chat' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'history', label: 'Task History' },
    { id: 'suggestions', label: 'Suggestions' },
    { id: 'settings', label: 'Settings' },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: getAIResponse(inputValue),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        actions: [
          {
            id: 'act-1',
            type: 'analysis',
            title: 'Cash Position Analysis',
            description: 'Analyzing current cash position across all entities...',
            status: 'completed',
            result: 'Analysis complete',
          },
        ],
        insights: [
          { type: 'info', title: 'Total Position', value: '₹485.2 Cr' },
          { type: 'success', title: 'Net Change', value: '+₹12.5 Cr' },
        ],
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('position') || lowerQuery.includes('cash')) {
      return 'Based on my analysis, your current consolidated cash position is ₹485.2 Cr across all entities. Skyline Towers holds ₹125.5 Cr (26%), Green Valley ₹98.2 Cr (20%), and Metro Commercial ₹85.8 Cr (18%). The position has increased by ₹12.5 Cr since yesterday, primarily due to collections from Lodha Group. I\'ve identified 3 entities with cash buffers below the 30-day threshold that may need attention.';
    }

    if (lowerQuery.includes('forecast') || lowerQuery.includes('predict')) {
      return 'I\'ve generated a 7-day cash flow forecast. Expected inflows: ₹125.5 Cr (Customer Collections: ₹85.2 Cr, Loan Disbursements: ₹28.5 Cr, Other: ₹11.8 Cr). Expected outflows: ₹98.2 Cr (Vendor Payments: ₹45.5 Cr, Construction: ₹32.8 Cr, Loan Repayments: ₹12.5 Cr). Net forecast: +₹27.3 Cr. There\'s a potential liquidity gap on Day 5 if the Prestige collection (₹18.5 Cr) is delayed.';
    }

    if (lowerQuery.includes('risk') || lowerQuery.includes('assessment')) {
      return 'Risk assessment complete. Overall risk score: 72/100 (Medium). Key risks identified: 1) Liquidity risk at Metro Commercial Hub - 18 days buffer (Critical), 2) Concentration risk - HDFC exposure at 42% (High), 3) Covenant risk - DSCR at 1.58 approaching 1.50 minimum (Medium). I recommend immediate action on the Metro Commercial liquidity situation and initiating discussions for banking relationship diversification.';
    }

    if (lowerQuery.includes('collection') || lowerQuery.includes('receivable')) {
      return 'I\'ve analyzed your collections portfolio. High priority collections this week: 1) Lodha Group - ₹45.8 Cr (Due in 3 days, 85% collection probability), 2) DLF Ltd - ₹28.5 Cr (45 days overdue, escalation recommended), 3) Prestige Estates - ₹18.5 Cr (Due in 5 days, 72% probability). Recommendation: Initiate early follow-up with Lodha Group and escalate DLF to senior management. Combined collection potential: ₹92.8 Cr.';
    }

    if (lowerQuery.includes('payment') || lowerQuery.includes('vendor')) {
      return 'Payment optimization analysis complete. This week\'s payments: ₹65.5 Cr across 28 invoices. Recommendations: 1) Pay L&T Construction invoice early to capture ₹1.2 Cr discount, 2) Defer non-critical payments of ₹8.5 Cr by 3 days to optimize cash buffer, 3) Prioritize Shapoorji Pallonji (₹15.2 Cr) to maintain vendor relationship score. Net savings potential: ₹1.5 Cr through optimized timing.';
    }

    return 'I\'ve processed your request. Based on my analysis of current cash flow data, I can help you with position analysis, forecasting, risk assessment, collection optimization, or payment scheduling. What specific aspect would you like me to focus on?';
  };

  const handleQuickAction = (action: QuickAction) => {
    setInputValue(action.query);
  };

  // Column definitions
  const historyColumns: Column<TaskHistory>[] = [
    {
      key: 'query',
      header: 'Query',
      cell: (row) => <span className="font-medium">{row.query}</span>,
    },
    {
      key: 'category',
      header: 'Category',
      cell: (row) => (
        <Badge variant="outline" className="bg-slate-800/50">
          {row.category}
        </Badge>
      ),
    },
    {
      key: 'result',
      header: 'Result',
      cell: (row) => <span className="text-sm text-slate-400 max-w-[300px] truncate block">{row.result}</span>,
    },
    {
      key: 'duration',
      header: 'Duration',
      cell: (row) => <span className="text-sm font-mono">{row.duration}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge className={getStatusColor(row.status)}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'timestamp',
      header: 'Time',
      cell: (row) => <span className="text-sm text-slate-400">{row.timestamp}</span>,
    },
    {
      key: 'actions',
      header: '',
      cell: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const capabilityColumns: Column<AgentCapability>[] = [
    {
      key: 'name',
      header: 'Capability',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800">
            <Bot className="h-4 w-4 text-blue-400" />
          </div>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-slate-400">{row.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      cell: (row) => (
        <Badge variant="outline" className="bg-slate-800/50">
          {row.category}
        </Badge>
      ),
    },
    {
      key: 'usageCount',
      header: 'Usage',
      cell: (row) => <span className="text-sm">{row.usageCount} times</span>,
    },
    {
      key: 'lastUsed',
      header: 'Last Used',
      cell: (row) => (
        <span className="text-sm text-slate-400">{row.lastUsed || 'Never'}</span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      cell: (row) => (
        <Badge className={row.isActive ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'}>
          {row.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Cash Flow AI Agent"
        description="Your intelligent assistant for cash flow management and optimization"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Cash Flow', href: '/cash-flow' },
          { label: 'AI Agent' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        }
      />

      {/* KPI Grid */}
      <KPIGrid columns={4}>
        <KPICard
          title="Tasks Completed"
          value={kpiData.tasksCompleted.value}
          icon={CheckCircle2}
          trend={kpiData.tasksCompleted.trend}
          trendValue={kpiData.tasksCompleted.trendValue}
          subtitle={kpiData.tasksCompleted.period}
        />
        <KPICard
          title="Avg Response Time"
          value={kpiData.avgResponseTime.value}
          suffix="s"
          icon={Clock}
          trend={kpiData.avgResponseTime.trend}
          trendValue={kpiData.avgResponseTime.trendValue}
        />
        <KPICard
          title="Accuracy Score"
          value={kpiData.accuracyScore.value}
          suffix="%"
          icon={Target}
          trend={kpiData.accuracyScore.trend}
          trendValue={kpiData.accuracyScore.trendValue}
        />
        <KPICard
          title="Time Saved"
          value={kpiData.automationsSaved.value}
          suffix=" hrs"
          icon={Zap}
          trend={kpiData.automationsSaved.trend}
          trendValue={kpiData.automationsSaved.trendValue}
          subtitle={kpiData.automationsSaved.period}
        />
      </KPIGrid>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-slate-900 border border-slate-800">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-slate-800"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* AI Chat Tab */}
        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-12 gap-6">
            {/* Chat Interface */}
            <Card className="col-span-8 bg-slate-900 border-slate-800">
              <CardHeader className="border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Cash Flow Agent</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Online and ready
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Messages */}
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                          <Avatar className="h-8 w-8">
                            {message.role === 'assistant' ? (
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600">
                                <Bot className="h-4 w-4 text-white" />
                              </AvatarFallback>
                            ) : (
                              <AvatarFallback className="bg-slate-700">U</AvatarFallback>
                            )}
                          </Avatar>
                          <div className={`space-y-2 ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div
                              className={`p-3 rounded-lg ${
                                message.role === 'user'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-800 text-slate-100'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>

                            {/* Insights */}
                            {message.insights && message.insights.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {message.insights.map((insight, idx) => (
                                  <div
                                    key={idx}
                                    className={`px-3 py-1.5 rounded-lg border ${getInsightColor(insight.type)}`}
                                  >
                                    <p className="text-xs text-slate-400">{insight.title}</p>
                                    <p className="text-sm font-medium">{insight.value}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Actions */}
                            {message.actions && message.actions.length > 0 && (
                              <div className="flex items-center gap-2 mt-2">
                                {message.role === 'assistant' && (
                                  <>
                                    <Button variant="ghost" size="sm" className="h-7">
                                      <ThumbsUp className="h-3 w-3" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-7">
                                      <ThumbsDown className="h-3 w-3" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-7">
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            )}

                            <p className="text-xs text-slate-500">{message.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600">
                              <Bot className="h-4 w-4 text-white" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-slate-800 p-3 rounded-lg">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-2 h-2 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Ask me anything about cash flow..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-slate-800 border-slate-700"
                    />
                    <Button variant="ghost" size="sm">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Conversation Starters */}
                  <div className="mt-3">
                    <p className="text-xs text-slate-500 mb-2">Try asking:</p>
                    <div className="flex flex-wrap gap-2">
                      {conversationStarters.slice(0, 3).map((starter, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => setInputValue(starter)}
                        >
                          {starter}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions & Suggestions */}
            <div className="col-span-4 space-y-6">
              {/* Quick Actions */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <Button
                        key={action.id}
                        variant="outline"
                        className="h-auto py-3 flex flex-col items-center justify-center gap-1"
                        onClick={() => handleQuickAction(action)}
                      >
                        {action.icon}
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-400" />
                    AI Suggestions
                  </CardTitle>
                  <CardDescription>Proactive recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {agentSuggestions.slice(0, 3).map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-medium">{suggestion.title}</p>
                          <Badge className={getPriorityColor(suggestion.priority)}>
                            {suggestion.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400">{suggestion.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-400">{suggestion.impact}</span>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            {suggestion.action}
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Capabilities Tab */}
        <TabsContent value="capabilities" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Agent Capabilities</CardTitle>
                <CardDescription>AI-powered features available for cash flow management</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={agentCapabilities}
                  columns={capabilityColumns}
                  searchable
                  searchPlaceholder="Search capabilities..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Task History Tab */}
        <TabsContent value="history" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <Card className="col-span-12 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Task History</CardTitle>
                <CardDescription>Recent AI agent tasks and results</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  data={taskHistory}
                  columns={historyColumns}
                  searchable
                  searchPlaceholder="Search tasks..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Suggestions Tab */}
        <TabsContent value="suggestions" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  AI-Powered Suggestions
                </h3>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {agentSuggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="bg-slate-900 border-slate-800">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium">{suggestion.title}</h4>
                          <Badge className={getPriorityColor(suggestion.priority)}>
                            {suggestion.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400">{suggestion.description}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span className="text-sm text-green-400">{suggestion.impact}</span>
                          </div>
                          <Button size="sm">
                            {suggestion.action}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <Card className="col-span-6 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Agent Configuration</CardTitle>
                <CardDescription>Customize AI agent behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Proactive Suggestions</p>
                      <p className="text-sm text-slate-400">Get AI-powered recommendations automatically</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-Analysis</p>
                      <p className="text-sm text-slate-400">Run daily automated analysis</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Risk Alerts</p>
                      <p className="text-sm text-slate-400">Notify on high-risk situations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Voice Input</p>
                      <p className="text-sm text-slate-400">Enable voice commands</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-6 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Analysis Preferences</CardTitle>
                <CardDescription>Set default analysis parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Forecast Period</label>
                    <Select defaultValue="30">
                      <SelectTrigger className="bg-slate-800 border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="14">14 Days</SelectItem>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Risk Threshold</label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="bg-slate-800 border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Score &gt; 30)</SelectItem>
                        <SelectItem value="medium">Medium (Score &gt; 50)</SelectItem>
                        <SelectItem value="high">High (Score &gt; 70)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Analysis Depth</label>
                    <Select defaultValue="detailed">
                      <SelectTrigger className="bg-slate-800 border-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quick">Quick Summary</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="detailed">Detailed Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions Bar */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg">Agent Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Brain className="h-4 w-4 mr-2" />
              Run Full Analysis
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Forecast
            </Button>
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Risk Assessment
            </Button>
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Optimize Collections
            </Button>
            <Button variant="outline" size="sm">
              <Wallet className="h-4 w-4 mr-2" />
              Payment Recommendations
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Variance Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
