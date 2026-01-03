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
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                            }`}
                    />
                </button>
            ))}
        </div>
    )
}
