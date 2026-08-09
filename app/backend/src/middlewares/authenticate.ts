import { UnauthorizedError } from "@/errors/AppError.js";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "@/config/env.js";
import { TokenPayload } from "@/modules/auth/domain/auth.repository.js";
console.log(jwt)
export interface CustomerRequest extends Request {
    user?: TokenPayload
}

export function authenticate(req: CustomerRequest, res: Response, next: NextFunction): void {
    const header = req.headers.authorization
    if(!header?.startsWith("Bearer ")) {
        throw new UnauthorizedError("Token manquant")
    }

    const token = header.split(" ")[1]

    try {
        const payload = jwt.verify(token, env.jwtAccessSecret) as TokenPayload
        req.user = payload
        next()
    } catch  {
        throw new UnauthorizedError("Token invalide ou expiré");
    }
}

