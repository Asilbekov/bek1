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
        <div className="min-h-screen bg-[#050510] relative">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b-2 border-[#00f0ff]">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00f0ff]/20 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#bd00ff]/20 blur-3xl" />
                    {/* Animated retro grid lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center">
                    <div className="max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00f0ff] text-black text-sm font-bold uppercase mb-8 border-2 border-white shadow-[4px_4px_0_white] animate-fade-in hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default">
                            <Star size={16} className="fill-black" />
                            <span>O'zbekistonning #1 xizmatlar platformasi</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#00f0ff] mb-8 animate-fade-in drop-shadow-[4px_4px_0_#bd00ff] uppercase leading-tight" style={{ animationDelay: '0.1s' }}>
                            {t('home.title')}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-[#e2e8f0] mb-12 animate-fade-in font-mono max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
                            {t('home.subtitle')}
                        </p>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto animate-fade-in mb-16" style={{ animationDelay: '0.3s' }}>
                            <div className="relative flex items-center group">
                                <Search className="absolute left-5 text-[#00f0ff]" size={22} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={t('home.searchPlaceholder')}
                                    className="w-full py-5 pl-14 pr-40 text-lg bg-black border-2 border-[#333] text-[#00f0ff] shadow-[4px_4px_0_#333] focus:border-[#00f0ff] focus:shadow-[4px_4px_0_#00f0ff] focus:outline-none transition-all placeholder:text-[#555] uppercase font-mono"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-3 px-6 py-2 bg-[#bd00ff] text-white font-bold uppercase hover:bg-white hover:text-[#bd00ff] transition-colors flex items-center gap-2 border-2 border-transparent hover:border-[#bd00ff]"
                                >
                                    {t('nav.search')}
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </form>

                        {/* Quick stats */}
                        <div className="flex flex-wrap justify-center gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <div className="flex items-center gap-3 text-[#e2e8f0] font-mono group hover:text-[#00ff66] transition-colors cursor-default">
                                <div className="w-12 h-12 bg-black border-2 border-[#00ff66] flex items-center justify-center shadow-[2px_2px_0_#00ff66] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                                    <Shield className="text-[#00ff66]" size={24} />
                                </div>
                                <span className="uppercase text-sm tracking-wider">Ishonchli ustalar</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#e2e8f0] font-mono group hover:text-[#00f0ff] transition-colors cursor-default">
                                <div className="w-12 h-12 bg-black border-2 border-[#00f0ff] flex items-center justify-center shadow-[2px_2px_0_#00f0ff] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                                    <Clock className="text-[#00f0ff]" size={24} />
                                </div>
                                <span className="uppercase text-sm tracking-wider">24/7 qo'llab-quvvatlash</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#e2e8f0] font-mono group hover:text-[#ffe600] transition-colors cursor-default">
                                <div className="w-12 h-12 bg-black border-2 border-[#ffe600] flex items-center justify-center shadow-[2px_2px_0_#ffe600] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                                    <Star className="text-[#ffe600] fill-[#ffe600]" size={24} />
                                </div>
                                <span className="uppercase text-sm tracking-wider">1000+ baholangan usta</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-[#02040a] relative">
                <div className="absolute inset-x-0 top-0 h-1 bg-[#00f0ff] opacity-50" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#00f0ff] uppercase tracking-widest drop-shadow-[2px_2px_0_#bd00ff]">
                            {t('home.allCategories')}
                        </h2>
                        <Link
                            href="/search"
                            className="text-[#bd00ff] hover:text-white font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 border-transparent hover:border-white transition-all"
                        >
                            {t('home.viewAll')}
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                    <CategoryGrid />
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 bg-black border-y-2 border-[#333]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-16 uppercase tracking-widest">
                        Qanday <span className="text-[#00ff66]">ishlaydi?</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-6 bg-[#00f0ff] border-2 border-white flex items-center justify-center text-black text-4xl font-bold shadow-[6px_6px_0_#bd00ff] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-[#00f0ff] mb-3 uppercase">Xizmat tanlang</h3>
                            <p className="text-gray-400 font-mono text-sm leading-relaxed px-4">
                                Sizga kerakli xizmatni kategoriya yoki ism bo'yicha qidiring
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-6 bg-[#bd00ff] border-2 border-white flex items-center justify-center text-black text-4xl font-bold shadow-[6px_6px_0_#00f0ff] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-[#bd00ff] mb-3 uppercase">Vaqt belgilang</h3>
                            <p className="text-gray-400 font-mono text-sm leading-relaxed px-4">
                                Kalendardan qulay kun va soatni tanlang, narxni ko'ring
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center group">
                            <div className="w-20 h-20 mx-auto mb-6 bg-[#00ff66] border-2 border-white flex items-center justify-center text-black text-4xl font-bold shadow-[6px_6px_0_#ffe600] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-[#00ff66] mb-3 uppercase">Chat orqali gaplashing</h3>
                            <p className="text-gray-400 font-mono text-sm leading-relaxed px-4">
                                Usta bilan bevosita bog'laning va lokatsiyangizni jo'nating
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 relative overflow-hidden">
                {/* Scanlines again just in case global isn't covering well enough here */}
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="relative border-4 border-[#00f0ff] bg-[#050510] p-8 sm:p-12 text-center overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#ff0055]" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#ff0055]" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#ff0055]" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#ff0055]" />

                        <div className="relative">
                            <h2 className="text-2xl sm:text-4xl font-black text-white mb-6 uppercase tracking-wider drop-shadow-[4px_4px_0_#00f0ff]">
                                Siz ham usta bo'lmoqchimisiz?
                            </h2>
                            <p className="text-[#e2e8f0] mb-8 max-w-lg mx-auto font-mono">
                                O'z xizmatlaringizni platformaga qo'shing va minglab mijozlarga yetib boring
                            </p>
                            <Link
                                href="/auth/register"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#ffe600] text-black text-lg font-bold uppercase tracking-widest border-2 border-white hover:bg-white hover:text-[#ff0055] transition-all shadow-[6px_6px_0_#ff0055] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                            >
                                Ro'yxatdan o'tish
                                <ArrowRight size={24} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-[#e2e8f0] py-12 border-t-2 border-[#333]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#00f0ff] border-2 border-white flex items-center justify-center shadow-[2px_2px_0_#bd00ff]">
                                <span className="text-black font-bold text-xl font-mono">B</span>
                            </div>
                            <span className="text-xl font-bold text-[#00f0ff] uppercase tracking-widest">Bek.uz</span>
                        </div>
                        <p className="text-sm font-mono text-[#555]">
                            © 2026 Bek.uz. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
