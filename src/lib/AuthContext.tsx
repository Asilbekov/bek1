'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase, User } from './supabase'

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<{ error: string | null }>
    signUp: (email: string, password: string, userData: Partial<User>) => Promise<{ error: string | null }>
    signOut: () => Promise<void>
    updateProfile: (data: Partial<User>) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check active session
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (session?.user) {
                const { data: userData } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single()

                setUser(userData)
            }
            setLoading(false)
        }

        checkSession()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                const { data: userData } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single()

                setUser(userData)
            } else if (event === 'SIGNED_OUT') {
                setUser(null)
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            return { error: error.message }
        }
        return { error: null }
    }

    const signUp = async (email: string, password: string, userData: Partial<User>) => {
        const { data, error } = await supabase.auth.signUp({ email, password })

        if (error) {
            return { error: error.message }
        }

        if (data.user) {
            // Create user profile
            const { error: profileError } = await supabase
                .from('users')
                .insert({
                    id: data.user.id,
                    email,
                    name: userData.name || '',
                    surname: userData.surname || '',
                    phone: userData.phone || '',
                    role: userData.role || 'CLIENT',
                })

            if (profileError) {
                return { error: profileError.message }
            }
        }

        return { error: null }
    }

    const signOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
    }

    const updateProfile = async (data: Partial<User>) => {
        if (!user) return { error: 'Not authenticated' }

        const { error } = await supabase
            .from('users')
            .update(data)
            .eq('id', user.id)

        if (!error) {
            setUser({ ...user, ...data })
        }

        return { error: error?.message || null }
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
