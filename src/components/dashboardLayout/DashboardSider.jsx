"use client"

import Link from "next/link"
import Image from "next/image"
import { Layout, Menu } from "antd"
import { usePathname } from "next/navigation"
import { dashboardSidebarLinks, dashboardSidebarSections } from "@/constants"

const { Sider } = Layout

function getSelectedKey(pathname) {
    const exact = dashboardSidebarLinks.find((link) => link.href === pathname)
    if (exact) return exact.href

    const nested = dashboardSidebarLinks
        .filter((link) => link.href !== "/dashboard")
        .filter((link) => pathname.startsWith(`${link.href}/`))
        .sort((a, b) => b.href.length - a.href.length)

    return nested[0]?.href ?? null
}

function getOpenKeys(pathname) {
    return dashboardSidebarSections
        .filter((section) =>
            section.items.some(
                (item) =>
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                        pathname.startsWith(item.href))
            )
        )
        .map((section) => `group-${section.key}`)
}

export default function DashboardSider({ siderCollapsed }) {
    const pathname = usePathname()
    const selectedKey = getSelectedKey(pathname)

    const items = dashboardSidebarSections.map((section) => {
        const children = section.items.map((link) => ({
            key: link.href,
            icon: <link.Icon className="text-base" />,
            label: <Link href={link.href}>{link.label}</Link>,
        }))

        if (!section.label) {
            return children[0]
        }

        return {
            type: "group",
            key: `group-${section.key}`,
            label: siderCollapsed ? null : (
                <span className="text-[11px] font-semibold tracking-wide text-foreground-muted">
                    {section.label}
                </span>
            ),
            children,
        }
    })

    return (
        <Sider
            width={260}
            collapsedWidth={80}
            collapsed={siderCollapsed}
            trigger={null}
            className="!bg-transparent"
            style={{
                height: "100vh",
                position: "sticky",
                top: 0,
                overflowY: "auto",
            }}
        >
            <Link
                href="/"
                className={`sticky top-0 z-10 flex items-center gap-2 border-border bg-background p-4 ${
                    siderCollapsed ? "justify-center" : ""
                }`}
            >
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={42}
                    height={42}
                    priority
                    className="dark:hidden"
                />
                <Image
                    src="/white-logo.svg"
                    alt="Logo"
                    width={42}
                    height={42}
                    className="hidden dark:block"
                    priority
                />
                {!siderCollapsed && (
                    <div className="flex flex-col justify-center">
                        <span className="text-base font-bold text-foreground">
                            پنل مدیریت
                        </span>
                        <span className="text-[11px] text-foreground-muted">
                            سیستم حسابداری فلش
                        </span>
                    </div>
                )}
            </Link>

            <div className="px-2 py-3">
                <Menu
                    mode="inline"
                    selectable
                    selectedKeys={selectedKey ? [selectedKey] : []}
                    defaultOpenKeys={getOpenKeys(pathname)}
                    items={items}
                    className="dashboard-sider-menu !border-none !bg-transparent"
                />
            </div>
        </Sider>
    )
}
