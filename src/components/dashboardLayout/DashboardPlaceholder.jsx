export default function DashboardPlaceholder({ title, description }) {
    return (
        <div className="space-y-3">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="max-w-xl text-foreground-muted leading-7">
                {description ||
                    "این بخش به‌زودی تکمیل می‌شود و از اینجا قابل مدیریت خواهد بود."}
            </p>
        </div>
    )
}
