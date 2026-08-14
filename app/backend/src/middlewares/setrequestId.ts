import { Request, Response, NextFunction } from "express";
import crypto from "node:crypto"


export const xRequestId = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const requestId = req.header("x-request-id") ?? crypto.randomUUID()

        res.setHeader("x-request-id", requestId)
        res.locals.requestId = requestId

        next()
    }
}