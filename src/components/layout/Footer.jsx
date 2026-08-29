import Link from "next/link"
import { navigation } from "@/constants"

const FOOTER_LINKS = [
    {
        title: "محصول",
        links: [
            { label: "امکانات", href: "/#features" },
            { label: "قیمت‌ها", href: "/pricing" },
            { label: "محصولات", href: "/products" },
        ],
    },
    {
        title: "شرکت",
        links: [
            { label: "درباره ما", href: "/about" },
            { label: "بلاگ", href: "/blog" },
            { label: "تماس با ما", href: "/contact" },
        ],
    },
    {
        title: "پشتیبانی",
        links: [
            { label: "راهنما", href: "/help" },
            { label: "سوالات متداول", href: "/#faq" },
            { label: "حریم خصوصی", href: "/privacy" },
        ],
    },
]

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background-secondary">
            <div className="container mx-auto px-6 py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block">
                            <span className="text-lg font-black text-foreground">
                                سیستم حسابداری فلش
                            </span>
                            <span className="mt-1 block text-xs text-foreground-muted">
                                Flash Accounting System
                            </span>
                        </Link>
                        <p className="mt-5 max-w-sm text-sm leading-7 text-foreground-muted">
                            نرم‌افزار یکپارچه مدیریت فروش، انبار، حسابداری و گزارش‌گیری
                            برای فروشگاه‌ها، کارخانه‌ها و کسب‌وکارهای در حال رشد.
                        </p>
                    </div>

                    {FOOTER_LINKS.map((group) => (
                        <div key={group.title}>
                            <h3 className="mb-4 text-sm font-bold text-foreground">
                                {group.title}
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-foreground-muted transition-colors hover:text-primary"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
                    <p className="text-sm text-foreground-muted">
                        © {new Date().getFullYear()} سیستم حسابداری فلش. تمامی حقوق محفوظ است.
                    </p>
                    <nav className="flex flex-wrap gap-6">
                        {navigation.slice(0, 4).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm text-foreground-muted transition-colors hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    )
}
