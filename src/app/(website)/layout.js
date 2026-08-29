import "../globals.css";
import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({children}) {
    return (
        <div className={"min-h-screen bg-background"}>
            <div className={"sticky top-0 z-100"}>
                <Navbar/>
            </div>
            {children}
            <Footer />
        </div>
    );
}
