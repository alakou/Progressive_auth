import { rateLimit, RateLimitRequestHandler } from "express-rate-limit";

export const rateLimiterGlobal: RateLimitRequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: {
        error: "Trop de requêtes, réessaie plus tard",
    },
})


export const rateLimiterAuth: RateLimitRequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: {
        error: "Trop de tentatives, réessaie dans quelques minutes",
    },
})