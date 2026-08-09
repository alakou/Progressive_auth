import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { validateBodyMiddleware } from "@/middlewares/validatedInput.js";
import { loginSchema, refreshSchema, registerSchema } from "@/lib/auth.schema.js";
import { asyncHandler } from "@/middlewares/asyncHandler.js";
import { rateLimiterAuth } from "@/middlewares/rateLimiter.js";

export function AuthConfigRoute(authController: AuthController): Router {
    
    const route = Router()

    route.post("/register", validateBodyMiddleware(registerSchema), asyncHandler(authController.register))
    route.post("/login", rateLimiterAuth, validateBodyMiddleware(loginSchema), asyncHandler(authController.login))
    route.post("/refresh", validateBodyMiddleware(refreshSchema), asyncHandler(authController.refresh))
    route.post("/logout", validateBodyMiddleware(refreshSchema), asyncHandler(authController.logout))

    return route
}