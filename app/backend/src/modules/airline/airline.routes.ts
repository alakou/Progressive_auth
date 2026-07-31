import { asyncHandler } from "@/middlewares/asyncHandler.js";
import { AirlineController } from "./airline.controller.js";
import { Router } from "express";

export function configAirlineRoutes(ctrl: AirlineController): Router {
    const route = Router()

    route.get("/", asyncHandler(ctrl.getAllAirline))
    route.get("/:id", asyncHandler(ctrl.getAirlineById))
    route.post("/", asyncHandler(ctrl.createAirline))
    route.put("/:id", asyncHandler(ctrl.updateAirline))
    route.delete("/:id", asyncHandler(ctrl.removeAirline))

    return route
}