"use client"

import React from "react"
import { ChevronsDownUp, CircleDot, Dot, ReceiptText } from "lucide-react"

export type StatusType =
  | "Update Status"
  | "Unpaid"
  | "Disputed"
  | "Paid"
  | "Partially Paid"
  | "Overdue"
  | "Awaited"
  | "Draft"

export type InvoiceItem = {
  id: string
  client: string
  amount: string
  dueDate: string
  status: StatusType
  notify?: boolean
}

export interface InvoiceListProps {
  className?: string
  title?: string
  collapsedByDefault?: boolean
  items?: InvoiceItem[]
  onItemClick?: (invoiceId: string) => void
}

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function statusStyles(status: StatusType) {
  switch (status) {
    case "Update Status":
      return {
        style: {
          backgroundColor: "var(--light-purple-background)",
          color: "var(--purple-text)",
        },
        outlined: true,
      }
    case "Paid":
      return {
        style: {
          backgroundColor: "var(--invoice-status-paid)",
          color: "var(--invoice-status-paid-foreground)",
        },
      }
    case "Overdue":
      return {
        style: {
          backgroundColor: "var(--invoice-status-overdue)",
          color: "var(--invoice-status-overdue-foreground)",
        },
      }
    case "Disputed":
      return {
        style: {
          backgroundColor: "var(--invoice-status-disputed)",
          color: "var(--invoice-status-disputed-foreground)",
        },
      }
    case "Partially Paid":
      return {
        style: {
          backgroundColor: "var(--invoice-status-partially-paid)",
          color: "var(--invoice-status-partially-paid-foreground)",
        },
      }
    case "Awaited":
      return {
        style: {
          backgroundColor: "var(--invoice-status-awaited)",
          color: "var(--invoice-status-awaited-foreground)",
        },
      }
    case "Draft":
      return {
        style: {
          backgroundColor: "var(--invoice-status-draft)",
          color: "var(--invoice-status-draft-foreground)",
        },
      }
    case "Unpaid":
    default:
      return {
        style: {
          backgroundColor: "var(--invoice-status-unpaid)",
          color: "var(--invoice-status-unpaid-foreground)",
        },
      }
  }
}

const defaultItems: InvoiceItem[] = [
  {
    id: "INV-1042",
    client: "Aether Labs LLC",
    amount: "$2,340.00",
    dueDate: "Due Sep 22, 2025",
    status: "Update Status",
    notify: true,
  },
  {
    id: "INV-1041",
    client: "Nimbus Studio",
    amount: "$1,120.00",
    dueDate: "Due Sep 18, 2025",
    status: "Unpaid",
    notify: true,
  },
  {
    id: "INV-1040",
    client: "Aurora Ventures",
    amount: "$5,400.00",
    dueDate: "Paid Sep 10, 2025",
    status: "Paid",
  },
  {
    id: "INV-1039",
    client: "Helix Dynamics",
    amount: "$3,780.00",
    dueDate: "Due Aug 30, 2025",
    status: "Overdue",
    notify: true,
  },
  {
    id: "INV-1038",
    client: "Mono Limited",
    amount: "$980.00",
    dueDate: "Pending review",
    status: "Disputed",
    notify: true,
  },
  {
    id: "INV-1037",
    client: "Kite & Co.",
    amount: "$2,050.00",
    dueDate: "Awaiting payment",
    status: "Awaited",
  },
  {
    id: "INV-1036",
    client: "PixelStack",
    amount: "$1,400.00",
    dueDate: "Partial received",
    status: "Partially Paid",
  },
  {
    id: "INV-1035",
    client: "Nova Supply",
    amount: "$620.00",
    dueDate: "Unsent draft",
    status: "Draft",
  },
]

