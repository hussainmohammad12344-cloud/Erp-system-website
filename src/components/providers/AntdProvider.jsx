"use client"

import { ConfigProvider, theme } from "antd"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Registry } from "@ant-design/nextjs-registry"

export default function AntdProvider({ children }) {
    const { resolvedTheme } = useTheme()
    const [primary, setPrimary] = useState(undefined)

    useEffect(() => {
        const val = getComputedStyle(document.documentElement).getPropertyValue('--primary') || ''
        setPrimary(val.trim() || undefined)
    }, [])
n    const antdTheme = {
        algorithm:
            resolvedTheme === "dark"
                ? theme.darkAlgorithm
                : theme.defaultAlgorithm,
        ...(primary ? { token: { colorPrimary: primary } } : {}),
    }

    return (
        <Registry>
            <ConfigProvider
                theme={antdTheme}
            >
                {children}
            </ConfigProvider>
        </Registry>
    )
}