import { Request, Response, NextFunction} from "express";
import { verify} from "jsonwebtoken"

interface IPayload {
    sub: string;
}

export function ensureAuthenticated( request: Request, response: Response, next: NextFunction){

    //Receber token
    const authToken = request.headers.authorization;
    
    //Validar o token preenchido e válido
    if(!authToken){
        return response.status(401).end();
    }

    const [,token] = authToken.split(" ");

    try{
        const { sub } = verify( token, "fa0fe15798496ebaaa99620c4dc93a86") as IPayload;

        request.user_id = sub;

    } catch (err) {
        return response.status(401).end();
    }

    //Recuperar informação do user

    return next();
}