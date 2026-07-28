'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface PieChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps<T extends object> {
  data: PieChartDataPoint[];
  title?: string;
  subtitle?: string;
  size?: number;
  innerRadius?: number;
  showLegend?: boolean;
  showLabels?: boolean;
  showPercentages?: boolean;
  className?: string;
  formatValue?: (value: number) => string;
  colors?: string[];
  centerLabel?: string;
  centerValue?: string;
}

const DEFAULT_COLORS = [
  '#3b82f6',
  '#22d3ee',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#6366f1',
];

export function PieChart<T extends object>({
  data,
  title,
  subtitle,
  size = 200,
  innerRadius = 0.6,
  showLegend = true,
  showLabels = false,
  showPercentages = true,
  className,
  formatValue = (v) => v.toLocaleString(),
  colors = DEFAULT_COLORS,
  centerLabel,
  centerValue,
}: PieChartProps<T>) {
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

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const center = size / 2;
  const outerRadius = size / 2 - 10;
  const inner = outerRadius * innerRadius;

  let currentAngle = -90; // Start from top

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    currentAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + outerRadius * Math.cos(startRad);
    const y1 = center + outerRadius * Math.sin(startRad);
    const x2 = center + outerRadius * Math.cos(endRad);
    const y2 = center + outerRadius * Math.sin(endRad);

    const x3 = center + inner * Math.cos(endRad);
    const y3 = center + inner * Math.sin(endRad);
    const x4 = center + inner * Math.cos(startRad);
    const y4 = center + inner * Math.sin(startRad);

    const largeArc = angle > 180 ? 1 : 0;

    const path = innerRadius > 0
      ? `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${inner} ${inner} 0 ${largeArc} 0 ${x4} ${y4} Z`
      : `M ${center} ${center} L ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    // Label position
    const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
    const labelRadius = outerRadius * 0.7;
    const labelX = center + labelRadius * Math.cos(midAngle);
    const labelY = center + labelRadius * Math.sin(midAngle);

    return {
      ...item,
      percentage,
      path,
      color: item.color || colors[index % colors.length],
      labelX,
      labelY,
      index,
    };
  });

  return (
    <Card className={cn('p-4', className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-sm font-medium text-white">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      )}

      <div className="flex flex-col items-center gap-4 lg:items-start">
        {/* Pie Chart */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
            {segments.map((segment) => (
              <path
                key={segment.index}
                d={segment.path}
                fill={segment.color}
                className={cn(
                  'cursor-pointer transition-all duration-200',
                  hoveredIndex !== null && hoveredIndex !== segment.index && 'opacity-50'
                )}
                style={{
                  transform: hoveredIndex === segment.index ? 'scale(1.03)' : 'scale(1)',
                  transformOrigin: 'center',
                }}
                onMouseEnter={() => setHoveredIndex(segment.index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}

            {/* Center label (for donut) */}
            {innerRadius > 0 && (centerLabel || centerValue) && (
              <g>
                {centerValue && (
                  <text
                    x={center}
                    y={center - 5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white text-lg font-bold"
                    style={{ fontSize: size / 8 }}
                  >
                    {centerValue}
                  </text>
                )}
                {centerLabel && (
                  <text
                    x={center}
                    y={center + (centerValue ? 15 : 0)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-400"
                    style={{ fontSize: size / 15 }}
                  >
                    {centerLabel}
                  </text>
                )}
              </g>
            )}

            {/* Percentage labels on segments */}
            {showLabels &&
              segments.map((segment) => (
                segment.percentage > 5 && (
                  <text
                    key={`label-${segment.index}`}
                    x={segment.labelX}
                    y={segment.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="pointer-events-none fill-white font-medium"
                    style={{ fontSize: size / 15 }}
                  >
                    {segment.percentage.toFixed(0)}%
                  </text>
                )
              ))}
          </svg>

          {/* Tooltip */}
          {hoveredIndex !== null && (
            <div
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-center shadow-lg"
            >
              <p className="text-xs font-medium text-white">{segments[hoveredIndex].label}</p>
              <p className="text-sm font-bold" style={{ color: segments[hoveredIndex].color }}>
                {formatValue(segments[hoveredIndex].value)}
              </p>
              {showPercentages && (
                <p className="text-xs text-slate-400">{segments[hoveredIndex].percentage.toFixed(1)}%</p>
              )}
            </div>
          )}
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="flex flex-wrap justify-center gap-3 lg:flex-col lg:justify-start">
            {segments.map((segment) => (
              <div
                key={segment.index}
                className={cn(
                  'flex cursor-pointer items-center gap-2 transition-opacity',
                  hoveredIndex !== null && hoveredIndex !== segment.index && 'opacity-50'
                )}
                onMouseEnter={() => setHoveredIndex(segment.index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-xs text-slate-400">{segment.label}</span>
                <span className="text-xs font-medium text-white">
                  {showPercentages
                    ? `${segment.percentage.toFixed(1)}%`
                    : formatValue(segment.value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export default PieChart;
