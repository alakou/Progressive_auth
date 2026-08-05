import { Router } from "express";


import { AirlineController } from "./presentation/Airline.controller.js";
import { AirlineConfigRoutes } from "./presentation/Airline.routes.js";

import { PrismaAirlineRepository } from "./infrastructure/prisma/prismaAirlineRepository.js";
import { GetAllAirline } from "./application/use-case/GetAllAirline.usecase.js";
import { GetAirlineByID } from "./application/use-case/GetAirlineByID.usecase.js";
import { CreateAirline } from "./application/use-case/CreateAirline.usecase.js";
import { UpdateAirline } from "./application/use-case/UpdateAirline.usecase.js";
import { DeleteAirline } from "./application/use-case/DeleteAirline.usecase.js";

export function initAirlineModule(): Router {

    // Infrastructure
    const prisma = new PrismaAirlineRepository()

    // Applicative
    const getAllAirlineUS = new GetAllAirline(prisma)
    const getAirlineByIdUS = new GetAirlineByID(prisma)
    const createAirlineUS = new CreateAirline(prisma)
    const updateAirlineUS = new UpdateAirline(prisma)
    const removeAirlineUS = new DeleteAirline(prisma)

    // Controller
    const controller = new AirlineController(getAllAirlineUS, getAirlineByIdUS, createAirlineUS, updateAirlineUS, removeAirlineUS)

    // Routes
    return AirlineConfigRoutes(controller)
}