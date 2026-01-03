'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'
import { useAuth } from '@/lib/AuthContext'
import { supabase, User, Service, ServiceItem, Review } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import StarRating from '@/components/StarRating'
import { categoryIcons } from '@/components/CategoryGrid'
import {
    MapPin, Phone, CreditCard, Calendar, Clock, Edit2, Plus,
    ChevronRight, Star, MessageCircle
} from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

interface PageProps {
    params: Promise<{ id: string }>
}

export default function ProfilePage({ params }: PageProps) {
    const { id } = use(params)
    const { t, language } = useLanguage()
    const { user: currentUser } = useAuth()
    const router = useRouter()

    const [profile, setProfile] = useState<User | null>(null)
    const [services, setServices] = useState<(Service & { items: ServiceItem[] })[]>([])
    const [reviews, setReviews] = useState<(Review & { from_user: User })[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
    const [showBooking, setShowBooking] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [averageRating, setAverageRating] = useState(0)

    const isOwnProfile = currentUser?.id === id

    useEffect(() => {
        fetchProfile()
    }, [id])

    const fetchProfile = async () => {
        setLoading(true)

        // Fetch user profile
        const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single()

        if (userData) {
            setProfile(userData)

            // Fetch services with items
            const { data: servicesData } = await supabase
                .from('services')
                .select(`
          *,
          items:service_items (*)
        `)
                .eq('user_id', id)
                .eq('is_active', true)

            if (servicesData) {
                setServices(servicesData)
            }

            // Fetch reviews
            const { data: reviewsData } = await supabase
                .from('reviews')
                .select(`
          *,
          from_user:users!from_user_id (*)
        `)
                .eq('to_user_id', id)
                .order('created_at', { ascending: false })

            if (reviewsData) {
                setReviews(reviewsData)
                if (reviewsData.length > 0) {
                    const avg = reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length
                    setAverageRating(avg)
                }
            }
        }

        setLoading(false)
    }

    const handleBookService = async () => {
        if (!currentUser) {
            router.push('/auth/login')
            return
        }

        if (!selectedService || !selectedDate || !selectedTime) return

        // Create order
        const { data: order, error } = await supabase
            .from('orders')
            .insert({
                client_id: currentUser.id,
                provider_id: id,
                service_item_id: selectedService.id,
                scheduled_date: selectedDate,
                scheduled_time: selectedTime,
                price: selectedService.price,
                status: 'PENDING'
            })
            .select()
            .single()

        if (!error && order) {
            router.push(`/chat/${order.id}`)
        }
    }

    // Generate time slots
    const timeSlots = []
    for (let h = 8; h <= 20; h++) {
        timeSlots.push(`${h.toString().padStart(2, '0')}:00`)
        timeSlots.push(`${h.toString().padStart(2, '0')}:30`)
    }

    // Generate next 14 days for calendar
    const dates = []
    for (let i = 0; i < 14; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)
        dates.push(date.toISOString().split('T')[0])
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-48 bg-gray-200 rounded-2xl" />
                        <div className="h-32 bg-gray-200 rounded-2xl" />
                        <div className="h-64 bg-gray-200 rounded-2xl" />
                    </div>
                </div>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Foydalanuvchi topilmadi</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                    {/* Cover */}
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500" />

                    {/* Profile info */}
                    <div className="px-6 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
                            {/* Avatar */}
                            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
                                {profile.avatar ? (
                                    <img
                                        src={profile.avatar}
                                        alt={profile.name}
                                        className="w-full h-full rounded-xl object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                                        {profile.name?.[0]?.toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {profile.name} {profile.surname}
                                </h1>
                                <div className="flex items-center gap-4 mt-1 text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Star className="text-yellow-500 fill-yellow-500" size={16} />
                                        <span className="font-medium">{averageRating.toFixed(1)}</span>
                                        <span>({reviews.length} {t('profile.reviews').toLowerCase()})</span>
                                    </div>
                                    {profile.role === 'PROVIDER' && (
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full text-sm">
                                            {t('auth.provider')}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {isOwnProfile && (
                                <Link
                                    href="/profile/edit"
                                    className="btn-secondary flex items-center gap-2"
                                >
                                    <Edit2 size={18} />
                                    {t('profile.editProfile')}
                                </Link>
                            )}
                        </div>

                        {/* Contact info */}
                        <div className="grid sm:grid-cols-2 gap-4 mt-6">
                            {profile.address && (
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                        <MapPin className="text-blue-600" size={20} />
                                    </div>
                                    <span>{profile.address}</span>
                                </div>
                            )}
                            {profile.phone && (
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                                        <Phone className="text-green-600" size={20} />
                                    </div>
                                    <span>{profile.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Services */}
                {profile.role === 'PROVIDER' && services.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">{t('profile.services')}</h2>
                            {isOwnProfile && (
                                <Link href="/profile/services/add" className="text-blue-600 hover:underline flex items-center gap-1">
                                    <Plus size={18} />
                                    {t('profile.addService')}
                                </Link>
                            )}
                        </div>

                        <div className="space-y-4">
                            {services.map(service => (
                                <div key={service.id} className="border border-gray-100 rounded-2xl p-4">
                                    <div className="flex items-center gap-3 mb-3">
                                        {categoryIcons[service.category_id] && (
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryIcons[service.category_id].gradient} flex items-center justify-center`}>
                                                {(() => {
                                                    const Icon = categoryIcons[service.category_id].icon
                                                    return <Icon className="text-white" size={20} />
                                                })()}
                                            </div>
                                        )}
                                        <h3 className="font-semibold text-gray-900">
                                            {t(`categories.${service.category_id}`)}
                                        </h3>
                                    </div>

                                    <div className="space-y-2">
                                        {service.items.map(item => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                                                onClick={() => {
                                                    setSelectedService(item)
                                                    setShowBooking(true)
                                                }}
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {language === 'uz' ? item.name_uz : item.name_ru}
                                                    </p>
                                                    {(language === 'uz' ? item.description_uz : item.description_ru) && (
                                                        <p className="text-sm text-gray-500">
                                                            {language === 'uz' ? item.description_uz : item.description_ru}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-blue-600">
                                                        {item.price.toLocaleString()} {t('service.sum')}
                                                    </span>
                                                    <ChevronRight className="text-gray-400" size={20} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Map */}
                {profile.latitude && profile.longitude && (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('profile.workAddress')}</h2>
                        <Map
                            center={[profile.latitude, profile.longitude]}
                            zoom={15}
                            providers={[profile]}
                        />
                    </div>
                )}

                {/* Reviews */}
                {reviews.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            {t('profile.reviews')} ({reviews.length})
                        </h2>

                        <div className="space-y-4">
                            {reviews.map(review => (
                                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            {review.from_user?.name?.[0]?.toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {review.from_user?.name} {review.from_user?.surname}
                                            </p>
                                            <StarRating rating={review.rating} size="sm" />
                                        </div>
                                    </div>
                                    {review.comment && (
                                        <p className="text-gray-600 ml-13">{review.comment}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Booking Modal */}
            {showBooking && selectedService && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 animate-fade-in">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('order.newOrder')}</h2>

                        {/* Selected service */}
                        <div className="bg-blue-50 rounded-xl p-4 mb-6">
                            <p className="font-medium text-gray-900">
                                {language === 'uz' ? selectedService.name_uz : selectedService.name_ru}
                            </p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">
                                {selectedService.price.toLocaleString()} {t('service.sum')}
                            </p>
                        </div>

                        {/* Date selection */}
                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                                <Calendar size={18} />
                                {t('order.selectDate')}
                            </label>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {dates.map(date => {
                                    const d = new Date(date)
                                    const dayName = d.toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU', { weekday: 'short' })
                                    const dayNum = d.getDate()

                                    return (
                                        <button
                                            key={date}
                                            onClick={() => setSelectedDate(date)}
                                            className={`flex-shrink-0 w-14 py-2 rounded-xl text-center transition-colors ${selectedDate === date
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <div className="text-xs">{dayName}</div>
                                            <div className="text-lg font-bold">{dayNum}</div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Time selection */}
                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                                <Clock size={18} />
                                {t('order.selectTime')}
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {timeSlots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-2 rounded-xl text-sm font-medium transition-colors ${selectedTime === time
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowBooking(false)}
                                className="flex-1 btn-secondary"
                            >
                                {t('profile.cancel')}
                            </button>
                            <button
                                onClick={handleBookService}
                                disabled={!selectedDate || !selectedTime}
                                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <MessageCircle size={18} />
                                {t('order.confirmOrder')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
