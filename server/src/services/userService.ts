import { validate } from "class-validator";
import { LoginUser, RegisterUser } from "../models/user";
import prisma from "../prisma/client";
import bcrypt from 'bcrypt'

export async function register(registerUser: RegisterUser) {
    const errors = await validate(registerUser)
    if (errors.length > 0) {
        throw { message: 'Validation failed', errors }
    }

    try {
        const hash = await bcrypt.hash(registerUser.password, 10)
        await prisma.user.create({
            data: {
                username: registerUser.username,
                email: registerUser.email,
                hash,
            }
        })
    } catch (error) {
        throw { message: 'User already exists' }
    }
}

export async function login(loginUser: LoginUser) {
    const errors = await validate(loginUser)
    if (errors.length > 0) {
        throw { message: 'Validation failed', errors }
    }

    const user = await prisma.user.findUnique({
        where: {
            email: loginUser.email
        }
    })

    if (!user) {
        throw { message: 'User not found' }
    }

    const isMatch = await bcrypt.compare(loginUser.password, user.hash)
    if (!isMatch) {
        throw { message: 'Invalid credentials' }
    }

    return user
}