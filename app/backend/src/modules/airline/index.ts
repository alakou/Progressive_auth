import { Router } from "express";
import { AirlineController } from "./airline.controller.js";
import { AirlineService } from "./airline.service.js";
import { AirlineRepository } from "./airline.repository.js";
import { configAirlineRoutes } from "./airline.routes.js";

export function setAirlineRouter(): Router {
    const repo = new AirlineRepository()
    const service = new AirlineService(repo)
    const ctrl = new AirlineController(service)

    return configAirlineRoutes(ctrl)
}