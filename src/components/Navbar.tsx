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
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#F5E6D3] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-[#2C1810] flex items-center justify-center rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300">
                            <span className="text-[#C89E7C] font-serif font-bold text-2xl">B</span>
                        </div>
                        <span className="text-2xl font-serif font-bold text-[#2C1810] tracking-tight group-hover:text-[#4A2C1C] transition-colors">
                            Bek.uz
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-[#3A3A3A] hover:text-[#4A9B9F] transition-colors font-medium text-sm hover:underline decoration-2 underline-offset-4 decoration-[#C89E7C]"
                        >
                            {t('nav.home')}
                        </Link>
                        <Link
                            href="/search"
                            className="text-[#3A3A3A] hover:text-[#4A9B9F] transition-colors font-medium flex items-center gap-2 text-sm group"
                        >
                            <Search size={18} className="text-[#9E9E9E] group-hover:text-[#4A9B9F] transition-colors" />
                            {t('nav.search')}
                        </Link>
                        {user && (
                            <Link
                                href="/orders"
                                className="text-[#3A3A3A] hover:text-[#4A9B9F] transition-colors font-medium flex items-center gap-2 text-sm group"
                            >
                                <ShoppingBag size={18} className="text-[#9E9E9E] group-hover:text-[#4A9B9F] transition-colors" />
                                {t('nav.orders')}
                            </Link>
                        )}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E8D5C4] hover:border-[#4A9B9F] text-[#3A3A3A] transition-all text-xs font-bold tracking-wide hover:shadow-sm"
                        >
                            <Globe size={14} className="text-[#4A9B9F]" />
                            {language.toUpperCase()}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href={`/profile/${user.id}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#F5E6D3]/30 border border-[#F5E6D3] text-[#4A2C1C] rounded-full hover:bg-[#F5E6D3] transition-all"
                                >
                                    <User size={18} />
                                    <span className="font-bold text-sm">{user.name}</span>
                                </Link>
                                <button
                                    onClick={signOut}
                                    className="p-2 text-[#9E9E9E] hover:text-[#FF6B6B] transition-colors"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/auth/login"
                                    className="px-6 py-2 text-[#2C1810] hover:text-[#4A9B9F] font-medium text-sm transition-colors"
                                >
                                    {t('nav.login')}
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="px-6 py-2 bg-[#2C1810] text-white rounded-full font-medium text-sm hover:bg-[#4A2C1C] transition-all shadow-[0_4px_10px_rgba(44,24,16,0.2)] hover:shadow-[0_6px_15px_rgba(44,24,16,0.3)] hover:-translate-y-0.5"
                                >
                                    {t('nav.register')}
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-[#2C1810] hover:bg-[#FAF8F5] rounded-lg transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-[#F5E6D3] bg-white animate-fade-in-down">
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className="px-4 py-3 text-[#3A3A3A] hover:bg-[#FAF8F5] hover:text-[#4A9B9F] font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.home')}
                            </Link>
                            <Link
                                href="/search"
                                className="px-4 py-3 text-[#3A3A3A] hover:bg-[#FAF8F5] hover:text-[#4A9B9F] font-medium flex items-center gap-3"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Search size={18} />
                                {t('nav.search')}
                            </Link>
                            {user && (
                                <>
                                    <Link
                                        href="/orders"
                                        className="px-4 py-3 text-[#3A3A3A] hover:bg-[#FAF8F5] hover:text-[#4A9B9F] font-medium flex items-center gap-3"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <ShoppingBag size={18} />
                                        {t('nav.orders')}
                                    </Link>
                                    <Link
                                        href={`/profile/${user.id}`}
                                        className="px-4 py-3 text-[#3A3A3A] hover:bg-[#FAF8F5] hover:text-[#4A9B9F] font-medium flex items-center gap-3"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <User size={18} />
                                        {t('nav.profile')}
                                    </Link>
                                </>
                            )}
                            <div className="border-t border-[#F5E6D3] mt-2 pt-4 px-4">
                                <button
                                    onClick={toggleLanguage}
                                    className="w-full px-4 py-2 text-left text-[#3A3A3A] bg-[#FAF8F5] rounded-lg font-medium flex items-center gap-2"
                                >
                                    <Globe size={18} className="text-[#4A9B9F]" />
                                    {language === 'uz' ? "O'zbek" : 'Русский'}
                                </button>
                            </div>
                            {!user && (
                                <div className="border-t border-[#F5E6D3] mt-2 pt-4 flex flex-col gap-3 px-4">
                                    <Link
                                        href="/auth/login"
                                        className="px-4 py-3 text-center text-[#2C1810] border border-[#2C1810] rounded-lg font-medium hover:bg-[#FAF8F5] transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('nav.login')}
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="px-4 py-3 text-center bg-[#2C1810] text-white rounded-lg font-medium hover:bg-[#4A2C1C] transition-all shadow-md"
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
