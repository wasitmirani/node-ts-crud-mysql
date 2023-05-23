import { error } from "console";
import { Auth } from "../models/Auth";
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import{validate} from "../helper/validate";
import { helpers } from "../helper/helpers";
import { NewUser } from "../interface/NewUser";
import { User } from "../models/User";
const helper = new helpers();
const validate_= new validate();
const user = new User();




const auth = new Auth();

export class AuthController {
    
    async register(request: Request,response:Response,next: NextFunction) : Promise<Response | any> {
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
            const hashedPassword = bcrypt.hashSync( request.body.password, 10);
            request.body.uid=helper.get_uuid();
            request.body.password=hashedPassword;
            let newUser: NewUser = request.body;
           return user.create(newUser, next).then((user)=>{
            return response.status(200).json({ 'message':"user has been created successfully",user: newUser });
                }).catch((error)=>{
                    return response.status(400).json({ error: error });
            });
             
        }
        catch (e) {
            console.log(e)
        }
        
    }
    
    async dashboard(request: Request, response: Response,next:NextFunction) : Promise<Response | any>{
        const token = request.headers.authorization;

        if (!token) {
          return response.status(401).json({ message: 'No token provided' });
        }
        const jwt_secret=process.env.JWT_SECRET;
        try {
            const decoded = jwt.verify(token, jwt_secret);
            console.log(decoded);
            const userId = decoded.userId;
        
            // Fetch user data from the database based on the userId
        
            return response.status(200).json({ userId });
          } catch (error) {
            console.error('Error verifying token:', error);
            return response.status(401).json({ message: 'Invalid token' });
          }
    }
    async login(request: Request, response: Response, next: NextFunction): Promise<Response | any> {
        try {
            const email=request.body.email;
            const password=request.body.password;
            return auth.login(email).then((user)=>{
                if (user.length === 0) {
                    return response.status(401).json({ message: 'Invalid email or password' });
                }
                const user_ = user[0];
               
        
                const passwordMatch = bcrypt.compareSync(password, user_.password);
               
                if (!passwordMatch) {
                  return response.status(401).json({ message: 'Invalid email or password' });
                }
        
                // // Generate a JWT
                const token = jwt.sign({ userId: user.id }, helper.get_uuid());
        
                return response.status(200).json({'message':'User login successfully','token':token });
              //200 = Ok, 201 = Created, 202 = Accepted, 400 = Bad request, 500 = Internal server error.
            }).catch((err)=>{ 
                if (err) {
                    console.error('Error logging in:', err);
                    return response.status(500).json({ message: 'Internal server error',error:err});
                  }
            });
        }
        catch (e) {
            console.log(e)
        }
    }

}
  