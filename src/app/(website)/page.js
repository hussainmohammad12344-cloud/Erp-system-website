"use client";

import { useEffect, useState } from "react";
import {
    ArrowLeftOutlined,
    CheckCircleFilled,
    ShopOutlined,
    WalletOutlined,
    ShoppingCartOutlined,
    StockOutlined,
    FileTextOutlined,
} from "@ant-design/icons";
import {Button} from "antd";

export default function Home() {
    const words = ["حسابداری", "انبارداری", "فروشگاه", "کارخانه تولیدی"];

    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [deleteMode, setDeleteMode] = useState(false);

    // Typewriter effect
    useEffect(() => {
        const current = words[index];

        const timer = setTimeout(() => {
            if (!deleteMode) {
                setText(current.substring(0, text.length + 1));

                if (text === current) {
                    setTimeout(() => setDeleteMode(true), 1200);
                }
            } else {
                setText(current.substring(0, text.length - 1));

                if (text === "") {
                    setDeleteMode(false);
                    setIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, deleteMode ? 70 : 120);

        return () => clearTimeout(timer);
    }, [text, deleteMode]);

    // Feature cards data
    const features = [
        {
            icon: <WalletOutlined className="text-2xl" />,
            title: "حسابداری",
            description:
                "مدیریت درآمد، هزینه، سود و زیان، صندوق، بانک و تمامی اسناد مالی.",
            gradient: "from-blue-500 via-blue-400 to-blue-600",
        },
        {
            icon: <ShoppingCartOutlined className="text-2xl" />,
            title: "فروش",
            description: "ثبت سریع فاکتور، چاپ رسید و مدیریت سفارش‌ها.",
            gradient: "from-emerald-500 via-emerald-400 to-emerald-600",
        },
        {
            icon: <StockOutlined className="text-2xl" />,
            title: "انبارداری",
            description: "مدیریت موجودی کالا، ورود و خروج، انبار گردانی و هشدارها.",
            gradient: "from-purple-500 via-purple-400 to-purple-600",
        },
        {
            icon: <FileTextOutlined className="text-2xl" />,
            title: "گزارش‌گیری",
            description: "گزارش‌های مالی، فروش، موجودی و تحلیل داده‌ها.",
            gradient: "from-rose-500 via-rose-400 to-rose-600",
        },
    ];

    return (
        <main>
            {/* ===== HERO SECTION ===== */}
            <section className="relative overflow-hidden flex items-center pt-20 lg:pt-30">
                <div className="absolute -top-40 -left-40 w-125 h-125 bg-primary/20 rounded-full blur-[120px]" />

                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    {/* Hero Content */}
                    <div className="order-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
                            <CheckCircleFilled />
                            راهکار هوشمند مدیریت کسب‌وکار
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                            <span>نرم افزار جامع برای</span>
                            <span className="block mt-5">
                مدیریت
                <span className="text-primary"> {text}</span>

              </span>
                        </h1>

                        <p className="mt-6 text-lg text-foreground-muted leading-8 max-w-xl">
                            فروش، موجودی کالا، حسابداری و گزارش‌ها را در یک سیستم یکپارچه مدیریت
                            کنید و تصمیم‌های بهتر برای رشد کسب‌وکار خود بگیرید.
                        </p>

                        <div className="flex gap-4 mt-8">
                            <Button type={"primary"} size={"large"}>
                                شروع کنید
                                <ArrowLeftOutlined />
                            </Button>
                            <Button size={"large"}>
                                مشاهده دمو
                            </Button>
                        </div>

                        <div className="flex gap-10 mt-12">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">500+</h3>
                                <p className="text-foreground-muted">کسب‌وکار</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">20+</h3>
                                <p className="text-foreground-muted">امکانات</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-foreground">24/7</h3>
                                <p className="text-foreground-muted">پشتیبانی</p>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="relative hidden lg:flex items-center justify-center">
                        <div className="absolute -top-6 -left-4 z-20 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-xl px-5 py-4">
                            <p className="text-xs text-foreground-muted">سفارش‌های امروز</p>
                            <h3 className="mt-1 text-2xl font-bold text-foreground">۱۲۸</h3>
                            <span className="text-xs text-success">+۱۸٪ نسبت به دیروز</span>
                        </div>

                        <div className="absolute -bottom-6 -right-5 z-20 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-xl px-5 py-4">
                            <p className="text-xs text-foreground-muted">موجودی کالا</p>
                            <h3 className="mt-1 text-2xl font-bold text-foreground">۹۲٪</h3>
                            <span className="text-xs text-primary">کاملاً پایدار</span>
                        </div>

                        <div className="w-full max-w-[620px] overflow-hidden rounded-[32px] border border-border bg-surface shadow-[0_40px_120px_rgba(15,23,42,.12)]">
                            <div className="flex items-center justify-between border-b border-border px-6 py-4">
                                <div className="flex gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-400" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                    <div className="h-3 w-3 rounded-full bg-green-400" />
                                </div>
                                <span className="text-sm font-medium text-foreground-secondary">
                  داشبورد مونو
                </span>
                            </div>

                            <div className="flex">
                                <div className="flex w-20 flex-col items-center gap-5 border-l border-border py-6">
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <div
                                            key={item}
                                            className={`h-11 w-11 rounded-xl ${
                                                item === 2 ? "bg-primary" : "bg-background-secondary"
                                            }`}
                                        />
                                    ))}
                                </div>

                                <div className="flex-1 p-6">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="rounded-2xl bg-background-secondary p-4">
                                            <p className="text-xs text-foreground-muted">فروش امروز</p>
                                            <h3 className="mt-2 text-xl font-bold text-foreground">۲۴۵K</h3>
                                        </div>
                                        <div className="rounded-2xl bg-background-secondary p-4">
                                            <p className="text-xs text-foreground-muted">مشتریان</p>
                                            <h3 className="mt-2 text-xl font-bold text-foreground">۳۴۲</h3>
                                        </div>
                                        <div className="rounded-2xl bg-background-secondary p-4">
                                            <p className="text-xs text-foreground-muted">سفارش‌ها</p>
                                            <h3 className="mt-2 text-xl font-bold text-foreground">۱۲۸</h3>
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-3xl border border-border p-5">
                                        <div className="mb-5 flex items-center justify-between">
                                            <span className="font-medium text-foreground">گزارش فروش</span>
                                            <span className="text-xs text-foreground-muted">
                        ۳۰ روز اخیر
                      </span>
                                        </div>
                                        <svg viewBox="0 0 500 180" className="w-full">
                                            <defs>
                                                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#2563eb" stopOpacity=".35" />
                                                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M0 145 C40 110 70 120 110 90 C150 60 190 80 230 70 C270 60 310 25 350 45 C390 65 430 40 500 20"
                                                fill="none"
                                                stroke="#2563eb"
                                                strokeWidth="5"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M0 180 L0 145 C40 110 70 120 110 90 C150 60 190 80 230 70 C270 60 310 25 350 45 C390 65 430 40 500 20 L500 180 Z"
                                                fill="url(#gradient)"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FEATURES SECTION ===== */}
            <section className="container mx-auto px-6 py-32">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h2 className="mt-5 text-4xl font-bold text-foreground">
                        مدیریت کامل کسب و کار شما
                    </h2>
                    <p className="mt-5 text-foreground-muted leading-8">
                        تمام بخش‌های مورد نیاز برای مدیریت فروش، حسابداری، موجودی اجناس،
                        مشتریان و گزارش‌های مالی در یک سیستم یکپارچه.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-primary-accent border border-primary-accent"
                        >
                            {/* Content */}
                            <div className="relative z-10">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    {feature.icon}
                                </div>

                                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                                <p className="text-sm leading-7 text-foreground-muted">
                                    {feature.description}
                                </p>

                                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary opacity-0 translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                    <span>مشاهده امکانات</span>
                                    <ArrowLeftOutlined className="text-xs" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}