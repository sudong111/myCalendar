import { ReactNode } from 'react';
import Header from "./header"
import Footer from "./footer"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Header />

            <main className="flex">
                {children}
            </main>

            <Footer />
        </div>
    )
}