import { NextFunction, Request, Response, RequestHandler } from "express";


export const asyncHandler = (fn: RequestHandler) => {
    // s'execute à chaque execution d'un controlleur ou d'une requete
    return (req: Request, res: Response, next: NextFunction) => {
        const controllerFn = fn(req, res, next)
        const promise = Promise.resolve(controllerFn)

        return promise.catch((err) => next(err))
        // return Promise.resolve(fn(req, res, next)).catch(err => next(err))
    }
}