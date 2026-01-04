'use client'

import { useLanguage } from '@/lib/LanguageContext'
import Navbar from '@/components/Navbar'
import CategoryGrid from '@/components/CategoryGrid'
import { Search, ArrowRight, Shield, Clock, Star } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
    const { t } = useLanguage()
    const [searchQuery, setSearchQuery] = useState('')
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#1A3A52] to-[#2C1810]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7BC5CC]/20 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#C89E7C]/20 blur-3xl" />
                    {/* Elegant subtle pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center">
                    <div className="max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C89E7C] to-[#7BC5CC] text-white text-sm font-semibold rounded-full mb-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-default font-[family-name:var(--font-montserrat)]">
                            <Star size={16} className="fill-white" />
                            <span>O'zbekistonning #1 xizmatlar platformasi</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D3] via-[#B8D8DB] to-[#E8D5C4] mb-8 leading-tight font-[family-name:var(--font-playfair)]">
                            {t('home.title')}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-[#B8D8DB] mb-12 max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-inter)]">
                            {t('home.subtitle')}
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-16">
                            <div className="relative flex items-center group">
                                <Search className="absolute left-5 text-[#4A9B9F]" size={22} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t('home.searchPlaceholder')}
                                    className="w-full py-5 pl-14 pr-40 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-[#F5E6D3] shadow-xl focus:border-[#7BC5CC] focus:shadow-2xl focus:outline-none transition-all placeholder:text-[#B8D8DB]/50 font-[family-name:var(--font-inter)]"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-[#4A9B9F] to-[#7BC5CC] text-white font-semibold rounded-xl hover:from-[#7BC5CC] hover:to-[#4A9B9F] transition-all duration-300 flex items-center gap-2 shadow-lg font-[family-name:var(--font-montserrat)]"
                                >
                                    {t('nav.search')}
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </form>

                        {/* Quick stats */}
                        <div className="flex flex-wrap justify-center gap-8">
                            <div className="flex items-center gap-3 text-[#E8D5C4] group hover:text-[#7BC5CC] transition-colors duration-300 cursor-default">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#4A9B9F]/20 to-[#7BC5CC]/20 backdrop-blur-sm border border-[#7BC5CC]/30 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <Shield className="text-[#7BC5CC]" size={24} />
                                </div>
                                <span className="text-sm tracking-wide font-[family-name:var(--font-montserrat)]">Ishonchli ustalar</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#E8D5C4] group hover:text-[#4A9B9F] transition-colors duration-300 cursor-default">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#4A9B9F]/20 to-[#7BC5CC]/20 backdrop-blur-sm border border-[#4A9B9F]/30 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <Clock className="text-[#4A9B9F]" size={24} />
                                </div>
                                <span className="text-sm tracking-wide font-[family-name:var(--font-montserrat)]">24/7 qo'llab-quvvatlash</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#E8D5C4] group hover:text-[#C89E7C] transition-colors duration-300 cursor-default">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#C89E7C]/20 to-[#E8D5C4]/20 backdrop-blur-sm border border-[#C89E7C]/30 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <Star className="text-[#C89E7C] fill-[#C89E7C]" size={24} />
                                </div>
                                <span className="text-sm tracking-wide font-[family-name:var(--font-montserrat)]">1000+ baholangan usta</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gradient-to-b from-[#1A3A52] to-[#2C1810] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C89E7C] to-[#7BC5CC] tracking-wide font-[family-name:var(--font-playfair)]">
                            {t('home.allCategories')}
                        </h2>
                        <Link
                            href="/search"
                            className="text-[#7BC5CC] hover:text-[#C89E7C] font-semibold tracking-wide flex items-center gap-2 transition-all duration-300 font-[family-name:var(--font-montserrat)]"
                        >
                            {t('home.viewAll')}
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                    <CategoryGrid />
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 bg-gradient-to-b from-[#2C1810] to-[#1A3A52]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-16 tracking-wide font-[family-name:var(--font-playfair)]">
                        Qanday <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7BC5CC] to-[#C89E7C]">ishlaydi?</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#4A9B9F] to-[#7BC5CC] rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl group-hover:scale-110 transition-all duration-300 font-[family-name:var(--font-playfair)]">
                                1
                            </div>
                            <h3 className="text-xl font-semibold text-[#7BC5CC] mb-3 font-[family-name:var(--font-montserrat)]">Xizmat tanlang</h3>
                            <p className="text-[#B8D8DB] text-sm leading-relaxed px-4 font-[family-name:var(--font-inter)]">
                                Sizga kerakli xizmatni kategoriya yoki ism bo'yicha qidiring
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#C89E7C] to-[#E8D5C4] rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl group-hover:scale-110 transition-all duration-300 font-[family-name:var(--font-playfair)]">
                                2
                            </div>
                            <h3 className="text-xl font-semibold text-[#C89E7C] mb-3 font-[family-name:var(--font-montserrat)]">Vaqt belgilang</h3>
                            <p className="text-[#B8D8DB] text-sm leading-relaxed px-4 font-[family-name:var(--font-inter)]">
                                Kalendardan qulay kun va soatni tanlang, narxni ko'ring
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#7BC5CC] to-[#C89E7C] rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl group-hover:scale-110 transition-all duration-300 font-[family-name:var(--font-playfair)]">
                                3
                            </div>
                            <h3 className="text-xl font-semibold text-[#4A9B9F] mb-3 font-[family-name:var(--font-montserrat)]">Chat orqali gaplashing</h3>
                            <p className="text-[#B8D8DB] text-sm leading-relaxed px-4 font-[family-name:var(--font-inter)]">
                                Usta bilan bevosita bog'laning va lokatsiyangizni jo'nating
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 relative overflow-hidden bg-gradient-to-b from-[#1A3A52] to-[#2C1810]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 sm:p-12 text-center overflow-hidden shadow-2xl border border-white/10">
                        <div className="relative">
                            <h2 className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D3] to-[#7BC5CC] mb-6 tracking-wide font-[family-name:var(--font-playfair)]">
                                Siz ham usta bo'lmoqchimisiz?
                            </h2>
                            <p className="text-[#B8D8DB] mb-8 max-w-lg mx-auto leading-relaxed font-[family-name:var(--font-inter)]">
                                O'z xizmatlaringizni platformaga qo'shing va minglab mijozlarga yetib boring
                            </p>
                            <Link
                                href="/auth/register"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C89E7C] to-[#7BC5CC] text-white text-lg font-semibold tracking-wide rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-[family-name:var(--font-montserrat)]"
                            >
                                Ro'yxatdan o'tish
                                <ArrowRight size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-b from-[#2C1810] to-[#1A1A1A] text-[#B8D8DB] py-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#C89E7C] to-[#7BC5CC] rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl font-[family-name:var(--font-playfair)]">B</span>
                            </div>
                            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C89E7C] to-[#7BC5CC] tracking-wide font-[family-name:var(--font-playfair)]">Bek.uz</span>
                        </div>
                        <p className="text-sm text-[#9E9E9E] font-[family-name:var(--font-inter)]">
                            © 2026 Bek.uz. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
