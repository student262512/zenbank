'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  type LucideIcon,
} from 'lucide-react';

export type SimulationType = 'cash-flow' | 'liquidity' | 'debt' | 'working-capital' | 'scenario-comparison';

export interface SimulationDataPoint {
  period: string;
  base: number;
  optimistic?: number;
  pessimistic?: number;
  actual?: number;
  target?: number;
  upperBound?: number;
  lowerBound?: number;
}

export interface SimulationMetric {
  name: string;
  current: number;
  projected: number;
  change: number;
  status: 'positive' | 'negative' | 'neutral' | 'warning';
  icon: LucideIcon;
}

export interface SimulationResult {
  type: SimulationType;
  title: string;
  summary: string;
  data: SimulationDataPoint[];
  metrics: SimulationMetric[];
  confidence: number;
  recommendations: string[];
  warnings: string[];
}

export interface FinancialSimulatorProps {
  type?: SimulationType;
  result?: SimulationResult;
  isRunning?: boolean;
  onStart?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onExport?: () => void;
  className?: string;
}

const typeConfig: Record<SimulationType, { label: string; color: string }> = {
  'cash-flow': { label: 'Cash Flow Simulation', color: '#3b82f6' },
  liquidity: { label: 'Liquidity Simulation', color: '#10b981' },
  debt: { label: 'Debt Simulation', color: '#f59e0b' },
  'working-capital': { label: 'Working Capital Simulation', color: '#8b5cf6' },
  'scenario-comparison': { label: 'Scenario Comparison', color: '#ec4899' },
};

// Generate mock simulation data
function generateSimulationData(type: SimulationType, months: number = 12): SimulationDataPoint[] {
  const data: SimulationDataPoint[] = [];
  const baseValues: Record<SimulationType, number> = {
    'cash-flow': 850,
    liquidity: 1250,
    debt: 3800,
    'working-capital': 450,
    'scenario-comparison': 850,
  };

  let baseValue = baseValues[type];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();

  for (let i = 0; i < months; i++) {
    const monthIndex = (currentMonth + i) % 12;
    const isHistorical = i < 3;
    const trend = type === 'debt' ? -0.02 : 0.03;
    const volatility = 0.05;

    const baseProjection = baseValue * (1 + trend * i + (Math.random() - 0.5) * volatility);
    const optimisticProjection = baseProjection * 1.15;
    const pessimisticProjection = baseProjection * 0.85;

    data.push({
      period: `${monthNames[monthIndex]} '${24 + Math.floor((currentMonth + i) / 12)}`,
      base: Math.round(baseProjection),
      optimistic: isHistorical ? undefined : Math.round(optimisticProjection),
      pessimistic: isHistorical ? undefined : Math.round(pessimisticProjection),
      actual: isHistorical ? Math.round(baseProjection * (0.95 + Math.random() * 0.1)) : undefined,
      target: type === 'liquidity' ? 1200 : undefined,
      upperBound: isHistorical ? undefined : Math.round(baseProjection * 1.1),
      lowerBound: isHistorical ? undefined : Math.round(baseProjection * 0.9),
    });
  }

  return data;
}

