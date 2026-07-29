import { AirlineService } from "./airline.service.js";
import { AirlineDTO, UpdateAirlinetDTO } from "./airline.types.js";
import { Request, Response } from "express";

export class AirlineController {
    private readonly airlineService: AirlineService
    constructor(airlineService: AirlineService) {
        this.airlineService = airlineService
    }

    getAllAirline = async (_req: Request, res: Response): Promise<void> => {
        const data = await this.airlineService.getAllAirlines()
        res.status(200).json(data)
    }

    getAirlineById = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id.toString()
        try {
            const data = await this.airlineService.getAirlineById(id)
            res.status(200).json(data)
        } catch (err) {
            res.status(501).json({ msg: (err as Error).message })
        }
    }

    createAirline = async (req: Request, res: Response): Promise<void> => {
        const body: AirlineDTO = req.body
        try {
            const data = await this.airlineService.createAirline(body)
            res.status(201).json(data)
        } catch (err) {
            res.status(501).json({ msg: (err as Error).message })
        }
    }

    updateAirline = async (req: Request, res: Response): Promise<void> => {
        const body: UpdateAirlinetDTO = req.body
        const id = req.params.id.toString()
        try {
            const data = await this.airlineService.updateAirline(id, body)
            res.status(201).json(data)
        } catch (err) {
            res.status(501).json({ msg: (err as Error).message })
        }
    }

    removeAirline = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id.toString()
        try {
            await this.airlineService.removeAirline(id)
            res.status(200).send({ msg: "Remove is success" })

        } catch (err) {
            res.status(501).json({ msg: (err as Error).message })
        }
    }
}