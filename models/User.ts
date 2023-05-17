import { Request, Response, NextFunction } from 'express';
import * as db from "../database/dbquery";
import { NewUser } from '../interface/NewUser';

export class  User {
    
    getUsers = (request: Request, response: Response, next: NextFunction) => {
        return db.query('SELECT id,name,email,phone,last_login,created_at,updated_at FROM users ORDER BY id desc').then((rows) => {
         return   response.status(200).json(rows);
        });
    }  // end getUsers method

        
    store=(user: NewUser, response: Response, next: NextFunction)=> {
        let body=user;
        // let query= `INSERT INTO users (name,email,password,phone) VALUES(${data.name},${data.email},${data.password},${data.phone});`;
        let query="INSERT INTO users SET ?";
        return db.query(query,[user]).then((data) => {
            return   response.status(200).json({'message':'user has been created successfully','status' : true,'data':body});
        });
           
    } // end store method   
    
    find=(id:string,response:Response,next:NextFunction)=>{ 
       let query="select * from users where id ="+id;
       return db.query(query).then((data) => {
            return   response.status(200).json({'status' : true,'user':data});
        });
    }
    
    delete=(id:string,response:Response,next:NextFunction)=>{
        let query="select * from users where id ="+id;
        return db.query(query).then((data) => {
             return   response.status(200).json({'status' : true,'user':data});
         });
    
    }
}