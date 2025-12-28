import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config(); 

function required(name: string):string{
    const value = process.env[name];
    if(!value){
        throw new Error(`missing env variable: ${name}`);
    }
    return value;
}

export const pool = new Pool({
  host: required("DB_HOST"),
  port: Number(required("DB_PORT")),
  user: required("DB_USER"),
  password: required("DB_PASSWORD"),
  database: required("DB_NAME"),
});