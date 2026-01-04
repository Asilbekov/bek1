'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { useAuth } from '@/lib/AuthContext'
import { useState } from 'react'
import { Menu, X, User, Search, ShoppingBag, LogOut, Globe } from 'lucide-react'

export default function Navbar() {
    const { t, language, setLanguage } = useLanguage()
    const { user, signOut } = useAuth()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleLanguage = () => {
        setLanguage(language === 'uz' ? 'ru' : 'uz')
    }

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#2C1810]/95 via-[#1A3A52]/95 to-[#2C1810]/95 backdrop-blur-md border-b border-white/10 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#C89E7C] to-[#7BC5CC] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                            <span className="text-white font-bold text-2xl font-[family-name:var(--font-playfair)]">B</span>
                        </div>
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C89E7C] to-[#7BC5CC] tracking-wide font-[family-name:var(--font-playfair)]">
                            Bek.uz
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-[#E8D5C4] hover:text-[#7BC5CC] transition-colors duration-300 font-medium tracking-wide text-sm font-[family-name:var(--font-montserrat)]"
                        >
                            {t('nav.home')}
                        </Link>
                        <Link
                            href="/search"
                            className="text-[#E8D5C4] hover:text-[#7BC5CC] transition-colors duration-300 font-medium flex items-center gap-2 tracking-wide text-sm font-[family-name:var(--font-montserrat)]"
                        >
                            <Search size={18} />
                            {t('nav.search')}
                        </Link>
                        {user && (
                            <Link
                                href="/orders"
                                className="text-[#E8D5C4] hover:text-[#7BC5CC] transition-colors duration-300 font-medium flex items-center gap-2 tracking-wide text-sm font-[family-name:var(--font-montserrat)]"
                            >
                                <ShoppingBag size={18} />
                                {t('nav.orders')}
                            </Link>
                        )}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-[#7BC5CC]/30 hover:border-[#7BC5CC] text-[#7BC5CC] rounded-lg transition-all duration-300 text-xs font-semibold tracking-wider shadow-lg hover:shadow-xl font-[family-name:var(--font-montserrat)]"
                        >
                            <Globe size={14} />
                            {language.toUpperCase()}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href={`/profile/${user.id}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-[#7BC5CC]/30 text-[#7BC5CC] hover:bg-gradient-to-r hover:from-[#C89E7C] hover:to-[#7BC5CC] hover:text-white hover:border-transparent rounded-lg transition-all duration-300 shadow-lg font-[family-name:var(--font-montserrat)]"
                                >
                                    <User size={18} />
                                    <span className="font-semibold text-sm">{user.name}</span>
                                </Link>
                                <button
                                    onClick={signOut}
                                    className="p-2 border border-[#C89E7C]/50 text-[#C89E7C] hover:bg-[#C89E7C] hover:text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/auth/login"
                                    className="px-6 py-2 text-[#E8D5C4] hover:text-[#7BC5CC] font-semibold text-sm tracking-wide transition-all duration-300 font-[family-name:var(--font-montserrat)]"
                                >
                                    {t('nav.login')}
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="px-6 py-2 bg-gradient-to-r from-[#C89E7C] to-[#7BC5CC] text-white rounded-lg font-semibold text-sm tracking-wide hover:shadow-xl transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)]"
                                >
                                    {t('nav.register')}
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-[#7BC5CC] border border-[#7BC5CC]/30 hover:bg-[#7BC5CC]/10 rounded-lg transition-all duration-300"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t-2 border-[#333] bg-[#050510]">
                        <div className="flex flex-col gap-4">
                            <Link
                                href="/"
                                className="px-4 py-3 text-[#e2e8f0] hover:bg-[#1a1a2e] hover:text-[#00f0ff] border-l-4 border-transparent hover:border-[#00f0ff] uppercase font-bold"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.home')}
                            </Link>
                            <Link
                                href="/search"
                                className="px-4 py-3 text-[#e2e8f0] hover:bg-[#1a1a2e] hover:text-[#00f0ff] border-l-4 border-transparent hover:border-[#00f0ff] uppercase font-bold flex items-center gap-3"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Search size={18} />
                                {t('nav.search')}
                            </Link>
                            {user && (
                                <>
                                    <Link
                                        href="/orders"
                                        className="px-4 py-3 text-[#e2e8f0] hover:bg-[#1a1a2e] hover:text-[#00f0ff] border-l-4 border-transparent hover:border-[#00f0ff] uppercase font-bold flex items-center gap-3"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <ShoppingBag size={18} />
                                        {t('nav.orders')}
                                    </Link>
                                    <Link
                                        href={`/profile/${user.id}`}
                                        className="px-4 py-3 text-[#e2e8f0] hover:bg-[#1a1a2e] hover:text-[#00f0ff] border-l-4 border-transparent hover:border-[#00f0ff] uppercase font-bold flex items-center gap-3"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <User size={18} />
                                        {t('nav.profile')}
                                    </Link>
                                </>
                            )}
                            <div className="border-t-2 border-[#333] mt-2 pt-4 px-4">
                                <button
                                    onClick={toggleLanguage}
                                    className="w-full px-4 py-2 text-left text-[#00f0ff] border-2 border-[#00f0ff] bg-black hover:bg-[#00f0ff] hover:text-black uppercase font-bold flex items-center gap-2 transition-all"
                                >
                                    <Globe size={18} />
                                    {language === 'uz' ? "O'zbek" : 'Русский'}
                                </button>
                            </div>
                            {!user && (
                                <div className="border-t-2 border-[#333] mt-2 pt-4 flex flex-col gap-4 px-4">
                                    <Link
                                        href="/auth/login"
                                        className="px-4 py-3 text-center text-[#00f0ff] border-2 border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black uppercase font-bold transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('nav.login')}
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="px-4 py-3 text-center bg-[#00f0ff] text-black border-2 border-[#00f0ff] uppercase font-bold hover:bg-transparent hover:text-[#00f0ff] transition-all shadow-[4px_4px_0_#bd00ff]"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('nav.register')}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
