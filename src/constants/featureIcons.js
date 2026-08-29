export const FEATURE_ICON_OPTIONS = [
    { value: "WalletOutlined", label: "کیف پول / حسابداری" },
    { value: "ShoppingCartOutlined", label: "سبد خرید / فروش" },
    { value: "StockOutlined", label: "انبار" },
    { value: "FileTextOutlined", label: "گزارش" },
    { value: "ShopOutlined", label: "فروشگاه" },
    { value: "BarChartOutlined", label: "نمودار" },
    { value: "TeamOutlined", label: "تیم" },
    { value: "SettingOutlined", label: "تنظیمات" },
    { value: "CloudOutlined", label: "ابری" },
    { value: "SafetyOutlined", label: "امنیت" },
]

export const DEFAULT_FEATURES = [
    {
        title: "حسابداری",
        description:
            "مدیریت درآمد، هزینه، سود و زیان، صندوق، بانک و تمامی اسناد مالی.",
        icon: "WalletOutlined",
        order: 1,
        isActive: true,
    },
    {
        title: "فروش",
        description: "ثبت سریع فاکتور، چاپ رسید و مدیریت سفارش‌ها.",
        icon: "ShoppingCartOutlined",
        order: 2,
        isActive: true,
    },
    {
        title: "انبارداری",
        description: "مدیریت موجودی کالا، ورود و خروج، انبار گردانی و هشدارها.",
        icon: "StockOutlined",
        order: 3,
        isActive: true,
    },
    {
        title: "گزارش‌گیری",
        description: "گزارش‌های مالی، فروش، موجودی و تحلیل داده‌ها.",
        icon: "FileTextOutlined",
        order: 4,
        isActive: true,
    },
]
