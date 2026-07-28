'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export interface GaugeChartProps {
  value: number;
  maxValue?: number;
  minValue?: number;
  title?: string;
  subtitle?: string;
  unit?: string;
  thresholds?: {
    low: number;
    medium: number;
    high: number;
  };
  colors?: {
    low: string;
    medium: string;
    high: string;
    background: string;
  };
  size?: 'sm' | 'md' | 'lg';
  showTarget?: boolean;
  target?: number;
  className?: string;
}

const defaultColors = {
  low: '#ef4444', // red
  medium: '#f59e0b', // yellow
  high: '#10b981', // green
  background: '#1e293b',
};

const defaultThresholds = {
  low: 33,
  medium: 66,
  high: 100,
};

export function GaugeChart({
  value,
  maxValue = 100,
  minValue = 0,
  title,
  subtitle,
  unit = '%',
  thresholds = defaultThresholds,
  colors = defaultColors,
  size = 'md',
  showTarget = false,
  target,
  className,
}: GaugeChartProps) {
  const normalizedValue = Math.min(Math.max(value, minValue), maxValue);
  const percentage = ((normalizedValue - minValue) / (maxValue - minValue)) * 100;

  // Determine color based on thresholds
  let activeColor = colors.low;
  if (percentage >= thresholds.high) {
    activeColor = colors.high;
  } else if (percentage >= thresholds.medium) {
    activeColor = colors.medium;
  }

  // Data for the gauge (semicircle)
  const gaugeData = [
    { name: 'value', value: percentage },
    { name: 'empty', value: 100 - percentage },
  ];

  const sizeConfig = {
    sm: { width: 120, height: 80, innerRadius: 30, outerRadius: 45, fontSize: 'text-lg' },
    md: { width: 160, height: 100, innerRadius: 40, outerRadius: 60, fontSize: 'text-2xl' },
    lg: { width: 200, height: 120, innerRadius: 50, outerRadius: 75, fontSize: 'text-3xl' },
  };

  const config = sizeConfig[size];

  return (
    <Card className={cn('border-slate-800 bg-slate-900/50 p-4', className)}>
      {title && (
        <div className="mb-2 text-center">
          <h4 className="text-sm font-medium text-slate-400">{title}</h4>
        </div>
      )}

      <div className="relative flex flex-col items-center">
        <div style={{ width: config.width, height: config.height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={config.innerRadius}
                outerRadius={config.outerRadius}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={activeColor} />
                <Cell fill={colors.background} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Center value */}
        <div className="absolute bottom-0 flex flex-col items-center">
          <span className={cn('font-bold text-white', config.fontSize)}>
            {normalizedValue.toFixed(value % 1 !== 0 ? 1 : 0)}
            <span className="text-sm text-slate-400">{unit}</span>
          </span>
          {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
        </div>

        {/* Target indicator */}
        {showTarget && target !== undefined && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="text-slate-500">Target:</span>
            <span className="font-medium text-white">
              {target}
              {unit}
            </span>
            {normalizedValue >= target ? (
              <span className="text-emerald-400">Achieved</span>
            ) : (
              <span className="text-yellow-400">
                {(target - normalizedValue).toFixed(1)}
                {unit} to go
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-4">
        <div className="flex items-center gap-1.5">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: colors.low }}
          />
          <span className="text-xs text-slate-500">Low</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: colors.medium }}
          />
          <span className="text-xs text-slate-500">Medium</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: colors.high }}
          />
          <span className="text-xs text-slate-500">High</span>
        </div>
      </div>
    </Card>
  );
}

// Liquidity-specific gauge with appropriate defaults
export function LiquidityGauge({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <GaugeChart
      value={value}
      maxValue={200}
      title="Liquidity Ratio"
      unit="x"
      thresholds={{
        low: 50, // 1.0x
        medium: 75, // 1.5x
        high: 100, // 2.0x+
      }}
      showTarget
      target={150}
      className={className}
    />
  );
}

// Cash utilization gauge
export function CashUtilizationGauge({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <GaugeChart
      value={value}
      maxValue={100}
      title="Cash Utilization"
      unit="%"
      thresholds={{
        low: 40,
        medium: 70,
        high: 90,
      }}
      colors={{
        low: '#10b981', // Green when low utilization
        medium: '#f59e0b', // Yellow medium
        high: '#ef4444', // Red when high
        background: '#1e293b',
      }}
      subtitle="of available cash deployed"
      className={className}
    />
  );
}

// Debt service coverage ratio gauge
export function DSCRGauge({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <GaugeChart
      value={value * 100} // Convert ratio to percentage scale
      maxValue={300}
      title="DSCR"
      unit="x"
      thresholds={{
        low: 42, // 1.25x
        medium: 50, // 1.5x
        high: 67, // 2.0x+
      }}
      showTarget
      target={125} // 1.25x minimum
      className={className}
    />
  );
}

export default GaugeChart;
