'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { User } from '@/lib/supabase'
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
        return <div className="h-96 bg-[#02040a] animate-pulse border-2 border-[#333]" />
    }

    return (
        <div className="h-96 overflow-hidden shadow-lg border-2 border-[#00f0ff]">
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
                            <Popup className="retro-popup">
                                <div className="min-w-[200px] p-1 font-mono">
                                    <div className="font-bold text-[#00f0ff] uppercase">
                                        {provider.name} {provider.surname}
                                    </div>
                                    {provider.address && (
                                        <p className="text-xs text-[#e2e8f0] mt-1">{provider.address}</p>
                                    )}
                                    {provider.averageRating && (
                                        <div className="flex items-center gap-1 mt-2">
                                            <span className="text-[#ffe600]">★</span>
                                            <span className="text-sm text-[#ffe600] font-bold">{provider.averageRating.toFixed(1)}</span>
                                        </div>
                                    )}
                                    <Link
                                        href={`/profile/${provider.id}`}
                                        className="block mt-3 text-center py-2 bg-[#00f0ff] text-black text-xs font-bold uppercase hovering-glitch border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
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
