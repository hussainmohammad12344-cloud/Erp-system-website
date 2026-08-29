"use client"

import { useSyncExternalStore } from "react"
import { Button } from "antd"
import { MoonOutlined, SunOutlined } from "@ant-design/icons"
import { useTheme } from "next-themes"

const emptySubscribe = () => () => {}

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()

    // Avoid sun/moon mismatch between SSR HTML and client theme
    const hasHydrated = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    )

    const isDark = hasHydrated && resolvedTheme === "dark"

    return (
        <Button
            type="text"
            shape="circle"
            icon={isDark ? <SunOutlined /> : <MoonOutlined />}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "حالت روشن" : "حالت تاریک"}
        />
    )
}
