"use client"

import { Button, Layout } from "antd"
import {
    BellOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons"
import ThemeToggle from "@/components/layout/navbar/ThemeToggle"

const { Header } = Layout

export default function DashboardHeader({ siderCollapsed, setSiderCollapsed }) {
    return (
        <Header
            className="!bg-background"
            style={{
                padding: "0 20px 0 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 6,
                position: "sticky",
                top: 0,
                zIndex: 10,
                background: "transparent",
            }}
        >
            <Button
                style={{
                    fontSize: "18px",
                    width: 40,
                    height: 40,
                }}
                type="text"
                icon={
                    siderCollapsed ? (
                        <MenuFoldOutlined />
                    ) : (
                        <MenuUnfoldOutlined />
                    )
                }
                onClick={() => setSiderCollapsed((prev) => !prev)}
            />

            <div className="flex items-center gap-2">
                <Button type="text" shape="circle" icon={<BellOutlined />} />
                <ThemeToggle />
            </div>
        </Header>
    )
}
