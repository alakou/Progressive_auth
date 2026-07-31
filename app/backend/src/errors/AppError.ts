
export class AppError extends Error {
    public readonly statusCode: number
    public readonly isOperational: boolean
    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true

        Object.setPrototypeOf(this, new.target.prototype)
        //  Génère une stack trace propre, qui ne montre pas l’intérieur du constructeur, pour des logs plus lisibles.
        Error.captureStackTrace(this, this.constructor)
    }
}

export class NotFoundPage extends AppError {
    constructor(res: string = "Ressource") {
        super(404, `${res} not found`)
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(409, message)
    }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(422, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Non authentifié') {
    super(401, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Accès refusé') {
    super(403, message);
  }
}