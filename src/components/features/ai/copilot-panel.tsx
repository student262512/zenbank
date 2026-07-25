'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sparkles,
  X,
  Minimize2,
  Maximize2,
  MessageSquare,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  History,
  Pin,
  MoreHorizontal,
  ChevronRight,
  Bot,
  Send,
  Zap,
} from 'lucide-react';

export interface CopilotInsight {
  id: string;
  type: 'recommendation' | 'warning' | 'opportunity' | 'trend';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action?: {
    label: string;
    onClick: () => void;
  };
  timestamp: Date;
  pinned?: boolean;
}

export interface CopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  insights?: CopilotInsight[];
  onSendMessage?: (message: string) => void;
  onInsightAction?: (insightId: string) => void;
  onPinInsight?: (insightId: string) => void;
  context?: {
    page: string;
    entity?: string;
    dateRange?: string;
  };
  className?: string;
}

const quickActions = [
  { icon: TrendingUp, label: 'Analyze cash position', query: 'Analyze our current cash position across all entities' },
  { icon: AlertTriangle, label: 'Check risk alerts', query: 'What are the current risk alerts I should be aware of?' },
  { icon: Lightbulb, label: 'Get recommendations', query: 'Give me recommendations to optimize our working capital' },
  { icon: Zap, label: 'Quick forecast', query: 'Generate a 7-day cash flow forecast' },
];

// Mock insights
const mockInsights: CopilotInsight[] = [
  {
    id: '1',
    type: 'warning',
    title: 'DSCR Covenant at Risk',
    description: 'Current DSCR ratio is 1.32x, approaching the 1.25x threshold. Consider debt restructuring or increasing operating cash flows.',
    priority: 'high',
    action: { label: 'View Details', onClick: () => {} },
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'Idle Cash Detected',
    description: '₹45 Cr sitting idle in current accounts. Consider moving to overnight funds for additional yield of ~₹2.3L daily.',
    priority: 'medium',
    action: { label: 'Create Transfer', onClick: () => {} },
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '3',
    type: 'recommendation',
    title: 'Payment Optimization',
    description: 'Early payment to 3 vendors could save ₹12.5L in dynamic discounting. Payment window closes in 2 days.',
    priority: 'high',
    action: { label: 'Review Vendors', onClick: () => {} },
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '4',
    type: 'trend',
    title: 'Collection Pattern Change',
    description: 'Customer payment behavior shifted - average DSO increased by 5 days this month. May impact next week\'s cash forecast.',
    priority: 'low',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
];

export function CopilotPanel({
  isOpen,
  onClose,
  insights = mockInsights,
  onSendMessage,
  onInsightAction,
  onPinInsight,
  context,
  className,
}: CopilotPanelProps) {
  const [activeTab, setActiveTab] = React.useState('insights');
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [input, setInput] = React.useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage?.(input.trim());
      setInput('');
    }
  };

  const priorityColors = {
    high: 'border-red-500/30 bg-red-500/5',
    medium: 'border-yellow-500/30 bg-yellow-500/5',
    low: 'border-blue-500/30 bg-blue-500/5',
  };

  const typeIcons = {
    recommendation: Lightbulb,
    warning: AlertTriangle,
    opportunity: TrendingUp,
    trend: TrendingUp,
  };

  const typeColors = {
    recommendation: 'text-blue-400',
    warning: 'text-yellow-400',
    opportunity: 'text-emerald-400',
    trend: 'text-cyan-400',
  };

  return (
    <div
      className={cn(
        'fixed right-4 z-50 flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl transition-all',
        isMinimized ? 'bottom-4 h-14 w-80' : 'bottom-4 top-20 w-96',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-white">AI Copilot</h3>
            {!isMinimized && context && (
              <p className="text-xs text-slate-500">Analyzing: {context.page}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? (
              <Maximize2 className="h-4 w-4 text-slate-400" />
            ) : (
              <Minimize2 className="h-4 w-4 text-slate-400" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-4 w-4 text-slate-400" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            <TabsList className="mx-4 mt-3 grid w-auto grid-cols-3">
              <TabsTrigger value="insights" className="gap-1 text-xs">
                <Lightbulb className="h-3 w-3" />
                Insights
                <Badge variant="secondary" className="ml-1 h-4 px-1 text-[10px]">
                  {insights.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="chat" className="gap-1 text-xs">
                <MessageSquare className="h-3 w-3" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-1 text-xs">
                <History className="h-3 w-3" />
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="flex-1 mt-0 min-h-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-3">
                  {insights.map((insight) => {
                    const Icon = typeIcons[insight.type];
                    return (
                      <Card
                        key={insight.id}
                        className={cn(
                          'border p-3 transition-colors hover:bg-slate-800/50',
                          priorityColors[insight.priority]
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', typeColors[insight.type])} />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-medium text-white">{insight.title}</h4>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 shrink-0"
                                onClick={() => onPinInsight?.(insight.id)}
                              >
                                <Pin
                                  className={cn(
                                    'h-3 w-3',
                                    insight.pinned ? 'fill-blue-400 text-blue-400' : 'text-slate-500'
                                  )}
                                />
                              </Button>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-slate-400">
                              {insight.description}
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-[10px] text-slate-500">
                                {insight.timestamp.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                              {insight.action && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 gap-1 px-2 text-xs text-blue-400"
                                  onClick={() => {
                                    insight.action?.onClick();
                                    onInsightAction?.(insight.id);
                                  }}
                                >
                                  {insight.action.label}
                                  <ChevronRight className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chat" className="flex-1 flex flex-col mt-0 min-h-0">
              {/* Quick Actions */}
              <div className="border-b border-slate-800 px-4 py-3">
                <p className="mb-2 text-xs text-slate-500">Quick Actions</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => onSendMessage?.(action.query)}
                      className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-2 text-left text-xs text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                    >
                      <action.icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat area placeholder */}
              <div className="flex flex-1 items-center justify-center p-4">
                <div className="text-center">
                  <Bot className="mx-auto h-12 w-12 text-slate-700" />
                  <p className="mt-2 text-sm text-slate-400">Start a conversation</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Ask me anything about your financial data
                  </p>
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-slate-800 p-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask AI Copilot..."
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                  <Button
                    size="icon"
                    className="h-9 w-9 bg-gradient-to-r from-blue-600 to-cyan-600"
                    onClick={handleSend}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="flex-1 mt-0 min-h-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-slate-800/50 px-3 py-2 text-sm text-slate-400"
                    >
                      Previous conversation {i + 1}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

export default CopilotPanel;
