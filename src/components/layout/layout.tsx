import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex flex-1">
                <div className="w-full">
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    );
};