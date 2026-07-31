import { Request, Response } from "express";
import { CreateAirportDTO, UpdateAirportDTO } from "./airport.types.js";
import { AirportService } from "./airport.service.js";

export class AirportController {
    private readonly airportService: AirportService

    constructor(airportService: AirportService) {
        this.airportService = airportService
    }

    getAllAirport = async (_req: Request, res: Response): Promise<void> => {
        const data = await this.airportService.getAllAirport()
        res.status(200).json(data)
    }

    getAirportById = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id.toString()
        const airport = await this.airportService.getAirportById(id)
        res.status(200).json(airport)
    }

    createNewAiport = async (req: Request, res: Response): Promise<void> => {
        const body: CreateAirportDTO = req.body
        const airport = await this.airportService.createNewAiport(body)
        res.status(200).json(airport)

    }

    updateExistingAiport = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id.toString()
        const body: UpdateAirportDTO = req.body
        const airport = await this.airportService.updateExistingAiport(id, body)
        res.status(200).json(airport)


    }

    removeUniqueAirport = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id.toString()
        await this.airportService.removeUniqueAirport(id)
        res.status(200).send({ msg: "Remove is success" })

    }

}