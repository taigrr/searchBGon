import assert from "node:assert/strict";
import { isSearchURL } from "./searchMatcher.mjs";

const positives = [
  "https://www.google.com/search?q=openclaw",
  "https://www.google.co.uk/search?q=clawd",
  "https://duckduckgo.com/?q=ai+assistant",
  "https://www.bing.com/search?q=signal",
  "https://search.yahoo.com/search?p=wallace",
  "https://search.brave.com/search?q=repo",
  "https://www.ecosia.org/search?q=trees",
  "https://www.startpage.com/search?query=privacy",
  "https://kagi.com/search?q=go",
  "https://yandex.com/search/?text=browser",
  "https://www.perplexity.ai/search?q=test",
  "https://you.com/search?q=weather",
  "https://swisscows.com/web?query=code",
  "https://search.aol.com/search?q=music",
  "https://www.baidu.com/s?wd=golang",
  "https://www.qwant.com/?q=security",
];

const negatives = [
  "https://www.google.com/",
  "https://news.google.com/search?q=openclaw",
  "https://duckduckgo.com/?t=h_&ia=web",
  "https://search.yahoo.com/",
  "https://example.com/?redirect=google.com/search?q=nope",
  "not a url",
  "",
  null,
];

for (const url of positives) {
  assert.equal(isSearchURL(url), true, `${url} should match`);
}

for (const url of negatives) {
  assert.equal(isSearchURL(url), false, `${url} should not match`);
}

console.log(`validated ${positives.length} positive and ${negatives.length} negative search URL cases`);
