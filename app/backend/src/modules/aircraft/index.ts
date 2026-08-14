import { Router } from "express";
import { AircraftPrismaConfig } from "./infrastructure/Aircraft.prisma.js";
import { GetAircraft } from "./application/GetAircraft.usecase.js";
import { GetAircraftById } from "./application/GetAircraftById.usecase.js";
import { CreateAircraft } from "./application/CreateAircraft.usecase.js";
import { UpdateAircraft } from "./application/UpdateAircraft.usecase.js";
import { DeleteAircraft } from "./application/DeleteAircraft.usecase.js";
import { AircraftConfigRoutes } from "./presentation/Aircraft.routes.js";
import { AircraftController } from "./presentation/Aircraft.controller.js";

export function initAircraftModule(): Router {
    const aircraftRepo = new AircraftPrismaConfig()

    const getUS = new GetAircraft(aircraftRepo)
    const getByIdUS = new GetAircraftById(aircraftRepo)
    const createUS = new CreateAircraft(aircraftRepo)
    const updateUS = new UpdateAircraft(aircraftRepo)
    const removeUs = new DeleteAircraft(aircraftRepo)

    const controller = new AircraftController(getUS, getByIdUS, createUS, updateUS, removeUs)

    return AircraftConfigRoutes(controller)

}