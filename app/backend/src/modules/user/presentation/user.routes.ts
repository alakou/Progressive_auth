import { asyncHandler } from "@/middlewares/asyncHandler.js";
import { UserController } from "./user.controller.js";
import { Router } from "express";
import { validateBodyMiddleware } from "@/middlewares/validatedInput.js";
import { CreateUserSchema, UpdateUserSchema } from "@/lib/user.shema.js";
import { authenticate } from "@/middlewares/authenticate.js";
import { authorize } from "@/middlewares/authorize.js";

export function userRoutesConfigs(userController: UserController): Router {
    const route = Router()

    route.get("/", authenticate, authorize("ADMIN"), asyncHandler(userController.GET))
    route.post("/", authenticate, authorize("ADMIN"), validateBodyMiddleware(CreateUserSchema), asyncHandler(userController.POST))
    route.put("/:id", authenticate, authorize("ADMIN"), validateBodyMiddleware(UpdateUserSchema),  asyncHandler(userController.PUT))
    route.delete("/:id", authenticate, authorize("ADMIN"), asyncHandler(userController.DELETE))

    return route
}