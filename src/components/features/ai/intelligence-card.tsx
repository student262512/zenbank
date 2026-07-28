'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Newspaper,
  Globe,
  Building2,
  BarChart3,
  Lightbulb,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Bookmark,
  Share2,
  Clock,
  type LucideIcon,
} from 'lucide-react';

export type IntelligenceType =
  | 'market'
  | 'competitor'
  | 'regulatory'
  | 'economic'
  | 'industry'
  | 'technology'
  | 'customer'
  | 'vendor';

export type IntelligenceSentiment = 'positive' | 'neutral' | 'negative' | 'mixed';
export type IntelligenceRelevance = 'critical' | 'high' | 'medium' | 'low';

export interface IntelligenceSource {
  name: string;
  type: 'news' | 'report' | 'analysis' | 'filing' | 'social' | 'internal';
  url?: string;
}

export interface IntelligenceImpact {
  area: string;
  description: string;
  magnitude: 'high' | 'medium' | 'low';
}

export interface BusinessIntelligence {
  id: string;
  title: string;
  type: IntelligenceType;
  sentiment: IntelligenceSentiment;
  relevance: IntelligenceRelevance;
  summary: string;
  analysis: string;
  impacts: IntelligenceImpact[];
  aiInsight: string;
  actionRequired: boolean;
  sources: IntelligenceSource[];
  tags: string[];
  publishedAt: Date;
  processedAt: Date;
}

export interface IntelligenceCardProps {
  intelligence: BusinessIntelligence;
  onViewDetails?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  onTakeAction?: () => void;
  className?: string;
  compact?: boolean;
}

