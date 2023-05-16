import { connect } from "../config/mysqlconnector";


export async function query(query: string,data?:any ): Promise<Response | any>{

    const connection = await connect();
    let rows =null;
    if(data){
      rows = await connection.query(query,data);
    }
    else {
        rows = await connection.query(query);
    }
    
   
    if(rows[0]){
        connection.end();
        return rows[0];
    }
    else{
        connection.end();
       
        return rows;
    }
}