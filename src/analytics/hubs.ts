import { pool } from "../db";

export async function getHubTopics(limit = 10){
    const res = await pool.query(
        `SELECT 
        from_page AS url,
        COUNT(*) AS outbound_links
        FROM links
        GROUP BY from_page
        ORDER BY outbound_links DESC
        LIMIT $1`,
        [limit]
    );

    return res.rows;
}