'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { SessionProvider, useSession, signOut as nextAuthSignOut, signIn as nextAuthSignIn } from 'next-auth/react'
import { UserRole } from '@prisma/client'

// Shim User type to match what app expects mostly
export interface User {
    id: string
    email: string
    name: string
    surname: string
    phone?: string
    role: UserRole
    avatar?: string
}

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<{ error: string | null }>
    signUp: (email: string, password: string, userData: any) => Promise<{ data?: any; error: string | null }>
    signOut: () => Promise<void>
    updateProfile: (data: Partial<User>) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function AuthProviderContent({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession()

    const loading = status === 'loading'

    // Transform session user to our app's User type
    const user: User | null = session?.user ? {
        id: session.user.id || '',
        email: session.user.email || '',
        name: session.user.name || '', // NextAuth puts name combined, we might need to split or adjust
        surname: '', // Session usually doesn't carry this unless customized
        // @ts-ignore
        role: session.user.role || 'CLIENT',
        // @ts-ignore
        phone: session.user.phone || '',
    } : null

    const signIn = async (email: string, password: string) => {
        try {
            const result = await nextAuthSignIn('credentials', {
                email,
                password,
                redirect: false
            })

            if (result?.error) {
                return { error: 'Invalid credentials' }
            }
            return { error: null }
        } catch (error) {
            return { error: 'Sign in failed' }
        }
    }

    const signUp = async () => {
        // Register should be handled via server action in the register page directly
        // But for compatibility with existing code calling this context function:
        return { error: 'Use register page' }
    }

    const signOut = async () => {
        await nextAuthSignOut({ callbackUrl: '/' })
    }

    const updateProfile = async () => {
        return { error: 'Not implemented yet' }
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export function AuthProvider({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <AuthProviderContent>{children}</AuthProviderContent>
        </SessionProvider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
