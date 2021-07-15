import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

import { classToPlain } from "class-transformer"

class ListUsersService {
    async execute(user_id){
        const usersRepositories = getCustomRepository(UsersRepositories);

        const users = await usersRepositories.find() ;

        const {admin} = await usersRepositories.findOne({
            id: user_id
        })

        if (!admin ) return classToPlain(users);
        return users;

    }
}

export {ListUsersService};