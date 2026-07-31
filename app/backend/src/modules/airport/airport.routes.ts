import { Router } from "express";
import { AirportController } from "./airport.controller.js";
import { asyncHandler } from "@/middlewares/asyncHandler.js";
import { createAiportShema, updateAirportInput } from "@/lib/aiport.shema.js";
import { validateBodyMiddleware } from "@/middlewares/validatedInput.js";

export function configureAirportRoutes(airportController: AirportController): Router {
    const route = Router()

    route.get("/", asyncHandler(airportController.getAllAirport))
    route.get("/:id", asyncHandler(airportController.getAirportById))
    route.post("/", validateBodyMiddleware(createAiportShema), asyncHandler(airportController.createNewAiport))
    route.put("/:id", validateBodyMiddleware(updateAirportInput), asyncHandler(airportController.updateExistingAiport))
    route.delete("/:id", asyncHandler(airportController.removeUniqueAirport))

    // route.get("/", airportController.getAllAirport)
    // route.get("/:id", airportController.getAirportById)
    // route.post("/", airportController.createNewAiport)
    // route.put("/:id", airportController.updateExistingAiport)
    // route.delete("/:id", airportController.removeUniqueAirport)
    return route
}
