"use client"

import { useSyncExternalStore } from "react"
import { App, ConfigProvider, theme } from "antd"
import { useTheme } from "next-themes"

const emptySubscribe = () => () => {}

export default function AntdProvider({ children }) {
    const { resolvedTheme } = useTheme()

    // false during SSR + hydration, true after — avoids theme mismatch without setState-in-effect
    const hasHydrated = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    )

    const isDark = hasHydrated && resolvedTheme === "dark"
    const primaryColor = isDark ? "#0fb3f3" : "#034aa6"

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
                token: {
                    colorPrimary: primaryColor,
                    colorBgBase: isDark ? "#020817" : "#ffffff",
                    colorBgContainer: isDark ? "#020817" : "#ffffff",
                    colorBgElevated: isDark ? "#020817" : "#ffffff",
                    colorBgLayout: isDark ? "#020817" : "#ffffff",
                    colorTextBase: isDark ? "#f8fafc" : "#0f172a",
                    colorBorder: isDark ? "#334155" : "#e2e8f0",
                    fontFamily: "Rubik, sans-serif",
                },
                components: {
                    Menu: {
                        colorBgContainer: "transparent",
                        border: "none",
                        borderInlineEnd: "none",
                        itemBorderRadius: 10,
                        itemMarginInline: 4,
                        itemMarginBlock: 2,
                        groupTitleColor: "var(--foreground-muted)",
                        groupTitleFontSize: 11,
                    },
                },
            }}
        >
            <App>{children}</App>
        </ConfigProvider>
    )
}