// Generate mock metrics
function generateMetrics(type: SimulationType): SimulationMetric[] {
  const metricsConfig: Record<SimulationType, SimulationMetric[]> = {
    'cash-flow': [
      { name: 'Ending Cash', current: 847, projected: 912, change: 7.7, status: 'positive', icon: TrendingUp },
      { name: 'Peak Deficit', current: -125, projected: -85, change: 32, status: 'positive', icon: TrendingUp },
      { name: 'Days Cash', current: 45, projected: 52, change: 15.6, status: 'positive', icon: Clock },
      { name: 'Cash Conversion', current: 68, projected: 62, change: -8.8, status: 'positive', icon: Target },
    ],
    liquidity: [
      { name: 'Liquidity Ratio', current: 1.45, projected: 1.52, change: 4.8, status: 'positive', icon: TrendingUp },
      { name: 'Quick Ratio', current: 1.12, projected: 1.18, change: 5.4, status: 'positive', icon: TrendingUp },
      { name: 'Buffer Days', current: 35, projected: 42, change: 20, status: 'positive', icon: Clock },
      { name: 'Stress Survival', current: 90, projected: 95, change: 5.6, status: 'positive', icon: Target },
    ],
    debt: [
      { name: 'Total Debt', current: 3800, projected: 3650, change: -3.9, status: 'positive', icon: TrendingDown },
      { name: 'DSCR', current: 1.45, projected: 1.52, change: 4.8, status: 'positive', icon: TrendingUp },
      { name: 'Interest Cover', current: 3.2, projected: 3.5, change: 9.4, status: 'positive', icon: TrendingUp },
      { name: 'Debt/EBITDA', current: 2.8, projected: 2.5, change: -10.7, status: 'positive', icon: TrendingDown },
    ],
    'working-capital': [
      { name: 'Working Capital', current: 450, projected: 520, change: 15.6, status: 'positive', icon: TrendingUp },
      { name: 'DSO', current: 52, projected: 48, change: -7.7, status: 'positive', icon: TrendingDown },
      { name: 'DPO', current: 45, projected: 48, change: 6.7, status: 'positive', icon: TrendingUp },
      { name: 'CCC', current: 68, projected: 58, change: -14.7, status: 'positive', icon: TrendingDown },
    ],
    'scenario-comparison': [
      { name: 'Base Case', current: 847, projected: 912, change: 7.7, status: 'positive', icon: TrendingUp },
      { name: 'Optimistic', current: 847, projected: 1050, change: 24, status: 'positive', icon: TrendingUp },
      { name: 'Pessimistic', current: 847, projected: 775, change: -8.5, status: 'warning', icon: TrendingDown },
      { name: 'Stress', current: 847, projected: 650, change: -23.3, status: 'negative', icon: AlertTriangle },
    ],
  };

  return metricsConfig[type];
}

// Generate mock result
function generateResult(type: SimulationType): SimulationResult {
  return {
    type,
    title: typeConfig[type].label,
    summary: `AI analysis complete. ${type === 'cash-flow' ? 'Cash position expected to improve by 7.7% over 12 months with base case assumptions.' : 'Simulation results generated with 94% confidence.'}`,
    data: generateSimulationData(type),
    metrics: generateMetrics(type),
    confidence: 94,
    recommendations: [
      'Accelerate collections from top 20 customers with 2% early payment discount',
      'Defer non-essential capex of ₹25 Cr to Q2',
      'Consider refinancing high-cost debt to capture rate savings',
    ],
    warnings: type === 'debt' ? ['DSCR may breach 1.25x covenant in stress scenario'] : [],
  };
}

