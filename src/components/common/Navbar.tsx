import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';
import { Menu, X, ChevronDown, Languages } from 'lucide-react';

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
            <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <a href="#home"><img src={logo} alt="logo" className="h-12" /></a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#home" className="hover:text-[var(--color-gold-primary)] hover:border-[var(--color-gold-secondary))] hover:border-b transition">{t('nav.home')}</a>
                        <a href="#about" className="hover:text-[var(--color-gold-primary)] hover:border-[var(--color-gold-secondary))] hover:border-b transition">{t('nav.about')}</a>
                        <a href="#product" className="hover:text-[var(--color-gold-primary)] hover:border-[var(--color-gold-secondary))] hover:border-b transition">{t('nav.product')}</a>
                        <a href="#service" className="hover:text-[var(--color-gold-primary)] hover:border-[var(--color-gold-secondary))] hover:border-b transition">{t('nav.service')}</a>
                        <a href="#market" className="hover:text-[var(--color-gold-primary)] hover:border-[var(--color-gold-secondary))] hover:border-b transition">{t('nav.market')}</a>
                        <a href="#contact" className="hover:text-[var(--color-gold-primary)] hover:border-[var(--color-gold-secondary))] hover:border-b transition">{t('nav.contact')}</a>
                    </div>

                    {/* Manual Dropdown Bahasa */}
                    <div className="relative hidden md:block">
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center gap-1 border px-3 py-1 rounded-md bg-black text-white"
                        >
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

                    {/* Mobile Toggle */}
                    <button className="md:hidden font-bold p-2" onClick={() => setIsSidebarOpen(true)}>
                        <Menu size={24} />
                    </button>
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

                    {/* Mobile Language Dropdown (Accordion Style) */}
                    <div className="p-2">
                        <div className="relative z-90">
                            <button
                                onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                                className="w-full flex items-center justify-between bg-white border border-gray-200 px-4 py-3 rounded-lg text-sm font-semibold"
                            >
                                <span className="flex items-center gap-2">
                                    {i18n.language.toUpperCase()}
                                </span>
                                <ChevronDown size={16} className={`transition-transform ${isMobileLangOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isMobileLangOpen && (
                                <div className="mt-2 bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                                    <button onClick={() => { changeLanguage('id'); setIsMobileLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm hover:border hover:bg-gray-200 ${i18n.language === 'id' ? 'bg-black text-white' : ''}`}>ID</button>
                                    <button onClick={() => { changeLanguage('en'); setIsMobileLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm hover:border hover:bg-gray-200 ${i18n.language === 'en' ? 'bg-black text-white' : ''}`}>EN</button>
                                    <button onClick={() => { changeLanguage('zh'); setIsMobileLangOpen(false); }} className={`w-full text-left px-4 py-3 text-sm hover:border hover:bg-gray-200 ${i18n.language === 'zh' ? 'bg-black text-white' : ''}`}>ZH</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigasi Mobile (Tanpa Loop) */}
                    <div className="p-6 flex flex-col gap-6">
                        <a href="#home" onClick={() => setIsSidebarOpen(false)} className="text-lg font-medium">{t('nav.home')}</a>
                        <a href="#about" onClick={() => setIsSidebarOpen(false)} className="text-lg font-medium">{t('nav.about')}</a>
                        <a href="#product" onClick={() => setIsSidebarOpen(false)} className="text-lg font-medium">{t('nav.product')}</a>
                        <a href="#service" onClick={() => setIsSidebarOpen(false)} className="text-lg font-medium">{t('nav.service')}</a>
                        <a href="#market" onClick={() => setIsSidebarOpen(false)} className="text-lg font-medium">{t('nav.market')}</a>
                        <a href="#contact" onClick={() => setIsSidebarOpen(false)} className="text-lg font-medium">{t('nav.contact')}</a>
                    </div>

                </aside>
            </div>
        </>
    );
}
