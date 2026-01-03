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
    plumber: { icon: Wrench, gradient: 'from-blue-500 to-cyan-400' },
    electrician: { icon: Zap, gradient: 'from-yellow-500 to-orange-400' },
    barber: { icon: Scissors, gradient: 'from-purple-500 to-pink-400' },
    chef: { icon: ChefHat, gradient: 'from-red-500 to-orange-400' },
    cleaner: { icon: Sparkles, gradient: 'from-green-500 to-teal-400' },
    driver: { icon: Car, gradient: 'from-gray-600 to-gray-500' },
    teacher: { icon: GraduationCap, gradient: 'from-indigo-500 to-blue-400' },
    repairman: { icon: Hammer, gradient: 'from-amber-600 to-yellow-500' },
    painter: { icon: Paintbrush, gradient: 'from-pink-500 to-rose-400' },
    carpenter: { icon: TreePine, gradient: 'from-amber-700 to-amber-500' },
    tailor: { icon: Shirt, gradient: 'from-violet-500 to-purple-400' },
    photographer: { icon: Camera, gradient: 'from-slate-600 to-slate-500' },
    hotel: { icon: Building2, gradient: 'from-emerald-600 to-teal-500' },
    restaurant: { icon: UtensilsCrossed, gradient: 'from-orange-500 to-red-400' },
    beauty: { icon: Heart, gradient: 'from-pink-400 to-rose-300' },
    fitness: { icon: Dumbbell, gradient: 'from-green-600 to-emerald-500' },
    courier: { icon: Truck, gradient: 'from-blue-600 to-indigo-500' },
    other: { icon: MoreHorizontal, gradient: 'from-gray-500 to-gray-400' },
}

function CategoryCard({ categoryKey, icon: Icon, gradient }: CategoryCardProps) {
    const { t } = useLanguage()

    return (
        <Link
            href={`/search?category=${categoryKey}`}
            className="group relative overflow-hidden rounded-2xl p-6 bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="text-white" size={28} />
            </div>
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
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
