"use client"

import dynamic from "next/dynamic"
import {BellOutlined} from "@ant-design/icons"
import {Button} from "antd"
import Link from "next/link";

const ThemeToggle = dynamic(
    () => import("./ThemeToggle"),
    {
        ssr: false,
    }
)

export default function ActionButtons() {
    return (
        <div className="flex items-center gap-2">
            <Button
                type="text"
                shape="circle"
                icon={<BellOutlined/>}
            />

            <ThemeToggle/>

            <Button type="text">
                ایجاد حساب
            </Button>

            <Link href={"/dashboard"}>
                <Button type={"primary"}>
                    ورود به حساب
                </Button>
            </Link>
        </div>
    )
}