const typeConfig: Record<IntelligenceType, { icon: LucideIcon; label: string; color: string; bg: string }> = {
  market: {
    icon: BarChart3,
    label: 'Market Intelligence',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  competitor: {
    icon: Building2,
    label: 'Competitor Intel',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  regulatory: {
    icon: Globe,
    label: 'Regulatory',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  economic: {
    icon: TrendingUp,
    label: 'Economic',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  industry: {
    icon: Newspaper,
    label: 'Industry News',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  technology: {
    icon: Lightbulb,
    label: 'Technology',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
  customer: {
    icon: Building2,
    label: 'Customer Intel',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
  vendor: {
    icon: Building2,
    label: 'Vendor Intel',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
  },
};

const sentimentConfig: Record<IntelligenceSentiment, { label: string; color: string; icon: LucideIcon }> = {
  positive: { label: 'Positive', color: 'text-green-400', icon: TrendingUp },
  neutral: { label: 'Neutral', color: 'text-slate-400', icon: BarChart3 },
  negative: { label: 'Negative', color: 'text-red-400', icon: TrendingDown },
  mixed: { label: 'Mixed', color: 'text-yellow-400', icon: AlertCircle },
};

const relevanceConfig: Record<IntelligenceRelevance, { label: string; color: string; bg: string }> = {
  critical: { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10' },
  high: { label: 'High', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  medium: { label: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  low: { label: 'Low', color: 'text-blue-400', bg: 'bg-blue-500/10' },
};

const magnitudeColors = {
  high: 'text-red-400',
  medium: 'text-yellow-400',
  low: 'text-blue-400',
};

export function IntelligenceCard({
  intelligence,
  onViewDetails,
  onBookmark,
  onShare,
  onTakeAction,
  className,
  compact = false,
}: IntelligenceCardProps) {
  const type = typeConfig[intelligence.type];
  const sentiment = sentimentConfig[intelligence.sentiment];
  const relevance = relevanceConfig[intelligence.relevance];
  const TypeIcon = type.icon;
  const SentimentIcon = sentiment.icon;

  // Time since published
  const timeSince = React.useMemo(() => {
    const diff = Date.now() - intelligence.publishedAt.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  }, [intelligence.publishedAt]);

  if (compact) {
    return (
      <Card
        className={cn(
          'border border-slate-800 p-4 transition-all hover:shadow-lg cursor-pointer',
          'bg-slate-900/50',
          className
        )}
        onClick={onViewDetails}
      >
        <div className="flex items-start gap-3">
          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', type.bg)}>
            <TypeIcon className={cn('h-5 w-5', type.color)} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="truncate text-sm font-medium text-white">{intelligence.title}</h4>
              {intelligence.actionRequired && (
                <Badge variant="destructive" className="shrink-0 text-[10px]">
                  Action
                </Badge>
              )}
            </div>
            <p className="mt-1 line-clamp-1 text-xs text-slate-400">{intelligence.summary}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline" className={cn('text-xs', type.color)}>
                {type.label}
              </Badge>
              <div className={cn('flex items-center gap-1 text-xs', sentiment.color)}>
                <SentimentIcon className="h-3 w-3" />
                {sentiment.label}
              </div>
              <span className="text-xs text-slate-500">{timeSince}</span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'overflow-hidden border border-slate-800 transition-all hover:shadow-lg',
        'bg-slate-900/50',
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', type.bg)}>
              <TypeIcon className={cn('h-6 w-6', type.color)} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{intelligence.title}</h3>
                {intelligence.actionRequired && (
                  <Badge variant="destructive" className="text-xs">
                    Action Required
                  </Badge>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className={cn('text-xs', type.color)}>
                  {type.label}
                </Badge>
                <Badge className={cn('text-xs', relevance.bg, relevance.color)}>
                  {relevance.label} Relevance
                </Badge>
                <div className={cn('flex items-center gap-1 text-xs', sentiment.color)}>
                  <SentimentIcon className="h-3 w-3" />
                  {sentiment.label}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {onBookmark && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBookmark}>
                <Bookmark className="h-4 w-4 text-slate-400" />
              </Button>
            )}
            {onShare && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onShare}>
                <Share2 className="h-4 w-4 text-slate-400" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="border-b border-slate-800 p-4">
        <p className="text-sm text-slate-300">{intelligence.summary}</p>
      </div>

      {/* Analysis */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Brain className="h-3 w-3 text-purple-400" />
          AI Analysis
        </div>
        <p className="mt-1 text-sm text-slate-300">{intelligence.analysis}</p>
      </div>

      {/* Impacts */}
      <div className="border-b border-slate-800 p-4">
        <p className="text-xs text-slate-500">Business Impacts</p>
        <div className="mt-2 space-y-2">
          {intelligence.impacts.map((impact, i) => (
            <div key={i} className="flex items-start gap-2">
              <Badge variant="outline" className={cn('shrink-0 text-xs', magnitudeColors[impact.magnitude])}>
                {impact.area}
              </Badge>
              <span className="text-sm text-slate-400">{impact.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insight */}
      <div className="space-y-3 border-b border-slate-800 p-4">
        <div className="rounded-lg bg-blue-500/5 p-3">
          <div className="flex items-center gap-2 text-xs text-blue-400">
            <Sparkles className="h-3 w-3" />
            AI Insight
          </div>
          <p className="mt-1 text-sm text-white">{intelligence.aiInsight}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex flex-wrap gap-2">
          {intelligence.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Sources & Timestamp */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-3">
          {intelligence.sources.slice(0, 2).map((source, i) => (
            <div key={i} className="flex items-center gap-1">
              <Newspaper className="h-3 w-3 text-slate-500" />
              <span className="text-xs text-slate-400">{source.name}</span>
              {source.url && <ExternalLink className="h-3 w-3 text-slate-500" />}
            </div>
          ))}
          {intelligence.sources.length > 2 && (
            <span className="text-xs text-slate-500">+{intelligence.sources.length - 2} more</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Clock className="h-3 w-3" />
          {timeSince}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {onViewDetails && (
            <Button variant="outline" size="sm" onClick={onViewDetails}>
              View Full Report
            </Button>
          )}
        </div>
        {onTakeAction && intelligence.actionRequired && (
          <Button size="sm" onClick={onTakeAction} className="gap-1 bg-blue-600 hover:bg-blue-500">
            <Lightbulb className="h-4 w-4" />
            Take Action
          </Button>
        )}
      </div>
    </Card>
  );
}

// Intelligence List Component
export function IntelligenceList({
  items,
  compact = false,
  className,
  onViewDetails,
  onBookmark,
  onShare,
  onTakeAction,
}: {
  items: BusinessIntelligence[];
  compact?: boolean;
  className?: string;
  onViewDetails?: (item: BusinessIntelligence) => void;
  onBookmark?: (item: BusinessIntelligence) => void;
  onShare?: (item: BusinessIntelligence) => void;
  onTakeAction?: (item: BusinessIntelligence) => void;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => (
        <IntelligenceCard
          key={item.id}
          intelligence={item}
          compact={compact}
          onViewDetails={onViewDetails ? () => onViewDetails(item) : undefined}
          onBookmark={onBookmark ? () => onBookmark(item) : undefined}
          onShare={onShare ? () => onShare(item) : undefined}
          onTakeAction={onTakeAction ? () => onTakeAction(item) : undefined}
        />
      ))}
    </div>
  );
}

// Mock data
export const mockIntelligence: BusinessIntelligence[] = [
  {
    id: 'intel-1',
    title: 'RBI Maintains Repo Rate, Signals Possible Cut in Q1',
    type: 'regulatory',
    sentiment: 'positive',
    relevance: 'high',
    summary: 'RBI kept repo rate unchanged at 6.5% citing inflation concerns, but signaled potential easing in Q1 2025 if inflation remains within target.',
    analysis: 'The unchanged rate maintains status quo on borrowing costs. However, the forward guidance suggests potential 25-50 bps cut in Q1 which could benefit our floating rate portfolio.',
    impacts: [
      { area: 'Treasury', description: 'Opportunity to lock fixed rates before potential cut', magnitude: 'medium' },
      { area: 'Debt', description: 'Floating rate loans continue at current levels', magnitude: 'low' },
    ],
    aiInsight: 'Consider extending duration on fixed income investments. Historical patterns show 8-12 week lag between rate cut signals and execution.',
    actionRequired: false,
    sources: [
      { name: 'RBI Statement', type: 'filing' },
      { name: 'Economic Times', type: 'news', url: 'https://example.com' },
    ],
    tags: ['Interest Rates', 'RBI', 'Monetary Policy', 'Treasury'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    processedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 'intel-2',
    title: 'Major Customer ABC Corp Reports Q3 Revenue Miss',
    type: 'customer',
    sentiment: 'negative',
    relevance: 'critical',
    summary: 'ABC Corp, our 3rd largest customer (₹45 Cr exposure), reported 18% revenue miss with guidance cut for FY25.',
    analysis: 'Financial stress indicators triggered. Payment patterns show 12-day extension in last 2 months. Credit rating under review for potential downgrade.',
    impacts: [
      { area: 'Collections', description: 'High risk of payment delays, possible provisions needed', magnitude: 'high' },
      { area: 'Credit', description: 'Credit limit review recommended', magnitude: 'high' },
    ],
    aiInsight: 'Recommend immediate credit limit reduction to ₹30 Cr and enhanced monitoring. Consider requesting additional collateral or bank guarantee.',
    actionRequired: true,
    sources: [
      { name: 'ABC Corp Investor Call', type: 'filing' },
      { name: 'Credit Rating Agency', type: 'report' },
    ],
    tags: ['Customer Risk', 'Credit', 'Collections', 'Provisions'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    processedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: 'intel-3',
    title: 'Infrastructure Sector Q3 Order Book Surges 35%',
    type: 'industry',
    sentiment: 'positive',
    relevance: 'high',
    summary: 'Infrastructure sector order books hit record high with 35% YoY growth driven by government capex and private investment.',
    analysis: 'Strong leading indicator for our construction finance portfolio. Execution metrics showing improvement across top 10 infra companies.',
    impacts: [
      { area: 'Project Finance', description: 'Positive outlook for milestone-based collections', magnitude: 'high' },
      { area: 'Working Capital', description: 'Expect increased demand for construction finance', magnitude: 'medium' },
    ],
    aiInsight: 'Sector tailwinds support growth strategy. Consider increasing exposure to infrastructure sector within credit policy limits.',
    actionRequired: false,
    sources: [
      { name: 'ICRA Report', type: 'report' },
      { name: 'Ministry of Finance', type: 'filing' },
    ],
    tags: ['Infrastructure', 'Sector Analysis', 'Growth', 'Construction'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    processedAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
  },
  {
    id: 'intel-4',
    title: 'INR Under Pressure as DXY Strengthens',
    type: 'economic',
    sentiment: 'negative',
    relevance: 'high',
    summary: 'INR weakened 1.5% in past week to 84.20 as Dollar Index strengthened on Fed hawkish stance.',
    analysis: 'Technical analysis suggests INR could test 84.50-85.00 range in near term. RBI intervention limited due to forex reserve optimization.',
    impacts: [
      { area: 'FX', description: 'Unhedged USD payables at higher risk', magnitude: 'high' },
      { area: 'Imports', description: 'Material cost increases expected', magnitude: 'medium' },
    ],
    aiInsight: 'Current forward rates favorable for 6-month hedging. Recommend covering 80% of net USD exposure immediately.',
    actionRequired: true,
    sources: [
      { name: 'Bloomberg', type: 'analysis' },
      { name: 'Reuters', type: 'news' },
    ],
    tags: ['FX', 'Currency', 'Hedging', 'USD/INR'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    processedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: 'intel-5',
    title: 'New GST Compliance Rules Effective Next Month',
    type: 'regulatory',
    sentiment: 'neutral',
    relevance: 'medium',
    summary: 'New e-invoicing rules for B2B transactions above ₹5 Cr threshold effective from next month.',
    analysis: 'Compliance requirement for all B2B invoices. Systems already updated. Minor process changes needed for vendor onboarding.',
    impacts: [
      { area: 'Finance', description: 'Process changes for invoice generation', magnitude: 'low' },
      { area: 'Vendors', description: 'Communication needed for vendor compliance', magnitude: 'low' },
    ],
    aiInsight: 'Systems ready for compliance. Schedule vendor communication campaign 2 weeks before effective date.',
    actionRequired: false,
    sources: [
      { name: 'CBIC Notification', type: 'filing' },
      { name: 'Tax Updates', type: 'news' },
    ],
    tags: ['GST', 'Compliance', 'Tax', 'E-invoicing'],
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    processedAt: new Date(Date.now() - 1000 * 60 * 60 * 46),
  },
];

export default IntelligenceCard;
