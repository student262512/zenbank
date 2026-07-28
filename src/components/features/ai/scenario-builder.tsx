'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Play,
  Save,
  RotateCcw,
  Copy,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Zap,
  DollarSign,
  Percent,
  Calendar,
  Clock,
  type LucideIcon,
} from 'lucide-react';

export type ScenarioType = 'base' | 'optimistic' | 'pessimistic' | 'stress' | 'custom';
export type ParameterType = 'rate' | 'amount' | 'percentage' | 'days' | 'multiplier';

export interface ScenarioParameter {
  id: string;
  name: string;
  type: ParameterType;
  category: string;
  baseValue: number;
  currentValue: number;
  minValue: number;
  maxValue: number;
  step: number;
  unit: string;
  description?: string;
}

export interface ScenarioResult {
  metric: string;
  baseValue: string;
  projectedValue: string;
  change: number;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface Scenario {
  id: string;
  name: string;
  type: ScenarioType;
  description: string;
  parameters: ScenarioParameter[];
  results?: ScenarioResult[];
  lastRun?: Date;
  aiScore?: number;
}

export interface ScenarioBuilderProps {
  scenario?: Scenario;
  onRun?: (scenario: Scenario) => void;
  onSave?: (scenario: Scenario) => void;
  onReset?: () => void;
  className?: string;
}

const typeConfig: Record<ScenarioType, { label: string; color: string; bg: string; icon: LucideIcon }> = {
  base: { label: 'Base Case', color: 'text-slate-400', bg: 'bg-slate-500/10', icon: TrendingUp },
  optimistic: { label: 'Optimistic', color: 'text-green-400', bg: 'bg-green-500/10', icon: TrendingUp },
  pessimistic: { label: 'Pessimistic', color: 'text-orange-400', bg: 'bg-orange-500/10', icon: TrendingDown },
  stress: { label: 'Stress Test', color: 'text-red-400', bg: 'bg-red-500/10', icon: AlertTriangle },
  custom: { label: 'Custom', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Sparkles },
};

const parameterIcons: Record<ParameterType, LucideIcon> = {
  rate: Percent,
  amount: DollarSign,
  percentage: Percent,
  days: Calendar,
  multiplier: Zap,
};

// Default parameters for scenario building
const defaultParameters: ScenarioParameter[] = [
  {
    id: 'interest-rate',
    name: 'Interest Rate Change',
    type: 'rate',
    category: 'Rates',
    baseValue: 0,
    currentValue: 0,
    minValue: -2,
    maxValue: 2,
    step: 0.25,
    unit: '%',
    description: 'Change in interest rates from current levels',
  },
  {
    id: 'revenue-growth',
    name: 'Revenue Growth',
    type: 'percentage',
    category: 'Revenue',
    baseValue: 0,
    currentValue: 0,
    minValue: -20,
    maxValue: 30,
    step: 1,
    unit: '%',
    description: 'Year-over-year revenue growth adjustment',
  },
  {
    id: 'collection-delay',
    name: 'Collection Delay',
    type: 'days',
    category: 'Working Capital',
    baseValue: 0,
    currentValue: 0,
    minValue: 0,
    maxValue: 30,
    step: 1,
    unit: 'days',
    description: 'Additional days to collect receivables',
  },
  {
    id: 'fx-rate',
    name: 'USD/INR Change',
    type: 'rate',
    category: 'FX',
    baseValue: 0,
    currentValue: 0,
    minValue: -5,
    maxValue: 10,
    step: 0.5,
    unit: '%',
    description: 'Change in USD/INR exchange rate',
  },
  {
    id: 'cost-inflation',
    name: 'Cost Inflation',
    type: 'percentage',
    category: 'Costs',
    baseValue: 0,
    currentValue: 0,
    minValue: 0,
    maxValue: 15,
    step: 0.5,
    unit: '%',
    description: 'Additional cost inflation beyond baseline',
  },
  {
    id: 'capex-change',
    name: 'Capex Adjustment',
    type: 'percentage',
    category: 'Investment',
    baseValue: 0,
    currentValue: 0,
    minValue: -50,
    maxValue: 50,
    step: 5,
    unit: '%',
    description: 'Change in planned capital expenditure',
  },
];

// Preset scenarios
const presetScenarios: Record<ScenarioType, Partial<ScenarioParameter>[]> = {
  base: [],
  optimistic: [
    { id: 'revenue-growth', currentValue: 15 },
    { id: 'collection-delay', currentValue: -5 },
    { id: 'interest-rate', currentValue: -0.5 },
  ],
  pessimistic: [
    { id: 'revenue-growth', currentValue: -10 },
    { id: 'collection-delay', currentValue: 15 },
    { id: 'cost-inflation', currentValue: 8 },
  ],
  stress: [
    { id: 'revenue-growth', currentValue: -20 },
    { id: 'collection-delay', currentValue: 30 },
    { id: 'fx-rate', currentValue: 8 },
    { id: 'interest-rate', currentValue: 1.5 },
    { id: 'cost-inflation', currentValue: 12 },
  ],
  custom: [],
};

export function ScenarioBuilder({
  scenario: initialScenario,
  onRun,
  onSave,
  onReset,
  className,
}: ScenarioBuilderProps) {
  const [scenarioType, setScenarioType] = React.useState<ScenarioType>('custom');
  const [scenarioName, setScenarioName] = React.useState('New Scenario');
  const [parameters, setParameters] = React.useState<ScenarioParameter[]>(
    initialScenario?.parameters || defaultParameters
  );
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(['Rates', 'Revenue']);
  const [isRunning, setIsRunning] = React.useState(false);
  const [results, setResults] = React.useState<ScenarioResult[] | null>(null);

  // Group parameters by category
  const parametersByCategory = React.useMemo(() => {
    const grouped: Record<string, ScenarioParameter[]> = {};
    parameters.forEach((param) => {
      if (!grouped[param.category]) {
        grouped[param.category] = [];
      }
      grouped[param.category].push(param);
    });
    return grouped;
  }, [parameters]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const updateParameter = (id: string, value: number) => {
    setParameters((prev) =>
      prev.map((p) => (p.id === id ? { ...p, currentValue: value } : p))
    );
    setResults(null);
  };

  const applyPreset = (type: ScenarioType) => {
    setScenarioType(type);
    const preset = presetScenarios[type];
    setParameters((prev) =>
      prev.map((p) => {
        const presetValue = preset.find((pr) => pr.id === p.id);
        return presetValue ? { ...p, currentValue: presetValue.currentValue ?? p.baseValue } : { ...p, currentValue: p.baseValue };
      })
    );
    setResults(null);
  };

  const resetParameters = () => {
    setParameters((prev) => prev.map((p) => ({ ...p, currentValue: p.baseValue })));
    setScenarioType('custom');
    setResults(null);
    onReset?.();
  };

  const runScenario = async () => {
    setIsRunning(true);
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate mock results based on parameters
    const mockResults: ScenarioResult[] = [
      {
        metric: 'Net Cash Flow',
        baseValue: '₹847 Cr',
        projectedValue: `₹${Math.round(847 * (1 + (parameters.find((p) => p.id === 'revenue-growth')?.currentValue || 0) / 100))} Cr`,
        change: parameters.find((p) => p.id === 'revenue-growth')?.currentValue || 0,
        impact: (parameters.find((p) => p.id === 'revenue-growth')?.currentValue || 0) >= 0 ? 'positive' : 'negative',
      },
      {
        metric: 'DSCR',
        baseValue: '1.45x',
        projectedValue: `${(1.45 + (parameters.find((p) => p.id === 'revenue-growth')?.currentValue || 0) / 100 - (parameters.find((p) => p.id === 'interest-rate')?.currentValue || 0) / 10).toFixed(2)}x`,
        change: -2.5,
        impact: 'negative',
      },
      {
        metric: 'Working Capital Days',
        baseValue: '45 days',
        projectedValue: `${45 + (parameters.find((p) => p.id === 'collection-delay')?.currentValue || 0)} days`,
        change: parameters.find((p) => p.id === 'collection-delay')?.currentValue || 0,
        impact: (parameters.find((p) => p.id === 'collection-delay')?.currentValue || 0) <= 0 ? 'positive' : 'negative',
      },
      {
        metric: 'Interest Cost',
        baseValue: '₹125 Cr',
        projectedValue: `₹${Math.round(125 * (1 + (parameters.find((p) => p.id === 'interest-rate')?.currentValue || 0) / 10))} Cr`,
        change: (parameters.find((p) => p.id === 'interest-rate')?.currentValue || 0) * 10,
        impact: (parameters.find((p) => p.id === 'interest-rate')?.currentValue || 0) <= 0 ? 'positive' : 'negative',
      },
      {
        metric: 'FX Impact',
        baseValue: '₹0 Cr',
        projectedValue: `₹${Math.round((parameters.find((p) => p.id === 'fx-rate')?.currentValue || 0) * 1.5)} Cr`,
        change: (parameters.find((p) => p.id === 'fx-rate')?.currentValue || 0) * 1.5,
        impact: (parameters.find((p) => p.id === 'fx-rate')?.currentValue || 0) <= 0 ? 'positive' : 'negative',
      },
    ];

    setResults(mockResults);
    setIsRunning(false);

    onRun?.({
      id: `scenario-${Date.now()}`,
      name: scenarioName,
      type: scenarioType,
      description: '',
      parameters,
      results: mockResults,
      lastRun: new Date(),
    });
  };

  const saveScenario = () => {
    onSave?.({
      id: `scenario-${Date.now()}`,
      name: scenarioName,
      type: scenarioType,
      description: '',
      parameters,
      results: results || undefined,
      lastRun: results ? new Date() : undefined,
    });
  };

  const config = typeConfig[scenarioType];
  const TypeIcon = config.icon;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', config.bg)}>
                <TypeIcon className={cn('h-5 w-5', config.color)} />
              </div>
              <div>
                <Input
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  className="h-8 border-none bg-transparent p-0 text-lg font-semibold text-white focus-visible:ring-0"
                />
                <Badge className={cn('mt-1', config.bg, config.color)}>
                  {config.label}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={resetParameters}>
                <RotateCcw className="mr-1 h-4 w-4" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={saveScenario}>
                <Save className="mr-1 h-4 w-4" />
                Save
              </Button>
              <Button
                size="sm"
                onClick={runScenario}
                disabled={isRunning}
                className="gap-1 bg-blue-600 hover:bg-blue-500"
              >
                {isRunning ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Run Scenario
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-slate-400">Presets:</span>
            {(Object.keys(typeConfig) as ScenarioType[]).map((type) => (
              <Button
                key={type}
                variant={scenarioType === type ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => applyPreset(type)}
                className={cn(scenarioType === type && typeConfig[type].color)}
              >
                {typeConfig[type].label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Parameters */}
      <Card className="border-slate-800 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-base">Scenario Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(parametersByCategory).map(([category, params]) => (
            <div key={category} className="rounded-lg border border-slate-800">
              <button
                onClick={() => toggleCategory(category)}
                className="flex w-full items-center justify-between p-3 text-left hover:bg-slate-800/50"
              >
                <span className="font-medium text-white">{category}</span>
                {expandedCategories.includes(category) ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </button>
              {expandedCategories.includes(category) && (
                <div className="space-y-4 border-t border-slate-800 p-4">
                  {params.map((param) => {
                    const Icon = parameterIcons[param.type];
                    const changeFromBase = param.currentValue - param.baseValue;
                    const hasChanged = changeFromBase !== 0;

                    return (
                      <div key={param.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-slate-400" />
                            <Label className="text-sm text-slate-300">{param.name}</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                'text-sm font-medium',
                                hasChanged
                                  ? changeFromBase > 0
                                    ? 'text-red-400'
                                    : 'text-green-400'
                                  : 'text-slate-400'
                              )}
                            >
                              {param.currentValue > 0 ? '+' : ''}
                              {param.currentValue}
                              {param.unit}
                            </span>
                          </div>
                        </div>
                        <Slider
                          value={[param.currentValue]}
                          onValueChange={(value) => updateParameter(param.id, value[0])}
                          min={param.minValue}
                          max={param.maxValue}
                          step={param.step}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>
                            {param.minValue}
                            {param.unit}
                          </span>
                          <span>
                            {param.maxValue}
                            {param.unit}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="border-slate-800 bg-slate-900/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-blue-400" />
                Scenario Results
              </CardTitle>
              <Badge className="bg-blue-500/10 text-blue-400">
                AI Confidence: 87%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((result, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-slate-800 p-3"
                >
                  <div>
                    <p className="text-sm text-slate-400">{result.metric}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">{result.baseValue}</span>
                      <span className="text-slate-600">→</span>
                      <span
                        className={cn(
                          'font-medium',
                          result.impact === 'positive' && 'text-green-400',
                          result.impact === 'negative' && 'text-red-400',
                          result.impact === 'neutral' && 'text-slate-400'
                        )}
                      >
                        {result.projectedValue}
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={cn(
                      result.impact === 'positive' && 'bg-green-500/10 text-green-400',
                      result.impact === 'negative' && 'bg-red-500/10 text-red-400',
                      result.impact === 'neutral' && 'bg-slate-500/10 text-slate-400'
                    )}
                  >
                    {result.change > 0 ? '+' : ''}
                    {result.change.toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Quick Scenario Cards for common scenarios
export function QuickScenarioCard({
  title,
  description,
  type,
  onClick,
  className,
}: {
  title: string;
  description: string;
  type: ScenarioType;
  onClick: () => void;
  className?: string;
}) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <Card
      className={cn(
        'cursor-pointer border-slate-800 bg-slate-900/50 p-4 transition-all hover:border-slate-700 hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', config.bg)}>
          <Icon className={cn('h-5 w-5', config.color)} />
        </div>
        <div>
          <h4 className="font-medium text-white">{title}</h4>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
          <Badge className={cn('mt-2', config.bg, config.color)}>
            {config.label}
          </Badge>
        </div>
      </div>
    </Card>
  );
}

export default ScenarioBuilder;
