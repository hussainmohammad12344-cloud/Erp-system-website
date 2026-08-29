import {
    MdDashboardCustomize,
    MdPeople,
    MdOutlineWidgets,
    MdOutlineQuestionAnswer,
    MdOutlinePayments,
    MdOutlineArticle,
    MdOutlineCategory,
    MdOutlinePeopleAlt,
    MdOutlineHandshake,
    MdOutlineBadge,
    MdOutlineSettings,
    MdOutlineMarkEmailUnread,
} from "react-icons/md"
import { BsFillPersonCheckFill } from "react-icons/bs"

export const navigation = [
    {
        label: "صفحه اصلی",
        href: "/",
    },
    {
        label: "محصولات",
        href: "/products",
    },
    {
        label: "قیمت ها",
        href: "/pricing",
    },
    {
        label: "بلاگ",
        href: "/blog",
    },
    {
        label: "درباره ما",
        href: "/about",
    },
]

export const dashboardSidebarSections = [
    {
        key: "overview",
        label: null,
        items: [
            {
                label: "نمای کلی",
                href: "/dashboard",
                Icon: MdDashboardCustomize,
            },
        ],
    },
    {
        key: "homepage",
        label: "صفحه اصلی سایت",
        items: [
            {
                label: "امکانات",
                href: "/dashboard/features",
                Icon: MdOutlineWidgets,
            },
            {
                label: "تعرفه‌ها",
                href: "/dashboard/pricing",
                Icon: MdOutlinePayments,
            },
            {
                label: "سوالات متداول",
                href: "/dashboard/faqs",
                Icon: MdOutlineQuestionAnswer,
            },
            {
                label: "سوالات کاربران",
                href: "/dashboard/faq-questions",
                Icon: MdOutlineMarkEmailUnread,
            },
        ],
    },
    {
        key: "blog",
        label: "وبلاگ",
        items: [
            {
                label: "مقالات",
                href: "/dashboard/blog/posts",
                Icon: MdOutlineArticle,
            },
            {
                label: "دسته‌بندی‌ها",
                href: "/dashboard/blog/categories",
                Icon: MdOutlineCategory,
            },
        ],
    },
    {
        key: "company",
        label: "مدیریت شرکت",
        items: [
            {
                label: "مشتریان",
                href: "/dashboard/customers",
                Icon: MdOutlinePeopleAlt,
            },
            {
                label: "نمایندگان",
                href: "/dashboard/representatives",
                Icon: MdOutlineHandshake,
            },
            {
                label: "اعضا",
                href: "/dashboard/members",
                Icon: MdPeople,
            },
            {
                label: "تیم",
                href: "/dashboard/team",
                Icon: MdOutlineBadge,
            },
        ],
    },
    {
        key: "system",
        label: "سیستم",
        items: [
            {
                label: "کاربران",
                href: "/dashboard/users",
                Icon: BsFillPersonCheckFill,
            },
            {
                label: "تنظیمات",
                href: "/dashboard/settings",
                Icon: MdOutlineSettings,
            },
        ],
    },
]

/** Flat list of all sidebar links (for matching active route, etc.) */
export const dashboardSidebarLinks = dashboardSidebarSections.flatMap(
    (section) => section.items
)
