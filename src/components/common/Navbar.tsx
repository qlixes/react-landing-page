import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';
import { Menu, ChevronDown } from 'lucide-react';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsLangOpen(false);
    };

    return (
        <>
            <nav className="fixed top-0 w-full bg-white border-b border-gray-400 z-50">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">

                    <a href="#home" className="flex items-center gap-3 h-14">
                        <img src={logo} alt="logo" className="h-full w-auto object-contain" />

                        <span className="font-cormorant font-bold tracking-wider leading-none flex items-baseline">
                            <span className="text-xl">
                                SUNSSE <span className="text-gold-primmary ml-1">BARU</span>
                            </span>

                            {/* INDONESIA dibuat lebih kecil dan diberi jarak kiri */}
                            <span className="text-xs ml-2 text-gray-500 font-light">
                                INDONESIA
                            </span>
                        </span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#home" className="hover:text-gold-primary hover:border-gold-secondary hover:border-b transition">{t('nav.home')}</a>
                        <a href="#about" className="hover:text-gold-primary hover:border-gold-secondary hover:border-b transition">{t('nav.about')}</a>
                        <a href="#product" className="hover:text-gold-primary hover:border-gold-secondary hover:border-b transition">{t('nav.product')}</a>
                        <a href="#service" className="hover:text-gold-primary hover:border-gold-secondary hover:border-b transition">{t('nav.service')}</a>
                        <a href="#market" className="hover:text-gold-primary hover:border-gold-secondary hover:border-b transition">{t('nav.market')}</a>
                        <a href="#contact" className="hover:text-gold-primary hover:border-gold-secondary hover:border-b transition">{t('nav.contact')}</a>
                    </div>

                    <div className="relative hidden md:block">
                        <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1 border px-3 py-1 rounded-md bg-black text-white">
                            {i18n.language.toUpperCase()}
                        </button>
                        {isLangOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white shadow-xl border rounded-md overflow-hidden">
                                <button onClick={() => changeLanguage('en')} className="w-full text-left px-4 py-2 hover:bg-gray-200 hover:border">EN</button>
                                <button onClick={() => changeLanguage('id')} className="w-full text-left px-4 py-2 hover:bg-gray-200 hover:border">ID</button>
                                <button onClick={() => changeLanguage('zh')} className="w-full text-left px-4 py-2 hover:bg-gray-200 hover:border">中文</button>
                            </div>
                        )}
                    </div>

                    {/* Manual Dropdown Bahasa */}
                    <div className="relative flex items-center gap-4">
                        {/* Tombol Bahasa Mobile (Muncul di sebelah Menu) */}
                        <div className="md:hidden relative">
                            <button onClick={() => setIsMobileLangOpen(!isMobileLangOpen)} className="flex items-center gap-1 text-sm font-medium">
                                {i18n.language.toUpperCase()}
                                <ChevronDown size={14} className={isMobileLangOpen ? 'rotate-180' : ''} />
                            </button>
                            {isMobileLangOpen && (
                                <div className="absolute right-0 mt-2 w-24 bg-white shadow-xl border rounded-md overflow-hidden z-[70]">
                                    <button onClick={() => { changeLanguage('en'); setIsMobileLangOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">EN</button>
                                    <button onClick={() => { changeLanguage('id'); setIsMobileLangOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">ID</button>
                                    <button onClick={() => { changeLanguage('zh'); setIsMobileLangOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">ZH</button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button className="md:hidden font-bold p-2" onClick={() => setIsSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>
            {/* Sidebar Mobile Implementation */}
            <div className={`fixed inset-0 z-[60] md:hidden ${isSidebarOpen ? 'visible' : 'invisible'}`}>
                {/* Overlay Background */}
                <div
                    className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsSidebarOpen(false)}
                />

                {/* Sidebar Panel */}
                <aside className={`absolute top-0 right-0 h-full w-[200px] bg-white shadow-2xl transition-transform duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                    {/* Navigasi Mobile (Tanpa Loop) */}
                    <div className="p-8 flex flex-col">
                        <a href="#home" onClick={() => setIsSidebarOpen(false)} className="text-sm font-bold uppercase tracking-widest py-4 border-b border-gray-100">{t('nav.home')}</a>
                        <a href="#about" onClick={() => setIsSidebarOpen(false)} className="text-sm font-bold uppercase tracking-widest py-4 border-b border-gray-100">{t('nav.about')}</a>
                        <a href="#product" onClick={() => setIsSidebarOpen(false)} className="text-sm font-bold uppercase tracking-widest py-4 border-b border-gray-100">{t('nav.product')}</a>
                        <a href="#service" onClick={() => setIsSidebarOpen(false)} className="text-sm font-bold uppercase tracking-widest py-4 border-b border-gray-100">{t('nav.service')}</a>
                        <a href="#market" onClick={() => setIsSidebarOpen(false)} className="text-sm font-bold uppercase tracking-widest py-4 border-b border-gray-100">{t('nav.market')}</a>
                        <a href="#contact" onClick={() => setIsSidebarOpen(false)} className="text-sm font-bold uppercase tracking-widest py-4 border-b border-gray-100">{t('nav.contact')}</a>
                    </div>

                </aside>
            </div>
        </>
    );
}
