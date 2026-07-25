'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

export interface AreaChartDataPoint {
  label: string;
  value: number;
  value2?: number;
  value3?: number;
}

export interface AreaChartProps {
  data: AreaChartDataPoint[];
  title?: string;
  subtitle?: string;
  height?: number;
  stacked?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
  colors?: string[];
  className?: string;
  formatValue?: (value: number) => string;
  legend?: { label: string; color: string }[];
}

const DEFAULT_COLORS = ['#3b82f6', '#22d3ee', '#10b981'];

export function AreaChart({
  data,
  title,
  subtitle,
  height = 200,
  stacked = false,
  showGrid = true,
  showLabels = true,
  colors = DEFAULT_COLORS,
  className,
  formatValue = (v) => v.toLocaleString(),
  legend,
}: AreaChartProps) {
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

  // Get all values to determine range
  const allSeries: number[][] = [data.map((d) => d.value)];
  if (data.some((d) => d.value2 !== undefined)) {
    allSeries.push(data.map((d) => d.value2 || 0));
  }
  if (data.some((d) => d.value3 !== undefined)) {
    allSeries.push(data.map((d) => d.value3 || 0));
  }

  let maxValue: number;
  if (stacked) {
    maxValue = Math.max(
      ...data.map((d) => (d.value || 0) + (d.value2 || 0) + (d.value3 || 0))
    );
  } else {
    maxValue = Math.max(...allSeries.flat());
  }

  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = 100;
  const chartHeight = height - padding.top - padding.bottom;

  const getX = (index: number) =>
    padding.left + (index / (data.length - 1)) * (chartWidth - padding.left - padding.right);

  const getY = (value: number) =>
    padding.top + chartHeight - (value / maxValue) * chartHeight;

  const createAreaPath = (values: number[], baseValues?: number[]) => {
    const points = values.map((value, index) => {
      const base = baseValues?.[index] || 0;
      return `${getX(index)},${getY(value + base)}`;
    });

    const basePoints = (baseValues || values.map(() => 0))
      .map((value, index) => `${getX(data.length - 1 - index)},${getY(value)}`)
      .reverse();

    return `M ${points.join(' L ')} L ${getX(data.length - 1)},${getY(baseValues?.[data.length - 1] || 0)} L ${basePoints.join(' L ')} Z`;
  };

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
    y: getY(maxValue * pct),
    value: maxValue * pct,
  }));

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

      <div
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
            {colors.map((color, i) => (
              <linearGradient key={i} id={`areaGradient${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={color} stopOpacity="0.05" />
              </linearGradient>
            ))}
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
                  x={padding.left - 5}
                  y={line.y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-slate-500 text-[3px]"
                >
                  {formatValue(line.value)}
                </text>
              </g>
            ))}

          {/* Areas (draw in reverse order so first series is on top) */}
          {stacked ? (
            <>
              {allSeries.length >= 3 && (
                <path
                  d={createAreaPath(
                    data.map((d) => d.value3 || 0),
                    data.map((d) => (d.value || 0) + (d.value2 || 0))
                  )}
                  fill={`url(#areaGradient2)`}
                />
              )}
              {allSeries.length >= 2 && (
                <path
                  d={createAreaPath(
                    data.map((d) => d.value2 || 0),
                    data.map((d) => d.value)
                  )}
                  fill={`url(#areaGradient1)`}
                />
              )}
              <path
                d={createAreaPath(data.map((d) => d.value))}
                fill={`url(#areaGradient0)`}
              />
            </>
          ) : (
            <>
              {allSeries.map((series, seriesIndex) => (
                <path
                  key={seriesIndex}
                  d={createAreaPath(series)}
                  fill={`url(#areaGradient${seriesIndex})`}
                />
              ))}
            </>
          )}

          {/* Lines */}
          {allSeries.map((series, seriesIndex) => {
            let cumulativeBase: number[] | undefined;
            if (stacked && seriesIndex > 0) {
              cumulativeBase = data.map((_, i) =>
                allSeries.slice(0, seriesIndex).reduce((sum, s) => sum + s[i], 0)
              );
            }

            const linePath = series
              .map((value, index) => {
                const base = cumulativeBase?.[index] || 0;
                return `${index === 0 ? 'M' : 'L'} ${getX(index)} ${getY(value + base)}`;
              })
              .join(' ');

            return (
              <path
                key={seriesIndex}
                d={linePath}
                fill="none"
                stroke={colors[seriesIndex]}
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}

          {/* Hover regions */}
          {data.map((_, index) => (
            <rect
              key={index}
              x={getX(index) - (chartWidth - padding.left - padding.right) / data.length / 2}
              y={padding.top}
              width={(chartWidth - padding.left - padding.right) / data.length}
              height={chartHeight}
              fill="transparent"
              onMouseEnter={() => setHoveredIndex(index)}
            />
          ))}

          {/* Hover line */}
          {hoveredIndex !== null && (
            <line
              x1={getX(hoveredIndex)}
              y1={padding.top}
              x2={getX(hoveredIndex)}
              y2={padding.top + chartHeight}
              stroke="#64748b"
              strokeWidth="0.3"
              strokeDasharray="2 2"
            />
          )}

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
        {hoveredIndex !== null && (
          <div
            className="pointer-events-none absolute z-10 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 shadow-lg"
            style={{
              left: `${(getX(hoveredIndex) / chartWidth) * 100}%`,
              top: '10%',
              transform: 'translateX(-50%)',
            }}
          >
            <p className="text-xs font-medium text-white">{data[hoveredIndex].label}</p>
            <p className="text-sm" style={{ color: colors[0] }}>
              {formatValue(data[hoveredIndex].value)}
            </p>
            {data[hoveredIndex].value2 !== undefined && (
              <p className="text-sm" style={{ color: colors[1] }}>
                {formatValue(data[hoveredIndex].value2)}
              </p>
            )}
            {data[hoveredIndex].value3 !== undefined && (
              <p className="text-sm" style={{ color: colors[2] }}>
                {formatValue(data[hoveredIndex].value3)}
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

export default AreaChart;
