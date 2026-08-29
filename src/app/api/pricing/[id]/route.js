import { NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/lib/mongodb"
import PricingPlan from "@/models/PricingPlan"

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id)
}

function normalizeFeatures(features) {
    if (!Array.isArray(features)) return []
    return features
        .map((item) => String(item).trim())
        .filter(Boolean)
}

export async function GET(_request, { params }) {
    try {
        await connectDB()
        const { id } = await params

        if (!isValidId(id)) {
            return NextResponse.json({ error: "Invalid id" }, { status: 400 })
        }

        const plan = await PricingPlan.findById(id).lean()
        if (!plan) {
            return NextResponse.json({ error: "Plan not found" }, { status: 404 })
        }

        return NextResponse.json(plan)
    } catch (error) {
        console.error("GET /api/pricing/[id]:", error)
        return NextResponse.json(
            { error: "Failed to fetch pricing plan" },
            { status: 500 }
        )
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB()
        const { id } = await params

        if (!isValidId(id)) {
            return NextResponse.json({ error: "Invalid id" }, { status: 400 })
        }

        const body = await request.json()
        const updates = {}

        if (body.name !== undefined) updates.name = String(body.name).trim()
        if (body.price !== undefined) updates.price = String(body.price).trim()
        if (body.period !== undefined) updates.period = String(body.period).trim()
        if (body.billingType !== undefined) {
            if (!["monthly", "yearly", "lifetime"].includes(body.billingType)) {
                return NextResponse.json(
                    { error: "Invalid billingType" },
                    { status: 400 }
                )
            }
            updates.billingType = body.billingType
        }
        if (body.description !== undefined) {
            updates.description = String(body.description).trim()
        }
        if (body.features !== undefined) {
            updates.features = normalizeFeatures(body.features)
        }
        if (body.cta !== undefined) updates.cta = String(body.cta).trim()
        if (body.highlighted !== undefined) {
            updates.highlighted = Boolean(body.highlighted)
        }
        if (body.order !== undefined) updates.order = Number(body.order) || 0
        if (body.isActive !== undefined) updates.isActive = Boolean(body.isActive)

        if (
            updates.name === "" ||
            updates.price === "" ||
            updates.description === "" ||
            updates.cta === ""
        ) {
            return NextResponse.json(
                { error: "name, price, description, and cta cannot be empty" },
                { status: 400 }
            )
        }

        if (updates.highlighted === true) {
            const currentPlan = await PricingPlan.findById(id).lean()
            const billingType =
                updates.billingType || currentPlan?.billingType || "monthly"

            await PricingPlan.updateMany(
                { billingType, _id: { $ne: id } },
                { highlighted: false }
            )
        }

        const plan = await PricingPlan.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        })

        if (!plan) {
            return NextResponse.json({ error: "Plan not found" }, { status: 404 })
        }

        return NextResponse.json(plan)
    } catch (error) {
        console.error("PUT /api/pricing/[id]:", error)
        return NextResponse.json(
            { error: "Failed to update pricing plan" },
            { status: 500 }
        )
    }
}

export async function DELETE(_request, { params }) {
    try {
        await connectDB()
        const { id } = await params

        if (!isValidId(id)) {
            return NextResponse.json({ error: "Invalid id" }, { status: 400 })
        }

        const plan = await PricingPlan.findByIdAndDelete(id)
        if (!plan) {
            return NextResponse.json({ error: "Plan not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("DELETE /api/pricing/[id]:", error)
        return NextResponse.json(
            { error: "Failed to delete pricing plan" },
            { status: 500 }
        )
    }
}
