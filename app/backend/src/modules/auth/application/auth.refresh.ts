import { IAuthRepository, TokensType } from "../domain/auth.repository.js";

export class AuthRefresh {
    constructor(private readonly authRepo: IAuthRepository) {}
    async exec(refreshToken: string): Promise<TokensType> {
        return this.authRepo.refresh(refreshToken)
    }
}