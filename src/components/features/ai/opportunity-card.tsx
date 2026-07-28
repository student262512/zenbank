'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  DollarSign,
  Percent,
  Clock,
  Sparkles,
  ChevronRight,
  Zap,
  Target,
  PiggyBank,
  Briefcase,
  Building2,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Circle,
  type LucideIcon,
} from 'lucide-react';

export type OpportunityType =
  | 'yield'
  | 'cost-savings'
  | 'refinancing'
  | 'investment'
  | 'revenue'
  | 'efficiency'
  | 'arbitrage'
  | 'tax';

export type ImpactPotential = 'transformational' | 'high' | 'medium' | 'low';
export type TimeSensitivity = 'immediate' | 'short-term' | 'medium-term' | 'long-term';
export type OpportunityStatus = 'new' | 'analyzing' | 'validated' | 'pursuing' | 'captured' | 'expired';

export interface OpportunityRequirement {
  description: string;
  met: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  type: OpportunityType;
  impactPotential: ImpactPotential;
  timeSensitivity: TimeSensitivity;
  status: OpportunityStatus;
  description: string;
  analysis: string;
  requirements: OpportunityRequirement[];
  expectedROI: string;
  expectedValue: string;
  aiScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  expiresAt?: Date;
  source: string;
  timestamp: Date;
}

export interface OpportunityCardProps {
  opportunity: Opportunity;
  onPursue?: () => void;
  onDismiss?: () => void;
  onAnalyze?: () => void;
  onViewDetails?: () => void;
  className?: string;
  compact?: boolean;
}

