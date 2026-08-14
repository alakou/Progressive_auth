import { Router } from "express";
import { UserAuthRepository } from "./infrastructure/prisma/auth.prisma.js";
import { AuthRegister } from "./application/auth.register.js";
import { AuthLogin } from "./application/auth.login.js";
import { AuthRefresh } from "./application/auth.refresh.js";
import { AuthController } from "./presentation/auth.controller.js";
import { AuthConfigRoute } from "./presentation/auth.routes.js";
import { AuthLogout } from "./application/auth.logout.js";

export function initAuthModule(): Router {
    const prismaRepo = new UserAuthRepository()

    const register = new AuthRegister(prismaRepo) 
    const login = new AuthLogin(prismaRepo)
    const refresh = new AuthRefresh(prismaRepo)
    const logout = new AuthLogout(prismaRepo)

    const controller = new AuthController(register, login, refresh, logout)

    return AuthConfigRoute(controller)
}