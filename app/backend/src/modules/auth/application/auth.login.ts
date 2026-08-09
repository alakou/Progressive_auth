import { LoginSchemaInput } from "@/lib/auth.schema.js";
import { IAuthRepository, TokensType } from "../domain/auth.repository.js";

export class AuthLogin {
    constructor(private readonly authRepo: IAuthRepository) {}
    async exec(input: LoginSchemaInput): Promise<TokensType> {
        return this.authRepo.login(input)
    }
}