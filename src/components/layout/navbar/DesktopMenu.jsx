"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"

import {navigation} from "@/constants"

export default function DesktopMenu() {
    const pathname = usePathname()

    return (
        <ul className="flex items-center gap-2">
            {navigation.map((item) => {
                const active = pathname === item.href

                return (
                    <li key={item.label}>
                        <Link
                            href={item.href}
                            className={`
                flex
                h-10
                items-center
                rounded-xl
                px-4
                text-sm
                font-medium
                transition-all
                duration-200
                ${
                                active
                                    ? "bg-primary text-white"
                                    : "text-neutral-600 hover:bg-neutral-100 hover:text-black dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                            }
              `}
                        >
                            {item.label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}