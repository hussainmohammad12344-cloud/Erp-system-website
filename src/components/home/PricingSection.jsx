"use client"

import { useMemo, useState } from "react"
import { CheckOutlined } from "@ant-design/icons"
import { Button } from "antd"
import Link from "next/link"
import BillingTypeTabs from "@/components/shared/BillingTypeTabs"
import { BILLING_TYPES } from "@/constants/pricing"

const VALID_TYPES = new Set(Object.values(BILLING_TYPES))

function PlanCard({ plan }) {
    return (
        <div
            className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlighted
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 lg:-translate-y-2"
                    : "border-border hover:border-primary-accent"
            }`}
        >
            {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-white">
                    محبوب‌ترین
                </span>
            )}

            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
            <p className="mt-2 text-sm text-foreground-muted">
                {plan.description}
            </p>

            <div className="mt-6 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">
                    {plan.price}
                </span>
                {plan.period && (
                    <span className="text-sm text-foreground-muted">
                        {plan.period}
                    </span>
                )}
            </div>

            <ul className="mt-8 flex flex-1 flex-col gap-3">
                {(plan.features || []).map((feature) => (
                    <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-foreground-secondary"
                    >
                        <CheckOutlined className="text-primary" />
                        {feature}
                    </li>
                ))}
            </ul>

            <Link href="/pricing" className="mt-8 block">
                <Button
                    type={plan.highlighted ? "primary" : "default"}
                    size="large"
                    block
                >
                    {plan.cta}
                </Button>
            </Link>
        </div>
    )
}

export default function PricingSection({ plans = [] }) {
    const [billingType, setBillingType] = useState(BILLING_TYPES.monthly)

    const groupedPlans = useMemo(() => {
        const groups = {
            [BILLING_TYPES.monthly]: [],
            [BILLING_TYPES.yearly]: [],
            [BILLING_TYPES.lifetime]: [],
        }

        for (const plan of plans) {
            const type = VALID_TYPES.has(plan.billingType)
                ? plan.billingType
                : BILLING_TYPES.monthly
            groups[type].push(plan)
        }

        for (const type of Object.keys(groups)) {
            groups[type].sort((a, b) => a.order - b.order)
        }

        return groups
    }, [plans])

    const activePlans = groupedPlans[billingType] || []

    if (!plans.length) return null

    return (
        <section className="container mx-auto px-6 py-32">
            <div className="mx-auto mb-16 max-w-2xl text-center">
                <h2 className="text-4xl font-bold text-foreground">
                    قیمت متناسب با مقیاس کسب‌وکار شما
                </h2>
                <p className="mt-5 leading-8 text-foreground-muted">
                    پلن ماهانه، سالانه یا دایمی را انتخاب کنید و هر زمان
                    نیاز داشتید ارتقا دهید.
                </p>
            </div>

            <div className="mb-12 flex justify-center">
                <BillingTypeTabs
                    value={billingType}
                    onChange={setBillingType}
                />
            </div>

            {activePlans.length > 0 ? (
                <div className="grid gap-6 lg:grid-cols-3">
                    {activePlans.map((plan) => (
                        <PlanCard key={plan._id} plan={plan} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-foreground-muted">
                    پلنی برای این دوره پرداخت ثبت نشده است.
                </p>
            )}
        </section>
    )
}
