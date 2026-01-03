'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'
import { useAuth } from '@/lib/AuthContext'
import { supabase, Order, User, ServiceItem } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import { Calendar, Clock, MessageCircle, ChevronRight, Package } from 'lucide-react'
import Link from 'next/link'

type OrderWithDetails = Order & {
    client?: User
    provider?: User
    service_item?: ServiceItem
}

export default function OrdersPage() {
    const { t, language } = useLanguage()
    const { user } = useAuth()
    const router = useRouter()

    const [orders, setOrders] = useState<OrderWithDetails[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

    useEffect(() => {
        if (!user) {
            router.push('/auth/login')
            return
        }
        fetchOrders()
    }, [user])

    const fetchOrders = async () => {
        if (!user) return

        setLoading(true)

        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        client:users!client_id (*),
        provider:users!provider_id (*),
        service_item:service_items (*)
      `)
            .or(`client_id.eq.${user.id},provider_id.eq.${user.id}`)
            .order('created_at', { ascending: false })

        if (!error && data) {
            setOrders(data)
        }

        setLoading(false)
    }

    const filteredOrders = orders.filter(order => {
        if (filter === 'active') {
            return ['PENDING', 'ACCEPTED', 'IN_PROGRESS'].includes(order.status)
        }
        if (filter === 'completed') {
            return ['COMPLETED', 'CANCELLED'].includes(order.status)
        }
        return true
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
            case 'ACCEPTED': return 'bg-blue-100 text-blue-700 border-blue-200'
            case 'IN_PROGRESS': return 'bg-purple-100 text-purple-700 border-purple-200'
            case 'COMPLETED': return 'bg-green-100 text-green-700 border-green-200'
            case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200'
            default: return 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString(language === 'uz' ? 'uz-UZ' : 'ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('order.myOrders')}</h1>

                {/* Filter tabs */}
                <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100">
                    {(['all', 'active', 'completed'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-colors ${filter === f
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {f === 'all' && (language === 'uz' ? 'Barchasi' : 'Все')}
                            {f === 'active' && (language === 'uz' ? 'Faol' : 'Активные')}
                            {f === 'completed' && (language === 'uz' ? 'Tugallangan' : 'Завершенные')}
                        </button>
                    ))}
                </div>

                {/* Orders list */}
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-32 bg-white rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : filteredOrders.length > 0 ? (
                    <div className="space-y-4">
                        {filteredOrders.map(order => {
                            const isClient = order.client_id === user.id
                            const otherUser = isClient ? order.provider : order.client

                            return (
                                <Link
                                    key={order.id}
                                    href={`/chat/${order.id}`}
                                    className="block bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            {/* Avatar */}
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                                {otherUser?.name?.[0]?.toUpperCase()}
                                            </div>

                                            <div>
                                                {/* Other user name */}
                                                <h3 className="font-semibold text-gray-900">
                                                    {otherUser?.name} {otherUser?.surname}
                                                </h3>

                                                {/* Service name */}
                                                {order.service_item && (
                                                    <p className="text-gray-600 mt-0.5">
                                                        {language === 'uz' ? order.service_item.name_uz : order.service_item.name_ru}
                                                    </p>
                                                )}

                                                {/* Date & Time */}
                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        {formatDate(order.scheduled_date)}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={14} />
                                                        {order.scheduled_time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right flex-shrink-0">
                                            {/* Status */}
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                                {t(`order.${order.status.toLowerCase()}`)}
                                            </span>

                                            {/* Price */}
                                            <p className="text-lg font-bold text-blue-600 mt-2">
                                                {order.price.toLocaleString()} {t('service.sum')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Chat indicator */}
                                    <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-100 text-blue-600">
                                        <span className="flex items-center gap-1 text-sm font-medium">
                                            <MessageCircle size={16} />
                                            Chatga o'tish
                                            <ChevronRight size={16} />
                                        </span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <Package className="text-gray-400" size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {language === 'uz' ? 'Buyurtmalar yo\'q' : 'Нет заказов'}
                        </h3>
                        <p className="text-gray-500">
                            {language === 'uz'
                                ? 'Sizda hali buyurtmalar mavjud emas'
                                : 'У вас пока нет заказов'
                            }
                        </p>
                        <Link
                            href="/search"
                            className="inline-block mt-6 btn-primary"
                        >
                            {t('nav.search')}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
