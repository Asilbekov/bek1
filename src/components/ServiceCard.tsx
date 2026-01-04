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
            className="group block hover:z-10 bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-[#7BC5CC]/50 transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
            {/* Avatar Section */}
            <div className="relative h-48 bg-gradient-to-br from-[#4A2C1C] to-[#1A3A52] p-2">
                {/* Subtle pattern background for avatar area */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#7BC5CC_25%,transparent_25%,transparent_75%,#7BC5CC_75%,#7BC5CC),linear-gradient(45deg,#7BC5CC_25%,transparent_25%,transparent_75%,#7BC5CC_75%,#7BC5CC)] bg-[length:30px_30px] bg-[position:0_0,15px_15px]" />

                {provider.avatar ? (
                    <img
                        src={provider.avatar}
                        alt={`${provider.name} ${provider.surname}`}
                        className="w-full h-full object-cover rounded-xl group-hover:ring-2 group-hover:ring-[#7BC5CC] transition-all duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center relative z-10">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#C89E7C] to-[#7BC5CC] flex items-center justify-center text-white text-4xl font-bold shadow-xl font-[family-name:var(--font-playfair)]">
                            {provider.name?.[0]?.toUpperCase()}
                        </div>
                    </div>
                )}

                {/* Price Badge */}
                {minPrice && minPrice !== Infinity && (
                    <div className="absolute bottom-3 right-3 px-4 py-2 bg-gradient-to-r from-[#C89E7C] to-[#7BC5CC] text-white rounded-full text-xs font-semibold shadow-lg z-20 font-[family-name:var(--font-montserrat)]">
                        {t('service.priceFrom')} {minPrice.toLocaleString()} {t('service.sum')}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 bg-gradient-to-b from-[#2C1810]/50 to-[#1A3A52]/50">
                <h3 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#F5E6D3] to-[#7BC5CC] tracking-wide truncate mb-1 font-[family-name:var(--font-playfair)]">
                    {provider.name} {provider.surname}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={provider.averageRating ?? 0} size="sm" />
                    <span className="text-xs text-[#B8D8DB] font-[family-name:var(--font-montserrat)]">
                        [{provider.reviewCount ?? 0} reviews]
                    </span>
                </div>

                {/* Location */}
                {provider.address && (
                    <div className="flex items-center gap-2 text-sm text-[#E8D5C4] mb-3 font-[family-name:var(--font-inter)]">
                        <MapPin size={14} className="text-[#4A9B9F]" />
                        <span className="truncate">{provider.address}</span>
                    </div>
                )}

                {/* Services Preview */}
                {provider.services && provider.services.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {provider.services.slice(0, 3).map((service, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-white/5 backdrop-blur-sm border border-[#7BC5CC]/30 text-[#7BC5CC] text-[10px] rounded-full tracking-wide hover:border-[#C89E7C]/50 hover:text-[#C89E7C] transition-colors duration-300 font-[family-name:var(--font-montserrat)]"
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
