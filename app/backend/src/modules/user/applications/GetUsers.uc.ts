// import { User } from "../domain/User.js";
import { IUserRepository } from "../domain/User.repository.js";
import { UserEntity } from "../domain/User.js";

export class GetUsersUC {
    constructor(private readonly userRepo: IUserRepository) { }
    async execute(): Promise<UserEntity[]> {
        return this.userRepo.readUsers()
    }
}