import { Request, Response, NextFunction } from "express";
import { ValidationError } from "@/errors/AppError.js";
import { ZodType } from "zod";

export function validateBodyMiddleware(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body)
        if (!result.success) {
            const errorsDetails = result.error.issues
                .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
                .join(" | ")
            next(new ValidationError(errorsDetails))
            return;
        }
        req.body = result.data
        next()
    }
}