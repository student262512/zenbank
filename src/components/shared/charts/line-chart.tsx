'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface LineChartDataPoint {
  label: string;
  value: number;
  value2?: number;
}

export interface LineChartProps {
  data: LineChartDataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  showGrid?: boolean;
  showLabels?: boolean;
  showTooltip?: boolean;
  lineColor?: string;
  line2Color?: string;
  fillGradient?: boolean;
  className?: string;
  formatValue?: (value: number) => string;
  legend?: { label: string; color: string }[];
}

export function LineChart({
  data,
  title,
  subtitle,
  height = 200,
  showGrid = true,
  showLabels = true,
  showTooltip = true,
  lineColor = '#3b82f6',
  line2Color = '#22d3ee',
  fillGradient = true,
  className,
  formatValue = (v) => v.toLocaleString(),
  legend,
}: LineChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  if (!data || data.length === 0) {
    return (
      <Card className={cn('p-4', className)}>
        <div className="flex h-[200px] items-center justify-center text-slate-500">
          No data available
        </div>
      </Card>
    );
  }

  const values = data.map((d) => d.value);
  const values2 = data.filter((d) => d.value2 !== undefined).map((d) => d.value2!);
  const allValues = [...values, ...values2];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const range = maxValue - minValue || 1;

  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartWidth = 100;
  const chartHeight = height - padding.top - padding.bottom;

  const getX = (index: number) =>
    padding.left + (index / (data.length - 1)) * (chartWidth - padding.left - padding.right);

  const getY = (value: number) =>
    padding.top + chartHeight - ((value - minValue) / range) * chartHeight;

  const createPath = (dataPoints: number[]) => {
    return dataPoints
      .map((value, index) => {
        const x = getX(index);
        const y = getY(value);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  const createAreaPath = (dataPoints: number[]) => {
    const linePath = createPath(dataPoints);
    const lastX = getX(dataPoints.length - 1);
    const firstX = getX(0);
    const bottom = padding.top + chartHeight;
    return `${linePath} L ${lastX} ${bottom} L ${firstX} ${bottom} Z`;
  };

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((pct) => {
    const value = minValue + range * pct;
    return {
      y: getY(value),
      value,
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

      {legend && (
        <div className="mb-3 flex items-center gap-4">
          {legend.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="h-2 w-4 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-slate-400">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      <div
        ref={containerRef}
        className="relative"
        style={{ height }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <svg
          viewBox={`0 0 ${chartWidth} ${height}`}
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="line2Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={line2Color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={line2Color} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {showGrid &&
            gridLines.map((line, i) => (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={line.y}
                  x2={chartWidth - padding.right}
                  y2={line.y}
                  stroke="#334155"
                  strokeDasharray="2 2"
                />
                <text
                  x={padding.left - 8}
                  y={line.y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-slate-500 text-[3px]"
                >
                  {formatValue(line.value)}
                </text>
              </g>
            ))}

          {/* Area fills */}
          {fillGradient && (
            <>
              <path d={createAreaPath(values)} fill="url(#lineGradient)" />
              {values2.length > 0 && (
                <path d={createAreaPath(values2)} fill="url(#line2Gradient)" />
              )}
            </>
          )}

          {/* Lines */}
          <path
            d={createPath(values)}
            fill="none"
            stroke={lineColor}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {values2.length > 0 && (
            <path
              d={createPath(values2)}
              fill="none"
              stroke={line2Color}
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data points */}
          {data.map((point, index) => (
            <g key={index}>
              <circle
                cx={getX(index)}
                cy={getY(point.value)}
                r={hoveredIndex === index ? '1.5' : '1'}
                fill={hoveredIndex === index ? lineColor : 'transparent'}
                stroke={lineColor}
                strokeWidth="0.5"
              />
              {point.value2 !== undefined && (
                <circle
                  cx={getX(index)}
                  cy={getY(point.value2)}
                  r={hoveredIndex === index ? '1.5' : '1'}
                  fill={hoveredIndex === index ? line2Color : 'transparent'}
                  stroke={line2Color}
                  strokeWidth="0.5"
                />
              )}
              <rect
                x={getX(index) - 3}
                y={padding.top}
                width="6"
                height={chartHeight}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(index)}
              />
            </g>
          ))}

          {/* X-axis labels */}
          {showLabels &&
            data.map((point, index) => {
              if (data.length > 10 && index % Math.ceil(data.length / 6) !== 0) return null;
              return (
                <text
                  key={index}
                  x={getX(index)}
                  y={height - 10}
                  textAnchor="middle"
                  className="fill-slate-500 text-[3px]"
                >
                  {point.label}
                </text>
              );
            })}
        </svg>

        {/* Tooltip */}
        {showTooltip && hoveredIndex !== null && (
          <div
            className="pointer-events-none absolute z-10 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 shadow-lg"
            style={{
              left: `${(getX(hoveredIndex) / chartWidth) * 100}%`,
              top: '10%',
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

export default LineChart;
