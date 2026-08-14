import jwt from "jsonwebtoken"
import { env } from "@/config/env.js"
import { RefreshTokenPayload, AccessTokenPayload, TokenPayload, TokensType } from "../domain/auth.repository.js"
import { prisma } from "@/config/prisma.js"
import { UnauthorizedError } from "@/errors/AppError.js"


export async function issueTokens(payload: TokenPayload): Promise<TokensType> {

    const accessTokenPayload: AccessTokenPayload = {
        userId: payload.userId,
        role: payload.role,
        type: "access"
    }

    const refreshTokenPayload: RefreshTokenPayload = {
        userId: payload.userId,
        type: "refresh"
    }

    const accessToken: string = jwt.sign(accessTokenPayload, env.jwtAccessSecret,
        {
            algorithm: "HS256",
            expiresIn: env.jwtAccessSecretExpiresIn as jwt.SignOptions["expiresIn"]
        })

    const refreshToken: string = jwt.sign(refreshTokenPayload, env.jwtRefreshSecret,
        {
            algorithm: "HS256",
            expiresIn: env.jwtRefreshSecretExpiresIn as jwt.SignOptions["expiresIn"]
        })

    await prisma.user.update({ where: { id: payload.userId }, data: { refreshToken } });

    return { accessToken, refreshToken }
}

export function jwtVerifyToken(refreshToken: string): RefreshTokenPayload {
    try {
        const decoded = jwt.verify(refreshToken, env.jwtRefreshSecret) as RefreshTokenPayload
        if (typeof decoded === "string" || decoded.type !== "refresh" || typeof decoded.userId !== "string") {
            throw new UnauthorizedError("Refresh token invalid")
        }
        return {
            userId: decoded.userId,
            type: "refresh"
        }
    } catch (err) {
        throw new UnauthorizedError(`${err}`)
    }
}