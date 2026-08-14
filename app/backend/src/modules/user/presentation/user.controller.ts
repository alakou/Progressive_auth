import { Request, Response } from "express";
import { CreateUserUC } from "../applications/CreateUsers.uc.js";
import { DeleteUserUC } from "../applications/DeleteUser.uc.js";
import { GetUsersUC } from "../applications/GetUsers.uc.js";
import { UpdateUserUC } from "../applications/UpdateUser.uc.js";

export class UserController {
    constructor(
        private readonly getUserUC: GetUsersUC,
        private readonly createUserUC: CreateUserUC,
        private readonly updateUserUC: UpdateUserUC,
        private readonly deleteUserUC: DeleteUserUC
    ) { }

    GET = async (_req: Request, res: Response): Promise<void> => {
        const records = await this.getUserUC.execute()
        res.status(200).json({records})
    }

    POST = async (req: Request, res: Response): Promise<void> => {
        const body = req.body
        const record = await this.createUserUC.execute(body)
        res.status(201).json({ record })
    }

    PUT = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id as string
        const { body } = req
        const records = await this.updateUserUC.execute(id, body)
        res.status(200).json({ records })
    }

    DELETE = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id as string
        await this.deleteUserUC.execute(id)
        res.status(200).json({ msg: "user delete sucess" })
    }


}