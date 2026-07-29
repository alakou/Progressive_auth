import { AirlineController } from "./airline.controller.js";
import { Router } from "express";

export function configAirlineRoutes(ctrl: AirlineController): Router {
    const route = Router()

    route.get("/", ctrl.getAllAirline)
    route.get("/:id", ctrl.getAirlineById)
    route.post("/", ctrl.createAirline)
    route.put("/:id", ctrl.updateAirline)
    route.delete("/:id", ctrl.removeAirline)

    return route
}