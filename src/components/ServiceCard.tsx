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
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
            {/* Avatar Section */}
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                {provider.avatar ? (
                    <img
                        src={provider.avatar}
                        alt={`${provider.name} ${provider.surname}`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                            {provider.name?.[0]?.toUpperCase()}
                        </div>
                    </div>
                )}
                {/* Price Badge */}
                {minPrice && minPrice !== Infinity && (
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-blue-600">
                        {t('service.priceFrom')} {minPrice.toLocaleString()} {t('service.sum')}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                    {provider.name} {provider.surname}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                    <StarRating rating={provider.averageRating ?? 0} size="sm" />
                    <span className="text-sm text-gray-500">
                        ({provider.reviewCount ?? 0} {t('profile.reviews').toLowerCase()})
                    </span>
                </div>

                {/* Location */}
                {provider.address && (
                    <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                        <MapPin size={14} />
                        <span className="truncate">{provider.address}</span>
                    </div>
                )}

                {/* Services Preview */}
                {provider.services && provider.services.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                        {provider.services.slice(0, 3).map((service, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600"
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
