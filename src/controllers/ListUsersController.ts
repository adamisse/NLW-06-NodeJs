import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersServices";

class ListUsersController {
    async handle(request: Request, response: Response){
        const listUsersService = new ListUsersService();

        const users = await listUsersService.execute(request.user_id);

        return response.json(users);
    }
}

export { ListUsersController }