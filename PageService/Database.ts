import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export async function getPostgresClient(queryStr:string) {
  const client = new Client({
    host: process.env.HOST!,       
    port: process.env.PORT!,             
    user: process.env.DB_USER!,       
    password: process.env.DB_PASSWORD!, 
    database: process.env.DB_NAME!,
  });
  
  await client.connect();
  const result = await client.query(queryStr);
  console.log(result.rows); 
  await client.end();
}
