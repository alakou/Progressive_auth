import { Router } from "express";
import { AirlineController } from "./Airline.controller.js";
import { asyncHandler } from "@/middlewares/asyncHandler.js";
import { CreateAirlineSchema, UpdateAirlineSchema } from "@/lib/airline.shema.js";
import { validateBodyMiddleware } from "@/middlewares/validatedInput.js";


export function AirlineConfigRoutes(controller: AirlineController): Router {
    const route = Router()

    route.get("/", asyncHandler(controller.get))
    route.get("/:id", asyncHandler(controller.getById))
    route.post("/", validateBodyMiddleware(CreateAirlineSchema), asyncHandler(controller.post))
    route.put("/:id", validateBodyMiddleware(UpdateAirlineSchema), asyncHandler(controller.put))
    route.delete("/:id", asyncHandler(controller.delete))

    return route
}