export function FinancialSimulator({
  type = 'cash-flow',
  result: initialResult,
  isRunning = false,
  onStart,
  onPause,
  onReset,
  onExport,
  className,
}: FinancialSimulatorProps) {
  const [simulationType, setSimulationType] = React.useState<SimulationType>(type);
  const [running, setRunning] = React.useState(isRunning);
  const [result, setResult] = React.useState<SimulationResult | null>(initialResult || null);
  const [progress, setProgress] = React.useState(0);

  const runSimulation = async () => {
    setRunning(true);
    setProgress(0);
    onStart?.();

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setProgress(i);
    }

    setResult(generateResult(simulationType));
    setRunning(false);
  };

  const resetSimulation = () => {
    setResult(null);
    setProgress(0);
    onReset?.();
  };

  const config = typeConfig[simulationType];

  return (
    <div className={cn('space-y-4', className)}>
      {/* Controls */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-400" />
                Financial Simulator
              </CardTitle>
              <p className="mt-1 text-sm text-slate-400">
                AI-powered scenario analysis and projections
              </p>
            </div>
            <div className="flex items-center gap-2">
              {onExport && result && (
                <Button variant="outline" size="sm" onClick={onExport}>
                  <Download className="mr-1 h-4 w-4" />
                  Export
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={resetSimulation} disabled={running}>
                <RotateCcw className="mr-1 h-4 w-4" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={running ? onPause : runSimulation}
                className="gap-1 bg-blue-600 hover:bg-blue-500"
              >
                {running ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Run Simulation
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Simulation Type Selector */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(typeConfig) as SimulationType[]).map((t) => (
              <Button
                key={t}
                variant={simulationType === t ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => {
                  setSimulationType(t);
                  setResult(null);
                }}
                disabled={running}
              >
                {typeConfig[t].label}
              </Button>
            ))}
          </div>

          {/* Progress Bar */}
          {running && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Running simulation...</span>
                <span className="text-blue-400">{progress}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <>
          {/* Summary */}
          <Card className="border-slate-800 bg-slate-900/50">
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span className="font-medium text-white">Simulation Complete</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{result.summary}</p>
                </div>
                <Badge className="bg-blue-500/10 text-blue-400">
                  <Sparkles className="mr-1 h-3 w-3" />
                  {result.confidence}% Confidence
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {result.metrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <Card key={i} className="border-slate-800 bg-slate-900/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">{metric.name}</span>
                    <Icon
                      className={cn(
                        'h-4 w-4',
                        metric.status === 'positive' && 'text-green-400',
                        metric.status === 'negative' && 'text-red-400',
                        metric.status === 'warning' && 'text-yellow-400',
                        metric.status === 'neutral' && 'text-slate-400'
                      )}
                    />
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">
                      {typeof metric.projected === 'number' && metric.projected > 100
                        ? `₹${metric.projected}`
                        : metric.projected}
                    </span>
                    <Badge
                      className={cn(
                        metric.status === 'positive' && 'bg-green-500/10 text-green-400',
                        metric.status === 'negative' && 'bg-red-500/10 text-red-400',
                        metric.status === 'warning' && 'bg-yellow-500/10 text-yellow-400',
                        metric.status === 'neutral' && 'bg-slate-500/10 text-slate-400'
                      )}
                    >
                      {metric.change > 0 ? '+' : ''}
                      {metric.change.toFixed(1)}%
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Current: {typeof metric.current === 'number' && metric.current > 100 ? `₹${metric.current}` : metric.current}
                  </p>
                </Card>
              );
            })}
          </div>

          {/* Chart */}
          <Card className="border-slate-800 bg-slate-900/50">
            <CardHeader>
              <CardTitle className="text-base">{result.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {simulationType === 'scenario-comparison' ? (
                    <LineChart data={result.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="period" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `₹${value}`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => [`₹${value} Cr`, '']}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Actual"
                      />
                      <Line
                        type="monotone"
                        dataKey="base"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Base Case"
                      />
                      <Line
                        type="monotone"
                        dataKey="optimistic"
                        stroke="#22c55e"
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        name="Optimistic"
                      />
                      <Line
                        type="monotone"
                        dataKey="pessimistic"
                        stroke="#f59e0b"
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        name="Pessimistic"
                      />
                    </LineChart>
                  ) : (
                    <AreaChart data={result.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="baseGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={config.color} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={config.color} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="period" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `₹${value}`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                        }}
                        formatter={(value: number) => [`₹${value} Cr`, '']}
                      />
                      <Legend />
                      {result.data[0].target && (
                        <ReferenceLine
                          y={result.data[0].target}
                          stroke="#f59e0b"
                          strokeDasharray="3 3"
                          label={{ value: 'Target', fill: '#f59e0b', fontSize: 12 }}
                        />
                      )}
                      <Area
                        type="monotone"
                        dataKey="upperBound"
                        stroke="none"
                        fill="url(#confidenceGradient)"
                        name="Upper Bound"
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        name="Actual"
                      />
                      <Line
                        type="monotone"
                        dataKey="base"
                        stroke={config.color}
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Projected"
                      />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations & Warnings */}
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Recommendations */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      <span className="text-sm text-slate-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <Card className="border-yellow-500/30 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base text-yellow-400">
                    <AlertTriangle className="h-4 w-4" />
                    Risk Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.warnings.map((warning, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" />
                        <span className="text-sm text-yellow-400/80">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default FinancialSimulator;
