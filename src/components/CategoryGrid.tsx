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
    plumber: { icon: Wrench, gradient: 'text-[#00f0ff] border-[#00f0ff]' },
    electrician: { icon: Zap, gradient: 'text-[#ffe600] border-[#ffe600]' },
    barber: { icon: Scissors, gradient: 'text-[#bd00ff] border-[#bd00ff]' },
    chef: { icon: ChefHat, gradient: 'text-[#ff0055] border-[#ff0055]' },
    cleaner: { icon: Sparkles, gradient: 'text-[#00ff66] border-[#00ff66]' },
    driver: { icon: Car, gradient: 'text-[#e2e8f0] border-[#e2e8f0]' },
    teacher: { icon: GraduationCap, gradient: 'text-[#bd00ff] border-[#bd00ff]' },
    repairman: { icon: Hammer, gradient: 'text-[#ffe600] border-[#ffe600]' },
    painter: { icon: Paintbrush, gradient: 'text-[#ff0055] border-[#ff0055]' },
    carpenter: { icon: TreePine, gradient: 'text-[#ffe600] border-[#ffe600]' },
    tailor: { icon: Shirt, gradient: 'text-[#bd00ff] border-[#bd00ff]' },
    photographer: { icon: Camera, gradient: 'text-[#e2e8f0] border-[#e2e8f0]' },
    hotel: { icon: Building2, gradient: 'text-[#00ff66] border-[#00ff66]' },
    restaurant: { icon: UtensilsCrossed, gradient: 'text-[#ff0055] border-[#ff0055]' },
    beauty: { icon: Heart, gradient: 'text-[#ff0055] border-[#ff0055]' },
    fitness: { icon: Dumbbell, gradient: 'text-[#00ff66] border-[#00ff66]' },
    courier: { icon: Truck, gradient: 'text-[#00f0ff] border-[#00f0ff]' },
    other: { icon: MoreHorizontal, gradient: 'text-[#e2e8f0] border-[#e2e8f0]' },
}

function CategoryCard({ categoryKey, icon: Icon, gradient }: CategoryCardProps) {
    const { t } = useLanguage()

    return (
        <Link
            href={`/search?category=${categoryKey}`}
            className="group card flex flex-col items-center justify-center p-6 hover:bg-[#1a1a2e] transition-all"
        >
            <div className={`w-16 h-16 border-2 ${gradient} bg-black flex items-center justify-center mb-4 shadow-[4px_4px_0_rgba(255,255,255,0.2)] group-hover:shadow-[4px_4px_0_currentColor] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all`}>
                <Icon className={gradient.split(' ')[0]} size={32} />
            </div>
            <h3 className={`font-bold text-center uppercase tracking-wider text-sm ${gradient.split(' ')[0]} group-hover:text-white transition-colors`}>
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
