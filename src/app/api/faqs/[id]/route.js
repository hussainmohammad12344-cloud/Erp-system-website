import { NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/lib/mongodb"
import Faq from "@/models/Faq"

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

        const faq = await Faq.findById(id).lean()
        if (!faq) {
            return NextResponse.json({ error: "Faq not found" }, { status: 404 })
        }

        return NextResponse.json(faq)
    } catch (error) {
        console.error("GET /api/faqs/[id]:", error)
        return NextResponse.json(
            { error: "Failed to fetch faq" },
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

        if (body.question !== undefined) updates.question = String(body.question).trim()
        if (body.answer !== undefined) updates.answer = String(body.answer).trim()
        if (body.order !== undefined) updates.order = Number(body.order) || 0
        if (body.isActive !== undefined) updates.isActive = Boolean(body.isActive)

        if (updates.question === "" || updates.answer === "") {
            return NextResponse.json(
                { error: "question and answer cannot be empty" },
                { status: 400 }
            )
        }

        const faq = await Faq.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        })

        if (!faq) {
            return NextResponse.json({ error: "Faq not found" }, { status: 404 })
        }

        return NextResponse.json(faq)
    } catch (error) {
        console.error("PUT /api/faqs/[id]:", error)
        return NextResponse.json(
            { error: "Failed to update faq" },
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

        const faq = await Faq.findByIdAndDelete(id)
        if (!faq) {
            return NextResponse.json({ error: "Faq not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("DELETE /api/faqs/[id]:", error)
        return NextResponse.json(
            { error: "Failed to delete faq" },
            { status: 500 }
        )
    }
}
