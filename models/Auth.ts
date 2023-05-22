import * as db from "../database/dbquery";

export class Auth{


    login=async (email:string)=>{
        const query = `SELECT * FROM users WHERE email = '${email}' order by id DESC LIMIT 1;`;
        const user = await db.executeQuery(query);
        return user;
    
    }

}