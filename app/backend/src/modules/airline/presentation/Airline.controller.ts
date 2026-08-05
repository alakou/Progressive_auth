import { Request, Response } from "express";

import { GetAllAirline } from "../application/use-case/GetAllAirline.usecase.js";
import { GetAirlineByID } from "../application/use-case/GetAirlineByID.usecase.js";
import { CreateAirline } from "../application/use-case/CreateAirline.usecase.js";
import { UpdateAirline } from "../application/use-case/UpdateAirline.usecase.js";
import { DeleteAirline } from "../application/use-case/DeleteAirline.usecase.js";

import { CreateAirlineDTO, UpdateAirlineDTO } from "../domain/IAirlineRepository.js";


export class AirlineController {
    constructor(
        private readonly getAllAirline: GetAllAirline,
        private readonly getAirlineByID: GetAirlineByID,
        private readonly createAirline: CreateAirline,
        private readonly updateAirline: UpdateAirline,
        private readonly deleteAirline: DeleteAirline,
    ) { }

    get = async (_req: Request, res: Response): Promise<void> => {
        const data = await this.getAllAirline.exec()
        res.status(200).json(data)
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id.toString()
        const data = await this.getAirlineByID.exec(id)
        res.status(200).json(data)
    }

    post = async (req: Request, res: Response): Promise<void> => {

        const body: CreateAirlineDTO = req.body
        body.foundedIn = +body.foundedIn
        const data = await this.createAirline.exec(body)
        res.status(200).json(data)
    }

    put = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id.toString()
        const body: UpdateAirlineDTO = req.body
        const data = await this.updateAirline.exec(id, body)
        res.status(200).json(data)
    }
    delete = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id.toString()
        await this.deleteAirline.exec(id)
        res.status(200).json({ message: "Airport deleted successfully" });
    }
}