'use client';

import * as React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { PageContainer, Section } from '@/components/layout/dashboard-shell';
import { DataTable, type Column } from '@/components/shared/data-table/data-table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
  Bot,
  Send,
  Mic,
  Paperclip,
  Sparkles,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  RefreshCcw,
  Download,
  Settings,
  Zap,
  Brain,
  MessageSquare,
  FileText,
  Play,
  ThumbsUp,
  ThumbsDown,
  Copy,
  ExternalLink,
} from 'lucide-react';

// Suggested Prompts
const suggestedPrompts = [
  { icon: <TrendingUp className="h-4 w-4" />, label: 'Optimize Liquidity', prompt: 'Analyze current liquidity position and recommend optimization strategies' },
  { icon: <ArrowRight className="h-4 w-4" />, label: 'Recommend Transfer', prompt: 'Recommend optimal intercompany fund transfer for today' },
  { icon: <Sparkles className="h-4 w-4" />, label: 'Investment Options', prompt: 'Suggest best investment options for surplus cash of INR 50 Cr' },
  { icon: <AlertTriangle className="h-4 w-4" />, label: 'Predict Stress', prompt: 'Predict liquidity stress scenarios for next 30 days' },
  { icon: <Brain className="h-4 w-4" />, label: 'Explain Risk', prompt: 'Explain current treasury risk profile and mitigation strategies' },
  { icon: <Zap className="h-4 w-4" />, label: 'Funding Source', prompt: 'Recommend optimal funding source for Project Delta' },
  { icon: <Lightbulb className="h-4 w-4" />, label: 'Optimize Cash', prompt: 'Identify idle cash and recommend deployment strategies' },
  { icon: <TrendingUp className="h-4 w-4" />, label: 'Hedge Strategy', prompt: 'Recommend FX hedging strategy for USD 10M exposure' },
];

// Mock Chat Messages
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: string[];
  confidence?: number;
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I\'m your Treasury AI Copilot. I can help you with liquidity analysis, investment recommendations, risk assessment, and treasury operations. How can I assist you today?',
    timestamp: '10:00 AM',
  },
];

// Recommendations Data
interface RecommendationRecord {
  id: string;
  recommendation: string;
  category: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  impact: string;
  confidence: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Implemented';
  createdAt: string;
}

const recommendationsData: RecommendationRecord[] = [
  { id: 'REC-001', recommendation: 'Move INR 30 Cr from HDFC to SBI to reduce concentration', category: 'Concentration', priority: 'High', impact: 'Reduce HDFC exposure to 15%', confidence: 95, status: 'Pending', createdAt: '2024-01-15' },
  { id: 'REC-002', recommendation: 'Hedge EUR 5M exposure via 3-month forward', category: 'FX', priority: 'High', impact: 'Reduce FX risk by 8 points', confidence: 88, status: 'Pending', createdAt: '2024-01-15' },
  { id: 'REC-003', recommendation: 'Invest INR 50 Cr in 6-month FD at ICICI', category: 'Investment', priority: 'Medium', impact: 'Add INR 1.85 Cr yield', confidence: 92, status: 'Approved', createdAt: '2024-01-14' },
  { id: 'REC-004', recommendation: 'Increase liquidity buffer by INR 100 Cr', category: 'Liquidity', priority: 'Medium', impact: 'Improve ratio to 1.52x', confidence: 85, status: 'Pending', createdAt: '2024-01-14' },
  { id: 'REC-005', recommendation: 'Consolidate 3 bank accounts at Axis Bank', category: 'Operations', priority: 'Low', impact: 'Save INR 5 Lakhs/year', confidence: 78, status: 'Implemented', createdAt: '2024-01-10' },
];

// Knowledge Base
const knowledgeCategories = [
  { name: 'Treasury Policies', count: 24, lastUpdated: '2024-01-10' },
  { name: 'Bank Agreements', count: 18, lastUpdated: '2024-01-08' },
  { name: 'Investment Guidelines', count: 12, lastUpdated: '2024-01-05' },
  { name: 'FX Policies', count: 8, lastUpdated: '2024-01-02' },
  { name: 'Risk Framework', count: 15, lastUpdated: '2024-01-12' },
  { name: 'Regulatory Compliance', count: 32, lastUpdated: '2024-01-14' },
];

// Recommendation columns
const recommendationColumns: Column<RecommendationRecord>[] = [
  { id: 'recommendation', header: 'Recommendation', accessor: 'recommendation' },
  {
    id: 'category',
    header: 'Category',
    accessor: 'category',
    cell: (row) => <Badge variant="outline">{row.category}</Badge>,
    sortable: true,
  },
  {
    id: 'priority',
    header: 'Priority',
    accessor: 'priority',
    cell: (row) => (
      <Badge variant={row.priority === 'Critical' ? 'destructive' : row.priority === 'High' ? 'secondary' : 'outline'}>
        {row.priority}
      </Badge>
    ),
    sortable: true,
  },
  { id: 'impact', header: 'Impact', accessor: 'impact' },
  {
    id: 'confidence',
    header: 'Confidence',
    accessor: 'confidence',
    cell: (row) => (
      <div className="flex items-center gap-2">
        <Progress value={row.confidence} className="h-2 w-16" />
        <span className="font-mono text-sm">{row.confidence}%</span>
      </div>
    ),
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: 'status',
    cell: (row) => (
      <Badge variant={row.status === 'Implemented' ? 'default' : row.status === 'Approved' ? 'secondary' : row.status === 'Rejected' ? 'destructive' : 'outline'}>
        {row.status === 'Implemented' && <CheckCircle2 className="mr-1 h-3 w-3" />}
        {row.status === 'Pending' && <Clock className="mr-1 h-3 w-3" />}
        {row.status}
      </Badge>
    ),
  },
];

