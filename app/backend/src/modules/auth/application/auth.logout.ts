import { IAuthRepository } from "../domain/auth.repository.js";

export class AuthLogout {
    constructor(private readonly authRepo: IAuthRepository) {}
    async exec(refreshToken: string): Promise<void> {
        await this.authRepo.logout(refreshToken)
    }
}