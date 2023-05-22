import { Request, Response, NextFunction } from 'express';
import * as db from "../database/dbquery";
import { NewUser } from '../interface/NewUser';

export class  User {
    
    users = async ()  => {
    
        try {
            const query = 'SELECT id,name,email,phone,last_login,created_at,updated_at FROM users ORDER BY id desc';
            const users = await db.executeQuery(query);
            return users;
          } catch (error) {
            throw new Error('Error retrieving users');
          }
      
    }  // end getUsers method

        
    create=async (user: NewUser, next: NextFunction)=> {
        try {
        // let query= `INSERT INTO users (name,email,password,phone) VALUES(${data.name},${data.email},${data.password},${data.phone});`;
        let query="INSERT INTO users SET ?";
        
        const new_user = await db.executeQuery(query,[user]);
        console.log('users',new_user);
        return new_user;
        } catch (error) {
          throw new Error('Error retrieving users');
        }
        // return db.query(query,[user]).then((data) => {
        //     return   response.status(200).json({'message':'user has been created successfully','status' : true,'data':body});
        // });
           
    } // end store method   
    
    // find=(id:string,response:Response,next:NextFunction)=>{ 
    //    let query="select * from users where id ="+id+';';
    //    return db.query(query).then((data) => {
    //         return   response.status(200).json({'status' : true,'user':data});
    //     });
    // }

    // async  findUserByEmail(email: string): Promise<NewUser | any> {
    //       const query = `SELECT * FROM users WHERE email = '${email}' order by id DESC LIMIT 1;`;
    //       return db.query(query).then((data) => {
    //         const user_data = data as User;
    //         return user_data[0] ?? null;
       
    //     });
    //   }
    
    // delete=(id:string,response:Response,next:NextFunction)=>{
    //     let query="select * from users where id ="+id;
    //     return db.query(query).then((data) => {
    //          return   response.status(200).json({'status' : true,'user':data});
    //      });
    
    // }
}