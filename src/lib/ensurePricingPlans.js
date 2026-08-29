import PricingPlan from "@/models/PricingPlan"
import { DEFAULT_PRICING_PLANS } from "@/constants/contentDefaults"
import { BILLING_TYPES } from "@/constants/pricing"

const VALID_TYPES = new Set(Object.values(BILLING_TYPES))

function inferBillingType(plan) {
    if (VALID_TYPES.has(plan.billingType)) {
        return plan.billingType
    }

    const period = String(plan.period || "")
    const cta = String(plan.cta || "")

    if (period.includes("سال")) return BILLING_TYPES.yearly
    if (
        period.includes("یک‌بار") ||
        period.includes("یکبار") ||
        period.includes("دایمی") ||
        cta.includes("دایمی")
    ) {
        return BILLING_TYPES.lifetime
    }

    return BILLING_TYPES.monthly
}

export async function ensurePricingPlans() {
    const collection = PricingPlan.collection
    const existing = await collection.find({}).toArray()

    if (existing.length === 0) {
        await PricingPlan.insertMany(DEFAULT_PRICING_PLANS)
        return
    }

    for (const plan of existing) {
        const billingType = inferBillingType(plan)
        if (plan.billingType !== billingType) {
            await collection.updateOne(
                { _id: plan._id },
                { $set: { billingType } }
            )
        }
    }

    for (const billingType of Object.values(BILLING_TYPES)) {
        const count = await collection.countDocuments({ billingType })
        if (count === 0) {
            const defaults = DEFAULT_PRICING_PLANS.filter(
                (plan) => plan.billingType === billingType
            )
            if (defaults.length) {
                await collection.insertMany(
                    defaults.map((plan) => ({
                        ...plan,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }))
                )
            }
        }
    }
}
