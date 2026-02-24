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
];

function isSearchTab(tab) {
  if (!tab.url) return false;
  return SEARCH_PATTERNS.some((pattern) => tab.url.includes(pattern));
}

function updateBadge() {
  chrome.tabs.query({}, (tabs) => {
    const count = tabs.filter(isSearchTab).length;
    chrome.action.setBadgeText({ text: count > 0 ? String(count) : "" });
    chrome.action.setBadgeBackgroundColor({ color: "#e74c3c" });
  });
}

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    const searchTabs = tabs.filter(isSearchTab);
    if (searchTabs.length === 0) return;
    chrome.tabs.remove(searchTabs.map((tab) => tab.id));
  });
});

// Update badge when tabs change
chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
  if (changeInfo.url || changeInfo.status === "complete") {
    updateBadge();
  }
});

chrome.tabs.onRemoved.addListener(() => {
  updateBadge();
});

chrome.tabs.onCreated.addListener(() => {
  updateBadge();
});

// Initial badge update
updateBadge();
