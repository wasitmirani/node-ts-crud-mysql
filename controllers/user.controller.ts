import { Request, Response, NextFunction } from 'express';
import { User } from "../models/User";
import { NewUser } from '../interface/NewUser';  
import { body, validationResult } from 'express-validator';
import { helpers } from '../helper/helpers';

const user = new User();
const helper = new helpers();

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
            // get uuid from helper function of uid
            request.body.uid=helper.get_uuid();
            let newUser: NewUser = request.body;
            return user.store(newUser, response, next);
        }
        catch (e) {
            console.log(e);
        }
    }   

}

