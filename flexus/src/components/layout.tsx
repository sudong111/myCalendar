import { ReactNode } from 'react';
import Header from "./header"
import Footer from "./footer"
import SideBar from "./side-menu"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Header />

            <main className="flex">
                <SideBar />
                {children}
            </main>

            <Footer />
        </div>
    )
}