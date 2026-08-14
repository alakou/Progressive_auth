import { Router } from "express";
import { UserPrismaConfig } from "./infrastructure/user.prisma.js";
import { GetUsersUC } from "./applications/GetUsers.uc.js";
import { CreateUserUC } from "./applications/CreateUsers.uc.js";
import { UpdateUserUC } from "./applications/UpdateUser.uc.js";
import { DeleteUserUC } from "./applications/DeleteUser.uc.js";
import { UserController } from "./presentation/user.controller.js";
import { userRoutesConfigs } from "./presentation/user.routes.js";

export function initUserModule(): Router {
    const repo = new UserPrismaConfig()

    const getUsers = new GetUsersUC(repo)
    const createUser = new CreateUserUC(repo)
    const updateUser = new UpdateUserUC(repo)
    const deleteUser = new DeleteUserUC(repo)

    const controller = new UserController(getUsers, createUser, updateUser, deleteUser)

    return userRoutesConfigs(controller)
}