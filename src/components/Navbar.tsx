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
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">B</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Bek.uz
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                        >
                            {t('nav.home')}
                        </Link>
                        <Link
                            href="/search"
                            className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
                        >
                            <Search size={18} />
                            {t('nav.search')}
                        </Link>
                        {user && (
                            <Link
                                href="/orders"
                                className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
                            >
                                <ShoppingBag size={18} />
                                {t('nav.orders')}
                            </Link>
                        )}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
                        >
                            <Globe size={16} />
                            {language.toUpperCase()}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/profile/${user.id}`}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    <User size={18} />
                                    <span className="font-medium">{user.name}</span>
                                </Link>
                                <button
                                    onClick={signOut}
                                    className="p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/auth/login"
                                    className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
                                >
                                    {t('nav.login')}
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                                >
                                    {t('nav.register')}
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100">
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('nav.home')}
                            </Link>
                            <Link
                                href="/search"
                                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Search size={18} />
                                {t('nav.search')}
                            </Link>
                            {user && (
                                <>
                                    <Link
                                        href="/orders"
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <ShoppingBag size={18} />
                                        {t('nav.orders')}
                                    </Link>
                                    <Link
                                        href={`/profile/${user.id}`}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <User size={18} />
                                        {t('nav.profile')}
                                    </Link>
                                </>
                            )}
                            <div className="border-t border-gray-100 mt-2 pt-2">
                                <button
                                    onClick={toggleLanguage}
                                    className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                                >
                                    <Globe size={18} />
                                    {language === 'uz' ? "O'zbek" : 'Русский'}
                                </button>
                            </div>
                            {!user && (
                                <div className="border-t border-gray-100 mt-2 pt-2 flex flex-col gap-2">
                                    <Link
                                        href="/auth/login"
                                        className="px-4 py-2 text-center text-gray-600 hover:bg-gray-50 rounded-lg"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {t('nav.login')}
                                    </Link>
                                    <Link
                                        href="/auth/register"
                                        className="mx-4 py-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full"
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
