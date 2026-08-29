"use client"

import { ArrowLeftOutlined } from "@ant-design/icons"
import { getFeatureIcon } from "@/lib/featureIcons"

export default function FeaturesSection({ features = [] }) {
    return (
        <section id="features" className="container mx-auto px-6 py-32">
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
                {features.map((feature) => (
                    <div
                        key={feature._id}
                        className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-primary-accent border border-primary-accent"
                    >
                        <div className="relative z-10">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                {getFeatureIcon(feature.icon)}
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-2">
                                {feature.title}
                            </h3>
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
    )
}
