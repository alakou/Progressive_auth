import { CreateUserInput } from "@/lib/user.shema.js";
import { IUserRepository } from "../domain/User.repository.js";
import { UserEntity } from "../domain/User.js";

export class CreateUserUC {
    constructor(private readonly userRepo: IUserRepository) { }
    async execute(data: CreateUserInput): Promise<UserEntity> {
        return this.userRepo.createUser(data)
    }
}