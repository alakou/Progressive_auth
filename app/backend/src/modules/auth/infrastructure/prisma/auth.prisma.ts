import { LoginSchemaInput, RegisterSchemaInput } from "@/lib/auth.schema.js";
import { IAuthRepository, TokensType } from "../../domain/auth.repository.js";
import * as  bcrypt from "bcrypt"
import { prisma } from "@/config/prisma.js";
import { ConflictError, UnauthorizedError } from "@/errors/AppError.js";
import { issueTokens, jwtVerifyToken } from "../../jwt/jwt.service.js";

export class UserAuthRepository implements IAuthRepository {
    async register(input: RegisterSchemaInput): Promise<void> {
        const existingUser = await prisma.user.findUnique({ where: { email: input.email } })
        if (existingUser) throw new ConflictError("Un compte existe déjà avec cet email")

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(input.password, salt)
        await prisma.$transaction(async (tx) => {
            const user = await tx.user.create(
                {
                    data:
                    {
                        email: input.email,
                        passwordHash,
                    }
                })
            await tx.profile.create({ data: { userId: user.id } })
        })
    }

    async login(input: LoginSchemaInput): Promise<TokensType> {
        const existingUser = await prisma.user.findUnique({ where: { email: input.email } })
        if (!existingUser) throw new UnauthorizedError("Email ou mot de passe incorrect")

        const passwordHash: string = existingUser.passwordHash

        const validPassword = await bcrypt.compare(input.password, passwordHash)
        if (!validPassword) throw new UnauthorizedError("Email ou mot de passe incorrect")

        return issueTokens({ userId: existingUser.id, role: existingUser.role })
    }

    async refresh(refreshToken: string): Promise<TokensType> {
        const payload = jwtVerifyToken(refreshToken)
        const user = await prisma.user.findUnique({ where: { id: payload.userId } })
        if (!user || user.refreshToken !== refreshToken) {
            throw new UnauthorizedError('Session invalide');
        }

        return issueTokens({ userId: user.id, role: user.role })
    }

    async logout(refreshToken: string): Promise<void> {
        const payload = jwtVerifyToken(refreshToken)
        const user = await prisma.user.findUnique({ where: { id: payload.userId } })
        if (!user || user.refreshToken !== refreshToken) {
            throw new UnauthorizedError('Session invalide');
        }

        await prisma.user.update({ where: { id: user.id }, data: { refreshToken: null } })

    }
}