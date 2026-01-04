'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { User } from '@prisma/client'
import Link from 'next/link'

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

interface MapProps {
    providers?: (User & { averageRating?: number })[]
    center?: [number, number]
    zoom?: number
    onLocationSelect?: (lat: number, lng: number) => void
    selectable?: boolean
}

function LocationMarker({ onLocationSelect }: { onLocationSelect?: (lat: number, lng: number) => void }) {
    const map = useMap()
    const [position, setPosition] = useState<L.LatLng | null>(null)

    useEffect(() => {
        if (!onLocationSelect) return

        map.on('click', (e) => {
            setPosition(e.latlng)
            onLocationSelect(e.latlng.lat, e.latlng.lng)
        })
    }, [map, onLocationSelect])

    return position ? (
        <Marker position={position} icon={icon}>
            <Popup className="retro-popup">Select Location</Popup>
        </Marker>
    ) : null
}

export default function Map({
    providers = [],
    center = [41.311081, 69.240562], // Tashkent
    zoom = 12,
    onLocationSelect,
    selectable = false
}: MapProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return <div className="h-96 bg-[#F5E6D3]/20 animate-pulse rounded-2xl" />
    }

    return (
        <div className="h-96 overflow-hidden shadow-xl rounded-2xl border border-[#F5E6D3]">
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Provider markers */}
                {providers.map(provider => (
                    provider.latitude && provider.longitude && (
                        <Marker
                            key={provider.id}
                            position={[provider.latitude, provider.longitude]}
                            icon={icon}
                        >
                            <Popup className="elegant-popup">
                                <div className="min-w-[200px] p-1 font-serif">
                                    <div className="font-bold text-[#2C1810]">
                                        {provider.name} {provider.surname}
                                    </div>
                                    {provider.address && (
                                        <p className="text-xs text-[#3A3A3A]/70 mt-1 font-sans">{provider.address}</p>
                                    )}
                                    {provider.averageRating && (
                                        <div className="flex items-center gap-1 mt-2">
                                            <span className="text-[#C89E7C]">★</span>
                                            <span className="text-sm text-[#2C1810] font-bold font-sans">{provider.averageRating.toFixed(1)}</span>
                                        </div>
                                    )}
                                    <Link
                                        href={`/profile/${provider.id}`}
                                        className="block mt-3 text-center py-2 bg-[#2C1810] text-white text-xs font-bold rounded-md hover:bg-[#4A2C1C] transition-colors font-sans"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}

                {/* Selectable location marker */}
                {selectable && <LocationMarker onLocationSelect={onLocationSelect} />}
            </MapContainer>
        </div>
    )
}
