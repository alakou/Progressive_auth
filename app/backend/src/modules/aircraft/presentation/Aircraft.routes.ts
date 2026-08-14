import { Router } from "express";
import { AircraftController } from "./Aircraft.controller.js";
import { asyncHandler } from "@/middlewares/asyncHandler.js";
import { validateBodyMiddleware } from "@/middlewares/validatedInput.js";
import { CreateAircraftSchema, UpdateAircraftSchema } from "@/lib/aircraft.shema.js";

export function AircraftConfigRoutes(controller: AircraftController): Router {
    const route = Router()

    route.get("/", asyncHandler(controller.Get))
    route.get("/:id", asyncHandler(controller.GetById))
    route.post("/", validateBodyMiddleware(CreateAircraftSchema), asyncHandler(controller.Post))
    route.put("/:id", validateBodyMiddleware(UpdateAircraftSchema), asyncHandler(controller.Put))
    route.delete("/:id", asyncHandler(controller.Delete))

    return route
}