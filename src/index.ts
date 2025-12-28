import { crawl } from "./crawler";
import { topicToWikipediaURL } from "./wiki";
import { resetCrawlState } from "./reset";

const args = process.argv.slice(2);

(async () => {
  if (args[0] === "crawl") {
    const topic = args.slice(1).join(" ");

    if (!topic) {
      console.error("Usage: crawl <Wikipedia Topic>");
      process.exit(1);
    }

    const url = topicToWikipediaURL(topic);

    console.log("Resetting crawl state...");
    await resetCrawlState();

    console.log(`Starting crawl from: ${url}`);
    await crawl(url, 30);

    process.exit(0);
  }
})();
