const SEARCH_PATTERNS = [
  "google.com/search?",
  "google.com/search#",
  "duckduckgo.com/?q=",
  "duckduckgo.com/?t=",
  "bing.com/search?",
  "search.yahoo.com/search",
  "search.brave.com/search?",
  "ecosia.org/search?",
  "startpage.com/search",
  "kagi.com/search?",
  "yandex.com/search/?",
  "perplexity.ai/search",
  "you.com/search?",
  "swisscows.com/web?",
  "search.aol.com/search",
  "baidu.com/s?",
  "qwant.com/?q=",
];

function isSearchTab(tab) {
  if (!tab.url) return false;
  return SEARCH_PATTERNS.some((pattern) => tab.url.includes(pattern));
}

function updateCount() {
  chrome.tabs.query({}, (tabs) => {
    const count = tabs.filter(isSearchTab).length;
    document.getElementById("count").textContent = count;
    const btn = document.getElementById("closeBtn");
    btn.disabled = count === 0;
    btn.textContent =
      count === 0 ? "No Search Tabs" : `Close ${count} Search Tab${count === 1 ? "" : "s"}`;
  });
}

document.getElementById("closeBtn").addEventListener("click", () => {
  chrome.tabs.query({}, (tabs) => {
    const searchTabs = tabs.filter(isSearchTab);
    if (searchTabs.length === 0) return;
    chrome.tabs.remove(
      searchTabs.map((tab) => tab.id),
      () => {
        updateCount();
      }
    );
  });
});

updateCount();
