import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import PricingPlan from "@/models/PricingPlan"
import { ensurePricingPlans } from "@/lib/ensurePricingPlans"

function normalizeFeatures(features) {
    if (!Array.isArray(features)) return []
    return features
        .map((item) => String(item).trim())
        .filter(Boolean)
}

export async function GET(request) {
    try {
        await connectDB()
        await ensurePricingPlans()

        const { searchParams } = new URL(request.url)
        const all = searchParams.get("all") === "true"

        const filter = all ? {} : { isActive: true }
        const plans = await PricingPlan.find(filter)
            .sort({ billingType: 1, order: 1, createdAt: 1 })
            .lean()

        return NextResponse.json(plans)
    } catch (error) {
        console.error("GET /api/pricing:", error)
        return NextResponse.json(
            { error: "Failed to fetch pricing plans" },
            { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json()

        const {
            name,
            price,
            period = "",
            billingType = "monthly",
            description,
            features = [],
            cta,
            highlighted = false,
            order = 0,
            isActive = true,
        } = body

        if (!name?.trim() || !price?.trim() || !description?.trim() || !cta?.trim()) {
            return NextResponse.json(
                { error: "name, price, description, and cta are required" },
                { status: 400 }
            )
        }

        const normalizedBillingType = ["monthly", "yearly", "lifetime"].includes(
            billingType
        )
            ? billingType
            : "monthly"

        if (highlighted) {
            await PricingPlan.updateMany(
                { billingType: normalizedBillingType },
                { highlighted: false }
            )
        }

        const plan = await PricingPlan.create({
            name: name.trim(),
            price: price.trim(),
            period: String(period || "").trim(),
            billingType: normalizedBillingType,
            description: description.trim(),
            features: normalizeFeatures(features),
            cta: cta.trim(),
            highlighted: Boolean(highlighted),
            order: Number(order) || 0,
            isActive: Boolean(isActive),
        })

        return NextResponse.json(plan, { status: 201 })
    } catch (error) {
        console.error("POST /api/pricing:", error)
        return NextResponse.json(
            { error: "Failed to create pricing plan" },
            { status: 500 }
        )
    }
}
