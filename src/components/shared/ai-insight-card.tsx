'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  type LucideIcon,
} from 'lucide-react';

export interface AIInsightCardProps {
  title: string;
  insight: string;
  type?: 'recommendation' | 'warning' | 'opportunity' | 'trend' | 'success';
  confidence?: number;
  impact?: 'high' | 'medium' | 'low';
  impactValue?: string;
  source?: string;
  timestamp?: string;
  actions?: {
    label: string;
    onClick: () => void;
    primary?: boolean;
  }[];
  onFeedback?: (positive: boolean) => void;
  onCopy?: () => void;
  onShare?: () => void;
  className?: string;
  compact?: boolean;
}

const typeConfig: Record<
  string,
  { icon: LucideIcon; color: string; bgColor: string; label: string }
> = {
  recommendation: {
    icon: Lightbulb,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    label: 'Recommendation',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    label: 'Warning',
  },
  opportunity: {
    icon: TrendingUp,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    label: 'Opportunity',
  },
  trend: {
    icon: TrendingDown,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    label: 'Trend Analysis',
  },
  success: {
    icon: CheckCircle2,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    label: 'Success',
  },
};

const impactColors = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  low: 'bg-green-500/10 text-green-400 border-green-500/20',
};

export function AIInsightCard({
  title,
  insight,
  type = 'recommendation',
  confidence,
  impact,
  impactValue,
  source,
  timestamp,
  actions,
  onFeedback,
  onCopy,
  onShare,
  className,
  compact = false,
}: AIInsightCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  if (compact) {
    return (
      <div
        className={cn(
          'flex items-start gap-3 rounded-lg border border-slate-800 p-3',
          config.bgColor,
          className
        )}
      >
        <div className={cn('mt-0.5 shrink-0', config.color)}>
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-300">{insight}</p>
          {actions && actions.length > 0 && (
            <button
              onClick={actions[0].onClick}
              className={cn('mt-2 flex items-center gap-1 text-xs font-medium', config.color)}
            >
              {actions[0].label}
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className={cn('overflow-hidden border-slate-800 bg-slate-900/50', className)}>
      {/* Header */}
      <div className="flex items-start justify-between border-b border-slate-800 p-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg',
              config.bgColor
            )}
          >
            <Icon className={cn('h-5 w-5', config.color)} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-white">{title}</h4>
              <Badge variant="outline" className={cn('text-[10px]', config.color)}>
                <Sparkles className="mr-1 h-3 w-3" />
                AI
              </Badge>
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <span>{config.label}</span>
              {source && (
                <>
                  <span>•</span>
                  <span>{source}</span>
                </>
              )}
              {timestamp && (
                <>
                  <span>•</span>
                  <span>{timestamp}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-1">
          {onCopy && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCopy}>
              <Copy className="h-4 w-4 text-slate-400" />
            </Button>
          )}
          {onShare && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onShare}>
              <Share2 className="h-4 w-4 text-slate-400" />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm leading-relaxed text-slate-300">{insight}</p>

        {/* Metrics */}
        {(confidence !== undefined || impact || impactValue) && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {confidence !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Confidence</span>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-blue-400">{confidence}%</span>
                </div>
              </div>
            )}
            {impact && (
              <div
                className={cn(
                  'rounded-full border px-2 py-0.5 text-xs font-medium',
                  impactColors[impact]
                )}
              >
                {impact.charAt(0).toUpperCase() + impact.slice(1)} Impact
              </div>
            )}
            {impactValue && (
              <div className="text-sm font-medium text-emerald-400">{impactValue}</div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      {(actions || onFeedback) && (
        <div className="flex items-center justify-between border-t border-slate-800 px-4 py-3">
          {actions && (
            <div className="flex items-center gap-2">
              {actions.map((action, i) => (
                <Button
                  key={i}
                  variant={action.primary ? 'default' : 'outline'}
                  size="sm"
                  onClick={action.onClick}
                  className={action.primary ? 'gap-2' : ''}
                >
                  {action.label}
                  {action.primary && <ArrowRight className="h-4 w-4" />}
                </Button>
              ))}
            </div>
          )}

          {onFeedback && (
            <div className="flex items-center gap-1">
              <span className="mr-2 text-xs text-slate-500">Helpful?</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-green-500/10 hover:text-green-400"
                onClick={() => onFeedback(true)}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-red-500/10 hover:text-red-400"
                onClick={() => onFeedback(false)}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

// AI Insights Panel (multiple insights)
export interface AIInsightsPanelProps {
  insights: AIInsightCardProps[];
  title?: string;
  className?: string;
  compact?: boolean;
}

export function AIInsightsPanel({
  insights,
  title = 'AI Insights',
  className,
  compact = false,
}: AIInsightsPanelProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-blue-400" />
        <h3 className="font-medium text-white">{title}</h3>
        <Badge variant="secondary" className="ml-auto">
          {insights.length} insights
        </Badge>
      </div>

      <div className={cn('space-y-3', compact && 'space-y-2')}>
        {insights.map((insight, i) => (
          <AIInsightCard key={i} {...insight} compact={compact} />
        ))}
      </div>
    </div>
  );
}

export default AIInsightCard;
