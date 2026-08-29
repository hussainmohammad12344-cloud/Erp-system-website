"use client"

import {
    RocketOutlined,
    SettingOutlined,
    RiseOutlined,
} from "@ant-design/icons"
import { FaChalkboardTeacher } from "react-icons/fa";

const STEPS = [
    {
        icon: <RocketOutlined className="text-2xl" />,
        title: "راه اندازی سریع",
        description:
            "تیم ما در کمترین زمان ممکن سیستم را برایتان راه اندازی و آماده میسازد.",
    },
    {
        icon: <FaChalkboardTeacher className="text-2xl" />,
        title: "آموزش کامل",
        description:
            "تیم پشتیبانی ما سیستم را با تمامی جزئیات آن به شما آموزش میدهد.",
    },
    {
        icon: <RiseOutlined className="text-2xl" />,
        title: "شروع به کار",
        description:
            "از سیستم برای مدیریت کامل امور کسب و کار تان بهره بگیرید.",
    },
]

export default function HowItWorksSection() {
    return (
        <section className="relative overflow-hidden bg-background-secondary py-32">
            <div className="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

            <div className="container relative mx-auto px-6">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h2 className="text-4xl font-bold text-foreground">
                        در سه گام شروع کنید
                    </h2>
                    <p className="mt-5 leading-8 text-foreground-muted">
                        از فعالسازی سیستم تا مدیریت روزمره کسب‌وکار، مسیر ساده‌ای پیش روی شماست.
                    </p>
                </div>

                <div className="grid gap-10 md:grid-cols-3">
                    {STEPS.map((step, index) => (
                        <div key={step.title} className="relative text-center">
                            {index < STEPS.length - 1 && (
                                <div className="pointer-events-none absolute top-8 left-0 hidden h-px w-full bg-gradient-to-l from-transparent via-border to-transparent md:block" />
                            )}

                            <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                {step.icon}
                                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                                    {index + 1}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-foreground">
                                {step.title}
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-foreground-muted">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
