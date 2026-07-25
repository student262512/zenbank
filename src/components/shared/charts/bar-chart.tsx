'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface BarChartDataPoint {
  label: string;
  value: number;
  value2?: number;
  color?: string;
}

export interface BarChartProps {
  data: BarChartDataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  orientation?: 'vertical' | 'horizontal';
  showGrid?: boolean;
  showLabels?: boolean;
  showValues?: boolean;
  barColor?: string;
  bar2Color?: string;
  grouped?: boolean;
  stacked?: boolean;
  className?: string;
  formatValue?: (value: number) => string;
  legend?: { label: string; color: string }[];
}

export function BarChart({
  data,
  title,
  subtitle,
  height = 200,
  orientation = 'vertical',
  showGrid = true,
  showLabels = true,
  showValues = false,
  barColor = '#3b82f6',
  bar2Color = '#22d3ee',
  grouped = false,
  stacked = false,
  className,
  formatValue = (v) => v.toLocaleString(),
  legend,
}: BarChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <Card className={cn('p-4', className)}>
        <div className="flex h-[200px] items-center justify-center text-slate-500">
          No data available
        </div>
      </Card>
    );
  }

  // const values = data.map((d) => {
  //   if (stacked && d.value2) {
  //     return d.value + d.value2;
  //   }
  //   return Math.max(d.value, d.value2 || 0);
  // });
  // const maxValue = Math.max(...values);

  const values = data.map((d) => {
  const value = Number.isFinite(d.value) ? d.value : 0;
  const value2 = Number.isFinite(d.value2) ? d.value2! : 0;

  return stacked ? value + value2 : Math.max(value, value2);
});

const maxValue = Math.max(...values, 1);

  const barWidth = 100 / (data.length * 2 + 1);
  const barGap = barWidth / 2;

  if (orientation === 'horizontal') {
    return (
      <Card className={cn('p-4', className)}>
        {(title || subtitle) && (
          <div className="mb-4">
            {title && <h3 className="text-sm font-medium text-white">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
        )}

        {legend && (
          <div className="mb-3 flex items-center gap-4">
            {legend.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2 w-4 rounded" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-400">{item.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {data.map((item, index) => {
            const percentage = (item.value / maxValue) * 100;
            const percentage2 = item.value2 != null ? (item.value2 / maxValue) * 100 : 0;

            return (
              <div
                key={index}
                className="group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className="text-xs font-medium text-white">
                    {formatValue(item.value)}
                  </span>
                </div>
                <div className="relative h-6 overflow-hidden rounded bg-slate-800">
                  <div
                    className="absolute inset-y-0 left-0 rounded transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color || barColor,
                    }}
                  />
                  {item.value2 != null && !stacked && (
                    <div
                      className="absolute inset-y-0 rounded transition-all duration-300"
                      style={{
                        left: 0,
                        width: `${percentage2}%`,
                        backgroundColor: bar2Color,
                        opacity: 0.5,
                      }}
                    />
                  )}
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 bg-white/5" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }

  // Vertical bar chart
  const padding = { top: 20, right: 20, bottom: 50, left: 50 };
  const chartHeight = height - padding.top - padding.bottom;

  return (
    <Card className={cn('p-4', className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-sm font-medium text-white">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      )}

      {legend && (
        <div className="mb-3 flex items-center gap-4">
          {legend.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-2 w-4 rounded" style={{ backgroundColor: item.color }} />
              <span className="text-xs text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="relative" style={{ height }}>
        <svg viewBox={`0 0 100 ${height}`} className="h-full w-full" preserveAspectRatio="none">
          {/* Grid lines */}
          {showGrid &&
            [0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
              const y = padding.top + chartHeight * (1 - pct);
              return (
                <g key={i}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={100 - padding.right}
                    y2={y}
                    stroke="#334155"
                    strokeDasharray="2 2"
                  />
                  <text x={padding.left - 5} y={y} textAnchor="end" dominantBaseline="middle" className="fill-slate-500 text-[3px]">
                    {formatValue(maxValue * pct)}
                  </text>
                </g>
              );
            })}

          {/* Bars */}
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const bar2Height = item.value2 != null ? (item.value2 / maxValue) * chartHeight : 0;
            const x = padding.left + (index / data.length) * (100 - padding.left - padding.right) + barGap;
            const width = grouped && item.value2 != null ? barWidth * 0.45 : barWidth;

            return (
              <g
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Main bar */}
                <rect
                  x={x}
                  y={padding.top + chartHeight - barHeight}
                  width={width}
                  height={barHeight}
                  fill={item.color || barColor}
                  rx="1"
                  className={cn(
                    'transition-opacity',
                    hoveredIndex !== null && hoveredIndex !== index && 'opacity-50'
                  )}
                />

                {/* Secondary bar */}
                {item.value2 != null && (
                  <rect
                    x={grouped ? x + width + 1 : x}
                    y={stacked ? padding.top + chartHeight - barHeight - bar2Height : padding.top + chartHeight - bar2Height}
                    width={width}
                    height={bar2Height}
                    fill={bar2Color}
                    rx="1"
                    className={cn(
                      'transition-opacity',
                      hoveredIndex !== null && hoveredIndex !== index && 'opacity-50'
                    )}
                  />
                )}

                {/* Value label */}
                {showValues && (
                  <text
                    x={x + width / 2}
                    y={padding.top + chartHeight - barHeight - 3}
                    textAnchor="middle"
                    className="fill-white text-[2.5px] font-medium"
                  >
                    {formatValue(item.value)}
                  </text>
                )}

                {/* X-axis label */}
                {showLabels && (
                  <text
                    x={x + width / 2}
                    y={height - 15}
                    textAnchor="middle"
                    className="fill-slate-500 text-[3px]"
                  >
                    {item.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="pointer-events-none absolute z-10 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 shadow-lg"
            style={{
              left: `${((hoveredIndex + 0.5) / data.length) * 100}%`,
              top: '20%',
              transform: 'translateX(-50%)',
            }}
          >
            <p className="text-xs font-medium text-white">{data[hoveredIndex].label}</p>
            <p className="text-sm text-blue-400">{formatValue(data[hoveredIndex].value)}</p>
            {data[hoveredIndex].value2 !== undefined && (
              <p className="text-sm text-cyan-400">{formatValue(data[hoveredIndex].value2!)}</p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

export default BarChart;
