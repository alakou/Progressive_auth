import { RegisterSchemaInput } from "@/lib/auth.schema.js";
import { IAuthRepository } from "../domain/auth.repository.js";

export class AuthRegister {
    constructor(private readonly authRepo: IAuthRepository) {}
    async exec(input: RegisterSchemaInput): Promise<void> {
        return this.authRepo.register(input)
    }
}