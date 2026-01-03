import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type UserRole = 'CLIENT' | 'PROVIDER'
export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type MessageType = 'TEXT' | 'IMAGE' | 'VOICE' | 'LOCATION'

export interface User {
  id: string
  email: string
  name: string
  surname: string
  phone?: string
  avatar?: string
  address?: string
  latitude?: number
  longitude?: number
  card_number?: string
  role: UserRole
  created_at: string
}

export interface Category {
  id: string
  name_uz: string
  name_ru: string
  icon: string
}

export interface Service {
  id: string
  user_id: string
  category_id: string
  description?: string
  is_active: boolean
  created_at: string
  user?: User
  category?: Category
  items?: ServiceItem[]
}

export interface ServiceItem {
  id: string
  service_id: string
  name_uz: string
  name_ru: string
  price: number
  description_uz?: string
  description_ru?: string
}

export interface Order {
  id: string
  client_id: string
  provider_id: string
  service_item_id: string
  scheduled_date: string
  scheduled_time: string
  location_link?: string
  latitude?: number
  longitude?: number
  status: OrderStatus
  price: number
  created_at: string
  client?: User
  provider?: User
  service_item?: ServiceItem
}

export interface Message {
  id: string
  order_id: string
  sender_id: string
  content: string
  type: MessageType
  created_at: string
  sender?: User
}

export interface Review {
  id: string
  order_id: string
  from_user_id: string
  to_user_id: string
  rating: number
  comment?: string
  created_at: string
  from_user?: User
  to_user?: User
}
