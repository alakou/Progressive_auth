import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "@/errors/AppError.js";
import { Role } from "../../generated/prisma/enums.js";

export const authorize = (...allowedRole: Role[]) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        if (!req.user || !allowedRole.includes(req.user.role as Role)) {
            throw new ForbiddenError("Rôle insuffisant pour cette action")
        }
        next()
    }
}