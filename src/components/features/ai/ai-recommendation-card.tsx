'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Sparkles,
  Play,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  UserPlus,
  Lightbulb,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  type LucideIcon,
} from 'lucide-react';

export type RecommendationPriority = 'critical' | 'high' | 'medium' | 'low';
export type RecommendationStatus = 'pending' | 'simulated' | 'approved' | 'rejected' | 'assigned' | 'implemented';
export type RecommendationCategory =
  | 'liquidity'
  | 'debt'
  | 'treasury'
  | 'investment'
  | 'cash-flow'
  | 'collections'
  | 'payments'
  | 'fx'
  | 'compliance'
  | 'risk'
  | 'cost'
  | 'revenue';

export interface AIRecommendation {
  id: string;
  issue: string;
  priority: RecommendationPriority;
  category: RecommendationCategory;
  status: RecommendationStatus;
  affectedModules: string[];
  affectedKPIs: string[];
  rootCause: string;
  businessImpact: string;
  financialImpact: string;
  recommendation: string;
  alternatives?: string[];
  expectedOutcome: string;
  confidenceScore: number;
  timeToImplement: string;
  riskLevel: 'low' | 'medium' | 'high';
  assignedTo?: string;
  timestamp: Date;
}

export interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  onSimulate?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onAssign?: () => void;
  onViewDetails?: () => void;
  className?: string;
  compact?: boolean;
  expanded?: boolean;
}

const priorityConfig: Record<RecommendationPriority, { color: string; bg: string; border: string; icon: LucideIcon }> = {
  critical: {
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: AlertTriangle,
  },
  high: {
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    icon: AlertCircle,
  },
  medium: {
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    icon: AlertCircle,
  },
  low: {
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: Info,
  },
};

const categoryConfig: Record<RecommendationCategory, { icon: LucideIcon; label: string; color: string }> = {
  liquidity: { icon: Zap, label: 'Liquidity', color: 'text-cyan-400' },
  debt: { icon: Shield, label: 'Debt', color: 'text-purple-400' },
  treasury: { icon: Target, label: 'Treasury', color: 'text-blue-400' },
  investment: { icon: TrendingUp, label: 'Investment', color: 'text-green-400' },
  'cash-flow': { icon: TrendingUp, label: 'Cash Flow', color: 'text-teal-400' },
  collections: { icon: Target, label: 'Collections', color: 'text-orange-400' },
  payments: { icon: Zap, label: 'Payments', color: 'text-yellow-400' },
  fx: { icon: TrendingUp, label: 'FX', color: 'text-violet-400' },
  compliance: { icon: Shield, label: 'Compliance', color: 'text-amber-400' },
  risk: { icon: AlertTriangle, label: 'Risk', color: 'text-red-400' },
  cost: { icon: Target, label: 'Cost', color: 'text-pink-400' },
  revenue: { icon: TrendingUp, label: 'Revenue', color: 'text-emerald-400' },
};

const statusConfig: Record<RecommendationStatus, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending Review', color: 'text-slate-400', bg: 'bg-slate-500/10' },
  simulated: { label: 'Simulated', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  approved: { label: 'Approved', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  rejected: { label: 'Rejected', color: 'text-red-400', bg: 'bg-red-500/10' },
  assigned: { label: 'Assigned', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  implemented: { label: 'Implemented', color: 'text-green-400', bg: 'bg-green-500/10' },
};

const riskColors = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-red-400',
};

export function AIRecommendationCard({
  recommendation,
  onSimulate,
  onApprove,
  onReject,
  onAssign,
  onViewDetails,
  className,
  compact = false,
  expanded: initialExpanded = false,
}: AIRecommendationCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(initialExpanded);
  const priority = priorityConfig[recommendation.priority];
  const category = categoryConfig[recommendation.category];
  const status = statusConfig[recommendation.status];
  const PriorityIcon = priority.icon;
  const CategoryIcon = category.icon;

  if (compact) {
    return (
      <Card
        className={cn(
          'border p-4 transition-all hover:shadow-lg cursor-pointer',
          priority.border,
          'bg-slate-900/50',
          className
        )}
        onClick={onViewDetails}
      >
        <div className="flex items-start gap-3">
          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', priority.bg)}>
            <Lightbulb className={cn('h-5 w-5', priority.color)} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="truncate text-sm font-medium text-white">{recommendation.issue}</h4>
              <Badge variant="outline" className={cn('shrink-0 text-xs', category.color)}>
                <CategoryIcon className="mr-1 h-3 w-3" />
                {category.label}
              </Badge>
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-slate-400">{recommendation.recommendation}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className={cn('text-sm font-semibold', priority.color)}>{recommendation.financialImpact}</span>
              <Badge className={cn('gap-1', status.bg, status.color)}>
                {status.label}
              </Badge>
              <Badge className="gap-1 bg-blue-500/10 text-blue-400">
                <Sparkles className="h-3 w-3" />
                {recommendation.confidenceScore}%
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
        'overflow-hidden border transition-all hover:shadow-lg',
        priority.border,
        'bg-slate-900/50',
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', priority.bg)}>
              <Lightbulb className={cn('h-6 w-6', priority.color)} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{recommendation.issue}</h3>
                <Badge variant="outline" className={cn('text-xs capitalize', priority.color)}>
                  <PriorityIcon className="mr-1 h-3 w-3" />
                  {recommendation.priority}
                </Badge>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className={cn('text-xs', category.color)}>
                  <CategoryIcon className="mr-1 h-3 w-3" />
                  {category.label}
                </Badge>
                <Badge className={cn('text-xs', status.bg, status.color)}>
                  {status.label}
                </Badge>
                <span className="text-xs text-slate-500">
                  {recommendation.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="shrink-0 gap-1 bg-blue-500/10 text-blue-400">
              <Sparkles className="h-3 w-3" />
              {recommendation.confidenceScore}% Confidence
            </Badge>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="grid grid-cols-3 gap-4 border-b border-slate-800 p-4">
        <div>
          <p className="text-xs text-slate-500">Business Impact</p>
          <p className="mt-1 text-sm text-white">{recommendation.businessImpact}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Financial Impact</p>
          <p className={cn('mt-1 text-sm font-semibold', priority.color)}>{recommendation.financialImpact}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Time to Implement</p>
          <div className="mt-1 flex items-center gap-1 text-sm text-white">
            <Clock className="h-3 w-3 text-slate-400" />
            {recommendation.timeToImplement}
          </div>
        </div>
      </div>

      {/* Affected Items */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-slate-500">Affected:</span>
          {recommendation.affectedModules.map((module, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {module}
            </Badge>
          ))}
          {recommendation.affectedKPIs.map((kpi, i) => (
            <Badge key={`kpi-${i}`} variant="secondary" className="text-xs">
              {kpi}
            </Badge>
          ))}
        </div>
      </div>

      {/* Root Cause */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <AlertCircle className="h-3 w-3 text-orange-400" />
          Root Cause
        </div>
        <p className="mt-1 text-sm text-slate-300">{recommendation.rootCause}</p>
      </div>

      {/* AI Recommendation */}
      <div className="space-y-3 border-b border-slate-800 p-4">
        <div className="rounded-lg bg-blue-500/5 p-3">
          <div className="flex items-center gap-2 text-xs text-blue-400">
            <Sparkles className="h-3 w-3" />
            AI Recommendation
          </div>
          <p className="mt-1 text-sm text-white">{recommendation.recommendation}</p>
        </div>

        {/* Expandable Alternatives */}
        {recommendation.alternatives && recommendation.alternatives.length > 0 && (
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
            >
              <ChevronDown className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')} />
              {recommendation.alternatives.length} Alternative{recommendation.alternatives.length > 1 ? 's' : ''} Available
            </button>
            {isExpanded && (
              <div className="mt-2 space-y-2 pl-6">
                {recommendation.alternatives.map((alt, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="text-blue-400">{i + 1}.</span>
                    {alt}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500">Expected Outcome</span>
            <p className="text-sm font-semibold text-emerald-400">{recommendation.expectedOutcome}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500">Risk Level</span>
            <p className={cn('text-sm font-medium capitalize', riskColors[recommendation.riskLevel])}>
              {recommendation.riskLevel}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {onSimulate && recommendation.status === 'pending' && (
            <Button variant="outline" size="sm" onClick={onSimulate} className="gap-1">
              <Play className="h-4 w-4" />
              Simulate
            </Button>
          )}
          {onAssign && recommendation.status !== 'implemented' && (
            <Button variant="outline" size="sm" onClick={onAssign} className="gap-1">
              <UserPlus className="h-4 w-4" />
              Assign
            </Button>
          )}
          {onViewDetails && (
            <Button variant="ghost" size="sm" onClick={onViewDetails}>
              View Details
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onReject && recommendation.status === 'pending' && (
            <Button variant="ghost" size="sm" onClick={onReject} className="text-red-400 hover:text-red-300">
              <X className="mr-1 h-4 w-4" />
              Reject
            </Button>
          )}
          {onApprove && recommendation.status === 'pending' && (
            <Button size="sm" onClick={onApprove} className="gap-1 bg-emerald-600 hover:bg-emerald-500">
              <Check className="h-4 w-4" />
              Approve
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

// Recommendation List Component
export function AIRecommendationList({
  recommendations,
  compact = false,
  className,
  onSimulate,
  onApprove,
  onReject,
  onAssign,
  onViewDetails,
}: {
  recommendations: AIRecommendation[];
  compact?: boolean;
  className?: string;
  onSimulate?: (recommendation: AIRecommendation) => void;
  onApprove?: (recommendation: AIRecommendation) => void;
  onReject?: (recommendation: AIRecommendation) => void;
  onAssign?: (recommendation: AIRecommendation) => void;
  onViewDetails?: (recommendation: AIRecommendation) => void;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {recommendations.map((rec) => (
        <AIRecommendationCard
          key={rec.id}
          recommendation={rec}
          compact={compact}
          onSimulate={onSimulate ? () => onSimulate(rec) : undefined}
          onApprove={onApprove ? () => onApprove(rec) : undefined}
          onReject={onReject ? () => onReject(rec) : undefined}
          onAssign={onAssign ? () => onAssign(rec) : undefined}
          onViewDetails={onViewDetails ? () => onViewDetails(rec) : undefined}
        />
      ))}
    </div>
  );
}

// Mock data generator
export const mockRecommendations: AIRecommendation[] = [
  {
    id: 'rec-1',
    issue: 'Optimize Working Capital Cycle',
    priority: 'high',
    category: 'cash-flow',
    status: 'pending',
    affectedModules: ['Collections', 'Payments', 'Treasury'],
    affectedKPIs: ['DSO', 'DPO', 'CCC', 'Working Capital'],
    rootCause: 'DSO increased by 8 days over Q3 while DPO remained static, causing working capital strain.',
    businessImpact: 'Cash conversion cycle extended to 68 days',
    financialImpact: '₹45 Cr locked in receivables',
    recommendation: 'Implement dynamic discounting for top 20 customers with 2% discount for early payment. Expected to reduce DSO by 5 days.',
    alternatives: [
      'Negotiate extended payment terms with top 5 vendors to increase DPO',
      'Factor ₹30 Cr receivables through HDFC at 8.5% annual cost',
      'Implement stricter credit policies for customers with payment history > 45 days',
    ],
    expectedOutcome: '₹25 Cr working capital release',
    confidenceScore: 87,
    timeToImplement: '2-3 weeks',
    riskLevel: 'low',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'rec-2',
    issue: 'Refinance High-Cost Debt',
    priority: 'medium',
    category: 'debt',
    status: 'simulated',
    affectedModules: ['Loan Management', 'Treasury'],
    affectedKPIs: ['Interest Cost', 'DSCR', 'Debt/EBITDA'],
    rootCause: '₹200 Cr term loan at 10.5% from 2022 when rates were higher. Current market rates 1.25% lower.',
    businessImpact: 'Higher than necessary interest burden',
    financialImpact: '₹2.5 Cr/year excess interest',
    recommendation: 'Refinance with ICICI at 9.25% with 5-year tenor. Pre-payment penalty of ₹1.2 Cr offset by first year savings.',
    alternatives: [
      'Partial refinancing of ₹100 Cr to minimize prepayment costs',
      'Wait for RBI rate cut expected in Q1 for better rates',
    ],
    expectedOutcome: '₹2.5 Cr annual interest savings',
    confidenceScore: 92,
    timeToImplement: '4-6 weeks',
    riskLevel: 'low',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: 'rec-3',
    issue: 'Hedge USD Exposure',
    priority: 'critical',
    category: 'fx',
    status: 'pending',
    affectedModules: ['FX Management', 'Treasury'],
    affectedKPIs: ['FX Risk', 'Hedge Coverage', 'P&L Volatility'],
    rootCause: 'USD exposure at $45M with only 65% hedged. USD/INR showing 3% monthly volatility.',
    businessImpact: 'Unacceptable P&L volatility exposure',
    financialImpact: '₹12 Cr potential loss at 3% adverse move',
    recommendation: 'Execute 6-month forward contract for $15M at forward rate 84.25. Brings hedge coverage to 98%.',
    alternatives: [
      'Buy USD call option with strike at 84.50 for downside protection',
      'Natural hedge by accelerating USD-denominated receivables',
    ],
    expectedOutcome: '98% hedge coverage, ₹8 Cr risk reduction',
    confidenceScore: 94,
    timeToImplement: 'Same day',
    riskLevel: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: 'rec-4',
    issue: 'Deploy Idle Treasury Cash',
    priority: 'low',
    category: 'treasury',
    status: 'approved',
    affectedModules: ['Treasury', 'Investments'],
    affectedKPIs: ['Yield', 'Cash Utilization', 'ROI'],
    rootCause: '₹45 Cr sitting in current accounts earning 2.5% when approved instruments yield 7.2%.',
    businessImpact: 'Suboptimal cash utilization',
    financialImpact: '+₹2.1 Cr/year potential',
    recommendation: 'Deploy ₹40 Cr in overnight liquid funds (SBI, HDFC, ICICI approved) maintaining ₹5 Cr operational buffer.',
    expectedOutcome: '₹2.1 Cr additional annual yield',
    confidenceScore: 98,
    timeToImplement: '1 day',
    riskLevel: 'low',
    assignedTo: 'Treasury Team',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: 'rec-5',
    issue: 'Accelerate Project Collections',
    priority: 'high',
    category: 'collections',
    status: 'assigned',
    affectedModules: ['Collections', 'Project Finance', 'Cash Flow'],
    affectedKPIs: ['DSO', 'Cash Position', 'Liquidity'],
    rootCause: '₹85 Cr Metro Phase 1 milestone pending certification. Project team delay on documentation.',
    businessImpact: 'Cash flow timing mismatch with ₹60 Cr vendor payments',
    financialImpact: '₹85 Cr delayed by 30 days',
    recommendation: 'Escalate to Project Director for immediate certification. Engage client CFO for expedited approval.',
    alternatives: [
      'Arrange ₹50 Cr bridge financing from HDFC revolving facility',
      'Negotiate 30-day extension with top 3 vendors',
    ],
    expectedOutcome: 'Certification within 10 days',
    confidenceScore: 75,
    timeToImplement: '1-2 weeks',
    riskLevel: 'medium',
    assignedTo: 'Project Finance',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
  },
];

export default AIRecommendationCard;
