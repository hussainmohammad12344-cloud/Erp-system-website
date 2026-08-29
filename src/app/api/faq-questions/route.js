import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import FaqQuestion from "@/models/FaqQuestion"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function GET() {
    try {
        await connectDB()
        const questions = await FaqQuestion.find()
            .sort({ createdAt: -1 })
            .lean()
        return NextResponse.json(questions)
    } catch (error) {
        console.error("GET /api/faq-questions:", error)
        return NextResponse.json(
            { error: "Failed to fetch questions" },
            { status: 500 }
        )
    }
}

export async function POST(request) {
    try {
        await connectDB()
        const body = await request.json()

        const name = String(body.name || "").trim()
        const email = String(body.email || "").trim().toLowerCase()
        const question = String(body.question || "").trim()

        if (!name || !email || !question) {
            return NextResponse.json(
                { error: "name, email, and question are required" },
                { status: 400 }
            )
        }

        if (!EMAIL_RE.test(email)) {
            return NextResponse.json(
                { error: "Invalid email" },
                { status: 400 }
            )
        }

        if (question.length < 10) {
            return NextResponse.json(
                { error: "Question is too short" },
                { status: 400 }
            )
        }

        const entry = await FaqQuestion.create({ name, email, question })
        return NextResponse.json(entry, { status: 201 })
    } catch (error) {
        console.error("POST /api/faq-questions:", error)
        return NextResponse.json(
            { error: "Failed to submit question" },
            { status: 500 }
        )
    }
}
