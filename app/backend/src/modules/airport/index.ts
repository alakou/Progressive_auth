import { Router } from "express";
import { AirportRepository } from "./airport.repository.js";
import { AirportService } from "./airport.service.js";
import { AirportController } from "./airport.controller.js";
import { configureAirportRoutes } from "./airport.routes.js";

export function setAirportRouter(): Router {

    const airportRepository = new AirportRepository()
    const airportService = new AirportService(airportRepository)
    const airportController = new AirportController(airportService)
 
    return configureAirportRoutes(airportController)
}