const typeConfig: Record<OpportunityType, { icon: LucideIcon; label: string; color: string; bg: string }> = {
  yield: {
    icon: TrendingUp,
    label: 'Yield Enhancement',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  'cost-savings': {
    icon: PiggyBank,
    label: 'Cost Savings',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  refinancing: {
    icon: Percent,
    label: 'Refinancing',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  investment: {
    icon: Briefcase,
    label: 'Investment',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  revenue: {
    icon: DollarSign,
    label: 'Revenue',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  efficiency: {
    icon: Zap,
    label: 'Efficiency',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  arbitrage: {
    icon: ArrowUpRight,
    label: 'Arbitrage',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
  tax: {
    icon: Building2,
    label: 'Tax Optimization',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
  },
};

const impactConfig: Record<ImpactPotential, { label: string; color: string; bg: string }> = {
  transformational: { label: 'Transformational', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  high: { label: 'High Impact', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  medium: { label: 'Medium Impact', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  low: { label: 'Low Impact', color: 'text-slate-400', bg: 'bg-slate-500/10' },
};

const timeConfig: Record<TimeSensitivity, { label: string; color: string; icon: LucideIcon }> = {
  immediate: { label: 'Act Now', color: 'text-red-400', icon: Zap },
  'short-term': { label: '< 30 days', color: 'text-orange-400', icon: Clock },
  'medium-term': { label: '30-90 days', color: 'text-yellow-400', icon: Calendar },
  'long-term': { label: '90+ days', color: 'text-blue-400', icon: Calendar },
};

const statusConfig: Record<OpportunityStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'New', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  analyzing: { label: 'Analyzing', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  validated: { label: 'Validated', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  pursuing: { label: 'Pursuing', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  captured: { label: 'Captured', color: 'text-green-400', bg: 'bg-green-500/10' },
  expired: { label: 'Expired', color: 'text-slate-400', bg: 'bg-slate-500/10' },
};

const riskColors = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-red-400',
};

export function OpportunityCard({
  opportunity,
  onPursue,
  onDismiss,
  onAnalyze,
  onViewDetails,
  className,
  compact = false,
}: OpportunityCardProps) {
  const type = typeConfig[opportunity.type];
  const impact = impactConfig[opportunity.impactPotential];
  const time = timeConfig[opportunity.timeSensitivity];
  const status = statusConfig[opportunity.status];
  const TypeIcon = type.icon;
  const TimeIcon = time.icon;

  // Calculate days until expiry
  const daysUntilExpiry = opportunity.expiresAt
    ? Math.ceil((opportunity.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  if (compact) {
    return (
      <Card
        className={cn(
          'border border-emerald-500/30 p-4 transition-all hover:shadow-lg cursor-pointer',
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
              <h4 className="truncate text-sm font-medium text-white">{opportunity.title}</h4>
              <Badge className={cn('shrink-0 text-xs', status.bg, status.color)}>
                {status.label}
              </Badge>
            </div>
            <p className="mt-1 line-clamp-1 text-xs text-slate-400">{opportunity.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm font-semibold text-emerald-400">{opportunity.expectedValue}</span>
              <Badge variant="outline" className={cn('text-xs gap-1', time.color)}>
                <TimeIcon className="h-3 w-3" />
                {time.label}
              </Badge>
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
        'overflow-hidden border border-emerald-500/30 transition-all hover:shadow-lg',
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
                <h3 className="font-semibold text-white">{opportunity.title}</h3>
                <Badge className={cn('text-xs', status.bg, status.color)}>
                  {status.label}
                </Badge>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className={cn('text-xs', type.color)}>
                  {type.label}
                </Badge>
                <Badge className={cn('text-xs', impact.bg, impact.color)}>
                  {impact.label}
                </Badge>
                <div className={cn('flex items-center gap-1 text-xs', time.color)}>
                  <TimeIcon className="h-3 w-3" />
                  {time.label}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge className="shrink-0 gap-1 bg-blue-500/10 text-blue-400">
              <Sparkles className="h-3 w-3" />
              {opportunity.aiScore}% Score
            </Badge>
            {daysUntilExpiry !== null && daysUntilExpiry <= 7 && (
              <span className="text-xs text-red-400">
                Expires in {daysUntilExpiry} day{daysUntilExpiry !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description & Analysis */}
      <div className="grid grid-cols-2 gap-4 border-b border-slate-800 p-4">
        <div>
          <p className="text-xs text-slate-500">Opportunity</p>
          <p className="mt-1 text-sm text-slate-300">{opportunity.description}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">AI Analysis</p>
          <p className="mt-1 text-sm text-slate-300">{opportunity.analysis}</p>
        </div>
      </div>

      {/* Expected Value & ROI */}
      <div className="grid grid-cols-3 gap-4 border-b border-slate-800 p-4">
        <div>
          <p className="text-xs text-slate-500">Expected Value</p>
          <p className="mt-1 text-lg font-semibold text-emerald-400">{opportunity.expectedValue}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Expected ROI</p>
          <p className="mt-1 text-lg font-semibold text-white">{opportunity.expectedROI}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Risk Level</p>
          <p className={cn('mt-1 text-lg font-semibold capitalize', riskColors[opportunity.riskLevel])}>
            {opportunity.riskLevel}
          </p>
        </div>
      </div>

      {/* Requirements */}
      <div className="border-b border-slate-800 p-4">
        <p className="text-xs text-slate-500">Requirements</p>
        <div className="mt-2 space-y-2">
          {opportunity.requirements.map((req, i) => (
            <div key={i} className="flex items-center gap-2">
              {req.met ? (
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              ) : (
                <Circle className="h-4 w-4 text-slate-500" />
              )}
              <span className={cn('text-sm', req.met ? 'text-slate-300' : 'text-slate-500')}>
                {req.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Source & Timestamp */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-blue-400" />
          <span className="text-xs text-slate-400">Source: {opportunity.source}</span>
        </div>
        <span className="text-xs text-slate-500">
          Detected {opportunity.timestamp.toLocaleDateString()}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {onAnalyze && opportunity.status === 'new' && (
            <Button variant="outline" size="sm" onClick={onAnalyze} className="gap-1">
              <Sparkles className="h-4 w-4" />
              Analyze
            </Button>
          )}
          {onViewDetails && (
            <Button variant="ghost" size="sm" onClick={onViewDetails}>
              View Details
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onDismiss && !['captured', 'expired'].includes(opportunity.status) && (
            <Button variant="ghost" size="sm" onClick={onDismiss} className="text-slate-400">
              Dismiss
            </Button>
          )}
          {onPursue && ['new', 'validated'].includes(opportunity.status) && (
            <Button size="sm" onClick={onPursue} className="gap-1 bg-emerald-600 hover:bg-emerald-500">
              <ArrowUpRight className="h-4 w-4" />
              Pursue
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

// Opportunity List Component
export function OpportunityList({
  opportunities,
  compact = false,
  className,
  onPursue,
  onDismiss,
  onAnalyze,
  onViewDetails,
}: {
  opportunities: Opportunity[];
  compact?: boolean;
  className?: string;
  onPursue?: (opportunity: Opportunity) => void;
  onDismiss?: (opportunity: Opportunity) => void;
  onAnalyze?: (opportunity: Opportunity) => void;
  onViewDetails?: (opportunity: Opportunity) => void;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {opportunities.map((opp) => (
        <OpportunityCard
          key={opp.id}
          opportunity={opp}
          compact={compact}
          onPursue={onPursue ? () => onPursue(opp) : undefined}
          onDismiss={onDismiss ? () => onDismiss(opp) : undefined}
          onAnalyze={onAnalyze ? () => onAnalyze(opp) : undefined}
          onViewDetails={onViewDetails ? () => onViewDetails(opp) : undefined}
        />
      ))}
    </div>
  );
}

// Mock data
export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Idle Cash Investment',
    type: 'yield',
    impactPotential: 'high',
    timeSensitivity: 'immediate',
    status: 'validated',
    description: '₹45 Cr sitting in current accounts earning 2.5% when liquid funds yield 7.2%',
    analysis: 'Analysis shows stable cash pattern with ₹40 Cr safely deployable while maintaining operational buffer.',
    requirements: [
      { description: 'Treasury committee approval', met: true },
      { description: 'Fund selection from approved list', met: true },
      { description: 'Settlement account setup', met: true },
    ],
    expectedROI: '188%',
    expectedValue: '₹2.1 Cr/year',
    aiScore: 96,
    riskLevel: 'low',
    source: 'Treasury AI Analysis',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: 'opp-2',
    title: 'Debt Refinancing Window',
    type: 'refinancing',
    impactPotential: 'high',
    timeSensitivity: 'short-term',
    status: 'new',
    description: '₹200 Cr term loan at 10.5% can be refinanced at 9.25% with current market rates',
    analysis: 'RBI rate cycle expected to reverse in Q1. Current window optimal for locking lower rates.',
    requirements: [
      { description: 'Credit rating maintained', met: true },
      { description: 'Pre-payment clause review', met: true },
      { description: 'New lender term sheet', met: false },
    ],
    expectedROI: '108%',
    expectedValue: '₹2.5 Cr/year',
    aiScore: 88,
    riskLevel: 'low',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45),
    source: 'Market Analysis',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 'opp-3',
    title: 'Vendor Payment Optimization',
    type: 'cost-savings',
    impactPotential: 'medium',
    timeSensitivity: 'medium-term',
    status: 'analyzing',
    description: 'Early payment discounts available from 8 vendors totaling ₹85 Cr monthly spend',
    analysis: 'Net benefit analysis shows 2.1% effective annual return vs 7% cost of capital for early payment.',
    requirements: [
      { description: 'Vendor agreement confirmation', met: false },
      { description: 'Cash flow projection approval', met: true },
      { description: 'Process automation setup', met: false },
    ],
    expectedROI: '210%',
    expectedValue: '₹1.8 Cr/year',
    aiScore: 82,
    riskLevel: 'low',
    source: 'Payables Analysis',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: 'opp-4',
    title: 'FX Rate Arbitrage',
    type: 'arbitrage',
    impactPotential: 'medium',
    timeSensitivity: 'immediate',
    status: 'new',
    description: 'Forward rate at 84.25 vs model prediction of 84.80 in 6 months',
    analysis: 'Historical pattern and macro factors suggest INR weakening. Forward contract provides locked advantage.',
    requirements: [
      { description: 'FX committee approval', met: true },
      { description: 'Counterparty limit available', met: true },
      { description: 'Documentation complete', met: true },
    ],
    expectedROI: 'N/A',
    expectedValue: '₹2.3 Cr savings',
    aiScore: 78,
    riskLevel: 'medium',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
    source: 'FX Intelligence',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: 'opp-5',
    title: 'Working Capital Release',
    type: 'efficiency',
    impactPotential: 'transformational',
    timeSensitivity: 'medium-term',
    status: 'pursuing',
    description: 'Supply chain financing program can release ₹120 Cr from working capital',
    analysis: 'Combining reverse factoring, dynamic discounting, and inventory optimization.',
    requirements: [
      { description: 'SCF platform selection', met: true },
      { description: 'Vendor onboarding (80%)', met: false },
      { description: 'ERP integration', met: false },
    ],
    expectedROI: '320%',
    expectedValue: '₹120 Cr released',
    aiScore: 91,
    riskLevel: 'low',
    source: 'SCF Analysis',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
];

export default OpportunityCard;
