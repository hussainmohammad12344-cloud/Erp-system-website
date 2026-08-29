const TESTIMONIALS = [
    {
        quote:
            "از وقتی فلش را آوردیم، موجودی انبار و فاکتورها دیگر پراکنده نیست. گزارش فروش را همان روز می‌بینیم.",
        name: "مریم رضایی",
        role: "مدیر فروشگاه پوشاک",
    },
    {
        quote:
            "حسابداری و انبار در یک سیستم یعنی کمتر خطا و کمتر رفت‌وبرگشت بین نرم‌افزارها. تیم ما سریع عادت کرد.",
        name: "علی محمدی",
        role: "مدیر مالی کارخانه",
    },
    {
        quote:
            "راه‌اندازی ساده بود و پشتیبانی پاسخگو. برای چند شعبه هم بدون پیچیدگی کار می‌کند.",
        name: "سارا احمدی",
        role: "مالک زنجیره خرده‌فروشی",
    },
]

export default function TestimonialsSection() {
    return (
        <section className="relative overflow-hidden bg-background-secondary py-32">
            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary-accent/15 blur-[100px]" />

            <div className="container relative mx-auto px-6">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h2 className="text-4xl font-bold text-foreground">
                        کسب‌وکارهایی که به فلش اعتماد کرده‌اند
                    </h2>
                    <p className="mt-5 leading-8 text-foreground-muted">
                        تجربه واقعی مدیران فروشگاه، کارخانه و مجموعه‌های در حال رشد.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {TESTIMONIALS.map((item) => (
                        <blockquote
                            key={item.name}
                            className="flex flex-col rounded-2xl border border-border bg-background p-8"
                        >
                            <p className="flex-1 text-base leading-8 text-foreground-secondary">
                                «{item.quote}»
                            </p>
                            <footer className="mt-8 border-t border-border pt-5">
                                <cite className="not-italic">
                                    <span className="block font-bold text-foreground">
                                        {item.name}
                                    </span>
                                    <span className="mt-1 block text-sm text-foreground-muted">
                                        {item.role}
                                    </span>
                                </cite>
                            </footer>
                        </blockquote>
                    ))}
                </div>
            </div>
        </section>
    )
}
