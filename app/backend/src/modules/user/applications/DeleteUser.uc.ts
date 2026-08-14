import { IUserRepository } from "../domain/User.repository.js";

export class DeleteUserUC {
    constructor(private readonly userRepo: IUserRepository) { }
    async execute(id: string): Promise<void> {
        return this.userRepo.deleteUser(id)
    }
}
