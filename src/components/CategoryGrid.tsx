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
    colorClass: string
}

const categoryIcons: Record<string, { icon: LucideIcon; colorClass: string }> = {
    plumber: { icon: Wrench, colorClass: 'text-[#4A9B9F] bg-[#4A9B9F]/10' },
    electrician: { icon: Zap, colorClass: 'text-[#C89E7C] bg-[#C89E7C]/10' },
    barber: { icon: Scissors, colorClass: 'text-[#2C1810] bg-[#2C1810]/10' },
    chef: { icon: ChefHat, colorClass: 'text-[#4A2C1C] bg-[#4A2C1C]/10' },
    cleaner: { icon: Sparkles, colorClass: 'text-[#7BC5CC] bg-[#7BC5CC]/10' },
    driver: { icon: Car, colorClass: 'text-[#3A3A3A] bg-[#3A3A3A]/10' },
    teacher: { icon: GraduationCap, colorClass: 'text-[#4A9B9F] bg-[#4A9B9F]/10' },
    repairman: { icon: Hammer, colorClass: 'text-[#C89E7C] bg-[#C89E7C]/10' },
    painter: { icon: Paintbrush, colorClass: 'text-[#7BC5CC] bg-[#7BC5CC]/10' },
    carpenter: { icon: TreePine, colorClass: 'text-[#2C1810] bg-[#2C1810]/10' },
    tailor: { icon: Shirt, colorClass: 'text-[#4A2C1C] bg-[#4A2C1C]/10' },
    photographer: { icon: Camera, colorClass: 'text-[#3A3A3A] bg-[#3A3A3A]/10' },
    hotel: { icon: Building2, colorClass: 'text-[#4A9B9F] bg-[#4A9B9F]/10' },
    restaurant: { icon: UtensilsCrossed, colorClass: 'text-[#C89E7C] bg-[#C89E7C]/10' },
    beauty: { icon: Heart, colorClass: 'text-[#FF8FAB] bg-[#FF8FAB]/10' },
    fitness: { icon: Dumbbell, colorClass: 'text-[#7BC5CC] bg-[#7BC5CC]/10' },
    courier: { icon: Truck, colorClass: 'text-[#4A2C1C] bg-[#4A2C1C]/10' },
    other: { icon: MoreHorizontal, colorClass: 'text-[#9E9E9E] bg-[#9E9E9E]/10' },
}

function CategoryCard({ categoryKey, icon: Icon, colorClass }: CategoryCardProps) {
    const { t } = useLanguage()

    return (
        <Link
            href={`/search?category=${categoryKey}`}
            className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-[#F5E6D3] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
            <div className={`w-14 h-14 rounded-xl ${colorClass} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <Icon size={28} />
            </div>
            <h3 className="font-serif font-medium text-center text-[#2C1810] text-sm group-hover:text-[#C89E7C] transition-colors">
                {t(`categories.${categoryKey}`)}
            </h3>
        </Link>
    )
}

export default function CategoryGrid() {
    const categories = Object.entries(categoryIcons)

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map(([key, { icon, colorClass }]) => (
                <CategoryCard
                    key={key}
                    categoryKey={key}
                    icon={icon}
                    colorClass={colorClass}
                />
            ))}
        </div>
    )
}

export { categoryIcons }
