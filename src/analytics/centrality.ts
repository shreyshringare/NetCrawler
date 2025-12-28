import { pool } from "../db";

export async function getTopCentralTopics(limit  = 10){
    const res = await pool.query(
        `SELECT
        to_page AS url,
        COUNT(*) AS inbount_links
        FROM links
        GROUP BY to_page
        ORDER BY inbount_links DESC
        LIMIT $1`,
        [limit]
    );
    
    return res.rows;
}