'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  Shield,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Eye,
  Bell,
  BellOff,
  Activity,
  Zap,
  DollarSign,
  Building2,
  Globe,
  type LucideIcon,
} from 'lucide-react';

export type RiskSeverity = 'critical' | 'high' | 'medium' | 'low';
export type RiskTrend = 'increasing' | 'stable' | 'decreasing';
export type RiskCategory =
  | 'liquidity'
  | 'credit'
  | 'market'
  | 'operational'
  | 'compliance'
  | 'counterparty'
  | 'fx'
  | 'interest-rate'
  | 'concentration'
  | 'covenant';

export type MonitoringStatus = 'active' | 'watching' | 'resolved' | 'escalated';

export interface RiskMitigation {
  action: string;
  status: 'pending' | 'in-progress' | 'completed';
  owner?: string;
  dueDate?: Date;
}

export interface RiskIntelligence {
  id: string;
  title: string;
  category: RiskCategory;
  severity: RiskSeverity;
  trend: RiskTrend;
  description: string;
  impact: string;
  impactValue: string;
  affectedEntities: string[];
  rootCause: string;
  mitigations: RiskMitigation[];
  aiRecommendation: string;
  confidenceScore: number;
  monitoringStatus: MonitoringStatus;
  lastUpdated: Date;
  nextReview?: Date;
}

export interface RiskCardProps {
  risk: RiskIntelligence;
  onViewDetails?: () => void;
  onToggleMonitoring?: () => void;
  onEscalate?: () => void;
  className?: string;
  compact?: boolean;
}

const severityConfig: Record<RiskSeverity, { color: string; bg: string; border: string; icon: LucideIcon }> = {
  critical: {
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: ShieldAlert,
  },
  high: {
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    icon: AlertTriangle,
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
    icon: Shield,
  },
};

const categoryConfig: Record<RiskCategory, { icon: LucideIcon; label: string; color: string }> = {
  liquidity: { icon: Zap, label: 'Liquidity Risk', color: 'text-cyan-400' },
  credit: { icon: DollarSign, label: 'Credit Risk', color: 'text-purple-400' },
  market: { icon: Activity, label: 'Market Risk', color: 'text-blue-400' },
  operational: { icon: Building2, label: 'Operational Risk', color: 'text-orange-400' },
  compliance: { icon: Shield, label: 'Compliance Risk', color: 'text-amber-400' },
  counterparty: { icon: Building2, label: 'Counterparty Risk', color: 'text-pink-400' },
  fx: { icon: Globe, label: 'FX Risk', color: 'text-violet-400' },
  'interest-rate': { icon: TrendingUp, label: 'Interest Rate Risk', color: 'text-teal-400' },
  concentration: { icon: Activity, label: 'Concentration Risk', color: 'text-indigo-400' },
  covenant: { icon: ShieldAlert, label: 'Covenant Risk', color: 'text-red-400' },
};

const trendConfig: Record<RiskTrend, { icon: LucideIcon; label: string; color: string }> = {
  increasing: { icon: TrendingUp, label: 'Increasing', color: 'text-red-400' },
  stable: { icon: Minus, label: 'Stable', color: 'text-yellow-400' },
  decreasing: { icon: TrendingDown, label: 'Decreasing', color: 'text-green-400' },
};

