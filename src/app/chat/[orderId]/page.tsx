'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'
import { useAuth } from '@/lib/AuthContext'
import { supabase, Message, Order, User } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import {
    Send, Image as ImageIcon, Mic, MapPin, X, Check,
    Phone, ArrowLeft, MoreVertical, Square
} from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), { ssr: false })

interface PageProps {
    params: Promise<{ orderId: string }>
}

export default function ChatPage({ params }: PageProps) {
    const { orderId } = use(params)
    const { t, language } = useLanguage()
    const { user } = useAuth()
    const router = useRouter()

    const [order, setOrder] = useState<Order | null>(null)
    const [otherUser, setOtherUser] = useState<User | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [sending, setSending] = useState(false)
    const [showLocationPicker, setShowLocationPicker] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        if (!user) {
            router.push('/auth/login')
            return
        }
        fetchChat()

        // Subscribe to new messages
        const subscription = supabase
            .channel(`order-${orderId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `order_id=eq.${orderId}`
            }, (payload) => {
                setMessages(prev => [...prev, payload.new as Message])
            })
            .subscribe()

        return () => {
            subscription.unsubscribe()
        }
    }, [orderId, user])

    const fetchChat = async () => {
        setLoading(true)

        // Fetch order with users
        const { data: orderData } = await supabase
            .from('orders')
            .select(`
        *,
        client:users!client_id (*),
        provider:users!provider_id (*),
        service_item:service_items (*)
      `)
            .eq('id', orderId)
            .single()

        if (orderData) {
            setOrder(orderData)
            // Determine the other user
            const other = orderData.client_id === user?.id ? orderData.provider : orderData.client
            setOtherUser(other)
        }

        // Fetch messages
        const { data: messagesData } = await supabase
            .from('messages')
            .select('*')
            .eq('order_id', orderId)
            .order('created_at', { ascending: true })

        if (messagesData) {
            setMessages(messagesData)
        }

        setLoading(false)
    }

    const sendMessage = async (content: string, type: 'TEXT' | 'IMAGE' | 'VOICE' | 'LOCATION' = 'TEXT') => {
        if (!content.trim() || !user) return

        setSending(true)

        const { error } = await supabase
            .from('messages')
            .insert({
                order_id: orderId,
                sender_id: user.id,
                content,
                type
            })

        if (!error) {
            setNewMessage('')
        }

        setSending(false)
    }

    const handleSendText = (e: React.FormEvent) => {
        e.preventDefault()
        sendMessage(newMessage)
    }

    const handleLocationSelect = (lat: number, lng: number) => {
        const locationUrl = `https://www.google.com/maps?q=${lat},${lng}`
        sendMessage(locationUrl, 'LOCATION')
        setShowLocationPicker(false)
    }

    const handleCancelOrder = async () => {
        if (!confirm(language === 'uz' ? 'Buyurtmani bekor qilmoqchimisiz?' : 'Отменить заказ?')) return

        await supabase
            .from('orders')
            .update({ status: 'CANCELLED' })
            .eq('id', orderId)

        fetchChat()
    }

    const handleCompleteOrder = async () => {
        if (!confirm(language === 'uz' ? 'Buyurtmani yakunlashni tasdiqlaysizmi?' : 'Подтвердить завершение?')) return

        await supabase
            .from('orders')
            .update({ status: 'COMPLETED' })
            .eq('id', orderId)

        // Redirect to review page
        router.push(`/review/${orderId}`)
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString(language === 'uz' ? 'uz-UZ' : 'ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-700'
            case 'ACCEPTED': return 'bg-blue-100 text-blue-700'
            case 'IN_PROGRESS': return 'bg-purple-100 text-purple-700'
            case 'COMPLETED': return 'bg-green-100 text-green-700'
            case 'CANCELLED': return 'bg-red-100 text-red-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-2xl mx-auto px-4 py-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-16 bg-gray-200 rounded-xl" />
                        <div className="h-96 bg-gray-200 rounded-xl" />
                    </div>
                </div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Buyurtma topilmadi</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/orders" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                                <ArrowLeft size={24} />
                            </Link>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                    {otherUser?.name?.[0]?.toUpperCase()}
                                </div>
                                <div>
                                    <h1 className="font-semibold text-gray-900">
                                        {otherUser?.name} {otherUser?.surname}
                                    </h1>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                                        {t(`order.${order.status.toLowerCase()}`)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {otherUser?.phone && (
                                <a href={`tel:${otherUser.phone}`} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Phone size={20} className="text-gray-600" />
                                </a>
                            )}
                            <div className="relative">
                                <button
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <MoreVertical size={20} className="text-gray-600" />
                                </button>

                                {showMenu && (
                                    <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 py-1 w-48 animate-fade-in">
                                        <Link
                                            href={`/profile/${otherUser?.id}`}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                                        >
                                            Profilni ko'rish
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order actions */}
                    {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={handleCancelOrder}
                                className="flex-1 py-2 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <X size={18} />
                                {t('order.cancelOrder')}
                            </button>
                            <button
                                onClick={handleCompleteOrder}
                                className="flex-1 py-2 bg-green-50 text-green-600 rounded-xl font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                            >
                                <Check size={18} />
                                {t('order.completeOrder')}
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
                {/* Order info card */}
                <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                    <p className="text-sm text-blue-600 mb-1">{t('order.orderDetails')}</p>
                    <p className="font-semibold text-gray-900">
                        {(order as Order & { service_item?: { name_uz: string, name_ru: string } }).service_item &&
                            (language === 'uz'
                                ? (order as Order & { service_item: { name_uz: string } }).service_item.name_uz
                                : (order as Order & { service_item: { name_ru: string } }).service_item.name_ru
                            )
                        }
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-1">
                        {order.price.toLocaleString()} {t('service.sum')}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        📅 {new Date(order.scheduled_date).toLocaleDateString()} ⏰ {order.scheduled_time}
                    </p>
                </div>

                {/* Message list */}
                <div className="space-y-3">
                    {messages.map((message) => {
                        const isOwn = message.sender_id === user?.id

                        return (
                            <div
                                key={message.id}
                                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${isOwn
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm'
                                            : 'bg-white text-gray-900 rounded-bl-sm border border-gray-100'
                                        }`}
                                >
                                    {message.type === 'LOCATION' ? (
                                        <a
                                            href={message.content}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 ${isOwn ? 'text-blue-100 hover:text-white' : 'text-blue-600 hover:text-blue-700'}`}
                                        >
                                            <MapPin size={18} />
                                            <span className="underline">{t('order.viewLocation')}</span>
                                        </a>
                                    ) : message.type === 'IMAGE' ? (
                                        <img
                                            src={message.content}
                                            alt="Image"
                                            className="rounded-xl max-w-full"
                                        />
                                    ) : (
                                        <p>{message.content}</p>
                                    )}
                                    <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-400'}`}>
                                        {formatTime(message.created_at)}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Input area */}
            {order.status !== 'COMPLETED' && order.status !== 'CANCELLED' && (
                <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
                    <div className="max-w-2xl mx-auto">
                        <form onSubmit={handleSendText} className="flex items-center gap-2">
                            {/* Image upload */}
                            <button
                                type="button"
                                className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            >
                                <ImageIcon size={22} />
                            </button>

                            {/* Location */}
                            <button
                                type="button"
                                onClick={() => setShowLocationPicker(true)}
                                className="p-3 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            >
                                <MapPin size={22} />
                            </button>

                            {/* Voice */}
                            <button
                                type="button"
                                onMouseDown={() => setIsRecording(true)}
                                onMouseUp={() => setIsRecording(false)}
                                className={`p-3 rounded-full transition-colors ${isRecording
                                        ? 'bg-red-500 text-white'
                                        : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                                    }`}
                            >
                                {isRecording ? <Square size={22} /> : <Mic size={22} />}
                            </button>

                            {/* Text input */}
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder={t('chat.typeMessage')}
                                className="flex-1 input"
                            />

                            {/* Send */}
                            <button
                                type="submit"
                                disabled={!newMessage.trim() || sending}
                                className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                <Send size={22} />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Location Picker Modal */}
            {showLocationPicker && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">{t('order.shareLocation')}</h2>
                            <button
                                onClick={() => setShowLocationPicker(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-gray-500 mb-4">Xaritadan joyni tanlang</p>
                        <Map
                            selectable
                            onLocationSelect={handleLocationSelect}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
