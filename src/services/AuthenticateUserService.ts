import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

import { compare } from "bcryptjs";

import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {


    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Email existe? 
        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/password incorrect!");
        }

        //Senha coincide ?
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/password incorrect!");
        }

        //Gerar token
        const token = sign({
            email: user.email
        }, "fa0fe15798496ebaaa99620c4dc93a86",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;
    }
}

export { AuthenticateUserService }