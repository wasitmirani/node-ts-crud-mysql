import { Auth } from "../models/Auth";
import { Request, Response, NextFunction } from 'express';



const auth = new Auth();

export class AuthController {

    async LoginUser(request: Request, response: Response, next: NextFunction): Promise<Response | any> {
        try {
            return auth.login(request, response);
        }
        catch (e) {
            console.log(e)
        }
    }

}
  