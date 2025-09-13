"use client"

import React from "react"
import { ChartBar, Percent } from "lucide-react"
import { cn } from "@/lib/utils"

type DataPoint = {
  month: string
  income: number // in dollars
  growth: number // 0-100 (%)
}

interface IncomeChartProps {
  className?: string
  title?: string
  subtitle?: string
  data?: DataPoint[]
  maxIncome?: number // upper bound for left Y axis (e.g., 8000)
}

const DEFAULT_DATA: DataPoint[] = [
  { month: "Jan", income: 3000, growth: 20 },
  { month: "Feb", income: 4200, growth: 35 },
  { month: "Mar", income: 3800, growth: 28 },
  { month: "Apr", income: 5200, growth: 48 },
  { month: "May", income: 6100, growth: 62 },
  { month: "Jun", income: 7600, growth: 85 },
]

export default function IncomeChartSection({
  className,
  title = "Income Trend",
  subtitle = "Your monthly income and growth for the last 6 months.",
  data = DEFAULT_DATA,
  maxIncome = 8000,
}: IncomeChartProps) {
  // Layout constants (in SVG coordinate space)
  const width = 800
  const height = 320
  const margin = { top: 20, right: 48, bottom: 44, left: 48 }

  const innerW = width - margin.left - margin.right
  const innerH = height - margin.top - margin.bottom

  const months = data.map((d) => d.month)
  const n = data.length
  const xStep = innerW / Math.max(n, 1)

  const xForIndex = (i: number) => margin.left + xStep * i + xStep / 2
  const yIncome = (v: number) =>
    margin.top + innerH - (Math.min(v, maxIncome) / maxIncome) * innerH
  const yGrowth = (v: number) =>
    margin.top + innerH - (Math.min(Math.max(v, 0), 100) / 100) * innerH

  // Bars sizing
  const barWidth = Math.min(36, xStep * 0.56)
  const gridIncomeTicks = [0, 2000, 4000, 6000, 8000]
  const gridGrowthTicks = [0, 25, 50, 75, 100]

  const linePoints = data.map((d, i) => `${xForIndex(i)},${yGrowth(d.growth)}`).join(" ")

  return (
    <section
      className={cn(
        "w-full max-w-full bg-card text-card-foreground rounded-lg p-4 md:p-6 border",
        "shadow-[0_1px_0_rgba(255,255,255,0.03)_inset]",
        className
      )}
      aria-label="Income analytics section"
    >
      <header className="mb-4 md:mb-6">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold leading-tight tracking-[-0.01em]">
          {title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          {subtitle}
        </p>
      </header>

      <div className="w-full overflow-x-auto">
        <svg
          role="img"
          aria-label="Combined bar and line chart with monthly income and month-over-month growth"
          viewBox={`0 0 ${width} ${height}`}
          className="max-w-full h-auto"
        >
          <defs>
            <linearGradient id="growthLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6A3D" />
              <stop offset="100%" stopColor="#FF2D55" />
            </linearGradient>
            <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="black" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Grid lines (income-based horizontal grid) */}
          {gridIncomeTicks.map((tick, i) => {
            const y = yIncome(tick)
            return (
              <g key={`grid-${i}`}>
                <line
                  x1={margin.left}
                  x2={width - margin.right}
                  y1={y}
                  y2={y}
                  stroke="currentColor"
                  opacity={0.18}
                  className="text-border"
                />
              </g>
            )
          })}

          {/* Left Y-axis labels (Income) */}
          {gridIncomeTicks.map((tick, i) => {
            const y = yIncome(tick)
            return (
              <text
                key={`yl-${i}`}
                x={margin.left - 8}
                y={y}
                dy="0.35em"
                textAnchor="end"
                className="fill-muted-foreground text-[10px] sm:text-xs"
              >
                ${Math.round(tick / 1000)}k
              </text>
            )
          })}

          {/* Right Y-axis labels (Growth %) */}
          {gridGrowthTicks.map((tick, i) => {
            const y = yGrowth(tick)
            return (
              <text
                key={`yr-${i}`}
                x={width - margin.right + 8}
                y={y}
                dy="0.35em"
                textAnchor="start"
                className="fill-muted-foreground text-[10px] sm:text-xs"
              >
                {tick}%
              </text>
            )
          })}

          {/* X-axis ticks (months) */}
          {months.map((m, i) => (
            <text
              key={`x-${m}`}
              x={xForIndex(i)}
              y={height - margin.bottom + 20}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px] sm:text-xs"
            >
              {m}
            </text>
          ))}

          {/* Bars - Income */}
          {data.map((d, i) => {
            const x = xForIndex(i) - barWidth / 2
            const y = yIncome(d.income)
            const h = margin.top + innerH - y
            return (
              <g key={`bar-${i}`}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={h}
                  rx={6}
                  className="transition-opacity duration-200"
                  fill="var(--chart-bar)"
                  filter="url(#barShadow)"
                >
                  <title>
                    {d.month}: ${d.income.toLocaleString()}
                  </title>
                </rect>
              </g>
            )
          })}

          {/* Line - Growth */}
          <polyline
            points={linePoints}
            fill="none"
            stroke="url(#growthLine)"
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Line points */}
          {data.map((d, i) => (
            <circle
              key={`pt-${i}`}
              cx={xForIndex(i)}
              cy={yGrowth(d.growth)}
              r={4}
              fill="url(#growthLine)"
              stroke="var(--card)"
              strokeWidth={1.75}
            >
              <title>
                {d.month}: {d.growth}%
              </title>
            </circle>
          ))}

          {/* Axes baselines */}
          <line
            x1={margin.left}
            x2={width - margin.right}
            y1={margin.top + innerH}
            y2={margin.top + innerH}
            stroke="currentColor"
            className="text-border"
            opacity={0.35}
          />
        </svg>
      </div>

      {/* Legend */}
      <div
        className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm"
        aria-label="Chart legend"
      >
        <div className="inline-flex items-center gap-2">
          <span
            className="inline-flex h-3 w-3 rounded-sm"
            style={{ backgroundColor: "var(--chart-bar)" }}
            aria-hidden="true"
          />
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <ChartBar className="h-3.5 w-3.5 text-[--chart-bar]" aria-hidden="true" />
            <span className="text-foreground">Income</span>
          </span>
        </div>
        <div className="inline-flex items-center gap-2">
          <span
            className="relative inline-flex h-3 w-3"
            aria-hidden="true"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" className="block">
              <defs>
                <linearGradient id="legendGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6A3D" />
                  <stop offset="100%" stopColor="#FF2D55" />
                </linearGradient>
              </defs>
              <path d="M1 8 Q 3 4, 6 6 T 11 3" stroke="url(#legendGrowth)" strokeWidth="2" fill="none" />
            </svg>
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <Percent className="h-3.5 w-3.5 text-[color:#FF6A3D]" aria-hidden="true" />
            <span className="text-foreground">MoM Growth</span>
          </span>
        </div>
      </div>
    </section>
  )
}