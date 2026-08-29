import { NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/lib/mongodb"
import Feature from "@/models/Feature"

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id)
}

export async function GET(_request, { params }) {
    try {
        await connectDB()
        const { id } = await params

        if (!isValidId(id)) {
            return NextResponse.json({ error: "Invalid id" }, { status: 400 })
        }

        const feature = await Feature.findById(id).lean()
        if (!feature) {
            return NextResponse.json({ error: "Feature not found" }, { status: 404 })
        }

        return NextResponse.json(feature)
    } catch (error) {
        console.error("GET /api/features/[id]:", error)
        return NextResponse.json(
            { error: "Failed to fetch feature" },
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

        if (body.title !== undefined) updates.title = String(body.title).trim()
        if (body.description !== undefined) updates.description = String(body.description).trim()
        if (body.icon !== undefined) updates.icon = String(body.icon).trim()
        if (body.order !== undefined) updates.order = Number(body.order) || 0
        if (body.isActive !== undefined) updates.isActive = Boolean(body.isActive)

        if (updates.title === "" || updates.description === "" || updates.icon === "") {
            return NextResponse.json(
                { error: "title, description, and icon cannot be empty" },
                { status: 400 }
            )
        }

        const feature = await Feature.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        })

        if (!feature) {
            return NextResponse.json({ error: "Feature not found" }, { status: 404 })
        }

        return NextResponse.json(feature)
    } catch (error) {
        console.error("PUT /api/features/[id]:", error)
        return NextResponse.json(
            { error: "Failed to update feature" },
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

        const feature = await Feature.findByIdAndDelete(id)
        if (!feature) {
            return NextResponse.json({ error: "Feature not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("DELETE /api/features/[id]:", error)
        return NextResponse.json(
            { error: "Failed to delete feature" },
            { status: 500 }
        )
    }
}
