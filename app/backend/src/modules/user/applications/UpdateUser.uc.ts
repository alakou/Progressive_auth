import { UpdateUserInput } from "@/lib/user.shema.js";
import { IUserRepository } from "../domain/User.repository.js";
import { UserEntity } from "../domain/User.js";

export class UpdateUserUC {
    constructor(private readonly userRepo: IUserRepository) { }
    async execute(id: string, data: UpdateUserInput): Promise<UserEntity> {
        return this.userRepo.updateUser(id, data)
    }
}
