'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';
import { Sparkles, TrendingUp, TrendingDown, Info } from 'lucide-react';

export type ForecastType = 'cash' | 'revenue' | 'liquidity' | 'debt' | 'profit';
export type TimeHorizon = '30' | '90' | '180' | '365';
export type ScenarioType = 'base' | 'optimistic' | 'pessimistic';

export interface ForecastDataPoint {
  date: string;
  actual?: number;
  forecast: number;
  upperBound?: number;
  lowerBound?: number;
}

export interface ForecastChartProps {
  type?: ForecastType;
  horizon?: TimeHorizon;
  scenario?: ScenarioType;
  data?: ForecastDataPoint[];
  className?: string;
  onTypeChange?: (type: ForecastType) => void;
  onHorizonChange?: (horizon: TimeHorizon) => void;
  onScenarioChange?: (scenario: ScenarioType) => void;
}

// Generate mock forecast data
function generateForecastData(horizon: TimeHorizon, type: ForecastType): ForecastDataPoint[] {
  const days = parseInt(horizon);
  const data: ForecastDataPoint[] = [];
  const today = new Date();

  // Base values based on type
  const baseValues: Record<ForecastType, number> = {
    cash: 847,
    revenue: 245,
    liquidity: 1250,
    debt: 3800,
    profit: 85,
  };

  let baseValue = baseValues[type];
  const volatility = type === 'debt' ? 0.02 : 0.05;
  const trend = type === 'debt' ? -0.001 : 0.002;

  // Historical data (30 days back)
  for (let i = -30; i < 0; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const randomFactor = 1 + (Math.random() - 0.5) * volatility;
    const trendFactor = 1 + trend * i;
    const value = Math.round(baseValue * randomFactor * trendFactor * 10) / 10;

    data.push({
      date: date.toISOString().split('T')[0],
      actual: value,
      forecast: value,
    });
  }

  // Current value
  baseValue = data[data.length - 1].actual || baseValue;

  // Forecast data
  for (let i = 0; i <= days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const trendFactor = 1 + trend * i;
    const forecast = Math.round(baseValue * trendFactor * 10) / 10;
    const uncertainty = Math.abs(i) * 0.003 * baseValue;

    data.push({
      date: date.toISOString().split('T')[0],
      actual: i === 0 ? forecast : undefined,
      forecast,
      upperBound: Math.round((forecast + uncertainty) * 10) / 10,
      lowerBound: Math.round((forecast - uncertainty) * 10) / 10,
    });
  }

  return data;
}

const typeLabels: Record<ForecastType, string> = {
  cash: 'Cash Position',
  revenue: 'Revenue',
  liquidity: 'Liquidity',
  debt: 'Debt',
  profit: 'Profit',
};

const horizonLabels: Record<TimeHorizon, string> = {
  '30': '30 Days',
  '90': '90 Days',
  '180': '180 Days',
  '365': '1 Year',
};

const scenarioLabels: Record<ScenarioType, string> = {
  base: 'Base Case',
  optimistic: 'Optimistic',
  pessimistic: 'Pessimistic',
};

// AI assumptions for context
const aiAssumptions: Record<ForecastType, string[]> = {
  cash: [
    'Collections assumed at 95% of scheduled',
    'Vendor payments as per contracted terms',
    'No major unplanned capex',
  ],
  revenue: [
    'Sales pipeline conversion at historical rates',
    'Seasonal patterns from past 3 years applied',
    'No major contract cancellations',
  ],
  liquidity: [
    'Credit lines maintained at current levels',
    'Working capital cycle stable',
    'No covenant breaches expected',
  ],
  debt: [
    'Scheduled repayments only',
    'No new borrowings assumed',
    'Interest rates held constant',
  ],
  profit: [
    'Cost escalation at 5% YoY',
    'Revenue growth at projected rates',
    'Operating efficiency maintained',
  ],
};

export function ForecastChart({
  type = 'cash',
  horizon = '90',
  scenario = 'base',
  data,
  className,
  onTypeChange,
  onHorizonChange,
  onScenarioChange,
}: ForecastChartProps) {
  const [activeType, setActiveType] = React.useState<ForecastType>(type);
  const [activeHorizon, setActiveHorizon] = React.useState<TimeHorizon>(horizon);
  const [activeScenario, setActiveScenario] = React.useState<ScenarioType>(scenario);
  const [showAssumptions, setShowAssumptions] = React.useState(false);

  const chartData = data || generateForecastData(activeHorizon, activeType);

  const handleTypeChange = (newType: ForecastType) => {
    setActiveType(newType);
    onTypeChange?.(newType);
  };

  const handleHorizonChange = (newHorizon: TimeHorizon) => {
    setActiveHorizon(newHorizon);
    onHorizonChange?.(newHorizon);
  };

  const handleScenarioChange = (newScenario: ScenarioType) => {
    setActiveScenario(newScenario);
    onScenarioChange?.(newScenario);
  };

  // Calculate trend
  const latestForecast = chartData[chartData.length - 1]?.forecast || 0;
  const currentValue = chartData.find((d) => d.actual !== undefined)?.actual || latestForecast;
  const trendPercent = ((latestForecast - currentValue) / currentValue) * 100;
  const isPositiveTrend = trendPercent > 0;

  const formatValue = (value: number) => {
    return `₹${value} Cr`;
  };

  return (
    <Card className={cn('border-slate-800 bg-slate-900/50 p-4', className)}>
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Enterprise Forecast</h3>
          <p className="text-sm text-slate-400">AI-powered projection with confidence bands</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={isPositiveTrend ? 'success' : 'danger'}
            className="gap-1"
          >
            {isPositiveTrend ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {isPositiveTrend ? '+' : ''}
            {trendPercent.toFixed(1)}%
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Sparkles className="h-3 w-3" />
            94% Confidence
          </Badge>
        </div>
      </div>

      {/* Type Navigation */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(typeLabels) as ForecastType[]).map((t) => (
          <Button
            key={t}
            variant={activeType === t ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleTypeChange(t)}
          >
            {typeLabels[t]}
          </Button>
        ))}
      </div>

      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {(Object.keys(horizonLabels) as TimeHorizon[]).map((h) => (
            <Button
              key={h}
              variant={activeHorizon === h ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => handleHorizonChange(h)}
            >
              {horizonLabels[h]}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          {(Object.keys(scenarioLabels) as ScenarioType[]).map((s) => (
            <Button
              key={s}
              variant={activeScenario === s ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => handleScenarioChange(s)}
            >
              {scenarioLabels[s]}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
              }}
              labelFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-IN', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
              }}
              formatter={(value: number) => [formatValue(value), '']}
            />
            <Legend />
            <ReferenceLine
              x={new Date().toISOString().split('T')[0]}
              stroke="#f59e0b"
              strokeDasharray="3 3"
              label={{ value: 'Today', fill: '#f59e0b', fontSize: 12 }}
            />
            {/* Confidence band */}
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="url(#confidenceGradient)"
              name="Upper Bound"
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill="transparent"
              name="Lower Bound"
            />
            {/* Actual line */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name="Actual"
            />
            {/* Forecast line */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Forecast"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* AI Assumptions */}
      <div className="mt-4">
        <button
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <Info className="h-4 w-4" />
          <span>AI Assumptions</span>
          <Sparkles className="h-3 w-3 text-blue-400" />
        </button>
        {showAssumptions && (
          <div className="mt-2 rounded-lg bg-slate-800/50 p-3">
            <ul className="space-y-1">
              {aiAssumptions[activeType].map((assumption, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="text-blue-400">•</span>
                  {assumption}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}

export default ForecastChart;
