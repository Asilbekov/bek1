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
        <div className="min-h-screen bg-[#FAF8F5] relative font-sans selection:bg-[#4A9B9F] selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-40">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#2C1810]/5 via-transparent to-[#1A3A52]/5" />
                    <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-[#4A9B9F]/10 blur-3xl" />
                    <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#C89E7C]/10 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/50 backdrop-blur-md rounded-full border border-[#C89E7C]/20 shadow-sm mb-10 animate-fade-in hover:shadow-md transition-all cursor-default text-[#4A2C1C]">
                            <Star size={14} className="fill-[#C89E7C] text-[#C89E7C]" />
                            <span className="text-sm font-medium tracking-wide">O'zbekistonning #1 xizmatlar platformasi</span>
                        </div>

                        {/* Title */}
                        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#2C1810] mb-8 animate-fade-in leading-tight tracking-tight" style={{ animationDelay: '0.1s' }}>
                            {t('home.title')}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl sm:text-2xl text-[#3A3A3A]/80 mb-12 animate-fade-in font-light max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '0.2s' }}>
                            {t('home.subtitle')}
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto animate-fade-in mb-20 drop-shadow-xl" style={{ animationDelay: '0.3s' }}>
                            <div className="relative flex items-center group">
                                <div className="absolute inset-0 bg-white rounded-full shadow-2xl opacity-90 group-hover:opacity-100 transition-opacity" />
                                <Search className="absolute left-6 text-[#9E9E9E]" size={24} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t('home.searchPlaceholder')}
                                    className="relative w-full py-5 pl-16 pr-44 text-lg bg-transparent border-none focus:ring-0 text-[#2C1810] placeholder:text-[#9E9E9E]/80 placeholder:font-light"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 px-8 py-3 bg-[#2C1810] text-white rounded-full font-medium hover:bg-[#4A2C1C] transition-all flex items-center gap-2 group/btn"
                                >
                                    {t('nav.search')}
                                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>

                        {/* Quick stats */}
                        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <div className="flex items-center gap-3 group cursor-default">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:-translate-y-1 transition-transform duration-300">
                                    <Shield className="text-[#4A9B9F]" size={24} />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[#2C1810] font-bold text-sm">Ishonchli ustalar</h3>
                                    <p className="text-[#9E9E9E] text-xs">Tekshirilgan mutaxassislar</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 group cursor-default">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:-translate-y-1 transition-transform duration-300">
                                    <Clock className="text-[#C89E7C]" size={24} />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[#2C1810] font-bold text-sm">24/7 qo'llab-quvvatlash</h3>
                                    <p className="text-[#9E9E9E] text-xs">Har doim aloqada</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 group cursor-default">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:-translate-y-1 transition-transform duration-300">
                                    <Star className="text-[#4A2C1C] fill-[#4A2C1C]" size={24} />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-[#2C1810] font-bold text-sm">1000+ baholangan usta</h3>
                                    <p className="text-[#9E9E9E] text-xs">Haqiqiy baholar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-16">
                        <div>
                            <span className="text-[#4A9B9F] font-bold tracking-wider text-sm uppercase mb-2 block">Xizmatlar</span>
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1810]">
                                {t('home.allCategories')}
                            </h2>
                        </div>
                        <Link
                            href="/search"
                            className="hidden sm:flex items-center gap-2 text-[#C89E7C] font-medium hover:text-[#4A2C1C] transition-colors group"
                        >
                            {t('home.viewAll')}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <CategoryGrid />

                    <div className="mt-12 text-center sm:hidden">
                        <Link
                            href="/search"
                            className="inline-flex items-center gap-2 text-[#C89E7C] font-medium hover:text-[#4A2C1C] transition-colors"
                        >
                            {t('home.viewAll')}
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-24 bg-[#F5E6D3]/20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-[#C89E7C] font-bold tracking-wider text-sm uppercase mb-2 block">Jarayon</span>
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C1810]">
                            Qanday <span className="text-[#4A9B9F] italic">ishlaydi?</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting line */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-[#C89E7C]/30 to-transparent" />

                        {/* Step 1 */}
                        <div className="text-center group relative">
                            <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-full flex items-center justify-center text-[#2C1810] text-3xl font-serif font-bold shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:scale-110 transition-transform duration-300 relative z-10">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-[#2C1810] mb-4">Xizmat tanlang</h3>
                            <p className="text-[#3A3A3A]/70 leading-relaxed px-4">
                                Sizga kerakli xizmatni kategoriya yoki ism bo'yicha qidiring
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center group relative">
                            <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-full flex items-center justify-center text-[#4A9B9F] text-3xl font-serif font-bold shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:scale-110 transition-transform duration-300 relative z-10">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-[#2C1810] mb-4">Vaqt belgilang</h3>
                            <p className="text-[#3A3A3A]/70 leading-relaxed px-4">
                                Kalendardan qulay kun va soatni tanlang, narxni ko'ring
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center group relative">
                            <div className="w-24 h-24 mx-auto mb-8 bg-white rounded-full flex items-center justify-center text-[#C89E7C] text-3xl font-serif font-bold shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:scale-110 transition-transform duration-300 relative z-10">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-[#2C1810] mb-4">Chat orqali gaplashing</h3>
                            <p className="text-[#3A3A3A]/70 leading-relaxed px-4">
                                Usta bilan bevosita bog'laning va lokatsiyangizni jo'nating
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[#2C1810]" />
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2587&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#2C1810] to-[#2C1810]/50" />

                        <div className="relative p-12 sm:p-20 text-center">
                            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                                Siz ham usta bo'lmoqchimisiz?
                            </h2>
                            <p className="text-[#E8D5C4] mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                                O'z xizmatlaringizni platformaga qo'shing va minglab mijozlarga yetib boring
                            </p>
                            <Link
                                href="/auth/register"
                                className="inline-flex items-center gap-3 px-10 py-4 bg-[#C89E7C] text-white text-lg font-bold rounded-full hover:bg-[#B68C6A] transition-all shadow-[0_4px_20px_rgba(200,158,124,0.4)] hover:shadow-[0_6px_25px_rgba(200,158,124,0.5)] hover:-translate-y-1"
                            >
                                Ro'yxatdan o'tish
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1A3A52] text-[#E8F4F5] py-16 border-t border-[#4A9B9F]/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-[#4A9B9F] rounded-lg flex items-center justify-center shadow-lg">
                                    <span className="text-white font-serif font-bold text-xl">B</span>
                                </div>
                                <span className="text-2xl font-serif font-bold text-white tracking-wide">Bek.uz</span>
                            </div>
                            <p className="text-[#B8D8DB] max-w-sm leading-relaxed">
                                O'zbekistonning eng ishonchli xizmatlar platformasi. Sizning qulayligingiz - bizning ustuvorligimiz.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6">Platforma</h4>
                            <ul className="space-y-4">
                                <li><Link href="/search" className="text-[#B8D8DB] hover:text-white transition-colors">Xizmatlar</Link></li>
                                <li><Link href="/auth/login" className="text-[#B8D8DB] hover:text-white transition-colors">Kirish</Link></li>
                                <li><Link href="/auth/register" className="text-[#B8D8DB] hover:text-white transition-colors">Ro'yxatdan o'tish</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-6">Yordam</h4>
                            <ul className="space-y-4">
                                <li><Link href="#" className="text-[#B8D8DB] hover:text-white transition-colors">Qo'llab-quvvatlash</Link></li>
                                <li><Link href="#" className="text-[#B8D8DB] hover:text-white transition-colors">Maxfiylik siyosati</Link></li>
                                <li><Link href="#" className="text-[#B8D8DB] hover:text-white transition-colors">Foydalanish shartlari</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-[#4A9B9F]/20 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-[#B8D8DB]">
                            © 2026 Bek.uz. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
