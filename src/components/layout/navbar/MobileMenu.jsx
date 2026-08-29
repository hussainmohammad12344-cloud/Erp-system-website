"use client"

import { useState } from "react"

import Link from "next/link"

import {
    Button,
    Drawer,
} from "antd"

import {
    MenuOutlined,
} from "@ant-design/icons"

import { navigation } from "@/constants"

export default function MobileMenu() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button
                type="text"
                icon={<MenuOutlined />}
                size="large"
                onClick={() => setOpen(true)}
            />

            <Drawer
                title="Menu"
                placement="right"
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className="flex flex-col gap-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-3 text-base transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="mt-6 flex flex-col gap-3">
                        <Button block>
                            Sign In
                        </Button>

                        <Button
                            block
                            type="primary"
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            </Drawer>
        </>
    )
}