import React from 'react';
import Navbar from '@/components/common/Navbar';

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="relative min-h-screen bg-white">
            <Navbar />

            <main>
                {children}
            </main>

            {/* Anda bisa menambahkan Footer di sini nanti */}
            <footer className="bg-gray-50 py-8 border-t border-gray-100">

            </footer>
        </div>
    );
}
