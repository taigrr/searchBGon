import assert from "node:assert/strict";
import { isSearchTab, isSearchURL } from "./searchMatcher.mjs";

const positives = [
  "https://www.google.com/search?q=openclaw",
  "https://google.co.uk/search?q=clawd",
  "https://www.google.co.uk/search?q=clawd",
  "https://google.com.au/search?q=widget",
  "http://www.google.com/search?q=openclaw",
  "https://duckduckgo.com/?q=ai+assistant",
  "https://html.duckduckgo.com/html/?q=terminal",
  "https://lite.duckduckgo.com/lite/?q=browser",
  "https://www.bing.com/search?q=signal",
  "https://search.yahoo.com/search?p=wallace",
  "https://search.brave.com/search?q=repo",
  "https://www.ecosia.org/search?q=trees",
  "https://www.startpage.com/search?query=privacy",
  "https://kagi.com/search?q=go",
  "https://yandex.com/search/?text=browser",
  "https://yandex.ru/search/?text=browser",
  "https://yandex.com.tr/search/?text=browser",
  "https://ya.ru/search/?text=browser",
  "https://www.perplexity.ai/search?q=test",
  "https://www.perplexity.ai/search/?q=test",
  "https://www.perplexity.ai/search/some-answer-slug",
  "https://www.startpage.com/sp/search?query=privacy",
  "https://you.com/search?q=weather",
  "https://swisscows.com/web?query=code",
  "https://search.aol.com/search?q=music",
  "https://www.baidu.com/s?wd=golang",
  "https://www.qwant.com/?q=security",
];

const negatives = [
  "https://www.google.com/",
  "https://googleusercontent.com/search?q=openclaw",
  "https://news.google.com/search?q=openclaw",
  "https://google.evil.com/search?q=openclaw",
  "https://google.internal/search?q=nope",
  "ftp://www.google.com/search?q=openclaw",
  "file:///search?q=openclaw",
  "https://www.perplexity.ai/search",
  "https://www.startpage.com/researchers?query=x",
  "https://duckduckgo.com/?t=h_&ia=web",
  "https://html.duckduckgo.com/html/",
  "https://html.duckduckgo.com/?q=nope",
  "https://example.duckduckgo.com/html/?q=nope",
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

assert.equal(isSearchTab({ url: "https://www.google.com/search?q=openclaw" }), true, "search tab should match");
assert.equal(isSearchTab({ url: "https://www.google.com/" }), false, "non-search tab should not match");
assert.equal(isSearchTab({}), false, "tab without url should not match");
assert.equal(isSearchTab(null), false, "missing tab should not match");

console.log(`validated ${positives.length} positive and ${negatives.length} negative search URL cases`);
