import { load } from "cheerio";

export function parseHTML(html: string, baseUrl: string) {
  const $ = load(html);

  const title = $("title").text() || null;
  const text = $("body").text().replace(/\s+/g, " ").trim();

  const links: string[] = [];

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;

    try {
      const url = new URL(href, baseUrl);
      links.push(url.href);
    } catch {
      // ignore invalid URLs
    }
  });

  return { title, text, links };
}
