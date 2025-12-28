import { pool } from "../db";

export async function getGraph(limit = 300){
    const res = await pool.query(
        `SELECT from_page,to_page
        FROM links
        LIMIT $1`,
        [limit]
    );
    
    return res.rows;
}