import { LoginSchemaInput, RegisterSchemaInput } from "@/lib/auth.schema.js";
import { AuthLogin } from "../application/auth.login.js";
import { AuthRefresh } from "../application/auth.refresh.js";
import { AuthRegister } from "../application/auth.register.js";
import { Request, Response } from "express";
import { TokensType } from "../domain/auth.repository.js";
import { AuthLogout } from "../application/auth.logout.js";

export class AuthController {
    constructor(private readonly authRegister: AuthRegister,
        private readonly authLogin: AuthLogin,
        private readonly authRefresh: AuthRefresh,
        private readonly authLogout: AuthLogout,
    ) { }

    register = async (req: Request, res: Response): Promise<void> => {
        const body: RegisterSchemaInput = req.body
        const data = await this.authRegister.exec(body)
        res.status(200).json({ data: data, msg: "Utilisateur bien creé" })
    }

    login = async (req: Request, res: Response): Promise<void> => {
        const body: LoginSchemaInput = req.body
        const token: TokensType = await this.authLogin.exec(body)
        res.status(200).json({ token: token })
    }

    refresh = async (req: Request, res: Response): Promise<void> => {
        const rft: string = req.body.refreshToken
        const token: TokensType = await this.authRefresh.exec(rft)
        res.status(200).json({ token: token })
    }

    logout = async (req: Request, res: Response): Promise<void> => {
        const rft: string = req.body.refreshToken
        await this.authLogout.exec(rft)
        res.status(200).json({msg: "token is revoke success", state: "user is deconnected"})

    }
}