'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'
import { useAuth } from '@/lib/AuthContext'
import { UserRole } from '@/lib/supabase'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Briefcase, Users } from 'lucide-react'

export default function RegisterPage() {
    const { t } = useLanguage()
    const { signUp } = useAuth()
    const router = useRouter()

    const [step, setStep] = useState(1)
    const [role, setRole] = useState<UserRole | null>(null)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
        phone: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleRoleSelect = (selectedRole: UserRole) => {
        setRole(selectedRole)
        setStep(2)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Parollar mos kelmayapti')
            return
        }

        if (formData.password.length < 6) {
            setError('Parol kamida 6 ta belgidan iborat bo\'lishi kerak')
            return
        }

        setLoading(true)

        const { error } = await signUp(formData.email, formData.password, {
            name: formData.name,
            surname: formData.surname,
            phone: formData.phone,
            role: role!,
        })

        if (error) {
            setError(error)
            setLoading(false)
        } else {
            router.push('/auth/login?registered=true')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Back button */}
                <button
                    onClick={() => step === 1 ? router.push('/') : setStep(1)}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    {t('common.back')}
                </button>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                            <span className="text-white font-bold text-3xl">B</span>
                        </div>
                    </div>

                    {/* Step 1: Role Selection */}
                    {step === 1 && (
                        <>
                            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
                                {t('auth.registerTitle')}
                            </h1>
                            <p className="text-gray-500 text-center mb-8">
                                {t('auth.selectRole')}
                            </p>

                            <div className="grid gap-4">
                                {/* Client option */}
                                <button
                                    onClick={() => handleRoleSelect('CLIENT')}
                                    className="p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                            <Users className="text-blue-600 group-hover:text-white transition-colors" size={28} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-900">{t('auth.client')}</h3>
                                            <p className="text-gray-500 text-sm">Xizmat izlayapman</p>
                                        </div>
                                    </div>
                                </button>

                                {/* Provider option */}
                                <button
                                    onClick={() => handleRoleSelect('PROVIDER')}
                                    className="p-6 border-2 border-gray-100 rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all text-left group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                                            <Briefcase className="text-purple-600 group-hover:text-white transition-colors" size={28} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-900">{t('auth.provider')}</h3>
                                            <p className="text-gray-500 text-sm">Xizmat ko'rsataman</p>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            {/* Login link */}
                            <p className="mt-8 text-center text-gray-600">
                                {t('auth.hasAccount')}{' '}
                                <Link href="/auth/login" className="text-blue-600 font-medium hover:underline">
                                    {t('nav.login')}
                                </Link>
                            </p>
                        </>
                    )}

                    {/* Step 2: Registration Form */}
                    {step === 2 && (
                        <>
                            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
                                {t('auth.registerTitle')}
                            </h1>
                            <p className="text-gray-500 text-center mb-8">
                                {role === 'CLIENT' ? t('auth.client') : t('auth.provider')} sifatida
                            </p>

                            {/* Error message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name & Surname */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('auth.name')}
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="input pl-11"
                                                placeholder="Ism"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {t('auth.surname')}
                                        </label>
                                        <input
                                            type="text"
                                            name="surname"
                                            value={formData.surname}
                                            onChange={handleChange}
                                            className="input"
                                            placeholder="Familiya"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('auth.phone')}
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="input pl-11"
                                            placeholder="+998 90 123 45 67"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('auth.email')}
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="input pl-11"
                                            placeholder="email@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('auth.password')}
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="input pl-11 pr-11"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('auth.confirmPassword')}
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="input pl-11"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                                >
                                    {loading ? t('common.loading') : t('nav.register')}
                                </button>
                            </form>

                            {/* Login link */}
                            <p className="mt-6 text-center text-gray-600">
                                {t('auth.hasAccount')}{' '}
                                <Link href="/auth/login" className="text-blue-600 font-medium hover:underline">
                                    {t('nav.login')}
                                </Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
