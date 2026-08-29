import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Faq from "@/models/Faq"
import { DEFAULT_FAQS } from "@/constants/contentDefaults"

export async function GET(request) {
    try {
        await connectDB()

        const { searchParams } = new URL(request.url)
        const all = searchParams.get("all") === "true"

        const count = await Faq.countDocuments()
        if (count === 0) {
            await Faq.insertMany(DEFAULT_FAQS)
        }

        const filter = all ? {} : { isActive: true }
        const faqs = await Faq.find(filter).sort({ order: 1, createdAt: 1 }).lean()

        return NextResponse.json(faqs)
    } catch (error) {
        console.error("GET /api/faqs:", error)
        return NextResponse.json(
            { error: "Failed to fetch faqs" },
            { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json()

        const { question, answer, order = 0, isActive = true } = body

        if (!question?.trim() || !answer?.trim()) {
            return NextResponse.json(
                { error: "question and answer are required" },
                { status: 400 }
            )
        }

        const faq = await Faq.create({
            question: question.trim(),
            answer: answer.trim(),
            order: Number(order) || 0,
            isActive: Boolean(isActive),
        })

        return NextResponse.json(faq, { status: 201 })
    } catch (error) {
        console.error("POST /api/faqs:", error)
        return NextResponse.json(
            { error: "Failed to create faq" },
            { status: 500 }
        )
    }
}
