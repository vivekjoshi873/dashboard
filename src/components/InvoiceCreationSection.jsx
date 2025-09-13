"use client"

import React from "react"
import { Plus, FilePlus2 } from "lucide-react"
import { Button } from "@/components/ui/button"

function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function InvoiceCreationSection({
  className,
  title = "Create New Invoice",
  subtitle = "Start by creating and sending new invoice",
  onCreate,
  onUpload,
}) {
  const IconWrapper = onCreate ? "button" : "div"

  return (
    <section
      aria-label="Create invoice section"
      className={cx(
        "w-full max-w-full rounded-[var(--radius-lg)] bg-[var(--create-invoice-button)]",
        "p-6 sm:p-8",
        "shadow-sm border border-border",
        className
      )}
    >
      <div className="flex w-full items-start gap-4 sm:gap-6">
        <IconWrapper
          {...(onCreate
            ? {
                type: "button",
                onClick: onCreate,
                "aria-label": "Create new invoice",
              }
            : {})}
          className={cx(
            "relative inline-flex h-16 w-16 sm:h-20 sm:w-20 select-none",
            "rounded-full p-[2px]",
            "bg-gradient-to-br from-[var(--primary)] via-[var(--chart-4)] to-[var(--chart-2)]",
            onCreate
              ? "cursor-pointer outline-none ring-0 transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              : ""
          )}
        >
          <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-[var(--light-purple-background)]">
            <Plus
              aria-hidden="true"
              className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--purple-text)]"
            />
          </span>
        </IconWrapper>

        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight text-[var(--dark-text-on-light)] break-words">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--helper-text)]">
            {subtitle}
          </p>

          <div className="mt-4">
            <Button
              type="button"
              variant="link"
              onClick={onUpload}
              className={cx(
                "px-0 text-[var(--purple-text)] underline-offset-4",
                "hover:underline focus-visible:ring-0 focus-visible:underline"
              )}
              aria-label="Upload an existing invoice instead"
            >
              <FilePlus2
                aria-hidden="true"
                className="mr-2 h-4 w-4 text-[var(--purple-text)]"
              />
              Or Upload an existing Invoice and set payment reminder
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}