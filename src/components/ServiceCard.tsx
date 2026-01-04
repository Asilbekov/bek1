'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { User } from '@/lib/supabase'
import { MapPin } from 'lucide-react'
import StarRating from './StarRating'

interface ServiceCardProps {
    provider: User & {
        services?: {
            category_id: string
            items?: { name_uz: string; name_ru: string; price: number }[]
        }[]
        averageRating?: number
        reviewCount?: number
    }
}

export default function ServiceCard({ provider }: ServiceCardProps) {
    const { t, language } = useLanguage()

    const minPrice = provider.services?.reduce((min, service) => {
        const serviceMin = service.items?.reduce((m, item) => Math.min(m, item.price), Infinity) ?? Infinity
        return Math.min(min, serviceMin)
    }, Infinity)

    return (
        <Link
            href={`/profile/${provider.id}`}
            className="group block relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
        >
            {/* Avatar Section */}
            <div className="relative h-48 bg-gradient-to-br from-[#2C1810] to-[#4A2C1C]">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />

                {provider.avatar ? (
                    <img
                        src={provider.avatar}
                        alt={`${provider.name} ${provider.surname}`}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center relative z-10">
                        <div className="w-20 h-20 rounded-full border-4 border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-[#E8D5C4] text-3xl font-serif font-bold">
                            {provider.name?.[0]?.toUpperCase()}
                        </div>
                    </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Price Badge */}
                {minPrice && minPrice !== Infinity && (
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur rounded-full text-[#2C1810] text-xs font-bold shadow-lg flex items-center gap-1">
                        <span className="text-[#4A9B9F] font-serif italic">{t('service.priceFrom')}</span>
                        <span>{minPrice.toLocaleString()} {t('service.sum')}</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-serif font-bold text-lg text-[#2C1810] truncate mb-2 group-hover:text-[#4A9B9F] transition-colors">
                    {provider.name} {provider.surname}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={provider.averageRating ?? 0} size="sm" />
                    <span className="text-xs text-[#9E9E9E] font-medium tracking-wide">
                        ({provider.reviewCount ?? 0} {language === 'uz' ? 'sharhlar' : 'отзывов'})
                    </span>
                </div>

                {/* Location */}
                {provider.address && (
                    <div className="flex items-center gap-2 text-sm text-[#3A3A3A]/70 mb-4">
                        <MapPin size={14} className="text-[#C89E7C]" />
                        <span className="truncate">{provider.address}</span>
                    </div>
                )}

                {/* Services Preview */}
                {provider.services && provider.services.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {provider.services.slice(0, 3).map((service, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 bg-[#F5E6D3]/30 text-[#4A2C1C] text-[10px] font-bold uppercase tracking-wider rounded-md border border-[#F5E6D3]"
                            >
                                {t(`categories.${service.category_id}`)}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    )
}
