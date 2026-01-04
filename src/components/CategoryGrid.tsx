'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import {
    Wrench, Zap, Scissors, ChefHat, Sparkles, Car, GraduationCap,
    Hammer, Paintbrush, TreePine, Shirt, Camera, Building2,
    UtensilsCrossed, Heart, Dumbbell, Truck, MoreHorizontal,
    LucideIcon
} from 'lucide-react'

interface CategoryCardProps {
    categoryKey: string
    icon: LucideIcon
    gradient: string
}

const categoryIcons: Record<string, { icon: LucideIcon; gradient: string }> = {
    plumber: { icon: Wrench, gradient: 'text-[#7BC5CC] border-[#7BC5CC]/30' },
    electrician: { icon: Zap, gradient: 'text-[#C89E7C] border-[#C89E7C]/30' },
    barber: { icon: Scissors, gradient: 'text-[#4A2C1C] border-[#4A2C1C]/30' },
    chef: { icon: ChefHat, gradient: 'text-[#C89E7C] border-[#C89E7C]/30' },
    cleaner: { icon: Sparkles, gradient: 'text-[#4A9B9F] border-[#4A9B9F]/30' },
    driver: { icon: Car, gradient: 'text-[#B8D8DB] border-[#B8D8DB]/30' },
    teacher: { icon: GraduationCap, gradient: 'text-[#1A3A52] border-[#1A3A52]/30' },
    repairman: { icon: Hammer, gradient: 'text-[#C89E7C] border-[#C89E7C]/30' },
    painter: { icon: Paintbrush, gradient: 'text-[#7BC5CC] border-[#7BC5CC]/30' },
    carpenter: { icon: TreePine, gradient: 'text-[#4A2C1C] border-[#4A2C1C]/30' },
    tailor: { icon: Shirt, gradient: 'text-[#1A3A52] border-[#1A3A52]/30' },
    photographer: { icon: Camera, gradient: 'text-[#B8D8DB] border-[#B8D8DB]/30' },
    hotel: { icon: Building2, gradient: 'text-[#4A9B9F] border-[#4A9B9F]/30' },
    restaurant: { icon: UtensilsCrossed, gradient: 'text-[#C89E7C] border-[#C89E7C]/30' },
    beauty: { icon: Heart, gradient: 'text-[#C89E7C] border-[#C89E7C]/30' },
    fitness: { icon: Dumbbell, gradient: 'text-[#4A9B9F] border-[#4A9B9F]/30' },
    courier: { icon: Truck, gradient: 'text-[#7BC5CC] border-[#7BC5CC]/30' },
    other: { icon: MoreHorizontal, gradient: 'text-[#B8D8DB] border-[#B8D8DB]/30' },
}

function CategoryCard({ categoryKey, icon: Icon, gradient }: CategoryCardProps) {
    const { t } = useLanguage()

    return (
        <Link
            href={`/search?category=${categoryKey}`}
            className="group flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#7BC5CC]/50 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
            <div className={`w-16 h-16 rounded-full border bg-gradient-to-br from-[#2C1810]/50 to-[#1A3A52]/50 flex items-center justify-center mb-4 shadow-lg ${gradient} group-hover:scale-110 transition-all duration-300`}>
                <Icon className={gradient.split(' ')[0]} size={32} />
            </div>
            <h3 className={`font-semibold text-center tracking-wide text-sm ${gradient.split(' ')[0]} group-hover:text-white transition-colors duration-300 font-[family-name:var(--font-montserrat)]`}>
                {t(`categories.${categoryKey}`)}
            </h3>
        </Link>
    )
}

export default function CategoryGrid() {
    const categories = Object.entries(categoryIcons)

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map(([key, { icon, gradient }]) => (
                <CategoryCard
                    key={key}
                    categoryKey={key}
                    icon={icon}
                    gradient={gradient}
                />
            ))}
        </div>
    )
}

export { categoryIcons }
