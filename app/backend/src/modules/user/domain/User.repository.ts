import { CreateUserInput, UpdateUserInput } from "@/lib/user.shema.js"
// import { User } from "./User.js"
import { UserEntity } from "./User.js"


export interface IUserRepository {
    readUsers(): Promise<UserEntity[]>
    createUser(data: CreateUserInput): Promise<UserEntity>
    updateUser(id: string, data: UpdateUserInput): Promise<UserEntity>
    deleteUser(id: string): Promise<void>

}