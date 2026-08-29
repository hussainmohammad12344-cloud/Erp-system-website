"use client"

import { useEffect, useState } from "react"
import {
    App,
    Table,
    Tag,
} from "antd"

const STATUS_LABELS = {
    new: { label: "جدید", color: "blue" },
    answered: { label: "پاسخ‌داده‌شده", color: "green" },
    archived: { label: "بایگانی", color: "default" },
}

export default function FaqQuestionsDashboardPage() {
    const { message } = App.useApp()
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    async function loadQuestions() {
        setLoading(true)
        try {
            const res = await fetch("/api/faq-questions")
            if (!res.ok) throw new Error("Failed to load")
            const data = await res.json()
            setQuestions(data)
        } catch {
            message.error("بارگذاری سوالات ناموفق بود")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadQuestions()
    }, [])

    const columns = [
        {
            title: "نام",
            dataIndex: "name",
            width: 140,
        },
        {
            title: "ایمیل",
            dataIndex: "email",
            width: 200,
        },
        {
            title: "سوال",
            dataIndex: "question",
            ellipsis: true,
        },
        {
            title: "وضعیت",
            dataIndex: "status",
            width: 140,
            render: (status) => {
                const meta = STATUS_LABELS[status] || STATUS_LABELS.new
                return <Tag color={meta.color}>{meta.label}</Tag>
            },
        },
        {
            title: "تاریخ",
            dataIndex: "createdAt",
            width: 160,
            render: (value) =>
                value
                    ? new Date(value).toLocaleDateString("fa-IR")
                    : "—",
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-foreground">
                    سوالات کاربران
                </h1>
                <p className="mt-1 text-foreground-muted">
                    سوال‌هایی که از فرم صفحه اصلی ارسال شده‌اند
                </p>
            </div>

            <Table
                rowKey="_id"
                loading={loading}
                columns={columns}
                dataSource={questions}
                pagination={{ pageSize: 10 }}
            />
        </div>
    )
}
