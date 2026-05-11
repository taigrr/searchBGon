import { isSearchTab } from "./searchMatcher.mjs";

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

updateBadge();
