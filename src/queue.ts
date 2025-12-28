import {pool} from './db';

export async function enqueue(url: string){
    await pool.query(
        `INSERT  INTO crawl_queue (url)
        VALUES ($1)
        ON CONFLICT DO NOTHING`,
        [url]
    );
}

export async function getNextURL(): Promise<string | null>{
    const res = await pool.query(
        `UPDATE crawl_queue
        SET visited = true
        WHERE url = (
            SELECT url FROM crawl_queue
            WHERE visited = false
            LIMIT 1
        )
        RETURNING url`
    );

    return res.rows[0]?.url ?? null;
}