import Image from "next/image"
import Link from "next/link"

export default function Logo() {
    return (
        <Link
            href="/"
            className="flex items-center shrink-0"
        >
            <Image
                src="/logo.svg"
                alt="Logo"
                width={42}
                height={42}
                priority
                className={"dark:hidden"}
            />
            <Image
                src="/white-logo.svg"
                alt="Logo"
                width={42}
                height={42}
                className={"hidden dark:block"}
                priority
            />
            <div className={"flex flex-col scale-90"}>
                <span className={"text-sm font-black"}>سیستم حسابداری فلش</span>
                <span className={"text-xs"}>Flash Accounting System</span>
            </div>
        </Link>
    )
}