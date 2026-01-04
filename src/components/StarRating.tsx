'use client'

import { Star } from 'lucide-react'

interface StarRatingProps {
    rating: number
    maxRating?: number
    size?: 'sm' | 'md' | 'lg'
    interactive?: boolean
    onRatingChange?: (rating: number) => void
}

export default function StarRating({
    rating,
    maxRating = 5,
    size = 'md',
    interactive = false,
    onRatingChange
}: StarRatingProps) {
    const sizes = {
        sm: 14,
        md: 18,
        lg: 24
    }

    const handleClick = (index: number) => {
        if (interactive && onRatingChange) {
            onRatingChange(index + 1)
        }
    }

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: maxRating }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    disabled={!interactive}
                    className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
                >
                    <Star
                        size={sizes[size]}
                        className={`${i < rating
                            ? 'fill-[#C89E7C] text-[#C89E7C] drop-shadow-[0_0_2px_rgba(200,158,124,0.4)]'
                            : 'fill-[#F5E6D3] text-[#F5E6D3]'
                            }`}
                    />
                </button>
            ))}
        </div>
    )
}
