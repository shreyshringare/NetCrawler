import axios from "axios";
import { pool } from "./db";
import { parseHTML } from "./parser";
import { enqueue, getNextURL } from "./queue";
import { isMajorWikipediaPage } from "./wikiFilter";

export async function crawl(seedUrl: string, maxPages = 20) {
  await enqueue(seedUrl);

  let crawled = 0;

  while (crawled < maxPages) {
    const url = await getNextURL();
    if (!url) break;

    try {
      console.log(`[FETCH] ${url}`);

      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          "User-Agent": "ResumeCrawler/1.0"
        }
      });

      const { title, text, links } = parseHTML(response.data, url);

      await pool.query(
        `INSERT INTO pages (url, title, html, text_content, status_code)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (url) DO NOTHING`,
        [url, title, response.data, text, response.status]
      );

      // 2️⃣ STORE RELATIONSHIPS (THIS IS NEW)
      for (const link of links) {
        if (isMajorWikipediaPage(link)) {

          // enqueue future crawl
          await enqueue(link);

          // store graph edge: url → link
          await pool.query(
            `INSERT INTO links (from_page, to_page)
             VALUES ($1, $2)
             ON CONFLICT DO NOTHING`,
            [url, link]
          );
        }
      }

      crawled++;
    } catch (err) {
      console.error(`[ERROR] ${url}`);
    }
  }

  console.log(`Crawl finished. Pages crawled: ${crawled}`);
}
