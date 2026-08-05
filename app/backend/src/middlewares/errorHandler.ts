import { Request, Response } from "express";
import { AppError } from "@/errors/AppError.js";
import { Prisma } from "../../generated/prisma/client.js";
import { pino_logger } from "@/config/logger.js";


export function errorHandler(err: Error, req: Request, res: Response): void {
    if (err instanceof AppError) {
        if (!err.isOperational) {
            pino_logger.error({ err }, 'Erreur non-opérationnelle interceptée (bug in application)')
        }
        res.status(err.statusCode).json({ err: err.message, name: err.name })
        return
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                res.status(409).json({
                    status: 409,
                    code: 'UNIQUE_CONSTRAINT',
                    message: 'Un élément avec cette valeur existe déjà.',
                })
                return
            case "P2001":
            case "P2025":
                res.status(404).json({
                    code: 'NOT_FOUND',
                    message: 'La ressource demandée n’existe pas.',
                })
                return
            case "P2003":
                res.status(400).json({
                    code: 'FOREIGN_KEY_VIOLATION',
                    message: "Cette action violerait une relation avec autres données."
                })
                return
            case "P2011":
                res.status(400).json({
                    code: 'NULL_CONSTRAINT',
                    message: 'Un champ obligatoire est manquant.',
                })
                return
            case 'P2000':
            case 'P2020':
                res.status(400).json({
                    code: 'INVALID_VALUE',
                    message: 'La valeur fournie est invalide ou hors plage.',
                })
                return
            case "P2014":
                res.status(400).json({
                    code: 'RELATION_VIOLATION',
                    message: 'Cette modification violerait une relation obligatoire.'
                })
                return
            default:
                res.status(500).json({
                    code: 'PRISMA_UNKNOWN',
                    message: 'Erreur interne de base de données.'
                })
                return
        }
    }
    if (err instanceof Prisma.PrismaClientInitializationError) {
        res.status(503).json({
            code: 'DATABASE_UNAVAILABLE',
            message: 'La base de données est temporairement indisponible'
        })
        return
    }
    pino_logger.error({ err, url: req.originalUrl }, "Erreur non gérer")
    res.status(500).json({ error: 'Erreur interne du serveur' });

}
