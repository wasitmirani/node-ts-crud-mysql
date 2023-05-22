import { error } from "console";
import { getConnection  } from "../config/mysqlconnector";

// Function to execute a MySQL query using the connection pool
export async function executeQuery(query: string, values?: any[]): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const connection = await getConnection();
      connection.query(query, values, (error, results) => {
        connection.release(); // Release the connection back to the pool
        if (error) {
            
          reject(error);
        } else {
            // console.log("result: " ,results);
          resolve(results);
          
        }
      });
    });
  }


