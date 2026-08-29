"use client"

import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button } from "antd"
import Link from "next/link"

export default function CtaSection() {
    return (
        <section className="container mx-auto px-6 py-32">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-white md:px-16">
                <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary-accent/30 blur-[80px]" />
                <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-white/10 blur-[60px]" />

                <div className="relative mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                        آماده‌اید کسب‌وکارتان را یکپارچه مدیریت کنید؟
                    </h2>
                    <p className="mt-5 text-base leading-8 text-white/80 md:text-lg">
                        همین امروز شروع کنید؛ فروش، انبار و حسابداری را در یک سیستم ببینید.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link href="/dashboard">
                            <Button
                                size="large"
                                className="!border-none !bg-white !text-primary hover:!bg-white/90"
                            >
                                شروع رایگان
                                <ArrowLeftOutlined />
                            </Button>
                        </Link>
                        <Button
                            size="large"
                            ghost
                            className="!border-white/40 !text-white hover:!border-white hover:!bg-white/10"
                        >
                            درخواست دمو
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
