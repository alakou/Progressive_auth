import { CreateAircraft } from "../application/CreateAircraft.usecase.js";
import { DeleteAircraft } from "../application/DeleteAircraft.usecase.js";
import { GetAircraft } from "../application/GetAircraft.usecase.js";
import { GetAircraftById } from "../application/GetAircraftById.usecase.js";
import { UpdateAircraft } from "../application/UpdateAircraft.usecase.js";
import { Request, Response } from "express";
import { CreateAircraftDTO, UpdateAircraftDTO } from "../domain/Aircraft.repository.js";


export class AircraftController {
    constructor(
        private readonly getAll: GetAircraft,
        private readonly getById: GetAircraftById,
        private readonly create: CreateAircraft,
        private readonly update: UpdateAircraft,
        private readonly remove: DeleteAircraft

    ) { }

    Get = async (_req: Request, res: Response): Promise<void> => {
        const data = await this.getAll.exec()
        res.status(200).json(data)
    }

    GetById = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id as string
        const data = await this.getById.exec(id)
        res.status(200).json(data)
    }

    Post = async (req: Request, res: Response): Promise<void> => {
        const body: CreateAircraftDTO = req.body
        body.capacity = +body.capacity
        const data = await this.create.exec(body)
        res.status(200).json(data)
    }

    Put = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id as string
        const body: UpdateAircraftDTO = req.body
        if (body.capacity) body.capacity = +body.capacity
        const data = await this.update.exec(id, body)
        res.status(200).json(data)
    }

    Delete = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id as string
        await this.remove.exec(id)
        res.status(200).json({ msg: "user deleting is ok" })
    }


}