import { Request, Response, NextFunction } from 'express';
import { User } from "../models/User";
import { NewUser } from '../interface/NewUser';  

const user = new User();

export class UserController {
    async getUsers(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {

            return user.getUsers(request, response, next);
        }
        catch (e) {
            console.log(e)
        }
    }

    async storeUser(request: Request, response: Response, next:NextFunction):Promise<Response | void> {
        try {
            
                
            //  request;
            let newUser: NewUser = request.body;
            
            return user.store(newUser, response, next);
        }
        catch (e) {
            console.log(e)
        }
    }   

}

