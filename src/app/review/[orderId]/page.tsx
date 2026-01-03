'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'
import { useAuth } from '@/lib/AuthContext'
import { supabase, Order, User } from '@/lib/supabase'
import StarRating from '@/components/StarRating'
import { CheckCircle } from 'lucide-react'

interface PageProps {
    params: Promise<{ orderId: string }>
}

export default function ReviewPage({ params }: PageProps) {
    const { orderId } = use(params)
    const { t, language } = useLanguage()
    const { user } = useAuth()
    const router = useRouter()

    const [order, setOrder] = useState<Order & { client?: User, provider?: User } | null>(null)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (!user) {
            router.push('/auth/login')
            return
        }
        fetchOrder()
    }, [orderId, user])

    const fetchOrder = async () => {
        const { data } = await supabase
            .from('orders')
            .select(`
        *,
        client:users!client_id (*),
        provider:users!provider_id (*)
      `)
            .eq('id', orderId)
            .single()

        if (data) {
            setOrder(data)

            // Check if already reviewed
            const otherUserId = data.client_id === user?.id ? data.provider_id : data.client_id
            const { data: existingReview } = await supabase
                .from('reviews')
                .select('id')
                .eq('order_id', orderId)
                .eq('from_user_id', user?.id)
                .eq('to_user_id', otherUserId)
                .single()

            if (existingReview) {
                setSubmitted(true)
            }
        }

        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!order || !user || rating === 0) return

        setSubmitting(true)

        const otherUserId = order.client_id === user.id ? order.provider_id : order.client_id

        const { error } = await supabase
            .from('reviews')
            .insert({
                order_id: orderId,
                from_user_id: user.id,
                to_user_id: otherUserId,
                rating,
                comment: comment || null
            })

        if (!error) {
            setSubmitted(true)
        }

        setSubmitting(false)
    }

    const otherUser = order?.client_id === user?.id ? order?.provider : order?.client

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="animate-pulse text-gray-400">{t('common.loading')}</div>
            </div>
        )
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center animate-fade-in">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="text-green-600" size={40} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('review.thankYou')}</h1>
                    <p className="text-gray-500 mb-8">
                        {language === 'uz'
                            ? 'Sizning bahoyingiz qabul qilindi'
                            : 'Ваша оценка принята'
                        }
                    </p>
                    <button
                        onClick={() => router.push('/orders')}
                        className="btn-primary w-full"
                    >
                        {t('order.myOrders')}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full animate-fade-in">
                {/* User avatar */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4">
                        {otherUser?.name?.[0]?.toUpperCase()}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {otherUser?.name} {otherUser?.surname}
                    </h2>
                </div>

                <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    {t('review.leaveReview')}
                </h1>
                <p className="text-gray-500 text-center mb-8">
                    {language === 'uz'
                        ? 'Xizmat sifatini baholang'
                        : 'Оцените качество услуги'
                    }
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Star rating */}
                    <div className="flex flex-col items-center">
                        <p className="text-sm font-medium text-gray-700 mb-3">{t('review.yourRating')}</p>
                        <StarRating
                            rating={rating}
                            size="lg"
                            interactive
                            onRatingChange={setRating}
                        />
                    </div>

                    {/* Comment */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('review.yourComment')} ({language === 'uz' ? 'ixtiyoriy' : 'необязательно'})
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            className="input resize-none"
                            placeholder={language === 'uz'
                                ? 'Xizmat haqida fikringizni yozing...'
                                : 'Напишите ваш отзыв об услуге...'
                            }
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={rating === 0 || submitting}
                        className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? t('common.loading') : t('review.submit')}
                    </button>
                </form>

                {/* Skip */}
                <button
                    onClick={() => router.push('/orders')}
                    className="w-full mt-4 py-3 text-gray-500 hover:text-gray-700 font-medium"
                >
                    {language === 'uz' ? 'Keyinroq baholash' : 'Оценить позже'}
                </button>
            </div>
        </div>
    )
}
