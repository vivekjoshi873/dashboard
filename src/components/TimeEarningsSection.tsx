"use client"

import React from "react"
import { ChartBarIncreasing, Clock3, CreditCard } from "lucide-react"

type RangeKey = "1m" | "3m" | "1y" | "custom"

export interface TimeEarningsSectionProps {
  className?: string
  totalEarnings?: string
  paymentAwaited?: string
  paymentOverdue?: string
  defaultRange?: RangeKey
  onRangeChange?: (range: RangeKey) => void
  onCustomRange?: () => void
}

const RANGE_OPTIONS: { key: RangeKey; label: string }[] = [
  { key: "1m", label: "1 Month" },
  { key: "3m", label: "3 Months" },
  { key: "1y", label: "1 Year" },
  { key: "custom", label: "Custom" },
]

export const TimeEarningsSection = ({
  className = "",
  totalEarnings = "$1,25,000",
  paymentAwaited = "$18,400",
  paymentOverdue = "$6,250",
  defaultRange = "3m",
  onRangeChange,
  onCustomRange,
}: TimeEarningsSectionProps) => {
  const [selected, setSelected] = React.useState<RangeKey>(defaultRange)

  const handleSelect = (key: RangeKey) => {
    setSelected(key)
    if (key === "custom") {
      onCustomRange?.()
    }
    onRangeChange?.(key)
  }

  return (
    <section
      aria-label="Earnings metrics"
      className={[
        "w-full max-w-full",
        "rounded-[var(--radius-lg)] border bg-card",
        "p-4 sm:p-6",
        "shadow-sm",
        "transition-colors",
        className,
      ].join(" ")}
    >
      <div className="flex w-full items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock3 className="size-4 text-muted-foreground" aria-hidden="true" />
          <span className="sr-only">Selected time period:</span>
          <span className="min-w-0 break-words">Time Period</span>
        </div>

        <div
          role="tablist"
          aria-label="Select time period"
          className="flex flex-wrap items-center gap-1.5"
        >
          {RANGE_OPTIONS.map((opt) => {
            const isActive = selected === opt.key
            const isCustom = opt.key === "custom"
            return (
              <button
                key={opt.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-pressed={isActive}
                onClick={() => handleSelect(opt.key)}
                className={[
                  "inline-flex items-center justify-center",
                  "rounded-full border text-sm font-medium",
                  "px-4 py-2",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[var(--ring)]",
                  "transition-all duration-200 ease-in-out",
                  isActive
                    ? "text-primary border-[color:var(--border-light-purple)]"
                    : "text-foreground/80 border-border hover:bg-secondary/60",
                ].join(" ")}
                style={
                  isActive
                    ? { backgroundColor: "var(--light-purple-background)" }
                    : undefined
                }
              >
                <span className="min-w-0 truncate">{opt.label}</span>
                {isCustom && (
                  <span className="sr-only"> open custom range picker</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="my-4 h-px w-full bg-border" />

      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div
              className="flex size-9 items-center justify-center rounded-md"
              style={{ backgroundColor: "var(--light-purple-background)" }}
            >
              <ChartBarIncreasing
                className="size-5 text-primary"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                Total Earnings
              </span>
              <span className="text-xl sm:text-2xl font-semibold text-primary">
                {totalEarnings}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-lg border bg-card px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="flex size-8 items-center justify-center rounded-md"
                  style={{ backgroundColor: "var(--light-purple-background)" }}
                >
                  <CreditCard
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground leading-none">
                    Payment Awaited
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base font-semibold text-primary">
                {paymentAwaited}
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-card px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="flex size-8 items-center justify-center rounded-md"
                  style={{ backgroundColor: "var(--light-purple-background)" }}
                >
                  <CreditCard
                    className="size-4 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground leading-none">
                    Payment Overdue
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base font-semibold text-primary">
                {paymentOverdue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimeEarningsSection