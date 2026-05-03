import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';
import { Menu, ChevronDown } from 'lucide-react';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);

    // ✅ Lock scroll ketika sidebar terbuka
    useEffect(() => {
        document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isSidebarOpen]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsLangOpen(false);
    };

    return (
        <>
            <nav className="fixed top-0 w-full bg-white border-b border-gray-400 z-50">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">

                    {/* Logo + Brand */}
                    <a href="#home" className="flex items-center gap-3 h-14 flex-shrink-0">
                        <img src={logo} alt="logo" className="h-full w-auto object-contain" />

                        {/* ✅ flex-nowrap agar tidak wrap ke baris baru */}
                        <span className="font-cormorant font-bold tracking-wider leading-none flex items-baseline flex-nowrap max-sm:hidden">
                            <span className="text-xl whitespace-nowrap">
                                SUNSSE <span className="text-gold-primary ml-1">BARU</span> {/* ✅ fix typo */}
                            </span>
                            <span className="text-xs ml-2 text-gray-500 font-light whitespace-nowrap">
                                INDONESIA
                            </span>
                        </span>
                    </a>

                    {/* ✅ Desktop Menu — ganti md: ke lg: agar tidak cramped di ~768-1023px */}
                    <div className="hidden lg:flex items-center gap-8">
                        <a href="#home" className="text-sm hover:text-gold-primary hover:border-b hover:border-gold-primary transition whitespace-nowrap">{t('nav.home')}</a>
                        <a href="#about" className="text-sm hover:text-gold-primary hover:border-b hover:border-gold-primary transition whitespace-nowrap">{t('nav.about')}</a>
                        <a href="#product" className="text-sm hover:text-gold-primary hover:border-b hover:border-gold-primary transition whitespace-nowrap">{t('nav.product')}</a>
                        <a href="#service" className="text-sm hover:text-gold-primary hover:border-b hover:border-gold-primary transition whitespace-nowrap">{t('nav.service')}</a>
                        <a href="#market" className="text-sm hover:text-gold-primary hover:border-b hover:border-gold-primary transition whitespace-nowrap">{t('nav.market')}</a>
                        <a href="#contact" className="text-sm hover:text-gold-primary hover:border-b hover:border-gold-primary transition whitespace-nowrap">{t('nav.contact')}</a>
                    </div>

                    {/* ✅ Desktop Language — ganti md: ke lg: */}
                    <div className="relative hidden lg:block flex-shrink-0">
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center gap-1 border px-3 py-1 rounded-md bg-black text-white text-sm"
                        >
                            {i18n.language.toUpperCase()}
                            <ChevronDown size={14} className={isLangOpen ? 'rotate-180 transition' : 'transition'} />
                        </button>
                        {isLangOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white shadow-xl border rounded-md overflow-hidden">
                                <button onClick={() => changeLanguage('en')} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">EN</button>
                                <button onClick={() => changeLanguage('id')} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">ID</button>
                                <button onClick={() => changeLanguage('zh')} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">中文</button>
                            </div>
                        )}
                    </div>

                    {/* Mobile — Language + Hamburger */}
                    <div className="relative flex items-center gap-4 lg:hidden">
                        {/* Mobile Language */}
                        <div className="relative">
                            <button
                                onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                                className="flex items-center gap-1 text-sm font-medium"
                            >
                                {i18n.language.toUpperCase()}
                                <ChevronDown size={14} className={isMobileLangOpen ? 'rotate-180 transition' : 'transition'} />
                            </button>
                            {isMobileLangOpen && (
                                <div className="absolute right-0 mt-2 w-24 bg-white shadow-xl border rounded-md overflow-hidden z-[70]">
                                    <button onClick={() => { changeLanguage('en'); setIsMobileLangOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">EN</button>
                                    <button onClick={() => { changeLanguage('id'); setIsMobileLangOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">ID</button>
                                    <button onClick={() => { changeLanguage('zh'); setIsMobileLangOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">ZH</button>
                                </div>
                            )}
                        </div>

                        {/* Hamburger */}
                        <button className="font-bold p-2" onClick={() => setIsSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sidebar Mobile */}
            <div className={`fixed inset-0 z-[60] lg:hidden ${isSidebarOpen ? 'visible' : 'invisible'}`}>
                {/* Overlay */}
                <div
                    className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsSidebarOpen(false)}
                />

                {/* Sidebar Panel */}
                <aside className={`absolute top-0 right-0 h-full w-[200px] bg-white shadow-2xl transition-transform duration-300 flex flex-col ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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