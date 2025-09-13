"use client";

import React from "react";
import InvoiceCreationSection from "@/components/InvoiceCreationSection";
import TimeEarningsSection from "@/components/TimeEarningsSection";
import IncomeChartSection from "@/components/IncomeChart";
import { InvoiceList } from "@/components/InvoiceList";

type RangeKey = "1m" | "3m" | "1y" | "custom";

type ChartDataPoint = { month: string; income: number; growth: number };

function getChartDataForRange(range: RangeKey): { data: ChartDataPoint[]; maxIncome: number } {
  switch (range) {
    case "1m":
      return {
        data: [
          { month: "This", income: 6200, growth: 64 },
          { month: "Prev", income: 5400, growth: 0 },
        ],
        maxIncome: 8000,
      };
    case "3m":
      return {
        data: [
          { month: "Jul", income: 5200, growth: 22 },
          { month: "Aug", income: 6100, growth: 38 },
          { month: "Sep", income: 7600, growth: 85 },
        ],
        maxIncome: 8000,
      };
    case "1y":
      return {
        data: [
          { month: "Jan", income: 3000, growth: 20 },
          { month: "Feb", income: 4200, growth: 35 },
          { month: "Mar", income: 3800, growth: 28 },
          { month: "Apr", income: 5200, growth: 48 },
          { month: "May", income: 6100, growth: 62 },
          { month: "Jun", income: 7600, growth: 85 },
          { month: "Jul", income: 6900, growth: 72 },
          { month: "Aug", income: 7200, growth: 81 },
          { month: "Sep", income: 7800, growth: 90 },
          { month: "Oct", income: 7400, growth: 78 },
          { month: "Nov", income: 7050, growth: 70 },
          { month: "Dec", income: 7950, growth: 92 },
        ],
        maxIncome: 9000,
      };
    case "custom":
    default:
      return {
        data: [
          { month: "W1", income: 1800, growth: 15 },
          { month: "W2", income: 2300, growth: 28 },
          { month: "W3", income: 2100, growth: 22 },
          { month: "W4", income: 2600, growth: 36 },
        ],
        maxIncome: 3000,
      };
  }
}

export default function Page() {
  const [range, setRange] = React.useState<RangeKey>("3m");
  const [{ data: chartData, maxIncome }, setChart] = React.useState(getChartDataForRange("3m"));
  const [selectedInvoiceId, setSelectedInvoiceId] = React.useState<string | null>(null);
  const [uploadMode, setUploadMode] = React.useState<boolean>(false);
  const [customRangeActive, setCustomRangeActive] = React.useState<boolean>(false);

  const handleRangeChange = React.useCallback((next: RangeKey) => {
    setRange(next);
    const nextChart = getChartDataForRange(next);
    setChart(nextChart);
    setCustomRangeActive(next === "custom");
  }, []);

  const handleCustomRange = React.useCallback(() => {
    setCustomRangeActive(true);
  }, []);

  const handleCreateInvoice = React.useCallback(() => {
    // In a real app, this would open a modal or navigate to a create flow.
    // Here, reflect action in UI by clearing selections and showing a subtle banner.
    setSelectedInvoiceId(null);
    setUploadMode(false);
  }, []);

  const handleUploadInvoice = React.useCallback(() => {
    // In a real app, trigger file picker; here we toggle a banner state.
    setUploadMode(true);
  }, []);

  return (
    <main className="min-h-dvh w-full bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              Invoices Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Create, track, and analyze your invoices with a unified purple-accented workspace.
            </p>
          </div>

          <div className="mt-3 space-y-2">
            {selectedInvoiceId && (
              <div
                className="rounded-md border bg-card text-card-foreground px-3 py-2 text-sm"
                role="status"
                aria-live="polite"
              >
                Selected invoice: <span className="font-medium">{selectedInvoiceId}</span>
              </div>
            )}
            {uploadMode && (
              <div
                className="rounded-md border border-[var(--border-light-purple)] bg-[var(--light-purple-background)] text-[var(--purple-text)] px-3 py-2 text-sm"
                role="status"
                aria-live="polite"
              >
                Upload mode active — choose a file to import an existing invoice.
              </div>
            )}
            {customRangeActive && (
              <div className="rounded-md border bg-secondary px-3 py-2 text-sm text-foreground/90">
                Custom range applied to analytics. Adjust as needed.
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6">
          <InvoiceCreationSection
            className="border border-border bg-[var(--create-invoice-button)]"
            onCreate={handleCreateInvoice}
            onUpload={handleUploadInvoice}
          />

          <TimeEarningsSection
            className="bg-card"
            defaultRange={range}
            onRangeChange={handleRangeChange}
            onCustomRange={handleCustomRange}
          />

          <IncomeChartSection
            className="bg-card"
            title="Income Trend"
            subtitle="Your monthly income and growth for the last 6 months."
            data={chartData}
            maxIncome={maxIncome}
          />

          <InvoiceList
            className="bg-card"
            onItemClick={(id) => {
              setSelectedInvoiceId(id);
              if (range !== "3m") {
                handleRangeChange("3m");
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}