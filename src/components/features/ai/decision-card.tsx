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
  TrendingUp,
  TrendingDown,
  Droplets,
  CreditCard,
  Landmark,
  DollarSign,
  FolderKanban,
  Receipt,
  Wallet,
  Shield,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';

export type DecisionSeverity = 'critical' | 'high' | 'medium' | 'low';
export type DecisionCategory =
  | 'liquidity'
  | 'debt'
  | 'loan'
  | 'treasury'
  | 'investment'
  | 'funding'
  | 'cash-flow'
  | 'project'
  | 'collections'
  | 'payments'
  | 'fx'
  | 'covenants'
  | 'compliance';

export interface ExecutiveDecision {
  id: string;
  issue: string;
  severity: DecisionSeverity;
  category: DecisionCategory;
  businessImpact: string;
  financialImpact: string;
  affectedModules: string[];
  affectedKPIs: string[];
  aiDiagnosis: string;
  aiRecommendation: string;
  confidenceScore: number;
  expectedBenefit: string;
  timestamp: Date;
}

export interface DecisionCardProps {
  decision: ExecutiveDecision;
  onSimulate?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onViewDetails?: () => void;
  className?: string;
  compact?: boolean;
}

const severityConfig: Record<DecisionSeverity, { color: string; bg: string; border: string; icon: LucideIcon }> = {
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

const categoryConfig: Record<DecisionCategory, { icon: LucideIcon; label: string; color: string }> = {
  liquidity: { icon: Droplets, label: 'Liquidity', color: 'text-cyan-400' },
  debt: { icon: CreditCard, label: 'Debt', color: 'text-purple-400' },
  loan: { icon: CreditCard, label: 'Loan', color: 'text-indigo-400' },
  treasury: { icon: Landmark, label: 'Treasury', color: 'text-blue-400' },
  investment: { icon: TrendingUp, label: 'Investment', color: 'text-green-400' },
  funding: { icon: DollarSign, label: 'Funding', color: 'text-emerald-400' },
  'cash-flow': { icon: BarChart3, label: 'Cash Flow', color: 'text-teal-400' },
  project: { icon: FolderKanban, label: 'Project', color: 'text-pink-400' },
  collections: { icon: Receipt, label: 'Collections', color: 'text-orange-400' },
  payments: { icon: Wallet, label: 'Payments', color: 'text-yellow-400' },
  fx: { icon: DollarSign, label: 'FX', color: 'text-violet-400' },
  covenants: { icon: Shield, label: 'Covenants', color: 'text-red-400' },
  compliance: { icon: Shield, label: 'Compliance', color: 'text-amber-400' },
};

export function DecisionCard({
  decision,
  onSimulate,
  onApprove,
  onReject,
  onViewDetails,
  className,
  compact = false,
}: DecisionCardProps) {
  const severity = severityConfig[decision.severity];
  const category = categoryConfig[decision.category];
  const SeverityIcon = severity.icon;
  const CategoryIcon = category.icon;

  if (compact) {
    return (
      <Card
        className={cn(
          'border p-4 transition-all hover:shadow-lg',
          severity.border,
          'bg-slate-900/50',
          className
        )}
      >
        <div className="flex items-start gap-3">
          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', severity.bg)}>
            <SeverityIcon className={cn('h-5 w-5', severity.color)} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="truncate text-sm font-medium text-white">{decision.issue}</h4>
              <Badge variant="outline" className={cn('shrink-0 text-xs', category.color)}>
                <CategoryIcon className="mr-1 h-3 w-3" />
                {category.label}
              </Badge>
            </div>
            <p className="mt-1 line-clamp-2 text-xs text-slate-400">{decision.aiDiagnosis}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className={cn('text-sm font-semibold', severity.color)}>{decision.financialImpact}</span>
              <Badge className="gap-1 bg-blue-500/10 text-blue-400">
                <Sparkles className="h-3 w-3" />
                {decision.confidenceScore}%
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0" onClick={onViewDetails}>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'overflow-hidden border transition-all hover:shadow-lg',
        severity.border,
        'bg-slate-900/50',
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', severity.bg)}>
              <SeverityIcon className={cn('h-6 w-6', severity.color)} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{decision.issue}</h3>
                <Badge variant="outline" className={cn('text-xs capitalize', severity.color)}>
                  {decision.severity}
                </Badge>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className={cn('text-xs', category.color)}>
                  <CategoryIcon className="mr-1 h-3 w-3" />
                  {category.label}
                </Badge>
                <span className="text-xs text-slate-500">
                  {decision.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
          <Badge className="shrink-0 gap-1 bg-blue-500/10 text-blue-400">
            <Sparkles className="h-3 w-3" />
            {decision.confidenceScore}% Confidence
          </Badge>
        </div>
      </div>

      {/* Impact Section */}
      <div className="grid grid-cols-2 gap-4 border-b border-slate-800 p-4">
        <div>
          <p className="text-xs text-slate-500">Business Impact</p>
          <p className="mt-1 text-sm text-white">{decision.businessImpact}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Financial Impact</p>
          <p className={cn('mt-1 text-sm font-semibold', severity.color)}>{decision.financialImpact}</p>
        </div>
      </div>

      {/* Affected Items */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-slate-500">Affected:</span>
          {decision.affectedModules.map((module, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {module}
            </Badge>
          ))}
          {decision.affectedKPIs.map((kpi, i) => (
            <Badge key={`kpi-${i}`} variant="secondary" className="text-xs">
              {kpi}
            </Badge>
          ))}
        </div>
      </div>

      {/* AI Analysis */}
      <div className="space-y-3 border-b border-slate-800 p-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="h-3 w-3 text-blue-400" />
            AI Diagnosis
          </div>
          <p className="mt-1 text-sm text-slate-300">{decision.aiDiagnosis}</p>
        </div>
        <div className="rounded-lg bg-blue-500/5 p-3">
          <div className="flex items-center gap-2 text-xs text-blue-400">
            <Sparkles className="h-3 w-3" />
            AI Recommendation
          </div>
          <p className="mt-1 text-sm text-white">{decision.aiRecommendation}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Expected Benefit</span>
          <span className="text-sm font-semibold text-emerald-400">{decision.expectedBenefit}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {onSimulate && (
            <Button variant="outline" size="sm" onClick={onSimulate} className="gap-1">
              <Play className="h-4 w-4" />
              Simulate
            </Button>
          )}
          {onViewDetails && (
            <Button variant="ghost" size="sm" onClick={onViewDetails}>
              View Details
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onReject && (
            <Button variant="ghost" size="sm" onClick={onReject} className="text-red-400 hover:text-red-300">
              <X className="mr-1 h-4 w-4" />
              Reject
            </Button>
          )}
          {onApprove && (
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

// Decision Card Grid/List
export function DecisionList({
  decisions,
  compact = false,
  className,
  onSimulate,
  onApprove,
  onReject,
  onViewDetails,
}: {
  decisions: ExecutiveDecision[];
  compact?: boolean;
  className?: string;
  onSimulate?: (decision: ExecutiveDecision) => void;
  onApprove?: (decision: ExecutiveDecision) => void;
  onReject?: (decision: ExecutiveDecision) => void;
  onViewDetails?: (decision: ExecutiveDecision) => void;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {decisions.map((decision) => (
        <DecisionCard
          key={decision.id}
          decision={decision}
          compact={compact}
          onSimulate={onSimulate ? () => onSimulate(decision) : undefined}
          onApprove={onApprove ? () => onApprove(decision) : undefined}
          onReject={onReject ? () => onReject(decision) : undefined}
          onViewDetails={onViewDetails ? () => onViewDetails(decision) : undefined}
        />
      ))}
    </div>
  );
}

// Mock data generator
export const mockDecisions: ExecutiveDecision[] = [
  {
    id: '1',
    issue: 'DSCR Breach Prediction',
    severity: 'critical',
    category: 'covenants',
    businessImpact: 'Potential loan acceleration clause trigger',
    financialImpact: '₹120 Cr facility at risk',
    affectedModules: ['Loan Management', 'Treasury'],
    affectedKPIs: ['DSCR', 'ICR', 'Debt-to-Equity'],
    aiDiagnosis: 'DSCR trending down from 1.45x to 1.32x over past 3 months. If trend continues, breach expected in Q4.',
    aiRecommendation: 'Accelerate ₹25 Cr collections from Metro project and defer ₹15 Cr non-essential capex to Q1.',
    confidenceScore: 92,
    expectedBenefit: 'DSCR improvement to 1.48x',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: '2',
    issue: 'Idle Cash Investment Opportunity',
    severity: 'low',
    category: 'treasury',
    businessImpact: 'Suboptimal cash utilization across 5 accounts',
    financialImpact: '+₹2.5 Cr/year potential',
    affectedModules: ['Treasury', 'Investments'],
    affectedKPIs: ['Yield', 'Cash Utilization'],
    aiDiagnosis: '₹45 Cr sitting idle in current accounts earning 2.5% vs 7.25% in approved liquid funds.',
    aiRecommendation: 'Deploy ₹40 Cr in overnight liquid funds maintaining ₹5 Cr buffer.',
    confidenceScore: 96,
    expectedBenefit: '₹2.1 Cr additional yield',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '3',
    issue: 'Debt Refinancing Window',
    severity: 'medium',
    category: 'debt',
    businessImpact: 'Interest rate arbitrage opportunity closing in 45 days',
    financialImpact: '+₹2.5 Cr/year savings',
    affectedModules: ['Loan Management', 'Treasury'],
    affectedKPIs: ['Interest Cost', 'EBITDA'],
    aiDiagnosis: '₹200 Cr loan at 10.5% can be refinanced at 9.25%. RBI rate cycle expected to reverse in Q1.',
    aiRecommendation: 'Initiate refinancing discussion with ICICI Bank immediately.',
    confidenceScore: 88,
    expectedBenefit: '₹2.5 Cr annual savings',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '4',
    issue: 'FX Hedge Required',
    severity: 'high',
    category: 'fx',
    businessImpact: 'Unhedged USD exposure increasing risk profile',
    financialImpact: '₹12 Cr potential loss',
    affectedModules: ['Treasury', 'FX Management'],
    affectedKPIs: ['FX Risk Score', 'Hedge Coverage'],
    aiDiagnosis: 'USD exposure at $45M with only 65% hedged. USD/INR volatility increasing.',
    aiRecommendation: 'Execute forward contract for $15M at current forward rate of 84.25.',
    confidenceScore: 85,
    expectedBenefit: 'Risk reduction of ₹8 Cr',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: '5',
    issue: 'Collection Delay Risk',
    severity: 'high',
    category: 'collections',
    businessImpact: 'Cash flow timing mismatch with upcoming payments',
    financialImpact: '₹85 Cr delayed',
    affectedModules: ['Collections', 'Cash Flow'],
    affectedKPIs: ['DSO', 'Cash Position'],
    aiDiagnosis: 'Metro Phase 1 milestone payment of ₹85 Cr delayed by 30 days. Overlaps with ₹60 Cr vendor payments.',
    aiRecommendation: 'Escalate with project team and arrange ₹50 Cr bridge from HDFC facility.',
    confidenceScore: 78,
    expectedBenefit: 'Avoid liquidity shortfall',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
  },
];

export default DecisionCard;
