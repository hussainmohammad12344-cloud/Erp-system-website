"use client"

import { BILLING_TYPE_OPTIONS } from "@/constants/pricing"

export default function BillingTypeTabs({ value, onChange, className = "" }) {
    return (
        <div
            role="tablist"
            aria-label="نوع پرداخت"
            className={`inline-flex rounded-full border border-border bg-background-secondary p-1.5 ${className}`}
        >
            {BILLING_TYPE_OPTIONS.map((option) => {
                const isActive = value === option.value

                return (
                    <button
                        key={option.value}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onChange(option.value)}
                        className={`cursor-pointer min-w-24 rounded-full px-5 py-2.5 text-sm font-semibold transition-[color,background-color,box-shadow] duration-200 ${
                            isActive
                                ? "bg-primary text-white shadow-md shadow-primary/25"
                                : "text-foreground-muted hover:text-foreground"
                        }`}
                    >
                        {option.label}
                    </button>
                )
            })}
        </div>
    )
}
