'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'
import { supabase, User, Service } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import ServiceCard from '@/components/ServiceCard'
import { categoryIcons } from '@/components/CategoryGrid'
import { Search, SlidersHorizontal, MapPin, X, ChevronDown } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamic import for map (client-side only)
const MapComponent = dynamic(() => import('@/components/Map'), {
    ssr: false,
    loading: () => <div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
})

function SearchContent() {
    const { t, language } = useLanguage()
    const searchParams = useSearchParams()
    const router = useRouter()

    const [query, setQuery] = useState(searchParams.get('q') || '')
    const [category, setCategory] = useState(searchParams.get('category') || '')
    const [sortBy, setSortBy] = useState('rating')
    const [showFilters, setShowFilters] = useState(false)
    const [showMap, setShowMap] = useState(false)
    const [providers, setProviders] = useState<(User & { services?: Service[], averageRating?: number, reviewCount?: number })[]>([])
    const [loading, setLoading] = useState(true)
    const [priceRange, setPriceRange] = useState({ min: '', max: '' })

    useEffect(() => {
        fetchProviders()
    }, [category, sortBy])

    const fetchProviders = async () => {
        setLoading(true)

        let queryBuilder = supabase
            .from('users')
            .select(`
        *,
        services (
          *,
          items:service_items (*)
        )
      `)
            .eq('role', 'PROVIDER')

        if (category) {
            queryBuilder = queryBuilder.eq('services.category_id', category)
        }

        const { data, error } = await queryBuilder

        if (!error && data) {
            // Filter by search query
            let filtered = data
            if (query) {
                const q = query.toLowerCase()
                filtered = data.filter(p =>
                    p.name?.toLowerCase().includes(q) ||
                    p.surname?.toLowerCase().includes(q) ||
                    p.address?.toLowerCase().includes(q)
                )
            }

            // Filter by price range
            if (priceRange.min || priceRange.max) {
                filtered = filtered.filter(p => {
                    const minPrice = p.services?.reduce((min: number, s: Service) => {
                        const serviceMin = (s as Service & { items?: { price: number }[] }).items?.reduce((m: number, item: { price: number }) => Math.min(m, item.price), Infinity) ?? Infinity
                        return Math.min(min, serviceMin)
                    }, Infinity) ?? 0

                    if (priceRange.min && minPrice < parseInt(priceRange.min)) return false
                    if (priceRange.max && minPrice > parseInt(priceRange.max)) return false
                    return true
                })
            }

            // Sort
            if (sortBy === 'price-low') {
                filtered.sort((a, b) => {
                    const aMin = a.services?.reduce((min: number, s: Service) => Math.min(min, (s as Service & { items?: { price: number }[] }).items?.[0]?.price ?? Infinity), Infinity) ?? 0
                    const bMin = b.services?.reduce((min: number, s: Service) => Math.min(min, (s as Service & { items?: { price: number }[] }).items?.[0]?.price ?? Infinity), Infinity) ?? 0
                    return aMin - bMin
                })
            } else if (sortBy === 'price-high') {
                filtered.sort((a, b) => {
                    const aMin = a.services?.reduce((min: number, s: Service) => Math.min(min, (s as Service & { items?: { price: number }[] }).items?.[0]?.price ?? Infinity), Infinity) ?? 0
                    const bMin = b.services?.reduce((min: number, s: Service) => Math.min(min, (s as Service & { items?: { price: number }[] }).items?.[0]?.price ?? Infinity), Infinity) ?? 0
                    return bMin - aMin
                })
            }

            setProviders(filtered)
        }

        setLoading(false)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        fetchProviders()
        router.push(`/search?q=${encodeURIComponent(query)}${category ? `&category=${category}` : ''}`)
    }

    const categories = Object.keys(categoryIcons)

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('search.title')}</h1>

                    <form onSubmit={handleSearch} className="flex gap-4 flex-wrap">
                        {/* Search input */}
                        <div className="relative flex-1 min-w-[280px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={t('home.searchPlaceholder')}
                                className="input pl-12 h-12"
                            />
                        </div>

                        {/* Filter button */}
                        <button
                            type="button"
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 h-12 rounded-xl border-2 transition-colors ${showFilters ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            <SlidersHorizontal size={20} />
                            {t('search.filters')}
                        </button>

                        {/* Map button */}
                        <button
                            type="button"
                            onClick={() => setShowMap(!showMap)}
                            className={`flex items-center gap-2 px-4 h-12 rounded-xl border-2 transition-colors ${showMap ? 'bg-green-50 border-green-500 text-green-600' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            <MapPin size={20} />
                            {t('search.showOnMap')}
                        </button>

                        {/* Search button */}
                        <button type="submit" className="btn-primary h-12 px-8">
                            {t('nav.search')}
                        </button>
                    </form>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">{t('search.filters')}</h3>
                            <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Category filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kategoriya
                                </label>
                                <div className="relative">
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="input appearance-none pr-10"
                                    >
                                        <option value="">Barchasi</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>
                                                {t(`categories.${cat}`)}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            {/* Sort filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('search.sortBy')}
                                </label>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="input appearance-none pr-10"
                                    >
                                        <option value="rating">{t('search.sortByRating')}</option>
                                        <option value="price-low">{t('search.lowToHigh')}</option>
                                        <option value="price-high">{t('search.highToLow')}</option>
                                        <option value="name">{t('search.sortByName')}</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                                </div>
                            </div>

                            {/* Price range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Narx oralig'i
                                </label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="number"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                        placeholder="0"
                                        className="input"
                                    />
                                    <span className="text-gray-400">—</span>
                                    <input
                                        type="number"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                        placeholder="∞"
                                        className="input"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Map View */}
                {showMap && (
                    <div className="mb-6 animate-fade-in">
                        <MapComponent
                            providers={providers.filter(p => p.latitude && p.longitude)}
                        />
                    </div>
                )}

                {/* Category Pills */}
                {!showFilters && (
                    <div className="flex gap-2 flex-wrap mb-6">
                        <button
                            onClick={() => setCategory('')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            Barchasi
                        </button>
                        {categories.slice(0, 8).map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(category === cat ? '' : cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {t(`categories.${cat}`)}
                            </button>
                        ))}
                    </div>
                )}

                {/* Results */}
                {loading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
                        ))}
                    </div>
                ) : providers.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {providers.map(provider => (
                            <ServiceCard key={provider.id} provider={provider} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <Search className="text-gray-400" size={40} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('search.noResults')}</h3>
                        <p className="text-gray-500">Boshqa kalit so'zlar bilan qidirib ko'ring</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
            <SearchContent />
        </Suspense>
    )
}
