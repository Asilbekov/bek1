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
        <nav className="sticky top-0 z-50 bg-[#050510]/90 backdrop-blur-md border-b-2 border-[#00f0ff] shadow-[0_4px_0_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-12 h-12 bg-[#00f0ff] flex items-center justify-center border-2 border-black shadow-[4px_4px_0_#bd00ff] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                            <span className="text-black font-bold text-2xl font-mono">B</span>
                        </div>
                        <span className="text-2xl font-bold text-[#00f0ff] uppercase tracking-widest drop-shadow-[2px_2px_0_#bd00ff]">
                            Bek.uz
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-[#e2e8f0] hover:text-[#00f0ff] transition-colors font-medium uppercase tracking-wider text-sm hover:underline decoration-2 underline-offset-4"
                        >
                            {t('nav.home')}
                        </Link>
                        <Link
                            href="/search"
                            className="text-[#e2e8f0] hover:text-[#00f0ff] transition-colors font-medium flex items-center gap-2 uppercase tracking-wider text-sm"
                        >
                            <Search size={18} />
                            {t('nav.search')}
                        </Link>
                        {user && (
                            <Link
                                href="/orders"
                                className="text-[#e2e8f0] hover:text-[#00f0ff] transition-colors font-medium flex items-center gap-2 uppercase tracking-wider text-sm"
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
                            className="flex items-center gap-2 px-3 py-1 bg-black border-2 border-[#333] hover:border-[#00f0ff] text-[#00f0ff] transition-all text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0_#333] hover:shadow-[2px_2px_0_#00f0ff]"
                        >
                            <Globe size={14} />
                            {language.toUpperCase()}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href={`/profile/${user.id}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] border-2 border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all shadow-[4px_4px_0_#bd00ff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                                >
                                    <User size={18} />
                                    <span className="font-bold uppercase text-sm">{user.name}</span>
                                </Link>
                                <button
                                    onClick={signOut}
                                    className="p-2 border-2 border-[#ff0055] text-[#ff0055] hover:bg-[#ff0055] hover:text-white transition-all shadow-[2px_2px_0_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/auth/login"
                                    className="px-6 py-2 text-[#e2e8f0] hover:text-[#00f0ff] font-bold uppercase text-sm tracking-wider border-2 border-transparent hover:border-[#00f0ff] transition-all"
                                >
                                    {t('nav.login')}
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="px-6 py-2 bg-[#00f0ff] text-black border-2 border-[#00f0ff] font-bold uppercase text-sm tracking-wider hover:bg-transparent hover:text-[#00f0ff] transition-all shadow-[4px_4px_0_#bd00ff] hover:shadow-[4px_4px_0_#00f0ff] hover:-translate-y-1"
                                >
                                    {t('nav.register')}
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-[#00f0ff] border-2 border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-colors"
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
