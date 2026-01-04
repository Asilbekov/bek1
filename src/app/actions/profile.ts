'use server'

import prisma from '@/lib/prisma'

export async function getProfileData(userId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        })

        if (!user) return null

        const services = await prisma.service.findMany({
            where: { user_id: userId, is_active: true },
            include: {
                items: true
            }
        })

        const reviews = await prisma.review.findMany({
            where: { to_user_id: userId },
            include: {
                from_user: true
            },
            orderBy: { created_at: 'desc' }
        })

        return { user, services, reviews }
    } catch (error) {
        console.error('Error fetching profile:', error)
        return null
    }
}