const monitoringConfig: Record<MonitoringStatus, { label: string; color: string; bg: string }> = {
  active: { label: 'Actively Monitoring', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  watching: { label: 'Watching', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  resolved: { label: 'Resolved', color: 'text-green-400', bg: 'bg-green-500/10' },
  escalated: { label: 'Escalated', color: 'text-red-400', bg: 'bg-red-500/10' },
};

export function RiskCard({
  risk,
  onViewDetails,
  onToggleMonitoring,
  onEscalate,
  className,
  compact = false,
}: RiskCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const severity = severityConfig[risk.severity];
  const category = categoryConfig[risk.category];
  const trend = trendConfig[risk.trend];
  const monitoring = monitoringConfig[risk.monitoringStatus];
  const SeverityIcon = severity.icon;
  const TrendIcon = trend.icon;

  if (compact) {
    return (
      <Card
        className={cn(
          'border p-4 transition-all hover:shadow-lg cursor-pointer',
          severity.border,
          'bg-slate-900/50',
          className
        )}
        onClick={onViewDetails}
      >
        <div className="flex items-start gap-3">
          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', severity.bg)}>
            <SeverityIcon className={cn('h-5 w-5', severity.color)} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="truncate text-sm font-medium text-white">{risk.title}</h4>
              <div className={cn('flex items-center gap-1', trend.color)}>
                <TrendIcon className="h-3 w-3" />
              </div>
            </div>
            <p className="mt-1 line-clamp-1 text-xs text-slate-400">{risk.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline" className={cn('text-xs', category.color)}>
                {category.label}
              </Badge>
              <span className={cn('text-sm font-semibold', severity.color)}>{risk.impactValue}</span>
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
                <h3 className="font-semibold text-white">{risk.title}</h3>
                <Badge variant="outline" className={cn('text-xs capitalize', severity.color)}>
                  {risk.severity}
                </Badge>
                <div className={cn('flex items-center gap-1 text-xs', trend.color)}>
                  <TrendIcon className="h-3 w-3" />
                  {trend.label}
                </div>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className={cn('text-xs', category.color)}>
                  {category.label}
                </Badge>
                <Badge className={cn('text-xs', monitoring.bg, monitoring.color)}>
                  <Eye className="mr-1 h-3 w-3" />
                  {monitoring.label}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="shrink-0 gap-1 bg-blue-500/10 text-blue-400">
              <Sparkles className="h-3 w-3" />
              {risk.confidenceScore}%
            </Badge>
          </div>
        </div>
      </div>

      {/* Description & Impact */}
      <div className="grid grid-cols-2 gap-4 border-b border-slate-800 p-4">
        <div>
          <p className="text-xs text-slate-500">Description</p>
          <p className="mt-1 text-sm text-slate-300">{risk.description}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Impact</p>
          <p className="mt-1 text-sm text-white">{risk.impact}</p>
          <p className={cn('mt-1 text-sm font-semibold', severity.color)}>{risk.impactValue}</p>
        </div>
      </div>

      {/* Affected Entities */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-slate-500">Affected Entities:</span>
          {risk.affectedEntities.map((entity, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {entity}
            </Badge>
          ))}
        </div>
      </div>

      {/* Root Cause */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <AlertCircle className="h-3 w-3 text-orange-400" />
          Root Cause Analysis
        </div>
        <p className="mt-1 text-sm text-slate-300">{risk.rootCause}</p>
      </div>

      {/* Mitigations */}
      <div className="border-b border-slate-800 p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
        >
          <ChevronDown className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')} />
          Mitigation Actions ({risk.mitigations.length})
        </button>
        {isExpanded && (
          <div className="mt-3 space-y-2">
            {risk.mitigations.map((mitigation, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-slate-800/50 p-2">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full',
                      mitigation.status === 'completed' && 'bg-green-400',
                      mitigation.status === 'in-progress' && 'bg-yellow-400',
                      mitigation.status === 'pending' && 'bg-slate-400'
                    )}
                  />
                  <span className="text-sm text-slate-300">{mitigation.action}</span>
                </div>
                {mitigation.owner && (
                  <span className="text-xs text-slate-500">{mitigation.owner}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Recommendation */}
      <div className="space-y-3 border-b border-slate-800 p-4">
        <div className="rounded-lg bg-blue-500/5 p-3">
          <div className="flex items-center gap-2 text-xs text-blue-400">
            <Sparkles className="h-3 w-3" />
            AI Recommendation
          </div>
          <p className="mt-1 text-sm text-white">{risk.aiRecommendation}</p>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Last Updated: {risk.lastUpdated.toLocaleDateString()}</span>
          {risk.nextReview && <span>Next Review: {risk.nextReview.toLocaleDateString()}</span>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          {onToggleMonitoring && (
            <Button variant="outline" size="sm" onClick={onToggleMonitoring} className="gap-1">
              {risk.monitoringStatus === 'active' ? (
                <>
                  <BellOff className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4" />
                  Monitor
                </>
              )}
            </Button>
          )}
          {onViewDetails && (
            <Button variant="ghost" size="sm" onClick={onViewDetails}>
              View Details
            </Button>
          )}
        </div>
        {onEscalate && risk.monitoringStatus !== 'escalated' && (
          <Button variant="destructive" size="sm" onClick={onEscalate} className="gap-1">
            <AlertTriangle className="h-4 w-4" />
            Escalate
          </Button>
        )}
      </div>
    </Card>
  );
}

// Risk List Component
export function RiskList({
  risks,
  compact = false,
  className,
  onViewDetails,
  onToggleMonitoring,
  onEscalate,
}: {
  risks: RiskIntelligence[];
  compact?: boolean;
  className?: string;
  onViewDetails?: (risk: RiskIntelligence) => void;
  onToggleMonitoring?: (risk: RiskIntelligence) => void;
  onEscalate?: (risk: RiskIntelligence) => void;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {risks.map((risk) => (
        <RiskCard
          key={risk.id}
          risk={risk}
          compact={compact}
          onViewDetails={onViewDetails ? () => onViewDetails(risk) : undefined}
          onToggleMonitoring={onToggleMonitoring ? () => onToggleMonitoring(risk) : undefined}
          onEscalate={onEscalate ? () => onEscalate(risk) : undefined}
        />
      ))}
    </div>
  );
}

// Mock data
export const mockRisks: RiskIntelligence[] = [
  {
    id: 'risk-1',
    title: 'DSCR Covenant Breach Risk',
    category: 'covenant',
    severity: 'critical',
    trend: 'increasing',
    description: 'Debt Service Coverage Ratio trending below covenant threshold of 1.25x',
    impact: 'Potential loan acceleration and cross-default triggers',
    impactValue: '₹120 Cr facility at risk',
    affectedEntities: ['HDFC Term Loan', 'ICICI Working Capital', 'SBI CC Limit'],
    rootCause: 'EBITDA decline of 12% in Q3 combined with increased debt servicing from new capex loan',
    mitigations: [
      { action: 'Accelerate ₹25 Cr collections from Metro project', status: 'in-progress', owner: 'Collections' },
      { action: 'Defer ₹15 Cr non-essential capex to Q1', status: 'pending', owner: 'Finance' },
      { action: 'Negotiate temporary covenant relief with lenders', status: 'pending', owner: 'Treasury' },
    ],
    aiRecommendation: 'Prioritize collection acceleration and capex deferral. Model shows 85% probability of maintaining compliance with both actions.',
    confidenceScore: 88,
    monitoringStatus: 'active',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2),
    nextReview: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  },
  {
    id: 'risk-2',
    title: 'Counterparty Credit Deterioration',
    category: 'counterparty',
    severity: 'high',
    trend: 'stable',
    description: 'Three major customers showing credit rating downgrades in past quarter',
    impact: 'Increased provision requirements and collection delays',
    impactValue: '₹45 Cr exposure',
    affectedEntities: ['ABC Construction', 'XYZ Infrastructure', 'Metro Corp'],
    rootCause: 'Sector-wide slowdown in infrastructure spending affecting customer cash flows',
    mitigations: [
      { action: 'Increase collateral requirements for new orders', status: 'completed', owner: 'Credit' },
      { action: 'Reduce credit limits by 20%', status: 'in-progress', owner: 'Credit' },
      { action: 'Weekly payment monitoring for flagged accounts', status: 'completed', owner: 'Collections' },
    ],
    aiRecommendation: 'Consider credit insurance for ABC Construction (highest risk). Cost of ₹12L/year vs ₹18 Cr exposure.',
    confidenceScore: 82,
    monitoringStatus: 'watching',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 'risk-3',
    title: 'USD/INR Volatility Exposure',
    category: 'fx',
    severity: 'high',
    trend: 'increasing',
    description: 'Unhedged USD exposure at $15M with INR weakening trend',
    impact: 'Mark-to-market losses and P&L volatility',
    impactValue: '₹12 Cr potential loss',
    affectedEntities: ['Import Payables', 'Equipment Purchases', 'Capex Projects'],
    rootCause: 'Delayed hedge execution due to favorable rate expectations that didn\'t materialize',
    mitigations: [
      { action: 'Execute forward contract for $10M', status: 'pending', owner: 'Treasury' },
      { action: 'Natural hedge via USD receivables acceleration', status: 'in-progress', owner: 'Treasury' },
    ],
    aiRecommendation: 'Execute forward at 84.25 immediately. Model shows 72% probability of INR weakening further in next 30 days.',
    confidenceScore: 78,
    monitoringStatus: 'escalated',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'risk-4',
    title: 'Liquidity Buffer Erosion',
    category: 'liquidity',
    severity: 'medium',
    trend: 'decreasing',
    description: 'Available liquidity buffer at 1.1x vs policy minimum of 1.25x',
    impact: 'Reduced financial flexibility for opportunities',
    impactValue: '₹35 Cr shortfall',
    affectedEntities: ['Corporate Treasury', 'All Entities'],
    rootCause: 'Seasonal working capital buildup combined with delayed project milestone payments',
    mitigations: [
      { action: 'Draw ₹50 Cr from unutilized CC limit', status: 'completed', owner: 'Treasury' },
      { action: 'Accelerate billing for completed milestones', status: 'in-progress', owner: 'Project Finance' },
    ],
    aiRecommendation: 'Buffer expected to normalize within 15 days based on receivable patterns. No urgent action needed.',
    confidenceScore: 91,
    monitoringStatus: 'active',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: 'risk-5',
    title: 'Interest Rate Risk',
    category: 'interest-rate',
    severity: 'low',
    trend: 'stable',
    description: 'Floating rate exposure at 65% of total debt portfolio',
    impact: 'Interest cost sensitivity to rate changes',
    impactValue: '₹4.5 Cr/1% rate increase',
    affectedEntities: ['Working Capital Loans', 'CC Facilities'],
    rootCause: 'Portfolio structure with majority floating rate instruments',
    mitigations: [
      { action: 'Interest rate swap for ₹100 Cr', status: 'pending', owner: 'Treasury' },
      { action: 'Refinance to fixed rate where feasible', status: 'in-progress', owner: 'Treasury' },
    ],
    aiRecommendation: 'RBI expected to hold rates stable. Consider opportunistic swap when 10Y G-sec drops below 6.8%.',
    confidenceScore: 85,
    monitoringStatus: 'watching',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

export default RiskCard;
