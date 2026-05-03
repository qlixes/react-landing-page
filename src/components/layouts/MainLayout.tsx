import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

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
            <Footer />
        </div>
    );
}
