import { pool } from "./db";

export async function resetCrawlState() {
  await pool.query("TRUNCATE crawl_queue");
  await pool.query("TRUNCATE pages CASCADE");
  await pool.query("TRUNCATE links");

  console.log("Crawl state reset");
}
