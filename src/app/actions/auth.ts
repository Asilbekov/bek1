'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { UserRole } from '@prisma/client'

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    surname: z.string().min(2),
    role: z.enum(['CLIENT', 'PROVIDER']),
    phone: z.string().optional(),
})

export async function registerUser(formData: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(formData)

    if (!validatedFields.success) {
        return { error: 'Invalid fields' }
    }

    const { email, password, name, surname, role, phone } = validatedFields.data

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return { error: 'Email already in use' }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                surname,
                role: role as UserRole,
                phone,
            },
        })

        return { success: 'User created!' }
    } catch (error) {
        console.error('Registration error:', error)
        return { error: 'Something went wrong!' }
    }
}
