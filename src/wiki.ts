export function topicToWikipediaURL(topic: string): string{
  return `https://en.wikipedia.org/wiki/${topic.trim().replace(/\s+/g, "_")}`;
}