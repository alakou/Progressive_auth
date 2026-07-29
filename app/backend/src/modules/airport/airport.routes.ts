import { Router } from "express";
import { AirportController } from "./airport.controller.js";

export function configureAirportRoutes(airportController: AirportController): Router {
    const route = Router()

    route.get("/", airportController.getAllAirport)
    route.get("/:id", airportController.getAirportById)
    route.post("/", airportController.createNewAiport)
    route.put("/:id", airportController.updateExistingAiport)
    route.delete("/:id", airportController.removeUniqueAirport)
    return route
}
