import { Router } from "express";
import { PrismaAirportRepository } from "./infrastructure/prisma/PrismaAirportRepository.js";

import { GetAllAirportsUseCase } from "./application/use-cases/GetAllAirportsUseCase.js";
import { GetAirportByIdUseCase } from "./application/use-cases/GetAirportByIdUseCase.js";
import { CreateAirportUseCase } from "./application/use-cases/CreateAirportUseCase.js";
import { UpdateAirportUseCase } from "./application/use-cases/UpdateAirportUseCase.js";
import { DeleteAirportUseCase } from "./application/use-cases/DeleteAirportUseCase.js";

import { AirportController } from "./presentation/http/AirportController.js";
import { configureAirportRoutes } from "./presentation/http/airport.routes.js";

export function initAirporModule(): Router { 

    // Infrastructure
    const prismaAirportRepo = new PrismaAirportRepository()

    // Application (Use Cases)
    const getAllAirportsUseCase = new GetAllAirportsUseCase(prismaAirportRepo);
    const getAirportByIdUseCase = new GetAirportByIdUseCase(prismaAirportRepo);
    const createAirportUseCase = new CreateAirportUseCase(prismaAirportRepo);
    const updateAirportUseCase = new UpdateAirportUseCase(prismaAirportRepo);
    const deleteAirportUseCase = new DeleteAirportUseCase(prismaAirportRepo);

    const controller = new AirportController(getAllAirportsUseCase, getAirportByIdUseCase, createAirportUseCase, updateAirportUseCase, deleteAirportUseCase)

    return configureAirportRoutes(controller)
} 