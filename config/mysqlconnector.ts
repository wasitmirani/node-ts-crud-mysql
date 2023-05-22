import mysql, { Pool, PoolConnection } from 'mysql';
require('dotenv').config();

const pool: Pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        connectionLimit: 10, // Adjust the connection limit as per your requirements
  });
  
  // Function to acquire a connection from the pool
  export async function getConnection(): Promise<PoolConnection> {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          reject(error);
        } else {
          resolve(connection);
        }
      });
    });
  }
  


// export async function connect(): Promise<Pool> {
//     const connection = await createPool({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USER,
//         database: process.env.DB_NAME,
//         password: process.env.DB_PASSWORD,
//         connectionLimit: 10
//     });
    
//     return connection;
// }

// const connection: Connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'your_mysql_username',
//   password: 'your_mysql_password',
//   database: 'your_database_name',
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// export default connection;