import { Router } from "express";
import { AirportController } from "./AirportController.js";
import { asyncHandler } from "@/middlewares/asyncHandler.js";
import { createAiportShema, updateAirportSchema } from "@/lib/aiport.shema.js";
import { validateBodyMiddleware } from "@/middlewares/validatedInput.js";
import { authenticate } from "@/middlewares/authenticate.js";

export function configureAirportRoutes(airportController: AirportController): Router {
    const route = Router()

    route.get("/",  authenticate, asyncHandler(airportController.getAll))
    route.get("/:id", asyncHandler(airportController.getById))
    route.post("/", validateBodyMiddleware(createAiportShema), asyncHandler(airportController.create))
    route.put("/:id", validateBodyMiddleware(updateAirportSchema), asyncHandler(airportController.update))
    route.delete("/:id", asyncHandler(airportController.delete))

 
    return route
}
 