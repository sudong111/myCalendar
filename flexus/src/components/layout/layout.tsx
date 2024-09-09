import React, { ReactNode } from 'react';
import Header from './header'
import Footer from './footer'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex flex-1">
                {children}
            </main>

            <Footer />
        </div>
    )
}