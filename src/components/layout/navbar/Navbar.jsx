import Logo from "./Logo"
import DesktopMenu from "./DesktopMenu"
import MobileMenu from "./MobileMenu"
import ActionButtons from "./ActionButtons"

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-blue-50 dark:border-blue-950 backdrop-blur-lg">
            <div className="mx-auto flex h-18 container items-center justify-between px-6 lg:px-8">

                {/* Left */}
                <div className="flex lg:hidden">
                    <MobileMenu />
                </div>

                {/* Center */}
                <div className="flex items-center gap-10">
                    <Logo />
                    <div className="hidden lg:block">
                        <DesktopMenu />
                    </div>
                </div>

                {/* Right */}
                <div className="hidden lg:flex items-center gap-2">
                    <ActionButtons />
                </div>

            </div>
        </header>
    )
}