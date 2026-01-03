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
            className="group card block hover:z-10"
        >
            {/* Avatar Section */}
            <div className="relative h-48 bg-[#02040a] border-b-2 border-[#00f0ff] p-2">
                {/* 4bit Grid Background for avatar area */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#00f0ff_25%,transparent_25%,transparent_75%,#00f0ff_75%,#00f0ff),linear-gradient(45deg,#00f0ff_25%,transparent_25%,transparent_75%,#00f0ff_75%,#00f0ff)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]" />

                {provider.avatar ? (
                    <img
                        src={provider.avatar}
                        alt={`${provider.name} ${provider.surname}`}
                        className="w-full h-full object-cover border-2 border-[#333] group-hover:border-[#bd00ff] transition-colors"
                        style={{ imageRendering: 'pixelated' }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center relative z-10">
                        <div className="w-24 h-24 border-2 border-[#00f0ff] bg-[#000] flex items-center justify-center text-[#00f0ff] text-4xl font-bold shadow-[4px_4px_0_#bd00ff]">
                            {provider.name?.[0]?.toUpperCase()}
                        </div>
                    </div>
                )}

                {/* Price Badge */}
                {minPrice && minPrice !== Infinity && (
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#00f0ff] text-black border-2 border-black text-xs font-bold shadow-[2px_2px_0_black] z-20">
                        {t('service.priceFrom')} {minPrice.toLocaleString()} {t('service.sum')}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="pt-4">
                <h3 className="font-bold text-lg text-[#00f0ff] uppercase tracking-wider truncate mb-1">
                    {provider.name} {provider.surname}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={provider.averageRating ?? 0} size="sm" />
                    <span className="text-xs text-[#bd00ff] font-mono">
                        [{provider.reviewCount ?? 0} REVIEWS]
                    </span>
                </div>

                {/* Location */}
                {provider.address && (
                    <div className="flex items-center gap-2 text-sm text-[#e2e8f0] font-mono mb-3">
                        <MapPin size={14} className="text-[#ff0055]" />
                        <span className="truncate">{provider.address}</span>
                    </div>
                )}

                {/* Services Preview */}
                {provider.services && provider.services.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {provider.services.slice(0, 3).map((service, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 bg-[#1a1a2e] border border-[#333] text-[#00ff66] text-[10px] uppercase tracking-wider hover:border-[#00ff66] transition-colors"
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