export const InvoiceList = ({
  className,
  title = "Your Invoices",
  collapsedByDefault = false,
  items = defaultItems,
  onItemClick,
}: InvoiceListProps) => {
  const [open, setOpen] = React.useState<boolean>(!collapsedByDefault)

  return (
    <section
      className={clsx(
        "w-full max-w-full rounded-lg bg-card border border-border",
        "shadow-sm",
        className
      )}
      aria-label="Invoice list section"
    >
      <header className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4">
        <div className="flex items-center gap-2 min-w-0">
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[--light-purple-background] text-[--purple-text]"
          >
            <ReceiptText className="h-4 w-4" />
          </span>
          <h2 className="text-base sm:text-lg font-semibold tracking-[-0.01em] text-foreground truncate">
            {title}
          </h2>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {items.length} total
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="invoice-list-content"
            className={clsx(
              "inline-flex items-center gap-1 rounded-md border border-transparent",
              "px-2 py-1 text-xs font-medium",
              "text-[--purple-text] hover:text-primary-foreground",
              "bg-[--light-purple-background] hover:bg-primary transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            )}
          >
            <span className="hidden sm:inline">Toggle</span>
            <ChevronsDownUp
              className={clsx(
                "h-4 w-4 transition-transform duration-200",
                open ? "rotate-0" : "rotate-180"
              )}
              aria-hidden={true}
            />
          </button>
        </div>
      </header>

      <div
        id="invoice-list-content"
        className={clsx(
          "transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid grid-rows-[1fr]" : "grid grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          {items.length === 0 ? (
            <div className="px-4 sm:px-5 py-8 text-center">
              <p className="text-sm text-muted-foreground">No invoices yet.</p>
            </div>
          ) : (
            <div
              className={clsx(
                "px-2 sm:px-3 pb-3",
                "max-h-[28rem] overflow-y-auto",
                "scroll-smooth"
              )}
              role="list"
              aria-label="Invoices"
            >
              <ul className="space-y-2 sm:space-y-3">
                {items.map((inv) => {
                  const { style, outlined } = statusStyles(inv.status)
                  const Tag = onItemClick ? "button" : "div"
                  return (
                    <li key={inv.id} className="w-full">
                      <Tag
                        {...(onItemClick ? { onClick: () => onItemClick(inv.id) } : {})}
                        className={clsx(
                          "w-full text-left",
                          "group relative flex items-center gap-3 sm:gap-4",
                          "rounded-lg border border-border bg-secondary",
                          "px-3 sm:px-4 py-3",
                          "transition-colors hover:bg-secondary/80",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                          onItemClick && "cursor-pointer"
                        )}
                        aria-label={`Invoice ${inv.id} for ${inv.client}`}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-card/60 border border-border/70">
                          <span className="sr-only">Invoice icon</span>
                          <ReceiptText className="h-4 w-4 text-muted-foreground" />
                        </div>

                        <div className="flex min-w-0 flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 min-w-0">
                              <p className="text-sm sm:text-base font-medium text-foreground truncate">
                                {inv.client}
                              </p>
                              {inv.notify ? (
                                <span
                                  className="inline-flex items-center justify-center rounded-full"
                                  aria-label="New activity"
                                  title="New activity"
                                >
                                  <CircleDot className="h-3.5 w-3.5 text-[--purple-text]" />
                                </span>
                              ) : null}
                            </div>
                            <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="truncate">{inv.id}</span>
                              <Dot className="h-3 w-3 text-muted-foreground/70" />
                              <span className="truncate">{inv.dueDate}</span>
                            </div>
                          </div>

                          <div className="mt-2 sm:mt-0 flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2 sm:gap-3">
                            <div className="text-sm font-semibold text-foreground">
                              {inv.amount}
                            </div>
                            <span
                              className={clsx(
                                "inline-flex items-center rounded-full",
                                "px-2.5 py-1 text-[11px] sm:text-xs font-medium",
                                outlined ? "border border-[--border-light-purple]" : ""
                              )}
                              style={style as React.CSSProperties}
                              aria-label={`Status: ${inv.status}`}
                            >
                              {inv.status}
                            </span>
                          </div>
                        </div>
                      </Tag>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}