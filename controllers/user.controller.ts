import { Request, Response, NextFunction } from 'express';
import { User } from "../models/User";
import { NewUser } from '../interface/NewUser';  
import { body, validationResult } from 'express-validator';
import { helpers } from '../helper/helpers';
import{validate} from "../helper/validate";
import { error } from 'console';
const user = new User();
const helper = new helpers();
const validate_= new validate();

export class UserController {
  
    async getUsers(request:Request,response:Response,next:NextFunction): Promise<Response | any> {
        try {
            return user.users().then((users)=>{
                return response.status(200).json({ users: users });
            }).catch((error)=>{
                return response.status(400).json({ error: error });
            });
        }
        catch (e) {
            return response.status(400).json({ error: e });
        }
    }
  
    async storeUser(request: Request, response: Response, next:NextFunction):Promise<Response | void> {
        try {
                          
            const { error } = validate_.userValidate.validate(request.body);

            if (error) {
              // Validation failed
              const errorMessage = error.details.map((detail)=>{
                console.log(detail.context?.key);
                let error=detail.context?.key;
                return detail.message;
              });
              
              return response.status(400).json({ error: errorMessage });
            }
            //  request;
            // check user is exists 
            // const is_user=await user.findUserByEmail(request.body.email);
            // if(is_user?.email && is_user!=null){
            //     return response.status(422).json({ 'message': 'The email has already been taken.' });
            // }
            
            // get uuid from helper function of uid
            request.body.uid=helper.get_uuid();
            let newUser: NewUser = request.body;
           return user.create(newUser, next).then((user)=>{
            return response.status(200).json({ 'message':"user has been created successfully",user: newUser });
                }).catch((error)=>{
                    return response.status(400).json({ error: error });
                });
             
        }
        catch (e) {
            console.log(e);
        }
    }   
    
//   async updateUser(request: Request, response: Response, next:NextFunction):Promise<Response | void>{
  
  
//   }
  
//     async findUser(request: Request, response: Response, next:NextFunction):Promise<Response | void>{
//         const id=request.params.id;
//         return user.find(id, response, next);
//     }

}