export default function TreasuryAIAgentPage() {
  const [activeTab, setActiveTab] = React.useState('copilot');
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = React.useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Based on my analysis of your treasury data, I recommend focusing on liquidity optimization. Your current cash position shows INR 2,890 Cr with a liquidity ratio of 1.45x. I\'ve identified INR 45 Cr in idle cash that could be deployed in short-term investments.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: 92,
        citations: ['Treasury Dashboard', 'Investment Policy v2.3'],
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Treasury AI Agent"
        description="AI-powered treasury copilot for recommendations and insights"
        breadcrumbs={[
          { label: 'Treasury', href: '/treasury' },
          { label: 'AI Agent', href: '/treasury/ai' },
        ]}
        actions={[
          { label: 'Settings', icon: <Settings className="h-4 w-4" />, onClick: () => {}, variant: 'outline' },
        ]}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="copilot">AI Copilot</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="investigations">Investigations</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
        </TabsList>

        {/* AI Copilot Tab */}
        <TabsContent value="copilot" className="space-y-4">
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-3">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-blue-500" />
                    Treasury Copilot
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 pr-4 mb-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-lg p-4 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <p className="text-sm">{message.content}</p>
                            {message.confidence && (
                              <div className="mt-2 flex items-center gap-2 text-xs opacity-70">
                                <span>Confidence: {message.confidence}%</span>
                              </div>
                            )}
                            {message.citations && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {message.citations.map((citation, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">{citation}</Badge>
                                ))}
                              </div>
                            )}
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs opacity-50">{message.timestamp}</span>
                              {message.role === 'assistant' && (
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><ThumbsUp className="h-3 w-3" /></Button>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><ThumbsDown className="h-3 w-3" /></Button>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Copy className="h-3 w-3" /></Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Button variant="outline" size="icon"><Paperclip className="h-4 w-4" /></Button>
                    <Input
                      placeholder="Ask Treasury Copilot..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon"><Mic className="h-4 w-4" /></Button>
                    <Button onClick={handleSendMessage}><Send className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-1">
              <Card className="h-[600px]">
                <CardHeader>
                  <CardTitle className="text-sm">Suggested Prompts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {suggestedPrompts.map((prompt, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-2"
                        onClick={() => setInputValue(prompt.prompt)}
                      >
                        <span className="mr-2">{prompt.icon}</span>
                        <span className="text-sm">{prompt.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4"><div className="text-sm text-muted-foreground">Total</div><div className="text-2xl font-bold">24</div></Card>
            <Card className="p-4"><div className="text-sm text-muted-foreground">Pending</div><div className="text-2xl font-bold text-orange-600">8</div></Card>
            <Card className="p-4"><div className="text-sm text-muted-foreground">Implemented</div><div className="text-2xl font-bold text-green-600">14</div></Card>
            <Card className="p-4"><div className="text-sm text-muted-foreground">Est. Impact</div><div className="text-2xl font-bold">₹12 Cr</div></Card>
          </div>
          <Section title="AI Recommendations" description="Actionable recommendations">
            <DataTable data={recommendationsData} columns={recommendationColumns} searchable pageSize={10} />
          </Section>
        </TabsContent>

        {/* Investigations Tab */}
        <TabsContent value="investigations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5 text-purple-500" />AI Investigations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div><h4 className="font-medium">Why did liquidity drop last week?</h4><p className="text-sm text-muted-foreground">Jan 12, 2024</p></div>
                    <Badge>Completed</Badge>
                  </div>
                  <p className="text-sm">Root cause: Large CapEx payment + delayed collection. Recommendation: Improve forecasting.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div><h4 className="font-medium">Investment yield underperformance</h4><p className="text-sm text-muted-foreground">Jan 14, 2024</p></div>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <Progress value={65} className="h-2 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Knowledge Base Tab */}
        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-blue-500" />Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {knowledgeCategories.map((category, i) => (
                  <Card key={i} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{category.name}</h4>
                      <Badge variant="outline">{category.count}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Updated: {category.lastUpdated}</p>
                    <Button variant="link" className="px-0 mt-2 text-sm">View <ExternalLink className="ml-1 h-3 w-3" /></Button>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automations Tab */}
        <TabsContent value="automations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-yellow-500" />AI Automations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Daily Liquidity Analysis', schedule: '6:00 AM daily', status: 'Active' },
                  { name: 'Investment Maturity Alerts', schedule: '7 days before', status: 'Active' },
                  { name: 'FX Rate Monitoring', schedule: 'On ±1% move', status: 'Active' },
                  { name: 'Risk Threshold Alerts', schedule: 'On breach', status: 'Paused' },
                ].map((automation, i) => (
                  <div key={i} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{automation.name}</h4>
                      <p className="text-sm text-muted-foreground">{automation.schedule}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={automation.status === 'Active' ? 'default' : 'secondary'}>{automation.status}</Badge>
                      <Button variant="outline" size="sm"><Play className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm"><RefreshCcw className="mr-2 h-4 w-4" />Refresh</Button>
            <Button variant="outline" size="sm"><MessageSquare className="mr-2 h-4 w-4" />New Chat</Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm"><Settings className="mr-2 h-4 w-4" />AI Settings</Button>
            <Button size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
