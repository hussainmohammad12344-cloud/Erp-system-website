import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Feature from "@/models/Feature"
import { DEFAULT_FEATURES } from "@/constants/featureIcons"

export async function GET(request) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const all = searchParams.get("all") === "true"

        let count = await Feature.countDocuments()
        if (count === 0) {
            await Feature.insertMany(DEFAULT_FEATURES)
        }

        const filter = all ? {} : { isActive: true }
        const features = await Feature.find(filter).sort({ order: 1, createdAt: 1 }).lean()

        return NextResponse.json(features)
    } catch (error) {
        console.error("GET /api/features:", error)
        return NextResponse.json(
            { error: "Failed to fetch features" },
            { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json()

        const { title, description, icon, order = 0, isActive = true } = body

        if (!title?.trim() || !description?.trim() || !icon?.trim()) {
            return NextResponse.json(
                { error: "title, description, and icon are required" },
                { status: 400 }
            )
        }

        const feature = await Feature.create({
            title: title.trim(),
            description: description.trim(),
            icon: icon.trim(),
            order: Number(order) || 0,
            isActive: Boolean(isActive),
        })

        return NextResponse.json(feature, { status: 201 })
    } catch (error) {
        console.error("POST /api/features:", error)
        return NextResponse.json(
            { error: "Failed to create feature" },
            { status: 500 }
        )
    }
}
