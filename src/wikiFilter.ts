export function isMajorWikipediaPage(url: string): boolean {
  // Must be a normal article URL
  if (!url.startsWith("https://en.wikipedia.org/wiki/")) return false;

  const page = url.replace("https://en.wikipedia.org/wiki/", "");

  // Block Wikipedia namespaces & meta pages
  const blockedPrefixes = [
    "Wikipedia:",
    "Wikipedia_talk:",
    "Talk:",
    "Help:",
    "Special:",
    "File:",
    "Category:",
    "Portal:",
    "Template:"
  ];

  if (blockedPrefixes.some(prefix => page.startsWith(prefix))) {
    return false;
  }

  // Block section links (#Something)
  if (url.includes("#")) return false;

  // Block action/query URLs
  if (url.includes("?")) return false;

  return true;
}
